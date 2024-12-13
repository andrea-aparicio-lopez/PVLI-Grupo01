import Level from "../Level.js";
import { GI } from "../../graphics/graphicsInterface.js";
import Tutorial from "../../UI/tutorial.js";

export default class FirstLevel extends Level {
    constructor() {
        super(1);
        this.onTutorial = true;
    }

    preload() {
        this.load.tilemapTiledJSON('boat_1', './assets/maps/level1/boat_1.json');
    }

    create() {
        if(this.playedTutorial)  this.onTutorial = false;
        this.map = this.make.tilemap({key: 'boat_1'});
        const tileset = this.map.addTilesetImage('boat_tileset', 'boat_tiles');
        
        this.map.createLayer("water", tileset, GI.centralPanel.x).setScale(GI.tileMapConst.scale);
        this.map.createLayer("ground", tileset, GI.centralPanel.x).setScale(GI.tileMapConst.scale);
        const obstacleLayer = this.map.createLayer("obstacles", tileset, GI.centralPanel.x).setScale(GI.tileMapConst.scale);

        super.create();

        this.map.destroyLayer(obstacleLayer);
        this.tutorial = null;
        if (!this.playedTutorial) {
            this.tutorial = new Tutorial(this);
            this.playedTutorial = true;
        }
        else{
            this.startPlayerTurn();
        }

    }

    


}