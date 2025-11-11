import { _decorator, BoxCollider, Component, instantiate, Node, Prefab } from 'cc';
import { Constant } from '../../Constant';
const { ccclass, property } = _decorator;

@ccclass('WaterScript')
export class WaterScript extends Component {
    @property(Prefab) squareLog: Prefab = null!;
    private obstacles: Node[] = [];
    public collider: BoxCollider;
    @property(Prefab) coinPrefab: Prefab = null!;
    // private readonly enemyNames = new Set(['1cat', '2cow', '3dog', '4pig', '5rabbit']);

    private readonly tutorialPattern = [
        { unit: 2, pos: { x: -30, y: 0, z: 0 }, coin: true },
    ]

    protected async onEnable(): Promise<void> {
        if (Constant.mode === 'tutorial') {
            this.TutorailSpawnCoin();
        }
        await this.LoadObstaclesAndGenerate();
    }

    start() {
        // this.collider = this.node.children[0].getComponent(BoxCollider)!;
        // this.collider.on('onCollisionEnter', this.OnCollisionEnter, this);
    }
    //#region  Tutorial Spawn Coin Some Time Func
    TutorailSpawnCoin() {
        this.tutorialPattern.forEach(entry => {
            if (Math.random() >= 0.5 || !this.coinPrefab) return;
            const pos = entry.pos;
            const instance = instantiate(this.coinPrefab);
            const originalPos = instance.getPosition();
            instance.setParent(this.node);
            instance.setPosition(pos.x, originalPos.y, originalPos.z);
        });
    }
    //#endregion

    //#region  Obstacle Genarate Pattern
    async LoadObstaclesAndGenerate(): Promise<void> {

        // Fixed positions
        const fixedPositions = [-10, -50];

        for (let i = 0; i < fixedPositions.length; i++) {
            const log = instantiate(this.squareLog);
            log.setPosition(fixedPositions[i], log.position.y, log.position.z);
            this.node.addChild(log);
            this.obstacles.push(log);
        }

        // Randomly select one of the three sequences
        const sequences = [
            [-15, -20, -25, -30, -40],
            [-15, -25, -30, -35, -45],
            [-20, -30, -35, -40, -45],
        ];
        const randomIndex = Math.floor(Math.random() * sequences.length);
        const randomPositions = sequences[randomIndex];

        for (let i = 0; i < randomPositions.length; i++) {
            const log = instantiate(this.squareLog);
            log.setPosition(randomPositions[i], log.position.y, log.position.z);
            this.node.addChild(log);
            this.obstacles.push(log);
        }
    }
    //#endregion
}


