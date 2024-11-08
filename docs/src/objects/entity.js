import Object from "./object.js";

export default class Entity extends Object {

    constructor(scene, x, y, texture, frame, health, maxHealth) {
        super(scene, x, y, texture, frame);

        this.health = health;
        this.maxHealth = health;

        this.delay = 0;
        this.damageMultiplier = 1;
        this.defenseMultiplier = 1;

    }

    preupdate(t, dt) {
        super.preUpdate(t, dt);
    }

    /** @summary Hace lo que tenga que hacer en su turno */
    playTurn() {}
    
    /** @summary Cantidad de daño recibida */
    hurt(points) {
        this.health -= points;
    }
    
    /** @summary Cura vida */
    heal(points) {
        this.health += points;
        this.health = min(this.health, this.maxHealth); // clamp
    }

    die() {
        
    }
}