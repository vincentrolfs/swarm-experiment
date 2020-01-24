import {ADD_AGENT, RANDOMIZE_AGENT_BEHAVIOUR, REMOVE_AGENT, SET_AGENT_BEHAVIOUR, SET_PARTNER_ID} from "../actions";
import {AMOUNT_DEFAULT_AGENTS, AMOUNT_DISTINCT_COLORS, ARENA_RADIUS} from "../../utils/constants";
import distinctColors from "distinct-colors";
import update from 'immutability-helper';

let nextAgentId = 1;
const colors = distinctColors({ count: AMOUNT_DISTINCT_COLORS }).map(c => c.hex());
const defaultAgents = createDefaultAgents();

export const determineHighestAgentId = (agents) => {
    if (agents) {
        nextAgentId = 1 + Math.max(...Object.values(agents).map(a => parseInt(a.id))) || 1;
    }
};

export const agents = (state = defaultAgents, action) => {
    switch (action.type) {
        case ADD_AGENT:
            return {...state, ...createAgentSpec()};
        case SET_AGENT_BEHAVIOUR:
            return update(state, { [action.agent_id] : { behaviour: { $set: action.behaviour } } });
        case RANDOMIZE_AGENT_BEHAVIOUR:
            return update(state, { [action.agent_id] : { behaviour: { $set: getRandomBehaviour() } } });
        case SET_PARTNER_ID:
            return update(state, { [action.agent_id] : { partner_id: { $set: action.partner_id || null } } });
        case REMOVE_AGENT:
            return computeRemoveAgent(state, action.agent_id);
        default:
            return state
    }
};

function createDefaultAgents() {
    let defaultAgents = {};

    for (let i = 0; i < AMOUNT_DEFAULT_AGENTS; i++) {
        defaultAgents = {...defaultAgents, ...createAgentSpec()};
    }

    const allIds = Object.keys(defaultAgents);

    allIds.forEach(function (id) {
        const agent = defaultAgents[id];
        agent.partner_id = pickForeignId(id, allIds);
    });

    return defaultAgents;
}

function pickForeignId(myId, allIds) {
    let foreignId;

    do {
        foreignId = allIds[parseInt(Math.random() * allIds.length)];
    } while (foreignId === myId);

    return foreignId;
}

function createAgentSpec() {
    const id = (nextAgentId++).toString();
    const partner_id = null;
    const behaviour = getRandomBehaviour();
    const color = colors[id % colors.length];

    return {[id]: {id, partner_id, behaviour, color}}
}

function getRandomBehaviour() {
    return Math.random() * 4 * ARENA_RADIUS - 2 * ARENA_RADIUS
}

function computeRemoveAgent(agents, agent_id) {
    const newAgents = {...agents};
    delete newAgents[agent_id];

    for (let id in newAgents){
        if (!newAgents.hasOwnProperty(id)){ continue; }

        if (newAgents[id].partner_id === agent_id){
            newAgents[id].partner_id = null;
        }
    }

    return newAgents;
}