import Deck from "../objects/deck.js";

export default class Player {
    static MAX_CARD_NUM = 6;

    constructor(scene, cardsData, deckData, player, allyArray) {
        this.deck = new Deck(scene, cardsData, deckData);
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
        this.drawCard();
    }

    recieveEvent(event) {
        console.log();
        if (this.isTurn == true) {
            
            //recieved event
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.W) {
                this.move(0, -1);
                this.player.setDirection({
                    x: 0,
                    y: -1
                })
            }
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.A) {
                this.move(-1,0);
                this.player.setDirection({
                    x: -1,
                    y: 0
                })
            }
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.S) {
                this.move(0, 1);
                this.player.setDirection({
                    x: 0,
                    y: 1
                })
            }
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.D) {
                this.move(1,0);
                this.player.setDirection({
                    x: 1,
                    y: 0
                })
            }
            this.updateAllies();
        }
    }

    updateAllies() {
        this.player.scene.endPlayerTurn();
    }

    move(x, y) {
        console.log(this.player.getWorldPos());
        this.player.worldPos.x += x;
        this.player.worldPos.y += y;

        if (this.player.worldPos.x < 0) this.player.worldPos.x = 0;
        if (this.player.worldPos.x > 9) this.player.worldPos.x = 9;
        if (this.player.worldPos.y < 0) this.player.worldPos.y = 0;
        if (this.player.worldPos.y > 9) this.player.worldPos.y = 9;
        console.log(this.player.getWorldPos());
    }

    endTurn() {
        console.log("ended turn");
        this.isTurn = false;
    }


}