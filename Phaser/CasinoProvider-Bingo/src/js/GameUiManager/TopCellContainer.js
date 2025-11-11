export default class TopCellContainer {
    constructor(scene) {
        this.scene = scene;
        this.topCellArray = [];
        this.config = this.scene.cache.json.get("game-config");
        this.create();
    }
    create() {
        this.LayerBg();
        let spriteCounter = 0;
        for (let index = 0; index < 90; index++) {
            spriteCounter++;
            let cellObject = { cellImg: null, cellTxt: null }
            const element = this.scene.add.image(0, 0, 'board_cell');
            if (spriteCounter % 2 == 0) {
                element.setFrame(0);
            } else {
                element.setFrame(1);
            }
            let cellText = this.scene.add.text(
                0,
                0,
                index + 1, {
                fontFamily: "CAMBRIAB",
                fontStyle: "bold",
                fontSize: '30px',
                color: '#fff'
            }
            ).setOrigin(0.5);
            cellObject.cellObject = element;
            cellObject.cellTxt = cellText;
            this.topCellArray.push(cellObject);
        }
    }
    LayerBg() {
        this.layerBg = this.scene.add.image(0, 0, 'top_cell_layer_bg').setOrigin(0);
        this.layerGradient = this.scene.add.image(0, 0, 'top_cell_layer').setOrigin(0);
    }

    GetCellImg(_cellIndex) {
        for (let index = 0; index < this.topCellArray.length; index++) {
            if (_cellIndex == index) {
                return this.topCellArray[index].cellObject;
            }
        }
    }
    GetCellText(_cellIndex) {
        for (let index = 0; index < this.topCellArray.length; index++) {
            if (_cellIndex == index) {
                return this.topCellArray[index].cellTxt;
            }
        }
    }
    UpdateCells(_getCellNumber) {
        for (let index = 0; index < this.topCellArray.length; index++) {
            if (index + 1 == _getCellNumber) {
                let getCellImg = this.GetCellImg(index);
                getCellImg.setFrame(2);
            }

        }
    }
    ResetTopCellsContainer() {
        for (let index = 0; index < this.topCellArray.length; index++) {
            let getCellImg = this.GetCellImg(index);
            if (index % 2 == 0) {
                getCellImg.setFrame(1);
            } else {
                getCellImg.setFrame(0);
            }
        }
    }
    Resize(newWidth, newHeight, newScale) {
        let cellConfig = this.config.top_cell;
        this.layerBg.setScale(newScale);
        this.layerGradient.setScale(newScale);
        this.layerBg.setPosition(newWidth / 2 + cellConfig.x * newScale, cellConfig.y * newScale);
        this.layerGradient.setPosition(newWidth / 2 + cellConfig.x * newScale, cellConfig.y * newScale);

        // for (let index = 0; index < this.topCellArray.length; index++) {
        //     const element = array[index];

        // }
        // this.ResizeCells(cellConfig, newScale);
        this.ResizeCells(newWidth, newHeight, newScale);

    }
    // ResizeCells(cellConfig, newScale) {
    ResizeCells(newWidth, newHeight, newScale) {
        let cellConfig = this.config.top_cell;
        let columns = 18;
        for (let index = 0; index < this.topCellArray.length; index++) {
            let getCellImg = this.GetCellImg(index);
            let getCellText = this.GetCellText(index);

            let row = Math.floor(index / columns);
            let col = index % columns;

            // let cellSpacing = getCellImg.displayWidth;
            let cellSpacing = getCellImg.width;
            // let startX = this.layerBg.x + (cellConfig.offsets[row].startX * newScale);
            // let offsetY = this.layerBg.y + (cellConfig.offsets[row].offsetY * newScale);

            let posX = (this.layerBg.x + (cellConfig.offsets[row].startX + (col * cellSpacing)) * newScale);
            let posY = this.layerBg.y + (cellConfig.offsets[row].offsetY * newScale);

            // let posX = startX + col * cellSpacing;
            // let posX = startX;
            // let posY = offsetY;

            getCellImg.setScale(newScale);
            getCellImg.setPosition(posX, posY);
            getCellText.setScale(newScale);
            getCellText.setPosition(getCellImg.x, getCellImg.y);

        }
    }
}