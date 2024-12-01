import Entity from "./entity.js";

export default class Enemy extends Entity {
    constructor(scene, id, x, y, texture, frame, maxHealth, AIdata) {
        super(scene, id, x, y, texture, frame, maxHealth);

        this.health = 1;
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
                //alert("Path was found. The first Point is " + path[0].x + " " + path[0].y);
                // Si estuviese en la misma casilla que el player no se movería (no debería ocurrir)
                if (this.worldPos.x == this.scene.player.toni.worldPos.x && this.worldPos.y == this.scene.player.toni.worldPos.y) this.moveInDirection();
                else {
                    var dir = {};
                    dir.x = path[1].x - this.worldPos.x;
                    dir.y = path[1].y - this.worldPos.y;
                    this.setDirection(dir.x, dir.y);

                    this.moveInDirection();
                }
                
            }
        });

        this.pathFinding.calculate();

        
    }

    checkHit(damageInfo) {
        if(damageInfo.target == 'enemy') {
            super.checkHit(damageInfo);
        }
    }

    die() {
        this.scene.events.emit('enemy-killed')
        this.setTexture('pirate_dead');
        super.die();
    }
}