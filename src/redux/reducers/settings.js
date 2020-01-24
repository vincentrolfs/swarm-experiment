import { behaviourUpdateRules } from "../constants/settings";
import {SET_BEHAVIOUR_UPDATE_RULE} from "../actions";

const defaultSettings = {
    behaviourUpdateRule: behaviourUpdateRules.NEVER
};

export const settings = (state = defaultSettings, action) => {
    switch (action.type) {
        case SET_BEHAVIOUR_UPDATE_RULE:
            return {...state, behaviourUpdateRule: action.rule};
        default:
            return state
    }
};