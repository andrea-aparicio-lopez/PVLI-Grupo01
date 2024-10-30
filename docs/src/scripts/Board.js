export default class Board {
    //creo que se podria cambiar lo de entities y walkable obstacles por un JSON con loa datos del mapa, cada bicho y su posicion, y los obstaculos.
    constructor(width, height, entities, walkableObstacles){
        this.width = width;
        this.height = height;
        this.entities = entities;
        this.walkableObstacles = walkableObstacles;
    }

    //esto literalmente puede ser el constructor y ya, con lo que decia de la informacion
    loadBoard(info) {

    }
    //del array de entities, se chequea si una entidad se encuentra en la posicion.
    //Si la hay: la devuelve
    //Si no: devuelve null
    getEntityInTile(x, y) {
        for (let i = 0; i < entities.size(); i++) {
            //si la x e y es igual a alguna, return esa entidad
        }

        return null;
    }

    //añade la entidad al tablero
    addEntity(entity) {
        //añade la entidad a this.entities
    }
    //quitas entity del tablero
    deleteEntity(entity) {
        //lo quitas del array
    }

    //retorna el obstaculo si lo encuentra en el array, sino, null
    getWalkableObstacle(x,y) {

    }

    addWalkableObstacle(obstacle) {

    }

    deleteWalkableObstacle(obstacle) {

    }
    
}