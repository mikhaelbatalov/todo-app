import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {observer} from 'mobx-react-lite';
import Slider from '@react-native-community/slider';

type CustomSliderProps = {
    title: string,
    value: number,
    onSlidingComplete: (value: number) => void
};

const CustomSlider = observer(({
                                title,
                                value,
                                onSlidingComplete
                            }: CustomSliderProps) => {
    return (
        <>
            <Text style={styles.title}>{title}</Text>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10}
                step={1}
                minimumTrackTintColor='#000'
                thumbTintColor='#000'
                value={value}
                onSlidingComplete={onSlidingComplete}
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
    slider: {
        width: '100%',
        height: 40
    }
});

export default CustomSlider;