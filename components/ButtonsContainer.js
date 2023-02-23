import React from 'react';
import {StyleSheet, View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useAppStore} from '../stores/appStore';
import CustomButton from './CustomButton';

const ButtonsContainer = observer(() => {
    const store = useAppStore();

    function onNewTodoPress() {
        store.handleNewTodoPress();
    }

    function onDeleteTodoPress() {
        store.handleDeleteTodoPress();
    }

    function onDoneTogglePress() {
        store.handleDoneTogglePress();
    }

    return (
        <View style={styles.buttonsContainer}>
            {!store.isAnyTodoSelected && (
                <CustomButton
                    iconName='plus'
                    isBigSize={true}
                    onPress={onNewTodoPress}
                />
            )}
            {store.isAnyTodoSelected && (
                <>
                    {!store.isSelectedTodoDone && (
                        <>
                            <CustomButton
                                iconName='trash-can-outline'
                                onPress={onDeleteTodoPress}
                            />
                            <CustomButton
                                iconName='check'
                                isBigSize={true}
                                onPress={onDoneTogglePress}
                            />
                        </>
                    )}
                    {store.isSelectedTodoDone && (
                        <>
                            <CustomButton
                                iconName='repeat'
                                onPress={onDoneTogglePress}
                            />
                            <CustomButton
                                iconName='trash-can-outline'
                                isBigSize={true}
                                onPress={onDeleteTodoPress}
                            />
                        </>
                    )}
                    <CustomButton
                        iconName='plus'
                        onPress={onNewTodoPress}
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