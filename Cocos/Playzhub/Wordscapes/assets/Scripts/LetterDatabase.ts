import { _decorator, Component, Graphics, Label, Node, Sprite } from 'cc';
import { Constant } from './globals/Constant';
const { ccclass, property } = _decorator;

@ccclass('LetterDatabase')
export class LetterDatabase extends Component {

    //#region -Fields
    private letterText: Label = null;
    private letterOutline: Label = null;
    private letterShadow: Label = null;
    private sprite: Sprite = null;
    private letter: string = '';
    private id: number;
    private graphics: Graphics = null;
    //#endregion

    //#region -onEnable
    protected onEnable(): void {
        this.graphics = this.node.children[0].getComponent(Graphics); // graphics
        this.sprite = this.node.children[1].getComponent(Sprite);//sprite reference
        this.letterText = this.node.children[2].getComponent(Label);//text reference
        this.letterOutline = this.letterText.node.children[0].getComponent(Label);
        this.letterShadow = this.letterText.node.children[1].getComponent(Label);

        this.graphics.clear(); // initially clear graphics.
        this.graphics.lineWidth = Constant.SELECTION_GRAPHIC_LINEWIDTH;
        this.sprite.enabled = false; // Initial Set false.
        this.SetLetter(""); // Initial blank letter set.
    }
    //#endregion

    //#region -SetLetter
    /**
     * 
     * @param _letter For set Alphabet in current Letter Node.
     */
    SetLetter(_letter: string): void {
        this.letter = _letter;
        this.letterText.string = this.letter;
        this.letterOutline.string = this.letter;
        this.letterShadow.string = this.letter;
    }
    //#endregion

    //#region -GetLetter
    GetLetter(): string {
        return this.letter;
    }
    //#endregion

    //#region -SetID
    SetID(_id: number): void {
        this.id = _id;
    }
    //#endregion

    //#region -GetID
    GetID(): number {
        return this.id;
    }
    //#endregion

    //#region -SetBackgroundSprite
    /**
     * @description - For Enable or Disable background sprite while selecting this alphabet.
     */
    SetBackgroundSprite(_isEnable: boolean): void {
        this.sprite.enabled = _isEnable;
        if (!_isEnable)
            this.graphics.clear();
    }
    //#endregion

    //#region -SetGraphicalLine
    /**
     * @description - Drawing graphics while selecting a alphabets.
     * @param _initialPosX 
     * @param _initialPosY 
     * @param _endPosX 
     * @param _endPosY 
     * @param shortenBy 
     */
    SetGraphicalLine(_initialPosX: number, _initialPosY: number, _endPosX: number, _endPosY: number, _shortAmount: number): void {
        const dx = _endPosX - _initialPosX;
        const dy = _endPosY - _initialPosY;

        const length = Math.sqrt(dx * dx + dy * dy);

        const normalizeDx = dx / length;
        const normalizeDy = dy / length;

        const newInitialPosX = _initialPosX + normalizeDx * _shortAmount;
        const newInitialPosY = _initialPosY + normalizeDy * _shortAmount;
        const newEndPosX = _endPosX - normalizeDx * _shortAmount;
        const newEndPosY = _endPosY - normalizeDy * _shortAmount;

        this.graphics.clear();
        this.graphics.moveTo(newInitialPosX, newInitialPosY);
        this.graphics.lineTo(newEndPosX, newEndPosY);
        this.graphics.stroke();
    }
    //#endregion

    //#region -ResetLetter
    ResetLetter(): void {
        this.id = null;
        this.SetLetter('');
    }
    //#endregion
}


