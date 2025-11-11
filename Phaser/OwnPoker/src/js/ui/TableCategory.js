import { Model } from "../Model.js";
import { Server } from "../services/Server.js";
// import BuyInPopup from "../popup/BuyInPopup.js";

class TableCategory {
    constructor(scene, _posX, _posY, _scale, _img) {
        this.scene = scene;
        this.posX = _posX;
        this.posY = _posY;
        this.imageName = _img;
        this.containerScale = _scale

        this.newScaleFactor = null;
        this.tableContainer = null;

        this.smallBlindAmount = null;
        this.tableName = null;
        this.tableId = null;
        this.bigBlindAmount = null;
        this.currentPlayerCount = null;
        this.totalPlayerCount = null;
        this.amount = null;
        this.minBuyInAmount = null;
        this.maxBuyInAmount = null;
        this.tableId = null;
        this.gameType = null;

        this.CreateTables();

    };

    CreateTables() {
        this.tableContainer = this.scene.add.container(this.posX, this.posY);

        this.tableBase = this.scene.add.image(0, 0, this.imageName).setOrigin(0.5);

        let tableNameTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '44px', fill: '#d1b286', fontStyle: 'normal', align: 'center', wordWrap: { width: this.tableBase.displayWidth - 50 } };
        this.tableNameText = this.scene.add.text(this.tableBase.x, this.tableBase.y - 75, "Table Name", tableNameTextStyle).setOrigin(0.5);

        let blindHeadingTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '33px', fill: '#948166', fontStyle: 'normal', align: 'center' };
        this.blindHeadingText = this.scene.add.text(this.tableBase.x, this.tableBase.y - 2, "Blinds 1/2", blindHeadingTextStyle).setOrigin(0.5);

        let playerCountTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '28px', fill: '#a85034', fontStyle: 'normal', align: 'center' };
        this.playerCountText = this.scene.add.text(this.tableBase.x + 25, this.tableBase.y + 65, "5/6", playerCountTextStyle).setOrigin(0.5);

        this.amountBase = this.scene.add.image(this.tableBase.x, this.tableBase.y + 160, "table_balance_base").setOrigin(0.5);
        this.amountBase.setInteractive({ useHandCursor: true });
        this.amountBase.on('pointerdown', (pointer, x, y, event) => this.OnAmountButtonPressed(this.amountBase), this);

        let amountTextStyle = { fontFamily: "BAHNSCHRIFT", fontSize: '42px', fill: '#fff', fontStyle: 'bold', align: 'center' };
        this.amountText = this.scene.add.text(this.amountBase.x + 55, this.amountBase.y - 2, this.minBuyInAmount + "/" + this.maxBuyInAmount, amountTextStyle).setOrigin(0.5);
        // this.minAmountText = this.scene.add.text(this.amountBase.x + 40, this.amountBase.y - 2, "200", amountTextStyle).setOrigin(0.5);
        // this.maxAmountText = this.scene.add.text(this.amountBase.x + 40, this.amountBase.y - 2, "200", amountTextStyle).setOrigin(0.5);

        this.tableContainer.add([this.tableBase, this.tableNameText, this.blindHeadingText, this.playerCountText, this.amountBase, this.amountText]);
    };

    async OnAmountButtonPressed(_this) {
        console.log("OnAmountButtonPressed this..........", _this);
        // console.log("this.tableName: ", this.tableName);
        // console.log("this.smallBlindAmount: ", this.smallBlindAmount);
        // console.log("this.bigBlindAmount: ", this.bigBlindAmount);
        // console.log("this.currentPlayerCount: ", this.currentPlayerCount);
        // console.log("this.totalPlayerCount: ", this.totalPlayerCount);
        // console.log("this.amount: ", this.amount);
        let data = {
            tableName: this.tableName,
            smallBlindAmount: this.smallBlindAmount,
            bigBlindAmount: this.bigBlindAmount,
            currentPlayerCount: this.currentPlayerCount,
            totalPlayerCount: this.totalPlayerCount,
            minBuyInAmount: this.minBuyInAmount,
            maxBuyInAmount: this.maxBuyInAmount,
            tableId: this.tableId

        }
        // this.scene.ShowBuyInPopup(data);
        try {
            const response = await Server.GenerateGameTokenApi();
            console.log('GenerateGameTokenApi responce: ', response);
            if (!response.error) {
                this.SetValueFromQueryParameter();
            } else {
                this.scene.alertPopup.ShowAlertPopup(response.message);
            }
        } catch (err) {
            console.log('GenerateGameTokenApi err: ', err);
        }


    };

    async SetValueFromQueryParameter() {
        Model.SetGameAuthToken(this.authToken);
        Model.SetTableId(this.tableId);
        Model.SetMinBuyInAmount(this.minBuyInAmount);
        Model.SetMaxBuyInAmount(this.maxBuyInAmount);
        Model.SetGameType(this.gameType);
    };

    SetGameType(gType) {
        this.gametype = gType;
    };

    SetTableName(_tName) {
        this.tableName = _tName;
        this.tableNameText.setText(_tName);
    };

    SetBlindsCount(_sbAmt, _bbAmt) {
        this.smallBlindAmount = _sbAmt;
        this.bigBlindAmount = _bbAmt;
        this.blindHeadingText.setText("Blinds " + _sbAmt + "/" + _bbAmt);
    };

    SetPlayerCount(_totalPlayerCount) {
        // this.currentPlayerCount = _curentPlyerCount;
        this.totalPlayerCount = _totalPlayerCount;
        this.playerCountText.setText(_totalPlayerCount);
    };

    SetTableAmount(_minAmt, _maxAmt) {
        // this.amount = _amt;
        // this.amountText.setText(_amt);
        // this.amount = _amt;
        this.minBuyInAmount = _minAmt;
        this.maxBuyInAmount = _maxAmt;
        this.amountText.setText(_minAmt + "/" + _maxAmt);
    };

    Destroy() {
        this.tableContainer.destroy();
    };


    resize(newWidth, newHeight, newScale) {
        if (this.scene.currentIndex == 0) {
            this.tableContainer.setScale(newScale * this.containerScale);
            // this.tableContainer.setPosition(newWidth / 2 + this.posX * newScale, newHeight / 2 + this.posY * newScale);
            this.tableContainer.setPosition(newWidth / 2 + this.posX * newScale, newHeight / 2 + this.posY * newScale);
            this.newScaleFactor = newScale;
        }
    };

}

export default TableCategory;