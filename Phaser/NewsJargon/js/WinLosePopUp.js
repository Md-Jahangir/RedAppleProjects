import { Global } from "./Global.js";
import MCQ from "./MCQ.js";
class WinLosePopUp{
    constructor(scene)
    {
        this.scene = scene;
        // this.rightAnim;
        this.wrongAnim;
        this.continueButton;
        this.popUpBg;
        this.continueText;
        this.mcq = new MCQ(this);
        this.winLoseContainer;
        this.happyAnim;
        this.sadAnim;
        // this.CreateWinLoseAssets();
        console.log("WinLosePopUp");
    }
    CreateWinLoseAssets()
    {
        console.log('scene : ',this.scene);
        this.winLoseContainer = this.scene.add.container(0,0);
        this.popUpBg = this.scene.add.image(game.config.width/2,game.config.height/2,'background');
        let mcqResult = Global.GetMcqAnswerData();
        console.log('mcq res : ',mcqResult);
        console.log(' json : ',this.scene.jsonObj);

        this.continueButton = this.scene.add.image(game.config.width/1.07,game.config.height/1.04,'line_base').setInteractive();
        let continueTextStyle =  { fontFamily: 'Arial', fontSize: '42px', fill: '#fff', fontStyle: 'bold', align: 'left' };
        this.continueText = this.scene.add.text(game.config.width/1.07,game.config.height/1.04,'continue',continueTextStyle).setOrigin(0.5);
        this.continueButton.on('pointerdown',this.OnContinueButtonPressed,this);
        this.continueButton.on('pointerup',this.OnContinueButtonReleased,this);

        this.winLoseContainer.add(this.popUpBg);
        this.winLoseContainer.add(this.continueButton);
        this.winLoseContainer.add(this.continueText);
        if(mcqResult == this.scene.jsonObj.Questions[this.mcq.answerCount].answer)
        {
            this.happyAnim = this.scene.add.image(game.config.width/2,game.config.height/2,'thumbs_up').setOrigin(0.5);
            this.winLoseContainer.add(this.happyAnim);
        }
        else
        {
            this.sadAnim = this.scene.add.image(game.config.width/2,game.config.height/2,'thumbs_down').setOrigin(0.5);
            this.winLoseContainer.add(this.sadAnim);
        }
    }
    OnContinueButtonPressed()
    {
       console.log('on click event call');
       this.scene.uipanel.ScaleDownTween(this.continueButton);
    }
    OnContinueButtonReleased()
    {
        this.scene.uipanel.ScaleUpTween(this.continueButton);
        this.winLoseContainer.setVisible(false);
        this.mcq.answerCount++;
        console.log("The answerCounter.................."+this.mcq.answerCount);
        this.mcq.SetQuestionFormat();
        console.log('on release button call')
    }
}
export default WinLosePopUp;