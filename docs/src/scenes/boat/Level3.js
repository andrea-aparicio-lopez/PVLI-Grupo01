import Level from "../Level.js";
import { GI } from "../../graphics/graphicsInterface.js";

export default class ThirdLevel extends Level {
    constructor() {
        super(3);
    }

    preload() {
        this.load.tilemapTiledJSON('boat_3', './assets/maps/level3/boat_3.json');
    }

    create() {
        this.map = this.make.tilemap({key: 'boat_3'});
        const tileset = this.map.addTilesetImage('boat_tileset', 'boat_tiles');
        
        this.map.createLayer("water", tileset, GI.centralPanel.x).setScale(GI.tileMapConst.scale);
        this.map.createLayer("ground", tileset, GI.centralPanel.x).setScale(GI.tileMapConst.scale);
        const obstacleLayer = this.map.createLayer("obstacles", tileset, GI.centralPanel.x).setScale(GI.tileMapConst.scale);

        super.create();

        this.map.destroyLayer(obstacleLayer);
    }
}