import { SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import ModalNotification from '../components/notifications';
import COLOUR from '../styles/colors';
import SaveNotes from '../components/SaveNotes';
import DelNotes from '../components/DelNotes';

const Notes = ({ route, navigation }) => {
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState({
    title: '',
    note: '',
    date: date,
    notificationId: null,
  });
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (route.params?.note) {
      setNote(route.params.note);
    }
  }, [route.params?.note]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingRight: 20,
          }}>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Feather name='bell' size={24} color='white' />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, modalVisible]);

  const handleSave = async () => {
    console.log('handleSave called with note:', note);

    try {
      await SaveNotes(note);
      navigation.goBack();
      Alert.alert('Success', 'Note saved successfully', [{ text: 'OK', style: 'cancel' }]);
    } catch (error) {
      console.log('SaveNotes error:', error);
      Alert.alert('Error', 'Failed to save note', [{ text: 'OK', style: 'cancel' }]);
    }
  };

  const handleDelete = async () => {
    try {
      await DelNotes({ note, navigation });
      Alert.alert('Success', 'Note deleted successfully', [{ text: 'OK', style: 'cancel' }]);
    } catch (error) {
      console.log('DelNotes error:', error);
      Alert.alert('Error', 'Failed to delete note', [{ text: 'OK', style: 'cancel' }]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.txtTitleNote}
        autoFocus={true}
        maxLength={40}
        value={note.title}
        placeholder={'Title'}
        onChangeText={(text) => setNote({ ...note, title: text })}
      />
      <TextInput
        style={styles.txtInput}
        autoFocus={true}
        maxLength={60}
        value={note.note}
        placeholder={'Description'}
        multiline={true}
        numberOfLines={10}
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        onChangeText={(text) => setNote({ ...note, note: text })}
      />
      <ModalNotification
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        date={date}
        setDate={setDate}
        note={note}
        setNote={setNote}
      />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 10,
          position: 'absolute',
          bottom: 0,
        }}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#017CE9', flex: 1 }]}
          onPress={handleSave}>
          <Feather name='save' size={29} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: '#DF4843', flex: 1 }]}
          onPress={handleDelete}>
          <Feather name='trash-2' size={29} color={'white'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: COLOUR.noteBackground,
    margin: 20,
  },
  txtInput: {
    fontSize: 16,
    padding: 15,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '100%',
    height: 150,
    textAlignVertical: 'top',
  },
  txtTitleNote: {
    width: '100%',
    padding: 15,
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#808080',
  },
  actionButton: {
    borderRadius: 20,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});
