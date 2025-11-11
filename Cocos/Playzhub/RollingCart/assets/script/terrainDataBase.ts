/******** Script_Details ***********
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 26-08-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 28-08-2024
 * @Description :- Terrain Database with coin information.
 ************************************/
import { _decorator, Component, randomRangeInt } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('terrainDataBase')
export class terrainDataBase extends Component {
    isPool: Boolean = false;
    //#region - start
    /**
     * @description - start function
     */
    protected start(): void {
        this.SetRandomCoinVisible();
    }
    //#endregion
    //#region  - SetRandomCoinVisible
    /**
     * @description - Randomly coin visible in terrain
     */
    SetRandomCoinVisible(): void {
        this.node.children.forEach((node, index) => {
            let randomChooseNumber: number = randomRangeInt(0, 2);
            randomChooseNumber == 0 ? node.active = false : node.active = true;
        })
    }
    //#endregion
}


