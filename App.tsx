import React, {useEffect} from 'react';
import {StyleSheet, Text, FlatList} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useAppStore, Task as TaskType} from './stores/appStore';
import {StatusBar} from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonsContainer from './components/ButtonsContainer';
import Task from './components/Task';
import TaskModal from './components/TaskModal'

type RenderTaskProps = {
    item: TaskType,
    index: number
};

const App = observer(() => {
    const store = useAppStore();

    useEffect(() => {
        (async () => {
                try {
                await Promise.all([
                    NavigationBar.setBackgroundColorAsync('black'),
                    NavigationBar.setButtonStyleAsync('dark')
                ])
            } catch (e) {
                alert(e);
            }
        })();
    }, []);

    const renderTask = ({item, index}: RenderTaskProps) => {
        return (
            <Task
                index={index}
                task={item}
            />
        );
    };
    const getKeyExtractor = (item: TaskType) : string => item.id || '';

    return (
        <SafeAreaView style={styles.appContainer}>
            <Text style={styles.appTitle}>Todos For Today</Text>
            <FlatList
                style={styles.flatList}
                data={store.filteredTasks}
                renderItem={renderTask}
                keyExtractor={getKeyExtractor}
            />
            <ButtonsContainer/>
            <StatusBar style='light'/>
            <TaskModal/>
        </SafeAreaView>
    );
});

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    flatList: {
        flex: 1,
        alignSelf: 'stretch'
    },
    appTitle: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
        lineHeight: 40,
        fontStyle: 'italic',
        fontVariant: ['small-caps'],
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    button: {
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    buttonIcon: {
        margin: 20
    }
});

export default App;