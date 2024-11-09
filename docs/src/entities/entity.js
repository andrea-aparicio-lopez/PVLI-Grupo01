const SCALE = 3;

export default class Entity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, maxHealth) {
        super(scene, x * 16 * SCALE, y * 16 * SCALE, texture, frame);
        this.setScale(SCALE);
        this.setOrigin(0,0);
        this.worldPos = {
            x: x,
            y: y
        }

        this.maxHealth = maxHealth;
        this.health = this.maxHealth;

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
    
    /** @summary Cura vida */
    heal(points) {
        this.health += points;
        this.health = min(this.health, this.maxHealth); // clamp
    }

    die() {};
}