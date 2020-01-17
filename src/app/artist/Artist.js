import {Vector} from "./Vector";

export class Artist {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.agents = [new Vector(), new Vector(), new Vector()];
        this.behaviours = [[1, 20], [2, 20], [0, 40]];
    }

    drawAgents(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.agents.length; i++){
            this.agents[i].draw(this.ctx);
        }
    }
}