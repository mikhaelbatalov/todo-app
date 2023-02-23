import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';

class AppStore {
    items = [
                {
                    id: 1,
                    title: "Lorem ipsum",
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    isDone: false,
                    importance: 2,
                    urgency: 9,
                    complexity: 1,
                    significance: 18
                },
                {
                    id: 2,
                    title: "Ut enim ad",
                    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    isDone: true,
                    importance: 0,
                    urgency: 0,
                    complexity: 0,
                    significance: 0
                },
                {
                    id: 3,
                    title: "Duis aute irure dolor",
                    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    isDone: false,
                    importance: 2,
                    urgency: 3,
                    complexity: 10,
                    significance: 0.6
                },
                {
                    id: 4,
                    title: "Excepteur sint occaecat cupidatat non proident",
                    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                    isDone: false,
                    importance: 10,
                    urgency: 5,
                    complexity: 1,
                    significance: 50
                },
                {
                    id: 5,
                    title: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
                    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
                    isDone: false,
                    importance: 10,
                    urgency: 1,
                    complexity: 1,
                    significance: 10
                },
                {
                    id: 6,
                    title: "Nemo",
                    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
                    isDone: false,
                    importance: 1,
                    urgency: 1,
                    complexity: 1,
                    significance: 1
                },
                {
                    id: 7,
                    title: "Neque porro",
                    description: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
                    isDone: false,
                    importance: 0,
                    urgency: 0,
                    complexity: 0,
                    significance: 0
                },
                {
                    id: 8,
                    title: "Ut enim ad minima veniam",
                    description: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
                    isDone: false,
                    importance: 10,
                    urgency: 10,
                    complexity: 10,
                    significance: 10
                }
    ];
    item = {
        id: null,
        title: '',
        description: '',
        isDone: false,
        importance: 0,
        urgency: 0,
        complexity: 0,
        significance: 0
    };
    selectedId = null;
    isOpenedModal = false;

    get filteredItems() {
        return [
            ...this.items.filter(item => !item.isDone).sort((a, b) => b.significance - a.significance),
            ...this.items.filter(item => item.isDone).sort((a, b) => b.significance - a.significance)
        ];
    }

    get isAnyTodoSelected() {
        return !!this.selectedId;
    }

    get isSelectedTodoDone() {
        return this.items.find(item => item.id === this.selectedId)?.isDone ?? false;
    }

    constructor() {
        makeAutoObservable(this);
    }

    setIsOpenedModal(value) {
        this.isOpenedModal = value;
    }

    setItem(data) {
        this.item = data;
    }

    handleItemChange(name, value) {
        this.item[name] = value;
    }

    handleNewTodoPress() {
        if (this.isAnyTodoSelected) {
            this.selectedId = null;
        }

        this.isOpenedModal = true;
    }

    handleDeleteTodoPress() {
        this.items = this.items.filter(item => item.id !== this.selectedId);
        this.selectedId = null;
    }

    handleDoneTogglePress() {
        const toggledItemIndex = this.items.findIndex(item => item.id === this.selectedId);

        this.items[toggledItemIndex].isDone = !this.items[toggledItemIndex].isDone;
    }

    handleItemPress(itemId) {
        this.selectedId = this.selectedId === itemId ? null : itemId;
    }

    handleEditPress(itemId) {
        this.selectedId = itemId;
        this.isOpenedModal = true;
    }

    handleAddNewTodoPress() {
        this.items.push({...this.item});
        this.isOpenedModal = false;
    }

    handleSaveTodoPress() {
        const editedItemIndex = this.items.findIndex(item => item.id === this.selectedId);
        this.items.splice(editedItemIndex, 1, {...this.item});
        this.isOpenedModal = false;
    }

    handleResetTodoPress() {
        this.item = {
            ...this.item,
            title: '',
            description: '',
            isDone: false,
            importance: 0,
            urgency: 0,
            complexity: 0,
            significance: 0
        };
    }
}

const appStore = new AppStore();
const AppStoreContext = createContext(appStore);

export const useAppStore = () => useContext(AppStoreContext);