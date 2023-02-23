import React, {useEffect} from 'react';
import {StyleSheet, Text, FlatList} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useAppStore} from './stores/appStore';
import {StatusBar} from 'expo-status-bar';
import * as NavigationBar from 'expo-navigation-bar';
import {SafeAreaView} from 'react-native-safe-area-context';
import ButtonsContainer from './components/ButtonsContainer';
import Item from './components/Item';
import ItemModal from './components/ItemModal'

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

    const renderItem = ({item, index}) => {
        return (
            <Item
                index={index}
                item={item}
            />
        );
    };
    const getKeyExtractor = item => item.id;

    return (
        <SafeAreaView style={styles.appContainer}>
            <Text style={styles.appTitle}>Todos For Today</Text>
            <FlatList
                style={styles.flatList}
                data={store.filteredItems}
                renderItem={renderItem}
                keyExtractor={getKeyExtractor}
            />
            <ButtonsContainer/>
            <StatusBar style='light'/>
            <ItemModal/>
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