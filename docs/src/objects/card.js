import Ally from '../entities/ally.js';
import Enemy from '../entities/enemy.js';
import { GI } from '../graphics/graphicsInterface.js'


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
        
        let damageRects = [];

        // DAMAGE
        if (this.damage != 0){
            // Spawn rects at adjacent positions on all directions
            if (this.areaOfEffect){
                for (let i = - this.range; i <= this.range; i++){
                    for (let j = - this.range; j <= this.range; j++){
                        if (i != 0 || j != 0) {
                            damageRects.push({x: currPosition.x + i, y: currPosition.y + j})
                        }
                    }
                }
            }
            // Spawned rects at adjacent position on facing direction and within range
            else {
                for (let k = 1; k <= this.range; k++){
                    damageRects.push({x: currPosition.x + k * direction.x, y: currPosition.y + k * direction.y});
                }                
            }

            this.changeRects(damageRects, visualize, 0xff0000);
            if(!visualize) {
                this.scene.cardPlayed(entity, damageRects); // No se hasta que punto esto es una salvajada
            }

        }

        // Movement
        if(this.move != 0){
            //console.log("Current position:", currPosition);
            let newPos = [];
            newPos.push({x: currPosition.x + this.move * direction.x, y: currPosition.y + this.move * direction.y});
            // console.log("dirx", currPosition.x + this.move * direction.x);
            // console.log("diry", direction.y);

            // If not in viasualization mode, update position
            if (!visualize) entity.setWorldPos(newPos[0]);
            // console.log("New position after move:", newPos[0]);
            this.changeRects(newPos, visualize, 0x04ffA0);
        }
	}

    visualizePlay(entity) {
        this.playedBy(entity, true);
	}

    endVisualizePlay() {
        this.resetRects();
    }

    changeRects(rects, visualize, color) {

        let rectsArray = this.scene.damageRectsGroup.children.entries;
        let rectSize = this.scene.damageRectsGroup.children.entries[0].width;
        let maxX = rectsArray[rectsArray.length -1].x / rectSize;
        let maxY = rectsArray[rectsArray.length -1].y / rectSize;

        rects.forEach((rect) => {
            let j = rect.x;
            let i = rect.y;

            if (i >= 0 && j >=0 && i <= maxY && j <= maxX) {
                let rectObj = this.scene.damageRectsGroup.children.entries[
                    i * GI.tileMapConst.width + 
                    j];
                
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
    
    getText(){
        return this.text;
    }

    getID() {
        return this.id;
    }

    resetRects() {
        let rectsArray = this.scene.damageRectsGroup.children.entries;

        rectsArray.forEach((rect) => {
                rect.deactivate();
        });
    }
}
