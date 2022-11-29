import React, {ChangeEvent, memo, useCallback, useState} from 'react';
import {KeyboardEvent} from "react";
import AddItemForm from "./AddItemForm";
import {FilterValuesType} from "./App";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {Task} from "./Task";
import TaskWithRedux from "./TaskWithRedux";


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
type TodoListType = {
  todoListId: string
  title: string
  tasks: Array<TaskType>
  removeTask: (taskId: string, todoListId: string) => void
  changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void
  filter: FilterValuesType
  removeTodoList: (todoListId: string) => void
  changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
  changeTodoListTitle: (title: string, todoListId: string) => void
}
const TodoList = memo((props: TodoListType) => {
  const addTask = useCallback((title: string) => {
    props.addTask(title, props.todoListId)
  }, [props.addTask, props.todoListId])
  const changeTodoListTitle = useCallback((title: string) =>
    props.changeTodoListTitle(title, props.todoListId), [props.changeTodoListTitle, props.todoListId])
  const handlerCreator = (filter: FilterValuesType, todoListId: string) => {
    return () => props.changeTodoListFilter(filter, todoListId)
  }
  const changeTaskTitle = useCallback((taskId: string, title: string) => {
    props.changeTaskTitle(taskId, title, props.todoListId)
  },[props.changeTaskTitle,props.todoListId])
  const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.todoListId),[props.removeTask,props.todoListId])
  const changeTaskStatus = useCallback((taskId: string, status: boolean) => {
    props.changeTaskStatus(taskId, status, props.todoListId)
    const taskItems = props.tasks.length
      ? props.tasks.map(task => {
        return <TaskWithRedux
          key={task.id}
          task={task}
          todolistId={props.todoListId}
         />
      })
      : <span>Task list is empty</span>// ternarnik
  },[props.changeTaskStatus,props.todoListId])
  return (
    <>
      <div>
        <h3>
          <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>.
          <IconButton
            size="small"
            color={"secondary"}
            onClick={() => props.removeTodoList(props.todoListId)}>
            <DeleteIcon/>
          </IconButton>

        </h3>
        <div>
          <AddItemForm addItem={addTask}/>
        </div>
        <List>
          {/*{taskItems}*/}
        </List>
        <div>
          <ButtonGroup size="small" variant="contained" style={{marginRight: "50px"}}
                       aria-label="contained primary button group">
            <Button
              disableElevation
              color={props.filter === "all" ? "secondary" : "primary"}
              onClick={handlerCreator("all", props.todoListId)}>All
            </Button>
            <Button
              disableElevation
              color={props.filter === "active" ? "secondary" : "primary"}
              onClick={handlerCreator("active", props.todoListId)}>Active
            </Button>
            <Button
              disableElevation
              color={props.filter === "completed" ? "secondary" : "primary"}
              onClick={handlerCreator("completed", props.todoListId)}>Completed
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
});

export default TodoList;