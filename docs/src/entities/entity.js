import { GI, tileToScreenX, tileToScreenY } from '../graphics/graphicsInterface.js'
import cardsEvents from '../events/cardsEvents.js';

export default class Entity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, maxHealth) {

        super(scene, tileToScreenX(x), tileToScreenY(y), texture, frame);
        this.setScale(GI.tileMapConst.scale);
        this.setOrigin(0,0.3);

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

        this.pathFinding = new EasyStar.js();
        
        
        // EVENTOS
        this.scene.events.on('damage', this.checkHit, this); // implementación de checkHit en las sublcases

    }

    preupdate(t, dt) {
        super.preUpdate(t, dt);
    }


    // GETTERS Y SETTERS
    getDirection() {return this.direction;}
    setDirection(dir) {this.direction = dir;}
    setDirection(x,y) {
        this.direction.x = x;
        this.direction.y = y;
        // console.log(this.direction);
    }

    getWorldPos() {return this.worldPos;}
    setWorldPos(pos) {this.worldPos = pos;}

    // Mueve en la direccion. Devuelve true si ha tenido exito, false si no
    moveInDirection() {
        if (this.direction.x < 0 && this.worldPos.x === 0) return false;

        else if (this.direction.x > 0 && this.worldPos.x === this.scene.map.width - 1 ) return false;

        else if (this.direction.y < 0 && this.worldPos.y === 0 ) return false;

        else if (this.direction.y > 0 && this.worldPos.y === this.scene.map.height - 1) return false;

        if (this.scene.obstacles[this.worldPos.y + this.direction.y][this.worldPos.x + this.direction.x] == true) return false;

        this.prevWorldPos.x = this.worldPos.x;
        this.prevWorldPos.y = this.worldPos.y;

        this.worldPos.x = this.worldPos.x + this.direction.x;
        this.worldPos.y = this.worldPos.y + this.direction.y;

        // console.log(this.worldPos);
        return true;
    }

    checkMatchingPosition(positionArray) {
        for(let i = 0; i < positionArray.length; i++) {
            if(positionArray[i].x == this.worldPos.x && positionArray[i].y == this.worldPos.y) {
                console.log('matching pos ', positionArray[i]);
                return true;
            }
        }
        console.log('socorro')
        return false;
    }

    /** @summary Cantidad de daño recibida */
    hurt(points) {
        this.health -= points;
        this.isHurt = true;
        console.log("dañado " + this.health);
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


    die() { 
        this.setActive(false);
        // Animación de muerte
        // Añadirse como obstáculo
    };

    update(time, delta) {
        if (!this.onMovingAnimation) {
            this.x = tileToScreenX(this.worldPos.x);
            this.y = tileToScreenY(this.worldPos.y);
        }
        else {
            this.x += this.velocity.x * (delta/1000);
            this.y += this.velocity.y * (delta/1000);
        }
        
    }

    playMovingAnimation(TIME) {
        //console.log("animation");
        this.velocity.x = this.direction.x * (GI.tileMapConst.scaledSize) / (TIME / 1000);
        this.velocity.y = this.direction.y * (GI.tileMapConst.scaledSize) / (TIME / 1000);

        this.onMovingAnimation = true;
    }

    finishMovingAnimation() {
        this.onMovingAnimation = false;
    }
}