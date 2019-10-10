import { Buffer, VectorBufferLength } from "./constants.js";
export const equals = (lhs, rhs, precision_digits = 3) => {
    if (Object.is(lhs, rhs))
        return true;
    if (Object.is(lhs.buffer, rhs.buffer))
        return true;
    if (lhs.length !== rhs.length)
        return false;
    if (lhs[0].toFixed(precision_digits) !== rhs[0].toFixed(precision_digits))
        return false;
    if (lhs[1].toFixed(precision_digits) !== rhs[1].toFixed(precision_digits))
        return false;
    return lhs[2].toFixed(precision_digits) === rhs[2].toFixed(precision_digits);
};
export const add = (lhs, rhs) => {
    lhs[0] += rhs[0];
    lhs[1] += rhs[1];
    lhs[2] += rhs[2];
    return lhs;
};
export const plus = (lhs, rhs, out = new Buffer(VectorBufferLength)) => {
    out[0] = lhs[0] + rhs[0];
    out[1] = lhs[1] + rhs[1];
    out[2] = lhs[2] + rhs[2];
    return out;
};
export const sub = (lhs, rhs) => {
    lhs[0] -= rhs[0];
    lhs[1] -= rhs[1];
    lhs[2] -= rhs[2];
    return lhs;
};
export const minus = (lhs, rhs, out = new Buffer(VectorBufferLength)) => {
    out[0] = lhs[0] - rhs[0];
    out[1] = lhs[1] - rhs[1];
    out[2] = lhs[2] - rhs[2];
    return out;
};
export const div = (lhs, rhs) => {
    lhs[0] /= rhs;
    lhs[1] /= rhs;
    lhs[2] /= rhs;
    return lhs;
};
export const over = (lhs, rhs, out = new Buffer(VectorBufferLength)) => {
    out[0] = lhs[0] / rhs;
    out[1] = lhs[1] / rhs;
    out[2] = lhs[2] / rhs;
    return out;
};
export const mul = (lhs, rhs) => {
    lhs[0] *= rhs;
    lhs[1] *= rhs;
    lhs[2] *= rhs;
    return lhs;
};
export const times = (lhs, rhs, out = new Buffer(VectorBufferLength)) => {
    out[0] = lhs[0] * rhs;
    out[1] = lhs[1] * rhs;
    out[2] = lhs[2] * rhs;
    return out;
};
export const dot = (lhs, rhs) => lhs[0] * rhs[0] +
    lhs[1] * rhs[1] +
    lhs[2] * rhs[2];
export const cross = (lhs, rhs, out = new Buffer(VectorBufferLength)) => {
    if (Object.is(out, lhs))
        lhs = Buffer.from(lhs);
    if (Object.is(out, rhs))
        rhs = Buffer.from(rhs);
    out[0] = lhs[1] * rhs[2] - lhs[2] * rhs[1];
    out[1] = lhs[2] * rhs[0] - lhs[0] * rhs[2];
    out[2] = lhs[0] * rhs[1] - lhs[1] * rhs[0];
    return out;
};
export const lerp = (from, to, by, out = new Buffer(VectorBufferLength)) => {
    out[0] = from[0] + by * (to[0] - from[0]);
    out[1] = from[1] + by * (to[1] - from[1]);
    out[2] = from[2] + by * (to[2] - from[2]);
    return out;
};
export const vecMatMul = (lhs, rhs0, rhs1, rhs2, out = new Buffer(VectorBufferLength)) => {
    if (Object.is(out, lhs))
        lhs = Buffer.from(lhs);
    if (Object.is(out, rhs0))
        rhs0 = Buffer.from(rhs0);
    if (Object.is(out, rhs1))
        rhs1 = Buffer.from(rhs1);
    if (Object.is(out, rhs2))
        rhs2 = Buffer.from(rhs2);
    out[0] = lhs[0] * rhs0[0] + lhs[1] * rhs1[0] + lhs[2] * rhs2[0];
    out[1] = lhs[0] * rhs0[1] + lhs[1] * rhs1[1] + lhs[2] * rhs2[1];
    out[2] = lhs[0] * rhs0[2] + lhs[1] * rhs1[2] + lhs[2] * rhs2[2];
    return out;
};
//# sourceMappingURL=vector.js.map