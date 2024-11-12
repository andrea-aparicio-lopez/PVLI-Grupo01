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
        let moveX, moveY;
        if (this.worldPos.x > this.scene.player.player.worldPos.x) {
            moveX = -1;
        }
        else if (this.worldPos.x < this.scene.player.player.worldPos.x) {
            moveX = 1;
        }
        else moveX = 0;

        if (moveX == 0) {
            if (this.worldPos.y > this.scene.player.player.worldPos.y) {
                moveY = -1;
            }
            else if (this.worldPos.y < this.scene.player.player.worldPos.y) {
                moveY = 1;
            }
            else moveY = 0;
        }
        else moveY = 0;

        

        this.move(moveX, moveY);
    }

    move(x, y) {
        console.log(this.getWorldPos());
        this.worldPos.x += x;
        this.worldPos.y += y;

        if (this.worldPos.x < 0) this.worldPos.x = 0;
        if (this.worldPos.x > 9) this.worldPos.x = 9;
        if (this.worldPos.y < 0) this.worldPos.y = 0;
        if (this.worldPos.y > 9) this.worldPos.y = 9;
    }

    die() {
        super.die();
    }

    update() {
        super.update();
    }
}