import { _decorator, Canvas, Component, director, Input, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TitleScene')
export class TitleScene extends Component {
    public canvas: any;
    @property(Node) playButton: Node;

    protected onLoad(): void {
        this.canvas = document.getElementById('GameCanvas');
        this.playButton.on(Node.EventType.MOUSE_ENTER, () => {
            this.canvas.style.cursor = "pointer";
        })
        this.playButton.on(Node.EventType.MOUSE_LEAVE, () => {
            this.canvas.style.cursor = "default";
        })
    };

    start() {
        // console.log('canvas: ', this.canvas);

    };

    update(deltaTime: number) {

    };

    OnPlayButtonPressed(): void {
        director.loadScene("GameScene");
    };
}


