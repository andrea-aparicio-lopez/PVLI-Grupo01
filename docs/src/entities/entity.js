import { GI, tileToScreenX, tileToScreenY } from '../graphics/graphicsInterface.js'

export default class Entity extends Phaser.GameObjects.Sprite {
    constructor(scene, id, x, y, texture, frame, maxHealth) {

        super(scene, tileToScreenX(x), tileToScreenY(y), texture, frame);
        this.setScale(GI.tileMapConst.scale);
        this.setOrigin(0,0.3);

        this.id = id;
        this.scene = scene;

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
        this.scene.events.on('obstacles-updated', this.calculatePath, this)

    }

    checkHit(damageInfo) {
        if(this.checkMatchingPosition(damageInfo.positions)) {
            this.hurt(damageInfo.damage);
            this.checkDeath();
        }
    }

    findPath(destPos) {
        this.pathFinding.findPath(this.worldPos.x, this.worldPos.y, destPos.x, destPos.y, (path) => {
            if (path === null) {
                console.warn("Path was not found.");
            } else {
                //alert("Path was found. The first Point is " + path[0].x + " " + path[0].y);
                // Si ya está en la casilla destino
                if (this.worldPos.x == destPos.x && this.worldPos.y == destPos.y) {
                    this.atDestPos(); 
                }
                // Si está adyacente
                else if(path[1].x == destPos.x && path[1].y == destPos.y) {
                    this.atAdjacentPos(destPos);
                }
                else {
                    let dir = {};
                    dir.x = path[1].x - this.worldPos.x;
                    dir.y = path[1].y - this.worldPos.y;
                    this.setDirection(dir.x, dir.y);
                }              
                
                this.moveInDirection();  
            }
        });
    }

    calculatePath() {}

    atDestPos() {
        this.moveInDirection();
    }

    atAdjacentPos(destPos) {}

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.active) {
            if (!this.onMovingAnimation) {
                this.x = tileToScreenX(this.worldPos.x);
                this.y = tileToScreenY(this.worldPos.y);
            }
        }
    }


    // GETTERS Y SETTERS
    getDirection() {return this.direction;}
    setDirection(dir) {
        this.direction = dir;
        this.changeSprite();
    }
    setDirection(x,y) {
        this.direction.x = x;
        this.direction.y = y;
        this.changeSprite();
    }

    getWorldPos() {return this.worldPos;}
    setWorldPos(pos) {
        this.prevWorldPos = this.worldPos;
        this.worldPos = pos;
        this.scene.updateEntityObstacles(this.prevWorldPos, this.worldPos);
    }


    // Mueve en la direccion. Devuelve true si ha tenido exito, false si no
    moveInDirection() {
        if (!this.active) return false;
        
        if (this.direction.x < 0 && this.worldPos.x === 0) return false;

        else if (this.direction.x > 0 && this.worldPos.x === this.scene.map.width - 1 ) return false;

        else if (this.direction.y < 0 && this.worldPos.y === 0 ) return false;

        else if (this.direction.y > 0 && this.worldPos.y === this.scene.map.height - 1) return false;

        if (this.scene.obstacles[this.worldPos.y + this.direction.y][this.worldPos.x + this.direction.x] ||
            this.scene.entityObstacles[this.worldPos.y + this.direction.y][this.worldPos.x + this.direction.x]
        ) return false;

        this.prevWorldPos.x = this.worldPos.x;
        this.prevWorldPos.y = this.worldPos.y;

        this.worldPos.x = this.worldPos.x + this.direction.x;
        this.worldPos.y = this.worldPos.y + this.direction.y;

        this.scene.updateEntityObstacles(this.prevWorldPos, this.worldPos);

        return true;
    }

    checkMatchingPosition(positionArray) {
        for(let i = 0; i < positionArray.length; i++) {
            if(positionArray[i].x == this.worldPos.x && positionArray[i].y == this.worldPos.y) {
                return true;
            }
        }
        return false;
    }

    /** @summary Cantidad de daño recibida */
    hurt(points) {
        if (this.active) {
            this.health -= points;
            this.health = Math.max(this.health, 0); // clamp
            this.isHurt = true;
            console.log("dañado " + this.health);
            this.scene.events.emit('loseLife', this.id, this.health);
        }
        
    }

    /** @summary Cambia estado de aturdimiento */
    stun(state){
        this.isStunned = state;
    }
    
    /** @summary Cura vida */
    heal(points) {
        this.health += points;
        this.health = Phaser.Math.Clamp(this.health, 0, this.maxHealth); // clamp
        this.scene.events.emit('gainLife', this.id, this.health);
    }

    getCombatState() { return this.canCombat };
    setCombatState(state) { this.canCombat = state};

    checkDeath() {
        if(this.health == 0) {
            this.die();
            return true;
        }
        return false;
    }

    die() { 
        this.setActive(false);
        // Animación de muerte
        // Añadirse como obstáculo
    };

    playMovingAnimation(TIME) {

        //TWEEN
        this.onMovingAnimation = true;

        this.scene.tweens.add({
            targets: this,
            x: tileToScreenX(this.worldPos.x),
            ease: 'linear',
            duration: TIME,
            yoyo: false,
            repeat: 0,
        })

        
        var yoyo = this.direction.y == 0;
        if (!yoyo) {
            this.scene.tweens.add({
                targets: this,
                y: tileToScreenY(this.worldPos.y),
                ease: 'linear',
                duration: TIME ,
                yoyo: yoyo,
                repeat: 0,
                onComplete: () => {
                    this.onMovingAnimation = false;
                },

            })
        }
        
        else {
            this.scene.tweens.add({
                targets: this,
                y: this.y - 25 + Math.floor(Math.random() * 10),
                ease: 'power1',
                duration: TIME/ 2 ,
                yoyo: yoyo,
                repeat: 0,
                onComplete: () => {
                    this.onMovingAnimation = false;
                },

            })
        }
        
        
        

    }

    finishMovingAnimation() {
        this.onMovingAnimation = false;
    }

    changeSprite() {} // according to direction
}