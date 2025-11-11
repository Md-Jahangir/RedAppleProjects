import Button from "../class/Button";
import { Constant } from "../Constant";
import Text from "../gameObjectsClass/Text";
import Texture from "../gameObjectsClass/Texture";
import { SoundManager } from "../SoundManager";
import * as GA from "gameanalytics";

export default class GameOverPopup {
    constructor(scene) {
        this.scene = scene;
        this.gameoverPopupContainer = null;
        this.starContainer = null;
        this.create();
    }
    create() {
        this.gameoverBg = new Texture(this.scene, 0, 0, 'bg');
        this.gameoverBg.SetInteractive();
        this.gameoverBg.setAlpha(0.9).setDepth(3);
        this.gameoverPopupContainer = this.scene.add.container(window.innerWidth / 2, window.innerHeight / 2).setDepth(4).setVisible(false);
        this.starContainer = this.scene.add.container(0, 0);
        // this.levelUpBase = new Texture(this.scene, 0, 0, 'levelup_base');
        // this.levelUpBase.setOrigin(0.5);
        // this.levelUpGlow = new Texture(this.scene, 0, 0, 'level_up_glow');
        // this.levelUpGlow.setOrigin(0.5);
        // this.levelUpSunray = new Texture(this.scene, 0, -200, 'level_up_sunray');
        // this.levelUpSunray.setOrigin(0.5);
        // this.levelUpStardust = new Texture(this.scene, 0, -200, 'level_up_stardust');
        // this.levelUpStardust.setOrigin(0.5);
        this.backlvlBut = new Button(this.scene, 'backlvlBut', 1);
        this.backlvlBut.button.SetPosition(-160, 265);
        this.backlvlBut.button.SetOrigin(0.5);
        this.backlvlBut.setClickcallback(this.BackLvlButFunc, this.scene, null);
        this.replaylvlBut = new Button(this.scene, 'reload-but', 1);
        this.replaylvlBut.button.SetPosition(0, 265);
        this.replaylvlBut.button.SetOrigin(0.5);
        this.replaylvlBut.setClickcallback(this.ReplayLevelFunc, this.scene, [this.scene.gameInfo]);
        this.adlvlImg = new Texture(this.scene, 45, 220, 'ad_img');
        this.adlvlImg.SetOrigin(0.5);
        this.adlvlImg.setVisible(false);
        this.nextlvlBut = new Button(this.scene, 'next-but', 1);
        this.nextlvlBut.button.SetPosition(160, 265);
        this.nextlvlBut.button.SetOrigin(0.5);
        this.nextlvlBut.setClickcallback(this.NextLvlButFunc, this.scene, [this.scene.gameInfo]);
        this.CreateStarUI();
        this.lvlText = new Text(this.scene, 0, 20, 'level ' + ' /20', { fontFamily: "Poppins-Bold", fontSize: 50, color: "#bea5d0" });
        this.lvlText.setOrigin(0.5);
        // this.timeText = new Text(this.scene, 0, 100, 'time   ' + '01:30', { fontFamily: "Poppins-Bold", fontSize: 40, color: "#c67945" });
        // this.timeText.setOrigin(0.5);
        this.scoreText = new Text(this.scene, 0, 125, 'score    ' + '200', { fontFamily: "Poppins-Bold", fontSize: 40, color: "#c67945" });
        this.scoreText.setOrigin(0.5);
        this.gameoverPopupContainer.add([this.lvlText, this.scoreText, this.backlvlBut.button, this.replaylvlBut.button, this.adlvlImg, this.nextlvlBut.button, this.starContainer]);
    }
    BackLvlButFunc() {
        // this.backlvlBut.OffEvent();
        GA.GameAnalytics.addDesignEvent("ui:menu_clicked");
        this.scene.stop('GameScene');
        this.scene.start('MenuScene', { "playCount": 1 });
    }
    async ReplayLevelFunc(Data) {
        GA.GameAnalytics.addDesignEvent("ui:replay_clicked");
        this.adHitFrom = 'reload';
        // this.ShowAd();
        this.RestartGameControl();
        this.RestartGameControl();
        this.scene.stop('GameScene');
        this.scene.start('GameScene', {
            level: Data.level,
            stars: Data.stars,
            gameOption: Data.gameOption
        });
    }
    async NextLvlButFunc(Data) {
        GA.GameAnalytics.addDesignEvent("ui:next_clicked");
        await this.ShowAd();
        setTimeout(() => {
            this.RestartGameControl();
            let nextLvl = null;
            nextLvl = (Data.level === 49) ? Data.level : Data.level + 1;
            this.scene.stop('GameScene');
            this.scene.start('GameScene', {
                level: nextLvl,
                stars: Data.stars,
                gameOption: Data.gameOption
            });
        }, 1000);

    }
    VisibleControl(isTrue, _star, _lvl, _lvlTime) {
        this.lvlText.SetText('level  ' + _lvl + ' /20');
        // this.timeText.SetText('time   ' + _lvlTime);
        this.scoreText.SetText('score   ' + Constant.score);
        let starIndex = 1;
        for (let index = 0; index < this.scene.starCount; index++) {
            this.starContainer.list[index + starIndex].setVisible(true);
            this.StarTweenAnim(this.starContainer.list[index + starIndex], 1.25, 1000, 360);
            starIndex += 1;
        }
        this.gameoverBg.setVisible(isTrue);
        if (_star == 0) {
            this.starContainer.setPosition(0, 110);
            this.replaylvlBut.button.setPosition(60, 140);
            this.adlvlImg.setPosition(105, 95)
            this.backlvlBut.button.setPosition(-60, 140);
            // this.levelUpBase.setTexture('levelLoose_base');
            this.backlvlBut.button.setTexture('backlvlbut_loss');
            this.GameOverVisibleControl();
        }
        this.gameoverPopupContainer.setVisible(isTrue);
    }
    StarTweenAnim(_targetStar, _scale, _time, _rotation) {
        this.scene.tweens.add({
            targets: _targetStar,
            scaleX: _scale,
            scaleY: _scale,
            alpha: 1,
            duration: _time,
            rotation: Phaser.Math.DegToRad(_rotation),
            ease: 'Power2',
            onComplete: () => {
                if (_time === 1000) {
                    this.StarTweenAnim(_targetStar, 1, 500, 0);
                }
            }
        });
    }
    GameOverVisibleControl() {
        let gameOverContainerHideObjArr = [0, 1, 5];
        for (let index = 0; index < gameOverContainerHideObjArr.length; index++) {
            this.gameoverPopupContainer.list[gameOverContainerHideObjArr[index]].setVisible(false);
        }
    }
    CreateStarUI() {
        let offsetWidth = -160;
        let OffsetHeight = [-91, -116, -91];
        for (let index = 1; index <= 3; index++) {
            const starCase = new Texture(this.scene, offsetWidth, OffsetHeight[index - 1], 'starcase_' + index);
            starCase.setOrigin(0.5).setVisible(false);
            const star = new Texture(this.scene, offsetWidth, OffsetHeight[index - 1], 'star_' + index);
            star.setVisible(false).setScale(0.1).setOrigin(0.5).setAlpha(0.1);
            this.starContainer.add([starCase, star]);
            offsetWidth += 163;
        }
    }
    PopupAnimControl(isTrue, _star, _lvl, _lvlTime) {
        this.gameoverBg.setVisible(isTrue);
        this.scene.popupanimContainer.setVisible(isTrue);
        if (_star == 0 || _lvl == 50) {
            this.scene.popupAnim.y = 0;
            this.scene.popupAnim.setAnimation(0, 'opps_appear', false);
            this.scene.popupAnim.on('complete', () => {
                this.scene.popupAnim.setAnimation(0, "opps_loop", true);
                this.VisibleControl(isTrue, _star, _lvl, _lvlTime);
                this.scene.popupAnim.off('complete', null, this);
            }, this);
        }
        else {
            this.scene.popupAnim.y = 30;
            this.scene.popupAnim.setAnimation(0, 'level_up_appear', false);
            this.scene.popupAnim.on('complete', () => {
                this.scene.popupAnim.setAnimation(0, "level_up_loop", true);
                this.VisibleControl(isTrue, _star, _lvl, _lvlTime);
                this.scene.popupAnim.off('complete', null, this);
            }, this);
        }
    }
    Resize(newWidth, newHeight, newScale) {
        this.gameoverPopupContainer.setScale(newScale);
        this.gameoverPopupContainer.setPosition(newWidth / 2, newHeight / 2);
        this.gameoverBg.SetDisplay(newWidth, newHeight);
    }
}