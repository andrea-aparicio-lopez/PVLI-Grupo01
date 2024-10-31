import Board from '../Board.js'
import Game from '../Game.js'
export default class Example extends Phaser.Scene {
    preload() {
        //carga de todo lo que se necesite en la escena (por ejemplo la info de Tiled)
    }

    create() {
        var game = new Game();
        game.startTurn();
    }
}