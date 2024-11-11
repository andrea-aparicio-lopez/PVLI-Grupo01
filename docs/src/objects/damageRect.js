export default class DamageRect extends Phaser.GameObjects.Rectangle {
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
    constructor(scene, x, y, width, height, color, alpha, value) {
        super(scene, x, y, width, height, color, alpha, value);

        this.scene.add.existing(this).setOrigin(0);

        this.scene.physics.add.existing(this);

        this.setFillStyle(color, alpha);

        this.damage = value;

        this.setActive(false).setVisible(false);

    }

    makeVisible() { this.setVisible(true); }
    makeInvisible() { this.setVisible(false); }
    setVisibility(state) { this.setVisible(state); }

    activate() { this.setActiveState(true); }
    deactivate() { this.setActiveState(false); }
    setActiveState(state) { this.setActive(state).setVisible(state); }
}