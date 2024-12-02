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

    preupdate(t, dt) {
        super.preUpdate(t, dt);
    }



    moveTowardsPosition(position) {
        this.pathFinding.setGrid(this.scene.obstacles);
        this.pathFinding.setAcceptableTiles([false]);

        this.pathFinding.findPath(this.worldPos.x, this.worldPos.y, position.x, position.y, (path) => {
            if (path === null) {
                alert("Path was not found.");
            } else {
                //alert("Path was found. The first Point is " + path[0].x + " " + path[0].y);
                // Si estuviese en la misma casilla que el player no se movería (no debería ocurrir)
                if (this.worldPos.x == position.x && this.worldPos.y == position.y) this.moveInDirection();
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

    die() {
        this.scene.events.emit("ally-killed", this);
        super.die();
    }
}