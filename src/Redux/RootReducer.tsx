import { combineReducers } from "redux";
import todosSlice from "./reducers/todosReducer";
import getSingleSlice from "./reducers/todoSingleReducer";
import modalSlice from './reducers/modal'
import paginateSlice from "./reducers/pagination";

const store = {
    modal: modalSlice.reducer,
    todos: todosSlice.reducer,
    fetchSingle: getSingleSlice.reducer,
    paginate: paginateSlice.reducer
};

export default combineReducers(store);