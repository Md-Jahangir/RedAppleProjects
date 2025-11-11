import { _decorator, CCBoolean, Component, Label, Node, Sprite, SpriteFrame, UITransform } from 'cc';
import { ProfileData } from '../Constant';
const { ccclass, property } = _decorator;

@ccclass('PlayerProfile')
export class PlayerProfile extends Component {
    @property(CCBoolean) private isBot: boolean = false;

    @property(Sprite) private spriteComponent: Sprite = null!;
    private nameDisplayText: Label = null!;
    private totalscoreDisplayText: Label = null!;
    private profileOverlay: Node = null!;

    private userName: string = "";
    private totalStarCollected: number = 0;

    protected onLoad(): void {
        this.nameDisplayText = this.node.getChildByName("NameText").getComponent(Label);
        this.totalscoreDisplayText = this.node.getChildByName("StarEarned").children[0].getComponent(Label);
        this.profileOverlay = this.node.getChildByName("overlay");
    };

    initDetails(_profileDetails: ProfileData, _coinIconSF: SpriteFrame): void {
        this.setPlayerName(_profileDetails.name);
        this.setProfilePicture(_profileDetails.image);
        this.setTotalStarEarned(0);
        this.setCoinIcon(_coinIconSF)
    };

    setProfilePicture(_profilePicture: SpriteFrame): void {
        this.spriteComponent.spriteFrame = _profilePicture;
    };

    setPlayerName(_name: string): void {
        this.userName = _name;
        this.nameDisplayText.string = _name;
    };

    setTotalStarEarned(_starEarned: number, _outOf?: number): void {
        this.totalStarCollected = _starEarned;
        _outOf ? this.totalscoreDisplayText.string = `${_starEarned} / ${_outOf}` : this.totalscoreDisplayText.string = `${_starEarned}`;
    };

    setCoinIcon(_coinIconSF: SpriteFrame): void {
        const starEarnedParent = this.node.getChildByName('StarEarned');
        const coinIcon = starEarnedParent.getChildByName('CoinIcon').getComponent(Sprite);
        coinIcon.spriteFrame = _coinIconSF;
    };

    turnEnable(_enable: boolean): void {
        if (!this.profileOverlay) return;

        this.profileOverlay.active = !_enable;
    };
}


