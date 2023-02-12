import React, {useState, useEffect} from 'react';
import {Modal, StyleSheet, Text, View, ScrollView} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import CustomTextInput from './CustomTextInput';
import CustomSlider from './CustomSlider';
import ModalButtonsContainer from './ModalButtonsContainer';

export default function ItemModal({
                                      isOpenedModal,
                                      isAnyTodoSelected,
                                      selectedId,
                                      items,
                                      setIsOpenedModal,
                                      setItems,
                                      handleDeleteTodoPress
                                  }) {

    const [item, setItem] = useState({
        id: null,
        title: '',
        description: '',
        isDone: false,
        importance: 0,
        urgency: 0,
        complexity: 0,
        significance: 0
    });

    useEffect(() => {
        if (!isOpenedModal) {
            return;
        }

        if (isAnyTodoSelected) {
            setItem(items.find(item => item.id === selectedId));
            return;
        }

        setItem(({
            id: uuidv4(),
            title: '',
            description: '',
            isDone: false,
            importance: 0,
            urgency: 0,
            complexity: 0,
            significance: 0
        }))
    }, [isAnyTodoSelected, items, selectedId, isOpenedModal]);

    useEffect(() => {
        const newSignificance = item.importance === 0 || item.urgency === 0 || item.complexity === 0
            ? 0
            : Math.floor(item.importance * item.urgency / item.complexity * 10) / 10;

        handleItemChange('significance', newSignificance);
    }, [item.importance, item.urgency, item.complexity]);

    function handleItemChange(name, value) {
        setItem(prevItem => ({
            ...prevItem,
            [name]: value
        }));
    }

    function handleCloseModal() {
        setIsOpenedModal(false);
    }

    function handleDeleteSelectedTodoPress() {
        handleCloseModal();
        handleDeleteTodoPress();
    }

    function handleAddNewTodoPress() {
        setItems(prevItems => [
            ...prevItems,
            {...item}
        ]);
        handleCloseModal();
    }

    function handleSaveTodoPress() {
        setItems(prevItems => {
            const copiedItems = [...prevItems];
            const editedItemIndex = copiedItems.findIndex(item => item.id === selectedId);

            copiedItems.splice(editedItemIndex, 1, {...item});

            return copiedItems;
        });
        handleCloseModal();
    }

    function handleResetTodoPress() {
        setItem(prevItem => ({
            ...prevItem,
            title: '',
            description: '',
            isDone: false,
            importance: 0,
            urgency: 0,
            complexity: 0,
            significance: 0
        }))
    }

    function handleItemTitleChange(value) {
        handleItemChange('title', value);
    }

    function handleItemDescriptionChange(value) {
        handleItemChange('description', value)
    }

    function handleItemImportanceChange(value) {
        handleItemChange('importance', value);
    }

    function handleItemUrgencyChange(value) {
        handleItemChange('urgency', value);
    }

    function handleItemComplexityChange(value) {
        handleItemChange('complexity', value);
    }

    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={isOpenedModal}
            onRequestClose={handleCloseModal}>
            <SafeAreaView
                style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.title}>Todo {isAnyTodoSelected ? 'editing' : 'creating'}</Text>
                    <ScrollView style={{alignSelf: 'stretch'}}>
                        <CustomTextInput
                            title='Name'
                            onChangeText={handleItemTitleChange}
                            value={item.title}
                            placeholder='Todo Name'
                            maxLength={100}
                        />
                        <CustomTextInput
                            title='Description'
                            onChangeText={handleItemDescriptionChange}
                            value={item.description}
                            placeholder='Todo Description'
                            maxLength={400}
                            multiline={true}
                            numberOfLines={5}
                        />
                        <CustomSlider
                            title='Importance'
                            value={item.importance}
                            onSlidingComplete={handleItemImportanceChange}
                        />
                        <CustomSlider
                            title='Urgency'
                            value={item.urgency}
                            onSlidingComplete={handleItemUrgencyChange}
                        />
                        <CustomSlider
                            title='Complexity'
                            value={item.complexity}
                            onSlidingComplete={handleItemComplexityChange}
                        />
                    </ScrollView>
                    <ModalButtonsContainer
                        isAnyTodoSelected={isAnyTodoSelected}
                        handleCloseModal={handleCloseModal}
                        handleDeleteSelectedTodoPress={handleDeleteSelectedTodoPress}
                        handleAddNewTodoPress={handleAddNewTodoPress}
                        handleSaveTodoPress={handleSaveTodoPress}
                        handleResetTodoPress={handleResetTodoPress}
                    />
                </View>
            </SafeAreaView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'flex-end',

    },
    container: {
        alignItems: 'center',
        backgroundColor: "#fff",
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