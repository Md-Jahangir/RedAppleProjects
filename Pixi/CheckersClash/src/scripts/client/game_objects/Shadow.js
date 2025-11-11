import * as PIXI from 'pixi.js';
import { Assets, Sprite, Texture, Container, Text, TextStyle, Graphics } from 'pixi.js';
import { Constant } from '../Constant.js';
import { Spine } from '@esotericsoftware/spine-pixi-v8';
import gsap from 'gsap';

class Shadow {
    constructor(player, gamescreen, shadowData, i) {
        this.player = player;
        this.gamescreen = gamescreen;
        this.shadowData = shadowData;
        this.i = i;

        this.createShadow();
    }

    createShadow() {
        const boardTile = this.gamescreen.gameTileArr[this.i];
        const shadowWidth = this.shadowData.shadowwidth;
        const shadowHeight = this.shadowData.shadowheight;
        const shadowShiftX = this.shadowData.shadowShiftX;
        const shadowShiftY = this.shadowData.shadowShiftY;


        this.shadow = Sprite.from(Constant.gameAtlas.textures['Bottom_Shadow']);
        this.shadow.anchor.set(0.5);
        this.shadow.width = shadowWidth;
        this.shadow.height = shadowHeight;
        this.shadow.shiftX = shadowShiftX;
        this.shadow.shiftY = shadowShiftY;

        this.shadow.position.set(
            boardTile.x + shadowShiftX,
            boardTile.y + shadowShiftY
        );

        this.player.playerShadowContainer.addChild(this.shadow);
    }
}

export default Shadow;