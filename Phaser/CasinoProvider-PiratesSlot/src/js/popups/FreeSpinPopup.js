import { Constant } from "../Constant";
import { Model } from "../Model";
import { SoundManager } from "../SoundManager";
class FreeSpin {
    constructor(scene) {
        this.scene = scene;
        this.freeSpinContainer = null;
        this.freeGamesValue = null;
        this.freeSpinCounter = null;
        this.isFreeSpinsMode = false;
        this.create();
    }
    create() {
        this.CreateFreeSpinPopup();
    }
    CreateFreeSpinPopup() {
        let fontStyle = { fontFamily: 'kingsandpirates-peak', fontSize: '50px', fill: '#e9f274', fontStyle: 'normal', align: 'center' };
        let fontStyle1 = { fontFamily: 'kingsandpirates-peak', fontSize: '30px', fill: '#fff', fontStyle: 'normal', align: 'center' };
        this.freeSpinContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.freeSpinContainer.depth = 8;
        this.descriptionBg = this.scene.add.image(0, 0, 'free_spin_popup_bg').setScale(1).setInteractive({ useHandCursor: true });
        this.freeSpinAnims = this.scene.add.spine(0, 0, 'spine_free_spin').setScale(1);
        this.freeSpinGameValueText = this.scene.add.text(this.descriptionBg.x + 155, this.descriptionBg.y - 200, this.freeGamesValue, fontStyle).setScale(1);
        this.tapToValueText = this.scene.add.text(this.descriptionBg.x - 225, this.descriptionBg.y + 500, 'Click Anywhere To Start', fontStyle1).setScale(1);
        this.freeSpinContainer.add([this.descriptionBg, this.freeSpinAnims, this.freeSpinGameValueText, this.tapToValueText]);
        this.TweenTexts(this.tapToValueText);
        this.descriptionBg.on('pointerdown', this.FreeSpinPopupPressed, this);
        this.descriptionBg.on('pointerup', this.FreeSpinPopupReleased, this);
        this.HideFreeSpinPopup();
    }
    TweenTexts(refImage) {
        this.tapToPlayTween = this.scene.add.tween({
            targets: [refImage],
            alpha: 0,
            ease: 'Linear',
            duration: 500,
            yoyo: true,
            repeat: -1
        });
        this.tapToPlayTween.pause();

    }

    FreeSpinPopupPressed() {
        this.PlayDisappearFreeSpin();
    }
    FreeSpinPopupReleased() {
        this.isFreeSpinsMode = true;
        this.freeSpinCounter = this.freeGamesValue;
        this.HideFreeSpinPopup();
        this.scene.bottomPanel.CheckGameMode();
        // this.scene.game.events.emit("evtPaylinesShowingDone");
        // Constant.game.events.emit("evtAutoGameStarted", this.freeGamesValue);
    }
    ShowFreeSpinPopup(_freeGamesValue) {
        this.freeGamesValue = _freeGamesValue;
        setTimeout(() => {
            this.freeSpinGameValueText.setText(this.freeGamesValue);
        }, 600);
        this.descriptionBg.setVisible(true);
        this.freeSpinGameValueText.setVisible(true);
        this.tapToValueText.setVisible(true);
        this.freeSpinAnims.setVisible(true);
        this.tapToPlayTween.resume();
        this.PlayFreeSpinLoopAnim();
    }
    HideFreeSpinPopup() {
        this.descriptionBg.setVisible(false);
        this.tapToPlayTween.pause();
        this.freeSpinGameValueText.setVisible(false);
        this.tapToValueText.setVisible(false);
        this.freeSpinAnims.setVisible(false);
    }
    PlayFreeSpinLoopAnim() {
        this.freeSpinAnims.play('appear', false);
        this.freeSpinAnims.once('complete', () => {
            this.freeSpinAnims.play('loop', true);
        })
    }
    PlayDisappearFreeSpin() {
        this.freeSpinAnims.play('disappear', false);
    }

    onFreeSpin() {
        let listOfFreeSpins = Model.getFreeSpinsData();
        if (listOfFreeSpins.length > 0 && this.freeSpinCounter >= 0 && this.isFreeSpinsMode) {
            SoundManager.SpinButtonClickSound();
            if (this.freeSpinCounter == 1) {
                this.isFreeSpinsMode = false;
            }
            this.scene.bottomPanel.UpdateFreeSpinCounter(this.freeSpinCounter -1 );
            let newGrid = listOfFreeSpins[this.freeSpinCounter -1 ].grid;
            for (let index = 0; index < newGrid.length; index++) {
                let symbolsArray = Model.GetSymbols();
                newGrid[index].unshift(symbolsArray[Math.floor(Math.random() * (11 - 0) + 0)]);
                newGrid[index].push(symbolsArray[Math.floor(Math.random() * (11 - 0) + 0)]);
            }
            Model.SetNewGrid(newGrid);
            Model.setWonPaylines(listOfFreeSpins[this.freeSpinCounter -1 ].wonPaylines);
            Model.setLastWin(listOfFreeSpins[this.freeSpinCounter -1 ].lastWin);
            this.scene.game.events.emit("evtSpinStart");
            listOfFreeSpins.pop(listOfFreeSpins[this.freeSpinCounter -1 ]);
            setTimeout(() => {
                this.scene.reelsView.onSpinStop();
            }, 3000);
            this.freeSpinCounter--;

        } else {

            this.HideTotalWin();
        }
    };
}
export default FreeSpin;