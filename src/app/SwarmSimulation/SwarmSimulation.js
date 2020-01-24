import {Vector} from "../Vector/Vector";
import {AGENT_RADIUS, ARENA_RADIUS, CENTER} from "../../utils/constants";
import {store} from "../../redux/store";
import {behaviourUpdateRules} from "../../redux/constants/settings";
import {randomizeAgentBehaviour} from "../../redux/actions";

export class SwarmSimulation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.agents = {};
        this.positions = {};
        this.movementChangeTimestamps = {};
        this.hasMovedLastUpdate = {};
        this.loopCounter = 1;

        this.loopInterval = null;

        this.runLoop();
    }

    runLoop() {
        this.loadAgents();
        this.draw();

        this.loopInterval = setInterval(() => {
            try {
                this.draw();
                this.loadAgents();
                this.updatePositions();
                this.loopCounter++;
            } catch (e) {
                clearInterval(this.loopInterval);
                throw e;
            }
        }, 5)
    }

    draw() {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawArena();

        for (let id in this.positions) {
            this.drawAgent(id);
        }
    }

    drawArena() {
        this.ctx.beginPath();
        this.ctx.arc(CENTER.x, CENTER.y, ARENA_RADIUS, 0, 2 * Math.PI, false);
        this.ctx.lineWidth = 8;

        const grd = this.ctx.createRadialGradient(CENTER.x, CENTER.y, ARENA_RADIUS, CENTER.x, CENTER.y, ARENA_RADIUS + 50);

        grd.addColorStop(0, 'black');
        grd.addColorStop(.2, 'white');
        this.ctx.strokeStyle = grd;
        this.ctx.stroke();
    }

    drawAgent(id) {
        const {ctx} = this;
        const {x, y} = this.positions[id];
        const color = this.agents[id].color;
        const partnerColor = this.agents[this.agents[id].partnerId].color;
        const partnerRelationshipGood = 1 === Math.sign(this.agents[id].behaviour);

        ctx.beginPath();
        ctx.arc(x, y, AGENT_RADIUS, 0, 2 * Math.PI, false);
        ctx.fillStyle = color;
        ctx.fill();

        ctx.font = '15px serif';
        ctx.fillText(partnerRelationshipGood ? '❤️' : '🔥', x + 10, y - 10);

        ctx.beginPath();
        ctx.arc(x + AGENT_RADIUS / 3, y + AGENT_RADIUS / 3, AGENT_RADIUS / 3, 0, 2 * Math.PI, false);
        ctx.fillStyle = partnerColor;
        ctx.fill();
    }

    loadAgents() {
        this.agents = store.getState().agents;

        for (let id in this.agents) {
            if (!this.positions.hasOwnProperty(id)) {
                this.positions[id] = new Vector();
                this.movementChangeTimestamps[id] = 0;
                this.hasMovedLastUpdate[id] = false;
            }
        }

        for (let id in this.positions) {
            if (!this.agents.hasOwnProperty(id)) {
                delete this.positions[id];
                delete this.movementChangeTimestamps[id];
                delete this.hasMovedLastUpdate[id];
            }
        }
    }

    updatePositions() {
        const {positions, agents} = this;
        const newPositions = [];

        for (let id in agents) {
            const agent = agents[id];
            if (!agent.partnerId) {
                continue;
            }

            const myPosition = positions[id];
            const partnerPosition = positions[agent.partnerId];
            const goalDistance = agent.behaviour;

            const [newPosition, hasMoved] = this.findNewPosition(myPosition, partnerPosition, goalDistance);
            newPositions[id] = newPosition;

            this.updateHasMovedLastUpdate(id, hasMoved);
            this.updateBehaviour(id, hasMoved);
        }

        this.positions = newPositions;
    }

    updateHasMovedLastUpdate(id, hasMoved) {
        if (this.hasMovedLastUpdate[id] !== hasMoved) {
            this.movementChangeTimestamps[id] = this.loopCounter;
            this.hasMovedLastUpdate[id] = hasMoved;
        }
    }

    updateBehaviour(id, hasMoved) {
        const behaviourUpdateRule = store.getState().settings.behaviourUpdateRule;

        if (behaviourUpdateRule === behaviourUpdateRules.NEVER) {
            return;
        }

        if (behaviourUpdateRule === behaviourUpdateRules.ONLY_STATIONARY && hasMoved) {
            return;
        }

        const timeDelta = this.loopCounter - this.movementChangeTimestamps[id];
        const n = 10000;
        const k = n / 8;
        const changeProbability = (Math.exp(timeDelta / k) - Math.exp(1 / k)) / (Math.exp(n / k) - Math.exp(1 / k));

        if (Math.random() > changeProbability) {
            return;
        }

        store.dispatch(randomizeAgentBehaviour(id));
    }

    findNewPosition(myPosition, partnerPosition, goalDistance) {
        const directionMultiplier = this.findDirectionMultiplier(myPosition, partnerPosition, goalDistance);
        if (directionMultiplier === 0) {
            return [myPosition, false];
        }

        const direction = partnerPosition.subtract(myPosition).multiply(directionMultiplier);

        return [myPosition.moveUniform(direction), true];
    }

    findDirectionMultiplier(myPosition, partnerPosition, goalDistance) {
        const currentDistance = myPosition.distance(partnerPosition);
        const goalDistanceSign = Math.sign(goalDistance);

        if (goalDistanceSign > 0) {
            goalDistance = 2 * ARENA_RADIUS - goalDistance;
        }

        return (goalDistanceSign * currentDistance > goalDistance) ? goalDistanceSign : 0;
    }
}