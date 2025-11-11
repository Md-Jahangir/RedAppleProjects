import { Container, Sprite, TextStyle, Text } from "pixi.js";
import { Constant } from "../Constant.js";

export default class TimeoverPopup {
    constructor(screen) {
        this.screen = screen;
        this.timeoverContainer = null;

        this.createTimeOverPopup();
        this.hideTimeOverPopup();
    }

    createTimeOverPopup() {
        this.timeoverContainer = new Container();
        Constant.game.app.stage.addChild(this.timeoverContainer);

        let base = Sprite.from('Level Base');
        base.anchor.set(0.5);

        const fontStyle = new TextStyle({
            fontFamily: "Fredoka SemiBold", // or your font
            fontSize: 90,
            fill: '#ffffff', // Light yellow to deep gold
            // stroke: '#fff6a4',
            // strokeThickness: 8,
            align: 'center'
        });

        const timeOverTxt = new Text({
            text: "Time's Up!",
            style: fontStyle
        });
        timeOverTxt.anchor.set(0.5);

        this.timeoverContainer.addChild(base, timeOverTxt);

    }

    showTimeOverPopup() {
        this.timeoverContainer.visible = true;
    }

    hideTimeOverPopup() {
        this.timeoverContainer.visible = false;
    }

    destroyTimeOverPopup() {
        Constant.game.app.stage.removeChild(this.timeoverContainer);
    }

    resizeTimeOverContainer() {
        if (this.timeoverContainer) {
            let scale = Math.min(Constant.game.app.screen.width / 1080, Constant.game.app.screen.height / 1920);
            Constant.newScale = scale;
            this.timeoverContainer.x = Constant.game.app.screen.width / 2;
            this.timeoverContainer.y = Constant.game.app.screen.height / 2;
            this.timeoverContainer.scale.set(Constant.newScale);
        }
    }
}
