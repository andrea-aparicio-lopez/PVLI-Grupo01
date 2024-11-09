import Entity from "./entity.js";

export default class Enemy extends Entity {
    constructor(scene, x, y, texture, frame, maxHealth, AIdata) {
        super(scene, x, y, texture, frame, maxHealth);

        // Por definir
        this.AI = AIdata;
    }

    preupdate(t, dt) {
        super.preUpdate(t, dt);
    }

    /** @summary Llama a la IA para jugar su turno */
    playTurn() {
        super.playTurn();
    }

    die() {
        super.die();
    }
}