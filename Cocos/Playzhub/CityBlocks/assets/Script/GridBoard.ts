import { _decorator, Camera, Collider2D, Component, director, EPhysics2DDrawFlags, EventMouse, Graphics, input, Input, Node, PhysicsSystem2D, randomRangeInt, screen, tween, UITransform, Vec2, Vec3, view } from 'cc';
import { GridCell } from './GridCell';
import { QueueObject } from './QueueObject';
import { Score } from './Score';
import { InitialGridSet } from './InitialGridSet';
import { UIManager } from './UIManager';
import { Particles } from './Particles';
import { SoundManager } from './SoundManager';
const { ccclass, property } = _decorator;

@ccclass('GridBoard')
export class GridBoard extends Component {
    //#region -Fields
    @property(Node) queueBoardNode: Node;
    @property(Node) cameraNode: Node;
    @property(Score) scoreManager: Score;
    @property(Node) mouseOverImage: Node;
    @property(Node) uiManagerNode: Node;
    @property(Node) particlesParentNode: Node;
    @property(Graphics) graphics: Graphics = null;
    uiManager: UIManager;
    pariclesManager: Particles;

    initialGridPosition: InitialGridSet;
    mainCamera: Camera = null;
    queueBoard: QueueObject;
    cellArray: Node[][] = [];
    rows: number = 5;
    column: number = 5;
    numberOfSpawnFirstTime: number = 8;
    buildingsValueArray: number[] = [4, 8, 16, 32, 64, 128];
    isReadyToSpawnNewBuilding: boolean = false;
    maxBuildingValue: number = 128;

    continueMatchCounter: number = 0;
    isClicked: boolean = false;
    //#endregion

    //#region -onEnable
    protected onEnable(): void {
        this.queueBoard = this.queueBoardNode.getComponent(QueueObject);
        this.mainCamera = this.cameraNode.getComponent(Camera);
        this.initialGridPosition = this.node.getComponent(InitialGridSet);
        this.uiManager = this.uiManagerNode.getComponent(UIManager);
        this.pariclesManager = this.particlesParentNode.getComponent(Particles);

        input.on(Input.EventType.MOUSE_DOWN, this.GetCellData, this);
        input.on(Input.EventType.MOUSE_MOVE, this.MouseOverEffect, this);
        input.on(Input.EventType.TOUCH_START, this.GetCellData, this);

        // const physicsSystem = PhysicsSystem2D.instance;
        // physicsSystem.debugDrawFlags =
        //     EPhysics2DDrawFlags.Aabb |
        //     EPhysics2DDrawFlags.Pair |
        //     EPhysics2DDrawFlags.CenterOfMass |
        //     EPhysics2DDrawFlags.Joint |
        //     EPhysics2DDrawFlags.Shape;

    }
    //#endregion

    //#region -Start
    start() {
        this.SetInitialCellData();
        // this.InitialValueSet();
        // this.isReadyToSpawnNewBuilding = true;
    }
    //#endregion

    //#region -SetInitialCellData
    SetInitialCellData(): void {
        for (let i = 0; i < this.rows; i++) {
            this.cellArray[i] = [];
            for (let j = 0; j < this.column; j++) {
                this.cellArray[i][j] = this.node.getChildByName(`cell_${i}_${j}`);
                let cells = this.cellArray[i][j].getComponent(GridCell);
                cells.setRowAndColumn({ row: i, column: j });
            }
        }
    }
    //#endregion

    //#region -InitialValueSet
    InitialValueSet() {
        this.initialGridPosition.initialGridPosition.forEach(element => {
            let cells = this.cellArray[element.row][element.col].getComponent(GridCell);
            cells.setEmpty(false);
            setTimeout(() => {
                let buildingValue = this.buildingsValueArray[randomRangeInt(0, this.buildingsValueArray.length - 3)]
                cells.setValue(buildingValue);
                cells.setBuildingSprite(buildingValue);
                cells.PlayBuildingDropSmoke();
                // this.pariclesManager.BlastParticlePlay(this.cellArray[element.row][element.col].getPosition());
                // this.scoreManager.AddScore(buildingValue);
                // this.scoreManager.ScorePopup(this.cellArray[element.row][element.col].getPosition(), buildingValue.toString());
                SoundManager.instance.PlayBuildingPlace();
            }, 200 * this.numberOfSpawnFirstTime)
            this.numberOfSpawnFirstTime--;
        });
    }
    //#endregion

    //#region -GetCellData
    /**
     * @param event - event data for geting object
     */
    GetCellData(event): void {
        const clickPos = event.getUILocation();
        const collider = PhysicsSystem2D.instance.testPoint(clickPos);
        if (collider.length > 0 && this.isReadyToSpawnNewBuilding && !this.uiManager.isGamePause) {
            this.isClicked = true;
            let cell: Node = collider[0].node;
            this.SpawnBuildingAtCell(cell);
        }
        this.CheckGameOver();
    }
    //#endregion

    //#region -SpawnBuildingAtCell
    /**
     * @param _targerCell  - in which building spawn.
     */
    SpawnBuildingAtCell(_targerCell: Node): void {
        let targetCellScript: GridCell = _targerCell.getComponent(GridCell);
        if (targetCellScript.GetEmpty()) {
            let buildingValue = this.queueBoard.ListRotate();
            targetCellScript.setBuildingSprite(buildingValue);
            targetCellScript.setValue(buildingValue);
            targetCellScript.setEmpty(false);
            targetCellScript.PlayBuildingDropSmoke();
            // this.scoreManager.AddScore(buildingValue);
            // this.scoreManager.ScorePopup(targetCellScript.node.getPosition(), buildingValue.toString());
            // this.pariclesManager.BlastParticlePlay(targetCellScript.node.getPosition());
            SoundManager.instance.PlayBuildingPlace();
        }
        this.MatchingBuildings(targetCellScript);
    }
    //#endregion

    // //#region -MatchingBuildings
    // /**
    //  * @param targetCellScript 
    //  */
    // async MatchingBuildings1(targetCellScript: GridCell) {
    //     let cellData = targetCellScript.getRowAndColumn();
    //     if (this.IsMatch(cellData.row, cellData.column)) {

    //         if (this.isClicked) this.continueMatchCounter++;
    //         if (this.continueMatchCounter >= 3) this.scoreManager.AddSpecialCoin();

    //         this.isReadyToSpawnNewBuilding = false;
    //         let lastcellMatched = { row: cellData.row, col: cellData.column }
    //         let valueOfLastCell: number = this.cellArray[lastcellMatched.row][lastcellMatched.col].getComponent(GridCell).getValue();

    //         let matchCellList = this.GetMatchList();
    //         matchCellList.forEach(async element => {
    //             if (lastcellMatched.row == element.row && lastcellMatched.col == element.column) {
    //                 let currentValue: number = this.cellArray[element.row][element.column].getComponent(GridCell).getValue();
    //                 await this.sleep(0.5)
    //                 let newValue = currentValue < 128 ? currentValue * 2 : currentValue;
    //                 this.cellArray[element.row][element.column].getComponent(GridCell).setValue(newValue);
    //                 this.cellArray[element.row][element.column].getComponent(GridCell).setEmpty(false);
    //                 this.cellArray[element.row][element.column].getComponent(GridCell).setBuildingSprite(newValue);
    //                 // this.scoreManager.AddScore(newValue);
    //                 // this.scoreManager.ScorePopup(this.cellArray[element.row][element.column].getPosition(), newValue.toString());
    //                 SoundManager.instance.PlayBuildingMerge();
    //             }
    //             else {
    //                 this.cellArray[element.row][element.column].getComponent(GridCell).setEmpty(true);
    //                 let valueOfCell: number = this.cellArray[element.row][element.column].getComponent(GridCell).getValue()
    //                 if (valueOfCell == valueOfLastCell) {
    //                     this.scoreManager.AddScore(valueOfCell);
    //                     this.scoreManager.ScorePopup(this.cellArray[element.row][element.column].getPosition(), valueOfCell.toString());
    //                 }
    //                 this.cellArray[element.row][element.column].getComponent(GridCell).setValue(0);
    //                 let newPosition: Vec3 = new Vec3(this.cellArray[lastcellMatched.row][lastcellMatched.col].getPosition().x - this.cellArray[element.row][element.column].getPosition().x, this.cellArray[lastcellMatched.row][lastcellMatched.col].getPosition().y - this.cellArray[element.row][element.column].getPosition().y)
    //                 tween(this.cellArray[element.row][element.column].getComponent(GridCell).buildingRenderer).to(0.5, { position: newPosition }).start();
    //                 await this.sleep(0.5)
    //                 this.cellArray[element.row][element.column].getComponent(GridCell).setBuildingSprite(null);
    //                 this.cellArray[element.row][element.column].getComponent(GridCell).setEmpty(true);
    //             }
    //         });
    //         this.isClicked = false;
    //         await this.sleep(1);
    //         this.MatchingBuildings1(targetCellScript);
    //         await this.sleep(1);
    //         this.isReadyToSpawnNewBuilding = true;
    //     }
    //     else {
    //         if (this.isClicked)
    //             this.continueMatchCounter = 0;

    //         return
    //     }
    // }
    // //#endregion

    async MatchingBuildings(targetCellScript: GridCell) {
        const cellData = targetCellScript.getRowAndColumn();

        if (!this.IsMatch(cellData.row, cellData.column) || this.ValueAt(cellData.row, cellData.column) === this.maxBuildingValue) {
            if (this.isClicked) this.continueMatchCounter = 0;
            return;
        }

        if (this.isClicked) this.continueMatchCounter++;
        if (this.continueMatchCounter >= 3) {
            this.scoreManager.AddSpecialCoin();
            this.scoreManager.SpecialCoinPopup(new Vec3(0, 0), "Received +1 Special Coin!");
        }

        this.isReadyToSpawnNewBuilding = false;
        const lastcellMatched = { row: cellData.row, col: cellData.column };
        const valueOfLastCell = this.cellArray[lastcellMatched.row][lastcellMatched.col].getComponent(GridCell).getValue();

        const matchCellList = this.GetMatchList();
        const tasks = matchCellList.map(async (element) => {
            const gridCellNode = this.cellArray[element.row][element.column];
            const gridCell = gridCellNode.getComponent(GridCell);
            const currentValue = gridCell.getValue();

            //Skip processing if the value is 128
            if (currentValue === this.maxBuildingValue) return;

            if (lastcellMatched.row === element.row && lastcellMatched.col === element.column) {
                await this.sleep(0.5);
                let newValue = currentValue < this.maxBuildingValue ? currentValue * 2 : currentValue;
                gridCell.setEmpty(false);
                gridCell.setValue(newValue);
                gridCell.setBuildingSprite(newValue);
                this.queueBoard.UpdateBuyButtonInteractive();
                gridCell.PlayBuildingDropSmoke();
                SoundManager.instance.PlayBuildingMerge();
            } else {
                const valueOfCell = gridCell.getValue();
                if (valueOfCell === valueOfLastCell && !gridCell.GetEmpty()) {
                    this.scoreManager.AddScore(valueOfCell);
                    this.scoreManager.ScorePopup(gridCellNode.getPosition(), valueOfCell.toString());
                }
                gridCell.setEmpty(true);
                gridCell.setValue(0);
                const newPosition = new Vec3(
                    this.cellArray[lastcellMatched.row][lastcellMatched.col].getPosition().x - gridCellNode.getPosition().x,
                    this.cellArray[lastcellMatched.row][lastcellMatched.col].getPosition().y - gridCellNode.getPosition().y
                );
                tween(gridCell.buildingRenderer).to(0.5, { position: newPosition }).start();
                await this.sleep(0.5);
                gridCell.setBuildingSprite(null);
            }
        });

        await Promise.all(tasks);
        this.isClicked = false;
        await this.sleep(0.2);
        this.MatchingBuildings(targetCellScript);
        await this.sleep(1);
        this.isReadyToSpawnNewBuilding = true;
    }

    //#region -IsHorizontalCheck
    IsHorizontalCheck(_row: number, _col: number): boolean {
        //centercheck, right check, left check
        return this.ValueAt(_row, _col) === this.ValueAt(_row, _col + 1) && this.ValueAt(_row, _col) === this.ValueAt(_row, _col - 1) || this.ValueAt(_row, _col) === this.ValueAt(_row, _col + 1) && this.ValueAt(_row, _col) === this.ValueAt(_row, _col + 2) || this.ValueAt(_row, _col) === this.ValueAt(_row, _col - 1) && this.ValueAt(_row, _col) === this.ValueAt(_row, _col - 2);
    }
    //#endregion

    //#region -IsVerticalCheck
    IsVerticalCheck(_row: number, _col: number): boolean {
        return this.ValueAt(_row, _col) === this.ValueAt(_row + 1, _col) && this.ValueAt(_row, _col) === this.ValueAt(_row - 1, _col) || this.ValueAt(_row, _col) === this.ValueAt(_row + 1, _col) && this.ValueAt(_row, _col) === this.ValueAt(_row + 2, _col) || this.ValueAt(_row, _col) === this.ValueAt(_row - 1, _col) && this.ValueAt(_row, _col) === this.ValueAt(_row - 2, _col);
    }
    //#endregion

    //#region -IsElbowCheck
    IsElbowMidCheck(_row: number, _col: number): boolean {
        //F mid check,L mirror mid check, L mid check, L opposite
        return this.ValueAt(_row, _col) === this.ValueAt(_row + 1, _col) && this.ValueAt(_row, _col) === this.ValueAt(_row, _col + 1) || this.ValueAt(_row, _col) === this.ValueAt(_row - 1, _col) && this.ValueAt(_row, _col) === this.ValueAt(_row, _col - 1) || this.ValueAt(_row, _col) === this.ValueAt(_row - 1, _col) && this.ValueAt(_row, _col) === this.ValueAt(_row, _col + 1) || this.ValueAt(_row, _col) === this.ValueAt(_row + 1, _col) && this.ValueAt(_row, _col) === this.ValueAt(_row, _col - 1);
    }
    //#endregion

    //#region -IsElbowRLOrLRCheck
    IsElbowRLOrLRCheck(_row: number, _col: number): boolean {
        //-|, |-
        return this.ValueAt(_row, _col) === this.ValueAt(_row + 1, _col) && this.ValueAt(_row, _col) === this.ValueAt(_row + 1, _col + 1) || this.ValueAt(_row, _col) === this.ValueAt(_row - 1, _col) && this.ValueAt(_row, _col) === this.ValueAt(_row - 1, _col - 1) || this.ValueAt(_row, _col) === this.ValueAt(_row, _col + 1) && this.ValueAt(_row, _col) === this.ValueAt(_row + 1, _col + 1) || this.ValueAt(_row, _col) === this.ValueAt(_row, _col - 1) && this.ValueAt(_row, _col) === this.ValueAt(_row - 1, _col - 1) || this.ValueAt(_row, _col) === this.ValueAt(_row + 1, _col) && this.ValueAt(_row, _col) === this.ValueAt(_row + 1, _col - 1) || this.ValueAt(_row, _col) === this.ValueAt(_row - 1, _col) && this.ValueAt(_row, _col) === this.ValueAt(_row - 1, _col + 1) || this.ValueAt(_row, _col) === this.ValueAt(_row, _col
            + 1) && this.ValueAt(_row, _col) === this.ValueAt(_row - 1, _col + 1) || this.ValueAt(_row, _col) === this.ValueAt(_row, _col
                - 1) && this.ValueAt(_row, _col) === this.ValueAt(_row - 1, _col - 1) || this.ValueAt(_row, _col) === this.ValueAt(_row, _col - 1) && this.ValueAt(_row, _col) === this.ValueAt(_row + 1, _col - 1);
    }
    //#endregion

    //#region -IsMatch
    IsMatch(_row: number, _col: number): boolean {
        return this.IsElbowRLOrLRCheck(_row, _col) || this.IsHorizontalCheck(_row, _col) || this.IsVerticalCheck(_row, _col) || this.IsElbowMidCheck(_row, _col);
    }
    //#endregion

    //#region -ValueAt
    ValueAt(_row: number, _col: number): number {
        if (!this.ValidPick(_row, _col)) {
            return
        }
        return this.cellArray[_row][_col].getComponent(GridCell).getValue();
    }
    //#endregion

    //#region -ValidPick
    ValidPick(_row: number, _col: number): boolean {
        return _row >= 0 && _row < this.rows && _col >= 0 && _col < this.column && this.cellArray[_row] != undefined && this.cellArray[_row][_col] != undefined && !this.cellArray[_row][_col].getComponent(GridCell).GetEmpty();
    }
    //#endregion

    //#region -GetMatchList
    GetMatchList(): any {
        let matches = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.column; j++) {
                // Skip cells with value 128
                if (this.ValueAt(i, j) === this.maxBuildingValue) {
                    this.cellArray[i][j].getComponent(GridCell).OnMaxBuilding();
                    continue;
                }
                if (this.IsMatch(i, j)) {
                    matches.push({ row: i, column: j });
                }
            }
        }
        return matches;
    }
    //#endregion

    //#region -CalculateValue
    CalculateValue(_object): number {
        let totalValue: number = 0;
        _object.forEach(element => {
            totalValue += this.cellArray[element.row][element.column].getComponent(GridCell).getValue();
        });
        return totalValue;
    }
    //#endregion

    //#region -Sleep
    /**
     * @description - For pause execution in given time.
     * @param seconds - Delay value in Seconds.
     * @returns - promise for async function
     */
    sleep(seconds: number) {
        return new Promise((e) => setTimeout(e, seconds * 1000));
    }
    //#endregion

    //#region -MouseOverEffect
    MouseOverEffect(event: EventMouse): void {
        const clickPos = event.getUILocation();
        // this.graphics.clear()
        // this.graphics.circle(clickPos.x, clickPos.y, 10);
        // this.graphics.fill();
        const collider = PhysicsSystem2D.instance.testPoint(clickPos);
        if (collider.length > 0 && collider[0].node.getComponent(GridCell).GetEmpty() && !this.uiManager.isGamePause && this.isReadyToSpawnNewBuilding) {
            this.mouseOverImage.active = true;
            this.mouseOverImage.setPosition(collider[0].node.getPosition().x, collider[0].node.getPosition().y - 10.666, collider[0].node.getPosition().z);
        } else {
            this.mouseOverImage.active = false;
        }
    }
    //#endregion

    //#region -CheckGameOver
    CheckGameOver(): void {
        let isGridHaveSpace: boolean;

        this.cellArray.forEach((cells: Node[], _index: number, array: Node[][]) => {
            cells.forEach((cells: Node, _index) => {
                if (cells.getComponent(GridCell).GetEmpty()) {
                    isGridHaveSpace = true;
                }
            })
        })
        if (!isGridHaveSpace) {
            this.uiManager.event.emit("gameOver");
        }
    }
    //#endregion

    //#region -onDisable
    protected onDisable(): void {
        input.off(Input.EventType.MOUSE_DOWN, this.GetCellData, this)
        input.off(Input.EventType.MOUSE_MOVE, this.MouseOverEffect, this);
    }
    //#endregion
}


