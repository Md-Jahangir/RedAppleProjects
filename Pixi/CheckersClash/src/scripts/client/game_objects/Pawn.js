import * as PIXI from 'pixi.js';
import { Assets, Sprite, Texture, Container, Text, TextStyle, Graphics } from 'pixi.js';
import { Constant } from '../Constant.js';
import { Spine } from '@esotericsoftware/spine-pixi-v8';
import gsap from 'gsap';
import { Fade, PanTo, Shake, Rotate, ZoomTo } from 'pixi-game-camera';
import { AudioManager } from '../media/Audiomanager.js';


class Pawn {
    constructor(player, gamescreen, pawnData, i) {
        this.player = player;
        this.gamescreen = gamescreen;
        this.pawnData = pawnData;
        this.i = i;

        this.createPawn();
    }

    createPawn() {
        const boardTile = this.gamescreen.gameTileArr[this.i];
        const pawnWidth = this.pawnData.pawnwidth;
        const pawnHeight = this.pawnData.pawnheight;
        const pawnIcon = this.pawnData.pawnIcon;
        const pawnSkel = this.pawnData.pawnSkel;
        const pawnAtlas = this.pawnData.pawnAtlas;
        const menSide = this.pawnData.menside;
        const kingSide = this.pawnData.kingside;

        this.pawn = Spine.from({
            skeleton: pawnSkel,
            atlas: pawnAtlas,
        });

        // this.pawn.width = pawnWidth;
        // this.pawn.height = pawnHeight;
        this.pawn.icon = pawnIcon;
        this.pawn.shadow = null;
        this.pawn.currBlockNum = this.i;
        this.pawn.tempTileArr = [];
        this.pawn.tempValArr = [];
        this.pawn.canLeapTo = {};
        this.pawn.canKillAt = {};
        this.pawn.canLeapVal = {};
        this.pawn.canMoveTo = {};
        this.pawn.canMoveVal = {};
        this.pawn.canJump = false;
        this.pawn.blockedAt = 0;
        this.pawn.isKing = false;
        this.pawn.isVisible = true;
        this.pawn.needsSafeGuard = false;
        this.pawn.menSide = menSide;
        this.pawn.kingSide = kingSide;
        this.pawn.base = menSide;

        const idleAnimation = this.pawn.skeleton.data.findAnimation(this.pawn.icon + this.pawn.base + '_idle');
        const duration = idleAnimation.duration;

        this.playIdleAnimation(this.pawn);
        this.trackEntry.trackTime = Math.random() * duration; // Use cached duration

        this.pawn.position.set(
            boardTile.x,
            boardTile.y
        );

        this.player.playerPawnContainer.addChild(this.pawn);
    }

    pawnMoveAnimation(_cTile, _cPawn, callback = null) {
        const clickedTile = _cTile;
        const cPawn = _cPawn;
        if (cPawn) {
            AudioManager.PlayPawnMove();
            this.pawnMoveAnim = gsap.to(cPawn, {
                x: clickedTile.x,
                y: clickedTile.y,
                duration: 0.5
                // scaleX: 1.7,
                // scaleY: 1.7,
                // onComplete: () => {
                // gsap.killTweensOf(cPawn);
                // gsap.killTweensOf(this.capturedPawn.scale);
                // }
            });
        }
    }

    setUpPawnJump(_cTile, _capturdPawn, _pawn) {
        this.curPawn = _pawn; // Always use curPawn for animation references
        this.clickedTile = _cTile;
        this.capturedPawn = _capturdPawn;
        if (this.curPawn) {
            console.log("pawn", this.curPawn.icon, this.curPawn.menSide);

            this.curPawn.state.setAnimation(0, this.curPawn.icon + this.curPawn.base + '_jump1', false);
            this.pawnJumpAnimationOverListeners();
        }
    }

    pawnJumpAnimationOverListeners() {
        if (this.curPawn)
            this.curPawn.state.addListener({
                complete: (entry) => {
                    if (entry.animation.name === this.curPawn.icon + this.curPawn.base + '_jump1') {
                        console.log("china");

                        // After 'jump1' completes, switch to 'jump2'
                        this.curPawn.state.setAnimation(0, this.curPawn.icon + this.curPawn.base + '_jump2', false);
                        this.playDeathAnimation(); // Use curPawn context
                        this.pawnMoveAnimation(this.clickedTile, this.curPawn);
                        return;
                    }
                    if (entry.animation.name === this.curPawn.icon + this.curPawn.base + '_jump2') {
                        console.log("china x2");

                        // After 'jump2' completes, switch to 'jump3'
                        this.curPawn.state.setAnimation(0, this.curPawn.icon + this.curPawn.base + '_jump3');
                        // this.pawnMoveAnimation(this.clickedTile, this.curPawn);
                        return;
                    }
                }
            });
    }

    playDeathAnimation() {
        if (this.capturedPawn) {
            console.log("gamescreen", this.gamescreen.gameContainer);
            this.capturedPawn.shadow.visible = false;

            const pawnToAnimate = this.capturedPawn;
            AudioManager.PlayKillSFX();
            pawnToAnimate.state.setAnimation(0, pawnToAnimate.icon + 'dead', false);
            const mildShake = new Shake(Constant.game.app.stage, 4, 500);
            this.gamescreen.camera.effect(mildShake);

            const listener = {
                complete: (entry) => {
                    if (entry.animation.name === pawnToAnimate.icon + 'dead') {
                        console.warn("dead");
                        // pawnToAnimate.visible = false;
                        this.removeDeadPawn();

                        pawnToAnimate.state.removeListener(listener);
                        console.log("curPawn", this.curPawn);

                        // FIX: Use this.curPawn which is always set by setUpPawnJump
                        this.playIdleAnimation(this.curPawn);
                        this.gamescreen.OnAnimationComplete();
                    }
                }
            };
            pawnToAnimate.state.addListener(listener);
        }
    }

    removeDeadPawn() {
        gsap.to(this.capturedPawn, {
            alpha: 0,
            duration: 0.10,
            delay: 0.05,
        });

        gsap.to(this.capturedPawn.scale, {
            x: 0.8,
            y: 0.8,
            duration: 0.20,
            onComplete: () => {
                gsap.killTweensOf(this.capturedPawn);
                gsap.killTweensOf(this.capturedPawn.scale);
                const shadow = this.capturedPawn.shadow;
                const shadowContainer = this.capturedPawn.shadow.parent;
                const capturedPawnContainer = this.capturedPawn.parent;
                if (shadowContainer)
                    shadowContainer.removeChild(shadow);
                shadow.destroy({ children: true });
                if (capturedPawnContainer)
                    capturedPawnContainer.removeChild(this.capturedPawn);
                this.capturedPawn.state.clearTracks();
                this.capturedPawn.destroy({ children: true });
            }
        });
    }

    playIdleAnimation(_pawn) {
        const pawn = _pawn;
        if (!pawn) {
            console.warn('playIdleAnimation called with null pawn!');
            return;
        }
        console.log("pawn", pawn);
        this.trackEntry = pawn.state.setAnimation(0, pawn.icon + pawn.base + '_idle', true);
    }

    sendCallBack(callback = null) {
        if (callback) {
            this.callBackMethod = null;
            this.callBackMethod = callback;
        }
    }
}

export default Pawn;
