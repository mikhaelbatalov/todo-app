import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useAppStore} from '../stores/appStore';
import CustomButton from './CustomButton';

const ModalButtonsContainer = observer(() => {
    const store = useAppStore();
    
    function onResetTaskPress() {
        store.handleResetTaskPress();
    }

    function onAddNewTaskPress() {
        store.handleAddTaskPress();
    }

    function onSaveTaskPress() {
        store.handleSaveTaskPress();
    }

    function onDeleteSelectedTaskPress() {
        store.setIsOpenedModal(false);
        store.handleDeleteTaskPress();
    }

    function onCloseModalPress() {
        store.setIsOpenedModal(false);
    }

    return (
        <View style={styles.buttonsContainer}>
            {!store.isAnyTaskSelected && (
                <>
                    <CustomButton
                        iconName='refresh'
                        isElevated={true}
                        onPress={onResetTaskPress}
                    />
                    <CustomButton
                        iconName='plus'
                        isBigSize={true}
                        isElevated={true}
                        onPress={onAddNewTaskPress}
                    />
                </>
            )}
            {store.isAnyTaskSelected && (
                <>
                    <CustomButton
                        iconName='trash-can-outline'
                        isElevated={true}
                        onPress={onDeleteSelectedTaskPress}
                    />
                    <CustomButton
                        iconName='content-save-outline'
                        isBigSize={true}
                        isElevated={true}
                        onPress={onSaveTaskPress}
                    />
                </>
            )}
            <CustomButton
                iconName='window-close'
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