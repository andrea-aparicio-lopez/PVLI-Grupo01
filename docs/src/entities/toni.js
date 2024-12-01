import Ally from "./ally.js";

export default class Toni extends Ally {
    constructor(scene, x, y, texture, frame, maxHealth) {
        super(scene, x, y, texture, frame, maxHealth);
    }

    die() {
        this.emit("Toni killed");
    }
}