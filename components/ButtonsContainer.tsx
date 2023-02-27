import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useAppStore} from '../stores/appStore';
import CustomButton from './CustomButton';

const ButtonsContainer = observer(() => {
    const store = useAppStore();

    function onNewTaskPress() {
        store.handleNewTaskPress();
    }

    function onDeleteTaskPress() {
        store.handleDeleteTaskPress();
    }

    function onDoneTogglePress() {
        store.handleDoneTogglePress();
    }

    return (
        <View style={styles.buttonsContainer}>
            {!store.isAnyTaskSelected && (
                <CustomButton
                    iconName='plus'
                    isBigSize={true}
                    onPress={onNewTaskPress}
                />
            )}
            {store.isAnyTaskSelected && (
                <>
                    {!store.isSelectedTaskDone && (
                        <>
                            <CustomButton
                                iconName='trash-can-outline'
                                onPress={onDeleteTaskPress}
                            />
                            <CustomButton
                                iconName='check'
                                isBigSize={true}
                                onPress={onDoneTogglePress}
                            />
                        </>
                    )}
                    {store.isSelectedTaskDone && (
                        <>
                            <CustomButton
                                iconName='repeat'
                                onPress={onDoneTogglePress}
                            />
                            <CustomButton
                                iconName='trash-can-outline'
                                isBigSize={true}
                                onPress={onDeleteTaskPress}
                            />
                        </>
                    )}
                    <CustomButton
                        iconName='plus'
                        onPress={onNewTaskPress}
                    />
                </>
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'baseline'
    }
});

export default ButtonsContainer;