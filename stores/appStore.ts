import {createContext, useContext} from 'react';
import {makeAutoObservable} from 'mobx';

export type Task = {
        id: string | null,
        title: string,
        description: string,
        isDone: boolean,
        importance: number,
        urgency: number,
        complexity: number,
        significance: number
    };
export type TaskKey = 'significance' | 'title' | 'description' | 'importance' | 'urgency' | 'complexity';
export type Tasks = Task[];

class AppStore {
    tasks: Tasks = [
        {
            id: '1',
            title: 'Lorem ipsum',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            isDone: false,
            importance: 2,
            urgency: 9,
            complexity: 1,
            significance: 18
        },
        {
            id: '2',
            title: 'Ut enim ad',
            description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            isDone: true,
            importance: 0,
            urgency: 0,
            complexity: 0,
            significance: 0
        },
        {
            id: '3',
            title: 'Duis aute irure dolor',
            description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            isDone: false,
            importance: 2,
            urgency: 3,
            complexity: 10,
            significance: 0.6
        },
        {
            id: '4',
            title: 'Excepteur sint occaecat cupidatat non proident',
            description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            isDone: false,
            importance: 10,
            urgency: 5,
            complexity: 1,
            significance: 50
        },
        {
            id: '5',
            title: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque',
            description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
            isDone: false,
            importance: 10,
            urgency: 1,
            complexity: 1,
            significance: 10
        },
        {
            id: '6',
            title: 'Nemo',
            description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
            isDone: false,
            importance: 1,
            urgency: 1,
            complexity: 1,
            significance: 1
        },
        {
            id: '7',
            title: 'Neque porro',
            description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
            isDone: false,
            importance: 0,
            urgency: 0,
            complexity: 0,
            significance: 0
        },
        {
            id: '8',
            title: 'Ut enim ad minima veniam',
            description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
            isDone: false,
            importance: 10,
            urgency: 10,
            complexity: 10,
            significance: 10
        }
    ];
    task : Task = {
        id: null,
        title: '',
        description: '',
        isDone: false,
        importance: 0,
        urgency: 0,
        complexity: 0,
        significance: 0
    };
    selectedId : string | null = null;
    isOpenedModal : boolean = false;

    get filteredTasks() {
        return [
            ...this.tasks.filter(task => !task.isDone).sort((a, b) => b.significance - a.significance),
            ...this.tasks.filter(task => task.isDone).sort((a, b) => b.significance - a.significance)
        ];
    }

    get isAnyTaskSelected() {
        return !!this.selectedId;
    }

    get isSelectedTaskDone() {
        const selectedTaskIndex = this.tasks.findIndex(task => task.id === this.selectedId);
        return selectedTaskIndex !== -1
            ? this.tasks[selectedTaskIndex].isDone
            : false;
    }

    constructor() {
        makeAutoObservable(this);
    }

    setIsOpenedModal(value: boolean) {
        this.isOpenedModal = value;
    }

    setTask(taskData: Task) {
        this.task = taskData;
    }

    handleTaskChange<T extends string | number>(name: TaskKey, value: T) {
        this.task = {
            ...this.task,
            [name]: value
        }
    }

    handleNewTaskPress() {
        if (this.isAnyTaskSelected) {
            this.selectedId = null;
        }

        this.isOpenedModal = true;
    }

    handleDeleteTaskPress() {
        this.tasks = this.tasks.filter(task => task.id !== this.selectedId);
        this.selectedId = null;
    }

    handleDoneTogglePress() {
        const toggledTaskIndex = this.tasks.findIndex(task => task.id === this.selectedId);

        this.tasks[toggledTaskIndex].isDone = !this.tasks[toggledTaskIndex].isDone;
    }

    handleTaskPress(taskId: string | null) {
        this.selectedId = this.selectedId === taskId ? null : taskId;
    }

    handleEditPress(taskId: string | null) {
        this.selectedId = taskId;
        this.isOpenedModal = true;
    }

    handleAddTaskPress() {
        this.tasks.push({...this.task});
        this.isOpenedModal = false;
    }

    handleSaveTaskPress() {
        const editedTaskIndex = this.tasks.findIndex(task => task.id === this.selectedId);
        this.tasks.splice(editedTaskIndex, 1, {...this.task});
        this.isOpenedModal = false;
    }

    handleResetTaskPress() {
        this.task = {
            ...this.task,
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