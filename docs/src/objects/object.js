export default class Object extends Phaser.GameObjects.Sprite {
/**
 * Constructor de Enemigo
 * @param {Scene} scene - escena en la que aparece
 * @param {number} x - coordenada x
 * @param {number} y - coordenada y
 */

constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    this.x = x;
    this.y = y;

    this.scene.add.existing(this);
}

preUpdate(t, dt) {
    super.preUpdate(t, dt); 
}
}