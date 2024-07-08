import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'
import COLOUR from '../styles/colors';

const RenderNotes = ({ item, navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Notes", { note: item, search: true })} style={styles.noteContainer}>
            <View style={styles.iconContainer}>
                <Text numberOfLines={1} style={styles.txtTitle}>{item.title}</Text>
                {item.notificationId && <Feather name='bell' size={15} color="green" />}
            </View>
            <Text numberOfLines={3} style={styles.txtNote}>{item.note}</Text>
        </TouchableOpacity>
    )
}

export default RenderNotes

const styles = StyleSheet.create({
    noteContainer: {
        backgroundColor: COLOUR.notes,
        padding: 15,
        borderRadius: 10,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    txtTitle: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 5,
    },
    txtNote: {
        color: "#555",
        fontSize: 14,
    }
});
