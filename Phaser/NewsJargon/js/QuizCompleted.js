import { Global } from "./Pattern/Global.js";
class QuizCompleted {
    constructor(scene) {
        this.scene = scene;
        this.quizCompleteContainer = null;
        this.base = null;
        this.overlay = null;
        this.messageText = null;
    }
    create() {
        console.log("quiz Completed")
        this.QuizCompletedPopup();
    }
    QuizCompletedPopup() {

        this.overlay = this.scene.add.image(Math.round(game.config.width / 2), Math.round(game.config.height / 2), 'one_pixel').setOrigin(0.5).setScale(3000, 3000).setAlpha(0.001);
         this.overlay.setInteractive({cursor : 'pointer'});



        let messageTextStyle = { fontFamily: 'Roboto_Regular', fontSize: '60px', fill: '#c16615', fontStyle: 'normal', align: 'center' };
        this.messageText = this.scene.add.text(game.config.width/2, game.config.height/2, "Play Again", messageTextStyle).setOrigin(0.5);
        this.messageText.setInteractive();
        this.messageText.setVisible(true);


        this.overlay.on('pointerdown', this.onButtonRelease, null, this);
        this.overlay.on('pointerup', this.HideAlertPopup, null, this);
        // this.ShowQuizCompletePopup();
    }


    HideAlertPopup() {
        let alphaTween = this.scene.add.tween({
            targets: [this.quizCompleteContainer],
            alpha: 0,
            ease: 'Linear',
            duration: 200,
            callbackScope: this,
            onComplete: function (tween) { 
               this.messageText.setVisible(false);
               this.messageText.disableInteractive();
                this.scene.scene.restart('GameScene');
                // this.quizCompleteContainer.destroy();
                
            }
        });
        // console.log("scene: ", this.scene)

    }

  
    onButtonRelease(){}
}
export default QuizCompleted;