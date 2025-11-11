import { _decorator, Camera, Component, director, EventTarget, Node, sys, tween, UITransform } from 'cc';
import { UIManager } from './UIManager';
import { GridBoard } from './GridBoard';
import { QueueObject } from './QueueObject';
import GA from 'gameanalytics';

const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    public static gameManager: GameManager = null;
    gameEvent = new EventTarget();
    @property(Node) uiManagerNode: Node;
    uiManager: UIManager;
    playerData: Object = null;
    totalGivenTime: number = 0;
    timeToEnd: number = 0;

    gameID: string = null;

    gridBoard: GridBoard;
    queueBoard: QueueObject;

    background: Node;
    platform: Node;
    queuePlatform: Node;

    numberOfPlayButtonClicked: number = 0;
    cameraMain: Camera;
    //#region -onEnable
    protected onEnable(): void {
        if (GameManager.gameManager == null) {
            GameManager.gameManager = this;
        }

        if (director.getScene().name == "GameScene") {
            this.uiManagerNode = director.getScene().getChildByName("Canvas").getChildByName("UIManager");
            this.uiManager = this.uiManagerNode.getComponent(UIManager);

            const canvasNode = director.getScene().getChildByName("Canvas");
            this.platform = canvasNode.getChildByName("Grid");
            this.gridBoard = this.platform.getComponent(GridBoard);
            this.queueBoard = canvasNode.getChildByName("QueueBoard").getComponent(QueueObject);
            this.background = canvasNode.getChildByName("bgmenu");
            this.queuePlatform = canvasNode.getChildByName("QueueBoard");
            this.gameEvent.once("infoSkiped", this.InitialGridSetup, this);
            this.cameraMain = canvasNode.getChildByName('Camera').getComponent(Camera);
            // this.gameEvent.once("firstResize", this.BackgroundResponsive, this);
            // this.gameEvent.emit("firstResize");
        }
    }
    //#endregion

    //#region - CameraStartZoomEffect
    CameraStartZoomEffect(): void {
        const currentOrthoHeight = this.cameraMain.orthoHeight;
        this.cameraMain.orthoHeight = 400;
        tween(this.cameraMain).to(2, { orthoHeight: currentOrthoHeight }, { easing: 'backOut' }).start();
    }
    //#endregion

    //#region -SetInitialData
    SetInitialData(_gameID: string): void {
        // this.timeToEnd = _time;
        this.gameID = _gameID;
        // this.totalGivenTime = _totalGivenTime;
    }
    //#endregion

    //#region -InitialGridSetup
    InitialGridSetup(): void {
        GA.GameAnalytics.addProgressionEvent(
            "Start",
            "merge_city_endless"
        );
        this.gridBoard.InitialValueSet();
        this.queueBoard.InitialBuildingSpawn();
        this.queueBoard.UpdateBuyButtonInteractive();
        setTimeout(() => {
            this.gridBoard.isReadyToSpawnNewBuilding = true;
            this.uiManager.isTimerStart = true;
        }, 4000);
    }
    //#endregion

    //#region -IncreamentOfStartButtonClicked
    IncreamentOfStartButtonClicked(): void {
        this.numberOfPlayButtonClicked++;
    }
    //#endregion

    //#region -GetNumberOfStartButtonClicked
    GetNumberOfStartButtonClicked(): number {
        return this.numberOfPlayButtonClicked;
    }
    //#endregion

    //#region -BackgroundResponsive
    BackgroundResponsive(): void {
        const bgWidth: number = this.background.getComponent(UITransform).width;
        const bgHeight: number = this.background.getComponent(UITransform).height;

        const screenRatio: number = window.innerWidth / window.innerHeight;
        const targetRatio: number = bgWidth / bgHeight;
        const differenceInSize: number = targetRatio / screenRatio;
        const scaleMultiplier: number = 1 + differenceInSize / 2;

        this.background.getComponent(UITransform).height = bgHeight * scaleMultiplier;
        this.background.getComponent(UITransform).width = bgWidth * scaleMultiplier;
    }
    //#endregion
}


