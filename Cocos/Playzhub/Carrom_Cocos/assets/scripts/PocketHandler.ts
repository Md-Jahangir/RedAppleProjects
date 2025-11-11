import { _decorator, Component, instantiate, Node, NodePool, ParticleSystem2D, Prefab, RigidBody2D, tween, Vec2, Vec3 } from 'cc';
import { AssetLoader } from './utils/AssetLoader';
import { GameManager } from './GameManager';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

@ccclass('PocketHandler')
export class PocketHandler extends Component {

    private pocketPool: NodePool = new NodePool();

    @property(Node) pawnsParent: Node = null!;

    private _isMagneticBoosterOn: boolean = false;
    private _magneticIntervalId: number = 0;

    private readonly magneticRange: number = 200;
    private readonly pullforceStrength: number = 1500;

    private tempScheduleTask: Function | null = null;

    //#region ApplyMagneticBooster
    async ApplyMagneticBooster(): Promise<void> {
        if (this.node.children.length <= 0 || this._isMagneticBoosterOn) return;
        GA.GameAnalytics.addDesignEvent('ui:magnet_powerup_clicked');
        await GameManager.instance.ShowAd();
        this._isMagneticBoosterOn = true;
        this.node.children.forEach((pocketNode: Node) => {
            const blackHoleParticles = pocketNode.getChildByName('BlackholeEffect').children[0];
            blackHoleParticles.getComponent(ParticleSystem2D).resetSystem();

            const magneticFieldRange: Node = pocketNode.getChildByName('Pocket_Hole');
            if (magneticFieldRange) magneticFieldRange.active = true;
        });

        this._magneticIntervalId = setInterval(() => {
            this.pullNearbyCoinsToPockets();
        }, 0.05 * 1000);

        this.CloseMagneticBooster(10);
    }
    //#endregion

    //#region CloseMagneticBooster
    CloseMagneticBooster(_timeToEnd: number): void {
        if (this.tempScheduleTask) {
            this.unschedule(this.tempScheduleTask);
            this.tempScheduleTask = null;
        }

        this.tempScheduleTask = () => {
            this.node.children.forEach((pocketNode: Node) => {
                const blackHoleParticles = pocketNode.getChildByName('BlackholeEffect').children[0];
                blackHoleParticles.getComponent(ParticleSystem2D).stopSystem();

                const magneticFieldRange: Node = pocketNode.getChildByName('Pocket_Hole');
                if (magneticFieldRange) magneticFieldRange.active = false;
            });
            clearInterval(this._magneticIntervalId);
            this._isMagneticBoosterOn = false;
        };

        this.scheduleOnce(this.tempScheduleTask, _timeToEnd);

        const magneticFieldRange: Node = this.node.getChildByName('Pocket_Hole');
        if (magneticFieldRange) magneticFieldRange.active = true;
    };
    //#endregion

    //#region pullNearbyCoinsToPockets
    // private pullNearbyCoinsToPockets(): void {
    //     const coins: Node[] = this.getAllCoins();

    //     this.node.children.forEach((pocketNode: Node) => {
    //         const pocketPos = pocketNode.position;

    //         coins.forEach((coin: Node) => {
    //             const coinRb = coin.getComponent(RigidBody2D);
    //             const coinVelocity = this.GetCoinVelocity(coinRb.linearVelocity.x, coinRb.linearVelocity.y);
    //             if (coinRb && coinVelocity > 0.2) {
    //                 const coinPos = coin.getPosition();
    //                 const distance = coinPos.subtract(pocketPos).length();

    //                 if (distance < this.magneticRange) {
    //                     const direction = pocketPos.subtract(coinPos).normalize();
    //                     console.log('direction', direction);

    //                     const force = direction.multiplyScalar(this.pullforceStrength);
    //                     console.log('force', force);

    //                     coinRb.applyForceToCenter(new Vec2(force.x, force.y), true);
    //                 }
    //             }
    //         });
    //     });
    // }
    //#endregion
    private pullNearbyCoinsToPockets(): void {
        const maxForceDistance: number = 150;
        const xWeight: number = 1.0;
        const yWeight: number = 0.7;

        const coins: Node[] = this.getAllCoins();

        this.node.children.forEach((pocketNode: Node) => {
            const pocketPos = pocketNode.position;

            coins.forEach((coin: Node) => {
                const coinRb = coin.getComponent(RigidBody2D);
                const coinVelocity = this.GetCoinVelocity(coinRb.linearVelocity.x, coinRb.linearVelocity.y);

                if (coinRb && coinVelocity > 0.2) {
                    const coinPos = coin.getPosition();
                    const diff = coinPos.subtract(pocketPos);
                    const distance = diff.length();

                    if (distance < this.magneticRange) {
                        const weightedDir = new Vec2(diff.x * xWeight, diff.y * yWeight).normalize();
                        const clampedDistance = Math.min(distance, maxForceDistance);
                        const force = weightedDir.multiplyScalar(clampedDistance * (this.pullforceStrength / maxForceDistance));
                        coinRb.applyForceToCenter(new Vec2(-force.x, -force.y), true);
                    }
                }
            });
        });
    }

    //#region getAllCoins
    private getAllCoins(): Node[] {
        return this.pawnsParent.children;
    }
    //#endregion

    //#region GetCoinVelocity
    private GetCoinVelocity(x: number, y: number): number {
        return Math.sqrt(Math.abs(x) + Math.abs(y));
    }
    //#endregion

    //#region CreatePocket
    async CreatePocket(_pocketPosition: Object[]): Promise<void> {
        for (let i: number = 0; i < _pocketPosition.length; i++) {
            const pocket = await this.GetPocket();
            pocket.setParent(this.node);
            pocket.setPosition(_pocketPosition[i]['x'], _pocketPosition[i]['y']);
        };
    };
    //#endregion

    //#region RemovePocket
    async RemovePocket(): Promise<void> {
        for (let i = this.node.children.length - 1; i >= 0; i--) {
            const child = this.node.children[i];
            this.pocketPool.put(child)
        };
    };
    //#endregion

    //#region GetPocket
    private async GetPocket(): Promise<Node> {
        if (this.pocketPool.size() > 0) {
            return this.pocketPool.get();
        } else {
            const pocket: Prefab = await AssetLoader.LoadAsset('prefabs', 'Pocket', Prefab);
            return instantiate(pocket);
        };
    };
    //#endregion

    protected onDisable(): void {
        clearInterval(this._magneticIntervalId);
    }
}