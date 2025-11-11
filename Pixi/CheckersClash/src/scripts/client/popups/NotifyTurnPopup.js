import { Container, Sprite, TextStyle, Text } from "pixi.js";
import { Constant } from "../Constant.js";

export default class NotifyTurnPopup {
    constructor(screen) {
        this.screen = screen;
        this.turnPopupContainer = null;

        this.createTurnPopup();
        this.hideTurnPopup();
    }

    createTurnPopup() {
        this.turnPopupContainer = new Container();
        Constant.game.app.stage.addChild(this.turnPopupContainer);

        const base = Sprite.from('Level Base');
        base.anchor.set(0.5);
        base.width = 1080;
        base.height = 390;

        const fontStyle = new TextStyle({
            fontFamily: "Fredoka SemiBold", // or your font
            fontSize: 90,
            fill: '#ffffff', // Light yellow to deep gold
            // stroke: '#fff6a4',
            // strokeThickness: 8,
            align: 'center'
        });

        const turnTxt = new Text({
            text: "You Go First",
            style: fontStyle
        });
        turnTxt.anchor.set(0.5);

        this.turnPopupContainer.addChild(base, turnTxt);
    }

    showTurnPopup() {
        this.turnPopupContainer.visible = true;
    }

    hideTurnPopup() {
        this.turnPopupContainer.visible = false;
    }

    destroyTurnPopup() {
        Constant.game.app.stage.removeChild(this.turnPopupContainer);
    }

    resizeTurnPopupContainer() {
        if (this.turnPopupContainer) {
            let scale = Math.min(Constant.game.app.screen.width / 1080, Constant.game.app.screen.height / 1920);
            Constant.newScale = scale;
            this.turnPopupContainer.x = Constant.game.app.screen.width / 2;
            this.turnPopupContainer.y = Constant.game.app.screen.height / 2;
            this.turnPopupContainer.scale.set(Constant.newScale);
        }
    }


}