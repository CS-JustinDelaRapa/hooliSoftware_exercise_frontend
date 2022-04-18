import { createSlice, current } from "@reduxjs/toolkit";

const paginateSlice = createSlice({
    name: 'togglePage',
    initialState:{pageNumber: 1},
    reducers:{
        paginatePage(state, action){
            state.pageNumber = action.payload
        }
    }
})
export const {paginatePage} = paginateSlice.actions;
export default paginateSlice