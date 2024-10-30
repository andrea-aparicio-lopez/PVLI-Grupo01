import Board from '../Board.js'
export default class Example extends Phaser.Scene {
    preload() {
        //carga de todo lo que se necesite en la escena (por ejemplo la info de Tiled)
    }

    create() {
        var b =new Board(infoDeTiled);
    }
}