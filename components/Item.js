import React, {useMemo, useCallback} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useAppStore} from '../stores/appStore';
import CustomButton from './CustomButton';

const Item = observer(({
                           index,
                           item
                       }) => {
    const store = useAppStore();

    const itemColor = useMemo(() => {
        switch (index) {
            case 0:
                return '#ac1447';
            case 1:
            case 2:
                return '#1d919c';
            case 3:
            case 4:
            case 5:
                return '#1374b5';
            default:
                return '#23292e';
        }
    }, [index]);
    const isSelected = useMemo(() => store.selectedId === item.id,
        [store.selectedId, item.id]);

    const onItemPress = useCallback(() => store.handleItemPress(item.id),
        [store.handleItemPress, item.id]);
    const onEditPress = useCallback(() => store.handleEditPress(item.id),
        [store.handleEditPress, item.id]);

    return (
        <Pressable
            style={[
                styles.container,
                {backgroundColor: itemColor},
                isSelected && styles.selectedContainer,
                item.isDone && styles.doneContainer
            ]}
            onPress={onItemPress}>
            <View style={styles.titleContainer}>
                <Text style={[
                    styles.title,
                    item.isDone && styles.doneTitle
                ]}>
                    {item.title}
                </Text>
                <CustomButton
                    iconName="note-edit-outline"
                    isInvertedColor={true}
                    onPress={onEditPress}
                />
            </View>
            {(isSelected && item.description) && (
                <Text style={styles.description}>{item.description}</Text>
            )}
        </Pressable>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10,
        alignSelf: 'stretch',
        borderRadius: 10,
        backfaceVisibility: 'hidden'
    },
    selectedContainer: {
        marginTop: 20,
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 10,
    },
    doneContainer: {
        opacity: 0.5
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    title: {
        alignSelf: 'center',
        color: 'white',
        flex: 1,
        marginTop: 10,
        marginRight: 5,
        marginBottom: 10,
        marginLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
        lineHeight: 20
    },
    doneTitle: {
        textDecorationLine: 'line-through'
    },
    description: {
        marginRight: 10,
        marginBottom: 10,
        marginLeft: 10,
        color: 'white'
    }
});

export default Item;