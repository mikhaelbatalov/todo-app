import React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';
import {observer} from 'mobx-react-lite';

type CustomTextInputProps = {
    title: string,
    onChangeText: (value: string) => void,
    value: string,
    placeholder: string,
    maxLength: number,
    multiline?: boolean,
    numberOfLines?: number
};

const CustomTextInput = observer(({
                                title,
                                onChangeText,
                                value,
                                placeholder,
                                maxLength,
                                multiline = false,
                                numberOfLines
                            }: CustomTextInputProps) => {
    return (
        <>
            <Text style={styles.title}>{title}</Text>
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
});

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

export default CustomTextInput;