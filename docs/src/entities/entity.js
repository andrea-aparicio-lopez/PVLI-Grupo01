
export default class Entity extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame, health, maxHealth) {
        super(scene, x, y, texture, frame);

        this.worldPos = {
            x: x,
            y: y
        }

        this.health = health;
        this.maxHealth = maxHealth;
        this.isStunned = false;

        // this.screenPos = setScreenPos();

        // Empiezan mirando hacia abajo
        this.direction = {
            x: 0,
            y: -1
        }

        this.damageMultiplier = 1;
        this.defenseMultiplier = 1;
        this.scene.add.existing(this);
    }

    preupdate(t, dt) {
        super.preUpdate(t, dt);
    }


    // GETTERS Y SETTERS
    getDirection() {return this.direction;}
    setDirection(dir) {this.direction = dir;}

    getWorldPos() {return this.worldPos;}
    setWorldPos(pos) {this.worldPos = pos;}

    updateWorldPos() {this.worldPos += this.direction;}

    
    /** @summary Cantidad de daño recibida */
    hurt(points) {
        this.health -= points;
    }

    /** @summary Cambia estado de aturdimiento */
    stun(state){
        this.isStunned = state;
    }
    
    /** @summary Cura vida */
    heal(points) {
        this.health += points;
        this.health = min(this.health, this.maxHealth); // clamp
    }

    die() {};
}