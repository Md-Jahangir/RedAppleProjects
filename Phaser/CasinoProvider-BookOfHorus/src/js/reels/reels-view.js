import Reel from "./reel";
import { SelectedResolution } from "../resolution-selector";
import { getScale, getRandomSymbols } from "../utils";
import { Model } from "../model";
import FreeSpinsView from "../ui/free-spins-view";
import GameLogoView from "../ui/game-logo";

import PopupBonus from "../ui/popups/popup-bonus";

class ReelsView {
    constructor(scene) {
        this.scene = scene;
        // this.background = null;
        this.reels = [];
        this.config = this.scene.cache.json.get("resolution-config");
        this.leftX = 0;

        this.reelsCount = 5;
        this.spinDelays = [400, 550, 700, 800, 850];
        this.totalWidth = 0;


        this.freeSpinsView = null;
        this.gameLogoView = null;
        this.spineArray = [];
        this.popupFreeSpin = null;
        this.create();

        this.scene.game.events.on("evtSpinStart", this.onSpinStart, this);
        this.scene.game.events.on("evtSpinStop", this.onSpinStop, this);

    };

    create() {
        this.gameLogoView = new GameLogoView(this.scene);

        for (let i = 0; i < this.reelsCount; i++) {
            let rndSymbols = getRandomSymbols();
            let delay = this.spinDelays[i];
            let reel = new Reel(this.scene, 0, 0, rndSymbols, delay, i);
            this.reels.push(reel);
        }
        this.arrange(this.scene.scale.width, this.scene.scale.height);

        this.freeSpinsView = new FreeSpinsView(this.scene);
        // this.freeSpinsView.show();
        // let listOfFreeSpins = Model.getFreeSpinsData();
        // let cfg = this.scene.cache.json.get("resolution-config").freeSpinsPopup;
        // this.popupFreeSpin = new PopupFreeSpins(this.scene, cfg, "freeSpins", listOfFreeSpins.length).create();
    };

    arrange(newWidth, newHeight, newScale = 1) {
        this.totalWidth = 0;
        let startX = newWidth / 2;
        let startY = newHeight / 2;

        this.reels.forEach((elem) => {
            let reelHeight = elem.getHeight();
            let reelWidth = elem.getWidth();
            elem.setPosition(startX + this.totalWidth, startY - reelHeight / 2 - this.config.reels.offsetY * newScale);
            this.totalWidth += (reelWidth + this.config.reels.distance * newScale);
        });

        this.totalWidth -= this.config.reels.distance * newScale;
        let centerOffset = this.totalWidth / 2;
        this.leftX = startX - centerOffset;

        this.reels.forEach((elem) => {
            let pos = elem.getPosition();
            elem.setPosition(pos.x - centerOffset, pos.y);
        });
    };

    resize(newWidth, newHeight) {
        let newScale = getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
        this.reels.forEach((elem) => {
            elem.setScale(newScale);
        });
        this.arrange(newWidth, newHeight, newScale);

        this.gameLogoView.resize(newWidth, newScale, this.getY());
        this.freeSpinsView.resize(newWidth, newScale, this.getX(), this.getY(), this.getWidth());
    };

    getWidth() {
        return this.totalWidth;
    };

    getHeight() {
        return this.reels[0].getHeight();
    }

    getX() {
        return this.leftX;
    };

    getY() {
        if (this.reels.length) {
            return this.reels[0].getPosition().y;
        }
        return 0;
    };

    onSpinStart() {
        let i = 0

        // this.scene.game.events.emit("evtUpdateWinAmount", '');
        this.reels.forEach((elem, index) => {
            setTimeout(() => {
                elem.ResumeAnimation(this.spinDelays[index]);
            }, (this.spinDelays[index]) / 2);
            i += 1;
        });
    };

    getSymbolPosition(reelIndex, symbolIndex) {
        let reel = this.reels[reelIndex];
        return reel.getSymbolPosition(symbolIndex);
    };

    getSymbol(reelIndex, symbolIndex) {
        let reel = this.reels[reelIndex];
        return reel.getSymbolByIndex(reelIndex, symbolIndex);
    };

    onSpinStop() {
        this.reels.forEach((elem, index) => {
            elem.StopAnimation();
        });

    };

};

export default ReelsView;