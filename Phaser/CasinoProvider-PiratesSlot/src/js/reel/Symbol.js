import { Constant } from '../Constant.js';
class Symbol {
    constructor(scene, x, y, id, _mask) {
        this.scene = scene;
        this.id = id;
        this.x = x;
        this.y = y;
        this.initialY = null;
        this.usualImg = null;
        this.mask = _mask;
        this.config = this.scene.cache.json.get("game_config").symbol;
        this.animsType = "";
        this.create();
        Constant.game.events.on("evtSpinStart", this.StopSpine, this);
    };

    create() {
        this.usualImg = this.scene.add.image(this.x, this.y, "symbol_" + this.id).setOrigin(0, 0).setAlpha(1);
        this.usualImg.setMask(this.mask);
        this.symbolSpine = this.scene.add.spine(this.x + 83, this.y + 111, "spine_a").setVisible(false);
        this.symbolSpine.displayOriginX = 0;
        this.symbolSpine.displayOriginY = 0;
        this.symbolSpine.label = 'spine_a';
        this.paylineSpine = this.scene.add.spine(this.x + 80, this.y + 110, "spine_payline").setVisible(false);

    };

    setInitialY(y) {
        this.initialY = y;
    }
    setFinalPosY(y) {
        this.y = y;
        this.usualImg.y = y;
    }
    setId(id) {
        this.id = id;
    };
    getId() {
        return this.id;
    };
    getSymbolIndex() {
        return this.symbolIndex;
    }

    getWidth() {
        return this.usualImg.displayWidth;
    };

    getHeight() {
        return this.usualImg.displayHeight;
    };

    getPosition() {
        return this.usualImg.getCenter();
    };

    playSpin(_startFrame) {
        this.symbolSpine.setVisible(false);
    };

    stopSpin() {
    };

    setSymbol(id, symbolIndex) {
        this.id = id;
        this.usualImg.setTexture("symbol_" + this.id);
        this.usualImg.id = this.id;
    };
    getSymbolIndex() {
        return this.symbolIndex;
    }
    UpdateSpine(id) {
        this.id = id;
        let skeletonKey = `spine_${this.id}`;
        this.symbolSpine.setSkeleton(skeletonKey);
    }

    playWin(id, x, y, animtype, symbolType) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.animsType = animtype;
        // if (this.y > -500 && this.y < 80) {
        let skeletonKey = `spine_${this.id}`;
        this.symbolSpine.setSkeleton(skeletonKey);
        this.symbolSpine.setVisible(true);
        if (this.animsType == "animate") {
            this.symbolSpine.play('payline1', false);
            this.symbolSpine.on('complete', () => {
                this.symbolSpine.setVisible(false);
            })
        }
        else {
            if (symbolType == 'high_symbol' && (this.id != 'hero' || this.id != 'heroine' || this.id != 'villain')) {
                this.symbolSpine.play('payline2', false);
                this.symbolSpine.on('complete', () => {
                    this.symbolSpine.setVisible(false);
                })
            } else {
                this.symbolSpine.play('payline3', false);
                // this.symbolSpine.play('payline1', false);
                this.symbolSpine.on('complete', () => {
                    this.symbolSpine.setVisible(false);
                })
            }

        }
        // }
    }
    PlayPaylineSpines() {
        // this.paylineSpine.setVisible(true);
        // this.paylineSpine.play('animation', false);
    }

    StopSpinesForcefully() {
        this.symbolSpine.setVisible(false);
        this.symbolSpine.play('animation', false);
    }

    StopSpine() {
        this.symbolSpine.setVisible(false);
        this.symbolSpine.play('payline1', false);
    }





}

export default Symbol;