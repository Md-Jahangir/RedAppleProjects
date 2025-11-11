import { _decorator, Component, EventTouch, Input, instantiate, Layout, Node, Prefab, randomRangeInt, SpriteFrame, UITransform } from 'cc';
import { Constant, GAME_EVENTS } from './globals/Constant';
import { GridCellDatabase } from './GridCellDatabase';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Grid')
export class Grid extends Component {

    //#region  - Fields
    @property(Prefab) gridCellPrefab: Prefab = null;
    @property(Node) gridCellPoolNode: Node = null;
    gridLayout: Layout;
    gridSize: Object = {};
    gridCellArray: Node[] = [];
    gridVisibleData = null;
    numberOfCellSpawn: number = 0;

    @property(SpriteFrame) enabledSpriteFrames: SpriteFrame[] = [];
    @property(SpriteFrame) disabledSpriteFrames: SpriteFrame[] = [];
    //#endregion

    //#region -OnEnable
    protected onEnable(): void {
        this.gridLayout = this.node.getComponent(Layout);
    }
    //#endregion

    //#region -SetData
    /**
     * @description - Getting data from constant and assign to make grid.
     */
    SetData(): void {
        this.gridSize = Constant.LEVEL_JSON['grid_size'];
        this.gridVisibleData = Constant.LEVEL_JSON['grid_data'];

        // total number of cells = row * col;
        this.numberOfCellSpawn = this.gridSize["row"] * this.gridSize["col"];
    }
    //#endregion

    //#region -MakeGrid
    /**
     * @description - Making grid here.
     */
    MakeGrid(): void {
        this.gridCellPoolNode.active = true;// For Optimizing purpose.
        // Set required data for make grid before Grid spawn.
        this.SetData();
        // Get grid cell prefab.
        const cellSize = this.CalculateCellSize();
        //Making Grid and setting row and col value.
        for (let i: number = 0; i < this.gridSize["col"]; i++) {
            for (let j: number = 0; j < this.gridSize["row"]; j++) {
                const cell = this.GetCell(this.gridCellPrefab);
                this.SpawnCell(cell, cellSize);
                this.CellDatabaseSetup(cell, i, j);
                this.gridCellArray.push(cell);
            }
        }
        this.SetAlphabetsOnGridCells(); //Set Initially alphabets on grid but visible off.
        this.gridCellPoolNode.active = false; // For Optimizing purpose.
    }
    //#endregion

    //#region -SpawnCell
    /**
     * @description - Set cell physical properties after instantiated.
     * @param _cell - Instatiated Cell.
     * @param _cellSize - For set height and width.
     */
    SpawnCell(_cell: Node, _cellSize: number): void {
        const cellUITransform = _cell.getComponent(UITransform);
        cellUITransform.width = _cellSize;
        cellUITransform.height = _cellSize;
        const uiTransform = _cell.getChildByName("baseImage").getComponent(UITransform);
        uiTransform.width = _cellSize;
        uiTransform.height = _cellSize;
        _cell.setParent(this.node);
    }
    //#endregion

    //#region -CellDatabaseSetup
    /**
     * @description - Settin required data for alphabets.
     * @param _cell - Cell of grid which instantiated.
     * @param _row - For giving position of cell.
     * @param _col -For giving position of cell.
     */
    CellDatabaseSetup(_cell: Node, _row: number, _col: number): void {
        _cell.on(Input.EventType.TOUCH_START, this.OnTouchCell, this);
        const gridCellDatabase = _cell.getComponent(GridCellDatabase);
        const visible = this.gridVisibleData[_row][_col];
        gridCellDatabase.SetVisible(visible);
        gridCellDatabase.SetRowAndColumn(_row, _col);
        const { enabledSpriteFrame, disabledSpriteFrame } = this.GetSpriteFrame();
        gridCellDatabase.StopRippleAnimation();
        if (visible) {
            gridCellDatabase.SetSpriteFrame(enabledSpriteFrame, disabledSpriteFrame);
            gridCellDatabase.SetFontSize(_cell.getComponent(UITransform).height / 2);
            // gridCellDatabase.PlayRippleAnimation("ripple", true);
        }
    }
    //#endregion

    //#region -OnTouchCell
    /**
     * @description -For revealing feature.
     */
    OnTouchCell(_eventData: EventTouch): void {
        // if (!GameManager.instance.GetReavealHammerActive()) {
        //     const touchedNode: Node = _eventData?.currentTarget;
        //     this.ReavealGridCell(touchedNode)
        // }
        GameManager.instance.BuzzitHint(_eventData);
    }
    //#endregion

    //#region -ReavealGridCell
    /**
     * @description - Revealing grid cell main function.
     * @param _cell For reveal.
     */
    ReavealGridCell(_cell: Node): void {
        GameManager.instance.SetReavealHammerActive(true);
        const touchedEventsDatabase: GridCellDatabase = _cell.getComponent(GridCellDatabase);
        if (touchedEventsDatabase.GetRevealed()) {
            return // return if already revealed.
        } else {
            touchedEventsDatabase.ShowAlphabet(true);
            touchedEventsDatabase.IsRevealed(true, 0);
        }
        GameManager.instance.selectedWords = this.PushRevealedWord();

        this.scheduleOnce(() => {
            this.CheckLevelComplete(); //Check level complete or not After reveal.
        }, 0.5)
    }
    //#endregion

    //#region -GetRandomGridCell
    /**
     * @description - This is only for the button click feature.
     * @returns grid cell for reveal in grid.
     */
    GetRandomGridCell(): Node {
        let newCell: Node = null;
        this.gridCellArray.forEach((_cell: Node, _index: number) => {
            const cellDatabase = _cell.getComponent(GridCellDatabase);
            if (!cellDatabase.GetRevealed() && cellDatabase.IsVisible()) {
                newCell = _cell;
                return
            }
        })
        return newCell;
    }
    //#endregion

    //#region -CalculateCellSize
    /**
     * @description - Calculate grid cell.
     * @returns Width calculate taken by totoal row grid cell.
     */
    CalculateCellSize(): number {
        return (Constant.GRID_WIDTH - ((Constant.CELL_SPACING_X * this.gridSize['row']) + Constant.PADDING_VALUE)) / this.gridSize['row'];
    }
    //#endregion

    //#region -GetCell
    /**
     * @description -Object pooling.
     * @param _prefab 
     * @returns 
     */
    GetCell(_prefab: Prefab): Node {
        if (this.gridCellPoolNode.children.length > 0) {
            return this.gridCellPoolNode.children[0];
        } else {
            return instantiate(_prefab);
        }
    }
    //#endregion

    //#region -MatchCellReveal
    /**
     * @description -Reveal alphabets on grid.
     * @param _word - Matched word.
     * @param _wordProperty - Property of Matched word.
     */
    MatchCellReveal(_word: string, _wordProperty: Object, _isMatching: boolean): void {
        // find index formula = (currRow * totalNumberOfColumn) + currCol.
        const startIndex = (_wordProperty['pos'][0] * this.gridSize['row']) + _wordProperty['pos'][1];

        for (let i = 0; i < _word.length; i++) {
            if (_wordProperty['direction'] === 'V') {
                const currIndex = startIndex + (this.gridSize['row'] * i);
                const gridcellDatabase: GridCellDatabase = this.node.children[currIndex].getComponent(GridCellDatabase);
                gridcellDatabase.ShowAlphabet(true);
                if (_isMatching) {
                    gridcellDatabase.IsRevealed(true, i);
                } else {
                    gridcellDatabase.HintCell();
                }
            } else {
                const currIndex = startIndex + i;
                const gridcellDatabase: GridCellDatabase = this.node.children[currIndex].getComponent(GridCellDatabase);
                gridcellDatabase.ShowAlphabet(true);
                if (_isMatching) {
                    gridcellDatabase.IsRevealed(true, i);
                } else {
                    gridcellDatabase.HintCell();
                }
            }
        }
    }
    //#endregion

    //#region -SetAlphabetsOnGridCells
    /**
     * @description - Initialy Set Alphabets.
     */
    SetAlphabetsOnGridCells(): void {
        const wordListOnGrid: string[] = Object.getOwnPropertyNames(GameManager.instance.wordsInGrid);
        for (let i = 0; i < wordListOnGrid.length; i++) {
            const word: string = wordListOnGrid[i];
            const wordProperty = GameManager.instance.wordsInGrid[word];
            const startIndex = (wordProperty['pos'][0] * this.gridSize['row']) + wordProperty['pos'][1];

            for (let j = 0; j < word.length; j++) {
                if (wordProperty['direction'] === 'V') {
                    const currIndex = startIndex + (this.gridSize['row'] * j);
                    const alphabetOnGridCell = this.node.children[currIndex].getComponent(GridCellDatabase);
                    alphabetOnGridCell.SetAlphabet(word[j]);
                    alphabetOnGridCell.ShowAlphabet(false);// hide alphabet
                } else {
                    const currIndex = startIndex + j;
                    const alphabetOnGridCell = this.node.children[currIndex].getComponent(GridCellDatabase);
                    alphabetOnGridCell.SetAlphabet(word[j]);
                    alphabetOnGridCell.ShowAlphabet(false);// hide alphabet
                }
            }
        }
    }
    //#endregion

    //#region PushRevealedWord
    /**
     * @description - Automatically push revealed word, checks every event of cells for revealed words.
     * @returns 
     */
    PushRevealedWord(): string[] {
        const wordListOnGrid: string[] = Object.getOwnPropertyNames(GameManager.instance.wordsInGrid);
        let revealedWordArray: string[] = [];

        for (let i = 0; i < wordListOnGrid.length; i++) {
            const word: string = wordListOnGrid[i];
            const wordProperty = GameManager.instance.wordsInGrid[word];
            const startIndex = (wordProperty['pos'][0] * this.gridSize['row']) + wordProperty['pos'][1];
            let isWordFullyRevealed: boolean = true;

            for (let j = 0; j < word.length; j++) {
                let currIndex: number;
                if (wordProperty['direction'] === 'V') {
                    currIndex = startIndex + (this.gridSize['row'] * j);
                } else {
                    currIndex = startIndex + j;
                }

                const alphabetOnGridCell = this.node.children[currIndex].getComponent(GridCellDatabase);
                if (!alphabetOnGridCell.GetRevealed()) {
                    isWordFullyRevealed = false;
                    break;
                }
            }

            if (isWordFullyRevealed) {
                revealedWordArray.push(word);
            }
        }
        return revealedWordArray;
    }
    //#endregion

    //#region FocusGridCell
    FocusGridCell(_isPlay: boolean): void {
        this.node.children.forEach((_grid: Node, _index: number) => {
            const gridCellScript: GridCellDatabase = _grid.getComponent(GridCellDatabase)
            if (gridCellScript.IsActiveForFocus() && _isPlay)
                gridCellScript.PlayFocusAnimation();
            else
                gridCellScript.StopFocusAnimation();

        })
    }
    //#endregion

    //#region -CheckLevelComplete
    /**
     * @description - For check level complete or not in every match checking.
     */
    CheckLevelComplete(): void {
        let isComplete: boolean = true;
        this.node.children.forEach((_child: Node, _index: number) => {
            if (!_child.getComponent(GridCellDatabase).GetRevealed() && _child.getComponent(GridCellDatabase).IsVisible()) {
                isComplete = false;
            }
        })

        if (isComplete) {
            GameManager.instance.gameEvent.emit(GAME_EVENTS.LEVEL_COMPLETE);
        }
    }
    //#endregion

    //#region -GridCellPool
    GridCellPool(): void {
        this.gridCellArray.forEach((_child: Node, _index: number) => {
            _child.off(Input.EventType.TOUCH_START, this.OnTouchCell, this);
            _child.getComponent(GridCellDatabase).Reset();
            _child.setParent(this.gridCellPoolNode);
        })

        this.gridCellArray = [];
    }
    //#endregion

    //#region -GetSpriteFrame
    GetSpriteFrame(): { enabledSpriteFrame: SpriteFrame, disabledSpriteFrame: SpriteFrame } {
        const randomSpriteIndex: number = randomRangeInt(0, this.enabledSpriteFrames.length);

        return { enabledSpriteFrame: this.enabledSpriteFrames[randomSpriteIndex], disabledSpriteFrame: this.disabledSpriteFrames[randomSpriteIndex] };
    }
    //#endregion
}


