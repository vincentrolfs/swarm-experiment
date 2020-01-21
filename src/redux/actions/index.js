export const SET_BEHAVIOUR_RESET_RULE = 'SET_BEHAVIOUR_RESET_RULE';
export const setBehaviourResetRule = rule => ({
    type: SET_BEHAVIOUR_RESET_RULE,
    payload: {
        rule
    }
});