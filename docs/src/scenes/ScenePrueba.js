import Board from '../board/Board.js'
import Game from '../Game.js'
export default class Example extends Phaser.Scene {
    constructor() {
        super('ScenePrueba');

        this.playerTurn = true;
        this.wait = false;
    }

    preload() {
        //carga de todo lo que se necesite en la escena (por ejemplo la info de Tiled)
    }

    
    create() {
        
    }

    update() {
        if (!this.wait) {
            if (this.playerTurn) {
                console.log("playersTurn");
                this.waitForSeconds(1000);
                this.playerTurn = false;
            }
            else {
                console.log("enemyTurn");
                this.waitForSeconds(1000);
                //for each enemy -> performAction
                this.playerTurn = true;
            }
        }
        
    }

    //se llama para parar el flujo del juego por un tiempo
    waitForSeconds(delay) {
        this.wait = true;
        var timer = this.time.delayedCall(delay, () => this.wait = false, null, this);  // delay in ms
    }

}