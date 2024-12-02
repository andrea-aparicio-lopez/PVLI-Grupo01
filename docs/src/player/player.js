import Ally from "../entities/ally.js";
import Deck from "../objects/deck.js";

export default class Player {
    static MAX_CARD_NUM = 6;

    constructor(scene, cardsData, deckData, toni, enemyCount) {
        this.scene = scene;

        this.deck = new Deck(scene, cardsData, deckData);
        this.hand = [];
        this.graveyard = [];

        for(let i=0; i < Player.MAX_CARD_NUM; i++) {
            this.hand[i] = this.deck.draw();
        }
        // this.selectedCard = null;


        this.toni = toni;

        this.freedAllies = [];

        this.alliesAlive = 0;
        this.enemiesAlive = enemyCount;

        this.scene.events.on('ally-killed', this.allyKilled, this)
        this.scene.events.on('toni-killed', this.toniKilled, this)
        this.scene.events.on('enemy-killed', this.enemyKilled, this)
        this.scene.events.on('jail_broken', this.jailBroken, this)

        this.scene.events.on('ally-spawned', () => this.alliesAlive++);

        this.isTurn = false;
    }

    // Draw a card: returns true if succeeds, else return false if no card was drawn
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
            card.playedBy(this.toni);
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
                this.toni.setDirection(0, -1);
                hasMoved = this.toni.moveInDirection();
            }
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.A) {
                this.toni.setDirection(-1, 0);
                hasMoved = this.toni.moveInDirection();
            }
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.S) {
                this.toni.setDirection(0, 1);
                hasMoved = this.toni.moveInDirection();
            }
            else if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.D) {
                this.toni.setDirection(1, 0);
                hasMoved = this.toni.moveInDirection();
            }
            if(hasMoved) {
                this.updateAllies();
            }
            
        }
    }

    updateAllies() {
        if(this.freedAllies.length != 0){
            this.freedAllies[0].moveTowardsPosition(this.toni.worldPos);
            for(let i = 1; i < this.freedAllies.length; i++) {
                this.freedAllies[i].moveTowardsPosition(this.freedAllies[i - 1].worldPos);
            }
        }

        this.toni.scene.endPlayerTurn();
    }

    endTurn() {
        // console.log("ended player turn");
        this.isTurn = false;
    }

    // TODO Comprueba aliados en casillas adyacentes
    checkNearbyTrappedAllies() {

    }

    allyKilled() {
        this.alliesAlive--;
        if(this.alliesAlive == 0)
            this.scene.events.emit("Level lost");
    }

    toniKilled() {
        this.scene.events.emit("Level lost");
    }

    enemyKilled(event) {
        this.enemiesAlive--;
        console.log(this.enemiesAlive)
        if(this.enemiesAlive == 0) {
            this.scene.events.emit("level-won")
        }
    }

    jailBroken(event) {
        var ally = new Ally(this.scene, "Ally " + this.freedAllies.length, event.worldPos.x, event.worldPos.y, "ally_sprite", 0, 20, this.freedAllies.length);
        this.freedAllies.push(ally);
    }
}