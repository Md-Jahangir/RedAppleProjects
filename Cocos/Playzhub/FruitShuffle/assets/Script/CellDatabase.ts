import { _decorator, Component, Node, Vec3 } from 'cc';
import { ElementDatabase } from './ElementDatabase';
const { ccclass, property } = _decorator;

@ccclass('CellDatabase')
export class CellDatabase extends Component {
    //#region -Fields
    private isHorizontalStack: boolean = false;
    private isVerticalStack: boolean = false;
    private isSpiderStack: boolean = false;
    private isSpiralStack: boolean = false;
    private isDynamicStack: boolean = false;
    private isCustomStack: boolean = false;
    private spiderPosition = [new Vec3(-50, 50), new Vec3(50, 50), new Vec3(50, -50), new Vec3(-50, -50)];
    private spiralPosition = [new Vec3(50, 0), new Vec3(50, 50), new Vec3(0, 50), new Vec3(-50, -50), new Vec3(-50, 0)]
    arrayCounter: number = 0;
    childArray = null;
    //#endregion

    //#region -GetChildList
    GetChildList(): Node[] {
        return this.node.children
    }
    //#endregion

    //#region -HasChild
    HasChild(): boolean {
        return this.GetChildList().length > 0
    }
    //#endregion

    //#region -IsHorizontalStack
    IsHorizontalStack(): boolean {
        return this.isHorizontalStack;
    }
    //#endregion

    //#region -IsVerticalStack
    IsVerticalStack(): boolean {
        return this.isVerticalStack;
    }
    //#endregion

    //#region -IsSpiderStack
    IsSpiderStack(): boolean {
        return this.isSpiderStack;
    }
    //#endregion

    //#region -IsSpiralStack
    IsSpiralStack(): boolean {
        return this.isSpiralStack;
    }
    //#endregion

    //#region -IsDynamicStack
    IsDynamicStack(): boolean {
        return this.isDynamicStack;
    }
    //#endregion

    //#region -IsCustomStack
    IsCustomStack(): boolean {
        return this.isCustomStack;
    }
    //#endregion

    //#region -GetSpawnPosition
    GetSpawnPosition(): Vec3[] {
        if (this.IsSpiderStack())
            return this.spiderPosition
        else if (this.IsSpiralStack())
            return this.spiralPosition
        else {
            return this.spiderPosition
        }
    }
    //#endregion

    //#region -SetTypeOfStack
    SetTypeOfStack(_typeOfStack: number): void {
        this.isHorizontalStack = false;
        this.isVerticalStack = false;
        this.isSpiderStack = false;
        this.isSpiralStack = false;
        this.isDynamicStack = false;
        this.isCustomStack = false;

        switch (_typeOfStack) {
            case 1:
                this.isHorizontalStack = true;
                break;
            case 2:
                this.isVerticalStack = true;
                break;
            case 3:
                this.isSpiderStack = true;
                break;
            case 4:
                this.isSpiralStack = true;
                break;
            case 5:
                this.isDynamicStack = true;
                break;
            case 6:
                this.isCustomStack = true;
                break;
            default:
                break;
        }
    }
    //#endregion

    //#region -PlacingChild
    PlacingChildSingleParent(iconDatabase: ElementDatabase, stackCounter: number, childPositionArray: Vec3[]): Vec3 {
        const positionOfIcon: Vec3[] = childPositionArray;
        const childList = this.GetChildList();

        iconDatabase.AddParent(childList[childList.length - 1]);
        if (stackCounter < positionOfIcon.length) {
            return positionOfIcon[stackCounter - 1]
        } else {
            return Vec3.ZERO;
        }
    }
    //#endregion

    //#region -HandleSpiderStack
    HandleSpiderStack(iconDatabase: ElementDatabase, spiderStackElements: number[], stackCounter: number, spiderStackJunctionIndex: number): Vec3 {
        const positionOfIcon: Vec3[] = this.GetSpawnPosition();
        const childList = this.GetChildList();

        if (stackCounter <= positionOfIcon.length) {
            iconDatabase.AddParent(childList[spiderStackJunctionIndex]);
            spiderStackElements.push(childList.length);
            return positionOfIcon[stackCounter - 1];
        } else {

            for (let i = spiderStackJunctionIndex + 1; i < spiderStackJunctionIndex + spiderStackElements.length + 1; i++) {
                iconDatabase.AddParent(childList[i]);
            }
            return Vec3.ZERO;
        }
    }
    //#endregion

    //#region -PlacingChildMultipleParent
    PlacingChildMultipleParent(iconDatabase: ElementDatabase, spiderStackElements: number[], stackCounter: number, spiderStackJunctionIndex: number, positionArray: Vec3[][]): Vec3 {
        const positionOfIcon: Vec3[] = positionArray[this.arrayCounter];
        const childList = this.GetChildList();

        if (stackCounter <= positionOfIcon.length) {
            if (this.arrayCounter == 0) {
                iconDatabase.AddParent(childList[spiderStackJunctionIndex]);
            } else {
                for (let i = 0; i <= this.childArray.length; i++) {
                    iconDatabase.AddParent(childList[i]);
                }
            }
            spiderStackElements.push(childList.length);
            let indexCounter: number = (stackCounter - 1) + this.arrayCounter;
            return positionOfIcon[indexCounter];
        } else {
            this.childArray = null;
            this.childArray = spiderStackElements;
            if (this.arrayCounter < positionArray.length)
                this.arrayCounter += 1;

            for (let i = spiderStackJunctionIndex + 1; i < spiderStackJunctionIndex + spiderStackElements.length + 1; i++) {
                iconDatabase.AddParent(childList[i]);
            }
            return Vec3.ZERO;
        }
    }
    //#endregion

    //#region -PlacingStack
    PlacingStack(iconDatabase: ElementDatabase, spiderStackElements: number[], stackCounter: number, spiderStackJunctionIndex: number, positionArray: Vec3[][]): Vec3 {
        const positionOfIcon: Vec3[] = positionArray[this.arrayCounter];
        const childList = this.GetChildList();
        if (stackCounter <= positionOfIcon.length) {
            if (this.childArray) {
                for (let i = 0; i <= this.childArray.length; i++) {
                    iconDatabase.AddParent(childList[i]);
                }
            }
            spiderStackElements.push(childList.length);
            let indexCounter: number = (stackCounter - 1) + this.arrayCounter;
            return positionOfIcon[indexCounter];
        } else {
            this.childArray = null;
            this.childArray = spiderStackElements;
            if (this.arrayCounter <= positionArray.length)
                this.arrayCounter += 1;

            for (let i = spiderStackJunctionIndex; i < spiderStackJunctionIndex + spiderStackElements.length + 1; i++) {
                iconDatabase.AddParent(childList[i]);
            }
            return Vec3.ZERO;
        }
    }
    //#endregion
}

