import { _decorator, Animation, Component, instantiate, Label, Node, Prefab, tween, Vec3 } from 'cc';
import { SoundManager } from './SoundManager';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Score')
export class Score extends Component {

    //#region -Fields
    @property(Label) scoreText: Label;
    @property(Label) specialCoinText: Label;
    @property(Label) specialCoinText2: Label;
    @property(Node) scorePopTextParent: Node;
    @property(Prefab) scorePopText: Prefab;
    @property(Prefab) specialCoinTextPop: Prefab;

    scorePopTextArray: Node[] = [];
    specialCoinTextPopArray: Node[] = [];
    score: number = 0;

    specialCoin: number = 5;

    baseURL: string = "http://13.232.173.115:3001";
    scoreURL: string = "/update-score";
    response: any = "";
    //#endregion

    //#region -OnEnable
    protected onEnable(): void {
        // this.scoreText = this.node.getComponent(Label);
        for (let i: number = 0; i < 1; i++) {
            //ScorePopup
            let scoreTextPop: Node = instantiate(this.scorePopText);
            scoreTextPop.setParent(this.scorePopTextParent);
            scoreTextPop.active = false;
            this.scorePopTextArray.push(scoreTextPop);

            //Special Coin
            let specialCoinPopText: Node = instantiate(this.specialCoinTextPop);
            specialCoinPopText.setParent(this.scorePopTextParent);
            specialCoinPopText.active = false;
            this.specialCoinTextPopArray.push(specialCoinPopText);
        }
    }
    //#endregion

    //#region -Start
    protected start(): void {
        this.scoreText.string = `${this.score}`;
        this.specialCoinText.string = `${this.specialCoin}`;
        this.specialCoinText2.string = `${this.specialCoin}`;
    }
    //#endregion

    //#region -AddScore
    /**
     * @param _value 
     */
    AddScore(_value: number): void {
        this.score += _value;
        this.scoreText.string = `${this.score}`;
    }
    //#endregion

    //#region -GetScore
    GetScore(): number {
        return this.score;
    }
    //#endregion

    //#region -AddSpecialCoin
    AddSpecialCoin(): void {
        this.specialCoin++;
        this.specialCoinText.string = `${this.specialCoin}`;
        this.specialCoinText2.string = `${this.specialCoin}`;
        SoundManager.instance.PlaySpecialCoinRecieve();
    }
    //#endregion

    //#region -DeductSpecialCoin
    DeductSpecialCoin(_value: number): void {
        if (this.specialCoin >= _value) {
            this.specialCoin -= _value;
            this.specialCoinText.string = `${this.specialCoin}`
            this.specialCoinText2.string = `${this.specialCoin}`
        }
    }
    //#endregion

    //#region -GetSpecialCoin
    GetSpecialCoin(): number {
        return this.specialCoin;
    }
    //#endregion

    //#region -ScorePopup
    /**
     * @param _position 
     * @param _scoreText 
     */
    ScorePopup(_position: Vec3, _scoreText: string): void {
        let popupScore: Node = this.GetscorePopText();
        popupScore.active = true;
        popupScore.setPosition(_position);
        popupScore.getComponent(Label).string = _scoreText;
        popupScore.getComponent(Animation).play();
        tween(popupScore).to(2, { position: new Vec3(_position.x, _position.y + 90), scale: new Vec3(0.6, 0.6) }).start();
        setTimeout(() => {
            popupScore.active = false;
        }, 2000);
    }
    //#endregion

    //#region -SpecialCoinPopup
    SpecialCoinPopup(_position: Vec3, _scoreText: string): void {
        let popupScore: Node = this.GetSpecialCoinTextPopup();
        popupScore.active = true;
        popupScore.setPosition(_position);
        popupScore.getComponent(Label).string = _scoreText;
        popupScore.getComponent(Animation).play();
        tween(popupScore).to(2, { position: new Vec3(_position.x, _position.y + 90), scale: new Vec3(2, 2) }).start();
        setTimeout(() => {
            popupScore.active = false;
        }, 2000);
    }
    //#endregion

    //#region -GetscorePopText
    GetscorePopText(): Node {
        let newNode: Node;
        this.scorePopTextArray.forEach((_node, _index) => {
            if (!_node.active) {
                newNode = _node;
            }
        });
        if (newNode == undefined) {
            newNode = instantiate(this.scorePopText)
            newNode.setParent(this.scorePopTextParent)
            newNode.active = false;
            this.scorePopTextArray.push(newNode);
        };
        return newNode;
    }
    //#endregion

    //#region -GetSpecialCoinTextPopup
    GetSpecialCoinTextPopup(): Node {
        let newNode: Node;
        this.specialCoinTextPopArray.forEach((_node, _index) => {
            if (!_node.active) {
                newNode = _node;
            }
        });
        if (newNode == undefined) {
            newNode = instantiate(this.specialCoinTextPop)
            newNode.setParent(this.scorePopTextParent)
            newNode.active = false;
            this.specialCoinTextPopArray.push(newNode);
        };
        return newNode;
    }
    //#endregion

    //#region -GetUrl
    GetUrl(apiUrl: string) {
        return this.baseURL + apiUrl;
    }
    //#endregion

    //#region -PostScore
    PostScore(_score) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                // this.response = JSON.parse(this.responseText);

            } else { }
        };
        xhttp.open("POST", this.GetUrl(this.scoreURL), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("score=" + _score);
    }
    //#endregion
}


