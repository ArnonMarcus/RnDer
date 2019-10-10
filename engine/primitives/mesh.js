import { pos4 } from "../linalng/4D/position.js";
import Transform from "./transform.js";
import { tri } from "./triangle.js";
export class Mesh {
    constructor(triangles = [], positions = [], normals = []) {
        this.triangles = triangles;
        this.positions = positions;
        this.normals = normals;
        this.transform = new Transform();
    }
    static from(obj) {
        return new Mesh().load(obj);
    }
    load(obj) {
        let parts;
        const positions = [];
        for (const line of obj.split('\n')) {
            if (line[0] === 'v') {
                parts = line.split(' ');
                positions.push(pos4(+parts[1], +parts[2], +parts[3]));
            }
            if (line[0] === 'f') {
                parts = line.split(' ');
                this.triangles.push(tri(positions[+parts[1] - 1], positions[+parts[2] - 1], positions[+parts[3] - 1]));
            }
        }
        return this;
    }
}
//# sourceMappingURL=mesh.js.map