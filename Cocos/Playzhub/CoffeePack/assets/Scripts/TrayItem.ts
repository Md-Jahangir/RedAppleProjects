import { _decorator, Component, Node, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TrayItem')
export class TrayItem extends Component {
    cupSprite: Sprite = null;

    private _itemName: string = '';

    protected onLoad(): void {
        this.cupSprite = this.node.getComponent(Sprite);
    };


    //Set cup item by name and update sprite     
    setItem(name: string, frames: SpriteFrame[]) {
        this._itemName = name;

        const frame = frames.find(sf => sf.name === name);
        if (frame) {
            this.cupSprite.spriteFrame = frame;
        } else {
            this.clearItem();
        }
    };


    // Remove item from slot
    clearItem() {
        this._itemName = "";
        this.cupSprite.spriteFrame = null;
    };

}


