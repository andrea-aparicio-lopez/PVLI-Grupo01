import Player from "../player/player.js";
import Button from "./button.js";
import MenuPausa from "./menuPausa.js";
import CardUI from "./cardUI.js";

import { GI } from '../graphics/graphicsInterface.js'


export default class UIManager {
    /**
     * Constructor
     * @param {Scene} scene
     */
    constructor(scene){

        this.scene = scene;
        this.player = scene.player;
        this.hand = this.player.hand;

        this.allys = scene.allyArray;

        this.cardsUI = scene.table.cardSlots;
        
        this.indexSelectedCard;
        this.clickedCard;

        this.menu = new MenuPausa(scene);
        this.menu.menuOff();

        this.menu_button = new Button(scene, 960, 10, 30, 30, 0xff0fff, 1);
        this.menu_button.onClick = () => {this.menu.toggle()};
        this.menu_button.highlight = () => {this.menu_button.setFillStyle(0xaaaaaa, 1)};
        this.menu_button.onHover = () => {this.menu_button.highlight()}
        this.menu_button.onOut = () => {this.menu_button.unhighlight()};
    }

    update() {
        this.updateHand();
        
        if (this.player.isTurn){
            this.setInteractiveCards();
        }
        else {
            this.disableInteractiveCards();
        }
    }

    listenToCardClick(index) {
        // console.log("Click:", index);
        // this.cardsUI[index].selectedLight();
        // this.clickedCard = this.hand[index];
        // console.log("Selected card:", this.clickedCard);
        this.hand[index].endVisualizePlay();

        this.player.playCard(index);
    }

    listenToCardHover(index) {
        // console.log("Hovering:", index);
        this.cardsUI[index].card.highlight();
        this.hand[index].visualizePlay(this.player.toni);
    }

    listenToCardOut(index) {
        // console.log("Out:", index);
        this.cardsUI[index].card.unhighlight();
        this.hand[index].endVisualizePlay();
    }

    cardIndex() {
        return this.indexSelectedCard;
    }

    updateHand() {
        for (let i = 0; i < this.player.handSize; i++) {

            if(i < this.hand.length){
                this.cardsUI[i].card.enable();
                this.cardsUI[i].card.update(this.hand[i]);
            }
            else {
                this.cardsUI[i].card.disable();
                this.cardsUI[i].card.unhighlight();
            }
        }
    }

    setInteractiveCards() {
        for (let i = 0; i < this.player.handSize; i++) {
            this.cardsUI[i].card.setButtonInteractive();
        }
    }

    disableInteractiveCards() {
        for (let i = 0; i < this.player.handSize; i++) {
            this.cardsUI[i].card.unsetButtonInteractive();
        }
    }

    receiveEvent(event) {
        if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.P){
            this.menu.toggle();
        }
    }
}