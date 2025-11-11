import { Texture, logDebugTexture, Sprite, Container, TextStyle, Text } from 'pixi.js';
import { Constant } from '../Constant.js';
import ButtonTween from '../game_objects/ButtonTween.js';
import { AudioManager } from '../media/Audiomanager.js';
import { GameAnalytics } from 'gameanalytics';

class InfoPopup {
    static instance;

    constructor() {
        if (InfoPopup.instance) {
            return InfoPopup.instance;
        }

        InfoPopup.instance = this;
    }

    static createRulesPopup() {
        const instance = InfoPopup.getInstance();
        instance.overlay = Sprite.from('overlay');
        instance.overlay.eventMode = 'static';
        instance.overlay.anchor.set(0.5);

        instance.infoContainer = new Container();
        instance.rulesBase = Sprite.from('rules_base');
        instance.rulesBase.anchor.set(0.5);

        instance.englishIcon = Sprite.from(Constant.uiAtlas.textures['mode_0']);
        instance.englishIcon.anchor.set(0.5);
        instance.englishIcon.position.set(-145, -460);

        instance.intlIcon = Sprite.from(Constant.uiAtlas.textures['mode_1']);
        instance.intlIcon.anchor.set(0.5);
        instance.intlIcon.position.set(-145, -470);

        instance.canadaIcon = Sprite.from(Constant.uiAtlas.textures['mode_2']);
        instance.canadaIcon.anchor.set(0.5);
        instance.canadaIcon.position.set(-145, -480);

        instance.crossBtn = Sprite.from('cross');
        instance.crossBtn.eventMode = 'static';
        instance.crossBtn.cursor = 'pointer';
        instance.crossBtn.anchor.set(0.5);
        instance.crossBtn.position.set(360, -445);

        let style = new TextStyle({
            fontFamily: 'Fredoka SemiBold',
            fontSize: 80,
            // fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#843f22',
            // stroke: { color: '#4a1850', width: 5, join: 'round' },
            // dropShadow: {
            //     color: '#000000',
            //     blur: 4,
            //     angle: Math.PI / 6,
            //     distance: 6,
            // },
            wordWrap: true,
            wordWrapWidth: 800,
        });

        instance.rulesTxt = new Text({
            text: "RULES",
            style: style
        });
        instance.rulesTxt.anchor.set(0.5);
        instance.rulesTxt.position.set(0, -250);

        instance.lineOne = Sprite.from(Constant.uiAtlas.textures['1']);
        instance.lineOne.anchor.set(0.5);
        instance.lineOne.position.set(0, instance.rulesTxt.y + 120);

        style = new TextStyle({
            fontFamily: 'Fredoka SemiBold',
            fontSize: 45,
            // fontStyle: 'italic',
            fontWeight: 'bold',
            fill: '#843f22',
            // stroke: { color: '#4a1850', width: 5, join: 'round' },
            // dropShadow: {
            //     color: '#000000',
            //     blur: 4,
            //     angle: Math.PI / 6,
            //     distance: 6,
            // },
            wordWrap: true,
            wordWrapWidth: 800,
        })

        instance.lineOneCTxt = new Text({
            text: "BOARD SIZE",
            style: style
        });
        instance.lineOneCTxt.anchor.set(0.5);
        instance.lineOneCTxt.position.set(instance.lineOne.x - 130, instance.lineOne.y - 2.5);

        instance.lineOneVOneTxt = new Text({
            text: "8X8",
            style: style
        });
        instance.lineOneVOneTxt.anchor.set(0.5);
        instance.lineOneVOneTxt.position.set(instance.lineOneCTxt.x + 320, instance.lineOneCTxt.y);

        instance.lineOneVTwoTxt = new Text({
            text: "10X10",
            style: style
        });
        instance.lineOneVTwoTxt.anchor.set(0.5);
        instance.lineOneVTwoTxt.position.set(instance.lineOneCTxt.x + 320, instance.lineOneCTxt.y);

        instance.lineOneVThreeTxt = new Text({
            text: "12X12",
            style: style
        });
        instance.lineOneVThreeTxt.anchor.set(0.5);
        instance.lineOneVThreeTxt.position.set(instance.lineOneCTxt.x + 320, instance.lineOneCTxt.y);

        instance.lineTwo = Sprite.from(Constant.uiAtlas.textures['1']);
        instance.lineTwo.anchor.set(0.5);
        instance.lineTwo.position.set(0, instance.lineOne.y + 140);

        instance.lineTwoCTxt = new Text({
            text: "PIECES",
            style: style
        });
        instance.lineTwoCTxt.anchor.set(0.5);
        instance.lineTwoCTxt.position.set(instance.lineTwo.x - 170, instance.lineTwo.y - 2.5);

        instance.lineTwoVOneTxt = new Text({
            text: "12",
            style: style
        });
        instance.lineTwoVOneTxt.anchor.set(0.5);
        instance.lineTwoVOneTxt.position.set(instance.lineTwoCTxt.x + 360, instance.lineTwoCTxt.y);

        instance.lineTwoVTwoTxt = new Text({
            text: "20",
            style: style
        });
        instance.lineTwoVTwoTxt.anchor.set(0.5);
        instance.lineTwoVTwoTxt.position.set(instance.lineTwoCTxt.x + 360, instance.lineTwoCTxt.y);

        instance.lineTwoVThreeTxt = new Text({
            text: "30",
            style: style
        });
        instance.lineTwoVThreeTxt.anchor.set(0.5);
        instance.lineTwoVThreeTxt.position.set(instance.lineTwoCTxt.x + 360, instance.lineTwoCTxt.y);

        instance.lineThree = Sprite.from(Constant.uiAtlas.textures['1']);
        instance.lineThree.anchor.set(0.5);
        instance.lineThree.position.set(0, instance.lineTwo.y + 140);

        instance.lineThreeCTxt = new Text({
            text: "FLYKING KING",
            style: style
        });
        instance.lineThreeCTxt.anchor.set(0.5);
        instance.lineThreeCTxt.position.set(instance.lineThree.x - 105, instance.lineThree.y - 2.5);

        instance.lineThreeVOneTxt = new Text({
            text: "NO",
            style: style
        });
        instance.lineThreeVOneTxt.anchor.set(0.5);
        instance.lineThreeVOneTxt.position.set(instance.lineThreeCTxt.x + 300, instance.lineThreeCTxt.y);

        instance.lineThreeVTwoTxt = new Text({
            text: "YES",
            style: style
        });
        instance.lineThreeVTwoTxt.anchor.set(0.5);
        instance.lineThreeVTwoTxt.position.set(instance.lineThreeCTxt.x + 300, instance.lineThreeCTxt.y);


        instance.lineFour = Sprite.from(Constant.uiAtlas.textures['2']);
        instance.lineFour.anchor.set(0.5);
        instance.lineFour.position.set(0, instance.lineThree.y + 160);

        instance.lineFourCTxt = new Text({
            text: "PIECES\nMOVE BACK",
            style: style
        });
        instance.lineFourCTxt.anchor.set(0.5);
        instance.lineFourCTxt.position.set(instance.lineFour.x - 120, instance.lineFour.y - 2.5);

        instance.lineFourVOneTxt = new Text({
            text: "NO",
            style: style
        });
        instance.lineFourVOneTxt.anchor.set(0.5);
        instance.lineFourVOneTxt.position.set(instance.lineFourCTxt.x + 320, instance.lineFourCTxt.y);

        instance.lineFourVTwoTxt = new Text({
            text: "YES",
            style: style
        });
        instance.lineFourVTwoTxt.anchor.set(0.5);
        instance.lineFourVTwoTxt.position.set(instance.lineFourCTxt.x + 320, instance.lineFourCTxt.y);

        instance.infoContainer.addChild(instance.rulesBase, instance.englishIcon, instance.intlIcon, instance.canadaIcon, instance.crossBtn, instance.rulesTxt, instance.lineOne, instance.lineOneCTxt, instance.lineOneVOneTxt, instance.lineOneVTwoTxt, instance.lineOneVThreeTxt, instance.lineTwo, instance.lineTwoCTxt, instance.lineTwoVOneTxt, instance.lineTwoVTwoTxt, instance.lineTwoVThreeTxt, instance.lineThree, instance.lineThreeCTxt, instance.lineThreeVOneTxt, instance.lineThreeVTwoTxt, instance.lineFour, instance.lineFourCTxt, instance.lineFourVOneTxt, instance.lineFourVTwoTxt);

        instance.crossBtn.on('pointerup', instance.OnClickingCrossBtn, this);
    }

    OnClickingCrossBtn() {
        GameAnalytics.addDesignEvent('ui:info_cross_clicked');
        const instance = InfoPopup.getInstance();
        AudioManager.PlayBtnPressedSFX();
        new ButtonTween(instance, instance.crossBtn, null, 0.85, 0.85, this.hideRulesPopup.bind(instance));
        // this.hideRulesPopup();
    }

    static showRulesPopup(_mode) {
        const mode = _mode;
        this.getCurrentModeRules(mode)
        const instance = InfoPopup.getInstance();
        instance.overlay.visible = true;
        instance.infoContainer.visible = true;
    }

    static getCurrentModeRules(_mode) {
        const mode = _mode;

        const instance = InfoPopup.getInstance();
        switch (mode) {
            case 0: instance.intlIcon.visible = false;
                instance.canadaIcon.visible = false;
                instance.lineOneVTwoTxt.visible = false;
                instance.lineOneVThreeTxt.visible = false;
                instance.lineTwoVTwoTxt.visible = false;
                instance.lineTwoVThreeTxt.visible = false;
                instance.lineThreeVTwoTxt.visible = false;
                instance.lineFourVTwoTxt.visible = false;
                break;

            case 1: instance.englishIcon.visible = false;
                instance.canadaIcon.visible = false;
                instance.lineOneVOneTxt.visible = false;
                instance.lineOneVThreeTxt.visible = false;
                instance.lineTwoVOneTxt.visible = false;
                instance.lineTwoVThreeTxt.visible = false;
                instance.lineThreeVOneTxt.visible = false;
                instance.lineFourVOneTxt.visible = false;
                break;

            default: instance.englishIcon.visible = false;
                instance.intlIcon.visible = false;
                instance.lineOneVOneTxt.visible = false;
                instance.lineOneVTwoTxt.visible = false;
                instance.lineTwoVOneTxt.visible = false;
                instance.lineTwoVTwoTxt.visible = false;
                instance.lineThreeVOneTxt.visible = false;
                instance.lineFourVOneTxt.visible = false;
                break;
        }
    }

    static hideRulesPopup() {
        const instance = InfoPopup.getInstance();
        instance.overlay.visible = false;
        instance.infoContainer.visible = false;
        instance.infoContainer.children.forEach(element => {
            element.visible = true;
        });
    }

    static getInstance() {
        if (!InfoPopup.instance) {
            InfoPopup.instance = new InfoPopup();
        }
        return InfoPopup.instance;
    }

    // Resize method
    static resize() {
        let scale = Math.min(Constant.game.app.screen.width / 1080, Constant.game.app.screen.height / 1920);
        const instance = InfoPopup.getInstance();
        instance.overlay.x = Constant.game.app.screen.width / 2;
        instance.overlay.y = Constant.game.app.screen.height / 2;
        if (Constant.game.app.screen.width > Constant.game.app.screen.height) {
            instance.overlay.width = 1080;
            instance.overlay.height = 1920;
            instance.overlay.scale.set(scale)
        }
        else {
            instance.overlay.width = Constant.game.app.screen.width;
            instance.overlay.height = Constant.game.app.screen.height;
            // bg.scale.set(1, 1);
        }

        instance.infoContainer.x = Constant.game.app.screen.width / 2;
        instance.infoContainer.y = Constant.game.app.screen.height / 2;
        instance.infoContainer.scale.set(scale);


    }

    static getOverlay() {
        const instance = InfoPopup.getInstance();
        return instance.overlay;
    }

    static getInfoContainer() {
        const instance = InfoPopup.getInstance();
        return instance.infoContainer;
    }
}

export { InfoPopup };
