import React, {ChangeEvent, memo, useCallback} from 'react';
import {TaskType} from "./TodoList";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import DeleteIcon from "@material-ui/icons/Delete";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskActionCreator} from "./state/tasks-reducer";

export type TaskWithReduxPropsTYpe = {
  task: TaskType
  todolistId:string
}
const TaskWithRedux = memo(({task,todolistId}: TaskWithReduxPropsTYpe ) => {

  const dispatch = useDispatch()

  const onTitleChangeHandler = (newValue: string) => {
    dispatch(changeTaskTitleAC(task.id, newValue,todolistId))
  }
  const onClickHandler = () => dispatch(removeTaskActionCreator(task.id,todolistId))
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked
    dispatch(changeTaskStatusAC(task.id, newIsDoneValue,todolistId))
  }
  return (

    <ListItem
      key={task.id}
      className={task.isDone ? "is-done" : ""}
      style={{padding: "0"}}
    >
      <Checkbox
        style={{color: "blue"}}
        onChange={onChangeHandler}
        checked={task.isDone}
      />
      <EditableSpan title={task.title} changeTitle={onTitleChangeHandler}/>
      <IconButton
        size="small"
        color={"secondary"}
        onClick={onClickHandler}>
        <DeleteIcon/>
      </IconButton>
    </ListItem>

  );
});

export default TaskWithRedux;