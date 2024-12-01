import Ally from "../entities/ally.js";
import Toni from "../entities/toni.js";
import Player from "../player/player.js";
import DamageRect from "../objects/damageRect.js";
import Enemy from "../entities/enemy.js";
import UIManager from "../UI/uiManager.js";
import Table from '../graphics/table.js'

import { GI } from '../graphics/graphicsInterface.js'
import InfoPanel from "../graphics/infoPanel.js";


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

        this.load.image('player_sprite', './assets/textures/Toro_1.png');
        this.load.image('ally_sprite', './assets/textures/allyBull.png');
        this.load.image('pirate_sprite', './assets/textures/pirata.png');
        this.load.image('pirate_dead', '././assets/textures/pirata_muerto.png')

        // table
        this.load.image('table_background', './assets/textures/table_background.png');
        this.load.image('table_text_box', './assets/textures/table_text_box.png');
        this.load.image('card', './assets/textures/card.png');

        // info panel
        this.load.image('info_background', './assets/textures/info_background.png');

    }

        
    create() {
        const cardsData = this.cache.json.get('cardsData');
        const deckData = this.cache.json.get('deckData');

        // TILEMAP
        this.map = this.make.tilemap({ key: "boat" });
        const tileset = this.map.addTilesetImage("barco", "tiles");
        const waterLayer = this.map.createLayer("water", tileset, GI.centralPanel.x).setScale(GI.tileMapConst.scale);
        const groundLayer = this.map.createLayer("ground", tileset, GI.centralPanel.x).setScale(GI.tileMapConst.scale);
        const obstacleLayer = this.map.createLayer("obstacles", tileset, GI.centralPanel.x).setScale(GI.tileMapConst.scale);
        // obstacleLayer.setCollisionByProperty({ collides : true });


        //OBSTACULOS//////////////////////////////////////////////////
        for (var i = 0; i < this.map.height; i++) {
            this.obstacles[i] = [];
            for (var j = 0; j < this.map.width; j++) {
                this.obstacles[i][j] = false;
            }
        }
        

        for (let i = 0; i < this.map.height; i++) {
            
            for (let j = 0; j < this.map.width; j++) {
                if (obstacleLayer.layer.data[i][j].index != -1) this.obstacles[i][j] = true;
            }
        }

        this.map.destroyLayer(obstacleLayer);
        ////////////////////////////////////////////////////////////

        // Create rects for damage viz and calc
        this.damageRectsGroup = this.physics.add.group();
        let rectColor = 0xff0000;

        groundLayer.forEachTile((tile) => {
            const x = GI.centralPanel.x + tile.pixelX * groundLayer.scaleX;
            const y = GI.centralPanel.y + tile.pixelY * groundLayer.scaleY;
            const width = tile.width * groundLayer.scaleX;
            const height = tile.height * groundLayer.scaleY;

            let rect = new DamageRect(this, x, y, width, height, rectColor, 0.5, 10);
            this.damageRectsGroup.add(rect);
        });


        // PLAYER, ALLIES AND ENEMIES
        let toni = new Toni(this, 5, 5, "player_sprite", 0, 50);
        let allyArray = [
            new Ally(this, 1, 1, "ally_sprite", 0, 20),
            new Ally(this, 2, 5, "ally_sprite", 0, 20),
        ];
        
        this.enemiesGroup = this.physics.add.group();
        this.enemyArray = [
            new Enemy(this, 2, 3, "pirate_sprite", 0, 20)
        ];
        this.enemyArray.forEach((enemy) => this.enemiesGroup.add(enemy));
        toni.setToTop();
        
        this.player = new Player(this, cardsData, deckData, toni, allyArray, this.enemyArray.length);


        // UI
        // Create table:
        this.table = new Table(this, GI.table.x, GI.table.y);
        // Create info panel:
        this.infoPanel = new InfoPanel(this, GI.infoPanel.x, GI.infoPanel.y);
        // Create UI Manager
        this.uiManager = new UIManager(this, this.player, this.table);


        // EVENTOS
        this.events.on("Level lost", this.levelLost, this);
        this.events.on("Level won", this.levelWon, this);

        
        this.input.keyboard.on('keydown-W', this.inputToPlayer, this);
        this.input.keyboard.on('keydown-A', this.inputToPlayer, this); 
        this.input.keyboard.on('keydown-S', this.inputToPlayer, this);
        this.input.keyboard.on('keydown-D', this.inputToPlayer, this);

        this.startPlayerTurn();
    }    

    /** @param damageRects: posiciones en tiles */
    cardPlayed(entity, damageRects, damage) {
        let _target;
        if(entity instanceof Enemy)
            _target = 'ally';
        else _target = 'enemy';
        this.events.emit('damage', {
            target: _target,
            positions: damageRects,
            damage: damage
        })
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
        this.enemyArray.forEach((enemy) =>enemy.playTurn());
        this.endEnemyTurn();
    }

    endEnemyTurn() {
        this.playAllAnimations();
    }

    playAllAnimations() {
        let TIME = 200;
        this.player.toni.playMovingAnimation(TIME)
        for(let i = 0; i < this.player.freedAllies.length; i++)
            this.player.freedAllies[i].playMovingAnimation(TIME);
        this.enemyArray.forEach((enemy) =>enemy.playMovingAnimation(TIME));
        //se para un tiempo definido para las animaciones
        var timer = this.time.delayedCall(
            TIME,
            this.stopAllAnimations,
            null,
            this
        ); // delay in ms
    }

    stopAllAnimations() {
        this.player.toni.onMovingAnimation = false;
        for(let i = 0; i < this.player.freedAllies.length; i++)
            this.player.freedAllies[i].onMovingAnimation = false;
        this.enemyArray.forEach((enemy) => enemy.onMovingAnimation = false);
        this.startPlayerTurn();
    }

    update(time, delta) {
        this.uiManager.update();

        this.player.toni.update(time, delta);
        for(let i = 0; i < this.player.freedAllies.length; i++)
            this.player.freedAllies[i].update();
        this.enemyArray.forEach((enemy) => enemy.update(time, delta));
    }

    addObstacle(position) {
        this.obstacles[position.x][position.y] = true;
    }

    // TODO
    levelLost() {
        console.log("Nivel perdido")
    }

    levelWon() {
        console.log("Nivel ganado")
    }
}
