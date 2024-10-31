import Board from './Board.js'
export default class Game extends Phaser.GameObjects.GameObject {
    //yo aqui le pasaria el tablero y que cree los turnos en base al tablero
    constructor(board) {
        this.turnList;
        this.turn = 0;
    }
    

    startTurn(entityTurn) {
        console.log(this.turn); 
        

        this.endTurn();
    }

    endTurn() {
        if (!this.gameHasEnded()) {
            this.turn++;
            this.startTurn();
        }
    }

    gameHasEnded() {
        return false;
    }
    
}