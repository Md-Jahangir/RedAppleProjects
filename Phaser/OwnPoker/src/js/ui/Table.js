import { Model } from "../Model";
class Table {
    constructor(scene) {
        this.scene = scene;
        this.tableContainer = null;
        this.tableCardArray = [];
        this.potSplitArray = [];
        this.newScaleFactor = null;
        this.tableCardOutlineArray = [];

        this.bgConstantValueObj = {
            tableBgPosX: 0,
            tableBgPosY: -60
        };
        this.potBaseConstantValueObj = {
            potValueBasePosX: 0,
            potValueBasePosY: -230,
        };
        this.potSplitConstantValueObj = {
            potSplitPosXArray: [40, -80, -160, -280],
            potSplitStartPosY: -160,
            potSplitStartGapX: -40,
            potSplitScale: 0.8,
        };
        this.tableCardConstantValueObj = {
            numberOfCards: 5,
            tableCardScale: 0.8,
            tableCardStartPosX: -350,
            tableCardStartPosY: -72,
            tableCardGapX: 3,
            tableCardRotationTweenScaleX: 0,
            tableCardRotationTweenDuration: 200,
        };
        this.cardOutlineConstantValueObj = {
            tableCardOutlineScale: 0.8,
            tableCardOutlineTweenScale: 0.85,
            tableCardOutlineTweenDuration: 300,
            outlineGapX: -2
        };

        this.create();
    };

    create() {
        this.tableContainer = this.scene.add.container(0, 0);

        this.CreateTableBg();
        this.CreatePotValueArea();
        this.CreateTableCard();
    };

    CreateTableBg() {
        this.tableBg = this.scene.add.image(this.bgConstantValueObj.tableBgPosX, this.bgConstantValueObj.tableBgPosY, "table_bg").setOrigin(0.5);
        this.tableContainer.add(this.tableBg);
    };

    CreatePotValueArea() {
        this.potValueBase = this.scene.add.image(this.potBaseConstantValueObj.potValueBasePosX, this.potBaseConstantValueObj.potValueBasePosY, "pot_value_base").setOrigin(0.5);
        let potValueTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '30px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: this.potValueBase.width - 10 } };
        this.potValueText = this.scene.add.text(this.potValueBase.x + 20, this.potValueBase.y, "0", potValueTextStyle).setOrigin(0.5);
        this.tableContainer.add([this.potValueBase, this.potValueText]);
    };

    SetPotValue(_amt) {
        this.potValueText.setText(_amt);
    };

    CreatePotSplitArea(_arr) {
        this.potSplitContainer = this.scene.add.container(0, 0);
        let posArr = this.potSplitConstantValueObj.potSplitPosXArray;
        let startPosX = posArr[_arr.length - 1];
        let startPosY = this.potSplitConstantValueObj.potSplitStartPosY;
        let gapX = this.potSplitConstantValueObj.potSplitStartGapX;
        for (let i = 0; i < _arr.length; i++) {
            let potBase = this.scene.add.image(0, 0, "pot_value_base").setOrigin(0.5).setScale(this.potSplitConstantValueObj.potSplitScale);
            potBase.setPosition(startPosX + (i * potBase.displayWidth) + gapX, startPosY);
            let potValueTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '30px', fill: '#fff', fontStyle: 'bold', align: 'center', wordWrap: { width: potBase.width - 10 } };
            let potAmtText = this.scene.add.text(potBase.x + 20, potBase.y, _arr[i], potValueTextStyle).setOrigin(0.5).setScale(this.potSplitConstantValueObj.potSplitScale);
            this.potSplitArray.push(potAmtText);
            this.potSplitContainer.add([potBase, potAmtText]);
        }
        this.tableContainer.add(this.potSplitContainer);
    };

    DestroyPotSplitArea() {
        if (this.potSplitContainer) {
            this.potSplitContainer.destroy();
            this.potSplitArray = [];
        }
    };

    CreateTableCard() {
        let startXPos = this.tableCardConstantValueObj.tableCardStartPosX;
        let yPos = this.tableCardConstantValueObj.tableCardStartPosY;
        let gapX = this.tableCardConstantValueObj.tableCardGapX;
        for (let i = 0; i < this.tableCardConstantValueObj.numberOfCards; i++) {
            let card = this.scene.add.sprite(0, 0, "card_spritesheet").setOrigin(0.5).setScale(this.tableCardConstantValueObj.tableCardScale);
            card.setPosition(startXPos + (i * (card.width + gapX)), yPos);
            card.setVisible(false);
            card.setFrame(52);
            this.tableCardArray.push(card);

            let cardOutline = this.scene.add.sprite(0, 0, "card_outline").setOrigin(0.5).setScale(this.cardOutlineConstantValueObj.tableCardOutlineScale);
            cardOutline.setPosition(startXPos + (i * (cardOutline.width + gapX)), yPos);
            cardOutline.setVisible(false);
            this.tableCardOutlineArray.push(cardOutline);
        }
    };

    ShowTableCard(_arr, _roundName) {
        switch (_roundName) {
            case "dealFlop":
                for (let i = 0; i < _arr.length; i++) {
                    let cardFrame = Model.GetActualCardFrameIndex(_arr[i].card_id);
                    this.tableCardArray[i].setVisible(true);
                    this.tableCardArray[i].name = _arr[i].card_id;
                    this.RotateTableCard(this.tableCardArray[i], cardFrame);
                }
                break;
            case "dealTurn":
                {
                    let cardFrame = Model.GetActualCardFrameIndex(_arr[0].card_id);
                    this.tableCardArray[3].setVisible(true);
                    this.tableCardArray[3].name = _arr[0].card_id;
                    this.RotateTableCard(this.tableCardArray[3], cardFrame);
                }
                break;
            case "dealRiver":
                {
                    let cardFrame = Model.GetActualCardFrameIndex(_arr[0].card_id);
                    this.tableCardArray[4].setVisible(true);
                    this.tableCardArray[4].name = _arr[0].card_id;
                    this.RotateTableCard(this.tableCardArray[4], cardFrame);
                }
                break;
            default:
                for (let i = 0; i < _arr.length; i++) {
                    let cardFrame = Model.GetActualCardFrameIndex(_arr[i].card_id);
                    this.tableCardArray[i].setVisible(true);
                    this.tableCardArray[i].name = _arr[i].card_id;
                    this.RotateTableCard(this.tableCardArray[i], cardFrame);
                }
        }
    };

    RotateTableCard(_obj, _frame) {
        let scaleTween1 = this.scene.add.tween({
            targets: [_obj],
            scaleX: this.tableCardConstantValueObj.tableCardRotationTweenScaleX,
            ease: 'Linear',
            duration: this.tableCardConstantValueObj.tableCardRotationTweenDuration,
            callbackScope: this,
            onComplete: function () {
                _obj.setFrame(_frame);
                let scaleTween = this.scene.add.tween({
                    targets: [_obj],
                    scaleX: this.tableCardConstantValueObj.tableCardScale * this.newScaleFactor,
                    ease: 'Linear',
                    duration: this.tableCardConstantValueObj.tableCardRotationTweenDuration
                });
            }
        });
    };

    HideTableCard() {
        for (let i = 0; i < this.tableCardArray.length; i++) {
            this.tableCardArray[i].setVisible(false);
        }
    };

    HideOutline() {
        for (let i = 0; i < this.tableCardOutlineArray.length; i++) {
            this.tableCardOutlineArray[i].setVisible(false);
        }
    };

    HighLightWinCards(_arr) {
        for (let i = 0; i < _arr.length; i++) {
            for (let j = 0; j < this.tableCardArray.length; j++) {
                if (this.tableCardArray[j].name == _arr[i].card_id) {
                    this.tableCardArray[j].setDepth(2);
                    this.HighlightOutlineOfTableCard(j)
                }
            }
        }
    };

    HighlightOutlineOfTableCard(_targets) {
        this.tableCardOutlineArray[_targets].setVisible(true);
        let scaleTwn = this.scene.add.tween({
            targets: this.tableCardOutlineArray[_targets],
            scaleX: this.cardOutlineConstantValueObj.tableCardOutlineTweenScale * this.newScaleFactor,
            scaleY: this.cardOutlineConstantValueObj.tableCardOutlineTweenScale * this.newScaleFactor,
            ease: 'Linear',
            duration: this.cardOutlineConstantValueObj.tableCardOutlineTweenDuration,
            repeat: -1,
            yoyo: true
        });
    };

    ResetHighLightWinCard() {
        for (let j = 0; j < this.tableCardArray.length; j++) {
            this.tableCardArray[j].setDepth(0);
        }
        this.HideTableCard();
        this.HideOutline();
    };

    resize(newWidth, newHeight, newScale) {
        this.newScaleFactor = newScale;
        this.tableContainer.setScale(newScale);
        this.tableContainer.setPosition((newWidth / 2), (newHeight / 2));

        for (let i = 0; i < this.tableCardArray.length; i++) {
            let startXPos = this.tableCardConstantValueObj.tableCardStartPosX;
            let yPos = this.tableCardConstantValueObj.tableCardStartPosY;
            let gapX = this.tableCardConstantValueObj.tableCardGapX;
            let outlineGapX = this.cardOutlineConstantValueObj.outlineGapX;
            this.tableCardArray[i].setScale(newScale * this.tableCardConstantValueObj.tableCardScale);
            this.tableCardArray[i].setPosition((newWidth / 2) + startXPos * newScale + (i * (this.tableCardArray[i].width + gapX)) * newScale, (newHeight / 2) + yPos * newScale);

            this.tableCardOutlineArray[i].setScale(newScale * this.cardOutlineConstantValueObj.tableCardOutlineScale);
            this.tableCardOutlineArray[i].setPosition((newWidth / 2) + startXPos * newScale + (i * (this.tableCardOutlineArray[i].width + outlineGapX)) * newScale, (newHeight / 2) + yPos * newScale);
        }

    };
};

export default Table;