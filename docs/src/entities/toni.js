import Ally from "./ally.js";

export default class Toni extends Ally {
    constructor(scene, x, y, texture, frame) {
        super(scene, 'player', x, y, texture, frame, 5);
    }

    die() {
        this.scene.events.emit("toni-killed");
    }

    changeSprite() {
        if(this.direction.y < 0)
            this.setTexture('toni_back');
        else this.setTexture('toni_front')
    }

    playMovingAnimation(TIME) {
        this.scene.toniMoveSound.play();
        this.scene.allyMoveSound.play();
        super.playMovingAnimation(TIME);
    }
}