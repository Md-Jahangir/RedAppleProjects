import Image from "../objectclass/Image";
import { Utils } from "./Utils";

export default class NewJoinPlayer {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.create();
    }
    create() {
        let newScale = Utils.getScale(1920, 1080, window.innerWidth, window.innerHeight);
        this.userBaseNew = new Image(this.scene, window.innerWidth / 2 + this.x * newScale, window.innerHeight / 2 + this.y * newScale, 'user_base');
        this.userBaseNew.SetScale(newScale / 2);
        // console.log(this.scene.playerArray.length, this.scene.newjoinplayerArray.length);
        if ((this.scene.playerArray.length == 2 && this.scene.newjoinplayerArray.length == 0) || (this.scene.playerArray.length == 1 && this.scene.newjoinplayerArray.length == 1)) {
            console.log('bigblind');
        };
        if (this.scene.playerArray.length == 1 && this.scene.newjoinplayerArray.length == 0) {
            console.log('smallblind');
        }

    }
    Resize(newWidth, newHeight, newScale, x, y) {
        this.userBaseNew.SetScale(newScale / 2);
        this.userBaseNew.SetPosition(newWidth / 2 + x * newScale, newHeight / 2 + y * newScale);
    }
}