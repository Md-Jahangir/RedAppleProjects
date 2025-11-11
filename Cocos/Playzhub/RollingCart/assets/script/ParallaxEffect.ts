/******** Script_Details ***********
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 11-09-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 11-09-2024
 * @Description :- Camera class.
 ************************************/
import { _decorator, CCFloat, Component, Node, Sprite, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ParallaxEffect')
export class ParallaxEffect extends Component {
    @property(Node) mainCam: Node = null;
    @property(CCFloat) parallaxSpeedX: number;

    private lastPosition: Vec3 = null;
    private sprite: Sprite = null;
    private texureUnitPerPixel: number = null;

    //#region -Start
    start() {
        this.lastPosition = this.mainCam.getPosition();
        this.sprite = this.node.getComponent(Sprite);
        let pixelPerUnit: number = this.GetPixelPerUnit(this.sprite);
        this.texureUnitPerPixel = this.node.getComponent(UITransform).width / pixelPerUnit;
    }
    //#endregion
    //#region -LateUpdate
    /**
     * 
     * @param dt - deltaTime
     */
    protected lateUpdate(dt: number): void {
        let deltaMovement: Vec3 = this.mainCam.getPosition().subtract(this.lastPosition);
        this.node.setPosition(new Vec3(this.node.getPosition().x + (deltaMovement.x * this.parallaxSpeedX), this.node.getPosition().y, this.node.getPosition().z));
        this.lastPosition = this.mainCam.getPosition();

        if (Math.abs(this.mainCam.getPosition().x - this.node.getPosition().x) >= this.texureUnitPerPixel) {
            let offsetX: number = (this.mainCam.getPosition().x - this.node.getPosition().x) % this.texureUnitPerPixel;
            this.node.setPosition(new Vec3(this.mainCam.getPosition().x + offsetX, this.node.getPosition().y));
        }
    }
    //#endregion

    //#region -GetPixelPerUnit
    /**
     * 
     * @param sprite - Sprite for get pixel per unit in ui.
     * @returns - PixerPerUnit.
     */
    GetPixelPerUnit(sprite: Sprite): number {
        const actualWidth = sprite.spriteFrame.width;
        const resizedWidth = sprite.getComponent(UITransform).width;
        return resizedWidth / actualWidth;
    }
    //#endregion
}