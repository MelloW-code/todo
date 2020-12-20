import React, {useState} from 'react';
import {Todolist} from "./Todolist";
import {v1} from 'uuid';
import AddItemForm from "./addItemForm";
import {AppBar} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {Menu} from "@material-ui/icons";
import classes from './App.module.css'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    /*let [tasks, setTasks]  =  useState <Array<TaskType>>(
         [
             {id: v1(), title: "HTML", isDone: true},
             {id: v1(), title: "JS", isDone: false},
             {id: v1(), title: "Redux", isDone: false},
             {id: v1(), title: "PHP", isDone: true},
             {id: v1(), title: "JSX", isDone: true},
             {id: v1(), title: "SQL", isDone: true}
         ]
     )*/

    const todoListID1 = v1()
    const todoListID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: 'What to learn', filter: 'all'},
        {id: todoListID2, title: 'What to buy', filter: 'active'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListID1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "Redux", isDone: false}
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Fish", isDone: false}
        ]
    })

    function addTask(taskTitle: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: taskTitle,
            isDone: false
        }
        const todoList = tasks[todoListID]
        tasks[todoListID] = [newTask, ...todoList]
        setTasks({...tasks})
    }

    function removeTask(taskID: string, todoListID: string) {
        const todoList = tasks[todoListID]
        tasks[todoListID] = todoList.filter(t => t.id !== taskID)
        setTasks({...tasks})
    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        const todoList = tasks[todoListID]
        const task = todoList.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }

        /* let task = tasks.find(task => task.id === taskID)
         if (task) {
             task.isDone = isDone
             setTasks([...tasks])
         }*/
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const todoList = tasks[todoListID]
        const task = todoList.find(t => t.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }

        /* let task = tasks.find(task => task.id === taskID)
         if (task) {
             task.isDone = isDone
             setTasks([...tasks])
         }*/
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        //setTasks({...tasks})
    }

    function addTodoList(title: string) {
        const newTodolistID = v1()
        const newTodoList: TodoListType = {
            id: newTodolistID, title: title, filter: 'all'
        }
        setTodoLists([newTodoList, ...todoLists])
        setTasks({...tasks, [newTodolistID]: []})
    }

    function changeTodoListTitle(todoListID: string, title: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Grid container style={{padding:'20px'}} >
                <AddItemForm addItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todoLists.map(tl => {
                        let tasksForToDoList = tasks[tl.id]
                        if (tl.filter === "active") {
                            tasksForToDoList = tasks[tl.id].filter(t => t.isDone === false)
                        }
                        if (tl.filter === "completed") {
                            tasksForToDoList = tasks[tl.id].filter(t => t.isDone === true)
                        }
                        return ( <Grid item>
                                <Paper style={{padding:'10px'}}>
                            <Todolist
                                key={tl.id}
                                id={tl.id}
                                title={tl.title}
                                filter={tl.filter}
                                tasks={tasksForToDoList}
                                addTask={addTask}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                removeTodoList={removeTodoList}
                                changeTaskStatus={changeTaskStatus}
                                changeTaskTitle={changeTaskTitle}
                                changeTodoListTitle={changeTodoListTitle}
                            />
                                </Paper>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </div>
    );
}

export default App;

