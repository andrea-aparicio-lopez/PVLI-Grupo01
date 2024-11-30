
const gameConst = {
    gameWindowWidth: 1000,
    gameWindowHeight: 480,

};

const TILE_SIZE = 16;
const TILE_SCALE = 3;
const TILE_SCALED_SIZE = TILE_SIZE * TILE_SCALE;

const tileMapConst = {
    size: TILE_SIZE, // in px
    scale: TILE_SCALE,
    scaledSize: TILE_SCALED_SIZE,
    width: 15, // in tiles
};
  

const layerWidth_px = tileMapConst.width * tileMapConst.scaledSize;
// x position absolute of central panel
const centralPanel_x = (gameConst.gameWindowWidth - layerWidth_px) / 2; 

export const GI = {
    gameWindowWidth: gameConst.gameWindowWidth,
    gameWindowHeight: gameConst.gameWindowHeight,

    layerWidth_px,
    layerHeiht_px: gameConst.gameWindowHeight,

    tileMapConst: tileMapConst,

    centralPanel: {
        x: centralPanel_x,
        y: 0,
        width: layerWidth_px,
        height: gameConst.gameWindowHeight,
    },

    tilemapKeys: {
        groundLayer: "ground",
        waterLayer: "water",
        obstacleLayer: "obstacles",
    },
};
  
export function tileToScreenX(coord) {
    return GI.centralPanel.x + coord * GI.tileMapConst.scaledSize;
}

export function tileToScreenY(coord) {
    return GI.centralPanel.y + coord * GI.tileMapConst.scaledSize;
}