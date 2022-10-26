import {FilterValuesType, TodoListType} from "../App";
import {
  AddTodoListActionCreator,
  ChangeTodoListFilterActionCreator, ChangeTodoListTitleActionCreator,
  RemoveTodoListActionCreator,
  todolistsReducer
} from "./todolists-reducer";
import {v1} from "uuid";

let todolistId1: string
let todolistId2: string
let startState: TodoListType[]

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"},
  ]
})

test('correct todolist should be removed', () => {


  const endState = todolistsReducer(startState, RemoveTodoListActionCreator(todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {

  let newTodoListTitle = "New TodoList"

  const endState = todolistsReducer(startState, AddTodoListActionCreator(newTodoListTitle))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTodoListTitle)
})

test('correct filter of todolist should be changed', () => {

  let newFilter: FilterValuesType = "completed"

  const endState = todolistsReducer(startState, ChangeTodoListFilterActionCreator(newFilter, todolistId2))

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(newFilter)
})

test('correct todolist should change its name', () => {

  let newTodoListTitle = "New TodoList"

  const endState = todolistsReducer(startState, ChangeTodoListTitleActionCreator(newTodoListTitle, todolistId2))

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(newTodoListTitle)
})