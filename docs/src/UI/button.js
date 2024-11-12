export default class Button extends Phaser.GameObjects.Rectangle {
    /**
     * Constructor
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {number} width 
     * @param {number} height
     * @param {number} color 
     * @param {number} alpha 
     * @param {number} value 
     */
    constructor(scene, x, y, width, height, color, alpha) {
        super(scene, x, y, width, height, color, alpha);

        this.scene.add.existing(this).setOrigin(0);

        this.color = color;
        this.alpha = alpha;
        this.setFillStyle(this.color, this.alpha);

        this.setInteractive();

        this.on('pointerdown', () =>{
            this.onClick();
        });

        this.on('pointerover', () =>{
            this.onHover();
        });

        this.on('pointerout', () =>{
            this.onOut();
        });
  
    }
    
    onClick() {}

    onHover() {}

    onOut() {}

    highlight() {}

    unhighlight() { this.setFillStyle(this.color, this.alpha); } 

    update() {}

    setButtonInteractive() { this.setInteractive(); }
    unsetButtonInteractive() { this.disableInteractive(); }

    makeVisible() { this.setVisible(true); }
    makeInvisible() { this.setVisible(false); }
    setVisibility(state) { this.setVisible(state); }

    activate() { this.setActiveState(true); }
    deactivate() { this.setActiveState(false); }
    setActiveState(state) { this.setActive(state); }
}