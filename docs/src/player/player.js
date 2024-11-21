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


        this.mainPlayer = player;
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


    playCard(cardPos) {
        if (this.isTurn) {
            let cardArray = this.hand.splice(cardPos, 1); // retorna un array de 1 elemento
            let card = cardArray[0];
            card.playedBy(this.mainPlayer);
            this.graveyard.push(card);
            //console.log("Player hand:", this.deck.currentDeck);

            this.updateAllies();
        }
        
    }   

    startTurn() {
        // console.log("started player turn");
        
        this.isTurn = true;
        this.drawCard();
    }

    receiveEvent(event) {
        
        if (this.isTurn == true) {
            let hasMoved;
            //recieved event
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.W) {
                this.mainPlayer.setDirection(0, -1);
                hasMoved = this.mainPlayer.moveInDirection();
            }
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.A) {
                this.mainPlayer.setDirection(-1, 0);
                hasMoved = this.mainPlayer.moveInDirection();
            }
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.S) {
                this.mainPlayer.setDirection(0, 1);
                hasMoved = this.mainPlayer.moveInDirection();
            }
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.D) {
                this.mainPlayer.setDirection(1, 0);
                hasMoved = this.mainPlayer.moveInDirection();
            }
            if(hasMoved) {
                this.updateAllies();
            }
            
        }
    }

    updateAllies() {
        for(let i = 0; i < this.allies.length; i++) {
            this.allies[i].moveToPlayer();
            //console.log("moviendo aliado " + i + " en posicion " + this.allies[i].worldPos.x + " " + this.allies[i].worldPos.y);
        }

        this.mainPlayer.scene.endPlayerTurn();
    }

    endTurn() {
        // console.log("ended player turn");
        this.isTurn = false;
    }


}