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
        this.pathFinding.setGrid(this.scene.obstacles);
        this.pathFinding.setAcceptableTiles([false]);

        this.pathFinding.findPath(this.worldPos.x, this.worldPos.y, this.scene.player.toni.worldPos.x, this.scene.player.toni.worldPos.y, (path) =>{
            if (path === null) {
                alert("Path was not found.");
            } else {
                alert("Path was found. The first Point is " + path[0].x + " " + path[0].y);
            }
        });

        this.pathFinding.calculate();

        // Si estuviese en la misma casilla que el player no se movería (no debería ocurrir)
        if (this.worldPos.x > this.scene.player.toni.worldPos.x)
            this.setDirection(-1,0);
        else if (this.worldPos.x < this.scene.player.toni.worldPos.x) 
            this.setDirection(1,0);
        else if (this.worldPos.y > this.scene.player.toni.worldPos.y) 
            this.setDirection(0,-1);
        else if (this.worldPos.y < this.scene.player.toni.worldPos.y) 
            this.setDirection(0,1);

        this.moveInDirection();
    }

    die() {
        this.emit("Enemy killed");
        super.die();
    }
}