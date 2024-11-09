// import Deck from '../cards/Deck.js'

export default class Player {
    static MAX_CARD_NUM = 6;
    static MAX_PREPARED_CARDS = 2;

    constructor(deck, player, allyArray) {
        this.deck = new Deck(deck);

        for(let i=0; i < MAX_CARD_NUM; i++) {
            this.hand[i] = this.deck.drawCard();
        }
        // this.selectedCard = null;

        this.player = player;

        allyArray.forEach(ally => {
            this.allies.push(ally);
        });

        this.isTurn = false;
        this.isBullTurn = false;
        this.isAlliesTurn = false;
    }

    drawCard() {
        if(this.hand.length < MAX_CARD_NUM){
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

    setTurn(value) {this.isTurn = value;}
    setBullTurn(value) {this.isBullTurn = value;}
    setAlliesTurn(value) {this.isAlliesTurn = value;}



    turn() {
        if(this.isBullTurn) { // Turno del jugador principal
            this.bullTurn();

            // Una vez ha actuado el player
            this.time.delayedCall(2000, () => this.setAlliesTurn(true));  // delay in ms
        }
        else { // Turno de los aliados
            this.alliesTurn();

            this.endTurn();
        }
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