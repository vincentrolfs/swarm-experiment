import rootReducer from '../reducers'
import {applyMiddleware, createStore} from "redux";
import logger from 'redux-logger'
import { save, load } from "redux-localstorage-simple"

export const store = createStore(
    rootReducer,
    load(),
    applyMiddleware(logger, save()),
);