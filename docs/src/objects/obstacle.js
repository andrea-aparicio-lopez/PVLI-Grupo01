
export default class Obstacle {
    constructor(isMapObstacle = false, isEntityObstacle = false) {
        this.map = isMapObstacle;
        this.entity = isEntityObstacle;
    }
}