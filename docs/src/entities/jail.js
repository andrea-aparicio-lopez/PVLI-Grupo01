import Entity from "./entity.js";

export default class Jail extends Entity {
    constructor(scene, id, x, y, texture) {
        //texture puede ser literalmente definido aqui
        super(scene, id, x, y, texture, 0, 1);

    }
}