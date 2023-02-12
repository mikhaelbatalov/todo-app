import {
    StyleSheet,
    Pressable
} from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CustomButton({
                                         iconName,
                                         isInvertedColor = false,
                                         isBigSize = false,
                                         isElevated = false,
                                         onPress
                                     }) {
    return (
        <Pressable
            style={[
                styles.button,
                isBigSize && styles.bigSizedButton,
                isInvertedColor && styles.invertedColor,
                isElevated && styles.elevation
            ]}
            onPress={onPress}>
            <MaterialCommunityIcons
                name={iconName}
                size={isBigSize ? 60 : 40}
                color={isInvertedColor ? "white" : "black"}/>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 25,
        width: 50,
        height: 50
    },
    bigSizedButton: {
        borderRadius: 35,
        width: 70,
        height: 70
    },
    invertedColor: {
        backgroundColor: 'transparent'
    },
    elevation: {
        elevation: 2
    }
});