import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import updateNotes from './updateNotes';

const SaveNotes = async (note) => {
    console.log('SaveNotes called with:', note);

    const getKey = async () => {
        try {
            const storedKey = await AsyncStorage.getItem('0');
            console.log('Current key from AsyncStorage:', storedKey);

            if (storedKey === null) {
                await AsyncStorage.setItem('0', '1');
                return '1';
            } else {
                const key = String(Number(storedKey) + 1);
                await AsyncStorage.setItem('0', key);
                return key;
            }
        } catch (error) {
            console.log('Error in getKey:', error);
            throw error;
        }
    };

    if (!note.note || !note.title) {
        Alert.alert(
            'ERROR',
            'Note and Title cannot be empty',
            [{ text: 'OK', style: 'cancel' }]
        );
        return;
    }

    try {
        let data = [];
        const storedNotes = await AsyncStorage.getItem('notes');
        console.log('Stored notes:', storedNotes);

        if (note.id) {
            if (Array.isArray(JSON.parse(storedNotes))) {
                data = JSON.parse(storedNotes);
            } else {
                data.push(JSON.parse(storedNotes));
            }
            data = updateNotes(data, note);
        } else {
            note.id = await getKey();
            if (storedNotes === null) {
                data = [note];
            } else {
                data = JSON.parse(storedNotes);
                data.push(note);
            }
        }
        console.log('Data to save:', data);
        await AsyncStorage.setItem('notes', JSON.stringify(data));
    } catch (err) {
        console.log('Error saving note:', err);
        throw err;
    }
};

export default SaveNotes;
