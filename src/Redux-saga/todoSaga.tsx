import { AxiosResponse } from 'axios';
import api from '../API/Todos'
import {put, call, takeLatest, ForkEffect, StrictEffect} from 'redux-saga/Effects';
import { todo } from '../objectType/todo';
import { reducerGetSingleFetch } from '../Redux/reducers/todoSingleReducer';
import { typeGetAllFetch, typeDeleteTodo, typeAddTodo, typeUpdateTodo } from '../Redux/reducers/todosReducer';

//watchers
function* todoSaga():Generator<StrictEffect>{
    yield takeLatest(typeGetAllFetch.type, getAllTodoFunction);
    yield takeLatest(reducerGetSingleFetch.type, getSingleTodo);
    yield takeLatest(typeDeleteTodo.type, deleteTodo);
    yield takeLatest(typeAddTodo.type, addTodo);
    yield takeLatest(typeUpdateTodo.type, updateTodo)    
}

//workers
function* getAllTodoFunction(){    
    const allTodos: AxiosResponse = yield call(() =>  api.get(`/`));
    const finalTodo: todo[] = yield allTodos.data;
    yield put({type:'todoReducersSlice/reducerGetAllSuccess', payload: finalTodo})
}

function* getSingleTodo(action : any){   
    const singleTodo: AxiosResponse = yield call(() =>  api.get(`/${action.payload.id}`));
    const finalTodo: todo = yield singleTodo.data;
    yield put({type:'getSingleTodoSlice/reducerGetSingleSuccess', payload: finalTodo})
}

function* deleteTodo(action : any){   
    yield call(() =>  api.delete(`/${action.payload.id}`));
    yield put({type:'todoReducersSlice/reducerDeleteTodo', payload: action.payload.id})
}

function* addTodo(action : any){   
    yield call(()=>api.post('/', action.payload))
    const allTodos: AxiosResponse = yield call(() =>  api.get(`/`));
    const finalTodo: todo[] = yield allTodos.data;
    yield put({type: 'todoReducersSlice/reducerAddTodo', payload: finalTodo})
}

function* updateTodo(action : any){   
    yield call(() =>  api.put('/'+action.payload.id, action.payload));
    yield put({type:'todoReducersSlice/reducerUpdateTodo', payload: action.payload})
}
export default todoSaga;