import Image from "../objectclass/Image";
import { Constant } from "../Constant";
import Sprite from "../objectclass/Sprite";

export default class Table {
    constructor(scene, gameData) {
        this.scene = scene;
        this.gameData = gameData;
        this.tableCardsCount = null;
        this.tableCards = null;
        this.create();
    }
    create() {
        this.table = new Image(this.scene, 0, 0, 'table_bg');
        this.tableCardsCount = 0;
        this.tableCards = [];
        this.table.setDepth(-2);
        // this.SuffleDeck();
    }
    CradStorAftertable(plIndex) {
        this.tableCards.forEach(element => {
            element.SetFrame(52);
            this.scene.gameTween.CardOnTableTween(element, this.gameData.cardstorePosition[plIndex].x, this.gameData.cardstorePosition[plIndex].y, 1000, 0);
        });
    }
    Resize(newWidth, newHeight, newScale) {
        this.table.SetScale(newScale);
        this.table.SetPosition(newWidth / 2, newHeight / 2);
    }
}