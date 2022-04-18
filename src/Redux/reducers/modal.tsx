import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'toggleModal',
    initialState: {isOpen: false,
    label: ''},
    reducers:{
        showModal(state, action){
            state.label = action.payload
            state.isOpen = !state.isOpen
        }
    }
})
export const actions = modalSlice.actions;
export default modalSlice