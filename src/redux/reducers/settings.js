import { ALL } from "../constants/behaviourResetRules";

const defaultSettings = {
    behaviourResetRule: ALL
};

export const settings = (state = defaultSettings, action) => {
    switch (action.type) {
        case 'SET_BEHAVIOUR_RESET_RULE':
            return {...state, behaviourResetRule: action.rule};
        default:
            return state
    }
};