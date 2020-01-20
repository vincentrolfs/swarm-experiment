import {Vector} from "./Vector";
import {AGENT_RADIUS, ARENA_RADIUS, CENTER} from "../../utils/constants";
import distinctColors from "distinct-colors/src";

export class Artist {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.behaviours = [];
        this.positions = [];
        this.colors = [];

        this.initBehaviours();
        this.initPositions();
        this.initColors();

        this.movementChangeTimestamps = new Array(this.behaviours.length).fill(0);
        this.hasMovedLastUpdate = new Array(this.behaviours.length).fill(false);
        this.loopTimestamp = 1;

        this.runLoop();
    }

    getSearchParameter(name){
        return new URL(window.location.href).searchParams.get(name);
    }

    initBehaviours(){
        let amount = parseInt(this.getSearchParameter('amount'));
        if (isNaN(amount) || amount <= 1){ amount = 30; }
        const partners = this._getPermutation(amount);

        for (let i = 0; i < amount; i++){
            // const partner = (i+1) % amount;
            let partner = partners[i];
            do { partner = Math.floor(Math.random() * amount); } while (partner === i);
            partners[i] = partner;
            const rule = this.getRandomBehaviourRule();

            this.behaviours.push([partner, rule])
        }

        this.logCycles(partners);
    }

    logCycles(partners) {
        console.log("Cycles:");

        for (let k = 0; k < partners.length; k++){
            let arr = [];
            let val = k;
            do {
                if (arr.indexOf(val) !== -1){ arr.push(val); break; }
                arr.push(val);
                val = partners[val];
            } while(val !== k);

            console.log(k, arr);
        }
    }

    _getPermutation(length) {
        const numbers = [...Array(length).keys()];

        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

        return numbers;
    }

    getRandomBehaviourRule(){
        return Math.random()*4*ARENA_RADIUS - 2*ARENA_RADIUS;
    }

    initPositions(){
        this.behaviours.forEach(() => this.positions.push(new Vector()));
    }

    initColors(){
        this.colors = distinctColors({count: this.positions.length}).map(c => c.hex());
    }

    runLoop() {
        setInterval(() => {
            this.draw();
            this.updatePositions();
            this.loopTimestamp++;
        }, 5)
    }

    draw(){
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawArena();

        for (let i = 0; i < this.positions.length; i++){
            this.drawAgent(i);
        }
    }

    drawAgent(i){
        const { ctx } = this;
        const { x, y } = this.positions[i];
        const color = this.colors[i];
        const partnerColor = this.colors[this.behaviours[i][0]];
        const partnerRelationshipGood = 1 === Math.sign(this.behaviours[i][1]);

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

    drawArena(){
        this.ctx.beginPath();
        this.ctx.arc(CENTER.x, CENTER.y, ARENA_RADIUS, 0, 2 * Math.PI, false);
        this.ctx.lineWidth = 8;

        const grd = this.ctx.createRadialGradient(CENTER.x, CENTER.y, ARENA_RADIUS, CENTER.x, CENTER.y, ARENA_RADIUS + 50);

        grd.addColorStop(0, 'black');
        grd.addColorStop(.2, 'white');
        this.ctx.strokeStyle = grd;
        this.ctx.stroke();
    }

    updatePositions(){
        const {positions, behaviours} = this;
        const newPositions = [];

        for (let i = 0; i < positions.length; i++){
            if (!behaviours[i]){ continue; }

            const myPosition = positions[i];
            const partnerPosition = positions[behaviours[i][0]];
            const goalDistance = behaviours[i][1];

            const [newPosition, hasMoved] = this.findNewPosition(myPosition, partnerPosition, goalDistance);
            newPositions[i] = newPosition;

            this.updateHasMovedLastUpdate(i, hasMoved);
            this.updateBehaviour(i, hasMoved);
        }

        this.positions = newPositions;
    }

    updateHasMovedLastUpdate(i, hasMoved) {
        if (this.hasMovedLastUpdate[i] !== hasMoved){
            this.movementChangeTimestamps[i] = this.loopTimestamp;
            this.hasMovedLastUpdate[i] = hasMoved;
        }
    }

    updateBehaviour(i, hasMoved){
        if (this.getSearchParameter('no-updates')){
            return;
        }

        const timeDelta = this.loopTimestamp - this.movementChangeTimestamps[i];
        const n = 10000;
        const k = n/8;
        const changeProbability = (Math.exp(timeDelta / k) - Math.exp(1/k))/(Math.exp(n/k) - Math.exp(1/k));
        if (Math.random() > changeProbability){
            return;
        }

        if (this.getSearchParameter('update-only-stationary') && hasMoved){
            return;
        }

        this.behaviours[i][1] = this.getRandomBehaviourRule();
    }

    findNewPosition(myPosition, partnerPosition, goalDistance){
        const directionMultiplier = this.findDirectionMultiplier(myPosition, partnerPosition, goalDistance);
        if (directionMultiplier === 0){ return [myPosition, false]; }

        const direction = partnerPosition.subtract(myPosition).multiply(directionMultiplier);

        return [myPosition.moveUniform(direction), true];
    }

    findDirectionMultiplier(myPosition, partnerPosition, goalDistance){
        const currentDistance = myPosition.distance(partnerPosition);
        const goalDistanceSign = Math.sign(goalDistance);

        if (goalDistanceSign > 0){
            goalDistance = 2 * ARENA_RADIUS - goalDistance;
        }

        return (goalDistanceSign * currentDistance > goalDistance)? goalDistanceSign : 0;
    }
}