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

        this.obstacles = [];
    }

    preload() {
        //carga de todo lo que se necesite en la escena (por ejemplo la info de Tiled)

        this.load.json("cardsData", "./assets/cards.json");
        this.load.json("deckData", "./assets/deck.json");

        //carga de tilemap
        this.load.image('tiles', './assets/tiles/tilemap4/boat_tileset.png');
        this.load.tilemapTiledJSON('boat' , './assets/tiles/tilemap4/boat_map.json');

        this.load.image('player_sprite', './assets/textures/toni.png');
        this.load.image('ally_sprite', './assets/textures/allyBull.png');
        this.load.image('pirate_sprite', './assets/textures/pirata.png');
        }

        
    create() {
        const cardsData = this.cache.json.get('cardsData');
        const deckData = this.cache.json.get('deckData');
        // let ally = new Ally(this, 10, 10, null, 0, 1, 2);

        // TILEMAP
        this.map = this.make.tilemap({ key: "boat" });
        const tileset = this.map.addTilesetImage("Barco", "tiles");
        const waterLayer = this.map.createLayer("water", tileset).setScale(3);
        const groundLayer = this.map.createLayer("ground", tileset).setScale(3);
        const obstacleLayer = this.map.createLayer("obstacles", tileset).setScale(3);
        obstacleLayer.setCollisionByProperty({ collides : true });



        //OBSTACULOS//////////////////////////////////////////////////
        for (var i = 0; i < this.map.width; i++) {
            this.obstacles[i] = [];
            for (var j = 0; j < this.map.height; j++) {
                this.obstacles[i][j] = false;
            }
        }

        for (let i = 0; i < this.map.height; i++) {
            
            for (let j = 0; j < this.map.width; j++) {
                if (obstacleLayer.layer.data[i][j].index != -1) this.obstacles[i][j] = true;
            }
        }

        ////////////////////////////////////////////////////////////

        // Create rects for damage viz and calc
        this.damageRectsGroup = this.physics.add.group();
        let rectColor = 0xff0000;

        groundLayer.forEachTile((tile) => {
            const x = tile.pixelX * groundLayer.scaleX;
            const y = tile.pixelY * groundLayer.scaleY;
            const width = tile.width * groundLayer.scaleX;
            const height = tile.height * groundLayer.scaleY;

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
