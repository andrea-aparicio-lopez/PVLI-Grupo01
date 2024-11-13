import ScenePrueba from './scenes/ScenePrueba.js'
class Example extends Phaser.Scene {
    preload() {
        this.load.setBaseURL('https://labs.phaser.io');

        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
    }

    create() {
        this.add.image(400, 300, 'sky');

        const particles = this.add.particles(0, 0, 'red', {
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        const logo = this.physics.add.image(400, 100, 'logo');

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        particles.startFollow(logo);
    }
}

let config = {
    type: Phaser.AUTO,
    parent: "juego",
    scale: {
        mode: Phaser.AUTO,
        width: 480,
        height: 480,
        autoCenter: Phaser.Scale.CENTER_BOTH,

    },
    pixelArt: true,
    scene: [ScenePrueba],
    physics: {  
        default: 'arcade', //Tenemos físicas simple, arcade
        arcade: { 
            gravity: { y: 0 }, //Tenemos gravedad, podemos modificarla para aumentar su fuera o disminuirla
            debug: false // Aquí indicamos si queremos que Phaser pinte los cuerpos y fuerzas de los objetos con físicas
        },
        checkCollision: {
            up: true,
            down: true,
            left: true,
            right: true
        }
    },
    
}
const game = new Phaser.Game(config);