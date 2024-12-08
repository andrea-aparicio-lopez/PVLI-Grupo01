import { levelKeys } from "./levelsInfo.js";
import { GI } from '../graphics/graphicsInterface.js'

import Player from "../player/player.js";

import Enemy from "../entities/enemy.js";
import Jail from "../entities/jail.js";
import Toni from "../entities/toni.js";

import DamageRect from "../objects/damageRect.js";

import UIManager from "../UI/uiManager.js";
import Table from '../graphics/table.js'
import InfoPanel from "../graphics/infoPanel.js";

export default class Level extends Phaser.Scene {
    /**@param lvl: level-number */
    constructor(lvl) {
        super(levelKeys[lvl]);

        this.level = lvl;

        this.playerTurn = true;
        this.wait = false;

        this.map;
        this.obstacles = [];
        this.entityObstacles = [];
        this.enemyArray = [];

        this.damageRectsGroup;
        this.onMenu = false;
    }

    // preload() {
    //     // TILEMAP -> carga de tilemapTiledJSON
    // }

    create() {
        // TILEMAP -> crear tilemap, añadir tilesetImage, crear Layers (terreno, obstáculos)

        const cardsData = this.cache.json.get('cardsData');
        const deckData = this.cache.json.get('deckData');

        //#region OBSTACLES, ENTITIES
        for (var i = 0; i < this.map.height; i++) {
            this.obstacles[i] = [];
            this.entityObstacles[i] = [];
            for (var j = 0; j < this.map.width; j++) 
                this.obstacles[i][j] = false;
                this.entityObstacles[i][j] = false;
        }
        let enemyCount, jailCount;
        enemyCount = jailCount = 0;
        let toni;

        const obstacleLayer = this.map.getLayer("obstacles");
        for (let i = 0; i < this.map.height; i++) {
            for (let j = 0; j < this.map.width; j++)  {
                if (obstacleLayer.data[i][j].properties.collides) this.obstacles[i][j] = true;
                switch(obstacleLayer.data[i][j].properties.spawn) {
                    case 'enemy':
                        this.enemyArray.push(new Enemy(this, 'enemy_'+ ++enemyCount, j, i, "pirate_sprite", 0, 1));
                        this.addEntityObstacle({x: j, y: i})
                        break;
                    case 'jail':
                        new Jail(this, 'jail_' + ++jailCount, j, i, 'jail_sprite');
                        break;
                    case 'toni':
                        toni = new Toni(this, j, i, 'toni_front', 0);
                        this.addEntityObstacle({x: j, y: i})
                        break;
                }
            }
        }
        toni.setToTop();
        this.player = new Player(this, cardsData, deckData, toni, enemyCount, jailCount);

        //#endregion

        //#region DAMAGE RECTS
        this.damageRectsGroup = this.physics.add.group();

        for(let i = 0; i < GI.tileMapConst.height; i++) {
            for (let j = 0; j < GI.tileMapConst.width; j++) {
                this.damageRectsGroup.add(new DamageRect(
                    this,
                    GI.centralPanel.x + j * GI.tileMapConst.scaledSize,
                    GI.centralPanel.y + i * GI.tileMapConst.scaledSize,
                    GI.tileMapConst.scaledSize,
                    GI.tileMapConst.scaledSize,
                    0xff0000,
                    0.5,
                    10
                ));
            }
        }
        //#endregion

        //#region UI
        this.table = new Table(this, GI.table.x, GI.table.y);
        this.infoPanel = new InfoPanel(this, GI.infoPanel.x, GI.infoPanel.y);
        this.uiManager = new UIManager(this);
        //#endregion
        
        
        //#region EVENTOS
        this.events.on("level-lost", this.levelLost, this);
        this.events.on("level-won", this.levelWon, this);

        
        this.input.keyboard.on('keydown-W', this.inputToPlayer, this);
        this.input.keyboard.on('keydown-A', this.inputToPlayer, this); 
        this.input.keyboard.on('keydown-S', this.inputToPlayer, this);
        this.input.keyboard.on('keydown-D', this.inputToPlayer, this);
        this.input.keyboard.on('keydown-P', this.inputToUiManager, this);
        //#endregion

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

    //#region turns
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
        // AQUI
        this.endEnemyTurn();
    }

    endEnemyTurn() {
        this.playAllAnimations();
    }
    //#endregion

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
        this.obstacles[position.y][position.x] = true;
    }

    removeEntityObstacle(position) {
        this.entityObstacles[position.y][position.x] = false;
    }
    addEntityObstacle(position) {
        this.entityObstacles[position.y][position.x] = true;
    }

    updateEntityObstacles(prevPos, currentPos) {
        this.removeEntityObstacle(prevPos);
        this.addEntityObstacle(currentPos);
    }

    // TODO
    levelLost() {
        console.log("Nivel perdido")
        this.time.addEvent({
            delay: 4000,
            callback: this.reloadLevel,
            callbackScope: this
        });
    }

    levelWon() {
        console.log("Nivel ganado");
        this.time.addEvent({
            delay: 3000,
            callback: this.nextLevel,
            callbackScope: this
        });        
    }

    reloadLevel() {
        this.scene.restart();
    }

    nextLevel() {
        console.log("cargando siguiente nivel");
        this.events.removeAllListeners();
        this.scene.start(levelKeys[this.level+1]);
    }

    inputToUiManager(event) {
        this.uiManager.receiveEvent(event);
    }

}


