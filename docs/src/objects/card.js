
export default class Card 
{
    	/**
	 * Constructor de Carta
	 * @param {Scene} scene
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
    constructor(scene, { id, name, text, move, damage, areaOfEffect, range, stun }) 
    {
        this.scene = scene;

        this.id = id;
        this.name = name;
        this.text = text;
		this.move = move;
		this.damage = damage;
		this.areaOfEffect = areaOfEffect;
		this.range = range;
		this.stun = stun;        
    }

    // Visualize set to false by default
	playedBy(entity, visualize = false) {
        //console.log("Card effect played");
                
        let direction = entity.getDirection();
        let currPosition = entity.getWorldPos();
        
        let rectsPositions = [];

        // DAMAGE
        if (this.damage != 0){
            // Spawn rects at adjacent positions on all directions
            if (this.areaOfEffect){
                for (let i = - this.range; i <= this.range; i++){
                    for (let j = - this.range; j <= this.range; j++){
                        if (i != 0 || j != 0) {
                            rectsPositions.push({x: currPosition.x + i, y: currPosition.y + j})
                        }
                    }
                }
                // console.log("Spawned damage RectsPositions", rectsPositions);
            }
            // Spawned rects at adjacent position on facing direction and within range
            else {
                for (let k = 1; k <= this.range; k++){
                    rectsPositions.push({x: currPosition.x + k * direction.x, y: currPosition.y + k * direction.y});
                }                
                //console.log("Spawned damage rect:", rectsPositions);
            }

            this.changeRects(rectsPositions, visualize, 0xff0000);

        }

        // Movement
        if(this.move != 0){
            //console.log("Current position:", currPosition);
            let newPos = [];
            newPos.push({x: currPosition.x + this.move * direction.x, y: currPosition.y + this.move * direction.y});

            // If not in viasualization mode, update position
            if (!visualize) entity.setWorldPos(newPos);
            //console.log("New position after move:", newPos);
            this.changeRects(newPos, visualize, 0x04ffA0);
        }
	}

    visualizePlay(entity) {
        //console.log("Visualizing play");

        this.playedBy(entity, true);
	}

    changeRects(rects, visualize, color) {
        
        rects.forEach((rect) => {
            let j = rect.x;
            let i = rect.y;

            if (i >= 0 && j >=0) {
                let rectObj = this.scene.damageRectsGroup.children.entries[i * 10 + j];
                rectObj.deactivate();
                
                if(visualize){
                    rectObj.makeVisible();
                    rectObj.fillColor = color;
                }
                else {
                    rectObj.activate();
                    rectObj.fillColor = color;
                }
            }
        });
        
    }

    /** @summary Recieves the entity that was hit. Applies damage and stun if exists. Use as callback function for collision between entity and damage rects*/
    hit(entity){
        entity.hurt(this.damage);
        entity.stun(this.stun);
    }
}
