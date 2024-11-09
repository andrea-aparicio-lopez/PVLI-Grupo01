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
        this.isBullTurn = false;
        this.isAlliesTurn = false;
    }

    drawCard() {
        if(this.hand.length < this.MAX_CARD_NUM){
            this.hand.push(this.deck.drawCard());
        }
    }

    // selectCard(card) {
    //     this.selectedCard = card;
    // }

    // playCard() {
    //     if(this.selectedCard != null) {
    //         this.selectedCard.playCard();
    //     }
    //     this.selectedCard = null;
    // }

    setTurn(value) {
        this.isTurn = value;
        this.isBullTurn = value;
    }
    setBullTurn(value) {this.isBullTurn = value;}
    setAlliesTurn(value) {this.isAlliesTurn = value;}



    turn() {
        if(this.isBullTurn) { // Turno del jugador principal
            this.bullTurn();
            this.setAlliesTurn(true)
            // Una vez ha actuado el player
            // this.time.delayedCall(2000, () => this.setAlliesTurn(true));  // delay in ms
        }
        else if(this.isAlliesTurn){ // Turno de los aliados
            this.alliesTurn();

            this.endTurn();
        }
        return this.isTurn;
    }

    bullTurn() {
        // Recoger el input del usuario
        // Procesar el input
        console.log("turno del torito Toni");

        this.setBullTurn(false);  // Termina el turno del jugador
    }

    alliesTurn() {
        console.log("turno de los aliados");
        this.setAlliesTurn(false); // termina el turno de los aliados
    }

    // Termina el turno global
    endTurn() {
        this.setTurn(false);
    }
}