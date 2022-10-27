import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionCreator, RemoveTodoListActionCreator} from "./todolists-reducer";

type RemoveTaskActionType = ReturnType<typeof removeTaskActionCreator>
type AddTaskActionType = ReturnType<typeof addTaskActionCreator>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type AddTodoListActionType = ReturnType<typeof AddTodoListActionCreator>
type RemoveTodoListActionType = ReturnType<typeof RemoveTodoListActionCreator>


type ActionType =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeTaskStatusActionType
  | ChangeTaskTitleActionType
  | AddTodoListActionType
  | RemoveTodoListActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK":
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
      }
    case "ADD-TASK":
      return {
        ...state,
        [action.payload.todolistId]: [{
          id: v1(),
          title: action.payload.title,
          isDone: false
        }, ...state[action.payload.todolistId]]
      }
    case "CHANGE-TASK-STATUS":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId]
          .map(t => t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone} : t)
      }
    case "CHANGE-TASK-TITLE":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId]
          .map(t => t.id === action.payload.taskId ? {...t, title: action.payload.title} : t)
      }
    case "ADD-TODOLIST":
      return {
        ...state,
        [action.todolistId]: []
      }
    case "REMOVE-TODOLIST":
      const {[action.todoListId]: [], ...rest} = {...state}  // delete properties with destructure!!!!
      return rest

    default:
      return state
  }

}

export const removeTaskActionCreator = (taskId: string, todolistId: string) => {
  return {type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId} as const
}
export const addTaskActionCreator = (title: string, todolistId: string) => {
  return {type: "ADD-TASK", payload: {title, todolistId}} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
  return {type: "CHANGE-TASK-STATUS", payload: {taskId, todolistId, isDone}} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
  return {type: "CHANGE-TASK-TITLE", payload: {taskId, title, todolistId}} as const
}
