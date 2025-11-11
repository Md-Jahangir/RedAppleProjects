import { Constant } from "./Constant.js";
import { Align } from "./util/align.js";

class Buttons {
    constructor(scene) {

        this.scene = scene;

        this.prevBtn = null;
        this.nxtBtn = null;
        this.playBtn = null;
        this.backBtn = null;
        this.soundBtn = null;
        this.yesBtn = null;
        this.noBtn = null;
        this.menuBtn = null;
        this.replayBtn = null;

    }

    CreateTutorialButtons() {

        this.prevBtn = this.scene.add.image(0, 0, 'skip').setScale(Constant.scaleFactor).setInteractive({ useHandCursor: true });

        this.nxtBtn = this.scene.add.image(0, 0, 'next_btn').setScale(Constant.scaleFactor).setInteractive({ useHandCursor: true });

        this.scene.aGrid.placeAtIndex(340, this.nxtBtn);
        this.scene.aGrid.placeAtIndex(324, this.prevBtn);

    }

    CreateTitleButtons() {

        this.playBtn = this.scene.add.image(0, 0, 'play_btn').setScale(Constant.scaleFactor).setInteractive({ useHandCursor: true });

        this.scene.aGrid.placeAtIndex(313, this.playBtn);

    }

    CreateGameSceneButtons() {

        this.backBtn = this.scene.add.image(0, 0, 'back_btn').setScale(Constant.scaleFactor).setInteractive({ useHandCursor: true });

        this.soundBtn = this.scene.add.sprite(0, 0, 'sound_btn').setScale(Constant.scaleFactor).setInteractive({ useHandCursor: true });

        this.soundBtn.anims.currentFrame = 0;

        this.scene.aGrid.placeAtIndex(20, this.backBtn);
        this.scene.aGrid.placeAtIndex(36, this.soundBtn);

    }

    CreateQuitPopupButtons() {

        this.yesBtn = this.scene.add.image(0, 0, 'yes_btn').setScale(Constant.scaleFactor).setInteractive({ useHandCursor: true });

        this.noBtn = this.scene.add.image(0, 0, 'no_btn').setScale(Constant.scaleFactor).setInteractive({ useHandCursor: true });

        this.scene.aGrid.placeAtIndex(273, this.yesBtn);
        this.scene.aGrid.placeAtIndex(277, this.noBtn);

    }

    CreateGameoverPopUpButtons() {

        this.menuBtn = this.scene.add.image(0, 0, 'menu_btn').setScale(Constant.scaleFactor).setInteractive({ useHandCursor: true });

        this.replayBtn = this.scene.add.image(0, 0, 'replay_btn').setScale(Constant.scaleFactor).setInteractive({ useHandCursor: true });
        // this.adIcon = this.scene.add.image(0, 0, 'ad_icon').setScale(Constant.scaleFactor);

        this.scene.aGrid.placeAtIndex(273, this.menuBtn);
        this.scene.aGrid.placeAtIndex(277, this.replayBtn);
        // this.adIcon.setPosition(this.replayBtn.x + 135, this.replayBtn.y - 30);

    }
}

export default Buttons;