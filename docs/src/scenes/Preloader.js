import { levelKeys } from "./levelsInfo.js";

export default class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader')
    }

    preload() {
        // TILES
        this.load.image('boat_tiles', './assets/maps/boat_tileset.png');

        // SPRITES
        this.load.image('toni_front', './assets/textures/toni_front.png');
        this.load.image('toni_back', './assets/textures/toni_back.png');
        this.load.image('toni_hurt', './assets/textures/toni_hurt.png');
        this.load.image('ally_sprite', './assets/textures/allyBull.png');
        this.load.image('pirate_sprite', './assets/textures/pirata.png');
        this.load.image('pirate_hurt', '././assets/textures/pirata_hurt.png');
        this.load.image('pirate_dead', '././assets/textures/pirata_muerto.png');
        this.load.image('jail_sprite', '././assets/textures/jail.png');
        this.load.image('jail_broken', '././assets/textures/broken_jail.png');

        // UI
        this.load.image('table_background', './assets/textures/table_background.png');
        this.load.image('table_text_box', './assets/textures/table_text_box.png');
        this.load.image('card', './assets/textures/card.png');
        this.load.image('info_background', './assets/textures/info_background.png'); // info panel
        this.load.image('game_pause', './assets/textures/gamePause.png');

        // DECK
        this.load.json("cardsData", "./assets/cards.json");
        this.load.json("deckData", "./assets/deck.json");

        //SONIDO
        this.load.audio('toniMoveSound', "./assets/sound/toniMoveSound.wav");
        this.load.audio('jailBrokenSound', "./assets/sound/jailBrokenSound.wav");
        this.load.audio('hurtSound', "./assets/sound/hurtSound.wav");
        this.load.audio('allyMoveSound', "./assets/sound/allyMoveSound.wav");
        this.load.audio('music', "./assets/sound/flamenco.wav");
        this.load.audio('trumpet', "./assets/sound/trumpet.mp3");
        this.load.audio('cheer', "./assets/sound/cheer.wav");
        this.load.audio('crowd', "./assets/sound/crowd1.wav");
    }

    create() {
        // ANIMACIONES
        this.anims.create({
            key: 'toni-front-hurt',
            frames: [
                {key: 'toni_hurt'},
                {key: 'toni_front'}
            ],
            frameRate: 15,
            repeat: 3
        });

        this.anims.create({
            key: 'toni-back-hurt',
            frames: [
                {key: 'toni_hurt'},
                {key: 'toni_back'}
            ],
            frameRate: 15,
            repeat: 3
        });

        this.anims.create({
            key: 'pirate-hurt',
            frames: [
                {key: 'pirate_hurt'},
                {key: 'pirate_sprite'}
            ],
            frameRate: 15,
            repeat: 3
        })

        // Cargar nivel 1
        this.scene.start(levelKeys[1]);
    }
}