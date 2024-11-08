import Entity from "../entity.js";

export default class Ally extends Entity {
    constructor(scene, x, y, texture, frame, health, maxHealth) {
        super(scene, x, y, texture, frame, health, maxHealth);
    }

    preupdate(t, dt) {
        super.preUpdate(t, dt);
    }

    /** @summary Llama al player para jugar su turno */
    playTurn() {
        super.playTurn();
    }

    die() {
        super.die();
    }
}