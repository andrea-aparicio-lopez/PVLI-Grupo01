import { GI } from '../graphics/graphicsInterface.js'
import { levelKeys } from "../scenes/levelsInfo.js";
import Button from './button.js';


export default class MenuPausa extends Phaser.GameObjects.Container {
    constructor(scene){
        super(scene, 0, 0)

        this.scene = scene;

        this.setSize(GI.gameWindowWidth, GI.gameWindowHeight);
        this.setInteractive();

        this.background = new Phaser.GameObjects.Rectangle(scene, 0, 0, GI.gameWindowWidth, GI.gameWindowHeight, 0xddd07f, 0.5).setOrigin(0).setInteractive();
        this.add(this.background);

        this.bannerSprite = new Phaser.GameObjects.Sprite(scene, 0, 0, 'game_pause').setOrigin(0);
        const banner_pos_x = (GI.gameWindowWidth - this.bannerSprite.width)/2;
        const banner_pos_y = (GI.gameWindowHeight - this.bannerSprite.height)/2;
        
        this.banner = new Phaser.GameObjects.Container(scene, banner_pos_x, banner_pos_y);
        this.banner.setSize(this.bannerSprite.width, this.bannerSprite.height);
        this.banner.add(this.bannerSprite);
        this.add(this.banner);
        

        const button_width = 150;
        const button_height = 50;
        const padding_x = (this.bannerSprite.width - 2*button_width)/3;

        const menu_button_left_x = padding_x;
        const menu_button_left_y = this.bannerSprite.height/2 + 30;
        const menu_button_left_width = button_width;
        const menu_button_left_height = button_height;

        const menu_button_right_x = this.bannerSprite.width - padding_x - button_width;
        const menu_button_right_y = this.bannerSprite.height/2 + 30;

        

        this.button_resume = new Phaser.GameObjects.Container(scene, menu_button_left_x, menu_button_left_y);
        this.button_resume.setSize(menu_button_left_width, menu_button_left_height)
        this.button_resume.setInteractive();
        this.button_resume_rect = new Button(scene, 0, 0, menu_button_left_width, menu_button_left_height, 0xffffff, 1);
        this.button_resume_rect.onClick = () => {this.menuOff()};
        this.button_resume_rect.highlight = () => {this.button_resume_rect.setFillStyle(0xaaaaaa, 1)};
        this.button_resume_rect.onHover = () => {this.button_resume_rect.highlight()}
        this.button_resume_rect.onOut = () => {this.button_resume_rect.unhighlight()};
 

        this.button_resume_text = new Phaser.GameObjects.Text(scene,
            menu_button_left_width/2,
            menu_button_left_height/2,
            "RESUME",             
            { font: `20px Verdana`,
            fill: '#000000',
            resolution: 3,
        }).setOrigin(0.5,0.5);

        this.button_resume.add([this.button_resume_rect, this.button_resume_text])
        this.banner.add(this.button_resume);




        this.button_quit = new Phaser.GameObjects.Container(scene, menu_button_right_x, menu_button_right_y);
        this.button_quit.setSize(menu_button_left_width, menu_button_left_height);
        this.button_quit.setInteractive();
        this.button_quit_rect = new Button(scene, 0, 0, menu_button_left_width, menu_button_left_height, 0xffffff, 1);
        this.button_quit_rect.onClick = () => {
            this.scene.sound.stopAll();
            this.scene.removeListeners();
            this.scene.scene.start('MainMenu');
        };
        this.button_quit_rect.highlight = () => {this.button_quit_rect.setFillStyle(0xaaaaaa, 1)};
        this.button_quit_rect.onHover = () => {this.button_quit_rect.highlight()}
        this.button_quit_rect.onOut = () => {this.button_quit_rect.unhighlight()};


        this.button_quit_text = new Phaser.GameObjects.Text(scene,
            menu_button_left_width/2,
            menu_button_left_height/2,
            "START SCREEN",             
            { font: `18px Verdana`,
            fill: '#000000',
            resolution: 3,
        }).setOrigin(0.5,0.5);
        
        this.button_quit.add([this.button_quit_rect, this.button_quit_text])
        this.banner.add(this.button_quit);





        this.text = scene.add.text(
            GI.gameWindowWidth/2,
            GI.gameWindowHeight/3,
            "GAME PAUSED",
            {
            font: `40px Verdana bold`,
            fill: '#000000',
            resolution: 3,
        }).setOrigin(0.5, 0)
        this.add(this.text)



        scene.add.existing(this);        
    }

    menuOn(){
        this.scene.onMenu = true;
        this.scene.children.bringToTop(this);
        this.setVisible(true);
    }
    menuOff(){
        this.scene.onMenu = false;
        this.setVisible(false);
    }
    toggle() {
        if (this.scene.onMenu) this.menuOff();
        else this.menuOn();
    }
}