import CoinTween from "./CoinTween";
import { AudioManager } from "../media/AudioManager";

class Gems {
    constructor(scene) {
        this.scene = scene;
        this.diamondNum = null;
        this.gemsSafePosArr = [];
        this.gemsArray = [];

        this.CheckVacantBoardTiles();
    }

    CheckVacantBoardTiles() {
        const boardTiles = this.scene.board.arrBoard;
        const safeTiles = [];

        for (let i = 0; i < boardTiles.length; i++) {
            const tile = boardTiles[i];
            if (!tile.hasSnakeHead && tile.name !== 1 && tile.name !== 100) {
                safeTiles.push(tile.name);
            }
        }

        const maxGems = Phaser.Math.Between(5, 25);
        this.diamondNum = maxGems;

        Phaser.Utils.Array.Shuffle(safeTiles);

        const gameContainer = this.scene.gameContainer;
        const gemsArray = this.gemsArray;

        for (let i = 0; i < maxGems; i++) {
            const tileName = safeTiles[i];
            const tile = gameContainer.getByName(tileName);

            if (!tile) continue;

            tile.hasGem = true;
            tile.gemNum = i;

            const gem = this.CreateGem(tile.x, tile.y);
            gameContainer.add(gem);
            gemsArray.push(gem);
        }

        this.gemsSafePosArr = safeTiles.slice(0, maxGems);
        this.ResetGemsPhase();
    }

    CreateGem(x, y) {
        const gem = this.scene.add.image(x, y, 'reward').setOrigin(0.5);
        gem.postFX.addShine(0.5, 0.2, 5);
        return gem;
    }

    ResetGemsPhase() {
        this.diamondNum = null;
        this.gemsSafePosArr = null;
        this.getGemTile = null;
    }

    CollectGems() {
        AudioManager.PlayCoinCollectedAudio();
        let getGemNum = this.scene.getBlock.gemNum;
        // this.gemsArray[getGemNum].setDepth(20);
        if (this.scene.turn === 0)
            this.coinTween = new CoinTween(this.scene, this.gemsArray[getGemNum], this.scene.UpdateGemsCount.bind(this.scene));
        // else
        //     this.gemsArray[getGemNum].setVisible(false);
        this.scene.CheckAndCallTurn();
    }
}

export default Gems;