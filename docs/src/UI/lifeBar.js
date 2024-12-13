import { GI } from '../graphics/graphicsInterface.js'

export default class LifeBar extends Phaser.GameObjects.Container {
    constructor(scene, id, maxHealth, x, y, w, h, type){
        super(scene, x, y)

        const info = GI.infoPanel;

        this.id = id;
        this.size = w;
        this.maxHealth = maxHealth;
        this.currHealth = maxHealth;

        this.bar = new Phaser.GameObjects.Rectangle(scene, 0, 0, w, h, 0x00a500, 1).setOrigin(0);


        this.add(this.bar);

        this.text = scene.add.text(
            0,
            h+2,
            `${this.currHealth}/${this.maxHealth}`,
            {
            font: `${info.textSize[type]} Verdana`,
            fill: '#000000',
            resolution: 3, // Higher resolution
        });

        this.add(this.text);

        scene.add.existing(this);

        scene.events.on('loseLife', (p_id, p_newHealth) => {
            if (p_id == id) {
                this.currHealth = p_newHealth;
                let newSize = p_newHealth/this.maxHealth * w;
                this.bar.setScale(newSize/w, 1);
                this.text.text = `${this.currHealth}/${this.maxHealth}`;
            }
        })

        scene.events.on('gainLife', (p_id, p_newHealth) => {
            if (p_id == id) {
                this.currHealth = p_newHealth;
                let newSize = Phaser.Math.Clamp(p_newHealth/this.maxHealth * w, 0, w)
                this.bar.setScale(newSize/w, 1);
                this.text.text = `${this.currHealth}/${this.maxHealth}`;
            }
        })
    }
}