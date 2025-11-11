/******** Script_Details ***********
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 22-08-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 28-08-2024
 * @Description :- Egg Class.
 ************************************/
import { _decorator, Collider2D, Component, Contact2DType, director, EventTarget, instantiate, IPhysics2DContact, Node, PolygonCollider2D, Prefab, Sprite, UITransform } from 'cc';
import { PlayerScript } from './PlayerScript';
import { CameraScript } from './CameraScript';
import { SoundManager } from './SoundManager';
const { ccclass, property } = _decorator;

@ccclass('EggScript')
export class EggScript extends Component {
    //#region -Fields
    events = new EventTarget();
    @property(Collider2D) eggCollider: Collider2D = null;
    @property(Node) player: Node = null;

    @property(Node) brokenEggParent: Node = null;
    @property(Prefab) brokenEggUpperPart: Prefab = null;
    @property(Prefab) brokenEggLowerPart: Prefab = null;
    @property(Prefab) eggYolk: Prefab = null;
    //#endregion

    //#region  - On Enable
    /**
     * @description - called before game start.
     */
    protected onEnable(): void {
        this.eggCollider = this.node.getComponent(PolygonCollider2D);
        this.eggCollider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.events.once("EggDroped", this.OnEggDroped, this);
    }
    //#endregion

    //#region - On Collision Enter
    /**
     * @description - callback function, its call when this gameobject contact start with other gameobject.
     * @param self - self collider detail.
     * @param others - others contact object collider detail.
     * @param contact - contact details between self and others object.
     */
    onBeginContact(self: Collider2D, others: Collider2D, contact: IPhysics2DContact): void {
        if (others.group == 2) {
            this.events.emit("EggDroped");
        }
    }
    //#endregion

    //#region - OnEggDroped
    /**
     * @description - its called when emit the egg drop event once.
     */
    async OnEggDroped() {
        this.BreakEggSpawn();
        SoundManager.instance.PlayEggBrokenSound();
        await this.sleep(2);
        director.getScene().getChildByName("Canvas").getChildByName("Camera").getComponent(CameraScript).isEggDropped = true;
    }
    //#endregion

    //#region - Spawn Breaked Egg
    /**
     * @description - Spawn broken egg, called in OnEggDrop function.
     */
    BreakEggSpawn(): void {
        this.scheduleOnce(() => {
            this.player.getComponent(PlayerScript).isEggDropped = true;
            setTimeout(() => {
                this.player.getComponent(PlayerScript).PhysicsOff();
            }, 2000);
            this.node.getComponent(Sprite).enabled = false;
            let lowerEgg: Node = instantiate(this.brokenEggLowerPart);
            let upperEgg: Node = instantiate(this.brokenEggUpperPart);
            let eggYolkMiddle: Node = instantiate(this.eggYolk);
            lowerEgg.setPosition(this.node.getPosition().x - 50, this.node.getPosition().y);
            eggYolkMiddle.setPosition(this.node.getPosition().x, this.node.getPosition().y - eggYolkMiddle.getComponent(UITransform).height);
            upperEgg.setPosition(this.node.getPosition().x + 50, this.node.getPosition().y);
            this.brokenEggParent.addChild(lowerEgg);
            this.brokenEggParent.addChild(upperEgg);
            this.brokenEggParent.addChild(eggYolkMiddle);
        }, 0);
    }
    //#endregion

    //#region - Sleep
    /**
     * @description - For pause execution in given time.
     * @param seconds - Delay value in Seconds.
     * @returns - promise for async function
     */
    sleep(seconds: number) {
        return new Promise((e) => setTimeout(e, seconds * 1000));
    }
    //#endregion
}


