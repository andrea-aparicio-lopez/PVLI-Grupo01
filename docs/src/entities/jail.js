import Entity from "./entity.js";

export default class Jail extends Entity {
    constructor(scene, id, x, y, texture) {
        //texture puede ser literalmente definido aqui
        super(scene, id, x, y, texture, 0, 1);

    }

    checkHit(damageInfo) {
        if (damageInfo.target == 'enemy') {
            super.checkHit(damageInfo);
        }
    }

    die() {
        if (this.active) {
            this.scene.events.emit('jail_broken', this);
            this.setTexture('jail_broken');
            this.scene.jailBrokenSound.play();
            super.die();
        }
        
    }
}