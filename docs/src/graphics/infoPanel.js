import { GI } from './graphicsInterface.js';
import LifeBar from '../UI/lifeBar.js';

export default class InfoPanel {
    constructor(scene, x, y) {
        const info = GI.infoPanel;

        this.background = new Phaser.GameObjects.Sprite(scene, x, y, 'info_background').setOrigin(0);
        scene.add.existing(this.background);

        // INFO TEXT
        this.infoText = new Phaser.GameObjects.Text(
            scene,
            info.margin + info.x,
            info.margin,
            "Zona 1: rescate a X toros y huja.",
            {
                fontFamily: 'Arial',
                fontSize: '15px',
                color: '#4234ff',
                wordWrap: { width: info.player.width - info.padding },
            }
        );
        scene.add.existing(this.infoText);

        this.createPlayerInfo(scene, info);

        /*
        scene.allyArray.forEach((ally, index) => {
            this.createBullInfo(scene, ally, index)
        });
        */

        scene.events.on('ally-spawned', (event)=> this.createBullInfo(scene,event,event.arrayIndex ), this)
    }

    createPlayerInfo(scene, info) {
        // Player box
        this.playerBox = new Phaser.GameObjects.Rectangle(
            scene,
            info.player.x,
            info.player.y,
            info.player.width,
            info.player.height,
            0x23addf,
            1
        ).setOrigin(0);
        scene.add.existing(this.playerBox);

        // Player image
        this.playerImage = new Phaser.GameObjects.Rectangle(
            scene,
            info.player.image.x,
            info.player.image.y,
            info.player.image.width,
            info.player.image.height,
            0xffffff,
            1
        ).setOrigin(0);
        scene.add.existing(this.playerImage);

        // Life box
        this.playerLifeBox = new Phaser.GameObjects.Rectangle(
            scene,
            info.player.lifeBox.x,
            info.player.lifeBox.y,
            info.player.lifeBox.width,
            info.player.lifeBox.height,
            0x777777,
            1
        ).setOrigin(0);
        scene.add.existing(this.playerLifeBox);

        // Life bar
        this.playerLifeBar = new LifeBar(
            scene,
            scene.player.toni.id,
            scene.player.toni.maxHealth,
            info.player.lifeBar.x,
            info.player.lifeBar.y,
            info.player.lifeBar.width,
            info.player.lifeBar.height,
            'player'
        );
    }

    createBullInfo(scene, ally, index) {
        const bullInfo = {};
        const bull = GI.infoPanel.bulls[index];

        // Bull box
        bullInfo.box = new Phaser.GameObjects.Rectangle(
            scene,
            bull.x,
            bull.y,
            bull.w,
            bull.h,
            0xf3afdf,
            1
        ).setOrigin(0);
        scene.add.existing(bullInfo.box);

        // Bull image
        bullInfo.image = new Phaser.GameObjects.Rectangle(
            scene,
            bull.image.x,
            bull.image.y,
            30,
            30,
            0xffffff,
            1
        ).setOrigin(0);
        scene.add.existing(bullInfo.image);

        // Life box
        bullInfo.lifeBox = new Phaser.GameObjects.Rectangle(
            scene,
            bull.lifeBox.x,
            bull.lifeBox.y,
            bull.lifeBox.width,
            bull.lifeBox.height,
            0x777777,
            1
        ).setOrigin(0);
        scene.add.existing(bullInfo.lifeBox);

        // Life bar
        bullInfo.lifeBar = new LifeBar(
            scene,
            ally.id,
            ally.maxHealth,
            bull.lifeBar.x,
            bull.lifeBar.y,
            bull.lifeBar.width,
            bull.lifeBar.height,
            'ally'
        );
    }
}
