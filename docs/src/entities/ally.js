import Entity from "../entity.js";

export default class Ally extends Entity {
    constructor(scene, x, y, texture, frame, health, maxHealth) {
        super(scene, x, y, texture, frame, health, maxHealth);

        this.isFree = false;
    }

    setFree() {this.isFree = true;}

    preupdate(t, dt) {
        super.preUpdate(t, dt);
    }

    die() {
        super.die();
    }
}