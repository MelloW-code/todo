import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE_TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD_TODOLIST',
    title: string
}

export type ChangeTodoListTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE',
    title: string,
    id: string
}

export type ChangeTodoListFilterActionType = {
    type: "CHANGE_TODOLIST_FILTER",
    filter: FilterValuesType,
    id: string
}

export type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodoListTitleActionType| ChangeTodoListFilterActionType



export const todoListReducer = (state: Array<TodoListType>, action: ActionType ) => {
    switch (action.type) {
        case "REMOVE_TODOLIST":
            return state.filter(tl => tl.id !== action.id)
        case 'ADD_TODOLIST':
            const newTodoList: TodoListType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodoList]
        case 'CHANGE_TODOLIST_TITLE':{
            const todoList = state.find(tl => tl.id == action.id)
            if (todoList) {
                todoList.title = action.title
                return [...state]
            }
            return state
    }
        case 'CHANGE_TODOLIST_FILTER':{
            const todoList = state.find( tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...state]
            }
        }

        default:
            throw new Error('Idasd')

    }
}


export const RemoveTodoListAC =
    (todoListID: string): RemoveTodolistActionType => ({type:'REMOVE_TODOLIST', id: todoListID})

export const AddTodoListAC =
    (todoListTitle: string): AddTodolistActionType => ({type:'ADD_TODOLIST', title: todoListTitle})
