import Card from "./card.js" 

export default class Deck 
{
    constructor(cardsData) 
    {
        this.deckTemplate = cardsData.map(cardData => new Card(cardData));
        this.currentDeck = [];
        this.deckBurns = 0;

        this.regenerate();
    }

    // Removes 1st card from Deck and returns it
    drawCard()
    {
        if (this.currentDeck.length == 0){
            this.regenerate();
            this.deckBurns++;
        }

        return this.currentDeck.shift();
    }

    // Regenerates deck from template and shuffles it
    regenerate()
    {
        this.deckTemplate.forEach((element) => this.currentDeck.push(element));
        
        this.shuffle();
    }

    shuffle() 
    {
        let currentIndex = this.currentDeck.length - 1;
      
        while (currentIndex != 0) {

          let randomIndex = Phaser.Math.Between(0, currentIndex);
          currentIndex--;
      
          [this.currentDeck[currentIndex], this.currentDeck[randomIndex]] = [this.currentDeck[randomIndex], this.currentDeck[currentIndex]];
        }
    }
    
}