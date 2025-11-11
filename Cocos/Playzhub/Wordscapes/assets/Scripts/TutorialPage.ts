import { _decorator, Button, Color, Component, EventTarget, EventTouch, Node, PageView, Sprite, SpriteFrame, tween, Vec3 } from 'cc';
import { GameManager } from './GameManager';
import { SoundManager } from './SoundManager';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

@ccclass('TutorialPage')
export class TutorialPage extends Component {
    //#region -Fields
    @property(Node) pageNumberIndicator: Node = null;
    @property(Node) pageNumberIndicatorMain: Node = null;
    @property(Node) playButton: Node = null;
    @property(Node) page: Node = null;
    currentPage: number = 0;

    //buttons
    nextButton: Node = null;
    prevButton: Node = null;
    //#endregion

    //#region -OnEnable
    protected onEnable(): void {
        this.nextButton = this.node.getChildByName("next");
        this.prevButton = this.node.getChildByName("previous");
        this.playButton = this.node.getChildByName("playButton");
        this.playButton.active = false;
        // this.particle.active = false;
    }
    //#endregion

    //#region -Start
    start() {
        GA.GameAnalytics.addDesignEvent("screen:tutorial");
        this.PageIndicatorAnimation();
        this.pageNumberIndicatorMain.setSiblingIndex(this.currentPage);
        this.CheckButtonInteractive();
    }
    //#endregion

    //#region -EnableCurrentPage
    EnableCurrentPage(): void {
        this.page.getComponent(PageView).scrollToPage(this.currentPage, 1);
    }
    //#endregion

    //#region -OnClickNextButton
    OnClickNextButton(): void {
        GA.GameAnalytics.addDesignEvent("ui:tutorial_next_clicked");
        if (this.currentPage < 6) {
            this.nextButton.setScale(0.5, 0.5, this.nextButton.getScale().z);
            this.currentPage++;
            tween(this.nextButton).to(0.2, { scale: new Vec3(1, 1, this.nextButton.getScale().z) }, { easing: 'bounceOut' }).start();
            this.EnableCurrentPage();
        }
        SoundManager.instance.ButtonClickSound();
    }
    //#endregion

    //#region -OnClickPreviousButton
    OnClickPreviousButton(): void {
        GA.GameAnalytics.addDesignEvent("ui:tutorial_previous_clicked");
        if (this.currentPage > 0) {
            this.prevButton.setScale(0.5, 0.5, this.prevButton.getScale().z);
            this.currentPage--;
            tween(this.prevButton).to(0.2, { scale: new Vec3(1, 1, this.prevButton.getScale().z) }, { easing: 'bounceOut' }).start();
            this.EnableCurrentPage();
        }
        SoundManager.instance.ButtonClickSound();
    }
    //#endregion

    //#region -CheckButtonInteractive
    CheckButtonInteractive(): void {
        if (this.currentPage === 0) {
            this.prevButton.getComponent(Button).interactable = false;
            this.nextButton.getComponent(Button).interactable = true;
            this.nextButton.active = true;
            this.playButton.active = false;
        }
        else if (this.currentPage === 5) {
            this.prevButton.getComponent(Button).interactable = true;
            // this.nextButton.getComponent(Button).interactable = false;
            tween(this.nextButton).to(0.2, { scale: new Vec3(0.1, 0.1, this.nextButton.getScale().z) }, { easing: 'sineOut' }).call(() => {
                this.nextButton.active = false;
                this.nextButton.setScale(1, 1, this.nextButton.getScale().z);
                this.playButton.active = true;
                this.playButton.setScale(0.1, 0.1, this.playButton.getScale().z);
                tween(this.playButton).to(0.2, { scale: new Vec3(1, 1, this.playButton.getScale().z) }, { easing: 'sineIn' }).start();
            }).start();
        } else {
            this.prevButton.getComponent(Button).interactable = true;
            this.nextButton.getComponent(Button).interactable = true;
            if (this.nextButton.active == false) {
                tween(this.playButton).to(0.4, { scale: new Vec3(0.1, 0.1, this.playButton.getScale().z) }, { easing: 'backOut' }).call(() => {
                    this.playButton.active = false;
                    this.playButton.setScale(1, 1, this.playButton.getScale().z);
                    this.nextButton.active = true;
                    this.nextButton.setScale(0.1, 0.1, this.nextButton.getScale().z);
                    tween(this.nextButton).to(0.4, { scale: new Vec3(1, 1, this.nextButton.getScale().z) }, { easing: 'sineIn' }).start();
                }).start();
            } else {
                this.nextButton.active = true;
                this.playButton.active = false;
            }
        }
    }
    //#endregion

    //#region -GetCurrentInfoPage
    GetCurrentInfoPage(): Node {
        return this.page;
    }
    //#endregion

    //#region -PageIndicatorAnimation
    PageIndicatorAnimation(): void {
        this.pageNumberIndicatorMain.setScale(0.2, 0.2);
        tween(this.pageNumberIndicatorMain).to(0.3, { scale: new Vec3(1, 1, this.pageNumberIndicatorMain.getScale().z) }, { easing: 'backInOut' }).start();
    }
    //#endregion

    //#region -OnScroll
    OnScroll(event): void {
        this.currentPage = event.getCurrentPageIndex();
        this.PageIndicatorAnimation();
        this.pageNumberIndicatorMain.setSiblingIndex(this.currentPage);
        this.CheckButtonInteractive()
    }
    //#endregion

    //#region OnPlayButtonClick
    OnPlayButtonClick(event: EventTouch): void {
        const currentTarget: Node = event.currentTarget;
        if (currentTarget.name === 'cross') {
            GA.GameAnalytics.addDesignEvent("ui:tutorial_skip_clicked");
        } else {
            GA.GameAnalytics.addDesignEvent("ui:tutorial_play_clicked");
        }

        GameManager.instance.LoadJson();
        const spriteFrame = this.node.getComponent(Sprite);
        const currentPosition: Vec3 = this.node.getPosition();
        tween(this.node).to(0.5, { position: new Vec3(currentPosition.x, -500, currentPosition.z), scale: new Vec3(0.1, 0.1, this.node.getScale().z) }, { easing: 'backIn' }).call(() => {
            this.node.destroy();
        }).start()
        tween(spriteFrame).to(0.5, { color: new Color(255, 255, 255, 0) }, { easing: 'linear' }).start();

        SoundManager.instance.ButtonClickSound();
    }
    //#endregion
}