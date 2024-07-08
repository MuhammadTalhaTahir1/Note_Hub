import { StyleSheet, TextInput, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import COLOUR from '../styles/colors';

const SearchBar = ({ data, onChange }) => {
    const [masterData, setMasterData] = useState(data);

    // Update masterData when data prop changes
    useEffect(() => {
        setMasterData(data);
    }, [data]);

    const search = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemTitle = item.title ? item.title.toUpperCase() : "".toUpperCase();
                const titleSearch = text.toUpperCase();
                return itemTitle.indexOf(titleSearch) > -1;
            });
            onChange(newData);
        } else {
            onChange(masterData);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search Task..."
                maxLength={50}
                onChangeText={(text) => search(text)}
            />
        </View>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOUR.searchBar,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
    },
});
