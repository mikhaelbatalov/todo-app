import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import CustomButton from './CustomButton';

export default function ButtonsContainer({
                                             isAnyTodoSelected,
                                             isSelectedTodoDone,
                                             handleNewTodoPress,
                                             handleDeleteTodoPress,
                                             handleDoneTogglePress
                               }) {
    return (
        <View style={styles.buttonsContainer}>
            {!isAnyTodoSelected && (
                <>
                    <CustomButton
                        iconName="plus"
                        isBigSize={true}
                        onPress={handleNewTodoPress}
                    />
                </>
            )}
            {isAnyTodoSelected && (
                <>
                    {!isSelectedTodoDone && (
                        <>
                            <CustomButton
                                iconName="trash-can-outline"
                                onPress={handleDeleteTodoPress}
                            />
                            <CustomButton
                                iconName="check"
                                isBigSize={true}
                                onPress={handleDoneTogglePress}
                            />
                        </>
                    )}
                    {isSelectedTodoDone && (
                        <>
                            <CustomButton
                                iconName="repeat"
                                onPress={handleDoneTogglePress}
                            />
                            <CustomButton
                                iconName="trash-can-outline"
                                isBigSize={true}
                                onPress={handleDeleteTodoPress}
                            />
                        </>
                    )}
                    <CustomButton
                        iconName="plus"
                        onPress={handleNewTodoPress}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'baseline'
    }
});