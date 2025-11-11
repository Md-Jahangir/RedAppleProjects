import { _decorator, Component, Node, ParticleSystem2D, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreManager')
export class ScoreManager extends Component {
    //#region -Fields
    @property(Node) diamondNodeForAnimation: Node = null;
    @property(Node) diamondIcon: Node = null;
    particleEffectDiamond: ParticleSystem2D;

    @property(Node) coinNodeForAnimation: Node = null;
    @property(Node) coinPosition: Node = null;

    // life variables
    private life: number = 3;

    // shuffle variables
    private coin: number = 10;
    private currentShuffleCoinCost: number = 5;
    private shuffleCostIncreaseFrequency: number = 5;

    //undo variables
    private diamond: number = 10;
    private currentUndoDiamondCost: number = 1;
    private undoCostIncreaseFrequency: number = 2;
    //#endregion

    //#region -onEnable
    protected onEnable(): void {
        this.diamondNodeForAnimation.active = false;
        this.particleEffectDiamond = this.diamondNodeForAnimation.getChildByName('particle').getComponent(ParticleSystem2D);
        this.particleEffectDiamond.stopSystem();
        this.coinNodeForAnimation.children.forEach((_coin: Node, _index: number) => {
            _coin.active = false;
        })
    }
    //#endregion

    //#region - Life Functions
    GetLife(): number {
        return this.life;
    }

    SetLife(_life: number): void {
        this.life = _life;
    }

    LifeIncrement(_numberOfIncrement: number): void {
        this.life += _numberOfIncrement;
    }

    LifeDecrement(_numberOfDecrement: number): void {
        if (this.life < _numberOfDecrement)
            return;

        this.life -= _numberOfDecrement;
    }
    //#endregion

    //#region -Shuffle Functions
    GetCoin(): number {
        return this.coin;
    }

    GetCurrentShuffleCost(): number {
        return this.currentShuffleCoinCost;
    }

    SetCurrentShuffleCost(_value: number): void {
        this.currentShuffleCoinCost = _value;
    }
    //if need to get from local storage.
    SetCoin(_coin: number): void {
        this.coin = _coin;
    }

    //if buy coin option
    CoinIncrement(_numberOfIncrement: number, _onTweenComplete: Function): void {
        this.coin += _numberOfIncrement;
        this.coinNodeForAnimation.children.forEach((_coin: Node, _index: number) => {
            setTimeout(() => {
                _coin.active = true;
                const zScale: number = _coin.getScale().z;
                tween(_coin).to(0.5, { scale: new Vec3(1.5, 1.5, zScale) }, {
                    easing: 'smooth', onComplete: () => {
                        tween(_coin).to(0.3, { position: this.coinPosition.getPosition(), scale: Vec3.ONE }, { easing: 'smooth' }).call(() => {
                            _coin.active = false;
                            _coin.setPosition(0, 0, 0);
                            if (_index === this.coinNodeForAnimation.children.length - 1)
                                _onTweenComplete();
                        }).start();
                    }
                }).start();
            }, 100 * _index)
        })
    }

    CoinDecrement(_numberOfDecrement: number): void {
        if (this.coin < _numberOfDecrement)
            return;

        this.coin -= _numberOfDecrement;
    }

    CurrentShuffleCostIncreament(): void {
        this.currentShuffleCoinCost += this.shuffleCostIncreaseFrequency;
    }
    //#endregion

    //#region -Undo Function
    GetDiamond(): number {
        return this.diamond;
    }

    // if need to get from local storage.
    SetDiamond(_diamond: number): void {
        this.diamond = _diamond;
    }

    GetCurrentUndoCost(): number {
        return this.currentUndoDiamondCost;
    }

    SetCurrentUndoCost(_value: number): void {
        this.currentUndoDiamondCost = _value;
    }

    DiamondIncrement(_numberOfIncrement: number, _onCompleteTween: Function): void {
        this.diamondNodeForAnimation.active = true;
        this.particleEffectDiamond.resetSystem();
        const zScale: number = this.diamondNodeForAnimation.getScale().z;
        tween(this.diamondNodeForAnimation).to(0.5, { scale: new Vec3(1.5, 1.5, zScale) }, {
            easing: 'smooth', onComplete: () => {
                tween(this.diamondNodeForAnimation).to(0.3, { position: this.diamondIcon.getPosition(), scale: Vec3.ONE }, { easing: 'smooth' }).call(() => {
                    this.diamond += _numberOfIncrement; // Increament
                    this.diamondNodeForAnimation.active = false;
                    this.diamondNodeForAnimation.setPosition(90, 50, 0);
                    this.particleEffectDiamond.stopSystem();
                    _onCompleteTween();
                }).start();
            }
        }).start();
    }

    DiamondDecrement(_numberOfDecrement: number): void {
        if (this.diamond < _numberOfDecrement)
            return;

        this.diamond -= _numberOfDecrement;
    }

    //#region -DiamondCollectAnimation
    DiamondCollectAnimation(_onCompleteTween: Function): void {
        this.diamondNodeForAnimation.active = true;
        this.particleEffectDiamond.resetSystem();
        const zScale: number = this.diamondNodeForAnimation.getScale().z;
        tween(this.diamondNodeForAnimation).to(0.5, { scale: new Vec3(3, 3, zScale) }, {
            easing: 'smooth', onComplete: () => {
                tween(this.diamondNodeForAnimation).to(0.3, { position: this.diamondIcon.getPosition(), scale: Vec3.ONE }, { easing: 'smooth' }).call(() => {
                    this.diamondNodeForAnimation.active = false;
                    this.diamondNodeForAnimation.setPosition(0, 0, 0);
                    this.particleEffectDiamond.stopSystem();
                    _onCompleteTween();
                }).start();
            }
        }).start();
    }
    //#endregion

    UndoCostIncreament(): void {
        this.currentUndoDiamondCost += this.undoCostIncreaseFrequency;
    }
    //#endregion
}


