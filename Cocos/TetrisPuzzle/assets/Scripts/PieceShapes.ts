import { _decorator, Component, Node, Color, instantiate, Sprite, Vec2, Vec3, UITransform, Prefab, EventTouch, Input, Layout } from 'cc';
const { ccclass, property } = _decorator;
import { Constant, GameEvents } from './utils/Constant';
import { Utils } from './utils/Utils';

@ccclass('PieceShapes')
export class PieceShapes extends Component {
    @property(Prefab)
    tilePrefab: Prefab = null;
    @property
    tileSize: Vec2 = new Vec2(100, 100);
    private tiles: Node[] = [];
    private isDragging = false;
    private offset = new Vec2();
    public originalPosition: Vec3 = new Vec3();

    onLoad() {
        if (!this.node.getComponent(UITransform)) {
            this.node.addComponent(UITransform);
        }
    };

    //#region - Create single shapes
    CreateShape(pos: Vec3, _shape?: string) {
        let shapeType: string;
        _shape ? shapeType = _shape : shapeType = Utils.GetRandomShape();

        const newNode: Node = new Node('parent');
        newNode.addComponent(UITransform).setContentSize(400, 400);
        newNode.setParent(this.node);
        newNode.setScale(0.5, 0.5);
        newNode.setPosition(pos);
        newNode.removeAllChildren();
        this.tiles = [];

        const layout = Utils.GetShapeLayout(shapeType);
        const randomColor = Utils.GetRandomColor();
        const width = this.tileSize.x * layout[0].length;
        const height = this.tileSize.y * layout.length;
        const transform = newNode.getComponent(UITransform);
        transform.setContentSize(width, height);
        const xOffset = -width / 2 + this.tileSize.x / 2;
        const yOffset = height / 2 - this.tileSize.y / 2;

        for (let r = 0; r < layout.length; r++) {
            for (let c = 0; c < layout[r].length; c++) {
                if (layout[r][c] === 1) {
                    const tile = instantiate(this.tilePrefab);
                    tile.setParent(newNode);
                    tile.setPosition(
                        xOffset + c * this.tileSize.x,
                        yOffset - r * this.tileSize.y
                    );
                    const sprite = tile.getComponent(Sprite);
                    if (sprite) sprite.color = new Color(randomColor[0], randomColor[1], randomColor[2]);
                    this.tiles.push(tile);
                }
            }
        }
    };
    //#endregion

    //#region - Create all the shapes coming from json
    CreateShapeByType(possibleShapes: string[]) {
        const spawnPos: Vec3[] = [
            new Vec3(-350, -260), new Vec3(0, -260), new Vec3(350, -260),
            new Vec3(-350, 0), new Vec3(0, 0), new Vec3(350, 0),
            new Vec3(-350, 260), new Vec3(0, 260), new Vec3(350, 260),
        ];
        for (let i = 0; i < possibleShapes.length; i++) {
            this.CreateShape(spawnPos[i], possibleShapes[i]);
        }

        this.EnableInputEvent();
    };
    //#endregion

    //#region - Enable input to the shapes
    EnableInputEvent() {
        this.node.children.forEach((child) => {
            child.on(Input.EventType.TOUCH_START, this.OnTouchStart, this)
            child.on(Input.EventType.TOUCH_MOVE, this.OnTouchMove, this);
            child.on(Input.EventType.TOUCH_END, this.OnTouchEnd, this);
            child.on(Input.EventType.TOUCH_CANCEL, this.OnTouchCancel, this);
        })
    };
    //#endregion

    //#region - Disable input to the shapes
    DisableParticularShapes(currNode: Node): void {
        currNode.off(Input.EventType.TOUCH_START, this.OnTouchStart, this)
        currNode.off(Input.EventType.TOUCH_MOVE, this.OnTouchMove, this);
        currNode.off(Input.EventType.TOUCH_END, this.OnTouchEnd, this);
        currNode.on(Input.EventType.TOUCH_CANCEL, this.OnTouchCancel, this);
    };
    //#endregion

    //#region - On Touch Start
    OnTouchStart(event: EventTouch) {
        const currTarget: Node = event.currentTarget;
        currTarget.setScale(1, 1);
        const uiComp = currTarget.getComponent(UITransform);
        uiComp.setAnchorPoint(0.5, 0.5);
        this.isDragging = true;
        this.originalPosition = currTarget.worldPosition.clone();
        const touchPos = event.getUILocation();
        const nodePos = currTarget.getWorldPosition();
        this.offset.set(touchPos.x - nodePos.x, touchPos.y - nodePos.y);

        Constant.event.emit(GameEvents.ON_PIECE_SHAPES_TOUCH_START, currTarget);
    };
    //#endregion

    //#region - On Touch Move
    OnTouchMove(event: EventTouch) {
        if (!this.isDragging) return;
        const currTarget: Node = event.currentTarget;

        const touchPos = event.getUILocation();
        currTarget.setWorldPosition(new Vec3(touchPos.x - this.offset.x, touchPos.y - this.offset.y, 0));
        Constant.event.emit(GameEvents.ON_PIECE_SHAPES_TOUCH_MOVE, currTarget);
    };
    //#endregion

    //#region - On Touch End
    OnTouchEnd(event: EventTouch) {
        this.isDragging = false;
        const currTarget: Node = event.currentTarget;
        Constant.event.emit(GameEvents.ON_PIECE_SHAPES_TOUCH_END, currTarget);
    };
    //#endregion

    //#region - On Touch Cancel
    OnTouchCancel(event: EventTouch) {
        this.isDragging = false;
        const currTarget: Node = event.currentTarget;

        Constant.event.emit(GameEvents.ON_PIECE_SHAPES_TOUCH_CANCEL, currTarget);
    };
    //#endregion

    //#region - Reset To original position of the shapes
    ResetToOriginal(currNode: Node) {
        currNode.setScale(0.5, 0.5);
        currNode.setWorldPosition(this.originalPosition);
    };
    //#endregion

    //#region - Clear all the shapes 
    ClearAllShapes() {
        this.node.removeAllChildren();
    };
    //#endregion
}


