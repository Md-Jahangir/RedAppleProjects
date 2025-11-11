/******** Script_Details ***********
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 26-08-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 28-08-2024
 * @Description :- Terrain Pooling and control.
 ************************************/
import { _decorator, Component, Node, UITransform, Vec3 } from 'cc';
import { terrainDataBase } from './terrainDataBase';
const { ccclass, property } = _decorator;

@ccclass('Terrains')
export class Terrains extends Component {
    @property(Node) camera: Node = null;
    @property(Node) terrain1: Node = null;
    @property(Node) terrain2: Node = null;
    @property(Node) terrain3: Node = null;
    @property(Node) terrain4: Node = null;
    @property(Node) terrain5: Node = null;
    @property(Node) terrain6: Node = null;
    @property(Node) terrain7: Node = null;
    @property(Node) terrain8: Node = null;

    //Barrier
    @property(Node) barrier: Node = null;
    @property(Node) playerTransform: Node = null;

    terrainPool: Node[];
    numberOfTerrainForPool: number = 8;
    lastTerrain: Node = null;
    terrainDisplayWidth: number = 0;

    //#region - OnEnable
    /**
     * @description - start function using for get all poolable terrains.
     */
    protected onEnable(): void {
        this.terrain1 = this.node.getChildByName("03");
        this.terrain2 = this.node.getChildByName("04");
        this.terrain3 = this.node.getChildByName("05");
        this.terrain4 = this.node.getChildByName("06");
        this.terrain5 = this.node.getChildByName("07");
        this.terrain6 = this.node.getChildByName("08");
        this.terrain7 = this.node.getChildByName("09");
        this.terrain8 = this.node.getChildByName("10");
    }
    //#endregion
    //#region - start
    /**
     * @description - start function
     */
    start() {
        this.terrainPool = [this.terrain1, this.terrain2, this.terrain3, this.terrain4, this.terrain5, this.terrain6, this.terrain7, this.terrain8];
        this.lastTerrain = this.terrainPool[this.terrainPool.length - 1];
        this.terrainDisplayWidth = this.terrain8.getComponent(UITransform).width;
    }
    //#endregion
    //#region - update
    /**
     * @description - update function
     * @param deltaTime - time difference between previous and current frames
     */
    update(deltaTime: number) {
        this.TerrainPooling();
    }
    //#endregion
    //#region - GetTerrain
    /**
     * @description - Get Poolable terrain for pool
     * @returns {Node} - terrain
     */
    GetTerrain(): Node {
        for (let i = 0; i < this.terrainPool.length; i++) {
            if (this.terrainPool[i].getComponent(terrainDataBase).isPool) {
                return this.terrainPool[i];
            }
        }
        return null;
    }
    //#endregion
    //#region  - Terrain Pool
    /**
     * @description - Pooling terrain
     */
    TerrainPooling(): void {
        for (let index = 0; index < this.terrainPool.length; index++) {
            let terrain = this.terrainPool[index];
            if (terrain.getPosition().x + this.terrainDisplayWidth + window.innerWidth < this.camera.getPosition().x) {
                terrain.getComponent(terrainDataBase).isPool = true;
                let newTerrain = this.GetTerrain();
                if (newTerrain) {
                    let lastTerrainWidth: number = this.lastTerrain.getComponent(UITransform).width;
                    newTerrain.setPosition(this.lastTerrain.getPosition().x + lastTerrainWidth - 2, this.lastTerrain.getPosition().y);
                    newTerrain.getComponent(terrainDataBase).SetRandomCoinVisible();
                    newTerrain.getComponent(terrainDataBase).isPool = false;
                    //barrier for restrict back movement...
                    this.barrier.setPosition(new Vec3(this.playerTransform.getPosition().x - lastTerrainWidth / 4, this.barrier.getPosition().y, 0));
                    this.lastTerrain = newTerrain;
                }
            }
        }
    }
    //#endregion
}


