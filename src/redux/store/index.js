import rootReducer from '../reducers'
import {applyMiddleware, createStore} from "redux";
import logger from 'redux-logger'

export const store = createStore(
    rootReducer,
    applyMiddleware(logger)
);