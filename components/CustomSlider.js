import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Slider from '@react-native-community/slider';

export default function ItemModal({
                                      title,
                                      value,
                                      onSlidingComplete
                                  }) {
    return (
        <>
            <Text style={styles.title}>
                {title}
            </Text>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                step={1}
                minimumTrackTintColor="#000"
                thumbTintColor="#000"
                value={value}
                onSlidingComplete={onSlidingComplete}
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
    slider: {
        width: '100%',
        height: 40
    }
});