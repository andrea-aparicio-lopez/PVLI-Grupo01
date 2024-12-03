import Entity from "./entity.js";

export default class Ally extends Entity {
    constructor(scene, id, x, y, texture, frame, maxHealth, arrayIndex) {
        super(scene, id, x, y, texture, frame, maxHealth);

        this.arrayIndex = arrayIndex;
        this.isFree = false;
        this.scene.events.emit('ally-spawned', this)
    }

    checkHit(damageInfo) {
        if(damageInfo.target == 'ally') {
            console.log('aliado targeteado')
        }
    }

    setFree() {this.isFree = true;}

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }



    moveTowardsPosition(destPos) {
        this.pathFinding.setGrid(this.scene.obstacles);
        this.pathFinding.setAcceptableTiles([false]);

        this.findPath(destPos);

        this.pathFinding.calculate();
    }

    die() {
        this.scene.events.emit("ally-killed", this);
        super.die();
    }
}