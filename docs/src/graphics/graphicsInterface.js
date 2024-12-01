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
    height: 10,
};

const layerWidth_px = tileMapConst.width * tileMapConst.scaledSize;
// x position absolute of central panel
const centralPanel_x = (gameConst.gameWindowWidth - layerWidth_px) / 2;

const card_width = centralPanel_x / 2;
const cards_x = centralPanel_x / 6;
const cards_y = gameConst.gameWindowHeight / 5;

const offset_y = 30;
const card_1_y = cards_y;
const card_2_y = card_1_y + offset_y;
const card_3_y = card_2_y + offset_y;
const card_4_y = card_3_y + offset_y;
const card_5_y = card_4_y + offset_y;
const card_6_y = card_5_y + offset_y;

const offset_x = (((2 * centralPanel_x) / 3) - card_width) / 6;
const card_1_x = centralPanel_x / 6;
const card_2_x = card_1_x + offset_x;
const card_3_x = card_2_x + offset_x;
const card_4_x = card_3_x + offset_x;
const card_5_x = card_4_x + offset_x;
const card_6_x = card_5_x + offset_x;

const cardSpecs = {
    width: card_width,
    height: 100,
    color: 0xfca311,
    fontSize: '15px',
    fontFamily: 'bold Arial',
};

const text_box_margin = 5;
const text_box_x = text_box_margin;
const text_box_y = card_6_y + cardSpecs.height + text_box_margin;
const text_box_width = centralPanel_x - 2 * text_box_margin;
const text_box_height = gameConst.gameWindowHeight - (text_box_y + text_box_margin);

const text_margin = 10;
const text_x = text_box_margin + text_margin;
const text_y = text_box_y + text_margin;
const text_width = centralPanel_x - 2 * text_margin;
const text_height = text_y + text_box_margin;

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
        height: text_height,
    },
    textBox: {
        x: text_box_x,
        y: text_box_y,
        width: text_box_width,
        height: text_box_height,
    },
};

// INFO BOX
const info_x = centralPanel_x + layerWidth_px;
const info_y = 0;
const info_width = gameConst.gameWindowWidth - info_x;
const info_height = gameConst.gameWindowHeight;
const info_box_margin = 5;
const info_box_padding = 5;

const info_box_info_height = 50;
const info_box_info_y = info_box_margin;

// INFO BOX PLAYER
const info_box_player_x = info_x + info_box_margin;
const info_box_player_y = info_box_margin + info_box_info_y + info_box_info_height;
const info_box_player_width = info_width - 2 * info_box_margin;
const info_box_player_height = 2.5 * tileMapConst.scaledSize - 2 * info_box_margin;
const info_box_player_image_x = info_box_player_x + info_box_padding;
const info_box_player_image_y = info_box_player_y + info_box_padding;
const info_box_player_image_w = 50;
const info_box_player_image_h = 50;
// LIFE BOX PLAYER
const info_box_player_life_box_x = info_box_player_image_x;
const info_box_player_life_box_y = info_box_player_y + 2 * info_box_padding + info_box_player_image_h;
const info_box_player_life_box_w = info_box_player_width - 2 * info_box_padding;
const info_box_player_life_box_h =
    info_box_player_y + info_box_player_height - info_box_padding - info_box_player_life_box_y;
// LIFE BAR PLAYER
const info_box_life_bar_padding = 5;
const info_box_player_life_bar_x = info_box_player_life_box_x + info_box_life_bar_padding;
const info_box_player_life_bar_y = info_box_player_life_box_y + info_box_life_bar_padding;
const info_box_player_life_bar_w = info_box_player_life_box_w - 2 * info_box_life_bar_padding;
const info_box_player_life_bar_h = (info_box_player_life_box_h - 2 * info_box_life_bar_padding) / 2;

// INFO BOX BULLS
const info_box_ally_widths = info_box_player_width - info_box_margin;
const info_box_ally_heights = (info_height - (info_box_player_y + info_box_player_height) - 5 * info_box_margin) / 4;
const info_box_ally_image_width = 20;
const info_box_ally_image_height = 30;

// INFO BOX BULL 1
const info_box_bull_1_x = info_box_player_x;
const info_box_bull_1_y = info_box_player_y + info_box_player_height + info_box_margin;
const info_box_bull_1_image_x = info_box_bull_1_x + info_box_padding;
const info_box_bull_1_image_y = info_box_bull_1_y + info_box_padding;
// BULL 1 LIFE BOX
const info_box_bull_1_life_box_x = info_box_bull_1_image_x;
const info_box_bull_1_life_box_y = info_box_bull_1_y + 2 * info_box_padding + info_box_ally_image_height;
const info_box_bull_1_life_box_w = info_box_ally_widths - 2 * info_box_padding;
const info_box_bull_1_life_box_h = info_box_bull_1_y + info_box_ally_heights - info_box_padding - info_box_bull_1_life_box_y;
// LIFE BAR BULL 1
const info_box_bull_1_life_bar_x = info_box_bull_1_life_box_x + info_box_life_bar_padding;
const info_box_bull_1_life_bar_y = info_box_bull_1_life_box_y + info_box_life_bar_padding;
const info_box_bull_1_life_bar_w = info_box_bull_1_life_box_w - 2 * info_box_life_bar_padding;
const info_box_bull_1_life_bar_h = (info_box_bull_1_life_box_h - 2 * info_box_life_bar_padding) / 3;

// INFO BOX BULL 2
const info_box_bull_2_x = info_box_player_x;
const info_box_bull_2_y = info_box_bull_1_y + info_box_ally_heights + info_box_margin;
const info_box_bull_2_image_x = info_box_bull_2_x + info_box_padding;
const info_box_bull_2_image_y = info_box_bull_2_y + info_box_padding;
// BULL 2 LIFE BOX
const info_box_bull_2_life_box_x = info_box_bull_2_image_x;
const info_box_bull_2_life_box_y = info_box_bull_2_y + 2 * info_box_padding + info_box_ally_image_height;
const info_box_bull_2_life_box_w = info_box_ally_widths - 2 * info_box_padding;
const info_box_bull_2_life_box_h =
    info_box_bull_2_y + info_box_ally_heights - info_box_padding - info_box_bull_2_life_box_y;
// LIFE BAR BULL 2
const info_box_bull_2_life_bar_x = info_box_bull_2_life_box_x + info_box_life_bar_padding;
const info_box_bull_2_life_bar_y = info_box_bull_2_life_box_y + info_box_life_bar_padding;
const info_box_bull_2_life_bar_w = info_box_bull_2_life_box_w - 2 * info_box_life_bar_padding;
const info_box_bull_2_life_bar_h = (info_box_bull_2_life_box_h - 2 * info_box_life_bar_padding) / 3;

// INFO BOX BULL 3
const info_box_bull_3_x = info_box_player_x;
const info_box_bull_3_y = info_box_bull_2_y + info_box_ally_heights + info_box_margin;
// HERE for bull 3:
const info_box_bull_3_image_x = info_box_bull_3_x + info_box_padding;
const info_box_bull_3_image_y = info_box_bull_3_y + info_box_padding;
// BULL 3 LIFE BOX
const info_box_bull_3_life_box_x = info_box_bull_3_image_x;
const info_box_bull_3_life_box_y = info_box_bull_3_y + 2 * info_box_padding + info_box_ally_image_height;
const info_box_bull_3_life_box_w = info_box_ally_widths - 2 * info_box_padding;
const info_box_bull_3_life_box_h =
    info_box_bull_3_y + info_box_ally_heights - info_box_padding - info_box_bull_3_life_box_y;
// LIFE BAR BULL 3
const info_box_bull_3_life_bar_x = info_box_bull_3_life_box_x + info_box_life_bar_padding;
const info_box_bull_3_life_bar_y = info_box_bull_3_life_box_y + info_box_life_bar_padding;
const info_box_bull_3_life_bar_w = info_box_bull_3_life_box_w - 2 * info_box_life_bar_padding;
const info_box_bull_3_life_bar_h = (info_box_bull_3_life_box_h - 2 * info_box_life_bar_padding) / 3;

// INFO BOX BULL 4
const info_box_bull_4_x = info_box_player_x;
const info_box_bull_4_y = info_box_bull_3_y + info_box_ally_heights + info_box_margin;
// HERE for bull 4:
const info_box_bull_4_image_x = info_box_bull_4_x + info_box_padding;
const info_box_bull_4_image_y = info_box_bull_4_y + info_box_padding;
// BULL 4 LIFE BOX
const info_box_bull_4_life_box_x = info_box_bull_4_image_x;
const info_box_bull_4_life_box_y = info_box_bull_4_y + 2 * info_box_padding + info_box_ally_image_height;
const info_box_bull_4_life_box_w = info_box_ally_widths - 2 * info_box_padding;
const info_box_bull_4_life_box_h =
    info_box_bull_4_y + info_box_ally_heights - info_box_padding - info_box_bull_4_life_box_y;
// LIFE BAR BULL 4
const info_box_bull_4_life_bar_x = info_box_bull_4_life_box_x + info_box_life_bar_padding;
const info_box_bull_4_life_bar_y = info_box_bull_4_life_box_y + info_box_life_bar_padding;
const info_box_bull_4_life_bar_w = info_box_bull_4_life_box_w - 2 * info_box_life_bar_padding;
const info_box_bull_4_life_bar_h = (info_box_bull_4_life_box_h - 2 * info_box_life_bar_padding) / 3;

// INFO CONSTANTS
const infoConst = {
    x: info_x,
    y: info_y,
    width: info_width,
    height: info_height,
    margin: info_box_margin,
    padding: info_box_padding,
    textSize: {
        player: '15px',
        ally: '10px',
        enemy: '8px',
    },
    player: {
        x: info_box_player_x,
        y: info_box_player_y,
        width: info_box_player_width,
        height: info_box_player_height,
        image: {
            x: info_box_player_image_x,
            y: info_box_player_image_y,
            width: info_box_player_image_w,
            height: info_box_player_image_h,
        },
        lifeBox: {
            x: info_box_player_life_box_x,
            y: info_box_player_life_box_y,
            width: info_box_player_life_box_w,
            height: info_box_player_life_box_h,
        },
        lifeBar: {
            x: info_box_player_life_bar_x,
            y: info_box_player_life_bar_y,
            width: info_box_player_life_bar_w,
            height: info_box_player_life_bar_h,
        },
    },
    bulls: [
        {
            x: info_box_bull_1_x,
            y: info_box_bull_1_y,
            w: info_box_ally_widths,
            h: info_box_ally_heights,
            image: {
                x: info_box_bull_1_image_x,
                y: info_box_bull_1_image_y,
                w: info_box_ally_image_width,
                h: info_box_ally_image_height
            },
            lifeBox: {
                x: info_box_bull_1_life_box_x,
                y: info_box_bull_1_life_box_y,
                width: info_box_bull_1_life_box_w,
                height: info_box_bull_1_life_box_h,
            },
            lifeBar: {
                x: info_box_bull_1_life_bar_x,
                y: info_box_bull_1_life_bar_y,
                width: info_box_bull_1_life_bar_w,
                height: info_box_bull_1_life_bar_h,
            },
        },
        {
            x: info_box_bull_2_x,
            y: info_box_bull_2_y,
            w: info_box_ally_widths,
            h: info_box_ally_heights,
            image: {
                x: info_box_bull_2_image_x,
                y: info_box_bull_2_image_y,
                w: info_box_ally_image_width,
                h: info_box_ally_image_height
            },
            lifeBox: {
                x: info_box_bull_2_life_box_x,
                y: info_box_bull_2_life_box_y,
                width: info_box_bull_2_life_box_w,
                height: info_box_bull_2_life_box_h,
            },
            lifeBar: {
                x: info_box_bull_2_life_bar_x,
                y: info_box_bull_2_life_bar_y,
                width: info_box_bull_2_life_bar_w,
                height: info_box_bull_2_life_bar_h,
            },
        },
        {
            x: info_box_bull_3_x,
            y: info_box_bull_3_y,
            w: info_box_ally_widths,
            h: info_box_ally_heights,
            image: {
                x: info_box_bull_3_image_x,
                y: info_box_bull_3_image_y,
                w: info_box_ally_image_width,
                h: info_box_ally_image_height
            },
            lifeBox: {
                x: info_box_bull_3_life_box_x,
                y: info_box_bull_3_life_box_y,
                width: info_box_bull_3_life_box_w,
                height: info_box_bull_3_life_box_h,
            },
            lifeBar: {
                x: info_box_bull_3_life_bar_x,
                y: info_box_bull_3_life_bar_y,
                width: info_box_bull_3_life_bar_w,
                height: info_box_bull_3_life_bar_h,
            },
        },
        {
            x: info_box_bull_4_x,
            y: info_box_bull_4_y,
            w: info_box_ally_widths,
            h: info_box_ally_heights,
            image: {
                x: info_box_bull_4_image_x,
                y: info_box_bull_4_image_y,
                w: info_box_ally_image_width,
                h: info_box_ally_image_height
            },
            lifeBox: {
                x: info_box_bull_4_life_box_x,
                y: info_box_bull_4_life_box_y,
                width: info_box_bull_4_life_box_w,
                height: info_box_bull_4_life_box_h,
            },
            lifeBar: {
                x: info_box_bull_4_life_bar_x,
                y: info_box_bull_4_life_bar_y,
                width: info_box_bull_4_life_bar_w,
                height: info_box_bull_4_life_bar_h,
            },
        },
    ],
};



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