import { _decorator, Component, Node, sp } from 'cc';
import { SlotDatabase } from './SlotDatabase';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('SlotBoard')
export class SlotBoard extends Component {

    //#region -Fields
    @property(Node) matchEffectNode: Node;
    matchEffect: sp.Skeleton;

    slotArray: Node[] = [];
    dummySlotArray: number[] = [];

    maxNumberOfSlot: number = 8;
    slotElementArray: Node[] = [];
    public placingSlot: Node | null = null;
    //#endregion

    //#region -Start
    start() {
        this.matchEffect = this.matchEffectNode.getComponent(sp.Skeleton);
        this.matchEffectNode.active = false;
        for (let i: number = 0; i < this.maxNumberOfSlot; i++) {
            let slot: Node = this.node.getChildByName(`slot${i}`);
            this.slotArray.push(slot);
        }
        this.dummySlotArray.push(0);
    }
    //#endregion

    //#region -InsertingValueOfElement
    InsertingValueOfElement(_value: number): void {
        if (this.dummySlotArray.length < this.maxNumberOfSlot) {
            let lastIndexOfElement: number = this.dummySlotArray.lastIndexOf(_value);
            lastIndexOfElement != -1 ? this.dummySlotArray.splice(lastIndexOfElement, 0, _value) : this.dummySlotArray.push(_value);
            this.placingSlot = this.GetPlacingSlot(lastIndexOfElement);
            GameManager.instance.SetCurrentIndexForMatch(this.GetCurrentIndex(lastIndexOfElement));
            // GameManager.instance.recentIndexArray.push(this.GetCurrentIndex(lastIndexOfElement)); //undo
            for (let i: number = 1; i < this.maxNumberOfSlot; i++) {
                if (i > GameManager.instance.currentIndexForCheckMatch) {
                    this.slotArray[i].getComponent(SlotDatabase).PlayShiftingAnimation();
                }
            }
        }
    }
    //#endregion

    //#region -CheckMatch
    CheckMatch(_lastIndex: number): void {
        for (let i: number = _lastIndex - 1; i < _lastIndex + 2; i++) {
            this.slotArray[i].getComponent(SlotDatabase).PlayDestroyAnimation();
        }
        this.matchEffectNode.setPosition(this.slotArray[_lastIndex].getPosition());
        this.matchEffectNode.active = true;
        this.matchEffect.setAnimation(0, 'star_effects', false);
        setTimeout(() => {
            this.ClearSlot(_lastIndex);
        }, 500)
    }
    //#endregion

    ClearSlot(_lastIndex: number): void {
        this.dummySlotArray.splice(_lastIndex - 1, 3);
        this.ResetSpritesAndValueOfSlots();
    }

    IsStackFull(): boolean {
        return this.dummySlotArray.length == 8;
    }

    RemoveIcon(_indexValue: number): void {

        if (this.dummySlotArray.length > 0) {
            if (this.dummySlotArray.length > 1) {
                this.dummySlotArray.splice(_indexValue + 1, 1)
            } else {
                this.dummySlotArray.splice(_indexValue, 1)
            }
            this.ResetSpritesAndValueOfSlots();
        }
    }

    // SliceData(array: number[], start: number = 0, end: number = array.length): number[] {
    //     const result: number[] = [];
    //     const length: number = array.length;

    //     const normalizedStart: number = start < 0 ? Math.max(length + start, 0) : Math.min(start, length);
    //     const normalizedEnd: number = end < 0 ? Math.max(length + end, 0) : Math.min(end, length);

    //     for (let i: number = normalizedStart; i < normalizedEnd; i++) {
    //         result.push(array[i]);
    //     }
    //     return result;
    // }

    // SpliceSlot(array: number[], start: number, deleteCount: number, ...itemsToAdd: number[]) {
    //     const length: number = array.length;
    //     const result: number[] = [];

    //     const normalizedStart: number = start < 0 ? Math.max(length + start, 0) : Math.min(start, length);

    //     deleteCount = deleteCount === undefined ? length - normalizedStart : Math.min(Math.max(deleteCount, 0), length - normalizedStart);

    //     for (let i: number = 0; i < deleteCount; i++) {
    //         result.push(array[normalizedStart + i]);
    //     }

    //     for (let i: number = normalizedStart + deleteCount; i < length; i++) {
    //         array[i - deleteCount] = array[i];
    //     }

    //     array.length -= deleteCount;

    //     if (itemsToAdd.length > 0) {
    //         array.length += itemsToAdd.length;

    //         for (let i: number = length - deleteCount - 1; i >= normalizedStart; i--) {
    //             array[i + itemsToAdd.length] = array[i];
    //         }

    //         for (let i: number = 0; i < itemsToAdd.length; i++) {
    //             array[normalizedStart + i] = itemsToAdd[i];
    //         }
    //     }

    //     return result;
    // }

    //#region -GetPlacingSlot
    GetPlacingSlot(_lastIndex: number): Node {
        let placingIndex: number;
        if (_lastIndex != -1) {
            placingIndex = _lastIndex + 1;
        } else {
            placingIndex = this.dummySlotArray.length - 1;
        }
        return this.slotArray[placingIndex];
    }
    //#endregion

    //#region -GetCurrentIndex
    GetCurrentIndex(_lastIndex: number): number {
        let index: number;
        if (_lastIndex != -1) {
            index = _lastIndex;
        } else {
            index = this.dummySlotArray.length - 1;
        }
        return index;
    }
    //#endregion

    //#region -ResetSpritesAndValueOfSlots
    ResetSpritesAndValueOfSlots(): void {
        for (let i: number = 1; i < this.maxNumberOfSlot; i++) {
            const slotDatabase: SlotDatabase = this.slotArray[i].getComponent(SlotDatabase);
            slotDatabase.SetValueOfSlot(this.dummySlotArray[i]);
            slotDatabase.SetRenderer(this.dummySlotArray[i]);
        }
    }
    //#endregion

    //#region -IsMatch
    IsMatch(_index: number): boolean {
        let currentIndex: number = _index + 1;
        return this.ValueAt(currentIndex) === this.ValueAt(currentIndex - 1) && this.ValueAt(currentIndex) === this.ValueAt(currentIndex - 2);
    }
    //#endregion

    //#region -ValueAt
    ValueAt(_index: number): number {
        // if (!this.IsValidPick(_index))
        //     return

        return this.dummySlotArray[_index];
    }
    //#endregion

    //#region -IsValidPick
    IsValidPick(_index: number): boolean {
        return _index < this.maxNumberOfSlot && _index > 0;
    }
    //#endregion

    protected onDisable(): void {
        this.ResetSpritesAndValueOfSlots();
    }
}


