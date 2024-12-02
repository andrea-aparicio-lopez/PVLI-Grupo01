import Level from "../Level.js";
import { GI } from "../../graphics/graphicsInterface.js";

export default class SecondLevel extends Level {
    constructor() {
        super(2);
    }
    
    preload() {
        this.load.tilemapTiledJSON('boat_2', './assets/maps/level2/boat_2.json');
    }

    create() {
        this.map = this.make.tilemap({key: 'boat_2'});
        const tileset = this.map.addTilesetImage('boat_tileset', 'boat_tiles');
        
        this.map.createLayer("water", tileset, GI.centralPanel.x).setScale(GI.tileMapConst.scale);
        this.map.createLayer("ground", tileset, GI.centralPanel.x).setScale(GI.tileMapConst.scale);
        const obstacleLayer = this.map.createLayer("obstacles", tileset, GI.centralPanel.x).setScale(GI.tileMapConst.scale);

        super.create();

        this.map.destroyLayer(obstacleLayer);
    }
}