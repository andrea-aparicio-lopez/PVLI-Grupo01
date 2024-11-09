import Object from "../object.js";

export default class Obstacle extends Object {
    constructor(scene, x, y, texture, frame, isWalkable) {
        super(scene, x, y, texture, frame);

        this.isWalkable = isWalkable;
    }
}