import { _decorator, Component, EventTouch, instantiate, Node, NodePool, Prefab } from 'cc';
import { CarromenDatabase } from './Database/CarromenDatabase';
import { COIN_TYPE } from './Constant';
import { GameManager } from './GameManager';
import { AssetLoader } from './utils/AssetLoader';
const { ccclass, property } = _decorator;

@ccclass('PawnsHandler')
export class PawnsHandler extends Component {

    //private pawnsPrefab: Prefab[] = []; // 0-Black, 1-White, 2-Red, 3-Penalty

    private blackPawnPool: NodePool = new NodePool();
    private whitePawnPool: NodePool = new NodePool();
    private queenPawnPool: NodePool = new NodePool();
    private penaltyPawnPool: NodePool = new NodePool();

    @property(Node) settingPawnsParentAngle: Node | null = null;

    //#region CreatePawns
    async CreatePawns(
        blackPositions: Object[],
        whitePositions: Object[],
        queenPositions: Object[],
        penaltyPositions: Object[]
    ): Promise<void> {
        this.CreatePawnGroup(blackPositions, this.GetBlackPawns.bind(this));
        this.CreatePawnGroup(whitePositions, this.GetWhitePawns.bind(this));
        this.CreatePawnGroup(queenPositions, this.GetQueenPawn.bind(this));
        // this.CreatePawnGroup(penaltyPositions, this.GetPenaltyPawn.bind(this));
    }

    private async CreatePawnGroup(positions: Object[], getPawnFn: () => Node): Promise<void> {
        for (const pos of positions) {
            const pawn = await getPawnFn();
            pawn.setParent(this.node);
            const pawnScript = pawn.getComponent(CarromenDatabase);
            pawnScript?.StopMovement();
            pawnScript?.SetPocket(false);
            pawn.setPosition(pos['x'], pos['y']);
        }
    }
    //#endregion

    //#region RemovePawns
    async RemovePawns(): Promise<void> {
        for (let i = this.node.children.length - 1; i >= 0; i--) {
            const child = this.node.children[i];
            switch (child.name) {
                case 'BlackPawn':
                    this.blackPawnPool.put(child);
                    break;
                case 'WhitePawn':
                    this.whitePawnPool.put(child);
                    break;
                case 'QueenPawn':
                    this.queenPawnPool.put(child);
                    break;
                default:
                    this.penaltyPawnPool.put(child);
                    break;
            }
        }
    }
    //#endregion

    //#region Pawn Getters
    private GetPawnFromPool(pool: NodePool, prefab: Prefab): Node {
        return pool.size() > 0 ? pool.get() : instantiate(prefab);
    }

    async GetBlackPawns(): Promise<Node> {
        const blackPrefab: Prefab = await AssetLoader.LoadAsset('prefabs', 'BlackPawn', Prefab);
        return this.GetPawnFromPool(this.blackPawnPool, blackPrefab);
    }

    async GetWhitePawns(): Promise<Node> {
        const whitePrefab: Prefab = await AssetLoader.LoadAsset('prefabs', 'WhitePawn', Prefab);
        return this.GetPawnFromPool(this.whitePawnPool, whitePrefab);
    }

    async GetQueenPawn(): Promise<Node> {
        const queenPrefab: Prefab = await AssetLoader.LoadAsset('prefabs', 'QueenPawn', Prefab);
        return this.GetPawnFromPool(this.queenPawnPool, queenPrefab);
    }

    // GetPenaltyPawn(): Node {
    //     return this.GetPawnFromPool(this.penaltyPawnPool, this.pawnsPrefab[3]);
    // }
    //#endregion

    //#region GetPawnAvailableInBoard
    GetPawnAvailableInBoard(_coinToBeFind: COIN_TYPE): number {
        let pawnAvailable = 0;

        const isMatchingCoin = (_pawn: Node): boolean => {
            const db = _pawn.getComponent(CarromenDatabase);

            switch (_coinToBeFind) {
                case COIN_TYPE.WHITE:
                    return db.IsWhite();
                case COIN_TYPE.BLACK:
                    return db.IsBlack();
                case COIN_TYPE.QUEEN:
                    return db.IsQueen();
                default:
                    return false;
            }
        };

        this.node.children.forEach((_pawn: Node) => {
            if (_pawn.active && isMatchingCoin(_pawn)) {
                pawnAvailable++;
            }
        });

        return pawnAvailable;
    }
    //#endregion

    AddInputEvent(): void {

        if (!this.settingPawnsParentAngle) {
            this.OnAngleSetCompleted();
            return;
        }

        this.settingPawnsParentAngle.active = true;
        this.settingPawnsParentAngle.on(Node.EventType.TOUCH_MOVE, this.AdjustAngle, this);
        this.settingPawnsParentAngle.on(Node.EventType.TOUCH_END, this.OnAngleSetCompleted, this);
    }

    RemoveInputEvent(): void {
        if (!this.settingPawnsParentAngle) return;

        this.settingPawnsParentAngle.off(Node.EventType.TOUCH_MOVE, this.AdjustAngle, this);
        this.settingPawnsParentAngle.off(Node.EventType.TOUCH_END, this.OnAngleSetCompleted, this);
    }

    AdjustAngle(event: EventTouch): void {
        if (this.settingPawnsParentAngle && this.settingPawnsParentAngle.children[0].active) {
            this.settingPawnsParentAngle.children[0].active = false;
        }
        const deltaMousePosY = event.getDeltaY();
        this.node.angle += deltaMousePosY * 1;
    }

    OnAngleSetCompleted(): void {
        this.RemoveInputEvent();

        if (this.settingPawnsParentAngle) this.settingPawnsParentAngle.destroy();

        GameManager.instance.StartVsMode();
    }
}