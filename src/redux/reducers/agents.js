import {ADD_AGENT} from "../actions";
import {AMOUNT_DEFAULT_AGENTS, ARENA_RADIUS} from "../../utils/constants";
import {uuid} from "../../utils/utils";

const defaultAgents = createDefaultAgents();

export const agents = (state = defaultAgents, action) => {
    switch (action.type) {
        case ADD_AGENT:
            return {...state, ...createAgentSpec()};
        default:
            return state
    }
};

function createDefaultAgents() {
    let defaultAgents = {};

    for (let i = 0; i < AMOUNT_DEFAULT_AGENTS; i++){
        defaultAgents = {...defaultAgents, ...createAgentSpec()};
    }

    const allIds = Object.keys(defaultAgents);

    allIds.forEach(function(id){
        const agent = defaultAgents[id];
        agent.partnerId = pickForeignid(id, allIds);
    });

    return defaultAgents;
}

function pickForeignid(myId, allIds){
    let foreignId;

    do {
        foreignId = allIds[parseInt(Math.random() * allIds.length)]
    } while (foreignId === myId);

    return foreignId;
}

function createAgentSpec() {
    const id = uuid();
    const partnerId = null;
    const behaviour = getRandomBehaviour();

    return { [id]: { id, partnerId, behaviour }}
}

function getRandomBehaviour() {
    return Math.random()*4*ARENA_RADIUS - 2*ARENA_RADIUS
}