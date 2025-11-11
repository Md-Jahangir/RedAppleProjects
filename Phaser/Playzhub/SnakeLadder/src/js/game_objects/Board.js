class Board {
    constructor(scene) {
        this.scene = scene;
        this.arrBoard = [];
        this.arrTileText = [];
        this.board = null;

        this.CreateBoard();
    }

    CreateBoard() {
        let lim = 101;
        // }
        this.board = this.scene.add.image(0, 15, 'board').setOrigin(0.5);
        this.scene.gameContainer.add(this.board);

        let ascendingValues = [-9, -7, -5, -3, -1, 1, 3, 5, 7, 9]; //descending values
        let index = 0;
        let fontTextStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '41px', fill: '#fefffe', align: 'center' };

        for (let i = 1; i < 101; i++) {

            let textValue = lim - i;

            if (i >= 11 && i <= 20) {
                textValue = lim - i + ascendingValues[index];
                index++;
                // if (i <= 20)
                //     index == 0;
                // console.log("nuym", lim, i, lim - i, textValue);
            }


            else if (i >= 31 && i <= 40) {
                if (i == 31) {
                    index = 0;

                }
                textValue = lim - i + ascendingValues[index];
                index++;
            }

            else if (i >= 51 && i <= 60) {
                if (i == 51) {
                    index = 0;

                }

                textValue = lim - i + ascendingValues[index];
                index++;
            }
            else if (i >= 71 && i <= 80) {
                if (i == 71) {
                    index = 0;

                }
                textValue = lim - i + ascendingValues[index];
                index++;
            }
            else if (i >= 91 && i <= 100) {
                if (i == 91) {
                    index = 0;

                }

                textValue = lim - i + ascendingValues[index];
                index++;
            }
            this.boardTileTxt = this.scene.add.text(0, 0, textValue, fontTextStyle).setOrigin(0.5);
            this.boardTileTxt.setStroke('#4b7931', 6);

            this.boardTiles = this.scene.add.sprite(0, 0, 'game_obj', 'tile_2').setOrigin(0.5).setName(textValue);

            if (textValue === 0)
                this.boardTiles.setTexture('game_obj', 'tile_2');

            else if (textValue % 2 !== 0)
                this.boardTiles.setTexture('game_obj', 'tile_2');

            else
                this.boardTiles.setTexture('game_obj', 'tile_1');

            this.boardTiles.hasSnakeHead = false;
            this.boardTiles.hasSnakeTail = false;
            this.boardTiles.hasLadderBottom = false;
            this.boardTiles.hasLadderTop = false;
            this.boardTiles.hasLadder = false;
            this.boardTiles.hasPawn = false;
            this.boardTiles.hasGem = false;
            this.arrTileText.push(this.boardTileTxt);
            this.arrBoard.push(this.boardTiles);
        }

        this.CreateBoardGrid();
    }

    CreateBoardGrid() {
        this.boardGrid = Phaser.Actions.GridAlign(this.arrBoard, {
            width: 10,
            height: 10,
            cellWidth: 92,
            cellHeight: 92,
            x: -458,
            y: -438
        });
        // console.log(this.chumlee);
        this.boardTxtGrid = Phaser.Actions.GridAlign(this.arrTileText, {
            width: 10,
            height: 10,
            cellWidth: 92,
            cellHeight: 92,
            x: -425,
            y: -418
        });
        // console.log(this.chumlee);

        this.arrTileText.forEach((textObj) => {
            if (textObj.text === '100') {
                textObj.x -= 24; // Shift left slightly for proper centering
            }
            else if (textObj._text.length === 2)
                textObj.x -= 10;
        });

    }
}

export default Board;