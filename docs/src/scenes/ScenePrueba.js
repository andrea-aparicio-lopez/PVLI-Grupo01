import Toni from "../entities/toni.js";
import Player from "../player/player.js";
import DamageRect from "../objects/damageRect.js";
import Enemy from "../entities/enemy.js";
import UIManager from "../UI/uiManager.js";
import Table from '../graphics/table.js'
import Jail from '../entities/jail.js'

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
        // TILEMAP
        this.load.tilemapTiledJSON('boat' , './assets/tiles/tilemap4/boat_map.json');

    }

        
    create() {
        const cardsData = this.cache.json.get('cardsData');
        const deckData = this.cache.json.get('deckData');

        // TILEMAP
        this.map = this.make.tilemap({ key: "boat" });
        const tileset = this.map.addTilesetImage("barco", "boat-tiles");
        const waterLayer = this.map.createLayer("water", tileset, GI.centralPanel.x).setScale(GI.tileMapConst.scale);
        const groundLayer = this.map.createLayer("ground", tileset, GI.centralPanel.x).setScale(GI.tileMapConst.scale);
        const obstacleLayer = this.map.createLayer("obstacles", tileset, GI.centralPanel.x).setScale(GI.tileMapConst.scale);


        //OBSTACULOS//////////////////////////////////////////////////
        for (var i = 0; i < this.map.height; i++) {
            this.obstacles[i] = [];
            for (var j = 0; j < this.map.width; j++) {
                this.obstacles[i][j] = false;
            }
        }
        

        for (let i = 0; i < this.map.height; i++) {
            
            for (let j = 0; j < this.map.width; j++) {
                if(obstacleLayer.layer.data[i][j].properties.collides) this.obstacles[i][j] = true;
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
        let toni = new Toni(this, 5, 5, "player_sprite", 0);
        
        
        //new Ally(this, 'Ally_1', 1, 1, "ally_sprite", 0, 20);
        //new Ally(this, 'Ally_2', 2, 5, "ally_sprite", 0, 20);
        new Jail(this, 'jail1', 3, 3, 'jail_sprite');
        new Jail(this, 'jail2', 9, 7, 'jail_sprite');
        new Jail(this, 'jail3', 8, 9, 'jail_sprite');
        new Jail(this, 'jail4', 5, 4, 'jail_sprite');

        
        // this.enemiesGroup = this.physics.add.group();
        this.enemyArray = [
            //new Enemy(this, 'Enemy_1', 1, 3, "pirate_sprite", 0, 20)
        ];
        toni.setToTop();

        this.player = new Player(this, cardsData, deckData, toni, this.enemyArray.length);


        // UI
        // Create table:
        this.table = new Table(this, GI.table.x, GI.table.y);
        // Create info panel:
        this.infoPanel = new InfoPanel(this, GI.infoPanel.x, GI.infoPanel.y);
        // Create UI Manager
        this.uiManager = new UIManager(this);


        // EVENTOS
        // this.events.on('enemy-killed', ()=>console.log("sos"), this)
        this.events.on("level-lost", this.levelLost, this);
        this.events.on("level-won", this.levelWon, this);

        
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
            this.endAnimations,
            null,
            this
        ); // delay in ms
    }
    endAnimations() {
        this.startPlayerTurn();
    }

    update(time, delta) {
        this.uiManager.update();
    }

    addObstacle(position) {
        this.obstacles[position.x][position.y] = true;
    }

    // TODO
    levelLost() {
        console.log("Nivel perdido")
    }

    levelWon() {
        console.log("Nivel ganado");
        this.time.addEvent({
            delay: 3000,
            callback: this.nextLevel,
            callbackScope: this
        })
        
    }

    nextLevel() {
        // this.scene.start('firstLevel')
        console.log("cargando siguiente nivel")
    }
}
