import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {todo} from '../../objectType/todo';

interface todoState {
    todos: todo[],
    isLoading: boolean
    sortNew: boolean
}

const initialState = {todos: [], isLoading: false, sortNew: true} as todoState
  
const todosSlice = createSlice({
    name: 'todoReducersSlice',
    initialState,
    reducers:{
        typeGetAllFetch:(state) =>{
            state.isLoading = true
        },
        typeDeleteTodo:(state,action) =>{
            state.isLoading = true
        },
        typeAddTodo:(state,action) =>{
            state.isLoading = true
        },
        typeUpdateTodo:(state,action) =>{
            state.isLoading = true
        },        
        reducerGetAllSuccess: (state, action: PayloadAction<todo[]>)=>{
            const tempArr = action.payload.sort((a, b)=>
                (new Date(a.targetDate) < new Date(b.targetDate)? -1 : 1)
            )
            state.todos = tempArr
            state.isLoading = false
        },
        reducerDeleteTodo:(state, action)=>{
            state.todos = state.todos.filter(i => i.id !==action.payload)
            state.isLoading = false
        },
        reducerAddTodo:(state, action)=>{
            state.todos = action.payload
            state.isLoading = false
        },
        reducerUpdateTodo:(state, action)=>{
             const temp = state.todos.map((todo)=>{
                return todo.id === action.payload.id? action.payload : todo;
                })
            state.todos = temp
            state.isLoading = false
        },
        reducerSortTodo:(state)=>{
            state.sortNew = !state.sortNew
            const tempArr = state.sortNew? state.todos.sort((a, b)=>
            (new Date(a.targetDate) < new Date(b.targetDate)? -1 : 1)) : state.todos.sort((a, b)=>
            (new Date(a.targetDate) < new Date(b.targetDate)? 1 : -1))
            state.todos = tempArr
        }
    }
})
export const {typeGetAllFetch, typeDeleteTodo, typeAddTodo, typeUpdateTodo,
            reducerGetAllSuccess, reducerDeleteTodo, reducerAddTodo, reducerUpdateTodo, reducerSortTodo} = todosSlice.actions;
export default todosSlice