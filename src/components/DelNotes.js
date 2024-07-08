import { Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const DelNotes = async ({ note, navigation }) => {
    if (note.id === undefined) {
        Alert.alert(
            'ERROR',
            'ID is undefined',
            [
                {
                    text: 'OK',
                    style: 'cancel'
                }
            ]
        );
    } else {
        try {
            let data = JSON.parse(await AsyncStorage.getItem('notes'));
            data = data.filter(n => n.id !== note.id); // filter out the note with the given id

            if (note.notificationId !== null) {
                await Notifications.cancelScheduledNotificationAsync(note.notificationId); // Corrected method call
            }

            await AsyncStorage.setItem('notes', JSON.stringify(data));
            navigation.goBack();
        } catch (err) {
            Alert.alert(
                'ERROR',
                'Enter some information before deleting',
                [
                    {
                        text: 'OK',
                        style: 'cancel'
                    }
                ]
            );
        }
    }
};

export default DelNotes;

const styles = StyleSheet.create({});
