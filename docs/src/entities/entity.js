
const SCALE = 3;

export default class Entity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, maxHealth) {
        super(scene, x * 16 * SCALE, y * 16 * SCALE, texture, frame);
        this.setScale(SCALE);
        this.setOrigin(0,0);
        this.worldPos = {   // Coordenadas en tiles
            x: x,
            y: y
        }

        this.prevWorldPos = {
            x, y
        }

        this.maxHealth = maxHealth;
        this.health = this.maxHealth;
        this.isStunned = false;

        //ANIMACIONES
        this.onMovingAnimation = false;
        this.velocity = {
            x: 0,
            y:0
        };
        //////

        // this.screenPos = setScreenPos();

        // Empiezan mirando hacia abajo
        this.direction = {
            x: 0,
            y: -1
        }

        this.damageMultiplier = 1;
        this.defenseMultiplier = 1;
        this.scene.add.existing(this);

        this.canCombat = true; // flag para daño de overlap
        this.scene.physics.add.existing(this); // añade fisicas para collide overlap con rectangulos de daño        
    }

    preupdate(t, dt) {
        super.preUpdate(t, dt);
    }


    // GETTERS Y SETTERS
    getDirection() {return this.direction;}
    setDirection(dir) {this.direction = dir;}

    getWorldPos() {return this.worldPos;}
    setWorldPos(pos) {this.worldPos = pos;}

    // Mueve en la direccion. Devuelve true si ha tenido exito, false si no
    moveInDirection() {
        if (this.worldPos.x === 0 && this.direction.x < 0) return false;
        else if (this.worldPos.x === this.scene.layer1.displayWidth - 1 && this.direction.x > 0) return false;
        else if (this.worldPos.y === 0 && this.direction.y < 0) return false;
        else if (this.worldPos.y = this.scene.layer1.displayHeight - 1 && this.direction.y > 0) return false;

        this.worldPos += this.direction;
        return true;
    }

    
    /** @summary Cantidad de daño recibida */
    hurt(points) {
        this.health -= points;
        this.isHurt = true;
        console.log(this.health);
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

    getCombatState() { return this.canCombat };
    setCombatState(state) { this.canCombat = state};


    die() { };

    update(time, delta) {
        if (!this.onMovingAnimation) {
            this.x = this.worldPos.x * 16 * SCALE;
            this.y = this.worldPos.y * 16 * SCALE;
        }
        else {
            this.x += this.velocity.x * (delta/1000);
            this.y += this.velocity.y * (delta/1000);
        }
        
    }

    // move(x, y) {
    //     this.velocity.x = x;
    //     this.velocity.y = y;

    //     this.prevWorldPos.x = this.worldPos.x;
    //     this.prevWorldPos.y = this.worldPos.y;

    //     this.worldPos.x += x;
    //     this.worldPos.y += y;

    //     if (this.worldPos.x < 0) this.worldPos.x = 0;
    //     if (this.worldPos.x > 9) this.worldPos.x = 9;
    //     if (this.worldPos.y < 0) this.worldPos.y = 0;
    //     if (this.worldPos.y > 9) this.worldPos.y = 9;
    // }

    playMovingAnimation(TIME) {
        this.velocity.x *= (16 * SCALE) / (TIME / 1000);
        this.velocity.y *= (16 * SCALE) / (TIME / 1000);

        console.log(this.velocity);
        this.onMovingAnimation = true;
    }

    finishMovingAnimation() {
        this.onMovingAnimation = false;
    }
}