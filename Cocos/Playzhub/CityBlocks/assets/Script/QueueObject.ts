import { _decorator, Animation, Button, Component, director, instantiate, Label, Node, Prefab, randomRangeInt, sp, Sprite, Vec3 } from 'cc';
import { BuildingDatabase } from './BuildingDatabase';
import { UIManager } from './UIManager';
import { Score } from './Score';
import { SoundManager } from './SoundManager';
import { Particles } from './Particles';
import { AdManager } from './AdManager';
import { PlayzhubEventHandler } from './PlayzhubEventHandler';
const { ccclass, property } = _decorator;

@ccclass('QueueObject')
export class QueueObject extends Component {
    //#region -Fields
    //prefabs
    @property(Prefab) buildingsPrefab: Prefab[] = [];
    //spawnpoints
    @property(Node) spawnPoints: Node[] = [];
    spawnPointspineAnimation: sp.Skeleton[] = [];
    //buildings will instantiate here
    @property(Node) buildingsStorage: Node;
    //Building Buy list
    @property(Node) buildingBuyList: Node;
    @property(Score) scoreManager: Score = null;

    //data
    buildingForQueuePool: Node[] = [];
    queueItems: Node[] = [];

    isFirstSpawn: boolean = true;
    uiManager: UIManager = null;
    timeInterval = null;

    @property(Node) particleNode: Node = null;
    particles: Particles;
    //#endregion

    //#region -onEnable
    protected onEnable(): void {
        this.uiManager = director.getScene().getChildByName("Canvas").getChildByName("UIManager").getComponent(UIManager);
        // this.particles = this.particleNode.getComponent(Particles);
        // this.particles.StopSelectedParticles();
        this.spawnPoints.forEach((_node: Node, _index: number) => {
            this.spawnPointspineAnimation.push(_node.getChildByName('spineAnimation').getComponent(sp.Skeleton));
        })
        this.particleNode.active = false;
    }
    //#endregion

    //#region -Start
    start() {
        // this.InitialBuildingSpawn();
        // this.UpdateBuyButtonInteractive();
    }
    //#endregion

    //#region -UpdateBuyButtonInteractive
    UpdateBuyButtonInteractive(): void {
        this.buildingBuyList.children.forEach((_building: Node, _index: number) => {
            const buildingValue: number = parseInt(_building.children[0].getComponent(Label).string);
            if (buildingValue <= this.scoreManager.GetSpecialCoin()) {
                _building.getComponent(Button).interactable = true;
                _building.getChildByName('ad_icon').active = false;
                _building.getComponent(Sprite).spriteFrame = _building.getComponent(Button).normalSprite;
                _building.getChildByName("Shimmer").children[0].getComponent(Animation).play();
            }
            else {
                _building.getComponent(Button).interactable = true;
                _building.getChildByName('ad_icon').active = true;
                _building.getComponent(Sprite).spriteFrame = _building.getComponent(Button).normalSprite;
                // _building.getComponent(Button).interactable = false;
                // _building.getComponent(Sprite).spriteFrame = _building.getComponent(Button).disabledSprite;
                const shimmerNode: Node = _building.getChildByName("Shimmer").children[0];
                shimmerNode.getComponent(Animation).stop();
                shimmerNode.setPosition(-125, shimmerNode.getPosition().y, shimmerNode.getPosition().z);
            }
        })
    }
    //#endregion

    //#region -OnBuyBuilding
    async OnBuyBuilding(event): Promise<void> {
        let coinDeduction: number = event.currentTarget.children[0].getComponent(Label).string;
        const buyBuildingAction = () => {
            let buildingValue: number = event.currentTarget.getComponent(BuildingDatabase).GetValue();
            let returnToPool: Node = this.ShiftFromQueue();
            let slicedBuilding: Node = this.FindBuildingFromPoolArray(buildingValue);
            this.queueItems.unshift(slicedBuilding);
            this.PushToPool(returnToPool);
            this.queueItems[0].setParent(this.spawnPoints[0]);
            this.queueItems[0].setPosition(Vec3.ZERO);
            this.queueItems[0].getComponent(Animation).stop();
            this.queueItems[0].active = true;
            this.queueItems[0].getComponent(Animation).play("BuyBuilding");
            setTimeout(() => {
                this.spawnPointspineAnimation[0].setAnimation(0, 'smoke', false);
            }, 1000)
            this.scoreManager.DeductSpecialCoin(coinDeduction);
            SoundManager.instance.PlayBuildingBuy();
            setTimeout(() => {
                this.uiManager.BuildingBuyPopCloseButton();
            }, 100);
        }
        if (this.scoreManager.GetSpecialCoin() >= coinDeduction) {
            buyBuildingAction();
        } else {
            await this.ShowAd(buyBuildingAction);
        }
        this.UpdateBuyButtonInteractive();
    }
    //#endregion

    //#region -PushToQueue
    /**
     * @param _object 
     */
    PushToQueue(_object: Node): void {
        this.queueItems.push(_object);
    }
    //#endregion

    //#region -ShiftFromQueue
    ShiftFromQueue(): Node {
        let dequeueBuilding = this.queueItems.shift();
        if (dequeueBuilding) {
            dequeueBuilding.setParent(this.buildingsStorage);
            dequeueBuilding.setPosition(new Vec3(0, 0, 0));
        }
        return dequeueBuilding;
    }
    //#endregion

    //#region -PushToPool
    /**
     * @param _object 
     */
    PushToPool(_object: Node): void {
        this.buildingForQueuePool.push(_object);
    }
    //#endregion

    //#region -ShiftForPool
    ShiftForPool(): Node {
        return this.buildingForQueuePool.shift();
    }
    //#endregion

    //#region -RandomPickFromPool
    RandomPickFromPool(): Node {
        let randomPick: Node[] = this.buildingForQueuePool.splice(randomRangeInt(0, this.buildingForQueuePool.length), 1);
        return randomPick[0];
    }
    //#endregion

    //#region -ListRotate
    ListRotate(): number {
        let dequeueBuilding = this.ShiftFromQueue();
        let dequeueBuildingValue = dequeueBuilding.getComponent(BuildingDatabase).GetValue();
        dequeueBuilding.getComponent(Animation).stop();
        let newQueueBuilding = this.RandomPickFromPool();
        newQueueBuilding.getComponent(Animation).stop();
        this.PushToQueue(newQueueBuilding);
        this.RePositioningQueueItems();
        dequeueBuilding.active = false;
        this.PushToPool(dequeueBuilding);
        return dequeueBuildingValue;
    }
    //#endregion

    //#region -InitialBuildingSpawn
    InitialBuildingSpawn(): void {
        for (let i = 0; i < 50; i++) {
            let randomBuildingIndex: number = randomRangeInt(0, this.buildingsPrefab.length - 1);
            let _building: Node = instantiate(this.buildingsPrefab[randomBuildingIndex]);
            _building.setParent(this.buildingsStorage);
            _building.active = false;
            this.PushToPool(_building);
        }
        for (let i = 0; i < 3; i++) {
            let queueBuilding = this.ShiftForPool();
            this.PushToQueue(queueBuilding);
        }
        setTimeout(() => { this.RePositioningQueueItems() }, 2000);
    }
    //#endregion

    //#region -FindBuildingFromPoolArray
    FindBuildingFromPoolArray(_value: number): Node {
        let selectedBuilding: Node[];
        this.buildingForQueuePool.forEach((_building: Node, _index: number, _buildingArray: Node[]) => {
            if (_building.getComponent(BuildingDatabase).GetValue() == _value) {
                if (!selectedBuilding) {
                    selectedBuilding = this.buildingForQueuePool.splice(_index, 1);
                }
            }
        })
        return selectedBuilding[0];
    }
    //#endregion

    //#region -RePositioningQueueItems
    RePositioningQueueItems(): void {
        let idleTimeCountdown: number = 0;
        clearInterval(this.timeInterval);
        if (this.particleNode)
            this.particleNode.active = false;

        for (let i: number = 0; i < 3; i++) {
            this.queueItems[i].setParent(this.spawnPoints[i]);
            this.queueItems[i].setPosition(Vec3.ZERO);
            if (i === 0)
                this.queueItems[i].setSiblingIndex(1);
        }
        if (this.isFirstSpawn) {
            for (let i: number = 0; i < 3; i++) {
                setTimeout(() => {
                    this.queueItems[i].active = true;
                    this.queueItems[i].getComponent(Animation).play("DroppingEffect");
                    setTimeout(() => {
                        this.spawnPointspineAnimation[i].setAnimation(0, 'smoke', false);
                    }, 150)
                }, (i + 1) * 500);
            }
            setTimeout(() => { this.isFirstSpawn = false; }, 2000);
        } else {
            for (let i: number = 0; i < 3; i++) {
                if (i === 2) {
                    setTimeout(() => {
                        this.queueItems[i].active = true;
                        this.queueItems[i].getComponent(Animation).play("DroppingEffect");
                        setTimeout(() => {
                            this.spawnPointspineAnimation[i].setAnimation(0, 'smoke', false);
                        }, 150)
                    }, 300);
                }
                else {
                    this.queueItems[i].active = true;
                    if (this.queueItems[i].angle != 0)
                        this.queueItems[i].angle = 0;

                    this.queueItems[i].getComponent(Animation).play("MoivingFrontInQueue");
                    setTimeout(() => {
                        this.spawnPointspineAnimation[i].setAnimation(0, 'smoke', false);
                    }, 300)
                }
            }
        }
        this.shuffleArray(this.buildingForQueuePool);
        this.timeInterval = setInterval(() => {
            idleTimeCountdown++;
            if (idleTimeCountdown === 1) {
                this.particleNode.active = true;
            } else if (idleTimeCountdown === 6) {
                this.IdleAnimation();
                clearInterval(this.timeInterval);
            }
        }, 1000);
    }
    //#endregion

    //#region IdleAnimationOf1stQueueElement
    IdleAnimation(): void {
        this.queueItems[0]?.getComponent(Animation).play("SelectedAnimation");
    }
    //#endregion

    //#region -shuffleArray
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    //#endregion

    async ShowAd(onCompleteAdsCallback?: () => void) {
        const adManager = AdManager.getInstance();
        try {
            if (onCompleteAdsCallback) {
                await adManager.RequestAdAsync(1000, onCompleteAdsCallback);
            } else {
                await adManager.RequestAdAsync();
            }

            PlayzhubEventHandler.GamePlayResumed();
            console.info("Ad completed, game resumed!");
            director.resume();
        } catch (e) {
            console.error("Ad error:", e);
        }
    }

    protected onDisable(): void {
        if (this.timeInterval)
            clearInterval(this.timeInterval);
    }
}


