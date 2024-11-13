import Player from "../player/player.js";
// import Button from "./button.js";
import CardUI from "./cardUI.js";


export default class UIManager {

    constructor(scene, player){

        this.scene = scene;
        this.player = player;
        this.hand = this.player.hand;

        this.cardsUI = [];
        let cardColor = 0xFCA311;

        for (let i = 0; i < Player.MAX_CARD_NUM ; i++) {
            // Create buttons
            let card = new CardUI(this.scene,
                60 * i + 20,
                400,
                40,
                70,
                cardColor,
                1,
                "empty1234",
                i
            );
            this.cardsUI.push(card);
        }

        
        this.indexSelectedCard;
        this.clickedCard;

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
        this.cardsUI[index].highlight();
        this.hand[index].visualizePlay(this.player.mainPlayer);
    }

    listenToCardOut(index) {
        // console.log("Out:", index);
        this.cardsUI[index].unhighlight();
        this.hand[index].endVisualizePlay();
    }

    cardIndex() {
        return this.indexSelectedCard;
    }

    updateHand() {
        for (let i = 0; i < Player.MAX_CARD_NUM; i++) {

            if(i < this.hand.length){
                this.cardsUI[i].enable();
                this.cardsUI[i].update(this.hand[i].name);
            }
            else {
                this.cardsUI[i].disable();
                this.cardsUI[i].unhighlight();
            }
        }
    }

    setInteractiveCards() {
        for (let i = 0; i < Player.MAX_CARD_NUM; i++) {
            this.cardsUI[i].setButtonInteractive();
        }
    }

    disableInteractiveCards() {
        for (let i = 0; i < Player.MAX_CARD_NUM; i++) {
            this.cardsUI[i].unsetButtonInteractive();
        }
    }
}