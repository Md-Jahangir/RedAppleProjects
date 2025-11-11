import { Constant } from "./Constant.js";
class Background {
    constructor(scene) {
        this.scene = scene;
        this.numberOfBackImage = 5;
        this.baseColorImageArray = [];
        this.lastIndexOfbg = null;
        this.colorBgCounter = 0;

        this.numberOfTransperentImage = 3;
        this.transperentBgArray = [];
        this.lastIndexOfTransperent = null;
        this.hexCodeArray = [];
    }
    CreateBaseImages() {
        this.hexCodeArray = ["0XCFD2EC", "0XB1F1D1", "0XDCF59B", "0XFAD495", "0XCE95FA", "0XF1BDBD", "0XEF4F4F", "0X33E54B"];
        let item = this.hexCodeArray[Math.floor(Math.random() * this.hexCodeArray.length)];
        // console.log('ietem : ', item)
        this.lastIndexOfbg = this.numberOfBackImage - 1;
        for (let i = 0; i < this.numberOfBackImage; i++) {
            let bg = this.scene.add.sprite(0, 0, 'base_' + i).setOrigin(0.5, 0)
                .setScale(Constant.scaleFactorX * 1, Constant.scaleFactorY * 1).setTint(item);

            this.baseColorImageArray.push(bg);
            if (i == 0) {
                bg.setPosition(Math.round(Constant.game.config.width / 2), 0);
            } else if (i > 0) {
                bg.setPosition(Constant.game.config.width / 2, this.baseColorImageArray[i - 1].y - this.baseColorImageArray[i - 1].height * Constant.scaleFactorY + Constant.game.config.height / 40);
            }
        }
    };
    MoveBaseBlueImages() {

        for (let i = 0; i < this.baseColorImageArray.length; i++) {
            this.baseColorImageArray[i].y += this.scene.upOffest * 0.7;
            if (this.baseColorImageArray[i].y >= Constant.game.config.height * Constant.scaleFactorY * 1.3) {
                this.baseColorImageArray[i].x = Constant.game.config.width / 2;
                this.baseColorImageArray[i].y = this.baseColorImageArray[this.lastIndexOfbg].y - this.baseColorImageArray[i].height * Constant.scaleFactorY + Constant.game.config.height / 40;
                this.colorBgCounter += 1;
                if (this.colorBgCounter === 20) {
                    this.scene.moveSpecialFoodBool = true;
                    this.colorBgCounter = 0;
                }
                this.lastIndexOfbg = i;
            }
        }
    };
    CreateTransperentBranches() {
        this.lastIndexOfTransperent = this.numberOfTransperentImage - 1;
        for (let i = 0; i < this.numberOfTransperentImage; i++) {
            let transperentBg = this.scene.add.sprite(0, 0, "Layer_" + i).setOrigin(0.5, 0)
                .setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            this.transperentBgArray.push(transperentBg);
            if (i == 0) {
                transperentBg.setPosition(Math.round(Constant.game.config.width / 2), 0);
            } else if (i > 0) {
                transperentBg.setPosition(Constant.game.config.width / 2, this.transperentBgArray[i - 1].y - this.transperentBgArray[i].height * Constant.scaleFactorY);
            }
        }
    };
    MoveTransperentBg() {
        for (let i = 0; i < this.transperentBgArray.length; i++) {
            this.transperentBgArray[i].y += this.scene.upOffest * 0.7;
            if (this.transperentBgArray[i].y >= Constant.game.config.height * Constant.scaleFactorY) {
                this.transperentBgArray[i].x = Constant.game.config.width / 2;
                this.transperentBgArray[i].y = this.transperentBgArray[this.lastIndexOfTransperent].y - this.transperentBgArray[i].height * Constant.scaleFactorY;
                this.lastIndexOfTransperent = i;
            }
        }
    }
}
export default Background;