import { GI } from '../graphics/graphicsInterface.js'
export default class DeathScene extends Phaser.Scene {
    constructor() {
        super("deathScene");
    }

    create() {
        this.add.image(GI.centralPanel.x, GI.centralPanel.y, 'deathSceneImage').setOrigin(0, 0).setScale(3);

        this.input.on('pointerdown', () => {
            this.scene.start('MainMenu')
        });
    }
}