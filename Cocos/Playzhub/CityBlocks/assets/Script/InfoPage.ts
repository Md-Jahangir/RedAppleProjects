import { _decorator, Animation, Button, Component, Node, PageView, ScrollView, tween, Vec3 } from 'cc';
import { SoundManager } from './SoundManager';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

@ccclass('InfoPage')
export class InfoPage extends Component {
    //#region -Fields
    @property(Node) pageNumberIndicator: Node = null;
    @property(Node) pageNumberIndicatorMain: Node = null;
    @property(Node) playButton: Node = null;
    @property(Node) page: Node = null;
    @property(Node) arrow: Node = null;
    @property(Node) particle: Node = null;
    particleActive = null;

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
        this.particle.active = false;
    }
    //#endregion

    //#region -Start
    start() {
        GA.GameAnalytics.addDesignEvent("screen:tutorial");
        this.page.setScale(0.2, 0.2);
        tween(this.page).to(0.3, { scale: new Vec3(1, 1, this.page.getScale().z) }, {
            easing: 'cubicIn', onStart: (_target: Node) => {
                _target.getComponent(Animation).play("AlphaOpen");
            }
        }).start();

        const startNodePosition: Vec3 = this.arrow.getPosition();
        tween(this.arrow)
            .to(1, { position: new Vec3(startNodePosition.x, startNodePosition.y - 50, startNodePosition.z), scale: new Vec3(0.8, 0.8, this.arrow.getScale().z) }, { easing: 'sineIn' })
            .to(1, { position: startNodePosition, scale: new Vec3(1, 1, this.arrow.getScale().z) }, { easing: 'sineOut' })
            .union()
            .repeatForever()
            .start();

        this.PageIndicatorAnimation();
        this.pageNumberIndicatorMain.setSiblingIndex(this.currentPage);
        this.CheckButtonInteractive();
    }
    //#endregion

    //#region -EnableCurrentPage
    EnableCurrentPage(): void {
        this.page.getComponent(PageView).scrollToPage(this.currentPage, 0.5);
        if (this.currentPage === 1) {
            this.particleActive = setTimeout(() => { this.particle.active = true }, 500);
        }
        else {
            if (this.particleActive) {
                clearTimeout(this.particleActive)
            }
            this.particle.active = false;
        }
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
    }
    //#endregion

    //#region -CheckButtonInteractive
    CheckButtonInteractive(): void {
        if (this.currentPage == 0) {
            this.prevButton.getComponent(Button).interactable = false;
            this.nextButton.getComponent(Button).interactable = true;
            this.nextButton.active = true;
            this.playButton.active = false;
        }
        else if (this.currentPage == 5) {
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
                tween(this.playButton).to(0.2, { scale: new Vec3(0.1, 0.1, this.playButton.getScale().z) }, { easing: 'backOut' }).call(() => {
                    this.playButton.active = false;
                    this.playButton.setScale(1, 1, this.playButton.getScale().z);
                    this.nextButton.active = true;
                    this.nextButton.setScale(0.1, 0.1, this.nextButton.getScale().z);
                    tween(this.nextButton).to(0.2, { scale: new Vec3(1, 1, this.nextButton.getScale().z) }, { easing: 'sineIn' }).start();
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
        SoundManager.instance.PlayButtonSound();
    }
    //#endregion
}


