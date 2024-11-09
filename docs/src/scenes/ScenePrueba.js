import Board from '../board/Board.js'
import Game from '../Game.js'
import Ally from '../entities/ally.js';
import Deck from "../objects/deck.js";
import Player from '../player/player.js'

export default class Example extends Phaser.Scene {
    constructor() {
        super('ScenePrueba');

        this.playerTurn = true;
        this.wait = false;


    }

    preload() {
        //carga de todo lo que se necesite en la escena (por ejemplo la info de Tiled)


        this.load.json('cardsData', './assets/cards.json');

        //carga de tilemap
        this.load.image('tile', '../../assets/tiles/tilemap1/tilePrueba.png');
        this.load.tilemapTiledJSON('tilemap', '../../assets/tiles/tilemap1/tilemap.json');

        this.load.image('player_sprite', '../../assets/textures/toroPrueba.png');
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

        
        // create the Tilemap
        const map = this.make.tilemap({ key: 'tilemap' });
        const tileset = map.addTilesetImage('standard_tileset', 'tile');
        map.createLayer('Capa de patrones 1', tileset);
<<<<<<< Updated upstream
        //map.setBaseTileSize(32, 32);
=======

        let bull = new Ally(this, 0, 0, 'player_sprite', 0, 50);
        let allyArray = [new Ally(this, 1, 1, 'player_sprite', 0, 20), new Ally(this, 2, 5, 'player_sprite', 0, 20)];
        this.player = new Player(cardsData, bull, allyArray);

   
>>>>>>> Stashed changes
    }

    update(t, dt) {
        if (!this.wait) {
            if (this.playerTurn) {
                this.waitForSeconds(1000);
                if(!this.player.isTurn) this.player.setTurn(true);
                this.playerTurn = this.player.turn();
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