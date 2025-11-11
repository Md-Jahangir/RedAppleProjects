import { _decorator, CCInteger, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BuildingDatabase')
export class BuildingDatabase extends Component {
    //#region -fields
    @property(CCInteger) private value: number;
    //#endregion

    //#region -GetValue
    GetValue(): number {
        return this.value;
    }
    //#endregion

    //#region -SetValue
    /**
     * @param _newValue new cell value
     */
    SetValue(_newValue: number): void {
        this.value = _newValue;
    }
    //#endregion
}


