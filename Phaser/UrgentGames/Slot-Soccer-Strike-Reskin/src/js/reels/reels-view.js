import Reel from "./reel";
import { SelectedResolution } from "../resolution-selector";
import { getScale, getRandomSymbols } from "../utils";
import { Model } from "../model";
import FreeSpinsView from "../ui/free-spins-view";
import GameLogoView from "../ui/game-logo";
import PopupFreeSpins from "../ui/popups/popup-free-spins";
import PopupBonus from "../ui/popups/popup-bonus";

class ReelsView {
    constructor(scene) {
        this.scene = scene;
        this.background = null;
        this.reels = [];
        this.config = this.scene.cache.json.get("resolution-config");
        this.leftX = 0;

        this.reelsCount = 5;
        this.spinDelays = [0, 150, 300, 450, 600];
        this.totalWidth = 0;

        this.isFreeSpinsMode = false;
        this.freeSpinsView = null;
        this.gameLogoView = null;

        this.create();

        this.scene.game.events.on("evtSpinStart", this.onSpinStart, this);
        this.scene.game.events.on("evtSpinStop", this.onSpinStop, this);
        this.scene.game.events.on("evtPaylinesShowingDone", this.showPopups, this);
        this.scene.game.events.on("evtFreeSpinsPopupClosed", this.onFreeSpin, this);
        this.scene.game.events.on("evtBonusPopupClosed", this.showPopups, this);
    };

    create() {
        this.background = this.scene.add.image(0, 0, "reels-bg").setOrigin(0);
        for (let i = 0; i < this.reelsCount; i++) {
            let rndSymbols = getRandomSymbols();
            let delay = this.spinDelays[i];
            let reel = new Reel(this.scene, 0, 0, rndSymbols, delay);
            this.reels.push(reel);
        }
        this.arrange(this.scene.scale.width, this.scene.scale.height);

        this.gameLogoView = new GameLogoView(this.scene);
        this.freeSpinsView = new FreeSpinsView(this.scene);
    };

    arrange(newWidth, newHeight, newScale = 1) {
        this.totalWidth = 0;
        // let startX = newWidth /1.5 ;
        let startX = newWidth / 2 + this.config.reels.offsetX * newScale;
        // let startX = newWidth / 2;
        // let startY = newHeight / 2;
        let startY = newHeight / 2;
        // let startY = newHeight / 2;

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
        this.background.setScale(newScale);
        // this.background.setPosition(this.background.displayWidth/2 + this.config.reels.bg.x * newScale,newHeight/2 - this.background.displayWidth/2 + this.config.reels.bg.y * newScale);
        this.background.setPosition(newWidth / 2 + this.config.reels.bg.x * newScale, newHeight / 2 - this.background.displayWidth / 2 + this.config.reels.bg.y * newScale);
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
        this.reels.forEach((elem) => {
            elem.spin();
        });
    };

    getSymbolPosition(reelIndex, symbolIndex) {
        let reel = this.reels[reelIndex];
        return reel.getSymbolPosition(symbolIndex);
    };

    getSymbol(reelIndex, symbolIndex) {
        let reel = this.reels[reelIndex];
        return reel.getSymbolByIndex(symbolIndex);
    };

    onSpinStop() {
        let grid = Model.getGrid();
        this.reels.forEach((elem, index) => {
            elem.stop();
            let symbols = grid[index];
            elem.setSymbols(symbols);
        });

        this.scene.time.addEvent({
            delay: 650,
            callback: () => {
                this.scene.game.events.emit("evtShowWonPaylines");
            },
            callbackScope: this
        });
    };

    showPopups() {
        let bonus = Model.getBonus();
        if (bonus > 0) {
            let cfg = this.scene.cache.json.get("resolution-config").bonusPopup;
            new PopupBonus(this.scene, cfg, "bonus", bonus).create();
        } else {
            let listOfFreeSpins = Model.getFreeSpinsData();
            if (listOfFreeSpins.length > 0 && !this.isFreeSpinsMode) {
                let cfg = this.scene.cache.json.get("resolution-config").freeSpinsPopup;
                new PopupFreeSpins(this.scene, cfg, "freeSpins", listOfFreeSpins.length).create();
            } else {
                this.onFreeSpin();
            }
        }
    }

    onFreeSpin() {
        let listOfFreeSpins = Model.getFreeSpinsData();
        if (listOfFreeSpins.length > 0) {
            this.gameLogoView.hide();
            this.freeSpinsView.show();
            this.isFreeSpinsMode = true;
            let freeSpinData = listOfFreeSpins.shift();
            this.scene.game.events.emit("evtFreeSpinShow", listOfFreeSpins.length + 1, freeSpinData.multiplier);
            Model.setGrid(freeSpinData.grid);
            Model.setWonPaylines(freeSpinData.wonPaylines);
            this.scene.game.events.emit("evtSpinStart");
            this.scene.time.addEvent({
                delay: 1500,
                callback: () => {
                    this.scene.game.events.emit("evtSpinStop");
                },
                callbackScope: this
            });
        } else {
            this.freeSpinsView.hide();
            this.gameLogoView.show();
            this.isFreeSpinsMode = false;
            this.scene.game.events.emit("evtFreeSpinsDone");
        }
    };
};

export default ReelsView;