import {CANVAS_HEIGHT, CANVAS_WIDTH, CIRCLE_RADIUS} from "../../utils/constants";

export class Vector {
    constructor(x, y){
        this.x = x === undefined ? Math.random() * CANVAS_WIDTH : x;
        this.y = y === undefined ? Math.random() * CANVAS_HEIGHT : y;
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, CIRCLE_RADIUS, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    add(pos2){
        return new Vector(this.x+pos2.x, this.y+pos2.y);
    }

    subtract(pos2){
        return new Vector(this.x-pos2.x, this.y-pos2.y);
    }

    magnitude(){
        return Math.sqrt((this.x)**2 + (this.y)**2);
    }

    distance(pos2){
        return this.subtract(pos2).magnitude();
    }

    angle(){
        let angle = Math.atan2(-this.y, this.x);
        if (angle < 0){ angle += 2*Math.PI; }

        return angle;
    }

    multiply(scalar){
        return new Vector(this.x*scalar, this.y*scalar);
    }

    // normalize(){
    //     return new Vector(clip(this.x, 0, WIDTH), clip(this.y, 0, HEIGHT));
    // }
}