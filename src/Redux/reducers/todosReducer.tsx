import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";
import {todo} from '../../objectType/todo';

interface todoState {
    todos: todo[],
    isLoading: boolean
}

const initialState = {todos: [], isLoading: false} as todoState
  
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
            console.log('at success')
            state.todos = action.payload;
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
        }
    }
})
export const {typeGetAllFetch, typeDeleteTodo, typeAddTodo, typeUpdateTodo,
            reducerGetAllSuccess, reducerDeleteTodo, reducerAddTodo, reducerUpdateTodo} = todosSlice.actions;
export default todosSlice