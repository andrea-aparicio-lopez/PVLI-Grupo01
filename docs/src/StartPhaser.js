import MainMenu from './scenes/MainMenu.js';
import Preloader from './scenes/Preloader.js';
import FirstLevel from './scenes/boat/Level1.js';
import SecondLevel from './scenes/boat/Level2.js';
import ThirdLevel from './scenes/boat/Level3.js'
import DeathScene from './scenes/DeathScene.js'
import WinScene from './scenes/WinScene.js'

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
    scene: [Preloader, MainMenu, FirstLevel, SecondLevel, ThirdLevel, DeathScene, WinScene],
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