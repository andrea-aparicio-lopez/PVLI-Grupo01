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
        this.add.image(0,0, 'background').setOrigin(0,0).setScale(scale);
        var startButton = this.add.image(this.sys.game.canvas.width*0.5, this.sys.game.canvas.height*0.7, "startButton").setScale(0.5);
        startButton.setInteractive({useHandCursor: true});

        // EVENTOS
        startButton.on("pointerdown", ()=>{
            this.scene.start("ScenePrueba")
        })
    }

    update(t, dt) {

    } 
}