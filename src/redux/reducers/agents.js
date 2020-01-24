import {ADD_AGENT, RANDOMIZE_AGENT_BEHAVIOUR, SET_AGENT_BEHAVIOUR} from "../actions";
import {AMOUNT_DEFAULT_AGENTS, AMOUNT_DISTINCT_COLORS, ARENA_RADIUS} from "../../utils/constants";
import distinctColors from "distinct-colors";
import update from 'immutability-helper';

let highestAgentId = 1;
const colors = distinctColors({ count: AMOUNT_DISTINCT_COLORS }).map(c => c.hex());
const defaultAgents = createDefaultAgents();

export const agents = (state = defaultAgents, action) => {
    switch (action.type) {
        case ADD_AGENT:
            return {...state, ...createAgentSpec()};
        case SET_AGENT_BEHAVIOUR:
            return update(state, { [action.agent_id] : { behaviour: { $set: action.behaviour } } });
        case RANDOMIZE_AGENT_BEHAVIOUR:
            return update(state, { [action.agent_id] : { behaviour: { $set: getRandomBehaviour() } } });
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
        agent.partnerId = pickForeignId(id, allIds);
    });

    return defaultAgents;
}

function pickForeignId(myId, allIds) {
    myId = parseInt(myId);
    let foreignId;

    do {
        foreignId = parseInt(allIds[parseInt(Math.random() * allIds.length)]);
    } while (foreignId === myId);

    return foreignId;
}

function createAgentSpec() {
    const id = highestAgentId++;
    const partnerId = null;
    const behaviour = getRandomBehaviour();
    const color = colors[id % colors.length];

    return {[id]: {id, partnerId, behaviour, color}}
}

function getRandomBehaviour() {
    return Math.random() * 4 * ARENA_RADIUS - 2 * ARENA_RADIUS
}