
export default class Pathfinding {
    //{x, y}, {x, y}, ARRAY DE BOOLS
    constructor(objectivePos , myPos ,obstaculos) {
        //array de bools
        this.obstacleMatrix = obstaculos;

        //array de bools
        this.nodeMatrix = obstaculos;

        for (let i = 0; i < this.nodeMatrix.length; i++) {
            for (let j = 0; j < this.nodeMatrix[0].length; j++) {
                this.nodeMatrix[i][j] = false;
            }
        }

        let node;
        node.pos = myPos;
        node.prevNode = node;
        this.nodeMatrix[node.pos.x][node.pos.y] = true;

        //LISTAS DE NODOS (pos: {x, y}, prevNode: nodo)

        this.parentList = [];
        this.parentList.push(node);
        this.childList = [];

        //lista que se va a leer
        this.nodePathList = [];

        this.objectivePos = objectivePos;
    }

    calculateNextPath() {
        return this.searchForObjective();
    }

    searchForObjective() {
        //añadir nodos a la lista de los hijos
        for (let i = 0; i < this.parentList.length; i++) {
            let posX = this.parentList[i].pos.x + 1;
            let posY = this.parentList[i].pos.y;

            //si la target no se sale del mapa
            if (posX>=0 && posX < this.obstacleMatrix.length && posY>=0 && posY< this.obstacleMatrix[0].length ) {
                //si no hay ningun obstaculo en la posicion que se quiere ir
                if (!this.obstacleMatrix[posX][posY] && !this.nodeMatrix[posX][posY]) {
                    let node;
                    node.pos = { posX, posY };

                    node.prevNode = this.parentList[i];
                    this.nodeMatrix[node.pos.x][node.pos.y] = true;
                }
            }

            posX = this.parentList[i].pos.x - 1;
            posY = this.parentList[i].pos.y;

            //si la target no se sale del mapa
            if (posX >= 0 && posX < this.obstacleMatrix.length && posY >= 0 && posY < this.obstacleMatrix[0].length) {
                //si no hay ningun obstaculo en la posicion que se quiere ir
                if (!this.obstacleMatrix[posX][posY] && !this.nodeMatrix[posX][posY]) {
                    let node;
                    node.pos = { posX, posY }
                        ;
                    node.prevNode = this.parentList[i];
                    this.nodeMatrix[node.pos.x][node.pos.y] = true;
                }
            }

            posX = this.parentList[i].pos.x;
            posY = this.parentList[i].pos.y + 1;

            //si la target no se sale del mapa
            if (posX >= 0 && posX < this.obstacleMatrix.length && posY >= 0 && posY < this.obstacleMatrix[0].length) {
                //si no hay ningun obstaculo en la posicion que se quiere ir
                if (!this.obstacleMatrix[posX][posY] && !this.nodeMatrix[posX][posY]) {
                    let node;
                    node.pos = { posX, posY }
                        ;
                    node.prevNode = this.parentList[i];
                    this.nodeMatrix[node.pos.x][node.pos.y] = true;
                }
            }

            posX = this.parentList[i].pos.x;
            posY = this.parentList[i].pos.y - 1;

            //si la target no se sale del mapa
            if (posX >= 0 && posX < this.obstacleMatrix.length && posY >= 0 && posY < this.obstacleMatrix[0].length) {
                //si no hay ningun obstaculo en la posicion que se quiere ir
                if (!this.obstacleMatrix[posX][posY] && !this.nodeMatrix[posX][posY]) {
                    let node;
                    node.pos = { posX, posY }
                        ;
                    node.prevNode = this.parentList[i];
                    this.nodeMatrix[node.pos.x][node.pos.y] = true;
                }
            }
            
        }

        //buscar la posicion que se quiere en la lista de los hijos
        let posicionEncontrada = false;
        let i = 0;
        while (!posicionEncontrada && i < this.childList.length) {
            posicionEncontrada = this.objectivePos.x == this.childList[i].pos.x && this.objectivePos.y == this.childList[i].pos.y;
            i++;
        }

        if (posicionEncontrada) {
            //el nodo es i-1
            let nodeIt = this.childList[i - 1];
            while (nodeIt != nodeIt.prevNode) {
                this.nodePathList.unshift(nodeIt);
                nodeIt = nodeIt.prevNode;
            }

            //creo que es el 1? porque se pasa de largo la iteracion
            return this.nodePathList[1].pos;
        }
            //si no se encuentra, pasar la lista de hijos a padres, y borrar hijos. Llamar a searchForObjective
        else {
            this.parentList = this.childList;
            this.childList = [];
            return this.searchForObjective();
        }

        

    }
}