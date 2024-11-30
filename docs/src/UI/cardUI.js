import { GI } from '../graphics/graphicsInterface.js'
import Button from "./button.js";

export default class CardUI extends Button {
    /**
     * Constructor
     * @param {Scene} scene - escena en la que aparece
     * @param {number} x - coordenada x
     * @param {number} y - coordenada y
     * @param {number} width 
     * @param {number} height
     * @param {number} color 
     * @param {number} alpha 
     * @param {string} text 
     * @param {number} index - posición [0, 5]
     * 
     */
    constructor(scene, x, y, width, height, color, alpha, text, index) {
        super(scene, x, y, width, height, color, alpha);

        this.scene = scene;
        this.text = this.scene.make.text({
            x: x,
            y: y,
            text: this.text,
            style: {
                fontFamily: GI.cardSpecs.fontFamily,
                fontSize: GI.cardSpecs.fontSize,
                fill: '#8380B6',
                wordWrap: { width: GI.cardSpecs.width }
            },
        })

        this.index = index;

        this.highlightColor = 0x6CD4FF;
        this.selectedColor = 0xEE4266;

    }
    
    onClick() { this.scene.uiManager.listenToCardClick(this.index); }

    onHover() { this.scene.uiManager.listenToCardHover(this.index); }

    onOut() { this.scene.uiManager.listenToCardOut(this.index); }

    highlight() { this.setFillStyle(this.highlightColor, this.alpha); }

    selectedLight() { this.setFillStyle(this.selectedColor, this.alpha); }

    enable() {
        this.makeVisible();
        this.setButtonInteractive();
        this.text.alpha = 1;
    }

    disable() {
        this.makeInvisible();
        this.unsetButtonInteractive();
        this.text.alpha = 0;
    }

    // unhighlight() {} 

    update(text) {
        this.text.setText(text);
    }

}