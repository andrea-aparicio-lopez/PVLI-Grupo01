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

        this.damageRectsGroup;
    }

    preload() {
        //carga de todo lo que se necesite en la escena (por ejemplo la info de Tiled)

        this.load.json("cardsData", "./assets/cards.json");
        this.load.json("deckData", "./assets/deck.json");

        //carga de tilemap
        this.load.image('tile', '../../assets/tiles/tilemap2/barco spritesheet.png');
        this.load.tilemapTiledJSON('tilemap' , '../../assets/tiles/tilemap2/boat_map.json');

        this.load.image('player_sprite', '../../assets/textures/toni.png');
        this.load.image('ally_sprite', '../../assets/textures/allyBull.png');
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
        const map = this.make.tilemap({ key: "tilemap" });
        const tileset = map.addTilesetImage("boat_spritesheet", "tile");
        const layer1 = map.createLayer("ground", tileset);
        layer1.setScale(3, 3);

        const layer2 = map.createLayer("water", tileset);
        layer2.setScale(3, 3);
        //map.setBaseTileSize(32, 32);

     

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
        this.player.recieveEvent(event);
    }

    endPlayerTurn() {
        this.damageRectsGroup.children.entries.forEach((rect) => {
            rect.makeInvisible();
        });
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
        this.uiManager.update();

    }

}
