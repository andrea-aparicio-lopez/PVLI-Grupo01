import Board from "../board/Board.js";
import Game from "../Game.js";
import Ally from "../entities/ally.js";
import Deck from "../objects/deck.js";
import Player from "../player/player.js";

export default class Example extends Phaser.Scene {
  constructor() {
    super("ScenePrueba");

    this.playerTurn = true;
    this.wait = false;
  }

  preload() {
    //carga de todo lo que se necesite en la escena (por ejemplo la info de Tiled)

    this.load.json("cardsData", "./assets/cards.json");

        //carga de tilemap
        this.load.image('tile', '../../assets/tiles/tilemap1/tilePrueba.png');
        this.load.tilemapTiledJSON('tilemap', '../../assets/tiles/tilemap1/tilemap.json');

      this.load.image('player_sprite', '../../assets/textures/toni.png');
      this.load.image('ally_sprite', '../../assets/textures/allyBull.png');
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
    const map = this.make.tilemap({ key: "tilemap" });
    const tileset = map.addTilesetImage("standard_tileset", "tile");
    const layer = map.createLayer("Capa de patrones 1", tileset);
    layer.setScale(3, 3);
    //map.setBaseTileSize(32, 32);

    let bull = new Ally(this, 5, 5, "player_sprite", 0, 50);
    let allyArray = [
      new Ally(this, 1, 1, "ally_sprite", 0, 20),
      new Ally(this, 2, 5, "ally_sprite", 0, 20),
    ];
        this.player = new Player(cardsData, bull, allyArray);


        this.input.keyboard.on('keydown-W', this.inputToPlayer, this);
        this.input.keyboard.on('keydown-A', this.inputToPlayer, this); 
        this.input.keyboard.on('keydown-S', this.inputToPlayer, this);
        this.input.keyboard.on('keydown-D', this.inputToPlayer, this);

        this.startPlayerTurn();
    }

    

    startPlayerTurn() {
        this.player.startTurn();
    }

    inputToPlayer(event) {
        this.player.recieveEvent(event);
    }

    endPlayerTurn() {
        
        this.player.endTurn();
        this.startEnemyTurn();
    }

    startEnemyTurn() {
        //llama a la ia de los enemigos, o sus comportamientos
        this.endEnemyTurn();
    }

    endEnemyTurn() {

        this.playAllAnimations();
    }

    playAllAnimations() {
        //se para un tiempo definido para las animaciones
        this.startPlayerTurn();
    }

  //se llama para parar el flujo del juego por un tiempo
  waitForSeconds(delay) {
    this.wait = true;
    var timer = this.time.delayedCall(
      delay,
      () => (this.wait = false),
      null,
      this
    ); // delay in ms
    }

    update() {
        this.player.player.update();
    }
}
