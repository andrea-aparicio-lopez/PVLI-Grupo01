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
    constructor(scene, x, y, width, height, color, index) {
        super(scene, x, y, width, height, color, 1);

        this.scene = scene;
        this.sprite = this.scene.add.sprite(x, y, 'card').setOrigin(0);
        // this.sprite.angle = 2;

        this.description = "";

        this.name = this.scene.make.text({
            x: x,
            y: y,
            text: "none",
            style: {
                fontFamily: GI.cardSpecs.fontFamily,
                fontSize: GI.cardSpecs.fontSize,
                fill: '#ffffff',
                wordWrap: { width: GI.cardSpecs.width }
            },
        })

        this.index = index;

        this.highlightColor = 0x6CD4FF;
        this.selectedColor = 0xEE4266;

    }
    
    onClick() { 
        this.scene.uiManager.listenToCardClick(this.index); 
        // this.scene.events.emit('gainLife', this.scene.bull.id, 120);
        // this.scene.bull.hurt(20);
    }

    onHover() { 
        this.scene.uiManager.listenToCardHover(this.index);
        this.scene.events.emit('hoveringCard', this);
    }

    onOut() { 
        this.scene.uiManager.listenToCardOut(this.index); 
        this.scene.events.emit('outCard');
    }

    highlight() { this.setFillStyle(this.highlightColor, this.alpha); }

    selectedLight() { this.setFillStyle(this.selectedColor, this.alpha); }

    enable() {
        this.makeVisible();
        this.setButtonInteractive();
        this.name.alpha = 1;
    }

    disable() {
        this.makeInvisible();
        this.unsetButtonInteractive();
        this.name.alpha = 0;
    }

    // unhighlight() {} 

    update(card) {
        this.name.setText(card.name);
        this.description = card.text;
    }

}