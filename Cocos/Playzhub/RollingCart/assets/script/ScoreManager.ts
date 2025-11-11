/******** Script_Details ***********
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 26-08-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 28-08-2024
 * @Description :- Score Manager.
 ************************************/
import { _decorator, Component, Node, Vec3 } from 'cc';
import { UIManager } from './UIManager';
const { ccclass, property } = _decorator;

@ccclass('ScoreManager')
export class ScoreManager extends Component {
    @property(Node) uiManager: Node = null;
    private stars: number = 0;
    private coin: number = 0;
    //#region - start
    /**
     * @description - start function
     */
    protected start(): void {
        // this.GetCoinLocalStorage();
    }
    //#endregion
    //#region - Get Overall Stars
    /**
     * @description - Get Overall Stars in player inventry
     * @returns {number} - overall stars in inventry.
     */
    getScore(): number { return this.coin; }
    //#endregion
    //#region - Get Current Game Stars
    /**
     * @description - Get Current game Stars collected
     * @returns {number} - current game stars collected qty.
     */
    getStars(): number { return this.stars }
    //#endregion

    //#region - Score++
    /**
     * @description - Overall stars,current game star collection and UI stars update.
     */
    ScoreIncreament(_starPos: Vec3): void {
        this.stars++;
        this.coin++;
        setTimeout(() => {
            this.uiManager.getComponent(UIManager).ScoreUpdate(this.coin);
        }, 1000);
        this.uiManager.getComponent(UIManager).StarCollectAnimation(_starPos);
    }
    //#endregion

    //#region - SetStarsLocalStorage
    /**
     * @description - Set stars in local storage.
     */
    SetCoinLocalStorage(): void {
        localStorage.setItem("EC_Coin", this.coin.toString());
    }
    //#endregion
    //#region - GetStarsLocalStorage
    /**
     * @description - Getting overall stars qty in player inventory
     */
    GetCoinLocalStorage(): void {
        let tempCoinQty: string = localStorage.getItem("EC_Coin");
        if (tempCoinQty != null) {
            this.coin = parseInt(tempCoinQty);
        }
        else this.coin = 0;
        this.uiManager.getComponent(UIManager).ScoreUpdate(this.coin);
    }
    //#endregion
    //#region  - On Disable
    /**
     * @description - called before game complete.
     */
    protected onDisable(): void {
        this.SetCoinLocalStorage();
    }
    //#endregion
}


