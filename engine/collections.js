import { Float32Buffer } from "./buffers/base";
import Position3D from "./linalng/3D/position.js";
class BaseCollection {
    constructor(count, stride, item_constructor, buffer_constructor, buffer = new buffer_constructor(count, stride), current = new PrimitiveClass(buffer.sub_arrays[0])) {
        this.count = count;
        this.stride = stride;
        this.item_constructor = item_constructor;
        this.buffer_constructor = buffer_constructor;
        this.buffer = buffer;
        this.current = current;
    }
}
export class Positions3D {
    constructor(count, stride = 3, buffer = new Float32Buffer(count, stride), current = new Position3D(buffer.sub_arrays[0])) {
        this.count = count;
        this.stride = stride;
        this.buffer = buffer;
        this.current = current;
    }
    at(index, current = this.current) {
        current.buffer = this.buffer.sub_arrays[index];
        return current;
    }
}
//# sourceMappingURL=collections.js.map