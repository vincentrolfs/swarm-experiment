import { combineReducers } from 'redux'
import { settings } from "./settings";
import {agents} from "./agents";

export default combineReducers({
    settings,
    agents
})