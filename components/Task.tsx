import React, {useMemo, useCallback} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useAppStore, Task as TaskType} from '../stores/appStore';
import CustomButton from './CustomButton';

type TaskProps = {
    task: TaskType,
    index: number
};

const Task = observer(({
                           index,
                           task
                       }: TaskProps) => {
    const store = useAppStore();

    const taskColor = useMemo(() => {
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
    const isSelected = useMemo(() => store.selectedId === task.id,
        [store.selectedId, task.id]);

    const onTaskPress = useCallback(() => store.handleTaskPress(task.id),
        [store.handleTaskPress, task.id]);
    const onEditPress = useCallback(() => store.handleEditPress(task.id),
        [store.handleEditPress, task.id]);

    return (
        <Pressable
            style={[
                styles.container,
                {backgroundColor: taskColor},
                isSelected && styles.selectedContainer,
                task.isDone && styles.doneContainer
            ]}
            onPress={onTaskPress}>
            <View style={styles.titleContainer}>
                <Text style={[
                    styles.title,
                    task.isDone && styles.doneTitle
                ]}>
                    {task.title}
                </Text>
                <CustomButton
                    iconName='note-edit-outline'
                    isInvertedColor={true}
                    onPress={onEditPress}
                />
            </View>
            {(isSelected && task.description) && (
                <Text style={styles.description}>{task.description}</Text>
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

export default Task;