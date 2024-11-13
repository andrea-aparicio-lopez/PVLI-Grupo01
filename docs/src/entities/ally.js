import Entity from "./entity.js";

export default class Ally extends Entity {
    constructor(scene, x, y, texture, frame, maxHealth) {
        super(scene, x, y, texture, frame, maxHealth);

        this.isFree = false;
    }

    setFree() {this.isFree = true;}

    preupdate(t, dt) {
        super.preUpdate(t, dt);
    }

    moveToPlayer() {
        // TODO: De momento idéntico a los enemigos, lo tengo que refinar
        if (this.worldPos.x > this.scene.player.mainPlayer.worldPos.x)
            this.setDirection(-1,0);
        else if (this.worldPos.x < this.scene.player.mainPlayer.worldPos.x) 
            this.setDirection(1,0);
        else if (this.worldPos.y > this.scene.player.mainPlayer.worldPos.y) 
            this.setDirection(0,-1);
        else if (this.worldPos.y < this.scene.player.mainPlayer.worldPos.y) 
            this.setDirection(1,0);

        this.moveInDirection();
    }


    die() {
        super.die();
    }
}