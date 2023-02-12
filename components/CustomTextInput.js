import React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';

export default function ItemModal({
                                      title,
                                      onChangeText,
                                      value,
                                      placeholder,
                                      maxLength,
                                      multiline = false,
                                      numberOfLines
                                  }) {
    return (
        <>
            <Text style={styles.title}>
                {title}
            </Text>
            <TextInput
                style={styles.textInput}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                maxLength={maxLength}
                multiline={multiline}
                numberOfLines={numberOfLines}
            />
        </>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 20
    },
    textInput: {
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        width: '100%'
    }
});