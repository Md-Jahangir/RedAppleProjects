import { _decorator, Button, Component, Label, Node, Sprite, SpriteFrame, Vec3 } from 'cc';
import { Constant } from '../Constant';
const { ccclass, property } = _decorator;

@ccclass('LevelNodeScript')
export class LevelNodeScript extends Component {
    private isLocked: boolean = false;
    private collectedStars: number = -1;
    private levelNumber: number = 1;

    protected onEnable(): void {
        this.node.on(Button.EventType.CLICK, this.OnClick, this);
        this.EventsHandler(true);
    }

    protected onDisable(): void {
        this.node.off(Button.EventType.CLICK, this.OnClick, this);
        this.EventsHandler(false);
    }

    SetLevelDetails(_levelNumber: number, _stars: number | undefined, _baseSprite: SpriteFrame[]): void {
        this.levelNumber = _levelNumber;

        if (_stars === undefined || _stars === null) {
            this.collectedStars = -1;
            this.isLocked = true;
        } else {
            this.collectedStars = _stars;
            this.isLocked = _stars === -1;
        };

        this.SetLevelIcon(_baseSprite);
    };

    SetLevelIcon(_spriteFrame: SpriteFrame[]): void {
        const lockedIcon: Node = this.node.getChildByName("Lock");
        const sprite: Sprite = this.node.getComponent(Sprite);
        const stars: Node = this.node.getChildByName("stars");
        const levelIndicator: Label = this.node.getChildByName("LevelIndicator").getComponent(Label);

        levelIndicator.string = `${this.levelNumber}`;
        this.isLocked ? sprite.spriteFrame = _spriteFrame[0] : sprite.spriteFrame = _spriteFrame[1];
        lockedIcon.active = this.isLocked;

        if (this.collectedStars < 0) return; // return if its locked!

        stars.children.forEach((_star: Node, _index: number) => {
            const starNode = _star.children[0];
            starNode.active = _index < this.collectedStars;
        });
    };

    OnClick(): void {
        if (this.isLocked) return;

        Constant.onMouseLeaveOrUp();
        Constant.gameEvents.emit("load_single_player", this.levelNumber - 1);
    };

    private EventsHandler(_isOn: boolean): void {
        const method = _isOn ? 'on' : 'off';

        type EventTuple = [string, (...args: any[]) => void];

        const mouseCursorEvent: EventTuple[] = [
            [Node.EventType.MOUSE_ENTER, Constant.onMouseEnter],
            [Node.EventType.MOUSE_LEAVE, Constant.onMouseLeaveOrUp]
        ]
        mouseCursorEvent.forEach(([event, handler]) => {
            this.node[method](event, handler, this);
        })
    };
}