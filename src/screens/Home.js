import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import React, { useState, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import COLOUR from '../styles/colors';
import { AntDesign } from '@expo/vector-icons';
import RenderNotes from '../components/RenderNotes';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getData = useCallback(async () => {
    try {
      let notes = await AsyncStorage.getItem("notes");
      if (notes === undefined || notes === null) {
        notes = "[]";
      }
      if (notes.length > 0 && notes[0] !== '[]') {
        notes = `${notes}`;
      }
      setData(JSON.parse(notes));
    }
    catch (err) {
      console.log(err);
      alert("Error loading notes");
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [getData])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a refresh or fetch new data from AsyncStorage
    getData().then(() => setRefreshing(false));
  }, [getData]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Heading */}
      <Text style={styles.txtTitle}> Note-TakingApp</Text>
      {/* Search */}
      <SearchBar data={data} onChange={setData} />
      {/* Notes */}
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={
          <Text style={{ textAlign: 'center' }}>No Data!</Text>
        }
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return <RenderNotes item={item} navigation={navigation} />;
        }}
      />
      {/* Adding Notes Button */}
      <TouchableOpacity style={styles.addButton}
        onPress={() => navigation.navigate('Notes', { search: false })}
      >
        <AntDesign name="pluscircle" size={60} color={COLOUR.addButtons} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginTop: 20,
  },
  txtTitle: {
    margin: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: "bold",
  },
  addButton: {
    zIndex: 9,
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 50,
  },
});
