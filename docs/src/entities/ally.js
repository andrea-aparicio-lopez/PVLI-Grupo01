import Entity from "./entity.js";

export default class Ally extends Entity {
    constructor(scene, id, x, y, texture, frame, maxHealth, arrayIndex) {
        super(scene, id, x, y, texture, frame, maxHealth);

        this.arrayIndex = arrayIndex;
        this.isFree = false;
    }

    checkHit(damageInfo) {
        if(damageInfo.target == 'ally') {
            super.checkHit(damageInfo);
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

    atAdjacentPos(path) {
        // dirección contraria
        // this.setDirection({
        //     x: this.worldPos.x - destPos.x,
        //     y: this.worldPos.y - destPos.y
        // })
        this.setDirection(this.worldPos.x - path[path.length-1].x, this.worldPos.y - path[path.length-1].y);
    }

    die() {
        this.scene.events.emit("ally-killed", this);
        super.die();
    }
}