import Board from './board/Board.js'
import Entity from './objects/entity.js'
import Enemy from './entities/enemy.js'
import Ally from './entities/ally.js'

export default class Game extends Phaser.GameObjects.GameObject{
    //yo aqui le pasaria el tablero y que cree los turnos en base al tablero
    constructor(scene) {
        super(scene, "Game");
        
        this.player = {};
;
        this.allies = [];
        this.enemies = [];
    }

    startTurn() {
        /*
        entity.Play();
        */
        console.log("Started Turn");
        this.endTurn();
    }

    endTurn() {
        if (!this.gameHasEnded()) {
            console.log("Ended Turn");

            this.startTurn(this.entityList[0]);
        }
    }

    gameHasEnded() {
        var alliesAlive = false;
        //checkeo de los aliados vivos
        for (let i = 0; i < this.entityList.length; i++) {
            if (alliesAlive == false && this.entityList[i].AI == undefined) {
                alliesAlive = this.entityList.health > 0;
            }
        }
        
        if (alliesAlive == true) return true;

        //checkeo de enemigos vivos
        var enemiesAlive = false;
        for (let i = 0; i < this.entityList.length; i++) {
            if (enemiesAlive == false && this.entityList[i].AI != undefined) {
                enemiesAlive = this.entityList.health > 0;
            }
        }
        if (enemiesAlive == true) return true;

        return false;
    }
    
}