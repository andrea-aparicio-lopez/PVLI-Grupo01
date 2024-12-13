import { GI } from '../graphics/graphicsInterface.js'
export default class WinScene extends Phaser.Scene {
    constructor() {
        super("WinScene")
    }

    create() {
        this.add.image(GI.centralPanel.x, GI.centralPanel.y, 'winSceneImage').setOrigin(0, 0).setScale(3);

        this.input.on('pointerdown', () => {
            this.scene.start('MainMenu')
        });
    }
}