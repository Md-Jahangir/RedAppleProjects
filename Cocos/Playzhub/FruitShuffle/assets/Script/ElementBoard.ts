import { _decorator, Component, director, input, Input, instantiate, Node, Prefab, randomRangeInt, Vec3 } from 'cc';
import { ElementDatabase } from './ElementDatabase';
import { GameManager } from './GameManager';
import { SlotBoard } from './SlotBoard';
import { CellDatabase } from './CellDatabase';
import { SoundManager } from './SoundManager';
const { ccclass, property } = _decorator;

@ccclass('ElementBoard')
export class ElementBoard extends Component {
    //#region -Fields
    @property(Node) iconPoolParent: Node = null;
    elementsArray: Node[] = [];
    stackBlocks: Node = null;
    iconPlacingArray: Node[] = [];
    tempIconArray: number[] = [];
    placedIconArray: Node[] = [];
    @property(Node) topLayerNode: Node = null;
    // Icon Values
    anarIconValue: number = 1;
    appleIconValue: number = 2;
    avacadoIconValue: number = 3;
    beetValue: number = 4;
    kiwiValue: number = 5;
    lichiValue: number = 6;
    mangoValue: number = 7;
    nimbuValue: number = 8;
    watermelonValue: number = 9;
    cornValue: number = 10;
    dragonFruitValue: number = 11;
    berryValue: number = 12;
    HalfWaterMelonValue: 13;
    //#endregion

    //#region -start
    protected start(): void {
        this.stackBlocks = director.getScene().getChildByName("Canvas").getChildByName("StackBlocks");
        input.on(Input.EventType.MOUSE_DOWN, this.OnClickOnElement, this);
    }
    //#endregion

    //#region -MakeBoard
    MakeBoard(_parentObject: Node, _spawnPrefab: Prefab, _levelData: object, _iconData: object): void {
        this.iconPoolParent.active = true;
        const parentChildLength: number = _parentObject.children.length;
        const placingIndex: number[] = _levelData["placingIndex"] || this.GetPlacingIndex(this.MakePlacingConfig(_levelData["placingConfig"]));
        const stackType: number[] = _levelData["stackType"] || this.GetStackType(this.MakePlacingConfig(_levelData["placingConfig"]));

        let iconsArray: number[] = this.GetIconArray(_iconData);

        this.tempIconArray = [...iconsArray];

        if (GameManager.instance.currentLevel !== 0)
            this.ShuffleIconArrayList(iconsArray);

        let stackCounter: number = 0;
        let spiderStackElements: number[] = [];
        let spiderStackJunctionIndex: number = 0;

        let staticPosition = null;
        if (_levelData["staticPosIcon"])
            staticPosition = _levelData["staticPosIcon"];

        let positionArray = null;
        if (_levelData["placingConfig"]) {
            positionArray = this.MakePlacingConfig(_levelData["placingConfig"])["positionArray"];
        }

        for (let i = 0; i < _levelData["totalNumberOfElements"]; i++) {
            const newIcon: Node = this.GetIcon(_spawnPrefab);
            const iconParent: Node = placingIndex ? _parentObject.children[placingIndex[i]] : _parentObject.children[randomRangeInt(0, parentChildLength)];
            const iconParentDatabase: CellDatabase = iconParent.getComponent(CellDatabase);
            const iconDatabase: ElementDatabase = newIcon.getComponent(ElementDatabase);
            let spawnPosition: Vec3 = new Vec3(0, 0, 0);
            if (iconParentDatabase.HasChild()) {
                const childList = iconParentDatabase.GetChildList();
                iconParentDatabase.SetTypeOfStack(stackType[i]);
                stackCounter++;

                if (iconParentDatabase.IsHorizontalStack()) {
                    iconDatabase.AddParent(childList[childList.length - 1]);
                    spawnPosition = new Vec3(-10 * stackCounter, 0, 0);
                } else if (iconParentDatabase.IsVerticalStack()) {
                    iconDatabase.AddParent(childList[childList.length - 1]);
                    spawnPosition = new Vec3(0, -50 * stackCounter, 0);
                } else if (iconParentDatabase.IsSpiderStack()) {
                    spawnPosition = iconParentDatabase.HandleSpiderStack(iconDatabase, spiderStackElements, stackCounter, spiderStackJunctionIndex);
                } else if (iconParentDatabase.IsSpiralStack()) {
                    spawnPosition = iconParentDatabase.PlacingChildSingleParent(iconDatabase, stackCounter, positionArray)
                } else if (iconParentDatabase.IsDynamicStack()) {
                    spawnPosition = iconParentDatabase.PlacingChildMultipleParent(iconDatabase, spiderStackElements, stackCounter, spiderStackJunctionIndex, staticPosition);
                } else {
                    spawnPosition = iconParentDatabase.PlacingStack(iconDatabase, spiderStackElements, stackCounter, spiderStackJunctionIndex, staticPosition);
                }
                if (spawnPosition.equals(Vec3.ZERO)) {
                    stackCounter = 0;
                    spiderStackJunctionIndex += spiderStackElements.length + 1;
                    spiderStackElements = [];
                    if (iconParentDatabase.IsDynamicStack() || iconParentDatabase.IsCustomStack()) {
                        spawnPosition = staticPosition[iconParentDatabase.arrayCounter][0];
                    }
                }
            } else {
                stackCounter = 0;
                spiderStackJunctionIndex = 0;
                spiderStackElements = [];
                iconParentDatabase.arrayCounter = 0;
            }
            newIcon.setParent(iconParent);
            newIcon.setPosition(spawnPosition);
            const randomIcon = iconsArray[i];
            iconDatabase.SetValue(randomIcon);
            iconDatabase.SetSprite(randomIcon);
            this.iconPlacingArray.push(newIcon);
        }
        this.AddEventInteractive();
        this.iconPoolParent.active = false;
    }

    //#region -MakePlacingIndex
    MakePlacingConfig(_placingConfig: Object): Object {
        let numberOfIcon: number[] = [];
        let index: number[] = [];
        let typeOfStack: number[] = [];
        let posArray: Vec3[] = [];
        for (let i: number = 0; i < Object.keys(_placingConfig).length; i++) {
            const noOfPlace: number = _placingConfig[`${i}`]["numberOfPlacement"];
            numberOfIcon.push(noOfPlace);
            index.push(_placingConfig[`${i}`]["index"]);
            typeOfStack.push(_placingConfig[`${i}`]["typeOfStack"])
            if (_placingConfig[`${i}`]["positionArray"]) {
                posArray.push(..._placingConfig[`${i}`]["positionArray"]);
            } else {
                for (let i = 0; i < noOfPlace; i++) {
                    posArray.push(new Vec3(0, 0, 0));
                }
            }
        }
        return {
            numberOfIconArray: numberOfIcon, indexArray: index, stacksArray: typeOfStack, positionArray: posArray
        }
    }
    //#endregion

    //#region -GetPlacingIndex
    GetPlacingIndex(_config: Object): number[] {
        let result = [];
        for (let i = 0; i < _config["numberOfIconArray"].length; i++) {
            result = result.concat(Array(_config["numberOfIconArray"][i]).fill(_config["indexArray"][i]));
        }
        return result;
    }
    //#endregion

    //#region -GetStackType
    GetStackType(_config: Object): number[] {
        let result = [];
        for (let i = 0; i < _config["numberOfIconArray"].length; i++) {
            result = result.concat(Array(_config["numberOfIconArray"][i]).fill(_config["stacksArray"][i]));
        }
        return result;
    }
    //#endregion

    //#region -GetIconArray
    GetIconArray(_levelData: Object): number[] {
        return [...Array(_levelData["numberOfAnarIcon"]).fill(this.anarIconValue), ...Array(_levelData["numberOfAppleIcon"]).fill(this.appleIconValue), ...Array(_levelData["numberOfAvacadoIcon"]).fill(this.avacadoIconValue), ...Array(_levelData["numberOfBeetIcon"]).fill(this.beetValue), ...Array(_levelData["numberOfKiwiIcon"]).fill(this.kiwiValue), ...Array(_levelData["numberOfLichiIcon"]).fill(this.lichiValue), ...Array(_levelData["numberOfMangoIcon"]).fill(this.mangoValue), ...Array(_levelData["numberOfNimbuIcon"]).fill(this.nimbuValue), ...Array(_levelData["numberOfWaterMelonIcon"]).fill(this.watermelonValue)];
    }
    //#endregion

    //#region -AddEventInteractive
    AddEventInteractive(): void {
        this.iconPlacingArray.forEach((_element: Node, _index: number) => {
            _element.on(Input.EventType.TOUCH_START, this.OnClickOnElement, this);
            _element.getComponent(ElementDatabase).CheckForInteractive();

            _element.on(Node.EventType.MOUSE_ENTER, () => {
                GameManager.instance.canvas.style.cursor = "pointer";
            })
            _element.on(Node.EventType.MOUSE_LEAVE, () => {
                GameManager.instance.canvas.style.cursor = "default";
            })
        })
    }
    //#endregion

    //#region -ClearUndoMatchArray
    ClearUndoMatchArray(_index: number): void {
        if (this.placedIconArray.length > 3) {
            this.placedIconArray.splice(_index - 2, 3);
        } else {
            this.placedIconArray = [];
        }
    }
    //#endregion

    //#region -DestroyBoardElement
    DestroyBoardElement(): void {
        this.iconPlacingArray.forEach((_icon: Node, _index: number) => {
            _icon.setScale(1, 1);
            _icon.setPosition(0, 0);
            _icon.getComponent(ElementDatabase).ResetElement();
            _icon.setParent(this.iconPoolParent);
        })
        this.iconPlacingArray = [];
        this.placedIconArray = [];
    }
    //#endregion

    //#region -ShuffleGridIcons
    ShuffleGridIcons(_board: Node): void {
        let iconListOnBoard: Node[] = [];
        this.ShuffleIconArrayList(this.tempIconArray);

        _board.children.forEach((_child: Node, _index: number) => {
            if (_child.children.length > 0) {
                _child.children.forEach((_icon: Node, _index: number) => {
                    if (_icon.getComponent(ElementDatabase).GetSprite())
                        iconListOnBoard.push(_icon);
                })
            }
        })

        iconListOnBoard.forEach((_icon: Node, _index: number) => {
            const randomIcon = this.tempIconArray[_index];
            const _iconDataBase: ElementDatabase = _icon.getComponent(ElementDatabase);
            _iconDataBase.SetValue(randomIcon);
            _iconDataBase.SetSprite(randomIcon);
        })
    }
    //#endregion

    //#region -OnClickOnElement
    OnClickOnElement(event: any): void {
        const element = event.currentTarget;
        if (element && element.getComponent(ElementDatabase).GetInteractable() && GameManager.instance.isReadyToClick) {
            GameManager.instance.isReadyToClick = false;
            const elementData: ElementDatabase = element.getComponent(ElementDatabase);
            const stackBlockBoard: SlotBoard = this.stackBlocks?.getComponent(SlotBoard);
            stackBlockBoard.InsertingValueOfElement(elementData.GetValue());
            this.RemoveIconList(elementData.GetValue());
            elementData.SetOnTop(this.topLayerNode);
            elementData.PlayAnimation(stackBlockBoard.placingSlot.getPosition());
            elementData.RemoveParent();
            this.AddIconForUndoReference(GameManager.instance.currentIndexForCheckMatch, element);
            GameManager.instance.elementIds.push(element.uuid);

            if (GameManager.instance.currentLevel === 0)
                GameManager.instance.CallTutorialNextStep();

            SoundManager.instance.FruitTapSound();
        }
    }
    //#endregion

    //#region -RemoveIconList
    RemoveIconList(_valueForRemove: number): void {
        const indexOfIcon: number = this.tempIconArray.findIndex((_value: number, _index: number) => _value == _valueForRemove);
        this.tempIconArray.splice(indexOfIcon, 1);
    }
    //#endregion

    //#region -AddIconList
    AddIconList(_value: number): void {
        this.tempIconArray.push(_value);
    }
    //#endregion

    //#region -AddIconForUndoReference
    AddIconForUndoReference(_addingAtIndex: number, _icon: Node): void {
        if (_addingAtIndex != -1) {
            this.placedIconArray.splice(_addingAtIndex, 0, _icon);
        } else {
            this.placedIconArray.push(_icon);
        }
    }
    //#endregion

    //#region -GetPlacedIconArrayLength
    GetPlacedIconArrayLength(): number {
        return this.placedIconArray.length;
    }
    //#endregion

    //#region -UndoMove
    UndoMove(_iconId: string): number {
        let undoChild: Node;
        let undoIndex: number;
        this.placedIconArray.forEach((_child: Node, _index: number) => {
            if (_child.uuid === _iconId) {
                undoChild = _child;
                undoIndex = _index;
            }
        })
        if (undoIndex)
            this.placedIconArray.splice(undoIndex, 1);
        else {
            undoIndex = this.placedIconArray.length - 1;
            undoChild = this.placedIconArray.pop();
        }
        const siblingIndexOfChild: number = undoChild.getSiblingIndex();
        const undoChildDatabade: ElementDatabase = undoChild.getComponent(ElementDatabase);
        if (siblingIndexOfChild > 0) {
            const undoChildParent: Node = undoChild.getParent();
            undoChildDatabade.AddParent(undoChildParent.children[siblingIndexOfChild - 1]);
        }
        this.AddEventInteractive();
        undoChildDatabade.SetInteractable(true);
        undoChildDatabade.PlayUndoAnimation();
        this.AddIconList(undoChildDatabade.GetValue());
        return undoIndex;
    }
    //#endregion

    //#region -ShuffleIconArrayList
    ShuffleIconArrayList(_array: number[]): number[] {
        for (let i = 0; i < _array.length - 1; i++) {
            const j = Math.floor(Math.random() * (i + 1));
            [_array[i], _array[j]] = [_array[j], _array[i]];
        }
        return _array;
    }
    //#endregion

    //#region -GetIcon
    GetIcon(_prefab: Prefab): Node {
        if (this.iconPoolParent.children.length > 0) {
            return this.iconPoolParent.children[0];
        }
        else {
            return instantiate(_prefab)
        }
    }
    //#endregion

    protected onDisable(): void {
        this.DestroyBoardElement();
    }
}