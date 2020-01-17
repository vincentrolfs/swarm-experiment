import {Vector} from "./Vector";
import {ARENA_RADIUS, CANVAS_HEIGHT, CANVAS_WIDTH, CIRCLE_RADIUS} from "../../utils/constants";

export const CENTER = new Vector(CANVAS_WIDTH / 2.0, CANVAS_HEIGHT / 2.0);

export class Artist {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.positions = [new Vector(), new Vector()];
        this.behaviours = [[1, 40], [0, -60]];

        this.runLoop();
    }

    runLoop() {
        setInterval(() => {
            this.drawAgents();
            this.updatePositions();
        }, 10)
    }

    drawAgents(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.beginPath();
        this.ctx.arc(CENTER.x, CENTER.y, ARENA_RADIUS, 0, 2 * Math.PI, false);
        this.ctx.stroke();

        for (let i = 0; i < this.positions.length; i++){
            this.positions[i].drawCircle(this.ctx);
        }
    }

    updatePositions(){
        const {positions, behaviours} = this;

        for (let i = 0; i < positions.length; i++){
            if (!behaviours[i]){ continue; }

            const myPosition = positions[i];
            const partnerPosition = positions[behaviours[i][0]];
            const goalDistance = behaviours[i][1];

            positions[i] = this.findNewPosition(myPosition, partnerPosition, goalDistance);
        }
    }

    findNewPosition(myPosition, partnerPosition, goalDistance){
        const directionMultiplier = this.findDirectionMultiplier(myPosition, partnerPosition, goalDistance);
        if (directionMultiplier === 0){ return myPosition; }

        const direction = partnerPosition.subtract(myPosition).multiply(directionMultiplier);

        return myPosition.moveUniform(direction);
    }

    findDirectionMultiplier(myPosition, partnerPosition, goalDistance){
        const currentDistance = myPosition.distance(partnerPosition);

        return ((currentDistance >= goalDistance)? 1 : 0) * Math.sign(goalDistance);
    }
}