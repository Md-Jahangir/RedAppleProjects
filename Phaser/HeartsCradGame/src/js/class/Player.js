import Image from "../objectclass/Image";
import Text from "../objectclass/Text";
import PlayerCards from "./PlayerCards";

export default class Player {
    constructor(scene, _x, _y, _index, gameData) {
        this.scene = scene;
        this.gameData = gameData;
        this.playerIndex = _index;
        this.x = _x;
        this.y = _y;

        this.playerObjectsContainer = null;
        this.create();
    }
    create() {
        this.playerObjectsContainer = this.scene.add.container(window.innerWidth / 2, window.innerHeight / 2);
        this.userBase = new Image(this.scene, this.x, this.y, 'user_base');
        this.playerObjectsContainer.add([this.userBase]);
        this.UserUiCreate();
        this.UserNameCreate();
        this.UserBalanceCreate();
        this.UserCardsHandle();
    }
    SortPlayerCards() {
        this.usercards.sort((a, b) => a.getData("frameNum") - b.getData("frameNum"));
        console.log(this.usercards.list);
    }
    UserNameCreate() {
        let namestyle = { fontFamily: "Poppins-Bold", fontSize: 20 };
        this.userNameBase = new Image(this.scene, this.userBase.x, this.userBase.y + 60, 'user_name_base' + this.playerIndex.toString());
        this.userNameText = new Text(this.scene, this.userNameBase.x + 70, this.userNameBase.y, "", namestyle);
        this.userNameText.SetOrigin(0.5);
        this.playerObjectsContainer.add([this.userNameBase, this.userNameText]);
    }
    SetUserName(_name) {
        this.userNameText.setText(_name);
    };
    UserBalanceCreate() {
        let balancestyle = { fontFamily: "Poppins-Bold", fontSize: 20 };
        this.userBalanceBase = new Image(this.scene, this.userBase.x - 30, this.userBase.y + 60, 'user_balance_base');
        this.userBalanceText = new Text(this.scene, this.userBalanceBase.x, this.userBalanceBase.y, "", balancestyle);
        this.userBalanceText.SetOrigin(0.5);
        this.userBalanceBase.SetScale(0.5);
        this.playerObjectsContainer.add([this.userBalanceBase, this.userBalanceText]);
    }
    SetUserBalance(_balance) {
        this.userBalanceText.setText(_balance);
    };
    UserCardsHandle() {
        this.userCardsInstance = new PlayerCards(this, this.x, this.y, this.gameData);
    }
    UserUiCreate() {
        this.userimage = new Image(this.scene, this.userBase.x, this.userBase.y, "user_image");
        this.userRing = new Image(this.scene, this.userBase.x, this.userBase.y, "user_ring");
        let maskGraphics = this.scene.make.graphics();
        let maskRadius = 80;
        maskGraphics.fillStyle(0xffffff);
        maskGraphics.beginPath();
        maskGraphics.arc(this.userimage.x + window.innerWidth / 2, this.userimage.y + window.innerHeight / 2, maskRadius, 0, Math.PI * 2, true);
        maskGraphics.closePath();
        maskGraphics.fillPath();
        let mask = maskGraphics.createGeometryMask();
        this.userimage.setMask(mask);
        this.playerObjectsContainer.add([this.userimage, this.userRing]);
    }
    SetUserImage(_img) {
        this.userimage.loadTexture(_img);
    };
    Resize(newWidth, newHeight, newScale) {
        this.userimage.clearMask();
        this.playerObjectsContainer.setScale(newScale);
        this.playerObjectsContainer.setPosition(newWidth / 2, newHeight / 2);
        let maskGraphics = this.scene.make.graphics();
        let maskRadius = 80 * newScale;
        maskGraphics.arc(this.userimage.x * newScale + newWidth / 2, this.userimage.y * newScale + newHeight / 2, maskRadius, 0, Math.PI * 2, true);
        maskGraphics.closePath();
        maskGraphics.fillPath();
        let mask = maskGraphics.createGeometryMask();
        this.userimage.setMask(mask);
    }
}