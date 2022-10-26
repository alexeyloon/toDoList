import {v1} from "uuid";
import React, {useEffect, useReducer, useState} from "react";
import TodoList, {TaskType} from "./TodoList";
import AddItemForm from "./AddItemForm";
import './App.css'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
  AddTodoListActionCreator,
  ChangeTodoListFilterActionCreator,
  ChangeTodoListTitleActionCreator, RemoveTodoListActionCreator,
  todolistsReducer
} from "./state/todolists-reducer";
import {
  addTaskActionCreator,
  changeTaskStatusAC, changeTaskTitleAC,
  removeTaskActionCreator,
  tasksReducer
} from "./state/tasks-reducer";

export  type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TasksStateType = {
  [todoListId: string]: TaskType[]
}

function AppWithReducer() {
  //BLL

  const todoListId_1 = v1();
  const todoListId_2 = v1();

  const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
    {id: todoListId_1, title: "Learn today", filter: "all"},
    {id: todoListId_2, title: "Buy today", filter: "all"},
  ])
  const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todoListId_1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "React", isDone: false},
      {id: v1(), title: "Storm", isDone: true},
    ],
    [todoListId_2]: [
      {id: v1(), title: "Beer", isDone: true},
      {id: v1(), title: "Meat", isDone: true},
      {id: v1(), title: "Fish", isDone: false},
      {id: v1(), title: "Bread", isDone: true},
    ]
  })

// tasks CRUD
  const removeTask = (taskId: string, todoListId: string) => {
    dispatchToTasks(removeTaskActionCreator(taskId, todoListId))
  }
  const addTask = (title: string, todoListId: string) => {
    dispatchToTasks(addTaskActionCreator(title, todoListId))
  }
  const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
    dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId))
  }
  const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
    dispatchToTasks(changeTaskTitleAC(taskId, title, todoListId))
  }

//todoList CRUD
  const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
    dispatchToTodoLists(ChangeTodoListFilterActionCreator(filter, todoListId))
  }
  const changeTodoListTitle = (title: string, todoListId: string) => {
    dispatchToTodoLists(ChangeTodoListTitleActionCreator(title, todoListId))
  }
  const removeTodoList = (todoListId: string) => {
    let action = RemoveTodoListActionCreator(todoListId)
    dispatchToTodoLists(action)
    dispatchToTasks(action)
  }
  const addTodoList = (title: string) => {
    let action = AddTodoListActionCreator(title)
    dispatchToTodoLists(action)
    dispatchToTasks(action)
  }

  // useEffect(() => {
  //     console.log(todoLists)
  // }, [todoLists])

  //UI

  const getTaskForTodoList = (todoList: TodoListType) => {
    switch (todoList.filter) {
      case "active":
        return tasks[todoList.id].filter(t => !t.isDone)
      case "completed":
        return tasks[todoList.id].filter(t => t.isDone)
      default:
        return tasks[todoList.id]
    }
  }

  const todoListsComponents = todoLists.map(tl => {
    const tasks = getTaskForTodoList(tl)
    return (
      <Grid item key={tl.id}>
        <Paper elevation={6} style={{padding: "20px"}}>
          <TodoList
            title={tl.title}
            tasks={tasks}
            removeTask={removeTask}
            changeTodoListFilter={changeTodoListFilter}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            filter={tl.filter}
            todoListId={tl.id}
            removeTodoList={removeTodoList}
            changeTaskTitle={changeTaskTitle}
            changeTodoListTitle={changeTodoListTitle}

          />
        </Paper>
      </Grid>
    )
  })
  //UI
  return (
    <div className="App">
      <AppBar position={"static"}>
        <Toolbar style={{justifyContent: "space-between"}}>
          <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
            <Menu/>
          </IconButton>
          <Typography variant={"h6"}>
            TodoList
          </Typography>
          <Button color={"inherit"} variant={"outlined"}>Login</Button>
        </Toolbar>

      </AppBar>
      <Container fixed>
        <Grid container style={{padding: "20px 0px"}}>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={5} justifyContent={"center"}>
          {todoListsComponents}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducer;