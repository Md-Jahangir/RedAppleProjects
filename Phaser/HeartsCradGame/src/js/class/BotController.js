import { Constant } from "../Constant";

export default class BotController {
    constructor(scene, tablePosition, gameData) {
        this.scene = scene;
        this.tablePos = tablePosition;
        this.gameData = gameData;
        this.create();
    }
    create() {
        this.scene.events.on('nextmove', this.CardShowOnTable, this);
    }
    CardShowOnTable(plIndex, _angle) {
        let index = Phaser.Math.Between(0, 10)
        let card = this.scene.allPlayerArray[plIndex].userCardsInstance.userCards[index];
        this.scene.allPlayerArray[plIndex].userCardsInstance.userCards.splice(index, 1);
        this.scene.tableInstance.tableCards.push(card);
        this.scene.gameTween.CardOnTableTween(card, this.tablePos[plIndex].x, this.tablePos[plIndex].y, 500, _angle);
        // this.scene.allPlayerArray[plIndex].OponentCardAdjustTween(0, 0, -20, 40, -90);
        // this.scene.allPlayerArray[plIndex].OponentCardAdjustTween(-30, 60, 0, 0, -180);
        this.scene.allPlayerArray[plIndex].userCardsInstance.AdjustCard(this.gameData.playerAdjustPos[plIndex].offsetX, this.gameData.playerAdjustPos[plIndex].offsetY, this.gameData.playerAdjustPos[plIndex].stGap, this.gameData.playerAdjustPos[plIndex].avgGap, this.gameData.playerAdjustPos[plIndex].waveSpace, this.gameData.playerAdjustPos[plIndex].angle, plIndex);
        setTimeout(() => {
            this.scene.tableInstance.CradStorAftertable(plIndex);
        }, 1000)
    }

}