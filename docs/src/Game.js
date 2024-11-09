import Board from './board/Board.js'
import Entity from './objects/entity.js'
import Enemy from './objects/enemies/enemy.js'
import Ally from './objects/allies/ally.js'

export default class Game extends Phaser.GameObjects.GameObject {
    //yo aqui le pasaria el tablero y que cree los turnos en base al tablero
    constructor(board) {
        this.entityList = [];

        entityList[0] = new Ally(0,0,0,0,0,10,10);
        entityList[1] = new Enemy(0, 0, 0, 0, 0, 10, 10);
    }

    //reordena entityList usando el coste de la habilidad usada
    calculateTurnOrder(cost) {

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
            this.calculateTurnOrder();
            this.startTurn(this.entityList[0]);
        }
    }

    gameHasEnded() {
        var alliesAlive = false;
        //checkeo de los aliados vivos
        for (i = 0; i < this.entityList.length; i++) {
            if (alliesAlive == false && this.entityList[i].AI == undefined) {
                console.log("Aliado");
                alliesAlive = this.entityList.health > 0;
            }
        }
        
        if (alliesAlive == false) return true;

        //checkeo de enemigos vivos
        var enemiesAlive = false;
        for (i = 0; i < this.entityList.length; i++) {
            if (enemiesAlive == false && this.entityList[i].AI != undefined) {
                console.log("Enemigo");
                enemiesAlive = this.entityList.health > 0;
            }
        }
        if (enemiesAlive == false) return true;

        return false;
    }
    
}