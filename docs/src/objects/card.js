

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
    constructor({ id, name, text, move, damage, areaOfEffect, range, stun }, scene) 
    {
        this.id = id;
        this.name = name;
        this.text = text;
		this.move = move;
		this.damage = damage;
		this.areaOfEffect = areaOfEffect;
		this.range = range;
		this.stun = stun;

        this.scene = scene;
		// this.entity = entity;

        //if (this.damage != 0 && this.move != 0) this.range = this.move;
    }

	play(entity)
	{
        let direction = entity.getDirection();
        let currPosition = entity.getWorldPos();

        // Movement
        if(this.move != 0){
            // console.log("Current position:", currPosition);
            let newPos = {x: currPosition.x + this.move * direction.x, y: currPosition.y + this.move * direction.y};
            entity.setWorldPos(newPos);
            // console.log("New position after move:", newPosX);
        }

        // Damage
        if (this.damage != 0){
            // Spawn rects at adjacent positions on all directions
            if (this.areaOfEffect){
                let rectsPositions = [];
                for (let i = - this.range; i <= this.range; i++){
                    for (let j = - this.range; j <= this.range; j++){
                        if (i != 0 || j != 0)
                        {
                            rectsPositions.push({x: currPosition.x + i, y: currPosition.y + j})
                        }
                    }
                }
                //console.log("Spawned damage RectsPositions", rectsPositions);
            }
            // Spawned rects at adjacent position on facing direction and within range
            else {
                let rectsPositions = [];
                for (let k = 1; k <= this.range; k++){
                    rectsPositions.push({x: currPosition.x + k * direction.x, y: currPosition.y + k * direction.y});
                    }
                console.log("Spawned damage rect:", rectsPositions);
            }

            /** @TODO Scene create rect group with ovelay and without gravity */ 
            // create rect (position, stun)
        }

	}

    /** @summary Recieves the entity that was hit. Applies damage and stun if exists. Use as callback function for collision between entity and damage rects*/
    hit(entity){
        entity.hurt(this.damage);
        entity.stun(this.stun);
    }
}
