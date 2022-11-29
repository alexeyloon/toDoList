import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import DeleteIcon from "@material-ui/icons/Delete";
import {TaskType} from "./TodoList";

export type TaskPropsType = {
  task: TaskType
  removeTask: (taskId: string) => void
  changeTaskStatus: (taskId: string, status: boolean) => void
  changeTaskTitle: (taskId: string, title: string) => void

}

export const Task = memo(({
                            changeTaskTitle,
                            ...props
                          }: TaskPropsType) => {

  const onTitleChangeHandler = useCallback((newValue: string) => {
    changeTaskTitle(props.task.id, newValue)
  }, [changeTaskTitle, props.task.id])
  const onClickHandler = () => props.removeTask(props.task.id)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked
    props.changeTaskStatus(props.task.id, newIsDoneValue)
  }
  return (

    <ListItem
      key={props.task.id}
      className={props.task.isDone ? "is-done" : ""}
      style={{padding: "0"}}
    >
      <Checkbox
        style={{color: "blue"}}
        onChange={onChangeHandler}
        checked={props.task.isDone}
      />
      <EditableSpan title={props.task.title} changeTitle={onTitleChangeHandler}/>
      <IconButton
        size="small"
        color={"secondary"}
        onClick={onClickHandler}>
        <DeleteIcon/>
      </IconButton>
    </ListItem>

  );
});

