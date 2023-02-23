import React, {useEffect} from 'react';
import {Modal, StyleSheet, Text, View, ScrollView} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useAppStore} from '../stores/appStore';
import {SafeAreaView} from 'react-native-safe-area-context';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import CustomTextInput from './CustomTextInput';
import CustomSlider from './CustomSlider';
import ModalButtonsContainer from './ModalButtonsContainer';

const ItemModal = observer(() => {
    const store = useAppStore();

    useEffect(() => {
        if (!store.isOpenedModal) {
            return;
        }

        if (store.isAnyTodoSelected) {
            store.setItem({...store.items.find(item => item.id === store.selectedId)});
            return;
        }

        store.setItem({
            id: uuidv4(),
            title: '',
            description: '',
            isDone: false,
            importance: 0,
            urgency: 0,
            complexity: 0,
            significance: 0
        });
    }, [store.isAnyTodoSelected, store.items, store.selectedId, store.isOpenedModal]);

    useEffect(() => {
        const newSignificance = store.item.importance === 0 || store.item.urgency === 0 || store.item.complexity === 0
            ? 0
            : Math.floor(store.item.importance * store.item.urgency / store.item.complexity * 10) / 10;

        store.handleItemChange('significance', newSignificance);
    }, [store.item.importance, store.item.urgency, store.item.complexity]);

    function onRequestClose() {
        store.setIsOpenedModal(false);
    }

    function onTitleChange(value) {
        store.handleItemChange('title', value);
    }

    function onDescriptionChange(value) {
        store.handleItemChange('description', value)
    }

    function onImportanceChange(value) {
        store.handleItemChange('importance', value);
    }

    function onUrgencyChange(value) {
        store.handleItemChange('urgency', value);
    }

    function onComplexityChange(value) {
        store.handleItemChange('complexity', value);
    }

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={store.isOpenedModal}
            onRequestClose={onRequestClose}>
            <SafeAreaView style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.title}>{`Todo ${store.isAnyTodoSelected ? 'editing' : 'creating'}`}</Text>
                    <ScrollView style={{alignSelf: 'stretch'}}>
                        <CustomTextInput
                            title='Name'
                            onChangeText={onTitleChange}
                            value={store.item.title}
                            placeholder='Todo Name'
                            maxLength={100}
                        />
                        <CustomTextInput
                            title='Description'
                            onChangeText={onDescriptionChange}
                            value={store.item.description}
                            placeholder='Todo Description'
                            maxLength={400}
                            multiline={true}
                            numberOfLines={5}
                        />
                        <CustomSlider
                            title='Importance'
                            value={store.item.importance}
                            onSlidingComplete={onImportanceChange}
                        />
                        <CustomSlider
                            title='Urgency'
                            value={store.item.urgency}
                            onSlidingComplete={onUrgencyChange}
                        />
                        <CustomSlider
                            title='Complexity'
                            value={store.item.complexity}
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

export default ItemModal;