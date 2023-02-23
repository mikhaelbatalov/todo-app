import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useAppStore} from '../stores/appStore';
import CustomButton from './CustomButton';

const ModalButtonsContainer = observer(() => {
    const store = useAppStore();
    
    function onResetTodoPress() {
        store.handleResetTodoPress();
    }

    function onAddNewTodoPress() {
        store.handleAddNewTodoPress();
    }

    function onSaveTodoPress() {
        store.handleSaveTodoPress();
    }

    function onDeleteSelectedTodoPress() {
        store.setIsOpenedModal(false);
        store.handleDeleteTodoPress();
    }

    function onCloseModalPress() {
        store.setIsOpenedModal(false);
    }

    return (
        <View style={styles.buttonsContainer}>
            {!store.isAnyTodoSelected && (
                <>
                    <CustomButton
                        iconName="refresh"
                        isElevated={true}
                        onPress={onResetTodoPress}
                    />
                    <CustomButton
                        iconName="plus"
                        isBigSize={true}
                        isElevated={true}
                        onPress={onAddNewTodoPress}
                    />
                </>
            )}
            {store.isAnyTodoSelected && (
                <>
                    <CustomButton
                        iconName="trash-can-outline"
                        isElevated={true}
                        onPress={onDeleteSelectedTodoPress}
                    />
                    <CustomButton
                        iconName="plus"
                        isBigSize={true}
                        isElevated={true}
                        onPress={onSaveTodoPress}
                    />
                </>
            )}
            <CustomButton
                iconName="window-close"
                isElevated={true}
                onPress={onCloseModalPress}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'baseline'
    }
});

export default ModalButtonsContainer;