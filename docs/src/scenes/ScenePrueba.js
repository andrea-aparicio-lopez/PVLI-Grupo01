import Board from "../board/Board.js";
import Game from "../Game.js";
import Ally from "../entities/ally.js";
import Player from "../player/player.js";
import DamageRect from "../objects/damageRect.js";
import Enemy from "../entities/enemy.js";
import UIManager from "../UI/uiManager.js";

export default class Example extends Phaser.Scene {
    constructor() {
        super("ScenePrueba");

        this.playerTurn = true;
        this.wait = false;

        //mapa
        this.map;

        this.damageRectsGroup;

        this.obstacles;
    }

    preload() {
        //carga de todo lo que se necesite en la escena (por ejemplo la info de Tiled)

        this.load.json("cardsData", "./assets/cards.json");
        this.load.json("deckData", "./assets/deck.json");

        //carga de tilemap
        this.load.image('tile', './assets/tiles/tilemap2/barco spritesheet.png');
        this.load.json('tilemapJSON', './assets/tiles/tilemap2/boat_map.json');
        this.load.tilemapTiledJSON('tilemap' , './assets/tiles/tilemap2/boat_map.json');

        this.load.image('player_sprite', './assets/textures/toni.png');
        this.load.image('ally_sprite', './assets/textures/allyBull.png');
        this.load.image('pirate_sprite', './assets/textures/pirata.png');
        }

        
    create() {
        const cardsData = this.cache.json.get('cardsData');
        const deckData = this.cache.json.get('deckData');
        // let ally = new Ally(this, 10, 10, null, 0, 1, 2);

        // console.log(ally.incrPosX());
        // console.log(ally.incrPosX());
        // console.log(ally.incrPosX());
        // console.log(ally.incrPosX());

        // console.log(ally.getPosition());

                // create the Tilemap
        this.map = this.make.tilemap({ key: "tilemap" });
        const tileset = this.map.addTilesetImage("boat_spritesheet", "tile");
        const layer1 = this.map.createLayer("ground", tileset);
        layer1.setScale(3, 3);

        const layer2 = this.map.createLayer("water", tileset);
        layer2.setScale(3, 3);
        //map.setBaseTileSize(32, 32);

        this.obstacle = Array(this.map.width).fill().map(() => Array(this.map.height).fill());

        for (let i = 0; i < layer2.culledTiles.length; i++) {
            
            this.obstacle[layer2.culledTiles[i].x, layer2.culledTiles[i].y] = true;
        }
        console.log(this.obstacle);

        // Create rects for damage viz and calc
        this.damageRectsGroup = this.physics.add.group();
        let rectColor = 0xff0000;

        layer1.forEachTile((tile) => {
            const x = tile.pixelX * layer1.scaleX;
            const y = tile.pixelY * layer1.scaleY;
            const width = tile.width * layer1.scaleX;
            const height = tile.height * layer1.scaleY;

            let rect = new DamageRect(this, x, y, width, height, rectColor, 0.5, 10);
            this.damageRectsGroup.add(rect);
        });

        let bull = new Ally(this, 5, 5, "player_sprite", 0, 50);
        let allyArray = [
            new Ally(this, 1, 1, "ally_sprite", 0, 20),
            new Ally(this, 2, 5, "ally_sprite", 0, 20),
        ];
        this.player = new Player(this, cardsData, deckData, bull, allyArray);

        
        // Create enemy group
        this.enemiesGroup = this.physics.add.group();
        this.enemy = new Enemy(this, 2, 3, "pirate_sprite", 0, 20);
        this.enemiesGroup.add(this.enemy);

        // Create collision overlap for enemies
        this.enemyOverlap = this.physics.add.overlap(
            this.enemiesGroup,
            this.damageRectsGroup,
            (rect) => {
                if (this.enemy.getCombatState()) {
                    this.enemy.hurt(rect.damage);
                    this.enemy.stun(rect.stun);
                    this.enemy.setCombatState(false);
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
        // this.player.playCard(0);
        // let hasDraw = this.player.drawCard();
        console.log("Deck:", this.player.deck.currentDeck);
        console.log("Hand:", this.player.hand);
        console.log("Graveyard", this.player.graveyard);

        // Create UI Manager
        this.uiManager = new UIManager(this, this.player);

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
        this.player.receiveEvent(event);
    }

    endPlayerTurn() {
        this.damageRectsGroup.children.entries.forEach((rect) => {
            rect.makeInvisible();
        });
        this.player.endTurn();
        this.startEnemyTurn();
    }

    startEnemyTurn() {
        this.enemy.playTurn();
        this.endEnemyTurn();
    }

    endEnemyTurn() {
        
        this.playAllAnimations();
    }

    playAllAnimations() {
        let TIME = 200;
        this.player.mainPlayer.playMovingAnimation(TIME)
        for(let i = 0; i < this.player.allies.length; i++)
            this.player.allies[i].playMovingAnimation(TIME);
        this.enemy.playMovingAnimation(TIME);
        //se para un tiempo definido para las animaciones
        var timer = this.time.delayedCall(
            TIME,
            this.stopAllAnimations,
            null,
            this
        ); // delay in ms
    }

    stopAllAnimations() {
        this.player.mainPlayer.onMovingAnimation = false;
        for(let i = 0; i < this.player.allies.length; i++)
            this.player.allies[i].onMovingAnimation = false;
        this.enemy.onMovingAnimation = false;
        this.startPlayerTurn();
    }

    update(time, delta) {
        this.uiManager.update();

        this.player.mainPlayer.update(time, delta);
        for(let i = 0; i < this.player.allies.length; i++)
            this.player.allies[i].update();
        this.enemy.update(time, delta);
    }

}
