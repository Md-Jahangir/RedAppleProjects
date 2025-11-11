import { _decorator, Component, instantiate, Node, Prefab, tween, Vec3 } from 'cc';
import { RepeatingSetScript } from '../RepeatingSetScript';
import { TrainScript } from '../TrainScript';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('TrainTrackScript')
export class TrainTrackScript extends Component {
    @property(Prefab) trainPrefab: Prefab = null!;
    @property(Node) signalLight: Node = null!;
    public train: Node = null!;
    private oneTimeTrainSpawn: boolean = false;

    //#region TrainSpawn Func
    TrainSpawn() {
        // if (this.oneTimeTrainSpawn) return;
        if (this.node.parent.getComponent(RepeatingSetScript).CheckRender()) {
            this.oneTimeTrainSpawn = true;
            const delay = Math.random() * 3000; // 0 to 3000 ms (0–3 seconds)
            setTimeout(() => {
                if (!GameManager.instance || !this.trainPrefab) return;
                this.train = instantiate(this.trainPrefab);
                this.train.setParent(this.node);
                const x = Math.random() < 0.5 ? 60 : -100;
                this.train.setPosition(x, this.train.position.y, this.train.position.z);
                this.train.getComponent(TrainScript).MoveTrain(new Vec3(x, this.train.position.y, this.train.position.z));
            }, delay);
        }
    }
    //#endregion

    //#region  TrainSignalBlink Func
    SignalBlink() {
        const blinkNode = this.signalLight;

        if (!blinkNode) return;

        blinkNode.active = true;
        blinkNode.setScale(new Vec3(1, 1, 1));

        // One blink (shrink then grow)
        const singleBlink = tween(blinkNode)
            .to(0.5, { scale: new Vec3(0, 0, 0) })
            .to(0.5, { scale: new Vec3(1, 1, 1) });

        // Run blink twice (2 seconds), then deactivate
        singleBlink
            .repeat(1.5, singleBlink)
            .call(() => {
                blinkNode.active = false;
            })
            .start();
    }
    //#endregion

    protected lateUpdate(dt: number): void {
        if (this.oneTimeTrainSpawn) return;
        this.TrainSpawn();
    }
}