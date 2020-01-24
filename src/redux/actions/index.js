export const SET_BEHAVIOUR_UPDATE_RULE = 'SET_BEHAVIOUR_UPDATE_RULE';
export const setBehaviourUpdateRule = rule => ({
    type: SET_BEHAVIOUR_UPDATE_RULE,
    rule
});

export const ADD_AGENT = 'ADD_AGENT';
export const addAgent = () => ({
    type: ADD_AGENT
});

export const SET_AGENT_BEHAVIOUR = 'SET_AGENT_BEHAVIOUR';
export const setAgentBehaviour = (agent_id, behaviour) => ({
    type: SET_AGENT_BEHAVIOUR,
    agent_id,
    behaviour
});

export const RANDOMIZE_AGENT_BEHAVIOUR = 'RANDOMIZE_AGENT_BEHAVIOUR';
export const randomizeAgentBehaviour = (agent_id) => ({
    type: RANDOMIZE_AGENT_BEHAVIOUR,
    agent_id
});