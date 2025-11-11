import { _decorator, Component, Sprite, SpriteFrame, Vec3, Node, Animation, Color, sp } from 'cc';
const { ccclass, property } = _decorator;

type CustomObject = {
    row: number,
    column: number,
}

@ccclass('GridCell')
export class GridCell extends Component {
    //#region -Field
    private row: number;
    private column: number;
    private value: number = 0;
    private isEmpty: boolean = true;

    @property(Node) buildingRenderer: Node;
    buildingRendererDropAnimation: Animation;
    @property(Node) particleEffectFoMaxBuilding: Node;
    @property(Node) spineAnimationNode: Node;
    spineAnimation: sp.Skeleton;

    @property(SpriteFrame) number4: SpriteFrame;
    @property(SpriteFrame) number8: SpriteFrame;
    @property(SpriteFrame) number16: SpriteFrame;
    @property(SpriteFrame) number32: SpriteFrame;
    @property(SpriteFrame) number64: SpriteFrame;
    @property(SpriteFrame) number128: SpriteFrame;
    //#endregion

    //#region -OnEnable
    protected onEnable(): void {
        this.buildingRenderer = this.node.getChildByName("ObjectSprite");
        this.buildingRendererDropAnimation = this.buildingRenderer.getComponent(Animation);
        this.particleEffectFoMaxBuilding = this.node.getChildByName("particle_maxbuilding");
        this.spineAnimationNode = this.node.getChildByName("spineAnimation");
        this.spineAnimation = this.spineAnimationNode.getComponent(sp.Skeleton);
        this.particleEffectFoMaxBuilding.active = false;
        // this.node.on(Node.EventType.MOUSE_ENTER, this.OnMouseEnter, this);
        // this.node.on(Node.EventType.MOUSE_LEAVE, this.OnMouseLeave, this);
        this.isEmpty = true;
    }
    //#endregion

    //#region -setRowAndColumn
    /**
     * @param gridDetail - row and column in form of object.
     */
    setRowAndColumn(gridDetail: CustomObject): void {
        this.row = gridDetail.row;
        this.column = gridDetail.column;
    }
    //#endregion

    //#region -getRowAndColumn
    /**
     * @returns - Object data of row and column
     */
    getRowAndColumn(): CustomObject {
        return { row: this.row, column: this.column }
    }
    //#endregion

    //#region -GetValue
    getValue(): number {
        return this.value;
    }
    //#endregion

    //#region -SetValue
    /**
     * @param _newValue - change tha value.
     */
    setValue(_newValue: number): void {
        if (_newValue)
            this.value = _newValue;
    }
    //#endregion

    //#region -getSpawnPoint
    getSpawnPoint(): Vec3 {
        return this.node.getPosition();
    }
    //#endregion

    //#region -setEmpty
    setEmpty(_isEmpty: boolean): void {
        this.isEmpty = _isEmpty;
    }
    //#endregion

    //#region -GetEmpty
    GetEmpty(): boolean {
        return this.isEmpty;
    }
    //#endregion

    //#region -setBuildingSprite
    /**
     * @param _builingValue - building value
     */
    setBuildingSprite(_builingValue: number): void {
        this.buildingRenderer.getComponent(Sprite).spriteFrame = this["number" + _builingValue];
        if (this.value === 128)
            setTimeout(() => {
                this.OnMaxBuilding()
            }, 500);

        this.buildingRendererDropAnimation.play();
    }
    //#endregion

    //#region -OnMouseOver
    OnMouseEnter(): void {
        this.node.getComponent(Sprite).color = new Color(1, 1, 1, 100);
    }
    //#endregion

    //#region -OnMouseLeave
    OnMouseLeave(): void {
        this.node.getComponent(Sprite).color = new Color(1, 1, 1, 255);
    }
    //#endregion

    //#region -OnMaxBuilding
    OnMaxBuilding(): void {
        this.particleEffectFoMaxBuilding.active = true;
    }
    //#endregion

    //#region -PlayBuildingDropSmoke
    PlayBuildingDropSmoke(): void {
        setTimeout(() => {
            this.spineAnimation.setAnimation(0, "smoke", false);
        }, 150);
    }
    //#endregion

    //#region -onDisable
    protected onDisable(): void {
        // this.node.off(Node.EventType.MOUSE_ENTER, this.OnMouseEnter, this);
        // this.node.off(Node.EventType.MOUSE_LEAVE, this.OnMouseLeave, this);
    }
    //#endregion
}


