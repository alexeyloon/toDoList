import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListActionType = {
  type: "REMOVE-TODOLIST"
  todoListId: string
}

type AddTodoListActionType = {
  type: "ADD-TODOLIST"
  title: string
  todolistId: string
}

type ChangeTodoListFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER"
  filter: FilterValuesType
  todoListId: string
}

type ChangeTodoListTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE"
  title: string
  todoListId: string
}

type ActionType =
  RemoveTodoListActionType
  | AddTodoListActionType
  | ChangeTodoListFilterActionType
  | ChangeTodoListTitleActionType

const initialState: TodoListType[] = []

export const todolistsReducer = (state = initialState, action: ActionType): Array<TodoListType> => {

  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter(tl => tl.id !== action.todoListId)
    case "ADD-TODOLIST":
      return [...state, {id: action.todolistId, title: action.title, filter: "all"}]
    case "CHANGE-TODOLIST-FILTER":
      return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
    case "CHANGE-TODOLIST-TITLE":
      return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
    default:
      return state
  }

}

export const RemoveTodoListActionCreator = (id: string): RemoveTodoListActionType => ({
  type: "REMOVE-TODOLIST",
  todoListId: id
})
export const AddTodoListActionCreator = (title: string): AddTodoListActionType => ({
  type: "ADD-TODOLIST",
  title: title,
  todolistId: v1()
})
export const ChangeTodoListFilterActionCreator = (filter: FilterValuesType, todoListId: string): ChangeTodoListFilterActionType => ({
  type: "CHANGE-TODOLIST-FILTER",
  filter: filter,
  todoListId: todoListId
})
export const ChangeTodoListTitleActionCreator = (title: string, todoListId: string): ChangeTodoListTitleActionType => ({
  type: "CHANGE-TODOLIST-TITLE",
  title: title,
  todoListId: todoListId
});

