import { Constant } from "../Constant.js";
import * as PIXI from 'pixi.js';
import { Sprite, Texture, Container, Text, TextStyle } from 'pixi.js';
import ButtonTween from "../game_objects/ButtonTween.js";
import MenuScreen from "../screens/MenuScreen.js";
import GameScreen from "../screens/GameScreen.js";
import { AudioManager } from "../media/Audiomanager.js";
import { GameAnalytics } from "gameanalytics";

export default class GameoverPopup {
    constructor(screen) {
        this.screen = screen;
        this.goPopupContainer = null;

        this.CreateGameoverPopup();
        this.HideGameoverPopup();

    }

    CreateGameoverPopup() {
        this.overlay = Sprite.from('overlay');
        this.overlay.eventMode = 'static';
        this.overlay.anchor.set(0.5);
        Constant.game.app.stage.addChild(this.overlay);

        this.goPopupContainer = new Container();
        Constant.game.app.stage.addChild(this.goPopupContainer);

        const hue = Sprite.from('hue');
        hue.anchor.set(0.5);
        hue.position.set(0, -220);

        this.leftStar = Sprite.from('stars_right');
        this.leftStar.anchor.set(0.5);
        this.leftStar.scale.x = -1;
        this.leftStar.position.set(-400, -660);

        this.rightStar = Sprite.from('stars_right');
        this.rightStar.anchor.set(0.5);
        this.rightStar.position.set(400, -660);

        const headerStyle = new TextStyle({
            fontFamily: "Fredoka SemiBold", // or your font
            fontSize: 80,
            fill: '#ffffff', // Light yellow to deep gold
            // stroke: '#fff6a4',
            // strokeThickness: 8,
            dropShadow: true,
            dropShadowColor: '#ffdd57',
            dropShadowBlur: 15,
            dropShadowDistance: 0,
            align: 'center'
        });

        this.headerTxt = new Text({
            text: "Player A Wins",
            style: headerStyle
        });
        this.headerTxt.anchor.set(0.5);
        this.headerTxt.position.set(0, -640);

        const base = Sprite.from('rules_base');
        base.anchor.set(0.5);

        this.winnerScoreBase = Sprite.from('Score base');
        this.winnerScoreBase.anchor.set(0.5);
        this.winnerScoreBase.width = 494;
        this.winnerScoreBase.position.set(-50, -300);

        this.winnerCapturedMen = Sprite.from('Dog front');
        this.winnerCapturedMen.anchor.set(0.5);
        this.winnerCapturedMen.width = 58;
        this.winnerCapturedMen.position.set(-230, -300);

        const bodyStyle = new TextStyle({
            fontFamily: "Fredoka SemiBold", // or your font
            fontSize: 65,
            fill: '#ffffff', // Light yellow to deep gold
            // stroke: '#fff6a4',
            // strokeThickness: 8,
            stroke: {
                color: '#7d3c1f',
                width: 4
            },
            align: 'center'
        });

        this.winnerScore = new Text({
            text: "11",
            style: bodyStyle
        });
        this.winnerScore.anchor.set(0.5);
        this.winnerScore.position.set(-130, -300);

        const playernameStyle = new TextStyle({
            fontFamily: "Fredoka SemiBold", // or your font
            fontSize: 35,
            fill: '#7d3d08', // Light yellow to deep gold
            fontWeight: 'bold',
            // stroke: '#fff6a4',
            // // strokeThickness: 8,
            // stroke: {
            //     color: '#7d3c1f',
            //     width: 4
            // },
            align: 'center'
        });

        this.winnerName = new Text({
            text: "Player 1",
            style: playernameStyle
        });
        this.winnerName.anchor.set(0.5);
        this.winnerName.position.set(15, -300);

        const wprofileBase = Sprite.from('profile holder');
        wprofileBase.anchor.set(0.5);
        wprofileBase.position.set(220, -300);

        this.winnerPfp = Sprite.from(Constant.pfpAtlas.textures['0']);
        this.winnerPfp.anchor.set(0.5);
        this.winnerPfp.width = wprofileBase.width - 40;
        this.winnerPfp.height = wprofileBase.height - 40;
        this.winnerPfp.position.set(wprofileBase.x, wprofileBase.y);

        this.crown = Sprite.from(Constant.uiAtlas.textures['Crown']);
        this.crown.anchor.set(0.5);
        this.crown.position.set(wprofileBase.x + (wprofileBase.width / 2) - 10, wprofileBase.y - (wprofileBase.height / 2) - 18);

        this.loserScoreBase = Sprite.from('Score base');
        this.loserScoreBase.anchor.set(0.5);
        this.loserScoreBase.width = 494;
        this.loserScoreBase.position.set(50, this.winnerScoreBase.y + 280);

        this.loserCapturedMen = Sprite.from('Cat_front');
        this.loserCapturedMen.anchor.set(0.5);
        this.loserCapturedMen.width = 58;
        this.loserCapturedMen.position.set(230, this.loserScoreBase.y);

        this.loserScore = new Text({
            text: "11",
            style: bodyStyle
        });
        this.loserScore.anchor.set(0.5);
        this.loserScore.position.set(130, this.loserScoreBase.y);

        this.loserName = new Text({
            text: "Player 2",
            style: playernameStyle
        });
        this.loserName.anchor.set(0.5);
        this.loserName.position.set(-15, this.loserScoreBase.y);

        const lprofileBase = Sprite.from('profile holder');
        lprofileBase.anchor.set(0.5);
        lprofileBase.position.set(-220, this.loserScoreBase.y);

        this.loserPfp = Sprite.from(Constant.pfpAtlas.textures['0']);
        this.loserPfp.anchor.set(0.5);
        this.loserPfp.width = lprofileBase.width - 40;
        this.loserPfp.height = lprofileBase.height - 40;
        this.loserPfp.position.set(lprofileBase.x, lprofileBase.y);

        this.coinIcon = Sprite.from('coin small');
        this.coinIcon.anchor.set(0.5);
        this.coinIcon.width = 101;
        this.coinIcon.height = 101;
        this.coinIcon.position.set(-100, 150);

        const footerStyle = new TextStyle({
            fontFamily: "Fredoka SemiBold", // or your font
            fontSize: 80,
            fill: '#e4b379', // Light yellow to deep gold
            fontWeight: 'bold',
            // stroke: '#fff6a4',
            // // strokeThickness: 8,
            stroke: {
                color: '#783118',
                width: 4
            },
            align: 'center'
        });

        this.scoreIncremented = new Text({
            text: "+ 100",
            style: footerStyle
        });
        this.scoreIncremented.anchor.set(0.5);
        this.scoreIncremented.position.set(this.coinIcon.x + 160, this.coinIcon.y - 2.5);

        const hintTxtStyle = new TextStyle({
            fontFamily: "Fredoka SemiBold", // or your font
            fontSize: 35,
            fill: '#b06649', // Light yellow to deep gold
            // fontWeight: 'bold',
            // stroke: '#fff6a4',
            // // strokeThickness: 8,
            // stroke: {
            //     color: '#783118',
            //     width: 4
            // },
            align: 'center'
        });
        const hintTxt = new Text({
            text: "FREE HINTS",
            style: hintTxtStyle
        });
        hintTxt.anchor.set(0.5);
        hintTxt.position.set(this.scoreIncremented.x - 50, this.scoreIncremented.y + 100);

        this.adIcon = Sprite.from('ad_icon');
        this.adIcon.anchor.set(0.5);
        this.adIcon.eventMode = 'static';
        this.adIcon.cursor = 'pointer';
        this.adIcon.width = 190;
        this.adIcon.height = 127;
        this.adIcon.position.set(0, hintTxt.y + 100);

        this.menuBtn = Sprite.from('Main menu');
        this.menuBtn.eventMode = 'static';
        this.menuBtn.cursor = 'pointer';
        this.menuBtn.anchor.set(0.5);
        this.menuBtn.position.set(0, base.y + 620);

        this.replayBtn = Sprite.from('Play again');
        this.replayBtn.eventMode = 'static';
        this.replayBtn.cursor = 'pointer';
        this.replayBtn.anchor.set(0.5);
        this.replayBtn.position.set(0, this.menuBtn.y + (this.menuBtn.height / 2) + 100);


        this.goPopupContainer.addChild(hue, this.headerTxt, this.leftStar, this.rightStar, base, this.winnerScoreBase, this.winnerCapturedMen, this.winnerScore, this.winnerName, wprofileBase, this.winnerPfp, this.crown, this.loserScoreBase, this.loserCapturedMen, this.loserScore, this.loserName, lprofileBase, this.loserPfp, this.coinIcon, this.scoreIncremented, hintTxt, this.adIcon, this.menuBtn, this.replayBtn, this.replayBtn);

        this.adIcon.on('pointerup', this.OnClickingAdIcon, this);
        this.menuBtn.on('pointerup', this.OnClickingMenuBtn, this);
        this.replayBtn.on('pointerup', this.OnClickingReplayBtn, this);

    }

    OnClickingAdIcon() {
        GameAnalytics.addDesignEvent('ui:gameover_ad_clicked');
        AudioManager.PlayBtnPressedSFX();

        new ButtonTween(this, this.adIcon, null, 0.85, 0.85);
    }

    OnClickingMenuBtn() {
        GameAnalytics.addDesignEvent('ui:gameover_menu_clicked');
        AudioManager.PlayBtnPressedSFX();
        new ButtonTween(this, this.menuBtn, null, 0.85, 0.85, this.SwitchScreen.bind(this));
    }

    OnClickingReplayBtn() {
        GameAnalytics.addDesignEvent('ui:gameover_replay_clicked');
        AudioManager.PlayBtnPressedSFX();
        new ButtonTween(this, this.replayBtn, null, 0.85, 0.85, this.RestartScreen.bind(this));
    }

    SwitchScreen() {
        this.RemoveScreenContainers();
        new MenuScreen();
    }

    RestartScreen() {
        this.RemoveScreenContainers();
        new GameScreen();
    }



    RemoveScreenContainers() {
        const screen = this.screen;
        Constant.game.app.stage.removeChild(this.overlay);
        Constant.game.app.stage.removeChild(this.goPopupContainer);
        Constant.game.app.stage.removeChild(this.screen.gameContainer);
        Constant.game.app.stage.removeChild(this.screen.moveTileMarkerContainer);
        screen.RemoveGameContainers();
    }

    ShowGameoverPopup(_winner = null, _loser = null, _isTied = null) {
        const winner = _winner;
        const loser = _loser;
        const isTied = _isTied;
        console.log("jfdjfdfd", winner, loser, isTied);

        this.headerTxt.text = isTied ? 'Match Tied' : winner.name + ' Wins';
        this.winnerScore.text = winner.score;
        this.winnerName.text = winner.name;
        this.crown.visible = this.leftStar.visible = this.rightStar.visible = this.scoreIncremented.visible = this.coinIcon.visible = !isTied;
        this.winnerPfp.texture = winner.playerPfp.texture;
        this.loserScore.text = loser.score;
        this.loserName.text = loser.name;
        this.loserPfp.texture = loser.playerPfp.texture;

        this.overlay.visible = true;
        this.goPopupContainer.visible = true;
    }

    HideGameoverPopup() {
        this.overlay.visible = false;
        this.goPopupContainer.visible = false;
    }


    resizeBg() {
        this.overlay.x = Constant.game.app.screen.width / 2;
        this.overlay.y = Constant.game.app.screen.height / 2;
        if (Constant.game.app.screen.width > Constant.game.app.screen.height) {
            this.overlay.width = 1080;
            this.overlay.height = 1920;
            this.overlay.scale.set(Constant.newScale)
        }
        else {
            this.overlay.width = Constant.game.app.screen.width;
            this.overlay.height = Constant.game.app.screen.height;
            // bg.scale.set(1, 1);
        }
    }

    ResizeGameoverPopup() {

        let scale = Math.min(Constant.game.app.screen.width / 1080, Constant.game.app.screen.height / 1920);
        Constant.newScale = scale;

        this.resizeBg();
        // const originalScaleX = sprite.scale.x;
        // const originalScaleY = sprite.scale.y;
        // Center the sprite on the screen

        this.goPopupContainer.x = Constant.game.app.screen.width / 2;
        this.goPopupContainer.y = Constant.game.app.screen.height / 2;
        this.goPopupContainer.scale.set(Constant.newScale);
    }
}