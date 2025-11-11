import { Constant } from "../Constant.js";
class Base {
    constructor(scene) {

        this.scene = scene;

    }

    placeImage(Phaser, key, interactive = false, origin = null, posX = 0, posY = 0, scale = Constant.scaleFactor, physics = false) {
        let image;
        if (physics == false) {
            image = Phaser.add.sprite(posX, posY, key);
        } else {
            image = Phaser.physics.add.sprite(posX, posY, key);
        }
        if (scale != null) {
            image.setScale(scale);
        }
        if (interactive) {
            image.setInteractive({ useHandCursor: true });
        }
        if (origin != null) {
            image.setOrigin(origin._oX, origin._oY);
        } else {
            image.setOrigin(0.5, 0.5);
        }
        // if (isNaN(pos)) {
        //     this.aGrid.placeAt(pos.x, pos.y, image);
        // } else {
        //     this.aGrid.placeAtIndex(pos, image);
        // }
        // if (scale != -1) {
        //     Align.scaleToGameW(image, scale, this);
        // }
        return image;
    }
    //
    //place text on the stage and style it
    //
    placeText(Phaser, text, pos, style) {

        let textObj = Phaser.add.text(pos.x, pos.y, text, style);

        //     let textObj = new TextObj({
        //         scene: this,
        //         text: text,
        //         textStyle: textStyle
        //     });
        // if (isNaN(pos)) {
        //     this.aGrid.placeAt(pos.x, pos.y, textObj);
        // } else {
        //     this.aGrid.placeAtIndex(pos, textObj);
        // }
        return textObj;
    }

}


let base = new Base();
export { base as Base };