import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import * as Notifications from 'expo-notifications';
import DateTimePicker from '@react-native-community/datetimepicker';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowAlert: true,
    }),
});

const ModalNotification = ({
    modalVisible,
    setModalVisible,
    date,
    setDate,
    note,
    setNote,
}) => {
    const [showPicker, setShowPicker] = useState({
        showDate: false,
        showHours: false,
    });

    async function schedulePushNotification() {
        const id = await Notifications.scheduleNotificationAsync({
            content: {
                title: `Notifications: ${note.title.substr(0, 40)}`,
                body: note.note.substr(0, 50),
            },
            trigger: date,
        });
        setNote({ ...note, notificationId: id });
    }

    const onChange = (event, selectedDate) => {
        setShowPicker({ showDate: false, showHours: false });
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const currentFormattedDate = (type) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours();
        const min = date.getMinutes();
        if (type === 'date') {
            return `${day}/${month}/${year}`;
        } else {
            return `${hours}:${min}`;
        }
    };

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.containeredView}>
                <View style={[styles.modalView, { marginTop: '70%' }]}>
                    <Text style={styles.modalText}>
                        Select a time to get notified for the task
                    </Text>
                    <View>
                        <Text style={{ textAlign: 'center' }}>Date</Text>
                        <TouchableOpacity
                            onPress={() => setShowPicker({ ...showPicker, showDate: true })}
                            style={styles.buttonHours}>
                            <Text style={styles.txtHours}>{currentFormattedDate('date')}</Text>
                        </TouchableOpacity>
                        {showPicker.showDate && (
                            <DateTimePicker mode='date' value={date} onChange={onChange} />
                        )}
                        <Text style={{ textAlign: 'center' }}>Time</Text>
                        <TouchableOpacity
                            onPress={() => setShowPicker({ ...showPicker, showHours: true })}
                            style={styles.buttonHours}>
                            <Text style={styles.txtHours}>{currentFormattedDate('hours')}</Text>
                        </TouchableOpacity>
                        {showPicker.showHours && (
                            <DateTimePicker mode='time' value={date} onChange={onChange} />
                        )}
                    </View>
                    <View style={styles.modalButton}>
                        <TouchableOpacity
                            onPress={() => {
                                schedulePushNotification();
                                setModalVisible(!modalVisible);
                            }}
                            style={[styles.button, styles.buttonSave]}>
                            <Text style={styles.txtStyle}>Set</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!modalVisible)}
                            style={[styles.button, styles.buttonCancel]}>
                            <Text style={styles.txtStyle}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ModalNotification;

const styles = StyleSheet.create({
    modalView: {
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderColor:"black",
        borderWidth:1,
        borderRadius: 20,
        padding: 35,
        height: '50%',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        alignItems: 'center',
        borderRadius: 20,
        padding: 10,
        width: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonCancel: {
        backgroundColor: '#c70000',
    },
    buttonSave: {
        backgroundColor: '#2196F3',
    },
    txtStyle: {
        fontWeight: 'bold',
        color: '#fff',
    },
    buttonHours: {
        alignItems: 'center',
        alignSelf: 'center',
        borderBottomColor: '#000',
        borderBottomWidth: 1,
        width: 150,
        marginBottom: 10,
    },
    txtHours: {
        fontWeight: 'bold',
        color: '#000',
        fontSize: 25,
    },
});
