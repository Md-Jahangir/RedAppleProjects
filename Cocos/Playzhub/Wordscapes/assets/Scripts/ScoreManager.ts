import { _decorator, Component, Node } from 'cc';
import { Constant } from './globals/Constant';
const { ccclass, property } = _decorator;

@ccclass('ScoreManager')
export class ScoreManager extends Component {
    // Scores
    private _lotusPoint: number = 0;
    private _timeBonus: number = 0;
    private _basicScore: number = 0;
    private _bonusPoint: number = 0;

    //Local scores
    _localLotusPoint: number = 0;
    _localTimeBonus: number = 0;
    _localBasicScore: number = 0;
    _localBonusPoint: number = 0;

    // Boosters
    private _hint: number = 5; //Initially
    private _buzzit: number = 5; //Initially

    hintCost: number = 100;
    buzzitCost: number = 50;

    //#region SetInitialValue
    /**
     * @description - Set Initially values for resume game purpose
     * @param _lotusPoint 
     * @param _timeBonus 
     * @param _bonus 
     */
    SetInitialValue(_lotusPoint: number, _timeBonus: number, _bonus: number, _hint: number, _buzzit: number, _hintCost: number, _buzzitCost: number): void {
        //Scores
        this._lotusPoint = _lotusPoint - _timeBonus;
        this._timeBonus = _timeBonus;
        this._bonusPoint = _bonus;
        this._basicScore = this._lotusPoint + this._timeBonus;
        //Boosters
        this._hint = _hint;
        this._buzzit = _buzzit;

        //Costs
        this.hintCost = _hintCost;
        this.buzzitCost = _buzzitCost;
    }
    //#endregion

    GetTotalScore(): { lotusPoint: number, bonus: number, timeBonus: number, hint: number, buzzit: number, hintCost: number, buzzitCost: number } {
        return { lotusPoint: this._lotusPoint, bonus: this._bonusPoint, timeBonus: this._timeBonus, hint: this._hint, buzzit: this._buzzit, hintCost: this.hintCost, buzzitCost: this.buzzitCost }
    }

    //#region LotusPointIncreament
    /**
     * @description - Increase lotus point here by found the correct word in grid.
     * @param _value 
     */
    LotusPointIncreament(_value: number): void {
        this._lotusPoint += _value;
        this._localLotusPoint += _value;
        this._basicScore += _value;
    }
    //#endregion

    //#region TimeBonusIncreament
    /**
     * @description - Time left is also a score
     * @param _value 
     */
    TimeBonusIncreament(_value: number): void {
        this._timeBonus += _value;
        this._localTimeBonus += _value;
        this._basicScore += _value;
    }
    //#endregion

    //#region -Get basicScore
    /**
     * @description - basicScore is addition of lotusPoint and timeBonus.
     */
    public get basicScore(): number {
        return this._basicScore;
    }
    //#endregion

    //#region Get lotusPoint
    public get lotusPoint(): number {
        return this._lotusPoint;
    }
    //#endregion

    //#region GettimeBonus
    public get timeBonus(): number {
        return this._timeBonus;
    }
    //#endregions

    //#region ResetLocalVariables
    /**
     * @description - Reset for show current level collection o  points.
     */
    ResetLocalVariables(): void {
        this._localLotusPoint = 0;
        this._localTimeBonus = 0;
        this._localBonusPoint = 0;
        this._localBasicScore = 0;
    }
    //#endregion
    //################################################################## Boosters #######################################################

    //#region Get/Set Hint
    public get hint(): number {
        return this._hint;
    }
    public set hint(_value: number) {
        this._hint = _value;
        if (this._hint >= Constant.BOOSTERS_HARD_LIMIT) {
            this._hint = Constant.BOOSTERS_HARD_LIMIT;
            return;
        }
    }
    //#endregion

    public get buzzit(): number {
        return this._buzzit;
    }

    public set buzzit(_value: number) {
        this._buzzit = _value;
        if (this._buzzit >= Constant.BOOSTERS_HARD_LIMIT) {
            this._buzzit = Constant.BOOSTERS_HARD_LIMIT;
            return;
        }
    }

    //#region -UseHint
    /**
     * @description - Use hint from hint coupon or balance.
     * @returns returning bool of used or unused
     */
    UseHint(): boolean {
        let isUsedHint: boolean = false;
        if (this._hint > 0) {
            this._hint--;
            isUsedHint = true;
        } else if (this._basicScore >= this.hintCost) {
            this.ScoreDeduction(this.hintCost);
            this.hintCost += Constant.HINT_COST_INCREAMENT;
            isUsedHint = true;
        } else {
            isUsedHint = false;
        }
        return isUsedHint;
    }
    //#endregion

    //#region UseBuzzit
    /**
     * @description - Use hint from buzzit coupon or balance
     * @returns returning bool of used or unused
     */
    UseBuzzit(): boolean {
        let isUsedBuzzit: boolean = false;
        if (this._buzzit > 0) {
            this._buzzit--;
            isUsedBuzzit = true;
        } else if (this._basicScore >= this.buzzitCost) {
            this.ScoreDeduction(this.buzzitCost);
            this.buzzitCost += Constant.BUZZIT_COST_INCREAMENT;
            isUsedBuzzit = true;
        } else {
            isUsedBuzzit = false;
        }
        return isUsedBuzzit;
    }

    //#region ScoreDeduction
    /**
     * @description - Lotus point, time bonus update and assign to basic score accordingly.
     */
    ScoreDeduction(_deductionValue: number): void {
        this._timeBonus -= _deductionValue;
        if (this._timeBonus < 0) {
            this._lotusPoint += this._timeBonus;
            this._timeBonus = 0;
        }
        this._basicScore = this._lotusPoint + this._timeBonus;
    }
    //#endregion

    //#region -GetHintValueForUI
    /**
     * @description - For UI Update purpose only.
     * @returns 
     */
    GetHintValueForUI(): { hintValue: number, isFreeHint: boolean } {
        let isFreeHint: boolean = false;
        let hintValue: number = 0;
        if (this._hint > 0) {
            hintValue = this._hint;
            isFreeHint = true;
        } else {
            hintValue = this.hintCost;
            isFreeHint = false;
        }
        return { hintValue, isFreeHint };
    }
    //#endregion

    //#region GetBuzzitValueForUI
    /**
     * @description - For UI Update purpose only.
     * @returns 
     */
    GetBuzzitValueForUI(): { buzzitValue: number, isFreeBuzzit: boolean } {
        let isFreeBuzzit: boolean = false;
        let buzzitValue: number = 0;
        if (this._buzzit > 0) {
            buzzitValue = this._buzzit;
            isFreeBuzzit = true;
        } else {
            buzzitValue = this.buzzitCost;
            isFreeBuzzit = false;
        }
        return { buzzitValue, isFreeBuzzit };
    }
    //#endregion
}