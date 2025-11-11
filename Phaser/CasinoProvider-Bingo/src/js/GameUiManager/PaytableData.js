import { Model } from "../Model";

export default class PaytableData extends Phaser.GameObjects.Container {
    constructor(scene, x, y, config, texture) {
        super(scene, x, y)
        scene.add.existing(this);
        this.x = x;
        this.y = y;
        this.texture = texture;
        this.rows = 3;
        this.columns = 9;
        this.rowHeight = 33;
        this.sectionSpacing = 65;
        this.sections = [];
        this.texts = [{ textStr: 'FULL HOUSE : ', textValue: 'X100' }, { textStr: 'ANY 2 LINES : ', textValue: 'X50' }, { textStr: 'ANY LINE : ', textValue: 'X5' }];
        this.textArray = [];
        for (let i = 0; i < 3; i++) {
            let section = this.createSection(scene, i);
            this.sections.push(section);
            this.add(section);
        }
        for (let i = 0; i < 3; i++) {
            let text = this.createText(scene, i);
            this.textArray.push(text);
            this.add(text);
        }
    }
    createSection(scene, sectionIndex) {
        let section = scene.add.container(this.x, this.y + sectionIndex * 150);

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.columns; col++) {
                let blackSprite = scene.add.image(0, 0, this.texture).setOrigin(0);
                blackSprite.setFrame(0);
                section.add(blackSprite);
                if ((sectionIndex === 0) || (sectionIndex === 1 && row < 2) || (sectionIndex === 2 && row < 1)) {
                    blackSprite.setFrame(1);
                } else {
                    blackSprite.setFrame(0)
                }
            }
        }

        return section;
    }
    createText(scene, textIndex) {
        let paytableValues = Model.GetPaytableValues();
        let text = scene.add.container(this.x, this.y + textIndex * 150);
        let textTitle = scene.add.text(
            0,
            0,
            this.texts[textIndex].textStr, {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '30px',
            color: '#fff',
            align: "left"
        }
        ).setOrigin(0);
        let textValue = scene.add.text(
            0,
            0,
            'X' + paytableValues[textIndex], {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '30px',
            color: '#fff',
            align: "left"
        }
        ).setOrigin(0);
        text.add([textTitle, textValue]);
        return text;
    }
    Hide() {
        this.sections.forEach((section, sectionIndex) => {
            section.list.forEach((element, index) => {
                element.setVisible(false);
            });
        });
        this.textArray.forEach((text, sectionIndex) => {
            text.list.forEach((element, index) => {
                element.setVisible(false);
            });
        });
    }
    Show() {
        this.sections.forEach((section, sectionIndex) => {
            section.list.forEach((element, index) => {
                element.setVisible(true);
            });
        });
        this.textArray.forEach((text, sectionIndex) => {
            text.list.forEach((element, index) => {
                element.setVisible(true);
            });
        });
    }
    UpdateFullHousetext() {
        Model.SetPaytableValues([100, 50, 20]);
        let paytableValues = Model.GetPaytableValues();
        this.textArray[0].list[1].setText('X' + paytableValues[0]);
        this.textArray[1].list[1].setText('X' + paytableValues[1]);
        this.textArray[2].list[1].setText('X' + paytableValues[2]);
    }
    UpdateAny2Linetext() {
        Model.SetPaytableValues([50, 10, 2]);
        let paytableValues = Model.GetPaytableValues();
        this.textArray[0].list[1].setText('X' + paytableValues[0]);
        this.textArray[1].list[1].setText('X' + paytableValues[1]);
        this.textArray[2].list[1].setText('X' + paytableValues[2]);
    }
    UpdateAnyLinetext() {
        Model.SetPaytableValues([20, 2, 1]);
        let paytableValues = Model.GetPaytableValues();
        this.textArray[0].list[1].setText('X' + paytableValues[0]);
        this.textArray[1].list[1].setText('X' + paytableValues[1]);
        this.textArray[2].list[1].setText('X' + paytableValues[2]);
    }
    Resize(newX, newY, newScale, config) {
        this.sectionSpacing = config.sectionSpacing;
        this.sections.forEach((section, sectionIndex) => {
            section.list.forEach((element, index) => {
                element.setScale(newScale);
                let row = Math.floor(index / (this.columns * 1));
                let col = (index / 1) % this.columns;
                let posX = col * config.spriteDisplayHeight * newScale;
                let posY = row * config.spriteDisplayWidth * newScale;
                element.setPosition(posX, posY);
            });
            let sectionY = sectionIndex * ((this.rows * this.rowHeight) + this.sectionSpacing) * newScale;
            section.setPosition(newX + config.containerX * newScale, newY + sectionY + config.containerY * newScale);
        });
        this.textSpacing = config.textSpacing;
        this.textArray.forEach((text, textIndex) => {
            text.list.forEach((element, index) => {
                element.setScale(newScale);
                if (index == 0) {
                    element.setPosition(config.textoffsetX[textIndex].x1, config.textoffsetX[textIndex].y1);
                } else {
                    element.setPosition(config.textoffsetX[textIndex].x2, config.textoffsetX[textIndex].y2);
                }
            });
            // let textY = this.textSpacing + config.textoffsetY[textIndex] * newScale;
            // text.setPosition(newX + config.textX[textIndex] * newScale, newY + textY * newScale);
            let textY = this.textSpacing + config.textoffsetY[textIndex];
            text.setScale(newScale);
            text.setPosition(newX + config.textX[textIndex] * newScale, newY + textY * newScale);
        });
    }
}