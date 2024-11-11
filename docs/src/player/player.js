import Deck from "../objects/deck.js";

export default class Player {
    static MAX_CARD_NUM = 6;

    constructor(deckData, player, allyArray) {
        this.deck = new Deck(deckData);

        for(let i=0; i < this.MAX_CARD_NUM; i++) {
            this.hand[i] = this.deck.drawCard();
        }
        // this.selectedCard = null;

        this.player = player;
        this.allies = [];
        allyArray.forEach(ally => {
            this.allies.push(ally);
        });

        this.isTurn = false;
    }

    drawCard() {
        if(this.hand.length < this.MAX_CARD_NUM){
            this.hand.push(this.deck.drawCard());
        }
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
                this.move(0, -1);
            }
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.A) {
                this.move(-1,0);
            }
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.S) {
                this.move(0, 1);
            }
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.D) {
                this.move(1,0);
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