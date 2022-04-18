import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware, { runSaga } from "redux-saga";
import "regenerator-runtime/runtime";
import todoSaga from "../Redux-saga/todoSaga";

import reducerConnect from "./RootReducer";


const sagaMiddleWare = createSagaMiddleware();

const store = createStore(
    reducerConnect,
    applyMiddleware(sagaMiddleWare)
);

sagaMiddleWare.run(todoSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;