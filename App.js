import {StatusBar} from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import {
    StyleSheet,
    Text,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, {useState, useMemo, useEffect} from 'react';
import ButtonsContainer from './components/ButtonsContainer';
import Item from './components/Item';
import ItemModal from './components/ItemModal'

const DATA = [
    {
        id: 1,
        title: "First ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst ItemFirst Item",
        description: "First description",
        isDone: false,
        importance: 0,
        urgency: 0,
        complexity: 0,
        significance: 0
    },
    {
        id: 2,
        title: "Second Item",
        description: "First description First description First description First description First description First description First description First description First description First description First description First description First description First description First description First description First description First description First description First description First description ",
        isDone: true,
        importance: 0,
        urgency: 0,
        complexity: 0,
        significance: 0
    },
    {
        id: 3,
        title: "Third Item",
        description: "First description",
        isDone: false,
        importance: 0,
        urgency: 0,
        complexity: 0,
        significance: 0
    },
    {
        id: 4,
        title: "Forth Item",
        description: "Forth description",
        isDone: false,
        importance: 0,
        urgency: 0,
        complexity: 0,
        significance: 0
    },
    {
        id: 5,
        title: "Fifth Item",
        description: "Fifth description",
        isDone: false,
        importance: 0,
        urgency: 0,
        complexity: 0,
        significance: 0
    },
    {
        id: 6,
        title: "Sixth Item",
        description: "Sixth description",
        isDone: true,
        importance: 0,
        urgency: 0,
        complexity: 0,
        significance: 0
    },
    {
        id: 7,
        title: "Seventh Item",
        description: "Seventh description",
        isDone: false,
        importance: 0,
        urgency: 0,
        complexity: 0,
        significance: 0
    },
    {
        id: 8,
        title: "Eighth Item",
        description: "Eighth description",
        isDone: false,
        importance: 0,
        urgency: 0,
        complexity: 0,
        significance: 0
    },
    {
        id: 9,
        title: "Ninth Item",
        description: "Ninth description",
        isDone: false,
        importance: 0,
        urgency: 0,
        complexity: 0,
        significance: 0
    },
    {
        id: 10,
        title: "Tenth Item",
        description: "Tenth description",
        isDone: false,
        importance: 0,
        urgency: 0,
        complexity: 0,
        significance: 0
    }
];

export default function App() {

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

    const [items, setItems] = useState(DATA/*[]*/);
    const [selectedId, setSelectedId] = useState(null);
    const [isOpenedModal, setIsOpenedModal] = useState(false);

    const filteredItems = useMemo(() => [
        ...items.filter(item => !item.isDone).sort((a, b) => b.significance - a.significance),
        ...items.filter(item => item.isDone).sort((a, b) => b.significance - a.significance),
    ], [items]);

    const isAnyTodoSelected = useMemo(() => !!selectedId, [selectedId]);
    const isSelectedTodoDone = useMemo(() => items.find(item => item.id === selectedId)?.isDone ?? false, [items, selectedId]);

    function handleNewTodoPress() {
        isAnyTodoSelected && setSelectedId(null);
        setIsOpenedModal(true);
    }

    function handleDeleteTodoPress() {
        setItems(prevItems => prevItems.filter(item => item.id !== selectedId));
        setSelectedId(null);
    }

    function handleDoneTogglePress() {
        setItems(prevItems => {
            const copiedItems = [...prevItems];
            const toggledItemIndex = copiedItems.findIndex(item => item.id === selectedId);
            copiedItems[toggledItemIndex].isDone = !copiedItems[toggledItemIndex].isDone;

            return copiedItems;
        });
    }

    const renderItem = ({item, index}) => {
        function handleItemPress() {
            setSelectedId(prevSelectedId => prevSelectedId === item.id ? null : item.id);
        }

        function handleEditPress() {
            setSelectedId(item.id);
            setIsOpenedModal(true);
        }

        return (
            <Item
                selectedId={selectedId}
                index={index}
                item={item}
                handleItemPress={handleItemPress}
                handleEditPress={handleEditPress}
            />
        );
    };

    return (
        <SafeAreaView style={styles.appContainer}>
            <Text style={styles.appTitle}>Todos For Today</Text>
            <FlatList
                style={{flex: 1, alignSelf: 'stretch'}}
                data={filteredItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <ButtonsContainer
                isAnyTodoSelected={isAnyTodoSelected}
                isSelectedTodoDone={isSelectedTodoDone}
                handleNewTodoPress={handleNewTodoPress}
                handleDeleteTodoPress={handleDeleteTodoPress}
                handleDoneTogglePress={handleDoneTogglePress}
            />
            <StatusBar style='light'/>
            <ItemModal
                isOpenedModal={isOpenedModal}
                isAnyTodoSelected={isAnyTodoSelected}
                selectedId={selectedId}
                items={items}
                setIsOpenedModal={setIsOpenedModal}
                setItems={setItems}
                handleDeleteTodoPress={handleDeleteTodoPress}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
