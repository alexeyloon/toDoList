import React, {ChangeEvent, useState} from 'react';
import {KeyboardEvent} from "react";
import AddItemForm from "./AddItemForm";
import {FilterValuesType} from "./App";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';


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
const TodoList = (props: TodoListType) => {
    const taskItems = props.tasks.length
        ? props.tasks.map(task => {
            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(task.id, title, props.todoListId)
            }
            return (
                <ListItem
                    key={task.id}
                    className={task.isDone ? "is-done" : ""}
                    style={{padding:"0"}}
                >
                    <Checkbox
                        style={{color: "blue"}}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)}
                        checked={task.isDone}
                    />
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <IconButton
                        size="small"
                        color={"secondary"}
                        onClick={() => props.removeTask(task.id, props.todoListId)}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItem>
            )
        })
        : <span>Task list is empty</span>// ternarnik

    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId)
    const handlerCreator = (filter: FilterValuesType, todoListId: string) => {
        return () => props.changeTodoListFilter(filter, todoListId)
    }

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
                    {taskItems}
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
};

export default TodoList;