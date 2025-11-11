import * as PIXI from 'pixi.js';
import { Assets, Sprite, Texture, Container, Text, TextStyle, Graphics } from 'pixi.js';
import { Constant } from '../Constant.js';
import { Spine } from '@esotericsoftware/spine-pixi-v8';
import gsap from 'gsap';
import Shadow from './Shadow.js';
import Pawn from './Pawn.js';

class Player {
    constructor(screen, playerdata, i, pawnwidth, pawnheight) {
        this.screen = screen;
        this.playerData = playerdata;
        this.i = i;
        this.playerLives = this.playerData.lives;
        this.pawnwidth = this.playerData.pawnwidth;
        this.pawnheight = this.playerData.pawnheight;
        this.pawnShiftX = this.playerData.pawnShiftX;
        this.pawnShiftY = this.playerData.pawnShiftY;
        this.nameShiftX = this.playerData.nameShiftX;
        this.scoreShiftX = this.playerData.scoreShiftX;
        this.pawnShadowShiftX = this.playerData.pawnshadowShiftX;
        this.posX = this.playerData.player_pos[0];
        this.posY = this.playerData.player_pos[1];
        this.flip = this.playerData.scaleX;
        this.playerHome = this.playerData.home;
        this.minVal = this.playerHome[0];
        this.maxVal = this.playerHome[1];
        this.pawnPosArr = this.playerData.pawn_tiles;
        this._tickerAdded = null;
        this.score = 0;
        this.winScore = this.playerData.pawn_tiles.length;
        this.timerAnim = null;
        this.lifeArr = [];


        if (i === 0) {
            this.playerSkel = 'dog_skel';
            this.playerAtlas = 'dog_atlas';
            this.playerIcon = 'dog_';
            this.name = 'Me';
            this.pfpShiftX = 116;
            this.pfpShiftY = 0;

            // console.log("pfp", Constant.userFallbackFrame);

            this.pfpFrame = Constant.userFallbackFrame.toString();
            this.menSide = 'back';
            this.kingSide = 'front_queen';
            this.base = this.menSide;
            this.capturePawnIcon = 'Cat_front';
        }
        else {
            this.playerSkel = 'cat_skel';
            this.playerAtlas = 'cat_atlas';
            this.playerIcon = 'cat_';
            this.name = Constant.botUserName;
            this.pfpShiftX = - 116;
            this.pfpShiftY = -2;
            this.pfpFrame = Constant.oppoFallbackFrame.toString();
            this.menSide = 'front';
            this.kingSide = 'back_queen';
            this.base = this.menSide;
            this.capturePawnIcon = 'Dog front';
        }
        // console.log("player Data", playerdata, this.posX, this.posY, this.pawnPosArr, this.minVal, this.maxVal, this.winScore);
        // this.playerContainer = null;

        this.CreatePlayer();
        this.CreatePawns();


    }

    CreatePlayer() {
        this.playerContainer = new Container();
        // Constant.game.app.stage.addChild(this.playerContainer);
        this.playerContainer.position.set(this.posX, this.posY);
        this.playerShadowContainer = new Container();
        this.playerPawnContainer = new Container();
        this.childToRemoveContainer = new Container();
        // console.log("playerContainer", this.playerContainer.x, this.playerContainer.y);

        const scoreBase = Sprite.from(Constant.uiAtlas.textures['Score base']);
        scoreBase.anchor.set(0.5);
        scoreBase.scale.x = this.flip;
        // scoreBase.position.set(playerPfp.x, playerPfp.y);
        this.playerContainer.addChild(scoreBase);

        const pfpBase = Sprite.from('Profile_base');
        pfpBase.anchor.set(0.5);
        pfpBase.position.set(scoreBase.x + this.pfpShiftX, scoreBase.y + this.pfpShiftY);

        this.playerContainer.addChild(pfpBase);

        for (let i = 0; i < this.playerLives; i++) {
            let lives = Sprite.from('White circle');
            lives.width = 12;
            lives.height = 12;
            lives.tint = 0xffffff;
            lives.anchor.set(0.5);
            lives.position.set(pfpBase.x - 20, pfpBase.y - 100);
            this.lifeArr.push(lives);
            if (i > 0)
                this.lifeArr[i].position.set(this.lifeArr[i - 1].x + 20, this.lifeArr[i - 1].y);
        }

        this.playerContainer.addChild(...this.lifeArr);

        this.playerPfp = Sprite.from(this.pfpFrame);
        this.playerPfp.anchor.set(0.5);
        this.playerPfp.width = pfpBase.width - 15;
        this.playerPfp.height = pfpBase.height - 15;
        this.playerPfp.position.set(pfpBase.x, pfpBase.y);

        this.playerContainer.addChild(this.playerPfp);

        let style = new TextStyle({
            fontFamily: 'Fredoka SemiBold',
            fontSize: 35,
            // fontStyle: 'italic',
            // fontWeight: 'bold',
            fill: '#ffffff',
            // stroke: { color: '#4a1850', width: 5, join: 'round' },
            // dropShadow: {
            //     color: '#000000',
            //     blur: 4,
            //     angle: Math.PI / 6,
            //     distance: 6,
            // },
            wordWrap: true,
            wordWrapWidth: 800,
        });

        let pName = new Text({
            text: this.name,
            style,
        });

        pName.anchor.set(0.5);

        pName.position.set(scoreBase.x + this.nameShiftX, scoreBase.y - 85);
        this.playerContainer.addChild(pName);

        this.cpawnIcon = Sprite.from(this.capturePawnIcon);
        this.cpawnIcon.anchor.set(0.5);
        this.cpawnIcon.width = 50;
        this.cpawnIcon.height = 50;
        this.cpawnIcon.position.set(scoreBase.x + this.scoreShiftX - 30, scoreBase.y);

        this.playerContainer.addChild(this.cpawnIcon);

        style = new TextStyle({
            fontFamily: 'Fredoka Medium',
            fontSize: 65,
            // fontStyle: 'italic',
            // fontWeight: 'bold',
            fill: '#703c10',
            // stroke: { color: '#4a1850', width: 5, join: 'round' },
            // dropShadow: {
            //     color: '#000000',
            //     blur: 4,
            //     angle: Math.PI / 6,
            //     distance: 6,
            // },
            wordWrap: true,
            wordWrapWidth: 800,
        });

        this.scoreTxt = new Text({
            text: this.score,
            style,
        });
        this.scoreTxt.anchor.set(0.5);

        this.scoreTxt.position.set(this.cpawnIcon.x + 85, this.cpawnIcon.y);

        this.playerContainer.addChild(this.scoreTxt);



        const size = pfpBase.width + 16;
        this.spinnerBase = Sprite.from(Constant.uiAtlas.textures['Timmer_Ring']);
        this.spinnerBase.width = this.playerPfp.width;
        this.spinnerBase.height = this.playerPfp.height;
        this.spinnerBase.x = this.playerPfp.x;
        this.spinnerBase.y = this.playerPfp.y;
        this.spinnerBase.anchor.set(0.5);
        this.spinnerBase.visible = true;

        this.spinnerMask = new Graphics();
        this.spinnerMask.position.set(this.playerPfp.x, this.playerPfp.y + 5);
        this.spinnerBase.mask = this.spinnerMask;

        this.playerContainer.addChild(this.spinnerBase);
        this.playerContainer.addChild(this.spinnerMask);

        this.spinnerRadius = size / 2;
    }

    CreatePawns() {
        const pawnShadow = {
            "shadowwidth": this.pawnwidth,
            "shadowheight": this.pawnheight,
            "shadowShiftX": 2.5,
            "shadowShiftY": 25
        };
        const pawnData = {
            "pawnwidth": this.pawnwidth,
            "pawnheight": this.pawnheight,
            "pawnIcon": this.playerIcon,
            "pawnSkel": this.playerSkel,
            "pawnAtlas": this.playerAtlas,
            "menside": this.menSide,
            "kingside": this.kingSide
        };

        this.pawnPosArr.forEach((element, ind) => {

            this.shadow = new Shadow(this, this.screen, pawnShadow, element);
            this.pawn = new Pawn(this, this.screen, pawnData, element);
            this.pawn.pawn.shadow = this.shadow.shadow;

            this.screen.gameTileArr[element].isTakenBy = this.i;

            if (element >= this.minVal && element <= this.maxVal) {
                this.screen.gameTileArr[element].isHomeTo = this.i;
            }
        });
    }

    startDisappear(duration = 35, callback = null) {
        this.spinnerBase.visible = true;
        this.spinnerMask.clear();
        this.spinnerPhase = 0;

        // Animate phase from 0 to 2 * PI
        this.timerAnim = gsap.to(this, {
            spinnerPhase: Math.PI * 2,
            duration: duration,
            ease: "none",
            paused: false,
            onUpdate: () => this.updateSpinnerMask(),
            onComplete: () => {
                this.clearSpinnerBase();
                this.timerAnim = null;
                this.handleLives(callback);
            }
        });
    }

    clearSpinnerBase() {
        this.spinnerBase.visible = false; // Hide the spinner after the animation completes
        this.spinnerMask.clear();         // Clear the mask
        this.spinnerPhase = 0;
    }

    handleLives(callback = null) {
        console.log("playerlives", this.playerLives);

        if (this.playerLives <= 0) {
            console.warn("No lives remaining");
            return;
        }

        // Decrement lives
        this.playerLives--;

        // Hide the corresponding life icon
        this.lifeArr[3 - (this.playerLives + 1)].visible = false;

        // Check if game over
        if (this.playerLives === 0) {
            Constant.game.emit('gameover', 1, 0, false);
        } else if (callback) {
            callback();
        }
    }

    updateSpinnerMask() {
        const radius = this.spinnerRadius;
        const angleStart = -Math.PI / 2;
        const angleEnd = angleStart + this.spinnerPhase;

        const x1 = Math.cos(angleStart) * radius;
        const y1 = Math.sin(angleStart) * radius;

        this.spinnerMask.clear()
            .moveTo(0, 0)
            .lineTo(x1, y1)
            .arc(0, 0, radius, angleStart, angleEnd, true)
            .lineTo(0, 0)
            .fill({ color: 0xff0000 });
    }

}

export default Player;