/* global Phaser */

/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 24-04-2025.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 28-04-2025
 * @Description :- Game Tutorial.
 ************************************/

import { Constant } from "../Constant";
import ButtonTween from "../game_objects/ButtonTween";
import gsap from "gsap";
import { AudioManager } from "../media/AudioManager";

class TutorialPopup {
    constructor(scene) {
        this.scene = scene;
        this.tutorialPopupContainer = null;
        // this.losePopupContainer = null;

        this.CreateTutorialPopup();
        this.nxtClickCount = 0;
        this.HideTutorialPopup();
        // this.HideLosePopup();
    }

    CreateTutorialPopup() {
        this.overlayHLed = this.scene.add.image(0, 0, 'overlay').setOrigin(0.5).setInteractive().setDepth(6);
        this.tutorialPopupContainer = this.scene.add.container().setDepth(6)//.setDepth(2);

        let fontTextStyle = { fontFamily: 'Lalezar-Regular', fontSize: '30px', fill: '#ffffff', align: 'center' };
        let text = 'This is the Turn Bar, Choose 1 number out of the 3 to play it as your turn on the board';
        this.tutTxt = this.scene.add.text(0, 0, text, fontTextStyle).setOrigin(0.5);
        this.refImg = this.scene.add.image(0, this.tutTxt.y - 150, 'game_obj', 'ref_score_base').setOrigin(0.5).setVisible(false);
        this.tutorialPopupContainer.add([this.tutTxt, this.refImg]);

        this.scene.turnChainContainer.setDepth(7);

        //Top Panel
        this.topTutPanelContainer = this.scene.add.container().setDepth(6);
        fontTextStyle = { fontFamily: 'Lalezar-Regular', fontSize: '40px', fill: '#ffffff', align: 'center' };
        text = 'Read Rules';
        this.rulesTxt = this.scene.add.text(405, 0, text, fontTextStyle).setOrigin(0.5);
        fontTextStyle = { fontFamily: 'Lalezar-Regular', fontSize: '40px', fill: '#ffffff', align: 'center' };
        text = 'SKIP';
        this.skipTxt = this.scene.add.text(this.rulesTxt.x + 50, this.rulesTxt.y + 150, text, fontTextStyle).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.topTutPanelContainer.add([this.rulesTxt, this.skipTxt]);

        //Bottom Panel
        this.bottomTutPanelContainer = this.scene.add.container().setDepth(6);
        this.nxt = this.scene.add.image(470, 370, 'ui', 'next_2').setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.bottomTutPanelContainer.add(this.nxt);
        console.log("bottm cont", this.bottomTutPanelContainer);

        this.nxt.on('pointerup', this.OnClickingNext, this);
        this.skipTxt.on('pointerup', this.OnClickingSkip, this);

    }

    OnClickingNext() {
        this.btnTween = new ButtonTween(this.scene, this.nxt);
        AudioManager.PlayButtonPressAudio();
        this.btnTween.btnTween.once('complete', () => {
            this.nxtClickCount++;
            this.ChangeTutorial();
        });
    }

    OnClickingSkip() {
        this.btnTween = new ButtonTween(this.scene, this.skipTxt);
        AudioManager.PlayButtonPressAudio();
        this.btnTween.btnTween.once('complete', () => {
            this.scene.turnChainContainer.setDepth(4);
            this.HideTutorialPopup();
            this.scene.ShowTurn();
        });

    }

    ChangeTutorial() {
        switch (this.nxtClickCount) {
            case 1: this.scene.turnChainContainer.setDepth(4);
                this.scene.bottomUIContainer.setDepth(7);
                this.tutTxt.setText('This area shows all the upcoming turns that will \nbe available to you throughout your play.');

                break;

            case 2: this.scene.bottomUIContainer.setDepth(1);
                this.scene.playerContainer.setDepth(7);
                this.tutTxt.setText('This is your current score in the game.');
                this.refImg.setVisible(true);

                break;

            case 3:
                this.tutTxt.setText('This is the Turn Timer, Every time it is your turn \nyou will get 15secs to select before it is \nconsidered a “skip”');
                this.refImg.setTexture('game_obj', 'ref_timer');

                break;

            case 4:
                this.tutTxt.setText('This Indicates the number of times you can skip \nyour turn, You can skip a total of 3 Turns before \ngame is over.\nIf you skip 3 times you will automatically lose.');
                this.refImg.setTexture('game_obj', 'ref_life');

                break;

            case 5: this.scene.playerContainer.setDepth(1);
                this.scene.skipBtnContainer.setDepth(7);
                this.tutTxt.setText('This is the Skip Button.\nThe Game Allows you to skip in 2 ways.\nYou will get 3 Free skips per game.');
                this.refImg.setVisible(false);

                break;

            case 6:
                this.scene.skipBtnContainer.setDepth(1);
                this.scene.turnChainContainer.setDepth(7);
                this.tutTxt.setText('Number Skip.\nIf you dont like the numbers and want to make \nspace for the next number, you can skip and \ndiscard a number of choice.');
                // this.refImg.setVisible(false);

                break;

            case 7:
                // this.scene.turnChainContainer.setDepth(7);

                this.tutTxt.setText('Number Skip.\nTo Skip, Press the Skip button and then the \nnumber you want to \ndiscard from the turn bar to discard it.');
                // this.refImg.setVisible(false);
                this.HighlightTurnChain();

                break;

            case 8:
                this.tutTxt.setText('Number Skip.\nThe number will be discarded and the next \nnumber in the list will take it’s place.');
                if (this.skipHL) {
                    this.skipHL.kill();
                    this.skipHL = null;
                    // this.playerPawn.setPosition(this.finalXPos, this.finalYPos);
                    this.scene.turnChainArr[2].setAlpha(1);
                    this.scene.turnChainArr[2].setVisible(false);
                    this.scene.turnChainNumArr[2].setVisible(false);
                }

                break;

            case 9: this.scene.turnChainContainer.setDepth(4);
                this.scene.skipBtnContainer.setDepth(7);
                this.scene.turnChainArr[2].setVisible(true);
                this.scene.turnChainNumArr[2].setVisible(true);
                this.tutTxt.setText('Turn Skip.\nAdditionally 1 skip is also when not not playing \nyour move.');

                break;

            case 10:
                this.tutTxt.setText('Turn Skip.\nOn 3rd skip, the game is considered over.');

                break;

            default: this.scene.turnChainContainer.setDepth(4);
                this.HideTutorialPopup();
                this.scene.ShowTurn();

                break;
        }
    }

    HighlightTurnChain() {
        this.skipHL = gsap.to(this.scene.turnChainArr[2], {
            duration: 0.2,
            alpha: 0,
            yoyo: true,
            repeat: -1,
            ease: 'expo.inOut', // Smooth easing
            // stagger: 0.15,
        });
    }

    HideTutorialPopup() {
        this.nxtClickCount = 0;
        this.scene.bottomUIContainer.setDepth(1);
        this.scene.playerContainer.setDepth(1);
        this.scene.skipBtnContainer.setDepth(1);
        this.scene.turnChainArr[2].setAlpha(1);
        this.scene.turnChainArr[2].setVisible(true);
        this.scene.turnChainNumArr[2].setVisible(true);
        if (this.skipHL) {
            this.skipHL.kill();
            this.skipHL = null;
        }
        this.overlayHLed.setVisible(false);
        this.tutorialPopupContainer.setVisible(false);
        this.topTutPanelContainer.setVisible(false);
        this.bottomTutPanelContainer.setVisible(false);
    }

    ShowTutorialPopup() {
        this.overlayHLed.setVisible(true);
        this.tutorialPopupContainer.setVisible(true);
        this.topTutPanelContainer.setVisible(true);
        this.bottomTutPanelContainer.setVisible(true);
    }

    ResizeTutorialPopupContainer(_newWidth, _newHeight, newScale) {
        this.overlayHLed?.setDisplaySize(_newWidth, _newHeight);
        this.overlayHLed?.setPosition(
            _newWidth / 2,
            _newHeight / 2
        );

        this.tutorialPopupContainer?.setScale(newScale);
        this.tutorialPopupContainer?.setPosition(_newWidth / 2, _newHeight / 2);

        this.topTutPanelContainer?.setScale(newScale);
        this.topTutPanelContainer?.setPosition(_newWidth / 2, 105 * newScale);

        this.bottomTutPanelContainer?.setScale(newScale);
        this.bottomTutPanelContainer?.setPosition(_newWidth / 2,
            _newHeight - 540 * newScale);
    }
}

export default TutorialPopup;