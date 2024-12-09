import { GI } from '../graphics/graphicsInterface.js'

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu")
    }

    preload() {
        this.load.image("background", "./assets/textures/MainMenu1.png");
        this.load.image("startButton", "./assets/textures/start.png");
    }

    create() {
        const scale = 3;

        // OBJETOS
        this.add.image(GI.centralPanel.x, GI.centralPanel.y, 'background').setOrigin(0,0).setScale(scale);
        var startButton = this.add.image(
            GI.centralPanel.width *0.5 + GI.centralPanel.x, 
            GI.centralPanel.height*0.7 + GI.centralPanel.y,
            "startButton"
        ).setScale(0.5);
        startButton.setInteractive({ useHandCursor: true });
        

        // EVENTOS
        startButton.on("pointerdown", () => {

            this.scene.start("Preloader")
            
        })
    }

    update(t, dt) {

    } 
}