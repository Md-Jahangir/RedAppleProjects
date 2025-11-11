import Ball from "./Ball";
import { Utils } from "../Utils";
import { SelectedResolution } from "../ResolutionSelector";
export default class Tube {
    constructor(scene, selectedNumber) {
        this.scene = scene;
        this.pipeBallArray = [];
        this.pipePreviewBallArray = [];
        this.pipeBallArrayPos = [];
        this.pipeballCounter = 0;
        this.selectedNumber = selectedNumber;
        this.config = this.scene.cache.json.get("game-config").tube;

        this.newScaleGlobal = null;
        this.newWidthGlobal = null;
        this.newHeightGlobal = null;

        this.create();
    }
    create() {
        this.CreateMaskForPipeBall();
        this.CreateMaskForPipePreviewball();
        this.CreatePipeBalls();
        this.CreatePipePreviewBalls();
        this.CreateTubeTextures();
        this.CreateContainerCountDown();
    }
    CreateMaskForPipeBall() {

    }
    CreateMaskForPipePreviewball() {

    }
    CreatePipeBalls() {
        for (let index = 0; index < 7; index++) {
            let getRandomFrames = Math.floor(Math.random() * 5);
            this.pipeBall = new Ball(this.scene, 'ball', getRandomFrames);
            this.pipeBallArray.push(this.pipeBall);
        }
    }
    CreatePipePreviewBalls() {
        let getRandomFrames = Math.floor(Math.random() * 5);
        this.pipePreviewBall = new Ball(this.scene, 'ball_preview', getRandomFrames);
        this.pipePreviewBallArray.push(this.pipePreviewBall);
    }
    CreateTubeTextures() {
        this.tubeExtractorTexture = this.scene.add.image(0, 0, 'tube').setOrigin(0).setDepth(1);
        this.tubeStripTexture = this.scene.add.image(0, 0, 'tube_strip').setOrigin(0).setAlpha(1);
        this.numberExtractorTexture = this.scene.add.image(0, 0, 'number_extract_bg').setOrigin(0);
    }
    DrawNextBall(numberExtracted, callback, callbackContext) {
        if (numberExtracted == undefined) return;
        this.counter = 0;
        for (var i = 0; i < this.pipeBallArray.length; i++) {
            if (this.pipeBallArray[i].y > this.tubeStripTexture.y) {
                // this.pipeBallArray[i].setMask(mask);
                let newX = this.pipeBallArray[i].x + this.pipeBallArray[i].getDisplayHeight();
                // console.log("new x: ", newX);
                this.pipeBallArray[i].MoveX(newX, this.UpdateCurrBall.bind(this, callback, callbackContext), this);

            } else {
                let newY = this.pipeBallArray[i].y + this.pipeBallArray[i].getDisplayHeight();
                let text = "";
                if (newY > this.tubeStripTexture.y) {
                    text = numberExtracted;
                }
                this.pipeBallArray[i].MoveY(newY, text, this.UpdateCurrBall.bind(this, callback, callbackContext), this);
            }
        }
        this.GenerateNewBall();
    }
    DrawNextPreviewBall(numberExtracted, callback, callbackContext) {
        this.previewCounter = 0;
        for (var i = 0; i < this.pipePreviewBallArray.length; i++) {
            console.log(' this.pipePreviewBallArray', this.pipePreviewBallArray.length, this.pipePreviewBallArray[i].x, this.numberExtractorTexture.x);
            if (this.pipePreviewBallArray[i].x > this.numberExtractorTexture.x) {
                // this.pipePreviewBallArray[i].setMask(mask);
                let newX = this.pipePreviewBallArray[i].x + this.pipePreviewBallArray[i].getDisplayWidth();
                console.log('newX', newX);
                this.pipePreviewBallArray[i].MoveX(newX, this.UpdateCurrPreviewBall.bind(this, callback, callbackContext), this);
            }
        }
        this.GenerateNewPreviewBall();
    }
    GenerateNewBall() {
        let getRandomFrames = Math.floor(Math.random() * 5);
        // let newScale = Utils.getScale(SelectedResolution.width, SelectedResolution.height, window.innerWidth, window.innerHeight);
        this.pipeBall = new Ball(this.scene, 'ball', getRandomFrames);
        // this.pipeBall.Resize(window.innerWidth / 2 - this.config.pipe.pipeBallX, this.config.pipe.pipeBallY + 6 * (-this.pipeBallArray[0].getDisplayHeight()) - 20, newScale);
        this.pipeBall.Resize(this.tubeExtractorTexture.x + 58 * this.newScaleGlobal, this.tubeExtractorTexture.y - 90 * this.newScaleGlobal, this.newScaleGlobal)
        this.pipeBallArray.push(this.pipeBall);
        // this.ResizePipeBalls(this.newWidthGlobal, this.newHeightGlobal, this.newScaleGlobal);
    }
    GenerateNewPreviewBall() {
        console.log('this.pipePreviewBallArray', this.pipePreviewBallArray);
        let getRandomFrames = Math.floor(Math.random() * 5);
        let newScale = Utils.getScale(SelectedResolution.width, SelectedResolution.height, window.innerWidth, window.innerHeight);
        let pipePreviewBall = new Ball(this.scene, 'ball_preview', getRandomFrames);
        pipePreviewBall.Resize(window.innerWidth / 2 - this.config.pipe.pipePreviewBallX, this.config.pipe.pipePreviewBallY + (-this.pipePreviewBallArray[0].getDisplayWidth()), newScale);
        this.pipePreviewBallArray.push(pipePreviewBall);
    }
    UpdateCurrBall(callback, callbackContext) {
        this.counter++;
        if (this.counter == this.pipeBallArray.length) {

            if (this.pipeBallArray[0].x >= this.tubeExtractorTexture.x + this.pipeBallArray[0].getDisplayHeight() * 4) {
                this.pipeBallArray[0].Remove();
                this.pipeBallArray.splice(0, 1);
            } else {
                //  this._iFirstBallOutOfTube++;
            }
            setTimeout(() => {
                callback.call(callbackContext);
            }, 500);
        }
    }
    UpdateCurrPreviewBall(callback, callbackContext) {
        this.previewCounter++;
        console.log('this.previewCounter', this.previewCounter);
        if (this.previewCounter == this.pipePreviewBallArray.length) {
            console.log('this.pipeBallArray[0]', this.pipePreviewBallArray[0].x, this.numberExtractorTexture.x + this.pipePreviewBallArray[0].getDisplayWidth());
            if (this.pipePreviewBallArray[0].x > this.numberExtractorTexture.x + this.pipePreviewBallArray[0].getDisplayWidth() * 2) {
                this.pipePreviewBallArray[0].Remove();
                this.pipePreviewBallArray.splice(0, 1);
            } else {
                //  this._iFirstBallOutOfTube++;
            }
            setTimeout(() => {
                callback.call(callbackContext);
            }, 500);
        }
    }

    CreateContainerCountDown() {
        this.totalSelectedNumbers = this.scene.add.text(
            0,
            0,
            '/' + ' ' + this.selectedNumber, {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '30px',
            color: '#fff'
        }
        ).setOrigin(0.5);
        this.countDownText = this.scene.add.text(
            0,
            0,
            '', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '30px',
            color: '#fff'
        }
        ).setOrigin(0.5);
    }
    SetCountdownText(_counter) {
        this.countDownText.setText(_counter);
    }

    Resize(newWidth, newHeight, newScale) {
        this.newScaleGlobal = newScale;
        this.newWidthGlobal = newWidth;
        this.newHeightGlobal = newHeight;

        this.tubeExtractorTexture.setScale(newScale);
        this.tubeExtractorTexture.setPosition(newWidth / 2 + this.config.pipe.x * newScale, this.config.pipe.y * newScale);

        this.numberExtractorTexture.setScale(newScale);
        this.numberExtractorTexture.setPosition(newWidth / 2 + this.config.container.x * newScale, this.config.container.y * newScale);

        this.tubeStripTexture.setScale(newScale);
        this.tubeStripTexture.setPosition(this.tubeExtractorTexture.x + this.config.strip.x * newScale, this.tubeExtractorTexture.y + this.config.strip.y * newScale);

        this.totalSelectedNumbers.setScale(newScale);
        this.totalSelectedNumbers.setPosition(this.numberExtractorTexture.x + this.config.numbers_to_draw.x * newScale, this.numberExtractorTexture.y + this.config.numbers_to_draw.y * newScale);
        this.countDownText.setScale(newScale);
        this.countDownText.setPosition(this.numberExtractorTexture.x + this.config.count_down.x * newScale, this.numberExtractorTexture.y + this.config.count_down.y * newScale);
        this.ResizePipeBalls(newWidth, newHeight, newScale);
        this.ReizePipePreviewBalls(newWidth, newHeight, newScale);
    }
    ResizePipeBalls(newWidth, newHeight, newScale) {
        console.log("ResizePipeBalls");
        for (let index = 0; index < this.pipeBallArray.length; index++) {
            // this.pipeBallArray[index].Resize(newWidth / 2 - this.config.pipe.pipeBallX, this.config.pipe.pipeBallY + index * (-this.pipeBallArray[index].getDisplayHeight()) - 20, newScale)
            this.pipeBallArray[index].Resize(this.tubeExtractorTexture.x + 58 * newScale, this.tubeExtractorTexture.y + (330 - (index * 70)) * newScale, newScale)
        }
    }
    ReizePipePreviewBalls(newWidth, newHeight, newScale) {
        for (let index = 0; index < this.pipePreviewBallArray.length; index++) {
            // this.pipePreviewBallArray[index].Resize(newWidth / 2 - this.config.pipe.pipePreviewBallX, this.config.pipe.pipePreviewBallY + index * (-this.pipePreviewBallArray[index].getDisplayWidth()), newScale)
            this.pipePreviewBallArray[index].Resize(this.numberExtractorTexture.x + 115 * newScale, this.numberExtractorTexture.y + 95 * newScale, newScale)
        }
    }
    UpdatePositionOfPipeBallArray() {
        for (let index = this.pipeBallArray.length - 1; index >= 0; index--) {
            this.pipeBallArrayPos.pop();
        }
        for (let index = 0; index < this.pipeBallArray.length; index++) {
            let posObj = { x: this.pipeBallArray[index].x, y: this.pipeBallArray[index].y };
            this.pipeBallArrayPos.push(posObj);
        }
    }



}