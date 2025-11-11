import { Texture, logDebugTexture, Sprite, Container, TextStyle, Text } from 'pixi.js';
import { Constant } from '../Constant.js';
import ButtonTween from '../game_objects/ButtonTween.js';
import { TiltShiftAxisFilter } from 'pixi-filters';
import { AudioManager } from '../media/Audiomanager.js';
import { GameAnalytics } from 'gameanalytics';

class QuitPopup {
    static instance;

    constructor() {
        if (QuitPopup.instance) {
            return QuitPopup.instance;
        }

        QuitPopup.instance = this;
        this.createQuitPopup();
        QuitPopup.hideQuitPopup();
    }

    createQuitPopup() {
        const instance = QuitPopup.getInstance();

        this.overlay = Sprite.from('overlay');
        this.overlay.anchor.set(0.5);

        this.quitPopupContainer = new Container();
        this.popupBase = Sprite.from('rules_base');
        this.popupBase.anchor.set(0.5);

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

        this.txtLineOne = new Text({
            text: "DO YOU",
            style: style
        });
        this.txtLineOne.anchor.set(0.5);
        this.txtLineOne.position.set(0, -250);

        this.txtLineTwo = new Text({
            text: "REALLY WANT TO",
            style: style
        });
        this.txtLineTwo.anchor.set(0.5);
        this.txtLineTwo.position.set(0, -140);

        this.txtLineThree = new Text({
            text: "QUIT?",
            style: style
        });
        this.txtLineThree.anchor.set(0.5);
        this.txtLineThree.position.set(0, -30);

        this.noBtn = Sprite.from('no');
        this.noBtn.eventMode = 'static';
        this.noBtn.cursor = 'pointer';
        this.noBtn.anchor.set(0.5);
        this.noBtn.position.set(-180, 200);

        this.yesBtn = Sprite.from('yes');
        this.yesBtn.eventMode = 'static';
        this.yesBtn.cursor = 'pointer';
        this.yesBtn.anchor.set(0.5);
        this.yesBtn.position.set(180, 200);

        this.quitPopupContainer.addChild(this.popupBase, this.txtLineOne, this.txtLineTwo, this.txtLineThree, this.noBtn, this.yesBtn);

        this.noBtn.on('pointerup', this.onClickingNoBtn, this);
        this.yesBtn.on('pointerup', this.onClickingYesBtn, this);
    }

    onClickingNoBtn() {
        GameAnalytics.addDesignEvent('ui:quit_no_clicked');
        const instance = QuitPopup.getInstance();
        AudioManager.PlayBtnPressedSFX();
        new ButtonTween(instance, instance.noBtn, null, 0.85, 0.85, () => QuitPopup.hideQuitPopup());
        setTimeout(() => {
            Constant.game.emit('gameresumed');
        }, 500);
    }

    onClickingYesBtn() {
        GameAnalytics.addDesignEvent('ui:quit_yes_clicked');
        const instance = QuitPopup.getInstance();
        AudioManager.PlayBtnPressedSFX();
        new ButtonTween(instance, instance.yesBtn, null, 0.85, 0.85, () => QuitPopup.hideQuitPopup());
        setTimeout(() => {
            Constant.game.emit('gameover', 1, 0, false);
        }, 500);
    }

    static showQuitPopup() {
        const instance = QuitPopup.getInstance();

        instance.overlay.visible = true;
        instance.quitPopupContainer.visible = true;
    }

    static hideQuitPopup() {
        const instance = QuitPopup.getInstance();

        instance.overlay.visible = false;
        instance.quitPopupContainer.visible = false;
    }

    static getInstance() {
        if (!QuitPopup.instance) {
            QuitPopup.instance = new QuitPopup();
        }
        return QuitPopup.instance;
    }

    static getOverlay() {
        const instance = QuitPopup.getInstance();
        return instance.overlay;
    }

    static getPopupContainer() {
        const instance = QuitPopup.getInstance();
        return instance.quitPopupContainer;
    }

    static resize() {
        let scale = Math.min(Constant.game.app.screen.width / 1080, Constant.game.app.screen.height / 1920);
        const instance = QuitPopup.getInstance();
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

        instance.quitPopupContainer.x = Constant.game.app.screen.width / 2;
        instance.quitPopupContainer.y = Constant.game.app.screen.height / 2;
        instance.quitPopupContainer.scale.set(scale);
    }
}

export { QuitPopup };