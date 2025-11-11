var parentPopupGroup;
var parentsPopupOverlay;
var parentsCrossButton;

var firstQuestionTxt;
var secondQuestionTxt;
var rightAnswer;
var answerText = [];
var answerBaseArray = [];

var ParentsPopup = {

    CreateParentPopup: function() {
        parentPopupGroup = game.add.group();
        parentJson = game.cache.getJSON('parentJson');
        var randomNumber = game.rnd.integerInRange(0, (parentJson.parents.length - 1));

        //ADD PARENTS POPUP OVERLAY
        parentsPopupOverlay = Utils.ButtonSettingsControl(parentsPopupOverlay, 640.0, 360.0, 'overlay', this.ParentsPopupOverlayOnPress, null, null, null, "true", "true", 0.5, 0.5, 4, 4, this);

        //ADD PARENTS PROMPT
        var parentsPrompt = Utils.SpriteSettingsControl(parentsPrompt, 640.0, 360.0, 'bigPrompt', "true", "true", 0.5, 0.5, 1, 1);

        //ADD PARENTS CROSS BUTTON
        parentsCrossButton = Utils.ButtonSettingsControl(parentsCrossButton, 1015, 125, 'cossButton', this.ParentsCrossButtonOnPress, null, null, this.ParentsCrossButtonOnRelease, "true", "true", 0.5, 0.5, 1, 1, this);

        parentPopupGroup.add(parentsPopupOverlay);
        parentPopupGroup.add(parentsPrompt);
        parentPopupGroup.add(parentsCrossButton);

        //FOR CREATE ANSWER BASE
        for (var i = 0; i < 4; i++) {
            answerBase = game.add.button(435 + (i * 140), 455, 'answerBox');
            answerBase.anchor.setTo(0.5, 0.5);
            answerBase.name = this.ReturnArrayObject(parentJson, randomNumber).answers[i].answer;
            answerBase.events.onInputDown.add(this.AnswerButtonUpAnimation, this);
            var temp = game.add.bitmapText(435 + (i * 140), 455, 'riccicFreeFont', this.ReturnArrayObject(parentJson, randomNumber).answers[i].answer, 100);
            temp.anchor.setTo(0.5, 0.5);
            temp.tint = "0xfdf1b4";
            parentPopupGroup.add(answerBase);
            parentPopupGroup.add(temp);
            answerText[i] = temp;
            answerBaseArray[i] = answerBase;
            rightAnswer = this.ReturnArrayObject(parentJson, randomNumber).rightAnswer;
        }

        firstQuestionTxt = game.add.bitmapText(430, 260, 'riccicFreeFont', this.ReturnArrayObject(parentJson, randomNumber).question1 + ' +', 120);
        firstQuestionTxt.tint = "0x773713";
        secondQuestionTxt = game.add.bitmapText(630, 260, 'riccicFreeFont', this.ReturnArrayObject(parentJson, randomNumber).question2 + ' = ?', 120);
        secondQuestionTxt.tint = "0x773713";
        parentPopupGroup.add(firstQuestionTxt);
        parentPopupGroup.add(secondQuestionTxt);

        parentPopupGroup.visible = false;
        parentPopupGroup.alpha = 0;

    },

    //SHOW PARENTS POPUP
    ShowParentPopup: function() {
        parentPopupGroup.visible = true;
        this.SetRandomString();
        game.add.tween(parentPopupGroup).to({ alpha: 1 }, 400, Phaser.Easing.Linear.Out, true);
    },

    //HIDE PARENTS POPUP
    HideParentPopup: function() {
        var hideParentsGroupTween = game.add.tween(parentPopupGroup).to({ alpha: 0 }, 200, Phaser.Easing.Linear.Out, true);
        hideParentsGroupTween.onComplete.add(function() {
            parentPopupGroup.visible = false;
        });
    },

    ParentsPopupOverlayOnPress: function() {},

    ParentsCrossButtonOnPress: function() {
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        game.add.tween(parentsCrossButton.scale).to({ x: 0.95, y: 0.95 }, 100, Phaser.Easing.Linear.Out, true);
    },

    ParentsCrossButtonOnRelease: function() {
        game.add.tween(parentsCrossButton.scale).to({ x: 1, y: 1 }, 100, Phaser.Easing.Linear.Out, true);
        setTimeout(function() {
            ParentsPopup.HideParentPopup();
        }, 100);
    },

    //ANSWER BUTTON
    AnswerButtonDownAnimation: function() {

    },
    AnswerButtonUpAnimation: function(sprite) {
        this.AnswerBttnClick(sprite);
    },
    AnswerBttnClick: function(sprite) {
        if (Database.LoadData("sound_on_off") == "0") {
            buttonClickSFX.play();
        }
        if (rightAnswer == sprite.name) {
            CreditPopup.ShowCreditPopup();
        } else {
            WrongPopup.ShowWrongPopup();
        }
    },

    //ARRAY RETURN WITH RESPECT TO RANDOM NUMBER
    ReturnArrayObject: function(parentJsonstring, randomNumber) {
        return parentJsonstring.parents[randomNumber];
    },
    //SET THE STRING OF TEXT EVERY TIME WHEN VISIBLE
    SetRandomString: function() {
        var randomNumber = game.rnd.integerInRange(0, (parentJson.parents.length - 1));
        for (var i = 0; i < answerText.length; i++) {
            answerText[i].setText(this.ReturnArrayObject(parentJson, randomNumber).answers[i].answer);
            answerBaseArray[i].name = this.ReturnArrayObject(parentJson, randomNumber).answers[i].answer;
        }
        rightAnswer = this.ReturnArrayObject(parentJson, randomNumber).rightAnswer;
        firstQuestionTxt.setText(this.ReturnArrayObject(parentJson, randomNumber).question1 + ' +');
        secondQuestionTxt.setText(this.ReturnArrayObject(parentJson, randomNumber).question2 + ' = ?');
    }
}