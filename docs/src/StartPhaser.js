import MainMenu from './scenes/MainMenu.js';
import ScenePrueba from './scenes/ScenePrueba.js'

import { GI } from './graphics/graphicsInterface.js'

let config = {
    type: Phaser.AUTO,
    parent: "juego",
    scale: {
        mode: Phaser.AUTO,
        width: GI.gameWindowWidth,
        height: GI.gameWindowHeight,
        autoCenter: Phaser.Scale.CENTER_BOTH,

    },
    pixelArt: true,
    scene: [MainMenu, ScenePrueba],
    physics: {  
        default: 'arcade', //Tenemos físicas simple, arcade
        arcade: { 
            gravity: { y: 0 }, //Tenemos gravedad, podemos modificarla para aumentar su fuerza o disminuirla
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