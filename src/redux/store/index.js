import rootReducer from '../reducers'
import {applyMiddleware, createStore} from "redux";
import logger from 'redux-logger'
import { save, load } from "redux-localstorage-simple"
import {determineHighestAgentId} from "../reducers/agents";

const preloadedState = load();
determineHighestAgentId(preloadedState.agents);

export const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(logger, save()),
);