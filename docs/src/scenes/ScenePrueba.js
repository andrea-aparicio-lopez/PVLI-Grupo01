import Board from '../board/Board.js'
import Game from '../Game.js'
import Ally from '../entities/ally.js';
import Deck from "../objects/deck.js";

export default class Example extends Phaser.Scene {
    constructor() {
        super('ScenePrueba');

        this.playerTurn = true;
        this.wait = false;
    }

    preload() {
        //carga de todo lo que se necesite en la escena (por ejemplo la info de Tiled)

        this.load.json('cardsData', './assets/cards.json');
    }

    
    create() {
        const cardsData = this.cache.json.get('cardsData');
        let deck = new Deck(cardsData);
        // let card = deck.drawCard();
        // let ally = new Ally(this, 10, 10, null, 0, 1, 2);
        // card.play();

        // console.log(ally.incrPosX());
        // console.log(ally.incrPosX());
        // console.log(ally.incrPosX());
        // console.log(ally.incrPosX());

        // console.log(ally.getPosition());

    }

    update() {
        if (!this.wait) {
            if (this.playerTurn) {
                console.log("playersTurn");
                this.waitForSeconds(1000);
            }
            else {
                console.log("enemyTurn");
                this.waitForSeconds(1000);
                //for each enemy -> performAction
                this.playerTurn = true;
            }
        }
        
    }

    //finalizar el turno del jugador
    endPlayerTurn() {
        this.playerTurn = false;
    }

    //se llama para parar el flujo del juego por un tiempo
    waitForSeconds(delay) {
        this.wait = true;
        var timer = this.time.delayedCall(delay, () => this.wait = false, null, this);  // delay in ms
    }

}