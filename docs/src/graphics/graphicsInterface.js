
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

const cards_x = centralPanel_x/4;
const cards_y = gameConst.gameWindowHeight/4;
const offset_y = 30;
const card_1_y = cards_y;
const card_2_y = card_1_y + offset_y;
const card_3_y = card_2_y + offset_y;
const card_4_y = card_3_y + offset_y;
const card_5_y = card_4_y + offset_y;
const card_6_y = card_5_y + offset_y;

const tableConst = {
    width: centralPanel_x,
    height: gameConst.gameWindowHeight,
    hand: {
        x: cards_x,
        y: cards_y,
        card_1_y: card_1_y,
        card_2_y: card_2_y,
        card_3_y: card_3_y,
        card_4_y: card_4_y,
        card_5_y: card_5_y,
        card_6_y: card_6_y,
    }
}

const card_width = centralPanel_x/2;
const cardSpecs = {
    width: card_width,
    height: 70
}


export const GI = {
    gameWindowWidth: gameConst.gameWindowWidth,
    gameWindowHeight: gameConst.gameWindowHeight,

    table: tableConst,
    cardSpecs: cardSpecs,

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