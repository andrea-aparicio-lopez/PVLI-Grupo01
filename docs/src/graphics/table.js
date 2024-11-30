import { GI } from '../graphics/graphicsInterface.js'

export default class Table extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);

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


        scene.add.existing(this);
    }
}