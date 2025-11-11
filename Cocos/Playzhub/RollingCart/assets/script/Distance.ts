/******** Script_Details ***********
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 22-08-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 27-08-2024
 * @Description :- Distance calculate between start position and egg current position.
 ************************************/
import { _decorator, Component, Node, ProgressBar, RichText } from 'cc';
import { ScoreManager } from './ScoreManager';
const { ccclass, property } = _decorator;

@ccclass('Distance')
export class Distance extends Component {
    //#region -Fields
    @property(Node) startPoint: Node = null;
    @property(Node) playerTransform: Node = null;
    @property(RichText) distanceText: RichText = null;
    @property(RichText) bestDistanceText: RichText = null;
    @property(Node) scoreManager: Node = null;
    @property(RichText) scoreText: RichText = null;
    distanceWithStarScore: number = 0;

    progressBar: ProgressBar = null;
    targetLength: number = 10000;
    distance: number = 0;
    bestDistance: number = 0;
    //#endregion

    //#region - start
    /**
     * @description - called once while game start
     */
    start() {
        this.progressBar = this.node.getComponent(ProgressBar);
        this.GetDistanceLocalStorage();
        this.bestDistanceText.string = "Best : " + this.bestDistance.toFixed(0) + " m";
        this.distanceText.string = "0 m";
    }
    //#endregion

    //#region - update
    /**
     * @description - called in every frames
     * @param deltaTime -time difference between previous and current frames
     */
    update(deltaTime: number) {
        this.distance = this.DistanceCalculate(this.startPoint.position.x, this.startPoint.position.y, this.playerTransform.getPosition().x, this.playerTransform.getPosition().y);
        this.distanceText.string = this.distance.toFixed(0) + " m";
        this.distanceWithStarScore = this.distance + this.scoreManager.getComponent(ScoreManager).getScore();
        this.scoreText.string = `Score : ${this.distanceWithStarScore.toFixed(0)}`;
        this.UpdateProgressBar();
    }
    //#endregion

    //#region - Distance Calculator
    /**
     * @description - calculate distance between two objects.
     * @param obj1X - x position of object 1.
     * @param obj1Y - y position of object 1.
     * @param obj2X - x position of object 2.
     * @param obj2Y - y position of object 2.
     * @returns {number} distance.
     */
    DistanceCalculate(obj1X: number, obj1Y: number, obj2X: number, obj2Y: number): number {
        let dx: number = obj1X - obj2X;
        let dy: number = obj1Y - obj2Y;
        return Math.sqrt(dx * dx / dy * dy) / 100;
    }
    //#endregion

    //#region - Distance Progress Bar Update
    /**
     * @description - update progress bar of distance
     */
    UpdateProgressBar(): void {
        let progress: number = this.distance / this.targetLength * 100;
        this.progressBar.progress = progress;

        if (progress >= 1) {
            this.targetLength += 10000;
        }
    }
    //#endregion

    //#region - Get Distance
    /**
     * @description - getting current distance travelled value.
     * @returns {number}  distance travelled
     */
    getDistance(): number {
        return this.distance;
    }
    //#endregion

    //#region - LocalStorage Distance
    /**
     * @description - Set highest distance covered to local storage.
     */
    SetDistanceLocalStorage(): void {
        let lastDistance: number = this.getDistance();
        if (lastDistance > this.bestDistance) {
            localStorage.setItem("EC_Distance", lastDistance.toString());
        }
    }
    //#endregion

    //#region - Get Distance Local storage
    /**
     * @description - Getting highest distance travelled value.
     */
    GetDistanceLocalStorage(): void {
        let tempScore: string = localStorage.getItem("EC_Distance");
        if (tempScore != null) {
            this.bestDistance = parseInt(tempScore);
        }
        else this.bestDistance = 0;
    }
    //#endregion

    //#region -GetDistanceWithStars
    GetDistanceWithStars(): number {
        return this.distanceWithStarScore;
    }
    //#endregion

    //#region - On Disable
    /**
     * @description - called before end game.
     */
    protected onDisable(): void {
        this.SetDistanceLocalStorage();
    }
    //#endregion
}


