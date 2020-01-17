import {CANVAS_HEIGHT, CANVAS_WIDTH, CIRCLE_RADIUS} from "../../utils/constants";
import {clipNumber} from "../../utils/utils";

export class Vector {
    constructor(x, y){
        this.x = (x === undefined) ? Math.random() * CANVAS_WIDTH : x;
        this.y = (y === undefined) ? Math.random() * CANVAS_HEIGHT : y;
    }

    drawCircle(ctx){
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

    multiply(scalar){
        return new Vector(this.x*scalar, this.y*scalar);
    }

    divide(scalar){
        return this.multiply(1.0 / scalar)
    }

    clip(){
        return new Vector(
            clipNumber(this.x, 0, CANVAS_WIDTH),
            clipNumber(this.y, 0, CANVAS_HEIGHT),
        )
    }

    moveUniform(direction) {
        const magnitude = direction.magnitude();

        if (magnitude === 0){ return this; }

        direction = direction.divide(magnitude);
        const newPositionTheory = this.add(direction);
        const newPositionClip = newPositionTheory.clip();

        const xChange = Math.abs(newPositionTheory.x - newPositionClip.x);
        const yChange = Math.abs(newPositionTheory.y - newPositionClip.y);

        console.log({x:this.x, y:this.y});
        console.log("t", {x:newPositionTheory.x, y:newPositionTheory.y});

        if (0 === xChange && 0 === yChange){
            return newPositionTheory;
        } else if (0 !== xChange && 0 === yChange){
            return this._transferMagnitude('x', 'y', newPositionClip);
        } else if (0 === xChange && 0 !== yChange){
            return this._transferMagnitude('y', 'x', newPositionClip);
        } else if (xChange > yChange){
            return this.add(new Vector(0, -1 * Math.sign(direction.y)))
        } else {
            return this.add(new Vector(-1 * Math.sign(direction.x), 0))
        }
    }

    _transferMagnitude(culprit, beneficiary, newPositionClip){
        const culpritValue = newPositionClip[culprit] - this[culprit];
        const beneficiaryValue = Math.sqrt(1 - culpritValue**2);
        const newDirection = new Vector();

        newDirection[culprit] = culpritValue;
        newDirection[beneficiary] = beneficiaryValue;

        return this.add(newDirection);
    }
}