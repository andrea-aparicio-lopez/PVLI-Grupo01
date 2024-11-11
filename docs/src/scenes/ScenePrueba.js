import Board from "../board/Board.js";
import Game from "../Game.js";
import Ally from "../entities/ally.js";
import Deck from "../objects/deck.js";
import Player from "../player/player.js";
import DamageRect from "../objects/damageRect.js";
import Enemy from "../entities/enemy.js";

export default class Example extends Phaser.Scene {
  constructor() {
    super("ScenePrueba");

    this.playerTurn = true;
    this.wait = false;

    this.damageRectsGroup;
  }

  preload() {
    //carga de todo lo que se necesite en la escena (por ejemplo la info de Tiled)

    this.load.json("cardsData", "./assets/cards.json");

    //carga de tilemap
    this.load.image("tile", "../../assets/tiles/tilemap1/tilePrueba.png");
    this.load.tilemapTiledJSON(
      "tilemap",
      "../../assets/tiles/tilemap1/tilemap.json"
    );

    this.load.image("player_sprite", "../../assets/textures/toro1.png");
  }

  create() {
    const cardsData = this.cache.json.get("cardsData");

    // create the Tilemap
    const map = this.make.tilemap({ key: "tilemap" });
    const tileset = map.addTilesetImage("standard_tileset", "tile");
    const layer = map.createLayer("Capa de patrones 1", tileset);
    layer.setScale(3, 3);
    //map.setBaseTileSize(32, 32);

    let bull = new Ally(this, 0, 0, "player_sprite", 0, 50);
    let allyArray = [
      new Ally(this, 1, 1, "player_sprite", 0, 20),
      new Ally(this, 2, 5, "player_sprite", 0, 20),
    ];
    this.player = new Player(this, cardsData, bull, allyArray);

    // Create rects for damage viz and calc
    this.damageRectsGroup = this.physics.add.group();
    let rectColor = 0xff0000;

    layer.forEachTile((tile) => {
      const x = tile.pixelX * layer.scaleX;
      const y = tile.pixelY * layer.scaleY;
      const width = tile.width * layer.scaleX;
      const height = tile.height * layer.scaleY;

      let rect = new DamageRect(this, x, y, width, height, rectColor, 0.5, 10);
      this.damageRectsGroup.add(rect);
    });

    // Create enemy group
    let enemiesGroup = this.physics.add.group();
    let enemy = new Enemy(this, 2, 3, "player_sprite", 0, 20);
    enemiesGroup.add(enemy);

    // Create collision overlap for enemies
    this.enemyOverlap = this.physics.add.overlap(
      enemiesGroup,
      this.damageRectsGroup,
      (enemy, rect) => {
        if (enemy.getCombatState()) {
          enemy.hurt(rect.damage);
          enemy.stun(rect.stun);
          enemy.setCombatState(false);
        }
      }
    );
    this.enemyOverlap.active = false; // desactiva la deteccion

    // // Create collision overlap for allies
    // this.allyOverlap = this.physics.add.overlap(alliesGroup, this.damageRectsGroup, (ally, rect) => {
    //   if(ally.getCombatState()) {
    //      ally.hurt(rect.damage);
    //      ally.stun(rect.stun);
    //      ally.setCombatState(false);
    //     }
    // });
    // this.allyOverlap.active = false; // desactiva la deteccion

    // Player juega a una carta
    this.player.playCard(0);
    let hasDraw = this.player.drawCard();
    // console.log("Deck:", this.player.deck.currentDeck);
    // console.log("Hand:", this.player.hand);
    // console.log("Graveyard", this.player.graveyard);
  }

  update(t, dt) {
    if (!this.wait) {
      if (this.playerTurn) {
        this.waitForSeconds(1000);
        if (!this.player.isTurn) this.player.setTurn(true);
        this.playerTurn = this.player.turn();
      } else {
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
    var timer = this.time.delayedCall(
      delay,
      () => (this.wait = false),
      null,
      this
    ); // delay in ms
  }
}
