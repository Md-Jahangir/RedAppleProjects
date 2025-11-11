import { Utils } from "../Utils.js";
import { SoundManager } from "../SoundManager.js";
import { Constant } from "../Constant.js";
import { Server } from "../Server.js";

class DrawNumberHits {

    constructor(scene) {
        this.scene = scene ;
        this.howManyNumbers = 80;
        this.numberImageNumberArray = [];
        this.numberImageArray = [];
        this.timerEvent = null;
        this.startTime = 65;
        this.mainBase;

        this.message = "PICK 1 TO 10 NUMBERS\n20 BALLS DRAWN\nFROM 80";
        this.nextDrawNumber = "78564"
        this.blinkNumberArray = ["8", "18", "35", "46", "57", "61", "73", "79"];//for testing
        this.previousDrawnNumberArray = [];
        this.usedNumbers = [];
        this.hotNumbersArray = [];
        this.coldNumbersArray = [];
        this.hotNumbers = [];
        this.coldNumbers = [];
        this.playHotNumbersAnims = [];
        this.playColdNumbersAnims = [];
    }

    init() {
    }
    preload() { }

    create() {
        this.GetHotAndColdDrawDataFromServer();
        this.CreateBackground();
        this.CreateBase();
        this.CreateNumberAndValue();
        this.CreateSoundOnOffButton();
        this.CreateFullScreenButton();
        this.CreateHotBase();
        this.CreateColdBase();
        this.CreateHotNumbers();
        this.CreateColdNumbers();
        this.ShowNumbers();
        this.HideDrawNumberHits();
    }
    async GetHotAndColdDrawDataFromServer(){
        try{
        let hotAndColdData = await Server.GetHotAndColdData();
        if(hotAndColdData.error){
            console.log("API call failed with error:", hotAndColdData.error);
        }else{
        for(let i = 0 ; i < hotAndColdData.hot_numbers.length;i++){
            this.hotNumbers.push(hotAndColdData.hot_numbers[i]);
        }
        for(let i = 0 ; i < hotAndColdData.cold_numbers.length;i++){
            this.coldNumbers.push(hotAndColdData.cold_numbers[i]);
        }
        this.SetHotNumbers();
        this.SetColdNumbers();
        // this.SetOccurenceNumbers();
    }
    } catch(error){
        console.log("API call failed with error:", error);
    }
    }
    CreateBackground() {
        this.bg = this.scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "background").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
    }

    CreateBase() {
        this.mainBase = this.scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "main_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let messageTextStyle = { fontFamily: 'Roboto_Medium', fontSize: '30px', fill: '#fff', fontStyle: 'normal', align: 'center', lineSpacing: 20, wordWrap: { width: Math.round(this.mainBase.width - 170) } };
        this.headingBg = this.scene.add.image(this.mainBase.x, this.mainBase.y - (300 * Constant.scaleFactor), "heading_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor * 1, Constant.scaleFactor);
        this.headingText = this.scene.add.text(this.mainBase.x, this.mainBase.y - (300 * Constant.scaleFactor), "Hits By The Numbers", messageTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
    };
    CreateNumberAndValue() {
        let startXPos = this.mainBase.x - (920 * Constant.scaleFactor);
        let startYPos = this.mainBase.y - (219 * Constant.scaleFactor);
        let gapX = 118;
        let gapY = 59;
        let col = 10;
        let row = 10;
        let counter = 1;
        let imageName = "";
        // let selectedImageName = "";
        for (let i = 0; i < col; i++) {
            for (let j = 0; j < row; j++) {
                if (counter > 50) {
                    imageName = "ball_base_type_2";
                } else {
                    imageName = "ball_base_type_1";
                }
                let xPos = startXPos + (j * gapX);
                let yPos = startYPos + (i * gapY);
                let ballContainer = this.scene.add.container();
                let numberBase = this.scene.add.image(xPos + (25 * Constant.scaleFactor), yPos, 'text_base').setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
                let ballImg = this.scene.add.image(xPos, yPos, imageName).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
                
              
                let numberBaseTextStyle = { fontFamily: 'Roboto_Regular', fontSize: '18px', fill: '#fff', fontStyle: 'normal', align: 'center' };
                let numberBaseText = this.scene.add.text(xPos + (35 * Constant.scaleFactor), yPos, '00', numberBaseTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
                let numberTextStyle = { fontFamily: 'Roboto_Regular', fontSize: '18px', fill: '#000', fontStyle: 'normal', align: 'center' };
                let numberText = this.scene.add.text(xPos, yPos, counter, numberTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
                this.scene.anims.create({
                    key: 'hotAnim',
                    frames: this.scene.anims.generateFrameNumbers('hot_anim', { start: 0, end: 5 }),
                    frameRate: 12,
                    repeat:-1,
                });
                let hotnumberBase = this.scene.add.sprite(xPos, yPos - (20 * Constant.scaleFactor), 'hot_anim').setOrigin(0.5, 0.5).setScale(Constant.scaleFactor * 0.8, Constant.scaleFactor * 0.8).setVisible(false);
                this.scene.anims.create({
                    key: 'coldAnim',
                    frames: this.scene.anims.generateFrameNumbers('cold_anim', { start: 0, end: 11 }),
                    frameRate: 12,
                    repeat:-1,
                    // hideOnComplete : true
                });
                let coldnumberBase = this.scene.add.sprite(xPos, yPos - (15 * Constant.scaleFactor), 'cold_anim').setOrigin(0.5, 0.5).setScale(Constant.scaleFactor * 0.8, Constant.scaleFactor * 0.8).setVisible(false);
                counter++;
                ballContainer.add([numberBase,ballImg , numberBaseText, numberText, hotnumberBase, coldnumberBase]);
                this.numberImageArray.push(ballContainer);
                // this.numberImageNumberArray.push(numberText);
            }
        }
        console.log("this.NumberImageArray: ", this.numberImageArray);
        console.log("this.NumberImageNumberArray: ", this.numberImageNumberArray);
    };



    GetRandomNumber() {

        let max = 80;
        let min = 1;
        const range = max - min + 1;
        if (this.usedNumbers.length >= range) {
            throw new Error('All possible numbers have been used.');
        }
        do {
            this.randomNumber = Math.floor(Math.random() * range) + min;
        } while (this.usedNumbers.includes(this.randomNumber));
        this.usedNumbers.push(this.randomNumber);

        return this.randomNumber;
    }

    ShowNumbers() {
        this.usedNumbers = [];
        for (let i = 0; i < 20; i++) {
            let randomNumber = this.GetRandomNumber();
            // console.log('Hotnumber', randomNumber);
            if (i < 10) {
                // this.VisibleHotNumbers(this.numberImageArray[randomNumber - 1]);
            } else {
                // this.VisibleColdNumbers(this.numberImageArray[randomNumber - 1]);
            }
        }
    }

    VisibleHotNumbers(_obj) {
        _obj.list[4].setVisible(false);
        _obj.list[4].play('hotAnim');
        this.playHotNumbersAnims.push(_obj.list[4]);
    }
    VisibleColdNumbers(_obj) {
        _obj.list[5].setVisible(false);
        _obj.list[5].play('coldAnim');
        this.playColdNumbersAnims.push(_obj.list[5]);
    }

    CreateHotBase() {
        this.rightHotBase = this.scene.add.image(this.mainBase.x + (600 * Constant.scaleFactor), this.mainBase.y - (130 * Constant.scaleFactor), "box_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor * 1, Constant.scaleFactor);
        // this.rightBaseLine =  this.scene.add.image(this.rightHotBase.x , this.rightHotBase.y - (20 * Constant.scaleFactor), "box_baseline").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor * 1, Constant.scaleFactor);
        let messageTextStyle = { fontFamily: 'Roboto_Bold', fontSize: '32px', fill: '#ffdd00', fontStyle: 'bold', align: 'right' };
        this.rightHotHeadingText = this.scene.add.text(this.rightHotBase.x, this.rightHotBase.y - (50 * Constant.scaleFactor), "Hot", messageTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
    }

    CreateColdBase() {
        this.rightColdBase = this.scene.add.image(this.mainBase.x + (600 * Constant.scaleFactor), this.mainBase.y + (150 * Constant.scaleFactor), "box_base").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor * 1, Constant.scaleFactor);
        //   this.rightBaseLine =  this.scene.add.image(this.rightColdBase.x , this.rightColdBase.y - (20 * Constant.scaleFactor), "box_baseline").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor * 1, Constant.scaleFactor);
        let messageTextStyle = { fontFamily: 'Roboto_Medium', fontSize: '32px', fill: '#fff', fontStyle: 'normal', align: 'center', lineSpacing: 20, wordWrap: { width: Math.round(this.rightColdBase.width - (170 * Constant.scaleFactor)) } };
        this.rightColdHeadingText = this.scene.add.text(this.rightColdBase.x, this.rightColdBase.y - (50 * Constant.scaleFactor), "Cold", messageTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
    }

    CreateHotNumbers() {
        let xPos = this.rightHotBase.x - (220 * Constant.scaleFactor);
        let imageName;
        for (let i = 0; i < 6; i++) {
            if (i < 3) {
                imageName = "ball_base_selected_type_2";
            } else {
                imageName = "ball_base_selected_type_1";
            }
            // this.anims.create({
            //     key: 'hotAnim',
            //     frames: this.anims.generateFrameNumbers('hot_anim', { start: 0, end: 5 }),
            //     frameRate: 12,
            //     repeat:-1,
            // });
            let hotContainer = this.scene.add.container();
            let ballImg = this.scene.add.image(xPos, this.rightHotBase.y + (60 * Constant.scaleFactor), imageName).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
            let numberTextStyle = { fontFamily: 'Roboto_Regular', fontSize: '18px', fill: '#000', fontStyle: 'normal', align: 'center' };
            let numberText = this.scene.add.text(xPos, this.rightHotBase.y + (60 * Constant.scaleFactor), "", numberTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
            let hotnumberBase = this.scene.add.sprite(xPos, this.rightHotBase.y + (30 * Constant.scaleFactor), 'hot_anim').setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
            hotnumberBase.play('hotAnim');
            hotContainer.add([ballImg,numberText,hotnumberBase]);
            this.hotNumbersArray.push(hotContainer);
            xPos += 85;
        }
    }

    CreateColdNumbers() {
        let xPos = this.rightHotBase.x - (220 * Constant.scaleFactor);
        let imageName;
        for (let i = 0; i < 6; i++) {
            if (i < 3) {
                imageName = "ball_base_selected_type_1";
            } else {
                imageName = "ball_base_selected_type_2";
            }
            let coldContainer = this.scene.add.container();
            let ballImg = this.scene.add.image(xPos, this.rightColdBase.y + (60 * Constant.scaleFactor), imageName).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
            let numberTextStyle = { fontFamily: 'Roboto_Regular', fontSize: '18px', fill: '#000', fontStyle: 'normal', align: 'center' };
            let numberText = this.scene.add.text(xPos, this.rightColdBase.y + (60 * Constant.scaleFactor), "", numberTextStyle).setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
            let coldnumberBase = this.scene.add.sprite(xPos, this.rightColdBase.y + (39 * Constant.scaleFactor), 'cold_anim').setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
            coldnumberBase.play('coldAnim');
            coldContainer.add([ballImg,numberText,coldnumberBase]);
            this.coldNumbersArray.push(coldContainer);
            xPos += 85;
        }
    }

    SetHotNumbers(){
        // cons
    for(let i = 0 ; i < this.hotNumbersArray.length;i++){
      this.hotNumbersArray[i].list[1].setText(this.hotNumbers[i].number);
      this.VisibleHotNumbers(this.numberImageArray[this.hotNumbers[i].number -1]);
    }
    }

    SetColdNumbers(){
        for(let i = 0 ; i < this.coldNumbersArray.length;i++){
            this.coldNumbersArray[i].list[1].setText(this.coldNumbers[i].number);
            this.VisibleColdNumbers(this.numberImageArray[this.coldNumbers[i].number-1]);
          }
    }

    SetOccurenceNumbers(){
        for(let i = 0 ; i < this.numberImageArray.length;i++){
            // console.log('Check hot number',this.numberImageArray[i].list[3].text, this.hotNumbersArray[i].list[1].text);
            // if(this.hotNumbersArray[i].id == this.numberImageArray[i].list[3].text )
            // console.log('Check hot number',this.numberImageArray[i], this.hotNumbersArray[i]);
            // if(i < this.hotNumbersArray.length){
                let j = this.hotNumbersArray[i].list[1].text;
                this.numberImageArray[j].list[2].setText(j);
            // }
           
        //   }
        
        // for(let i = 0 ; i < this.numberImageArray.length;i++){
        //     // this.numberImageArray[i].list[2].setText(this.coldNumbers[i].number);
          }
    }

    CreateSoundOnOffButton() {
        this.soundOnOffButton = this.scene.add.sprite(this.mainBase.x + (810 * Constant.scaleFactor), this.mainBase.y + (290 * Constant.scaleFactor), "sound_on_off_button").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.soundOnOffButton.setInteractive({ useHandCursor: true });
        this.soundOnOffButton.on("pointerdown", this.SoundButtonPressed, this);
        this.soundOnOffButton.on("pointerup", this.SoundButtonReleased, this);
    };

    SoundButtonPressed() {
        Utils.ButtonScaleTween(this, this.soundOnOffButton, Constant.scaleFactor);
    }
    SoundButtonReleased() {
        this.ToggleSoundButton();
    }

    ToggleSoundButton() {
        if (this.soundOnOffButton.frame.name == 0) {
            this.soundOnOffButton.setFrame(1)
        } else {
            this.soundOnOffButton.setFrame(0)
        }
        // if (localStorage.getItem("keno_game_animation_is_sound_on") == 1) {
        //     localStorage.setItem("keno_game_animation_is_sound_on", 0);
        //     this.soundOnOffButton.setFrame(1)
        //     // SoundManager.PlayButtonClickSound();
        //     // SoundManager.StopBgMusic();
        // } else {
        //     localStorage.setItem("keno_game_animation_is_sound_on", 1);
        //     this.soundOnOffButton.setFrame(0)
        //     // SoundManager.PlayBgMusic();
        // }
    }

    CreateFullScreenButton() {
        this.fullScreenButton = this.scene.add.sprite(this.mainBase.x + (870 * Constant.scaleFactor), this.mainBase.y + (290 * Constant.scaleFactor), "full_screen_button").setOrigin(0.5, 0.5).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.fullScreenButton.setInteractive({ useHandCursor: true });
        this.fullScreenButton.on("pointerdown", this.FullScreenButtonPressed, this);
        this.fullScreenButton.on("pointerup", this.FullScreenButtonReleased, this);
    }
    FullScreenButtonPressed() {
        Utils.ButtonScaleTween(this, this.fullScreenButton, Constant.scaleFactor);
    }
    FullScreenButtonReleased() {
        this.ToggleFullScreenButton();
    }

    ToggleFullScreenButton() {
        if (this.fullScreenButton.frame.name == 0) {
            this.fullScreenButton.setFrame(1)
        } else {
            this.fullScreenButton.setFrame(0)
        }
    }
    CurrentDrawCompleted(){
            Constant.game.events.emit('onDrawCompleted');
    }
    HideDrawNumberHits(){
        this.bg.setVisible(false);
        this.mainBase.setVisible(false);
        this.headingBg.setVisible(false);
        this.headingText.setVisible(false);
        this.numberImageArray.forEach(element => {
            element.list[0].setVisible(false);
            element.list[1].setVisible(false);
            element.list[2].setVisible(false);
            element.list[3].setVisible(false);
        });
        this.rightHotBase.setVisible(false);
        this.rightHotHeadingText.setVisible(false);
        this.rightColdHeadingText.setVisible(false);
        this.rightColdBase.setVisible(false);
        this.hotNumbersArray.forEach(element => {
            element.list[0].setVisible(false);
            element.list[1].setVisible(false);
            element.list[2].setVisible(false);
        });
        this.coldNumbersArray.forEach(element => {
            element.list[0].setVisible(false);
            element.list[1].setVisible(false);
            element.list[2].setVisible(false);
        });
        this.playColdNumbersAnims.forEach(element => {
            element.setVisible(false);
        });
        this.playHotNumbersAnims.forEach(element => {
            element.setVisible(false);
        });
        this.soundOnOffButton.setVisible(false);
        this.fullScreenButton.setVisible(false);
        
    }

    ShowDrawNumberHits(){
        this.bg.setVisible(true);
        this.mainBase.setVisible(true);
        this.headingBg.setVisible(true);
        this.headingText.setVisible(true);
        this.numberImageArray.forEach(element => {
            element.list[0].setVisible(true);
            element.list[1].setVisible(true);
            element.list[2].setVisible(true);
            element.list[3].setVisible(true);
        });
        this.rightHotBase.setVisible(true);
        this.rightHotHeadingText.setVisible(true);
        this.rightColdHeadingText.setVisible(true);
        this.rightColdBase.setVisible(true);
        this.hotNumbersArray.forEach(element => {
            element.list[0].setVisible(true);
            element.list[1].setVisible(true);
            element.list[2].setVisible(true);
        });
        this.coldNumbersArray.forEach(element => {
            element.list[0].setVisible(true);
            element.list[1].setVisible(true);
            element.list[2].setVisible(true);
        });
        this.playColdNumbersAnims.forEach(element => {
            element.setVisible(true);
        });
        this.playHotNumbersAnims.forEach(element => {
            element.setVisible(true);
        });
        this.soundOnOffButton.setVisible(true);
        this.fullScreenButton.setVisible(true);
    }

   
    update(t, dt) {

    }

}
export default DrawNumberHits