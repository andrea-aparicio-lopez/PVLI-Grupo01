import Ally from "./ally.js";

export default class Toni extends Ally {
    constructor(scene, x, y, texture, frame, maxHealth) {
        super(scene, 'player', x, y, texture, frame, maxHealth);
    }

    die() {
        this.scene.events.emit("toni-killed");
    }
}