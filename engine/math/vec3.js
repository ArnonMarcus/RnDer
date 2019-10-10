import { PRECISION_DIGITS } from "../constants.js";
import { ArrayType } from "../types.js";
let temp_number;
const temp_lhs = new ArrayType(3);
const temp_rhs = new ArrayType(3);
const temp_matrix = new ArrayType(9);
export const length = (lhs, lhs_offset = 0) => Math.hypot(lhs[lhs_offset], lhs[lhs_offset + 1], lhs[lhs_offset + 2]);
export const length_squared = (lhs, lhs_offset = 0) => (lhs[lhs_offset] * lhs[lhs_offset] +
    lhs[lhs_offset + 1] * lhs[lhs_offset + 1] +
    lhs[lhs_offset + 2] * lhs[lhs_offset + 2]);
export const distance = (lhs, rhs, lhs_offset = 0, rhs_offset = 0) => Math.hypot((rhs[rhs_offset] - lhs[lhs_offset]), (rhs[rhs_offset + 1] - lhs[lhs_offset + 1]), (rhs[rhs_offset + 2] - lhs[lhs_offset + 2]));
export const distance_squared = (lhs, rhs, lhs_offset = 0, rhs_offset = 0) => ((rhs[rhs_offset] - lhs[lhs_offset]) * (rhs[rhs_offset] - lhs[lhs_offset]) +
    (rhs[rhs_offset + 1] - lhs[lhs_offset + 1]) * (rhs[rhs_offset + 1] - lhs[lhs_offset + 1]) +
    (rhs[rhs_offset + 2] - lhs[lhs_offset + 2]) * (rhs[rhs_offset + 2] - lhs[lhs_offset + 2]));
export const equals = (lhs, rhs, lhs_offset = 0, rhs_offset = 0) => {
    if (Object.is(lhs, rhs) && lhs_offset === rhs_offset)
        return true;
    if (Object.is(lhs.buffer, rhs.buffer) && lhs_offset === rhs_offset)
        return true;
    if (lhs.length !== rhs.length)
        return false;
    if (lhs[lhs_offset].toFixed(PRECISION_DIGITS) !== rhs[rhs_offset].toFixed(PRECISION_DIGITS))
        return false;
    if (lhs[lhs_offset + 1].toFixed(PRECISION_DIGITS) !== rhs[rhs_offset + 1].toFixed(PRECISION_DIGITS))
        return false;
    if (lhs[lhs_offset + 2].toFixed(PRECISION_DIGITS) !== rhs[rhs_offset + 2].toFixed(PRECISION_DIGITS))
        return false;
    return true;
};
export const linearly_interpolate = (out, from, to, by, out_offset = 0, from_offset = 0, to_offset = 0) => {
    out[out_offset] = from[from_offset] + by * (to[to_offset] - from[from_offset]);
    out[out_offset + 1] = from[from_offset + 1] + by * (to[to_offset + 1] - from[from_offset + 1]);
    out[out_offset + 2] = from[from_offset + 2] + by * (to[to_offset + 2] - from[from_offset + 2]);
};
export const add = (out, lhs, rhs, out_offset = 0, lhs_offset = 0, rhs_offset = 0) => {
    out[out_offset] = lhs[lhs_offset] + rhs[rhs_offset];
    out[out_offset + 1] = lhs[lhs_offset + 1] + rhs[rhs_offset + 1];
    out[out_offset + 2] = lhs[lhs_offset + 2] + rhs[rhs_offset + 2];
};
export const add_in_place = (lhs, rhs, lhs_offset = 0, rhs_offset = 0) => {
    lhs[lhs_offset] += rhs[rhs_offset];
    lhs[lhs_offset + 1] += rhs[rhs_offset + 1];
    lhs[lhs_offset + 2] += rhs[rhs_offset + 2];
};
export const subtract = (out, lhs, rhs, out_offset, lhs_offset, rhs_offset) => {
    out[out_offset] = lhs[lhs_offset] - rhs[rhs_offset];
    out[out_offset + 1] = lhs[lhs_offset + 1] - rhs[rhs_offset + 1];
    out[out_offset + 2] = lhs[lhs_offset + 2] - rhs[rhs_offset + 2];
};
export const subtract_in_place = (lhs, rhs, lhs_offset = 0, rhs_offset = 0) => {
    lhs[lhs_offset] -= rhs[rhs_offset];
    lhs[lhs_offset + 1] -= rhs[rhs_offset + 1];
    lhs[lhs_offset + 2] -= rhs[rhs_offset + 2];
};
export const divide = (out, lhs, rhs, out_offset = 0, lhs_offset = 0) => {
    out[out_offset] = lhs[lhs_offset] / rhs;
    out[out_offset + 1] = lhs[lhs_offset + 1] / rhs;
    out[out_offset + 2] = lhs[lhs_offset + 2] / rhs;
};
export const divide_in_place = (lhs, rhs, lhs_offset = 0) => {
    lhs[lhs_offset] /= rhs;
    lhs[lhs_offset + 1] /= rhs;
    lhs[lhs_offset + 2] /= rhs;
};
export const scale = (out, lhs, rhs, out_offset = 0, lhs_offset = 0) => {
    out[out_offset] = lhs[lhs_offset] * rhs;
    out[out_offset + 1] = lhs[lhs_offset + 1] * rhs;
    out[out_offset + 2] = lhs[lhs_offset + 2] * rhs;
};
export const scale_in_place = (lhs, rhs, lhs_offset = 0) => {
    lhs[lhs_offset] *= rhs;
    lhs[lhs_offset + 1] *= rhs;
    lhs[lhs_offset + 2] *= rhs;
};
export const normalize = (out, lhs, out_offset = 0, lhs_offset = 0) => {
    temp_number = Math.hypot(lhs[lhs_offset], lhs[lhs_offset + 1], lhs[lhs_offset + 2]);
    out[out_offset] = lhs[lhs_offset] / temp_number;
    out[out_offset + 1] = lhs[lhs_offset + 1] / temp_number;
    out[out_offset + 2] = lhs[lhs_offset + 2] / temp_number;
};
export const normalize_in_place = (lhs, lhs_offset = 0) => {
    temp_number = Math.hypot(lhs[lhs_offset], lhs[lhs_offset + 1], lhs[lhs_offset + 2]);
    lhs[lhs_offset] /= temp_number;
    lhs[lhs_offset + 1] /= temp_number;
    lhs[lhs_offset + 2] /= temp_number;
};
export const dot = (lhs, rhs, lhs_offset = 0, rhs_offset = 0) => lhs[lhs_offset] * rhs[rhs_offset] +
    lhs[lhs_offset + 1] * rhs[rhs_offset + 1] +
    lhs[lhs_offset + 2] * rhs[rhs_offset + 2];
export const cross = (out, lhs, rhs, out_offset = 0, lhs_offset = 0, rhs_offset = 0) => {
    if ((out_offset === lhs_offset && (Object.is(out, lhs) ||
        Object.is(out.buffer, lhs.buffer))) || (out_offset === rhs_offset && (Object.is(out, rhs) ||
        Object.is(out.buffer, rhs.buffer))))
        throw `Can not cross - shared buffer detected! (Use cross_in_place)`;
    out[out_offset] = lhs[lhs_offset + 1] * rhs[rhs_offset + 2] - lhs[lhs_offset + 2] * rhs[rhs_offset + 1];
    out[out_offset + 1] = lhs[lhs_offset + 2] * rhs[rhs_offset] - lhs[lhs_offset] * rhs[rhs_offset + 2];
    out[out_offset + 2] = lhs[lhs_offset] * rhs[rhs_offset + 1] - lhs[lhs_offset + 1] * rhs[rhs_offset];
};
export const cross_in_place = (lhs, rhs, lhs_offset = 0, rhs_offset = 0) => {
    temp_lhs.set(lhs.subarray(lhs_offset, lhs_offset + 3));
    temp_rhs.set(rhs.subarray(rhs_offset, rhs_offset + 3));
    lhs[lhs_offset] = temp_lhs[1] * temp_rhs[2] - temp_lhs[2] * temp_rhs[1];
    lhs[lhs_offset + 1] = temp_lhs[2] * temp_rhs[0] - temp_lhs[0] * temp_rhs[2];
    lhs[lhs_offset + 2] = temp_lhs[0] * temp_rhs[1] - temp_lhs[1] * temp_rhs[0];
};
export const multiply = (out, lhs, rhs, out_offset = 0, lhs_offset = 0, rhs_offset = 0) => {
    if ((out_offset === lhs_offset && (Object.is(out, lhs) ||
        Object.is(out.buffer, lhs.buffer))) || (out_offset === rhs_offset && (Object.is(out, rhs) ||
        Object.is(out.buffer, rhs.buffer))))
        throw `Can not multiply - shared buffer detected! (Use matrix_multiply_in_place)`;
    out[out_offset] = lhs[lhs_offset] * rhs[rhs_offset] + lhs[lhs_offset + 1] * rhs[rhs_offset + 3] + lhs[lhs_offset + 2] * rhs[rhs_offset + 6];
    out[out_offset + 1] = lhs[lhs_offset] * rhs[rhs_offset + 1] + lhs[lhs_offset + 1] * rhs[rhs_offset + 4] + lhs[lhs_offset + 2] * rhs[rhs_offset + 7];
    out[out_offset + 2] = lhs[lhs_offset] * rhs[rhs_offset + 2] + lhs[lhs_offset + 1] * rhs[rhs_offset + 5] + lhs[lhs_offset + 2] * rhs[rhs_offset + 8];
};
export const multiply_in_place = (lhs, rhs, lhs_offset = 0, rhs_offset = 0) => {
    temp_lhs.set(lhs.subarray(lhs_offset, lhs_offset + 3));
    temp_matrix.set(rhs.subarray(rhs_offset, rhs_offset + 9));
    lhs[lhs_offset] = temp_lhs[0] * temp_matrix[0] + temp_lhs[1] * temp_matrix[3] + temp_lhs[2] * temp_matrix[6];
    lhs[lhs_offset + 1] = temp_lhs[0] * temp_matrix[1] + temp_lhs[1] * temp_matrix[4] + temp_lhs[2] * temp_matrix[7];
    lhs[lhs_offset + 2] = temp_lhs[0] * temp_matrix[2] + temp_lhs[1] * temp_matrix[5] + temp_lhs[2] * temp_matrix[8];
};
import { Position } from "./base.js";
export class Position3D extends Position {
    constructor() {
        super(...arguments);
        this.typed_array_length = 9;
        this._equals = equals;
        this._linearly_interpolate = linearly_interpolate;
        this._add = add;
        this._add_in_place = add_in_place;
        this._subtract = subtract;
        this._subtract_in_place = subtract_in_place;
        this._scale = scale;
        this._scale_in_place = scale_in_place;
        this._divide = divide;
        this._divide_in_place = divide_in_place;
        this._multiply = multiply;
        this._multiply_in_place = multiply_in_place;
    }
    set x(x) { this.typed_array[this.typed_array_offset] = x; }
    set y(y) { this.typed_array[this.typed_array_offset + 1] = y; }
    set z(z) { this.typed_array[this.typed_array_offset + 2] = z; }
    get x() { return this.typed_array[this.typed_array_offset]; }
    get y() { return this.typed_array[this.typed_array_offset + 1]; }
    get z() { return this.typed_array[this.typed_array_offset + 2]; }
}
export const pos3 = (x, y = 0, z = 0, typed_array = new ArrayType(3)) => {
    const position = new Position3D(typed_array);
    if (x instanceof Position3D)
        position.setFromOther(x);
    else
        position.setTo(x, y, z);
    return position;
};
//# sourceMappingURL=vec3.js.map