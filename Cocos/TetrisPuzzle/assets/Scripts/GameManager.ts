import { _decorator, Component, error, JsonAsset, Node, Prefab, instantiate, Asset, tween, resources, UITransform, Vec3, Rect, log, director } from 'cc';
import { Constant, GameEvents } from './utils/Constant';
import { GridController } from './GridController';
import { PieceShapes } from './PieceShapes';

const { ccclass, property } = _decorator;
@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node) gridControllerNode: Node;
    gridControllerScript: GridController;
    currentLevel: number = 0;
    @property(PieceShapes)
    pieceShape: PieceShapes = null!;
    @property
    snapDistance: number = 80;
    @property(Prefab)
    tilePrefab: Prefab = null;

    protected onLoad(): void {
        Constant.event.on(GameEvents.ON_PIECE_SHAPES_TOUCH_END, this.OnPieceShapeTouchEnd, this);
        this.gridControllerScript = this.gridControllerNode.getComponent(GridController);
    };

    start() {
        this.LoadLevelJson();
    };

    //#region - Set the level
    SetLevel(): void {
        if (this.currentLevel < Constant.MAX_LEVEL) {
            this.currentLevel++;
        }
    };
    //#endregion

    //#region - Check if all levels complete then go menu else go the next level
    async GotoNextLevel() {
        if (this.currentLevel == Constant.MAX_LEVEL) {
            director.loadScene("TitleScene")
        }
        await this.LoadNextLevel();
    };
    //#endregion

    //#region - Load the next level 
    async LoadNextLevel(_isRetry?: boolean) {
        if (!_isRetry) this.SetLevel();


        const levelData = Constant.RAW_JSON_FILE.Levels[0][`Level${this.currentLevel}`];

        await this.ResetAll();
        await this.gridControllerScript.SetBoardDataFromJson(levelData);
        await this.spawnAllPieces(levelData);
    };
    //#endregion

    //#region - Reset all (grid,shapes) 
    async ResetAll() {
        this.gridControllerScript.ResetGrid();
        this.pieceShape.ClearAllShapes();
    };
    //#endregion

    //#region - Load level json data
    LoadLevelJson() {
        resources.load("LevelData", async (err: Error, assets: Asset) => {
            if (!err) {
                Constant.RAW_JSON_FILE = assets["json"];
                this.SetLevel();
                await this.CreateBoardAndGrid();
            }
        })
    };
    //#endregion

    //#region - Create the board with jspn data
    async CreateBoardAndGrid() {
        const levelData = Constant.RAW_JSON_FILE.Levels[0][`Level${this.currentLevel}`];
        await this.gridControllerScript.SetBoardDataFromJson(levelData);
        await this.spawnAllPieces(levelData);
    };
    //#endregion

    //#region - When dropped a shapes to the grid then check it will fit or not and level complete checking
    OnPieceShapeTouchEnd(piece: Node) {
        try {
            const gridItems = this.gridControllerScript.GetAllGridItems();
            const snapThreshold = this.snapDistance;
            const tileNodes = piece.children.length ? piece.children.slice() : [];
            const mapping: { tile: Node, row: number, col: number, cellNode: Node, dist: number }[] = [];

            if (tileNodes.length === 0) {
                this.pieceShape.ResetToOriginal(piece);
                return;
            }

            for (let t = 0; t < tileNodes.length; t++) {
                const tile = tileNodes[t];
                const tileWorld = tile.worldPosition;

                let best = null;
                let bestDist = Number.MAX_VALUE;
                for (let i = 0; i < gridItems.length; i++) {
                    const it = gridItems[i];
                    const d = Vec3.distance(tileWorld, it.node.worldPosition);
                    if (d < bestDist) {
                        bestDist = d;
                        best = it;
                    }
                }

                if (!best || bestDist > snapThreshold) {
                    this.pieceShape.ResetToOriginal(piece);
                    return;
                }

                mapping.push({ tile, row: best.row, col: best.col, cellNode: best.node, dist: bestDist });
            }

            const used = new Set<string>();
            for (const m of mapping) {
                const key = `${m.row},${m.col}`;
                if (used.has(key)) {
                    this.pieceShape.ResetToOriginal(piece);
                    return;
                }
                used.add(key);
            }

            for (const m of mapping) {
                if (this.gridControllerScript.IsCellOccupied(m.row, m.col)) {
                    this.pieceShape.ResetToOriginal(piece);
                    return;
                }
            }

            for (const m of mapping) {
                m.tile.setWorldPosition(m.cellNode.worldPosition);
                this.gridControllerScript.MarkGridOccupied(m.row, m.col);
            }

            if (this.pieceShape.DisableParticularShapes) {
                try { this.pieceShape.DisableParticularShapes(piece); } catch (e) { /* safe */ }
            } else { }

            this.scheduleOnce(() => {
                const res = this.gridControllerScript.CheckIfGridFull();
                if (res) {
                    this.OnLevelComplete();
                }
            }, 0.05);

        } catch (err) {
            console.error("Error in OnPieceShapeTouchEnd:", err);
            this.pieceShape.ResetToOriginal(piece);
        }
    };
    //#endregion

    //#region - On level complete load the next level and show popup if any
    OnLevelComplete() {
        this.scheduleOnce(() => {
            this.GotoNextLevel();
        }, 0.5);
    };
    //#endregion

    //#region - Spawn all the shapes from the json data
    async spawnAllPieces(levelData: any) {
        if (!levelData || !levelData.shape_pieces || !levelData.shape_pieces.possible_shapes) return;
        const possibleShapes = levelData.shape_pieces.possible_shapes;
        this.pieceShape.CreateShapeByType(possibleShapes);
    };
    //#endregion

}


