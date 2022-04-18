import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {todo} from '../../objectType/todo';

interface todoState {
    todo: todo,
    isLoading: boolean
}

const initialState = {todo: {}, isLoading: false} as todoState
const getSingleSlice = createSlice({
    name: 'getSingleTodoSlice',
    initialState,
    reducers:{
        reducerGetSingleFetch:(state, action)=>{
            state.isLoading = true
        },
        reducerGetSingleSuccess: (state, action: PayloadAction<todo>)=>{
            state.todo=action.payload
            state.isLoading = false
        },
        reducerGetSingleReset:(state, action) =>{
            console.log('at reset')
            state.todo=action.payload
        },
    }
})
export const {reducerGetSingleFetch, reducerGetSingleSuccess, reducerGetSingleReset} = getSingleSlice.actions;
export default getSingleSlice