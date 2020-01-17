import {Vector} from "./Vector";

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
        const direction = partnerPosition.subtract(myPosition).multiply(directionMultiplier);

        return myPosition.moveUniform(direction);
    }

    findDirectionMultiplier(myPosition, partnerPosition, goalDistance){
        const currentDistance = myPosition.distance(partnerPosition);

        return ((currentDistance >= goalDistance)? 1 : 0) * Math.sign(goalDistance);
    }
}