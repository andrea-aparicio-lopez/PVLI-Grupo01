import Entity from "./entity.js";

export default class Ally extends Entity {
    constructor(scene, x, y, texture, frame, maxHealth) {
        super(scene, x, y, texture, frame, maxHealth);

        this.isFree = false;
    }

    checkHit(damageInfo) {
        if(damageInfo.target == 'ally') {
            console.log('aliado targeteado')
        }
    }

    setFree() {this.isFree = true;}

    preupdate(t, dt) {
        super.preUpdate(t, dt);
    }



    moveTowardsPosition(position) {
        if(this.worldPos.x > position.x)
            this.setDirection(-1,0);
        else if (this.worldPos.x < position.x) 
            this.setDirection(1,0);
        else if (this.worldPos.y > position.y) 
            this.setDirection(0,-1);
        else if (this.worldPos.y < position.y) 
            this.setDirection(1,0);

        this.moveInDirection();
    }

    die() {
        this.scene.events.emit("ally-killed");
        super.die();
    }
}