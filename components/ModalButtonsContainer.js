import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import CustomButton from './CustomButton';

export default function ModalButtonsContainer({
                                                  isAnyTodoSelected,
                                                  handleCloseModal,
                                                  handleDeleteSelectedTodoPress,
                                                  handleAddNewTodoPress,
                                                  handleSaveTodoPress,
                                                  handleResetTodoPress
                                         }) {
    return (
        <View style={styles.buttonsContainer}>
            {!isAnyTodoSelected && (
                <>
                    <CustomButton
                        iconName="refresh"
                        isElevated={true}
                        onPress={handleResetTodoPress}
                    />
                    <CustomButton
                        iconName="plus"
                        isBigSize={true}
                        isElevated={true}
                        onPress={handleAddNewTodoPress}
                    />
                </>
            )}
            {isAnyTodoSelected && (
                <>
                    <CustomButton
                        iconName="trash-can-outline"
                        isElevated={true}
                        onPress={handleDeleteSelectedTodoPress}
                    />
                    <CustomButton
                        iconName="plus"
                        isBigSize={true}
                        isElevated={true}
                        onPress={handleSaveTodoPress}
                    />
                </>
            )}
            <CustomButton
                iconName="window-close"
                isElevated={true}
                onPress={handleCloseModal}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'baseline'
    }
});