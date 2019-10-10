import Direction4D from "./direction.js";
import Matrix4x4 from "./matrix.js";
import { Buffer, VectorBufferLength } from "./arithmatic/constants.js";
import { add, sub, minus, plus, mul, times, div, over, vecMatMul, equals } from "./arithmatic/vector.js";
import { lerp } from "../3D/arithmatic/vector.js";
export default class Position4D {
    constructor(buffer) {
        if (buffer instanceof Buffer) {
            if (buffer.length === VectorBufferLength) {
                this.buffer = buffer;
                this.buffer[3] = 1;
            }
            else
                throw `Invalid buffer length ${buffer.length}`;
        }
        else if (buffer === undefined || buffer === null) {
            this.buffer = new Buffer(VectorBufferLength);
            this.buffer[3] = 1;
        }
        else
            throw `Invalid buffer ${buffer}`;
    }
    set x(x) { this.buffer[0] = x; }
    set y(y) { this.buffer[1] = y; }
    set z(z) { this.buffer[2] = z; }
    set w(w) { this.buffer[3] = w; }
    get x() { return this.buffer[0]; }
    get y() { return this.buffer[1]; }
    get z() { return this.buffer[2]; }
    get w() { return this.buffer[3]; }
    equals(other, precision_digits = 3) {
        if (Object.is(other, this))
            return true;
        if (!(other instanceof Position4D))
            return false;
        return equals(this.buffer, other.buffer, precision_digits);
    }
    copy() {
        return new Position4D(Buffer.from(this.buffer));
    }
    lerp(to, by, new_position = new Position4D()) {
        lerp(this.buffer, to.buffer, by, new_position.buffer);
        return new_position;
    }
    add(position) {
        add(this.buffer, position.buffer);
        return this;
    }
    sub(position) {
        sub(this.buffer, position.buffer);
        return this;
    }
    mul(scalar_or_matrix) {
        if (scalar_or_matrix instanceof Matrix4x4)
            vecMatMul(this.buffer, scalar_or_matrix.buffer, this.buffer);
        else
            mul(this.buffer, scalar_or_matrix);
        return this;
    }
    div(scalar) {
        div(this.buffer, scalar);
        return this;
    }
    plus(position_or_direction, new_position = new Position4D()) {
        plus(this.buffer, position_or_direction.buffer, new_position.buffer);
        return new_position;
    }
    minus(direction, new_position = new Position4D()) {
        minus(this.buffer, direction.buffer, new_position.buffer);
        return new_position;
    }
    times(scalar_or_matrix, new_position = new Position4D()) {
        if (scalar_or_matrix instanceof Matrix4x4)
            vecMatMul(this.buffer, scalar_or_matrix.buffer);
        else
            times(this.buffer, scalar_or_matrix, new_position.buffer);
        return new_position;
    }
    over(scalar, new_position = new Position4D()) {
        over(this.buffer, scalar, new_position.buffer);
        return new_position;
    }
    setTo(x, y, z, w) {
        if (x instanceof Direction4D ||
            x instanceof Position4D) {
            this.buffer.set(x.buffer);
            return this;
        }
        if (x instanceof Buffer &&
            x.length === VectorBufferLength) {
            this.buffer.set(x);
            return this;
        }
        if (typeof x === 'number') {
            this.buffer[0] = x;
            if (typeof y === 'number')
                this.buffer[1] = y;
            if (typeof z === 'number')
                this.buffer[2] = z;
            if (typeof w === 'number')
                this.buffer[3] = w;
            return this;
        }
        throw `Invalid arguments ${x}, ${y}, ${z}, ${w}`;
    }
    to(other, direction = new Direction4D) {
        direction.setTo(minus(other.buffer, this.buffer));
        return direction;
    }
    // intersectPlane(
    //     plane_n: Direction4D,
    //     lineStart: Position4D,
    //     lineEnd: Position4D,
    //     outPos: Position4D
    // ) : number {
    //     plane_n.normalize();
    //
    //     const plane_d = -plane_n.dot(this);
    //     const ad = plane_n.dot(lineStart);
    //     const bd = plane_n.dot(lineEnd);
    //     const t = (-plane_d - ad) / (bd - ad);
    //     const lineStartToEnd : Direction4D = lineStart.to(lineEnd);
    //     const lineToIntersect : Direction4D = lineStartToEnd.times(t);
    //
    //     lineToIntersect.plus(lineStartToEnd, outPos);
    //
    //     return t;
    // }
    toDirection() {
        return new Direction4D(Buffer.from(this.buffer));
    }
    asDirection() {
        return new Direction4D(this.buffer);
    }
}
export const pos4 = (x, y = 0, z = 0, w = 1) => x === undefined ?
    new Position4D() :
    new Position4D().setTo(x, y, z, w);
//# sourceMappingURL=position.js.map