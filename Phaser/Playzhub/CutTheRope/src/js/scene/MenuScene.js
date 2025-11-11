/********* Script_Details ************
 * @Original_Creator :- Tanmay Mukherjee.
 * @Created_Date :- 26-07-2024
 * @Last_Update_By :- Tanmay Mukherjee
 * @Last_Updatd_Date :- 26-09-24
 * @Description :- Handle Lvl
 ************************************/
import Button from "../class/Button";
import LvlClass from "../class/LvlClass";
import { Utils } from "../class/Utils";
import { Constant } from "../Constant";
import Texture from "../gameObjectsClass/Texture";
import { SoundManager } from "../SoundManager";
// import { PlayzhubEventHandler } from "../../lib/PlayzhubEventHandler";
import { PlayzhubEventHandler } from "../PlayzhubEventHandler";
import * as GA from "gameanalytics";

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }
    init() {
    }
    create(data) {
        this.gameData = undefined;
        // Server.ReqGameState();
        this.game.events.off("change_scene");
        this.game.events.once("change_scene", (data) => {
            SoundManager.ButtonClickSound();
            Constant.numberOfPlayButtonClicked++;
            // Server.PostGameFrequencyToParent();
            PlayzhubEventHandler.GamePlayStarted(Constant.numberOfPlayButtonClicked);
            this.ChangeScene(data);
        }, this);

        // For Build Upload Purpose ------
        this.UpdateGameStateFunc(data);

        // // For Development Purpose-------
        // this.DevelopmentUserData();

        GA.GameAnalytics.addDesignEvent("screen:title");
    }

    //#region lvl Button Functionality
    LvlButAnim(newWidth, newHeight) {
        let newScale = Utils.getScale(1080, 1920, newWidth, newHeight);
        this.tweens.add({
            targets: this.lvlBut.button,
            y: 1670 * newScale,
            duration: 1000,
            ease: 'Bounce.easeOut',
            onComplete: () => {
                this.lvlButPos.y = 670;
            }
        });
    }
    LvlButFunc() {
        this.cameras.main.fadeOut(500);
        this.lvlBut.TouchDisable();
        SoundManager.IsPlayGameBgMusic();
        setTimeout(() => {
            this.lvlClassInstance.backButton.TouchEnable();
            this.lvlBut.button.setVisible(false);
            this.bg.setTexture('bg');
            this.lvlClassInstance.VisibleControl(true);
        }, 500);

        GA.GameAnalytics.addDesignEvent("ui:play_clicked");
    }
    //#endregion

    //#region GameAnalytics Functionality 
    FirstTimeGameStartFunc(_data) {
        PlayzhubEventHandler.GameStateFetch((data) => {
            if (data == null) {
                this.NewUserData();
            } else {
                this.OldUserData(data);
            }
        })
        // GameAnalytics.listen('GameStateUpdate', (data) => {
        //     if (data == null) {
        //         this.NewUserData();
        //     } else {
        //         this.OldUserData(data);
        //     }
        // });

    }
    handleGameState(data) {
        console.log('handleGameState', data);
        if (data == null) {
            this.gameData = null;
            this.NewUserData();
        } else {
            this.gameData = data;
            this.OldUserData(data);
        }
    }
    UpdateGameStateFunc(_data) {
        // GameAnalytics.emit('request-game-state', null);
        // Server.ReqGameState();
        PlayzhubEventHandler.ReceivedGameState((data) => {
            console.log('PlayzhubEventHandler data: ', data);

            if (data == null) {
                this.NewUserData();
            } else {
                this.OldUserData(data);
            }
        })
        PlayzhubEventHandler.RequestGameState();
        // setTimeout(() => {
        // GameAnalytics.listen('SendGameStateToGame', (data) => {
        //     if (data == null) {
        //         this.NewUserData();
        //     } else {
        //         this.OldUserData(data);
        //     }
        // });
        // }, 0);
    }
    //#endregion

    //#region For Build Purpose
    NewUserData(_data) {
        Constant.starsData[0] = 0;
        Constant.gameOptions = {
            colors: ["0x87CEEB"],
            columns: 5,
            rows: 4,
            thumbWidth: 150,
            thumbHeight: 150,
            spacing: 20,
            localStorageName: "levelselect"
        }
        for (var l = 1; l < Constant.gameOptions.columns * Constant.gameOptions.rows * Constant.gameOptions.colors.length; l++) {
            Constant.starsData[l] = -1;
        }
        Constant.score = 0;
        this.LevelClassCreate();
    }
    OldUserData(_gameData) {
        if (_gameData == null) {
            this.NewUserData();
        } else {
            this.currentLevelData = _gameData;
            Constant.starsData = this.currentLevelData.starsData;
            Constant.score = this.currentLevelData.score;
            Constant.gameOptions = this.currentLevelData.gameOptions;
            this.LevelClassCreate();
        }
    }
    //#endregion

    //#region  For Development Purpose 
    DevelopmentUserData() {
        Constant.starsData[0] = 0;
        Constant.gameOptions = {
            colors: ["0x87CEEB"],
            // colors: ["0x87CEEB", "0xFFFFFF", "0xFFFFFF"],
            columns: 5,
            rows: 4,
            thumbWidth: 150,
            thumbHeight: 150,
            spacing: 20,
            localStorageName: "levelselect"
        }
        for (var l = 1; l < Constant.gameOptions.columns * Constant.gameOptions.rows * Constant.gameOptions.colors.length; l++) {
            if (l >= 50) {
                continue;
            }
            Constant.starsData[l] = 0;
        }
        Constant.score = 0;
        this.LevelClassCreate();
    }
    //#endregion

    //#region Level Class Creation From Server Data
    LevelClassCreate(data) {
        Constant.activeScene = 'MenuScene';
        this.lvlButPos = { x: 0, y: 1670 };
        this.game.events.on("resize", this.resize, this);
        // SoundManager.IsPlayGameBgMusic();
        this.bg = new Texture(this, 0, 0, 'preload_bg');
        this.logo = new Texture(this, 0, 0, 'game-logo');
        this.logo.SetOrigin(0.5);
        this.lvlBut = new Button(this, 'playBut', 1);
        this.lvlBut.button.SetOrigin(0.5);
        this.lvlBut.setClickcallback(this.LvlButFunc, this, null);

        this.lvlClassInstance = new LvlClass(this);
        if (window.innerWidth > window.innerHeight) {
            let clientHeight = window.innerHeight;
            let clientWidth = (clientHeight / 1.77777777778);
            this.LvlButAnim(clientWidth, clientHeight);
            this.resize(clientWidth, clientHeight, (window.innerWidth / 2) - (clientWidth / 2));
        }
        else {
            let clientWidth = window.innerWidth;
            let clientHeight = window.innerHeight;
            this.LvlButAnim(clientWidth, clientHeight);
            this.resize(clientWidth, clientHeight, 0);
        }
    }
    //#endregion

    //#region Change Scene Based On Data
    ChangeScene(_data) {
        this.scene.stop('MenuScene');
        this.scene.start('GameScene', _data);
    }
    //#endregion

    //#region -  Resize
    resize(newWidth, newHeight, offsetWidth) {
        if (Constant.activeScene !== 'MenuScene') return;
        let newScale = Utils.getScale(1080, 1920, newWidth, newHeight);
        this.bg.SetDisplay(newWidth, newHeight);
        this.logo.SetScale(newScale);
        this.logo.setPosition((newWidth / 2) - (170 * newScale), (newHeight / 2) - (610 * newScale));
        this.lvlBut.SetScale(newScale);
        this.lvlBut.button.SetPosition(newWidth / 2, (newHeight / 2) + (this.lvlButPos.y * newScale));
        this.lvlClassInstance.Resize(newWidth, newHeight, newScale);
        const camera = this.cameras.main;
        camera.x = offsetWidth;
        // camera.setBounds(0, 0, newWidth, newHeight);
        camera.setViewport(offsetWidth, 0, newWidth, newHeight);
    }
    //#endregion
}