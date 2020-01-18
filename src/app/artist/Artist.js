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

        this.runLoop();
    }

    initBehaviours(){
        const amount = 10;
        const partners = this._get_permutation(amount);

        for (let i = 0; i < amount; i++){
            // const partner = (i+1) % amount;
            let partner = partners[i];
            do { partner = Math.floor(Math.random() * amount); } while (partner === i);
            const rule = Math.random()*4*ARENA_RADIUS - 2*ARENA_RADIUS;

            this.behaviours.push([partner, rule])
        }
    }

    _get_permutation(length) {
        var permutation = [...Array(length).keys()],
            result = [permutation.slice()],
            c = new Array(length).fill(0),
            i = 1, k, p;

        while (i < length) {
            if (c[i] < i) {
                k = i % 2 && c[i];
                p = permutation[i];
                permutation[i] = permutation[k];
                permutation[k] = p;
                ++c[i];
                i = 1;
                result.push(permutation.slice());
            } else {
                c[i] = 0;
                ++i;
            }
        }
        return result;
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

        for (let i = 0; i < positions.length; i++){
            if (!behaviours[i]){ continue; }

            const myPosition = positions[i];
            const partnerPosition = positions[behaviours[i][0]];
            const goalDistance = behaviours[i][1];

            const [newPosition, hasMoved] = this.findNewPosition(myPosition, partnerPosition, goalDistance);
            positions[i] = newPosition;

            if (!hasMoved){
                this.updateBehaviour(i);
            }
        }
    }

    updateBehaviour(i){
        if (Math.random() <= 0.001){
            this.behaviours[i][1] = -Math.sign(this.behaviours[i][1]) * Math.random() * 2 * ARENA_RADIUS;
        }
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

        if (goalDistanceSign < 0){
            goalDistance = -2 * ARENA_RADIUS - goalDistance;
        }

        return (goalDistanceSign * currentDistance > goalDistance)? goalDistanceSign : 0;
    }
}