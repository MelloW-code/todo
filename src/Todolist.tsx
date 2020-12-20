import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./addItemForm";
import EditTableSpan from "./EditTableSpan";

import {Delete} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (taskTitle: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, title: string) => void
    removeTodoList: (todoListID: string) => void
}

export function Todolist(props: PropsType) {


    /*const [title, setTitle] = useState <string>('')
    let [error, setError] =useState <string | null > (null)*/

    let tasks = props.tasks.map(t => {
        const removeTask = () => {
            props.removeTask(t.id, props.id)
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        }
        const changeTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.id)
        }
        return (
            <div key={t.id} className={t.isDone ? 'is_done' : ''}>
                <Checkbox
                    color='primary'
                    /*type="checkbox"*/
                    onChange={changeStatus}
                    checked={t.isDone}/>
                <EditTableSpan title={t.title} changeTitle={changeTitle}/>
                {/*<span>{t.title}</span>*/}
                <IconButton color='default' onClick={removeTask}>
                    <Delete/>
                </IconButton>


            </div>
        )
    })

    // const addTask = () => {
    //     if (title.trim() !== ''){
    //     props.addTask(title.trim(), props.id)
    //     setTitle('')
    //     } else {
    //        setError('Title is required!')
    //     }
    // }

    /*const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }*/

    /*
        const onPressKey =  (e: KeyboardEvent<HTMLInputElement>) => {if(e.key === 'Enter'){addTask()}}
    */

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(props.id, title)
    }
    const removeTodoList = () => props.removeTodoList(props.id)

    const onSetAllFilter = () => props.changeFilter('all', props.id)
    const onSetActiveFilter = () => props.changeFilter('active', props.id)
    const onSetCompletedFilter = () => props.changeFilter('completed', props.id)

    return (
        <div>
            <h3>
                <EditTableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            {/*<div>
                <input value={title}
                       onChange={ onChange }
                       onKeyPress={ onPressKey }
                       className={error ? 'error': ''}
                />
                <button onClick={ addTask }>+</button>
                {error && <div className={'error_message'}>{error}</div>}
            </div>*/}
            <div>
                {tasks}
            </div>
            <div>
                <Button color='inherit' variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={onSetAllFilter}>All</Button>
                <Button color='primary'  variant={props.filter === 'active' ? 'outlined' : 'text'} onClick={onSetActiveFilter}>Active
                </Button>
                <Button color='secondary' variant={props.filter === 'completed' ? 'outlined' : 'text'}
                        onClick={onSetCompletedFilter}>Completed
                </Button>
            </div>
        </div>
    )
}