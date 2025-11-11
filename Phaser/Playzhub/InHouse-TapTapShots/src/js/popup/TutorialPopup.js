import Button from "../class/Button";
import * as GA from "gameanalytics";

export default class TutorialPopup {
    constructor(scene) {
        this.scene = scene;
        this.currentwidth = null;
        this.CreateTutorialPopup();
    }
    CreateTutorialPopup() {
        this.tutorial01 = this.scene.add.image(0, 0, 'tutorial-01').setDepth(4).setOrigin(0);
        this.tutorial02 = this.scene.add.image(0, 0, 'tutorial-02').setDepth(4).setOrigin(0);

        this.skipButton = new Button(this.scene, 'skip-but', 0, 0, 1, 1);
        this.skipButton.button.setDepth(4);
        // this.skipButton.hide();
        this.skipButton.setClickcallback(this.SkipButtonFunc, this);

        this.nextButton = new Button(this.scene, 'next-but', 0, 0, 1, 1);
        this.nextButton.button.setDepth(4);
        // this.nextButton.hide();
        this.nextButton.setClickcallback(this.NextButtonFunc, this);

        this.preButton = new Button(this.scene, 'pre-but', 0, 0, 1, 1);
        this.preButton.button.setDepth(4);
        this.preButton.hide();
        this.preButton.setClickcallback(this.PreButtonFunc, this);

        this.tutorialPlayButton = new Button(this.scene, 'tutorial-play-but', 0, 0, 1, 1);
        this.tutorialPlayButton.button.setDepth(4);
        this.tutorialPlayButton.hide();
        this.tutorialPlayButton.setClickcallback(this.TutorialPlayButtonFunc, this);
    }

    SkipButtonFunc() {
        GA.GameAnalytics.addDesignEvent("ui:tutorial_skip_clicked");
        this.ShowHidePopup(false);
        this.scene.GameAwakeFunc();
    }

    NextButtonFunc() {
        GA.GameAnalytics.addDesignEvent("ui:tutorial_next_clicked");

        this.tutorial01.x -= this.currentwidth;
        this.tutorial02.x = this.tutorial01.x + this.currentwidth;

        this.skipButton.hide();
        this.nextButton.hide();

        this.preButton.show();
        this.tutorialPlayButton.show();
    }

    PreButtonFunc() {
        GA.GameAnalytics.addDesignEvent("ui:tutorial_previous_clicked");

        this.tutorial01.x += this.currentwidth;
        this.tutorial02.x = this.tutorial01.x + this.currentwidth;

        this.skipButton.show();
        this.nextButton.show();

        this.preButton.hide();
        this.tutorialPlayButton.hide();
    }

    TutorialPlayButtonFunc() {
        GA.GameAnalytics.addDesignEvent("ui:tutorial_play_clicked");

        this.ShowHidePopup(false);
        this.scene.GameAwakeFunc();
    }

    //#region - ShowHidePopup
    ShowHidePopup(_status) {
        this.tutorial01.setVisible(_status);
        this.tutorial02.setVisible(_status);
        if (_status == true) {
            this.skipButton.show();
            this.nextButton.show();

            this.preButton.hide();
            this.tutorialPlayButton.hide();
        }
        else {
            this.skipButton.hide();
            this.nextButton.hide();

            this.preButton.hide();
            this.tutorialPlayButton.hide();
        }
    }
    //#endregion

    resize(_newWidth, _newHeight, _newScale) {
        this.currentwidth = _newWidth;
        this.tutorial01.setScale(_newScale);
        this.tutorial01.setDisplaySize(_newWidth, _newHeight);
        this.tutorial01.setPosition(0, 0);
        this.tutorial02.setDisplaySize(_newWidth, _newHeight);
        this.tutorial02.setPosition(this.tutorial01.x + _newWidth, 0);

        this.skipButton.SetScale(_newScale);
        this.skipButton.SetPosition((200 * _newScale), _newHeight - (200 * _newScale));

        this.nextButton.SetScale(_newScale);
        this.nextButton.SetPosition(_newWidth - (200 * _newScale), _newHeight - (200 * _newScale));

        this.preButton.SetScale(_newScale);
        this.preButton.SetPosition((200 * _newScale), _newHeight - (200 * _newScale));

        this.tutorialPlayButton.SetScale(_newScale);
        this.tutorialPlayButton.SetPosition(_newWidth - (200 * _newScale), _newHeight - (200 * _newScale));

    }
}