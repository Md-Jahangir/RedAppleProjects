// import { Constant } from "../Constant";
import { Utils } from "../Utils";

export default class BasketNet {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.rowGap = 2.8;
        this.colGap = 1.5;
        this.scaleBody = 8;
        this.graphics;
        this.create();
    }
    create() {
        let newScale = Utils.getScale(1080, 1920, window.innerWidth, window.innerHeight);
        // console.log("basket net");
        const group = this.scene.matter.world.nextGroup(true);

        const particleOptions = { friction: 0.00001, collisionFilter: { group: group }, render: { visible: false } };
        const constraintOptions = { stiffness: 0.3 };
        //Net(soft Body) Create
        this.cloth = this.scene.matter.add.softBody(this.x, this.y, 7, 6, 1.5 * newScale, 2.8 * newScale, false, 8 * newScale, particleOptions, constraintOptions);
        for (let i = 0; i < this.cloth.bodies.length; i++) {
            const body = this.cloth.bodies[i];
            if (i < 7) {
                body.isSensor = true;
            }
        }
        // console.log(this.cloth);
    }

    //#region -Basket Net Render Control With Graphics
    OnUpdate() {
        if (this.graphics != undefined) {
            this.graphics.clear();
        }
        this.graphics = this.scene.add.graphics();
        this.graphics.setDepth(3);
        const constraintLength = this.cloth.constraints.length;
        const constraintElem = this.cloth.constraints;
        for (let i = 0; i < constraintLength; i++) {
            this.scene.matter.world.renderConstraint(constraintElem[i], this.graphics, 0xffffff, 0.7, 5 * this.scene.currentNewScale, 1, null, 1);
        }
    }
    //#endregion
}