import { GI } from '../graphics/graphicsInterface.js'
import CardUI from '../UI/cardUI.js';

const initialNumSlots = 6;

export default class Table {
    constructor(scene, x, y) {


        this.numSlots = initialNumSlots;

        this.background = new Phaser.GameObjects.Sprite(scene, x, y, 'table_background').setOrigin(0);
        scene.add.existing(this.background);

        this.cardSlots = [
            {
                card: null,
                x: GI.table.hand.x,
                y: GI.table.hand.card_1_y
            },
            {
                card: null,
                x: GI.table.hand.x,
                y: GI.table.hand.card_2_y
            },
            {
                card: null,
                x: GI.table.hand.x,
                y: GI.table.hand.card_3_y
            },
            {
                card: null,
                x: GI.table.hand.x,
                y: GI.table.hand.card_4_y
            },
            {
                card: null,
                x: GI.table.hand.x,
                y: GI.table.hand.card_5_y
            },
            {
                card: null,
                x: GI.table.hand.x,
                y: GI.table.hand.card_6_y
            },
        ]

        for(let i = 0; i < this.numSlots; i++) {
            this.cardSlots[i].card = new CardUI(
                scene,
                this.cardSlots[i].x,
                this.cardSlots[i].y,
                GI.cardSpecs.width,
                GI.cardSpecs.height,
                GI.cardSpecs.color,
                1,
                "empty1234",
                i
            );
        }

        // Text region
        this.textBackground = new Phaser.GameObjects.Sprite(
            scene, 
            GI.table.textBox.x,
            GI.table.textBox.y,
            'table_text_box'
        ).setOrigin(0);
        scene.add.existing(this.textBackground);

        this.text = "Hover a card to see description here...";
        this.textDisplay = scene.make.text({
            x: GI.table.text.x, 
            y: GI.table.text.y, 
            text: this.text,
            style: {
                font: 'bold 10px Arial',
                fill: '#EE4266',
                wordWrap: { width: GI.table.text.width }
            },
        })

        
    }
}