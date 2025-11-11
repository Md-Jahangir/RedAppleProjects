var ParentPopup = {
    //CREATE THE PARENT POP UP WITH JSON DATA
    CreateParentPopup: function(){
        parentPopupGroup = game.add.group();
        parentJson = game.cache.getJSON('parentJson');
        // console.log("The parent Json..........",parentJson);
        // console.log("The length........"+parentJson.parents.length);
        var randomNumber = game.rnd.integerInRange(0,(parentJson.parents.length-1));
        parentPopupBg = Utils.ButtonSettingsControl(parentPopupBg,game.world.centerX,game.world.centerY,'blueOverlay',this.HideParentPopup,null,null,null,"true","true",0.5,0.5,1,1,this);
        parentPopupBase = Utils.SpriteSettingsControl(parentPopupBase,game.world.centerX,game.world.centerY,'parentsBase',"true","true",0.5,0.5,0.6,0.6);
        parentPopupGroup.add(parentPopupBg);
        parentPopupGroup.add(parentPopupBase);
        for(var i = 0;i<4;i++){
            answerBase = game.add.button(140+(i*150),700, 'answerBase');
            answerBase.scale.setTo(0.6,0.6);
            answerBase.anchor.setTo(0.5,0.5);
            answerBase.name = this.ReturnArrayObject(parentJson,randomNumber).answers[i].answer;
            answerBase.events.onInputDown.add(this.AnswerButtonDownAnimation,this);
            answerBase.events.onInputUp.add(this.AnswerButtonUpAnimation,this);
            var temp = game.add.bitmapText(140+(i*150), 680, 'shootEmFont', this.ReturnArrayObject(parentJson,randomNumber).answers[i].answer, 120);
            temp.scale.setTo(0.5,0.5);
            temp.anchor.setTo(0.5,0.5);
            parentPopupGroup.add(answerBase);
            parentPopupGroup.add(temp);
            answerText[i] = temp;
            answerBaseArray[i] = answerBase;
            rightAnswer = this.ReturnArrayObject(parentJson,randomNumber).rightAnswer;
        }
        firstQuestionTxt = game.add.bitmapText(190, 500, 'shootEmFont', this.ReturnArrayObject(parentJson,randomNumber).question1+' +', 80);
        secondQuestionTxt = game.add.bitmapText(340, 500, 'shootEmFont', this.ReturnArrayObject(parentJson,randomNumber).question2+' = ?', 80);
        parentPopupGroup.add(firstQuestionTxt);
        parentPopupGroup.add(secondQuestionTxt);
        // console.log("The Return Array Object.........."+this.ReturnArrayObject(parentJson,randomNumber).answer_1);
        parentPopupGroup.visible = false;
        parentPopupGroup.alpha = 0;
    },
    //SHOW PARENTS POP UP
    ShowParentPopup: function(){
        parentPopupGroup.visible = true;
        this.SetRandomString();
        game.add.tween(parentPopupGroup).to({ alpha: 1 }, 200, Phaser.Easing.Linear.Out, true);
    },
    //HIDE PARENTS POP UP
    HideParentPopup: function(){
        var hideParentsGroupTween = game.add.tween(parentPopupGroup).to({ alpha: 0 }, 200, Phaser.Easing.Linear.Out, true);
        hideParentsGroupTween.onComplete.add(function(){
            parentPopupGroup.visible = false;
        });
    },
    //ANSWER BUTTON
    AnswerButtonDownAnimation: function(sprite){
        game.add.tween(sprite.scale).to({ x: 0.5, y: 0.5}, 400, Phaser.Easing.Bounce.Out, true);
    },
    AnswerButtonUpAnimation: function(sprite){
        game.add.tween(sprite.scale).to({ x: 0.6, y: 0.6}, 400, Phaser.Easing.Bounce.Out, true);
        setTimeout(() => {
            this.AnswerBttnClick(sprite);
        }, 500);
        
    },
    AnswerBttnClick: function(sprite){
        // console.log("The sprite name............."+sprite.name);
        SoundManager.PlayButtonSFX();
        if(rightAnswer == sprite.name){
            // console.log("Right Answer...................");
            CreditPopup.ShowCreditPopup();
        }
        else{
            // this.HideParentPopup();
            WrongPopup.ShowWrongPopup('Something went wrong .  \n Please try again later');
        }
    },
    //ARRAY RETURN WITH RESPECT TO RANDOM NUMBER
    ReturnArrayObject: function(parentJsonstring,randomNumber){
        return parentJsonstring.parents[randomNumber];
    },
    //SET THE STRING OF TEXT EVERY TIME WHEN VISIBLE
    SetRandomString: function(){
        var randomNumber = game.rnd.integerInRange(0,(parentJson.parents.length-1));
        for(var i = 0;i<answerText.length;i++){
            answerText[i].setText(this.ReturnArrayObject(parentJson,randomNumber).answers[i].answer);
            answerBaseArray[i].name = this.ReturnArrayObject(parentJson,randomNumber).answers[i].answer;
            // console.log("The answer Base........"+answerBaseArray.length);
        }
        rightAnswer = this.ReturnArrayObject(parentJson,randomNumber).rightAnswer;
        firstQuestionTxt.setText(this.ReturnArrayObject(parentJson,randomNumber).question1+' +');
        secondQuestionTxt.setText(this.ReturnArrayObject(parentJson,randomNumber).question2+' = ?');
    }
}