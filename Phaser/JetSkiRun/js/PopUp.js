
/*@Original_Creator : - Supriyo_Mukherjee.
@Created_Date : - 10 - 12 - 2022.
@Last_Update_By : - Supriyo_Mukherjee.
@Last_Updatd_Date : - 26 - 12 - 2022
@Description : - A pop up called when game is over */


// importing the game scene to get the data like coin number distance these values to be shown

import GameScene from "./GameScene.js";
class PopUp {
    constructor(scene) {
        this.scene = scene;
        this.onePixelBg;
        this.popUpBg;
        this.gameOver;
        this.exitBtn;
        this.retryTxt;
        this.popUpContainer;

        //game data
        this.coin;
        this.DistanceOccupied;
        this.BestScore;
        this.showPopUpTween;
    };

    // from here i am calling the PopUpCointainerInfo method 
    CreatePopUp() {
        this.PopUpCointainerInfo();
    }
    /*
      this method is called from GameScene.js
      and taking @{parameter} as _coin or the collected coin by the player in its entire game
      */
    GameCoinInfo(_coin) {
        this.coin = _coin;
        // console.log('coin', this.coin);
    }

    /*    this method is called from GameScene.js
    and taking @{parameter} as _distance or the distance covered by the player in its entire game
    */
    IndividualDistanceOccupied(_distance) {
        this.DistanceOccupied = _distance;
        // console.log('distance : ', _distance);
    }
    // BestScoreOfIndividuals(_bestScore) {
    //     this.BestScore = _bestScore;
    //     console.log('_bestScore', _bestScore);
    // }

    // here i am creating the pop up ui for the game
    PopUpCointainerInfo() {
        this.gameScene = new GameScene(this);
        this.onePixelBg = this.scene.add.image(960, 540, 'white').setOrigin(0.5).setScale(650, 650).setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
        // this.onePixelBg.on('pointerdown', this.OnBgClicked, this);
        const ballBreakTextStyle = { font: "bold 60px CCBellyLaugh", stroke: '#fff', strokeThickness: 6, fill: "#458298" };
        this.gameOver = this.scene.add.text(960, 330, 'GAME OVER', ballBreakTextStyle).setOrigin(0.5);
        this.exitBtn = this.scene.add.image(960, 800, 'white').setScale(160, 70).setInteractive().setTint(0xff00ff);
        this.exitBtn.on('pointerdown', this.OnExitButtonPressed, this);
        let retryTxtStyle = { font: "bold 20px CCBellyLaugh", stroke: '#fff', strokeThickness: 6, fill: "#458298" };
        this.retryTxt = this.scene.add.text(960, 800, 'Retry', retryTxtStyle).setScale(2).setOrigin(0.5);

        const textStyle = { font: "bold 60px CCBellyLaugh", stroke: '#fff', strokeThickness: 6, fill: "#458298" };

        console.log('this.coin ', this.coin);
        console.log('this.DistanceOccupied ', this.DistanceOccupied);
        console.log('this.BestScore ', this.BestScore);
        if (this.BestScore == undefined) {
            this.BestScor = 0
        }

        let coinText = this.scene.add.text(749, 448, 'coin        :       ' + this.coin, textStyle);
        let distanceText = this.scene.add.text(749, 548, 'distance :       ' + this.DistanceOccupied, textStyle);

        this.popUpContainer = this.scene.add.container(0, 0, [this.onePixelBg, this.gameOver, coinText, distanceText, this.exitBtn, this.retryTxt]);
        this.popUpContainer.setDepth(4);
        this.popUpContainer.setPosition(-1700, 0);
    }

    //on exit button press game will be start again
    OnExitButtonPressed() {
        console.log("hidePopup", this.scene);
        this.HidePopup();
        this.exitBtn.setScale(0.7);
    }

    // by calling this method pop up used to be shown
    ShowPopup() {
        // this.popUpContainer.setVisible(true);
        this.showPopUpTween = this.scene.add.tween({
            targets: this.popUpContainer,
            x: 0,
            y: 0,
            ease: 'linear',
            duration: 200,
            onComplete: function (tween) {
                // if (_ball != null) {
                //     _ball.destroy();
                //     console.log('destroy on complete');
                // }
                console.log('tween complete')
            }
        })
    }
    // by calling this method pop up will be removed
    HidePopup() {
        this.popUpContainer.setVisible(false);
        this.scene.isGameOver = false;
        game.scene.stop('GameScene');
        game.scene.start('GameScene');
    }

}
export default PopUp;