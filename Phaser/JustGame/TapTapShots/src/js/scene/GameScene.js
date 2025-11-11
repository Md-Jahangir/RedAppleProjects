
import { Utils } from "../Utils";
import Button from "../class/Button";
import BasketBall from "../class/BasketBall";
import Basket from "../class/Basket";
import GameTween from "../class/GameTween";
import PausePopup from "../popup/PausePopup";
import BasketNet from "../class/BasketNet";
import Bridge from "../class/Bridge";
import { Constant } from "../Constant";
import { Server } from "../class/Server";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.istimeOver = null;
        this.isgameOver = null;
        this.isGamePause = null;
        this.basketPos = null;
        this.netBody = null;
        this.constraintArray = null;
        this.constraintArrayPointA = null;
        this.previousScale = null;
        this.constraintYCordinate = null;
        this.resizeCount = 0;
    }
    create() {
        this.game.events.on('resize', this.resize, this);
        //collider json 
        this.basketColliderJson = this.cache.json.get('basket-collider');
        //reuse Varriable in Game
        this.constraintArray = [];
        this.constraintArrayPointA = [];
        this.constraintYCordinate = [-10, -15, -20, -20, -20, -15, -10];
        this.basketPos = 1;
        this.istimeOver = false;
        this.isgameOver = false;
        this.isGamePause = false;
        this.bg = this.add.image(0, 0, 'game-bg').setOrigin(0).setInteractive();
        this.InstanceCreate();
        this.planeBg = this.add.image(0, 0, 'ground').setOrigin(0, 0.5);

        //Game Over Collision Check
        this.matter.world.on("collisionstart", (event, bodyA, bodyB) => {
            if (this.istimeOver && bodyB.position.y > window.innerHeight && !this.isgameOver) {
                this.time.removeEvent(this.bridgeCreate.timer);
                this.bridgeCreate.timer.remove();
                this.CallTheScoreSendAPI();
                // console.log('gameover');
            }
        });

        this.AddConstraint();
        this.resize(window.innerWidth, window.innerHeight);
    }
    InstanceCreate() {
        //All class instance create 
        this.gameTween = new GameTween(this);
        this.basketBallInstance = new BasketBall(this);
        this.rightBasketNet = new BasketNet(this, (window.innerWidth / 1.22) - (window.innerWidth / 18), window.innerHeight / 2.08);
        this.leftBasketNet = new BasketNet(this, -(window.innerWidth / 5.15), window.innerHeight / 3.44);
        this.basketInstance = new Basket(this);
        this.pausePopupInstance = new PausePopup(this);
        this.pauseBut = new Button(this, 'pause-but', window.innerWidth / 1.1, window.innerHeight / 10, 1, 1);
        this.bridgeCreate = new Bridge(this);
        this.pauseBut.button.setDepth(3);
        this.pauseBut.setClickcallback(this.PauseButtonFunc, this);
    }
    //In game Pause Button functionality
    PauseButtonFunc() {
        this.isGamePause = true;
        this.pauseBut.button.setVisible(false);
        this.basketBallInstance.ball.body.timeScale = 0.001;
        if (this.basketInstance.score > 0) {
            this.basketInstance.gameTimer.pause();
        }
        this.pausePopupInstance.popupbg.setVisible(true);
        this.pausePopupInstance.pausePopupContainer.list[2].setVisible(false);
        this.pausePopupInstance.pausePopupContainer.list[1].setVisible(true);
        this.pausePopupInstance.pausePopupContainer.setVisible(true);
    }
    //Game Over Functionality Handle
    GameOverFunc() {
        this.isgameOver = true;
        this.basketBallInstance.ball.body.timeScale = 1;
        this.basketBallInstance.ball.setMass(window.innerHeight / 128)
        this.pausePopupInstance.popupbg.setVisible(true);
        this.pausePopupInstance.pausePopupContainer.list[1].setVisible(false);
        this.pausePopupInstance.pausePopupContainer.list[2].setText(this.basketInstance.score).setVisible(true);
        this.pausePopupInstance.pausePopupContainer.setVisible(true);
        Constant.timeToEnd = Server.timerValue;
    }
    MobileGameOverFunc() {
        this.isgameOver = true;
        this.basketBallInstance.ball.body.timeScale = 1;
        this.basketBallInstance.ball.setMass(window.innerHeight / 128);
        this.pauseBut.button.setVisible(false);
    }
    //Joint Both BasketNet on Basket
    AddConstraint() {
        let newScale = Utils.getScale(1080, 1920, window.innerWidth, window.innerHeight);
        let offsetWidth = 0;
        let offsetWidthWithoutScale = 0;
        for (let i = 0; i < 7; i++) {
            const body1 = this.rightBasketNet.cloth.bodies[i];
            const body2 = this.leftBasketNet.cloth.bodies[i];
            let rightJoint = this.matter.add.constraint(body1, this.basketInstance.basketFrontPiece1, 0, 1, { pointA: { x: (-75 * newScale) + offsetWidth, y: this.constraintYCordinate[i] * newScale } });
            let leftJoint = this.matter.add.constraint(body2, this.basketInstance.basketFrontPiece2, 0, 1, { pointA: { x: (-75 * newScale) + offsetWidth, y: this.constraintYCordinate[i] * newScale } });
            let rightJointPointA = { x: -75 + offsetWidthWithoutScale, y: this.constraintYCordinate[i] };
            let leftJointPointA = { x: -75 + offsetWidthWithoutScale, y: this.constraintYCordinate[i] };
            this.constraintArray.push(rightJoint, leftJoint);
            this.constraintArrayPointA.push(rightJointPointA, leftJointPointA);
            offsetWidth += 25 * newScale;
            offsetWidthWithoutScale += 25;
        }
        // console.log(this.constraintArray);
    }
    //Net Joint resize
    ConstraintResize(newScale) {
        for (let i = 0; i < this.constraintArray.length; i++) {
            this.constraintArray[i].pointA = { x: this.constraintArrayPointA[i].x * newScale, y: this.constraintArrayPointA[i].y * newScale };
        }
    }
    //Right Net Body Resize 
    RightNetBodyResize(newScale) {
        let scaleChange = newScale - this.previousScale;
        let rightNetConstraint = this.rightBasketNet.cloth.constraints;
        for (let i = 0; i < rightNetConstraint.length; i++) {
            let lengthChange = rightNetConstraint[i].length * scaleChange;
            rightNetConstraint[i].length += lengthChange;
        }
    }
    //Left Net Body Resize
    LeftNetBodyResize(newScale) {
        let scaleChange = newScale - this.previousScale;
        let leftNetConstraint = this.leftBasketNet.cloth.constraints;
        for (let i = 0; i < leftNetConstraint.length; i++) {
            let lengthChange = leftNetConstraint[i].length * scaleChange;
            leftNetConstraint[i].length += lengthChange;
        }
    }
    CallTheScoreSendAPI() {
        if (getMobileOperatingSystem() == "Android") {
            this.MobileGameOverFunc();
            // console.log("The score........................" + this.basketInstance.score.toString());
            sendMessage("The Game End..................................");
            sendMessage(this.basketInstance.score.toString());
        } else if (getMobileOperatingSystem() == "iOS") {
            this.MobileGameOverFunc();
            let postdata = {
                score: this.basketInstance.score.toString(),
            };
            let postmessage = JSON.stringify(postdata);
            window.webkit.messageHandlers.jsHandler.postMessage(postmessage);
            window.webkit.messageHandlers.jsHandler.postMessage("The Game End.............");
        }
        else {

            this.GameOverFunc();
        }

    }
    resize(newWidth, newHeight) {
        this.resizeCount++;
        let newScale = Utils.getScale(1080, 1920, newWidth, newHeight);
        this.matter.world.setBounds(- newWidth, 0, 4 * newWidth, newHeight - (96 * newScale), 200 * newScale, false, false, false, true);
        this.bg.setDisplaySize(newWidth, newHeight);
        this.planeBg.setScale(newScale);
        let y = newHeight - 96 * newScale;
        this.planeBg.setPosition(0, y);
        let currentHeight = this.planeBg.displayHeight;
        this.planeBg.setDisplaySize(newWidth, currentHeight);
        this.basketBallInstance.resize(newWidth, newHeight, newScale);
        this.pauseBut.SetScale(newScale);
        this.pauseBut.SetPosition(newWidth - 98 * newScale, 192 * newScale);
        this.pausePopupInstance.resize(newWidth, newHeight, newScale);
        this.basketInstance.resize(newWidth, newHeight, newScale);
        this.bridgeCreate.clock.setScale(newScale);
        this.bridgeCreate.clock.setPosition(newWidth / 2, 100 * newScale);
        if (this.resizeCount > 2) {
            this.ConstraintResize(newScale);
            this.RightNetBodyResize(newScale);
            this.LeftNetBodyResize(newScale);
        }
        this.previousScale = newScale;
    }
    update() {
        //Ball Shadow Control
        if (!this.isGamePause && !this.isgameOver) {
            this.basketBallInstance.OnUpdate();
        }
        this.basketBallInstance.ShadowEffect();
        this.rightBasketNet.OnUpdate();
        this.leftBasketNet.OnUpdate();
    }
}
