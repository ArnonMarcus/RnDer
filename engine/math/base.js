export default class Base {
    constructor(typed_array, typed_array_offset = 0) {
        this.typed_array = typed_array;
        this.typed_array_offset = typed_array_offset;
    }
    copyTo(out) {
        out.typed_array.set(this.typed_array.subarray(this.typed_array_offset, this.typed_array_offset + this.typed_array_length), this.typed_array_offset);
        return out;
    }
    equals(other) {
        if (Object.is(other, this))
            return true;
        if (this.constructor !== other.constructor)
            return false;
        return this._equals(this.typed_array, other.typed_array, this.typed_array_offset, other.typed_array_offset);
    }
    setFromOther(other) {
        this.typed_array.set(other.typed_array.subarray(other.typed_array_offset, other.typed_array_offset + other.typed_array_length), this.typed_array_offset);
        return this;
    }
    setFromTypedArray(typed_array, offset) {
        this.typed_array.set(typed_array.subarray(offset, offset + this.typed_array_length), this.typed_array_offset);
        return this;
    }
    setTo(...values) {
        for (let [i, v] of values.entries())
            this.typed_array[this.typed_array_offset + i] = v;
        return this;
    }
}
export class Vector extends Base {
    lerp(to, by, out) {
        this._linearly_interpolate(out.typed_array, this.typed_array, to.typed_array, by, out.typed_array_offset, this.typed_array_offset, to.typed_array_offset);
        return out;
    }
    add(other) {
        this._add_in_place(this.typed_array, other.typed_array, this.typed_array_offset, other.typed_array_offset);
        return this;
    }
    sub(other) {
        this._subtract_in_place(this.typed_array, other.typed_array, this.typed_array_offset, other.typed_array_offset);
        return this;
    }
    div(denominator) {
        this._divide_in_place(this.typed_array, denominator, this.typed_array_offset);
        return this;
    }
    plus(other, out) {
        this._add(out.typed_array, this.typed_array, other.typed_array, out.typed_array_offset, this.typed_array_offset, other.typed_array_offset);
        return out;
    }
    minus(other, out) {
        this._subtract(out.typed_array, this.typed_array, other.typed_array, out.typed_array_offset, this.typed_array_offset, other.typed_array_offset);
        return out;
    }
    over(denominator, out) {
        this._divide(out.typed_array, this.typed_array, denominator, out.typed_array_offset, this.typed_array_offset);
        return out;
    }
    times(factor_or_matrix, out) {
        if (typeof factor_or_matrix === 'number')
            this._scale(out.typed_array, this.typed_array, factor_or_matrix, out.typed_array_offset, this.typed_array_offset);
        else
            this._multiply(out.typed_array, this.typed_array, factor_or_matrix.typed_array, out.typed_array_offset, this.typed_array_offset, factor_or_matrix.typed_array_offset);
        return out;
    }
    mul(factor_or_matrix) {
        if (typeof factor_or_matrix === 'number')
            this._scale_in_place(this.typed_array, factor_or_matrix, this.typed_array_offset);
        else
            this._multiply_in_place(this.typed_array, factor_or_matrix.typed_array, this.typed_array_offset, factor_or_matrix.typed_array_offset);
        return this;
    }
}
export class Position extends Vector {
    to(other, out) {
        this._subtract(out.typed_array, other.typed_array, this.typed_array, out.typed_array_offset, other.typed_array_offset, this.typed_array_offset);
        return out;
    }
}
export class Direction extends Vector {
    get length() {
        return this._length(this.typed_array, this.typed_array_offset);
    }
    dot(other) {
        return this._dot(this.typed_array, other.typed_array, this.typed_array_offset, other.typed_array_offset);
    }
    normalize() {
        this._normalize_in_place(this.typed_array, this.typed_array_offset);
        return this;
    }
    normalized(out) {
        this._normalize(out.typed_array, this.typed_array, out.typed_array_offset, this.typed_array_offset);
        return out;
    }
    cross(other) {
        this._cross_in_place(this.typed_array, other.typed_array, this.typed_array_offset, other.typed_array_offset);
        return this;
    }
    crossedWith(other, out) {
        this._cross(out.typed_array, this.typed_array, other.typed_array, out.typed_array_offset, this.typed_array_offset, other.typed_array_offset);
        return out;
    }
}
export class Matrix extends Base {
    get is_identity() {
        return this._is_identity(this.typed_array, this.typed_array_offset);
    }
    transposed(out) {
        this._transpose(out.typed_array, this.typed_array, out.typed_array_offset, this.typed_array_offset);
        return out;
    }
    transpose() {
        this._transpose_in_place(this.typed_array, this.typed_array_offset);
        return this;
    }
    mul(other) {
        this._multiply_in_place(this.typed_array, other.typed_array, this.typed_array_offset, other.typed_array_offset);
        return this;
    }
    times(other, out) {
        this._multiply(out.typed_array, this.typed_array, other.typed_array, out.typed_array_offset, this.typed_array_offset, other.typed_array_offset);
        return out;
    }
    setToIdentity() {
        this._set_to_identity(this.typed_array, this.typed_array_offset);
        return this;
    }
    setRotationAroundX(angle = 0, reset = true) {
        this._set_rotation_around_x(this.typed_array, angle, reset, this.typed_array_offset);
        return this;
    }
    setRotationAroundY(angle, reset = false) {
        this._set_rotation_around_y(this.typed_array, angle, reset, this.typed_array_offset);
        return this;
    }
    setRotationAroundZ(angle, reset = false) {
        this._set_rotation_around_z(this.typed_array, angle, reset, this.typed_array_offset);
        return this;
    }
}
//# sourceMappingURL=base.js.map