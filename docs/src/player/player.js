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
        this.isBullTurn = false;
        this.isAlliesTurn = false;
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