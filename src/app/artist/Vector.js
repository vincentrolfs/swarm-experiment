import {ARENA_RADIUS, CIRCLE_RADIUS} from "../../utils/constants";
import {CENTER} from "./Artist";

export class Vector {
    constructor(x, y) {
        if ( (x === undefined) || (y === undefined) ){
            this.x = Math.random();
            this.y = Math.random();
            const factor = ARENA_RADIUS * Math.random() / this.magnitude();

            this.x *= factor;
            this.x += CENTER.x;

            this.y *= factor;
            this.y += CENTER.y;
        } else {
            this.x = x;
            this.y = y;
        }
    }

    drawCircle(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, CIRCLE_RADIUS, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    add(pos2) {
        return new Vector(this.x + pos2.x, this.y + pos2.y);
    }

    subtract(pos2) {
        return new Vector(this.x - pos2.x, this.y - pos2.y);
    }

    magnitude() {
        return Math.sqrt((this.x) ** 2 + (this.y) ** 2);
    }

    distance(pos2) {
        return this.subtract(pos2).magnitude();
    }

    multiply(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    divide(scalar) {
        return this.multiply(1.0 / scalar)
    }

    moveUniform(direction) {
        direction = direction.divide(direction.magnitude());
        const newPositionTheory = this.add(direction);

        if (newPositionTheory.distance(CENTER) <= ARENA_RADIUS) {
            return newPositionTheory;
        }

        const [newPosition1, newPosition2] = intersectTwoCircles(CENTER, ARENA_RADIUS, this, 1);

        if (newPositionTheory.distance(newPosition1) <= newPositionTheory.distance(newPosition2)) {
            return newPosition1;
        } else {
            return newPosition2;
        }
    }
}

// pos1 is the center of the first circle, with radius r1
// pos2 is the center of the second circle, with radius r2
// source: https://gist.github.com/jupdike/bfe5eb23d1c395d8a0a1a4ddd94882ac
// based on the math here:
// http://math.stackexchange.com/a/1367732
const intersectTwoCircles = (pos1, r1, pos2, r2) => {
    const [x1, y1, x2, y2] = [pos1.x, pos1.y, pos2.x, pos2.y];
    var centerdx = x1 - x2;
    var centerdy = y1 - y2;
    var R = Math.sqrt(centerdx * centerdx + centerdy * centerdy);
    if (!(Math.abs(r1 - r2) <= R && R <= r1 + r2)) { // no intersection
        return []; // empty list of results
    }
    // intersection(s) should exist

    var R2 = R * R;
    var R4 = R2 * R2;
    var a = (r1 * r1 - r2 * r2) / (2 * R2);
    var r2r2 = (r1 * r1 - r2 * r2);
    var c = Math.sqrt(2 * (r1 * r1 + r2 * r2) / R2 - (r2r2 * r2r2) / R4 - 1);

    var fx = (x1 + x2) / 2 + a * (x2 - x1);
    var gx = c * (y2 - y1) / 2;
    var ix1 = fx + gx;
    var ix2 = fx - gx;

    var fy = (y1 + y2) / 2 + a * (y2 - y1);
    var gy = c * (x1 - x2) / 2;
    var iy1 = fy + gy;
    var iy2 = fy - gy;

    // note if gy == 0 and gx == 0 then the circles are tangent and there is only one solution
    // but that one solution will just be duplicated as the code is currently written
    return [new Vector(ix1, iy1), new Vector(ix2, iy2)];
};