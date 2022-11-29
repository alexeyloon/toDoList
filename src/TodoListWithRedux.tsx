import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./AppWithRedux";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton,ListItem} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import AddItemForm from "./AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./TodoList";
import {
  ChangeTodoListFilterActionCreator,
  ChangeTodoListTitleActionCreator,
  RemoveTodoListActionCreator
} from "./state/todolists-reducer";
import {addTaskActionCreator, changeTaskStatusAC, removeTaskActionCreator} from "./state/tasks-reducer";

export  type TodoListWithReduxPropsType = {
  todolistId: string
  title: string
  filter: FilterValuesType
}

export const TodoListWithRedux = ({todolistId, title, filter}: TodoListWithReduxPropsType) => {

  let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolistId])
  const dispatch = useDispatch()
  const removeTodoList = () => {
    dispatch(RemoveTodoListActionCreator(todolistId))
  }
  const changeTodoListTitle = (title: string) => {
    dispatch(ChangeTodoListTitleActionCreator(title, todolistId))
  }

  const addTask = (title: string) => {
    dispatch(addTaskActionCreator(title, todolistId))
  }

  const handlerCreator = (filter: FilterValuesType, todoListId: string) => {
    return () => dispatch(ChangeTodoListFilterActionCreator(filter, todoListId))
  }
  if (filter === "active") {
    tasks = tasks.filter(t => t.isDone === false)
  }
  if (filter === "completed") {
    tasks = tasks.filter(t => t.isDone === true)
  }
  return (
    <>
      <div>
        <h3>
          <EditableSpan title={title} changeTitle={changeTodoListTitle}/>.
          <IconButton
            size="small"
            color={"secondary"}
            onClick={removeTodoList}>
            <DeleteIcon/>
          </IconButton>

        </h3>
        <div>
          <AddItemForm addItem={addTask}/>
        </div>

        {tasks.map(task => {
          const changeTaskTitle = (title: string) => {
            dispatch(ChangeTodoListTitleActionCreator(title, todolistId))
          }
          return (
            <ListItem
              key={task.id}
              className={task.isDone ? "is-done" : ""}
              style={{padding: "0"}}
            >
              <Checkbox
                style={{color: "blue"}}
                onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todolistId))}
                checked={task.isDone}
              />
              <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
              <IconButton
                size="small"
                color={"secondary"}
                onClick={() => dispatch(removeTaskActionCreator(task.id, todolistId))}>
                <DeleteIcon/>
              </IconButton>
            </ListItem>
          )
        })}

        <div>
          <ButtonGroup size="small" variant="contained" style={{marginRight: "50px"}}
                       aria-label="contained primary button group">
            <Button
              disableElevation
              color={filter === "all" ? "secondary" : "primary"}
              onClick={handlerCreator("all", todolistId)}>All
            </Button>
            <Button
              disableElevation
              color={filter === "active" ? "secondary" : "primary"}
              onClick={handlerCreator("active", todolistId)}>Active
            </Button>
            <Button
              disableElevation
              color={filter === "completed" ? "secondary" : "primary"}
              onClick={handlerCreator("completed", todolistId)}>Completed
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
};

