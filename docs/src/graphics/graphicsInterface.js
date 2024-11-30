
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


const card_width = centralPanel_x/2;
const cards_x = centralPanel_x/6;
const cards_y = gameConst.gameWindowHeight/5;

const offset_y = 30;
const card_1_y = cards_y;
const card_2_y = card_1_y + offset_y;
const card_3_y = card_2_y + offset_y;
const card_4_y = card_3_y + offset_y;
const card_5_y = card_4_y + offset_y;
const card_6_y = card_5_y + offset_y;

const offset_x = (((2*centralPanel_x)/3) - card_width) /6;
const card_1_x = centralPanel_x/6;
const card_2_x = card_1_x + offset_x;
const card_3_x = card_2_x + offset_x;
const card_4_x = card_3_x + offset_x;
const card_5_x = card_4_x + offset_x;
const card_6_x = card_5_x + offset_x;

const cardSpecs = {
    width: card_width,
    height: 100,
    color: 0xFCA311,
    fontSize: '15px',
    fontFamily: 'bold   Arial',
}


const text_box_margin = 5;
const text_box_x = text_box_margin;
const text_box_y = card_6_y + cardSpecs.height + text_box_margin;
const text_box_width = centralPanel_x - 2*text_box_margin;
const text_box_height = gameConst.gameWindowHeight - (text_box_y + text_box_margin);

const text_margin = 10;
const text_x = text_box_margin + text_margin;
const text_y = text_box_y + text_margin;
const text_width = centralPanel_x - 2*text_margin;
const text_height = text_y + text_box_margin;

console.log(text_box_width)

const tableConst = {
    backColor: '#fffaaa',
    width: centralPanel_x,
    height: gameConst.gameWindowHeight,
    hand: {
        x: cards_x,
        card_1_x: card_1_x,
        card_2_x: card_2_x,
        card_3_x: card_3_x,
        card_4_x: card_4_x,
        card_5_x: card_5_x,
        card_6_x: card_6_x,
        y: cards_y,
        card_1_y: card_1_y,
        card_2_y: card_2_y,
        card_3_y: card_3_y,
        card_4_y: card_4_y,
        card_5_y: card_5_y,
        card_6_y: card_6_y,
    },
    text: {
        x: text_x,
        y: text_y,
        width: text_width,
        height: text_height
    },
    textBox: {
        x: text_box_x,
        y: text_box_y,
        width: text_box_width,
        height: text_box_height
    }
}

const info_x = centralPanel_x + layerWidth_px;
const info_width = gameConst.gameWindowWidth - info_x;


const infoConst = {
    x: info_x,
    y: 0,
    width: info_width,
    height: gameConst.gameWindowHeight
}


// EXPORTS

export const GI = {
    gameWindowWidth: gameConst.gameWindowWidth,
    gameWindowHeight: gameConst.gameWindowHeight,

    table: tableConst,
    cardSpecs: cardSpecs,
    
    infoPanel: infoConst,

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