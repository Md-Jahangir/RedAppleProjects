/******** Script_Details ***********
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 30-08-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 30-08-2024
 * @Description :- Main Board.
 ************************************/
import { _decorator, Collider2D, Component, Contact2DType, instantiate, IPhysics2DContact, Node, ParticleSystem2D, PhysicsSystem2D, Prefab, RigidBody2D } from 'cc';
import { CarromenDatabase } from './Database/CarromenDatabase';
import { GameManager } from './GameManager';
import { StrikerScript } from './StrikerScript';
import { AIStriker } from './AIStriker';
import { COIN_TYPE, Constant } from './Constant';
import { SoundManager } from './SoundManager';
import { AssetLoader } from './utils/AssetLoader';
const { ccclass, property } = _decorator;

@ccclass('BoardScript')
export class BoardScript extends Component {
    //#region Fields
    @property(Node) boardPoolParentNode: Node | null = null;
    //@property([Prefab]) boardPrefabs: Prefab[] = []; // index 0(classic), 1(Oval), 2(hexa);

    private readonly blackPawnsTag: number = 1;
    private readonly whitePawnsTag: number = 2;
    private readonly queenPawnTag: number = 3;
    private readonly playerStrikerTag: number = 4;
    private readonly aiStrikerTag: number = 5;
    private readonly pocketTag: number = 6;
    private readonly boardTag: number = 7;
    private readonly penaltyPawnsTag: number = 8;

    private pocketedNodes: Set<Node> = new Set();
    private isAnyCorrectCoinPocketed: boolean = false;
    private isCollisionProcessing: boolean = false;
    //#endregion

    //#region Enable
    protected onEnable(): void {
        PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.OnCollisionEnter, this);
    }
    //#endregion

    //#region CreateBoard
    /**
     * @description - SetBoard according to type of board in level.
     * @param _boardType 
     */
    async CreateBoard(_boardType: number): Promise<void> {
        this.boardPoolParentNode.active = true;
        const board = await this.GetBoard(_boardType);
        board.setParent(this.node);
        board.setPosition(0, -100, 0);
        this.boardPoolParentNode.active = false;
    }
    //#endregion

    //#region RemoveBoard
    /**
     * @description - Remove current board from board.
      */
    RemoveBoard(): void {
        this.boardPoolParentNode.active = true;
        this.node.children.forEach((child: Node) => child.setParent(this.boardPoolParentNode));
        this.boardPoolParentNode.active = false;
    }
    //#endregion

    //#region GetBoard
    /**
     * @description - Get board from board pool parent if already available, else intantiating it. for optimise performance, better from spawn and destroy regulary.
     * @param _type 
     * @returns 
     */
    async GetBoard(_type: number): Promise<Node | null> {
        const boardNames: string[] = ["ClassicBoard", "OvalBoard", "HexagonalBoard"];
        if (_type < 0 || _type >= boardNames.length) return null;

        let board: Node = this.boardPoolParentNode.getChildByName(boardNames[_type]);
        if (board) {
            return board;
        } else {
            const boardPrefab: Prefab = await AssetLoader.LoadAsset('prefabs', boardNames[_type], Prefab);
            board = instantiate(boardPrefab);
            return board;
        }
    }
    //#endregion

    //#region OnCollisionEnter
    /**
     * @description - Detect collision of coin and stricker pocket and handle it.
     * @param self 
     * @param others 
     * @param contact 
     */
    OnCollisionEnter(self: Collider2D, others: Collider2D, contact: IPhysics2DContact): void {
        const isSelfPocket = self.tag === this.pocketTag;
        const isOtherPocket = others.tag === this.pocketTag;

        this.PlayPawnSound(self, others);
        if (!isSelfPocket && !isOtherPocket) return;

        const pocketCollider = isSelfPocket ? self : others;
        const enteredObject = isSelfPocket ? others : self;
        this.HandlePocketCollision(enteredObject, pocketCollider);
        // const isSelfPocket = self.tag === this.pocketTag;
        // const isOtherPocket = others.tag === this.pocketTag;

        // // 🔇 Skip sound if any pocket is involved
        // if (!isSelfPocket && !isOtherPocket) {
        //     this.PlayPawnSound(self, others);
        // }

        // // 🕳️ Handle pocket logic
        // if (!isSelfPocket && !isOtherPocket) return;

        // const pocketCollider = isSelfPocket ? self : others;
        // const enteredObject = isSelfPocket ? others : self;
        // this.HandlePocketCollision(enteredObject, pocketCollider);
    }

    //#endregion

    PlayPawnSound(self: Collider2D, others: Collider2D): void {
        const isSelfPawn = self.tag === this.blackPawnsTag || self.tag === this.whitePawnsTag;
        const isOtherPawn = others.tag === this.blackPawnsTag || others.tag === this.whitePawnsTag;

        const isSelfStriker = self.tag === this.playerStrikerTag || this.aiStrikerTag;
        const isOtherStriker = others.tag === this.playerStrikerTag || this.aiStrikerTag;

        const isSelfBoard = self.tag === this.boardTag;
        const isOtherBoard = others.tag === this.boardTag;

        const isPawnStrikerCollision = (isSelfPawn && isOtherStriker) || (isOtherPawn && isSelfStriker);
        const isBoardStrikerCollision = (isSelfBoard && isOtherStriker) || (isOtherBoard && isSelfStriker)
        if (isPawnStrikerCollision) {
            SoundManager.instance.PawnsSound();
        }
        else if (isBoardStrikerCollision) {
            SoundManager.instance.BoardSound();
        }
    };

    private HandlePocketCollision(enteredObjectCollider: Collider2D, pocketCollider: Collider2D): void {
        const node = enteredObjectCollider.node;
        if (this.pocketedNodes.has(node)) {
            return;
        }
        if (!this.isCollisionProcessing) {
            this.isCollisionProcessing = true;
            this.isAnyCorrectCoinPocketed = false;

            this.scheduleOnce(() => {
                GameManager.instance.SetTurnChange(!this.isAnyCorrectCoinPocketed);
                this.isCollisionProcessing = false;
            }, 0.05);
        }
        this.PlayPocketParticles(pocketCollider.node);
        this.pocketedNodes.add(node);

        switch (enteredObjectCollider.tag) {
            case this.blackPawnsTag:
                this.HandleCarromMen(enteredObjectCollider.node, COIN_TYPE.BLACK, pocketCollider.node);
                break;
            case this.whitePawnsTag:
                this.HandleCarromMen(enteredObjectCollider.node, COIN_TYPE.WHITE, pocketCollider.node);
                break;
            case this.queenPawnTag:
                this.HandleCarromMen(enteredObjectCollider.node, COIN_TYPE.QUEEN, pocketCollider.node);
                break;
            case this.playerStrikerTag:
                this.HandleStrikerCollision(enteredObjectCollider.node, true, pocketCollider.node);
                break;
            case this.aiStrikerTag:
                this.HandleStrikerCollision(enteredObjectCollider.node, false, pocketCollider.node);
                break;
            case this.penaltyPawnsTag:
                this.HandleCarromMen(enteredObjectCollider.node, COIN_TYPE.PENALTY_PAWN, pocketCollider.node)
                break;
            default:
                console.log("Unknown object entered pocket:", enteredObjectCollider.node.name);
        }
    }

    //#region HandleCarromMen
    /**
     * @description - All balck and white coins pocket logics are here.
     * @param carromMen 
     * @param type 
     */
    HandleCarromMen(carromMen: Node, type: COIN_TYPE, pocketNode: Node): void {
        this.scheduleOnce(() => {
            const gameManager = GameManager.instance;
            const currentPlayerColor = gameManager.playerChoosedCoinColor;
            const isPlayerTurn = gameManager.playerTurn;
            const isAITurn = gameManager.aiTurn;
            const isCorrectTurn = (type === currentPlayerColor && isPlayerTurn) || (type !== currentPlayerColor && isAITurn);

            // Handle Queen Pocket Cover
            if (gameManager.isQueenPocket && !gameManager.isQueenCovered) {
                if (!isCorrectTurn) {
                    gameManager.RecoverCarrommen(COIN_TYPE.QUEEN);
                }
            }

            // Set the carrom men as pocketed
            carromMen.getComponent(CarromenDatabase).SetPocket(true, pocketNode);
            carromMen.setSiblingIndex(0);

            // Update score
            gameManager.UpdateScore(type);

            // Play pocket sound
            SoundManager.instance.PocketSound();

            this.scheduleOnce(() => {
                gameManager.GetPlayerCoinsQuantity(isPlayerTurn);
            }, 1)

            if (isCorrectTurn || type === COIN_TYPE.QUEEN) {
                this.isAnyCorrectCoinPocketed = true;
            }

        }, 0);
    }

    //#endregion

    //#region HandleStrikerCollision
    /**
     * @description - Called when striker pocket.
     * @param striker 
     * @param isPlayer 
     */
    HandleStrikerCollision(striker: Node, isPlayer: boolean, pocketNode: Node): void {
        this.scheduleOnce(() => {
            let strikerScript = isPlayer
                ? striker.getComponent(StrikerScript)
                : striker.getComponent(AIStriker);

            const strikerLinearVelocity = striker.getComponent(RigidBody2D).linearVelocity;
            const strikerVelocity = strikerScript.GetStrikerVelocity(strikerLinearVelocity.x, strikerLinearVelocity.y);

            if (isNaN(strikerVelocity) || strikerVelocity < 10) {
                strikerScript.isTurnChanging = true;
                strikerScript.RigidBodyEnable(false);
                strikerScript.StrikerPocket(pocketNode); // this handles animation, recovery, and turn
                const coinTobeRecover: COIN_TYPE =
                    (GameManager.instance.playerChoosedCoinColor == COIN_TYPE.WHITE) == isPlayer
                        ? COIN_TYPE.WHITE
                        : COIN_TYPE.BLACK;

                this.scheduleOnce(() => {
                    if (GameManager.instance.isQueenPocket && !GameManager.instance.isQueenCovered) {
                        GameManager.instance.RecoverCarrommen(COIN_TYPE.QUEEN);
                    }
                    GameManager.instance.RecoverCarrommen(coinTobeRecover);
                }, 0.1);
                SoundManager.instance.StrikerInPocketSound();
                GameManager.instance.BroadCast(Constant.FoulText);
            } else {
                // Turn changes only if striker is not pocketed
                // GameManager.instance.SetTurnChange(true);
                // strikerScript.TurnChange(); // directly continue with next turn
            }
        }, 0);
    }

    //#endregion

    private PlayPocketParticles(_pocket: Node): void {
        const particlesNode: Node = _pocket.getChildByName("Particles");
        const particles: ParticleSystem2D = particlesNode.getComponent(ParticleSystem2D);

        particles.resetSystem();

        this.scheduleOnce(() => {
            particles.stopSystem();
        }, 0.5);
    }

    public ResetPocketedState(): void {
        this.pocketedNodes.clear();
    }

    //#region Disable
    protected onDisable(): void {
        PhysicsSystem2D.instance.off(Contact2DType.BEGIN_CONTACT, this.OnCollisionEnter, this);
    }
    //#endregion
}