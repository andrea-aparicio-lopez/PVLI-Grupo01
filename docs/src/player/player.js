import Deck from "../objects/deck.js";

export default class Player {
    static MAX_CARD_NUM = 6;

    constructor(scene, deckData, player, allyArray) {
        this.deck = new Deck(scene, deckData);
        this.hand = [];
        this.graveyard = [];

        for(let i=0; i < Player.MAX_CARD_NUM; i++) {
            this.hand[i] = this.deck.draw();
        }
        // this.selectedCard = null;


        this.player = player;
        this.allies = [];
        allyArray.forEach(ally => {
            this.allies.push(ally);
        });

        this.isTurn = false;
    }

    // Draw a card: returns true if succeeds, else return false if no card was draw
    drawCard() {

        if(this.hand.length < Player.MAX_CARD_NUM)
        {
            if(this.deck.empty()) {
                this.deck.regenerate(this.graveyard); // Returns graveyard cards to deck and shuffles it
            }
            this.hand.push(this.deck.draw());

            return true
        }
        else return false
    }


    playCard(cardPos){
        let cardArray = this.hand.splice(cardPos, 1); // retorna un array de 1 elemento
        let card = cardArray[0];
        //console.log("Card played:", card);
        card.playedBy(this.player);
        this.graveyard.push(card);
        //console.log("Player hand:", this.deck.currentDeck);
    }   

    startTurn() {
        console.log("started turn");
        
        this.isTurn = true;
    }

    recieveEvent(event) {
        console.log();
        if (this.isTurn == true) {
            
            //recieved event
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.W) {
                this.player.move(0, -1);
            }
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.A) {
                this.player.move(-1,0);
            }
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.S) {
                this.player.move(0, 1);
            }
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.D) {
                this.player.move(1,0);
            }
            this.updateAllies();
        }
    }

    updateAllies() {
        this.player.scene.endPlayerTurn();
    }

    endTurn() {
        console.log("ended turn");
        this.isTurn = false;
    }


}