export const SET_BEHAVIOUR_UPDATE_RULE = 'SET_BEHAVIOUR_UPDATE_RULE';
export const setBehaviourUpdateRule = rule => ({
    type: SET_BEHAVIOUR_UPDATE_RULE,
    payload: {
        rule
    }
});