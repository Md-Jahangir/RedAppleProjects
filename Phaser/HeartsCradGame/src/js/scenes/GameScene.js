import GameTween from "../class/GameTween";
import Player from "../class/Player";
import Table from "../class/Table";
import { Utils } from "../class/Utils";
import Image from "../objectclass/Image";
import UiControl from "../class/UiControl";
import RoundManager from "../class/RoundManager";
import Sprite from "../objectclass/Sprite";
import BotController from "../class/BotController";
import { Model } from "../Model";
import { Client } from "../services/Client";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.allPlayerPassCard = null;
        this.passDirection = null;
        this.passingOrderArray = null;
        this.allCardsContainer = null;
        this.allCards = null;
        this.allPlayerArray = [];
    }
    init(data) {
        this.playerCount = data;
        this.gameData = this.cache.json.get('GameData');
        this.playerjsonData = this.cache.json.get('TempPlayerData');
        Model.SetRoomDetailsData(this.playerjsonData.room_details[0].data.players);
        // console.log(this.playerjsonData.start_game[0].data);
        Model.SetPlayersData(this.playerjsonData.start_game[0].data);
    }
    create() {
        this.game.events.on('resize', this.Resize, this);
        this.events.once('arrowUi', this.PassPopUpControl, this);
        this.bg = new Image(this, 0, 0, 'bg');
        this.bg.setDepth(-2);
        this.bg.SetOrigin(0);
        this.allCards = [];
        this.allCardsContainer = this.add.container(0, 0);
        this.ClassInstance();
        this.Resize(window.innerWidth, window.innerHeight);
    }
    ClassInstance() {
        this.passDirection = { Left: false, Right: false, Up: false };
        this.roundManagerClass = new RoundManager(this);
        this.gameTween = new GameTween(this);
        this.tableInstance = new Table(this, this.gameData);
        this.uiControl = new UiControl(this);
        this.botManager = new BotController(this, this.gameData.cardonTableposition, this.gameData);
        this.roundManagerClass.RoundCountUpdate();
        this.CreatePlayer();
        this.allPlayerPassCard = false;
    }
    CreatePlayer() {
        this.DestroyPlayer();
        let playersResponseData = Model.GetRoomDetailsData();
        for (let i = 0; i < playersResponseData.length; i++) {
            let player = new Player(this, this.gameData.playerPosition[i].x, this.gameData.playerPosition[i].y, i, this.gameData);
            player.SetUserName(playersResponseData[i].username);
            player.SetUserBalance(playersResponseData[i].amount);
            this.allPlayerArray.push(player);
        }

        this.StartCardDistributeAnim();

    }
    DestroyPlayer() {
        for (let i = 0; i < this.allPlayerArray.length; i++) {
            this.allPlayerArray[i].DestroyPlayer();
        }
        this.allPlayerArray = [];
    };
    StartCardDistributeAnim() {
        let cardNumber = 52;
        this.cards = [];
        for (let i = 0; i < cardNumber; i++) {
            let card = new Sprite(this, 0, 0, "cards");
            card.setFrame(52);
            card.setData({ card_id: null, card_value: null, isSelect: null });
            card.SetScale(0.5);
            this.allCardsContainer.add(card);
            this.cards.push(card);
        }
        // this.tweens.add({
        //     targets: this.cards,
        //     alpha: 0,
        //     duration: 10000, // Duration of the animation in milliseconds
        //     ease: 'Power1', // Easing function for the animation
        //     repeat: 0, // Repeat indefinitely
        //     yoyo: false, // Do not reverse the animation
        //     onComplete: () => {
        //         // Callback when the animation completes
        //         cards.forEach(element => {
        //             element.setFrame(52);
        //             element.setAlpha(1);
        //         });
        //     }
        // });
        this.SetEveryPlayerCardsData();
    }
    SetEveryPlayerCardsData() {
        let playercardsVal = Model.GetPlayersData();
        for (let i = 0; i < this.allPlayerArray.length; i++) {
            const element = this.allPlayerArray[i];
            for (let j = 0; j < playercardsVal.playerArray[i].hands.length; j++) {
                let card = this.cards.pop();
                card.setData({ card_id: playercardsVal.playerArray[i].hands[j].card_id, card_value: playercardsVal.playerArray[i].hands[j].card_value, isSelect: false });
                element.userCardsInstance.userCards.push(card);
            }
            element.userCardsInstance.SortCardsArray();
            element.userCardsInstance.AdjustCard(this.gameData.playerAdjustPos[i].offsetX, this.gameData.playerAdjustPos[i].offsetY, this.gameData.playerAdjustPos[i].stGap, this.gameData.playerAdjustPos[i].avgGap, this.gameData.playerAdjustPos[i].waveSpace, this.gameData.playerAdjustPos[i].angle, i);
            if (i === 0) {
                element.userCardsInstance.CardSetFrame();
                element.userCardsInstance.CardSetInteractive();
                element.userCardsInstance.OnOverOut();
                element.userCardsInstance.OnUp();
            }
        }
        this.SortCardsDepthInContainer();
        this.PassPopUpControl();
    }
    SortCardsDepthInContainer() {
        this.allCardsContainer.list.sort((a, b) => a.getData("card_value") - b.getData("card_value"));
    }
    PassPopUpControl() {
        switch (true) {
            case this.passDirection.Left:
                this.uiControl.PassCardsPopUp(0, "-=50", "+=0")
                break;
            case this.passDirection.Right:
                this.uiControl.PassCardsPopUp(-180, "+=50", "+=0")
                break;
            case this.passDirection.Up:
                this.uiControl.PassCardsPopUp(90, "+=0", "-=50")
                break;

            default:
                // console.log(this.passDirection);+
                break;
        }
    }
    AllPlayerThreeCardPass() {
        if (!this.allPlayerPassCard) {
            let passCount = 0;
            this.allPlayerArray.forEach(element => {
                if (element.userCardsInstance.isThreeCardPass) {
                    passCount++;
                }
            });
            if (passCount == 4) {
                this.allPlayerPassCard = true;
                setTimeout(() => {
                    this.StartPassingCardsEachOther();
                }, 500)
            }
        }
    }
    StartPassingCardsEachOther() {
        for (let index = 0; index < this.allPlayerArray.length; index++) {
            const element = this.allPlayerArray[index];
            for (let i = 0; i < element.userCardsInstance.passingCardsArray.length; i++) {
                this.gameTween.CardOnTableTween(element.userCardsInstance.passingCardsArray[i], this.gameData.playerPosition[this.passingOrderArray[index]].x, this.gameData.playerPosition[this.passingOrderArray[index]].y, 1000, 0);
            }
        }
        for (let index = 0; index < 4; index++) {
            for (let i = 0; i < 3; i++) {
                let passcard = this.allPlayerArray[index].userCardsInstance.passingCardsArray.pop();
                if (this.passingOrderArray[index] == 0) {
                    passcard.SetFrame(passcard.data.list.card_value);
                } else {
                    passcard.SetFrame(52);
                }
                this.allPlayerArray[this.passingOrderArray[index]].userCardsInstance.userCards.push(passcard);
                this.allPlayerArray[this.passingOrderArray[index]].userCardsInstance.SortCardsArray();
                this.allPlayerArray[this.passingOrderArray[index]].userCardsInstance.CardRemoveInteractive();
            }
        }
        this.uiControl.waitPassText.SetVisible(false);
        setTimeout(() => {
            for (let i = 0; i < this.allPlayerArray.length; i++) {
                const element = this.allPlayerArray[i];
                element.userCardsInstance.SortCardsArray();
                element.userCardsInstance.AdjustCard(this.gameData.playerAdjustPos[i].offsetX, this.gameData.playerAdjustPos[i].offsetY, this.gameData.playerAdjustPos[i].stGap, this.gameData.playerAdjustPos[i].avgGap, this.gameData.playerAdjustPos[i].waveSpace, this.gameData.playerAdjustPos[i].angle, i);
                if (i == 0) {
                    element.userCardsInstance.CardSetInteractive();
                    element.userCardsInstance.OnOverOut();
                    element.userCardsInstance.DragControl();
                }
            }
        }, 1500);
    }
    Resize(newWidth, newHeight) {
        let newScale = Utils.getScale(1920, 1080, newWidth, newHeight);
        this.bg.SetDisplay(newWidth, newHeight);
        this.tableInstance.Resize(newWidth, newHeight, newScale);
        this.uiControl.Resize(newWidth, newHeight, newScale);
        this.allPlayerArray.forEach(element => {
            element.Resize(newWidth, newHeight, newScale);
        });
        this.allCardsContainer.setScale(newScale);
        this.allCardsContainer.setPosition(newWidth / 2, newHeight / 2);
    }

}