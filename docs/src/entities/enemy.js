import Entity from "./entity.js";

export default class Enemy extends Entity {
    constructor(scene, x, y, texture, frame, maxHealth, AIdata) {
        super(scene, x, y, texture, frame, maxHealth);

        // Por definir
        this.AI = AIdata;
    }

    preupdate(t, dt) {
        super.preUpdate(t, dt);
    }

    /** @summary Llama a la IA para jugar su turno */
    playTurn() {
        this.moveToPlayer();
    }

    moveToPlayer() {
        // Si estuviese en la misma casilla que el player no se movería (no debería ocurrir)
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