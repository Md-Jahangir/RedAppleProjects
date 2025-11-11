import { _decorator, Button, Component, EventTouch, Label, Node, PageView, Slider, Sprite, tween, Vec2, Vec3 } from 'cc';
import { GameManager } from './GameManager';
import { AnimationManager } from './utils/AnimationManger';
import { SoundManager } from './SoundManager';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

@ccclass('Tutorial')
export class Tutorial extends Component {

    //PageView Component
    private pageView: PageView | null = null;

    //Buttons
    @property({ type: Node }) nextButton: Node | null = null;
    @property({ type: Node }) playButton: Node | null = null;

    //Pages
    @property({ type: Node }) readRulesPage: Node | null = null;
    @property(Node) tutorialsContent: Node | null = null;

    //#region onEnable
    protected onEnable(): void {
        this.pageView = this.getPageView();
        this.pageView.enabled = false;

        //initially button setting
        this.nextButton.active = true;
        this.playButton.active = false;

        //Initially page disable
        this.readRulesPage.active = false;

        GA.GameAnalytics.addDesignEvent("screen:tutorial");
    };
    //#endregion

    //#region getPageView
    /**
     * @description getting component of page view.
     * @returns 
     */
    private getPageView(): PageView {
        const tutorialNode: Node = this.node.getChildByName("tutorialPages");
        return tutorialNode.getComponent(PageView);
    };
    //#endregion

    //#region OnNextButtonClick
    private OnNextButtonClick(_event: EventTouch): void {
        GA.GameAnalytics.addDesignEvent("ui:tutorial_next_clicked");

        AnimationManager.ButtonsInteractiveAnim(_event.currentTarget, 0.2, () => {
            this.pageView.enabled = true;
            const nextPageIndex: number = this.pageView.curPageIdx + 1;
            this.pageView.scrollToPage(nextPageIndex, 0);
            this.CheckLastPage(this.pageView.curPageIdx);
            this.pageView.enabled = false;
        });
        SoundManager.instance.ButtonClickSound();
    };
    //#endregion

    //#region CheckLastPage
    /**
     * @description Checking for last page.
     * @param _currPageIdx 
     */
    private CheckLastPage(_currPageIdx: number): void {
        if (_currPageIdx === this.pageView.getPages().length - 1) {
            this.nextButton.active = false;
            this.playButton.active = true;
        } else {
            this.nextButton.active = true;
            this.playButton.active = false;
        }
        this.AnimationController();
    };
    //#endregion

    //#region OnPlayButtonClick
    private OnPlayButtonClick(_event: EventTouch): void {
        GA.GameAnalytics.addDesignEvent("ui:tutorial_play_clicked");

        AnimationManager.ButtonsInteractiveAnim(_event.currentTarget, 0.2, () => {
            this.node.destroy();
            GameManager.instance.TimerLevelStartAnimation();
        });

        SoundManager.instance.ButtonClickSound();
    };
    //#endregion

    //#region OnReadRulesClick
    private OnReadRulesClick(_event: EventTouch): void {
        AnimationManager.ButtonsInteractiveAnim(_event.currentTarget, 0.2, () => {
            this.readRulesPage.active = true;
        });
        SoundManager.instance.ButtonClickSound();
    };
    //#endregion

    //#region CloseReadRulesPopup
    private CloseReadRulesPopup(_event: EventTouch): void {
        AnimationManager.ButtonsInteractiveAnim(_event.currentTarget, 0.2, () => {
            this.readRulesPage.active = false;
        });
        SoundManager.instance.ButtonClickSound();
    };
    //#endregion

    //#region AnimationController
    AnimationController(): void {
        const currentIndex = this.pageView.curPageIdx;
        const currentNode = this.tutorialsContent.children[currentIndex];

        switch (currentIndex) {
            case 2:
                this.playMoveBarAnimation(currentNode);
                break;
            case 3:
                this.playTimeBarAnimation(currentNode);
                break;
            case 4:
                this.animateStrikerPosition(currentNode);
                break;
            case 5:
                this.strikerAimingAnimation(currentNode); break;
            case 6:
                this.strikerShoot(currentNode); break;
            case 7:
                this.strikerShootCancel(currentNode); break;
        };
    };
    //#endregion

    //#region Utility - Get Object Nodes
    private getObjChildren(_pageNode: Node): { barSprite?: Sprite, starNode?: Node, slider?: Slider } {
        const obj = _pageNode.getChildByName('obj');
        if (!obj) return {};

        const bar = obj.children?.[0]?.children?.[0];
        const starNode = obj.children?.[1];
        const slider = obj.getComponent(Slider);
        const barSprite = bar?.getComponent(Sprite);

        return { barSprite, starNode, slider };
    };
    //#endregion

    //#region MoveBarAnimationObject
    private playMoveBarAnimation(_pageNode: Node): void {
        const { barSprite } = this.getObjChildren(_pageNode);
        if (!barSprite) return;

        tween(barSprite)
            .to(1, { fillRange: 0.28 }, { easing: 'sineOut' })
            .start();
    };
    //#endregion

    //#region TimeBarAnimation
    private playTimeBarAnimation(_pageNode: Node): void {
        const { barSprite, starNode } = this.getObjChildren(_pageNode);
        if (!barSprite || !starNode) return;

        const updateStars = (progress: number) => {
            const numStars = progress > 0.74 ? 3 : progress > 0.5 ? 2 : progress > 0.28 ? 1 : 0;

            starNode.children.forEach((child: Node, i: number) => {
                const star = child.children?.[0];
                if (star) star.active = i < numStars;
            });
        };

        tween(barSprite)
            .to(5, { fillRange: 0.29 }, {
                easing: 'sineOut',
                onUpdate: () => updateStars(barSprite.fillRange)
            })
            .start();
    };
    //#endregion

    //#region StrikerPositionSet
    private animateStrikerPosition(_pageNode: Node): void {
        const { slider } = this.getObjChildren(_pageNode);
        if (!slider) return;

        tween(slider)
            .to(2, { progress: 0.9 }, { easing: 'smooth' })
            .to(2, { progress: 0.1 }, { easing: 'smooth' })
            .union()
            .repeatForever()
            .start();
    };
    //#endregion

    //#region Animations
    private strikerAimingAnimation(_pageNode: Node): void {
        const object: Node = _pageNode.getChildByName("obj");
        const circle: Node = object.getChildByName("ForceDirectionArrow").children[0];
        const arrow: Node = object.getChildByName("ForceDirectionArrow").children[1];

        tween(circle).to(0.5, { scale: new Vec3(0.2, 0.2, 0.2) }, { easing: 'smooth' })
            .to(2, { scale: new Vec3(1.5, 1.5, 1.5) }, { easing: 'smooth' }).union().repeatForever().start();

        tween(arrow).to(0.5, { scale: new Vec3(0.2, 0.2, 0.2), angle: 0 }, { easing: 'smooth' })
            .to(2, { scale: new Vec3(1.5, 1.5, 1.5), angle: 15 }, {
                easing: 'smooth', onComplete: () => {
                    // arrow.angle = 90;
                }
            }).union().repeatForever().start();
    };

    private strikerShoot(_pageNode: Node): void {
        const object: Node = _pageNode.getChildByName("obj");
        const circle: Node = object.getChildByName("ForceDirectionArrow").children[0];
        const arrow: Node = object.getChildByName("ForceDirectionArrow").children[1];
        const stricker: Node = object.getChildByName("ForceDirectionArrow").children[2];
        circle.setScale(1.5, 1.5, 1.5);
        arrow.setScale(1.5, 1.5, 1.5);
        arrow.angle = 15;

        const currentPos: Vec3 = stricker.getPosition();
        tween(stricker).to(0.5, { position: currentPos }, {
            easing: 'smooth'
        })
            .to(2, { position: new Vec3(currentPos.x - 40, currentPos.y + 200) }, {
                easing: 'smooth', onStart: () => {
                    circle.active = false;
                    arrow.active = false;
                }, onComplete: () => {
                    circle.active = true;
                    arrow.active = true;
                }
            }).union().repeatForever().start();
    };

    private strikerShootCancel(_pageNode: Node): void {
        const object: Node = _pageNode.getChildByName("obj");
        const circle: Node = object.getChildByName("ForceDirectionArrow").children[0];
        const arrow: Node = object.getChildByName("ForceDirectionArrow").children[1];
        const circleSprite: Sprite = circle.getComponent(Sprite);
        const arrowSprite: Sprite = arrow.getComponent(Sprite);

        tween(circle).to(2, { scale: new Vec3(0.8, 0.8, 0.8) }, {
            easing: 'smooth', onComplete: () => {
                circleSprite.enabled = false;
            }
        }).to(0.5, { scale: new Vec3(1.5, 1.5, 1.5) }, {
            easing: 'smooth', onComplete: () => {
                circleSprite.enabled = true;
            }
        })
            .union().repeatForever().start();

        tween(arrow).to(2, { scale: new Vec3(0.8, 0.8, 0.8) }, {
            easing: 'smooth', onComplete: () => {
                arrowSprite.enabled = false;
            }
        }).to(0.5, { scale: new Vec3(1.5, 1.5, 1.5) }, {
            easing: 'smooth', onComplete: () => {
                arrowSprite.enabled = true;
            }
        })
            .union().repeatForever().start();
    }
    //#endregion
}