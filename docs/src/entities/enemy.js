// import Obstacle from "../objects/obstacle.js";
import Entity from "./entity.js";

export default class Enemy extends Entity {
    constructor(scene, id, x, y, texture, frame, maxHealth) {
        super(scene, id, x, y, texture, frame, maxHealth);
        // this.health = 1;
    }

    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

    /** @summary Llama a la IA para jugar su turno */
    playTurn() {
        this.moveToPlayer();
    }

    moveToPlayer() {
        this.pathFinding.setGrid(this.scene.obstacles);
        this.pathFinding.setAcceptableTiles([false]);

        this.findPath(this.scene.player.toni.worldPos);

        this.pathFinding.calculate();        
    }

    atAdjacentPos(path) {
        this.straightAttack(path);
    }

    checkHit(damageInfo) {
        if(damageInfo.target == 'enemy') {
            super.checkHit(damageInfo);
        }
    }

    calculatePath() {
        this.pathFinding.setGrid(this.scene.obstacles);
        this.pathFinding.setAcceptableTiles([false]);
        
        this.pathFinding.calculate();
    }

    // TODO
    straightAttack(path) {
        // console.log(`atacando a Toni`);
        let damageRects = [];
        for(let i = 1; i < path.length; i++)
            damageRects.push({x: path[i].x, y: path[i].y})

        this.scene.cardPlayed(this, damageRects, 1);
    }

    die() {
        this.scene.events.emit('enemy-killed', this)
        let index = this.scene.enemyArray.indexOf(this);
        this.scene.enemyArray.splice(index,1);
        this.setTexture('pirate_dead');

        this.scene.addObstacle(this.worldPos)
        super.die();
    }


}