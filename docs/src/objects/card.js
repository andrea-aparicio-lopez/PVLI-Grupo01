export default class Card 
{
    	/**
	 * Constructor de Carta
	 * @param {Player} player
	 * @param {number} id
	 * @param {string} name
	 * @param {string} text
	 * @param {number} move
	 * @param {number} damage
	 * @param {boolean} areaOfEffect
	 * @param {number} range
	 * @param {boolean} stun
     * 
	 */
    constructor({ id, name, text, move, damage, areaOfEffect, range, stun }) 
    {
        this.id = id;
        this.name = name;
        this.text = text;
		this.move = move;
		this.damage = damage;
		this.areaOfEffect = areaOfEffect;
		this.range = range;
		this.stun = stun;

		// this.entity = entity;
    }

	play()
	{
        console.log("playedcard");
        // let direction = entity.getDirection();
        // let currPosition = entity.getWorldPos();

        // let newPosX = currPosition + move*direction;
        // console.log(newPosX);

	}
}
