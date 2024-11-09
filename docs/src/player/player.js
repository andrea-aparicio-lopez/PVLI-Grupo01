export default class Player {
    static MAX_CARD_NUM = 6;
    static MAX_PREPARED_CARDS = 2;

    #accumulatedCost;

    constructor(deck) {
        this.deck = deck;

        for(let i=0; i < MAX_CARD_NUM; i++) {
            this.hand[i] = this.deck.drawCard();
        }
        this.preparedCards = [];
        this.#accumulatedCost = 0;
        this.selectedCard = null;
    }

    drawCard() {
        if(this.hand.length < MAX_CARD_NUM){
            this.hand.push(this.deck.drawCard());
        }
    }

    selectCard(card) {
        this.selectedCard = card;
    }

    prepareCard() {
        if(this.preparedCards.length === MAX_PREPARED_CARDS)
            this.preparedCards.shift();
        this.preparedCards.push(this.selectedCard);
    }

    playCard() {
        if(this.selectedCard != null) {
            this.selectedCard.playCard();
        }
        this.selectedCard = null;
    }

    // Get and add accumulated cost
    getAccumCost() {return this.#accumulatedCost;}
    addAccumCost(n) {this.#accumulatedCost += n;}


    endTurn() {
        
    }
}