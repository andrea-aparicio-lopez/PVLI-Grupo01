import Card from "./card.js" 

export default class Deck 
{
    constructor(scene, cardsData, deckData) 
    {
        this.currentDeck = [];

        cardsData.forEach(cardData => {
            const count = deckData[cardData.id] || 0;
            for (let i = 0; i < count; i++) {
                this.currentDeck.push(new Card(scene, cardData));
            }
        });

        this.deckBurns = 0;

        this.shuffle();
    }

    // Removes 1st card from Deck and returns it
    draw() { return this.currentDeck.shift(); }

    empty() { return this.currentDeck.length == 0; }

    // Regenerates deck and shuffles it
    regenerate(graveyard) {
        let size = graveyard.length;
        for(let i = size - 1; i >= 0 ; i--){
            this.currentDeck.push(graveyard.splice(0, 1)[0]); 
        }
        this.deckBurns++;
        this.shuffle();
    }

    shuffle() {
        let currentIndex = this.currentDeck.length - 1;
      
        while (currentIndex != 0) {

          let randomIndex = Phaser.Math.Between(0, currentIndex);
          currentIndex--;
      
          [this.currentDeck[currentIndex], this.currentDeck[randomIndex]] = [this.currentDeck[randomIndex], this.currentDeck[currentIndex]];
        }
    }
    
}