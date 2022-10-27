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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListWithRedux} from "./TodoListWithRedux";

export  type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TasksStateType = {
  [todoListId: string]: TaskType[]
}

function AppWithRedux() {
  //BLL

  const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)


  const dispatch = useDispatch()

// tasks CRUD
  const removeTask = (taskId: string, todoListId: string) => {
    dispatch(removeTaskActionCreator(taskId, todoListId))
  }
  const addTask = (title: string, todoListId: string) => {
    dispatch(addTaskActionCreator(title, todoListId))
  }
  const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
    dispatch(changeTaskStatusAC(taskId, isDone, todoListId))
  }
  const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
    dispatch(changeTaskTitleAC(taskId, title, todoListId))
  }

//todoList CRUD
  const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
    dispatch(ChangeTodoListFilterActionCreator(filter, todoListId))
  }
  const changeTodoListTitle = (title: string, todoListId: string) => {
    dispatch(ChangeTodoListTitleActionCreator(title, todoListId))
  }
  const removeTodoList = (todoListId: string) => {
    dispatch(RemoveTodoListActionCreator(todoListId))
  }
  const addTodoList = (title: string) => {
    dispatch(AddTodoListActionCreator(title))
  }

  // useEffect(() => {
  //     console.log(todoLists)
  // }, [todoLists])

  //UI


  const todoListsComponents = todoLists.map(tl => {
     return (
      <Grid item key={tl.id}>
        <Paper elevation={6} style={{padding: "20px"}}>
          <TodoListWithRedux
            todolistId={tl.id}
            title={tl.title}
            filter={tl.filter}
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

export default AppWithRedux;