import React, {useEffect} from 'react';
import {Modal, StyleSheet, Text, View, ScrollView} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useAppStore, Task} from '../stores/appStore';
import {SafeAreaView} from 'react-native-safe-area-context';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import CustomTextInput from './CustomTextInput';
import CustomSlider from './CustomSlider';
import ModalButtonsContainer from './ModalButtonsContainer';

const TaskModal = observer(() => {
    const store = useAppStore();

    useEffect(() => {
        if (!store.isOpenedModal) {
            return;
        }

        if (store.isAnyTaskSelected) {
            store.setTask({...store.tasks.find(task => task.id === store.selectedId)} as Task);
            return;
        }

        store.setTask({
            id: uuidv4() as string,
            title: '',
            description: '',
            isDone: false,
            importance: 0,
            urgency: 0,
            complexity: 0,
            significance: 0
        });
    }, [store.isAnyTaskSelected, store.tasks, store.selectedId, store.isOpenedModal]);

    useEffect(() => {
        const newSignificance : number = store.task.importance === 0 || store.task.urgency === 0 || store.task.complexity === 0
            ? 0
            : Math.floor(store.task.importance * store.task.urgency / store.task.complexity * 10) / 10;

        store.handleTaskChange<number>('significance', newSignificance);
    }, [store.task.importance, store.task.urgency, store.task.complexity]);

    function onRequestClose() {
        store.setIsOpenedModal(false);
    }

    function onTitleChange(value: string) {
        store.handleTaskChange<string>('title', value);
    }

    function onDescriptionChange(value: string) {
        store.handleTaskChange<string>('description', value)
    }

    function onImportanceChange(value: number) {
        store.handleTaskChange<number>('importance', value);
    }

    function onUrgencyChange(value: number) {
        store.handleTaskChange<number>('urgency', value);
    }

    function onComplexityChange(value : number) {
        store.handleTaskChange<number>('complexity', value);
    }

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={store.isOpenedModal}
            onRequestClose={onRequestClose}>
            <SafeAreaView style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.title}>{`Todo ${store.isAnyTaskSelected ? 'editing' : 'creating'}`}</Text>
                    <ScrollView style={{alignSelf: 'stretch'}}>
                        <CustomTextInput
                            title='Name'
                            onChangeText={onTitleChange}
                            value={store.task.title}
                            placeholder='Todo Name'
                            maxLength={100}
                        />
                        <CustomTextInput
                            title='Description'
                            onChangeText={onDescriptionChange}
                            value={store.task.description}
                            placeholder='Todo Description'
                            maxLength={400}
                            multiline={true}
                            numberOfLines={5}
                        />
                        <CustomSlider
                            title='Importance'
                            value={store.task.importance}
                            onSlidingComplete={onImportanceChange}
                        />
                        <CustomSlider
                            title='Urgency'
                            value={store.task.urgency}
                            onSlidingComplete={onUrgencyChange}
                        />
                        <CustomSlider
                            title='Complexity'
                            value={store.task.complexity}
                            onSlidingComplete={onComplexityChange}
                        />
                    </ScrollView>
                    <ModalButtonsContainer/>
                </View>
            </SafeAreaView>
        </Modal>
    );
});

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingRight: 20,
        paddingLeft: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        maxHeight: '100%'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        lineHeight: 50,
        fontStyle: 'italic',
        fontVariant: ['small-caps']
    }
});

export default TaskModal;