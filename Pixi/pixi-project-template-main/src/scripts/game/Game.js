import { App } from "../system/App";
import { Scene } from "../system/Scene";
import * as PIXI from "pixi.js";

export class Game extends Scene {
    create() {
        this.createBackground();
        this.createReels();
    }
    createBackground() {
        this.bg = App.sprite("bg");
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
        this.container.addChild(this.bg);
    };

    createReels() {
        this.reel = App.sprite("reel_bg_0");
        // this.reel.width = window.innerWidth;
        // this.reel.height = window.innerHeight;
        this.container.addChild(this.reel);

        // PIXI.Assets.load('assets/symbols/symbol_05.json').then(onAssetsLoaded);
        // PIXI.loader.add('assets/symbols/symbol_05.json')

    };

    onAssetsLoaded(spineboyAsset) {
        console.log("spineboyAsset: ", spineboyAsset);
    }
}
