import { Constant } from '../Constant.js';
class Symbol {
    constructor(scene, x, y, id, _mask) {
        this.scene = scene;
        this.id = id;
        this.x = x;
        this.y = y;
        this.initialY = null;
        this.usualImg = null;
        this.cross = null;
        this.number = null;
        this.fire = null;
        this.char_Anim = null;
        //--------------------
        this.thunderAnim = null;
        this.scatter = null;
        // this.ten_anim = null;
        // this.A_animation = null;
        // this.barbasAnim = null;
        this.comboAnim = null;
        // this.jSymbolAnim = null;
        this.kSymbolAnim = null;
        this.qSymbolAnim = null;
        //--------------------
        this.winAnim = null;
        this.spinAnim = null;

        this.initialTween = null;
        this.animationTween = null;

        this.mask = _mask;
        this.create();
        this.generateNumber = null;
        // console.log('checkId', id)
        // Constant.game.events.on("evtAfterMultiplier", this.PlayThunderAnimss, this);

    };

    create() {
        // console.log(this.id);
        // console.log('this.Y : ', this.y);
        // this.mask.depth = 5;
        this.usualImg = this.scene.add.image(this.x, this.y, "symbol_" + this.id).setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        // console.log('this.x : ', this.x);
        this.usualImg.setMask(this.mask);
        // this.usualImg.setVisible(false);
        this.fire = this.scene.add.sprite(this.x, Constant.game.config.height / 2, "fireSpritesheet").setOrigin(0.5, 0.5).setScale(1);//Constant.scaleFactorX, Constant.scaleFactorY);
        this.fire.depth = 1;
        // this.fire.setMask(this.mask);
        this.fire.setVisible(false);
        // console.log('this.usualImg : ', this.usualImg);



        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.scatter = this.scene.add.spine(this.usualImg.x - Constant.game.config.height / 24, this.usualImg.y, 'scatter').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
                this.scatter.play("Scatter_Animation");
                this.scatter.setVisible(false);
            }
            else {
                this.scatter = this.scene.add.spine(this.usualImg.x - Constant.game.config.height / 10.2, this.usualImg.y, 'scatter').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
                this.scatter.play("Scatter_Animation");
                this.scatter.setVisible(false);
            }
        }
        else {
            this.scatter = this.scene.add.spine(this.usualImg.x - Constant.game.config.height / 13, this.usualImg.y, 'scatter').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            this.scatter.play("Scatter_Animation");
            // console.log('ScatterAnimation')
            this.scatter.setVisible(false);
        }
        //------------------------------------------------------10_anim---------------------------------------------------------------------------
        // this.ten_anim = this.scene.add.spine(this.x, this.y + Constant.game.config.height / 3.01, '10_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        // this.ten_anim.play("10_Symbol_Animation");
        // this.ten_anim.setVisible(false);
        //------------------------------------------------------A_anim---------------------------------------------------------------------------

        // this.A_animation = this.scene.add.spine(this.x, this.y + Constant.game.config.height / 3.01, 'A_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        // this.A_animation.play("A_Symbol_Animation");
        // this.A_animation.setVisible(false);
        //----------------------------------------------------barbas----------------------------------------------------------------------------
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.barbasAnim = this.scene.add.spine(this.x - Constant.game.config.height / 21, this.y + Constant.game.config.height / 3.01, 'barbas_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            } else {
                this.barbasAnim = this.scene.add.spine(this.x - Constant.game.config.height / 11, this.y + Constant.game.config.height / 3.01, 'barbas_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            }
        } else {
            this.barbasAnim = this.scene.add.spine(this.x - Constant.game.config.height / 12.4, this.y + Constant.game.config.height / 3.01, 'barbas_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        }

        this.barbasAnim.play("Barbas_Animation_Scaled");
        this.barbasAnim.setVisible(false);
        //--------------------------------------------------------j_anim----------------------------------------------------------------------------
        // this.jSymbolAnim = this.scene.add.spine(this.x, this.y + Constant.game.config.height / 3.01, 'j_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        // this.jSymbolAnim.play("J_Symbol_Animation");
        // this.jSymbolAnim.setVisible(false);
        // //----------------------------------------------------------k_anim--------------------------------------------------------------------------------
        // this.kSymbolAnim = this.scene.add.spine(this.x, this.y + Constant.game.config.height / 3.01, 'k_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        // this.kSymbolAnim.play("K_Symbol_Animation");
        // this.kSymbolAnim.setVisible(false);
        // //-----------------------------------------------------------q_anim-----------------------------------------------------------------------------------
        // this.qSymbolAnim = this.scene.add.spine(this.x, this.y + Constant.game.config.height / 3.01, 'q_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        // this.qSymbolAnim.play("Q_Symbol_Animation");
        // this.qSymbolAnim.setVisible(false);
        //---------------------------------------------------------------------------------------------------------------------------------------------------- 


        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.morenaAnim = this.scene.add.spine(this.x - Constant.game.config.height / 10.8, this.y, 'morena_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            }
            else {
                this.morenaAnim = this.scene.add.spine(this.x - Constant.game.config.height / 4.6, this.y + Constant.game.config.height / 3.01, 'morena_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            }
        }
        else {
            this.morenaAnim = this.scene.add.spine(this.x - Constant.game.config.height / 6.2, this.y + Constant.game.config.height / 3.01, 'morena_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        }
        this.morenaAnim.play("Morena_Animation_Scaled");
        this.morenaAnim.setVisible(false);
        this.morenaAnim.depth = 1;

        this.roughBoyAnim = this.scene.add.spine(this.x, this.y + Constant.game.config.height / 3.01, 'roughboy_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.roughBoyAnim.play("roughboy_animation");
        this.roughBoyAnim.setVisible(false);
        this.roughBoyAnim.depth = 1;

        this.peliRojaAnim = this.scene.add.spine(this.x, this.y + Constant.game.config.height / 3.01, 'peliroja_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.peliRojaAnim.play("Peliroja_Animation_Scaled");
        this.peliRojaAnim.setVisible(false);
        this.peliRojaAnim.depth = 1;
        // this.slowReelAnim = this.scene.add.spine(this.x, this.y + Constant.game.config.height / 3.01, 'slowreel_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        // this.slowReelAnim.play("Morena_Animation");
        // this.slowReelAnim.setVisible(false);



        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.comboAnim = this.scene.add.spine(this.usualImg.x - Constant.game.config.height / 24, this.usualImg.y, 'allinone').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
                this.comboAnim.setVisible(false);
            }
            else {
                this.comboAnim = this.scene.add.spine(this.usualImg.x - Constant.game.config.height / 10.5, this.usualImg.y, 'allinone').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
                this.comboAnim.setVisible(false);
            }
        }
        else {
            this.comboAnim = this.scene.add.spine(this.usualImg.x - Constant.game.config.height / 12.41, this.usualImg.y, 'allinone').setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            this.comboAnim.setVisible(false);
        }
        //------------------------------------------------------

        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.cross = this.scene.add.sprite(this.x - Constant.game.config.width / 80, this.y + this.usualImg.displayHeight / 1.3, "numbersSpritesheet").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX * 0.6, Constant.scaleFactorY * 0.6);

                this.number = this.scene.add.sprite(this.x + Constant.game.config.width / 65, this.y + this.usualImg.displayHeight / 1.3, "numbersSpritesheet").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX * 0.6, Constant.scaleFactorY * 0.6);

                // this.thunderAnim = this.scene.add.spine(this.x - Constant.game.config.width / 19.2, this.y + (-Constant.game.config.width / 4 * Constant.scaleFactorX), 'thunder_anim').setScale(Constant.scaleFactorX * 0.8, Constant.scaleFactorY * 0.8);
            }
            else {
                this.cross = this.scene.add.sprite(this.x - Constant.game.config.width / 80, this.y + this.usualImg.displayHeight / 1.3, "numbersSpritesheet").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX * 0.6, Constant.scaleFactorY * 0.6);

                this.number = this.scene.add.sprite(this.x + Constant.game.config.width / 65, this.y + this.usualImg.displayHeight / 1.3, "numbersSpritesheet").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX * 0.6, Constant.scaleFactorY * 0.6);

                // this.thunderAnim = this.scene.add.spine(this.x - Constant.game.config.width / 19.2, this.y + (-Constant.game.config.width / 6 * Constant.scaleFactorX), 'thunder_anim').setScale(Constant.scaleFactorX * 0.8, Constant.scaleFactorY * 0.8);

            }
        }
        else {
            this.cross = this.scene.add.sprite(this.x - Constant.game.config.width / 65, this.y + this.usualImg.displayHeight / 1.3, "numbersSpritesheet").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX * 0.6, Constant.scaleFactorY * 0.6);

            this.number = this.scene.add.sprite(this.x + Constant.game.config.width / 80, this.y + this.usualImg.displayHeight / 1.3, "numbersSpritesheet").setOrigin(0.5, 0.5).setScale(Constant.scaleFactorX * 0.6, Constant.scaleFactorY * 0.6);

            // this.thunderAnim = this.scene.add.spine(this.x - Constant.game.config.width / 19.2, this.y + (-Constant.game.config.width / 9 * Constant.scaleFactorX), 'thunder_anim').setScale(Constant.scaleFactorX * 0.8, Constant.scaleFactorY * 0.8);
        }

        //--------------------------------------------------------------------------------------------------------- 
        this.cross.depth = 1;
        this.cross.setMask(this.mask);
        this.cross.setVisible(false);

        this.number.setFrame(2);
        this.number.depth = 1;
        this.number.setMask(this.mask);
        this.number.setVisible(false);


        //  console.log("Thundery" + this.thunderAnim.y)
        // this.blurImg.setVisible(false);
        // this.winAnim = this.scene.add.sprite(x, y, "animation_symbol_" + this.id).setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        // this.winAnim.setVisible(false);
    };
    setY(y) {
        // console.log("y----------------", Constant.game.config.width);
        // console.log('y=================>', y)
        this.y = y;
        this.usualImg.y = y;
        // this.cross.y = this.y + (Constant.game.config.width / 40 * Constant.scaleFactorX);
        // this.number.y = this.y + (Constant.game.config.width / 40 * Constant.scaleFactorX);  // dektop-30//portrit - 13//landscape - 16
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.cross.y = this.y + (Constant.game.config.width / 16 * Constant.scaleFactorX);
                this.number.y = this.y + (Constant.game.config.width / 16 * Constant.scaleFactorX);
                this.thunderAnim = this.scene.add.spine(this.x - Constant.game.config.width / 13.2, this.y + (-Constant.game.config.width / 3.9 * Constant.scaleFactorX), 'thunder_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY).setDepth(2);
            }
            else {
                this.cross.y = this.y + (Constant.game.config.width / 21 * Constant.scaleFactorX);
                this.number.y = this.y + (Constant.game.config.width / 21 * Constant.scaleFactorX);
                this.thunderAnim = this.scene.add.spine(this.x - Constant.game.config.width / 19.2, this.y + (-Constant.game.config.width / 5.3 * Constant.scaleFactorX), 'thunder_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY).setDepth(2);
            }
        }
        else {
            this.cross.y = this.y + (Constant.game.config.width / 30 * Constant.scaleFactorX);
            this.number.y = this.y + (Constant.game.config.width / 30 * Constant.scaleFactorX);
            this.thunderAnim = this.scene.add.spine(this.x - Constant.game.config.width / 19.2, this.y + (-Constant.game.config.width / 7.4 * Constant.scaleFactorX), 'thunder_anim').setScale(Constant.scaleFactorX, Constant.scaleFactorY).setDepth(2);
        }



        // this.y = y;
        // this.usualImg.y = y;
        // this.cross.y = this.y + (Constant.game.config.width / 40 * Constant.scaleFactorX);
        // this.number.y = this.y + (Constant.game.config.width / 40 * Constant.scaleFactorX);
        // this.fire.y = this.y + (Constant.game.config.width / 40 * Constant.scaleFactorX);
        // this.thunderAnim = this.scene.add.spine(this.x - Constant.game.config.width / 19.2, this.y + (-Constant.game.config.width / 8.5 * Constant.scaleFactorX), 'thunder_anim').setScale(Constant.scaleFactorX * 0.9, Constant.scaleFactorY * 0.9);
        // this.cross.y = this.y + (Constant.game.config.width / 40 * Constant.scaleFactorX);
        // this.number.y = this.y + (Constant.game.config.width / 40 * Constant.scaleFactorX);
        // this.fire.y = this.y + (Constant.game.config.width / 40 * Constant.scaleFactorX);
        // this.thunderAnim = this.scene.add.spine(this.x - Constant.game.config.width / 19.2, this.y + (-Constant.game.config.width / 9 * Constant.scaleFactorX), 'thunder_anim').setScale(Constant.scaleFactorX * 0.8, Constant.scaleFactorY * 0.8);
        // this.thunderAnim.play("Thunder_Animation",true);
        this.thunderAnim.depth = 2;
        this.thunderAnim.setVisible(false);
        // this.char_Anim.y = this.y + (Constant.game.config.width / 40 * Constant.scaleFactorX);
        // console.log(Constant.game.config.width/8 + "Constant"+ Constant.scaleFactorX)
        // this.thunderAnim.y =this.y + (-Constant.game.config.width / 7 * Constant.scaleFactorX);
        // console.log(this.y)
        // console.log("Thundery" + this.thunderAnim.y)

        this.fire.y = this.y //+ (Constant.game.config.width / 40 * Constant.scaleFactorX);

        this.peliRojaAnim.y = this.y + (Constant.game.config.width / 40 * Constant.scaleFactorX);
        this.barbasAnim.y = this.y - (Constant.game.config.width / 40 * Constant.scaleFactorX);
        this.morenaAnim.y = this.y + (Constant.game.config.width / 40 * Constant.scaleFactorX);
        // this.slowReelAnim.y = this.y ;
        //---------------------scatter--------------------------
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.scatter.y = this.y - (Constant.game.config.width / 7.3 * Constant.scaleFactorX);
            }
            else {
                this.scatter.y = this.y - (Constant.game.config.width / 11 * Constant.scaleFactorX);
            }
        }
        else {
            this.scatter.y = this.y - (Constant.game.config.width / 16.6 * Constant.scaleFactorX);
        }

        ///////for all symbols////////////////////
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.comboAnim.y = this.y - (Constant.game.config.width / 5.6 * Constant.scaleFactorX);
            }
            else {
                this.comboAnim.y = this.y - (Constant.game.config.width / 11 * Constant.scaleFactorX);
            }
        }
        else {
            this.comboAnim.y = this.y - (Constant.game.config.width / 18 * Constant.scaleFactorX);
        }
        // this.jSymbolAnim.y = this.y + (Constant.game.config.width / 40 * Constant.scaleFactorX);
        // this.kSymbolAnim.y = this.y + (Constant.game.config.width / 40 * Constant.scaleFactorX);
        // this.qSymbolAnim.y = this.y + (Constant.game.config.width / 40 * Constant.scaleFactorX);
        // this.thunderAnim.y = 128.5
        // console.log("Thundery" + this.thunderAnim.y)
    }
    setInitailY(y) {
        this.initialY = y;
    }
    getId() {
        return this.id;
    };

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
        // console.log("playSpin....");
        // this.usualImg.setVisible(false);
        // this.winAnim.setVisible(false);

        this.cross.setVisible(false);
        this.fire.setVisible(false);
        this.number.setVisible(false);
        // this.thunderAnim.setVisible(false);
        // this.spinAnim.setVisible(true);
        // this.spinAnim.play("symbol_spin", false, _startFrame);

    };

    stopSpin() {
        // this.fire.stop();

        // this.spinAnim.anims.stop();
        // this.spinAnim.setVisible(false);
        // this.winAnim.setVisible(false);
        // this.usualImg.setVisible(true);
    };

    setSymbol(id) {
        this.id = id;
        // console.log("this.id  ", this.id);
        this.usualImg.setTexture("symbol_" + this.id);

    };
    setBlur() {
        this.usualImg.setTexture("Blured_" + this.id);
    }
    playWin() {
        // console.log("playwin")
        // this.usualImg.setVisible(false);
        // this.spinAnim.setVisible(false);
        // this.winAnim.setVisible(true);
        // this.winAnim.play("anim_symbol_" + this.id, true);
        this.generateNumber = Math.floor(Math.random() * (9 - 1) + 1);
        this.number.setFrame(this.generateNumber);
        this.cross.setVisible(false);
        // this.thunderAnim.setVisible(true);
        this.number.setVisible(false);

        // this.thunderAnim.play("Thunder_Animation", false);

    }
    PlayThunderAnim() {
        // console.log("PLayThunderAnim")
        this.fire.setVisible(true);
        this.cross.setVisible(true);
        this.number.setVisible(true);
        // console.log(this.number.visible)
        this.fire.play("fire_animtion", false, 0);


    }
    PlayThunderAnimss() {
        // for( let i = 0; i < _getId.length; i++){
        //     _getId[i].play("Thunder_Animation",false);
        // }
        this.thunderAnim.setVisible(true);
        this.thunderAnim.play("Thunder_Animation", false);
        this.thunderAnim.once('complete', this.onThunderAnimComplete, this);
    }
    // Function to handle animation completion
    onThunderAnimComplete() {
        // console.log("Thunder animation complete!");
        // Set visibility to false or perform any other actions
        this.thunderAnim.setVisible(false);
    }
    PlayLastThunderAnim() {
        // console.log("PlayLastthunder")
        // Constant.game.events.emit("evtPaylinesShowingDone");
    }
    PlayCharacterAnim() {
        // this.char_Anim.y = this.usualImg.y - 5;
        // this.char_Anim.setVisible(true);
        // this.char_Anim.play("char_animtion", false, 0);
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                console.log('when portrait-----')
                this.barbasAnim.y = this.usualImg.y - (Constant.game.config.height / 18.2);
            } else {
                this.barbasAnim.y = this.usualImg.y - (Constant.game.config.height / 10.1);
            }
        } else {
            this.barbasAnim.y = this.usualImg.y - (Constant.game.config.height / 10.1);
        }

        // this.barbasAnim.y = this.usualImg.y - (Constant.game.config.height / 10.1);
        this.barbasAnim.setVisible(true);
        this.barbasAnim.play("Barbas_Animation_Scaled", true);
    }
    StopCharacterAnim() {
        this.char_Anim.stop();
        this.char_Anim.setVisible(false);
    }
    PlayMorenaAnim() {
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.morenaAnim.y = this.usualImg.y - (Constant.game.config.height / 9);
            } else {
                this.morenaAnim.y = this.usualImg.y - (Constant.game.config.height / 5.15);
            }
        } else {
            this.morenaAnim.y = this.usualImg.y - (Constant.game.config.height / 5.15);
        }
        this.morenaAnim.setVisible(true);
        this.morenaAnim.play("Morena_Animation_Scaled", true);
    }
    //    PlaySlowReelAnim(){
    //     // this.slowReelAnim.y = this.usualImg.y;
    //     this.slowReelAnim.setVisible(true);
    //     this.slowReelAnim.play("Slowreel_", true);
    //    }
    PLayRoughBoyAnim() {
        this.roughBoyAnim.y = this.usualImg.y;
        this.roughBoyAnim.setVisible(true);
        this.roughBoyAnim.play("Roughboy_Animation_Scaled", true);
    }
    PlayPeliRojaAnim() {
        this.peliRojaAnim.y = this.usualImg.y + 5;
        this.peliRojaAnim.setVisible(true);
        this.peliRojaAnim.play("Peliroja_Animation_Scaled", true);
    }
    PlayScatterSpineAnim() {


        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.scatter.y = this.usualImg.y - 100;
            }
            else {
                this.scatter.y = this.usualImg.y - 40;
            }
        }
        else {
            this.scatter.y = this.usualImg.y - 110;
        }
        this.scatter.setVisible(true);
        this.scatter.play("Scatter_Animation", true);
    }
    StopScatterSpineAnim() {
        this.scatter.stop();
        this.scatter.setVisible(false);
    }
    // PlayTenSpriteAnim() {
    //     this.ten_anim.y = this.usualImg.y;
    //     this.ten_anim.setVisible(true);
    //     this.ten_anim.play("10_Symbol_Animation", true);
    // }
    // PlayASpineAnim() {
    //     this.A_animation.y = this.usualImg.y;
    //     this.A_animation.setVisible(true);
    //     this.A_animation.play("A_Symbol_Animation", true);
    // }
    // PlayJSymbolAnimation() {
    //     this.jSymbolAnim.y = this.usualImg.y;
    //     this.jSymbolAnim.setVisible(true);
    //     this.jSymbolAnim.play("J_Symbol_Animation", true);
    // }
    // PlayKSymbolAnimation() {
    //     this.kSymbolAnim.y = this.usualImg.y;
    //     this.kSymbolAnim.setVisible(true);
    //     this.kSymbolAnim.play("K_Symbol_Animation", true);
    // }
    // PlayQSymbolAnimation() {
    //     this.qSymbolAnim.y = this.usualImg.y;
    //     this.qSymbolAnim.setVisible(true);
    //     this.qSymbolAnim.play("Q_Symbol_Animation", true);
    // }
    PlayTenComboAnim() {

        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.comboAnim.y = this.usualImg.y - 100;
            }
            else {
                this.comboAnim.y = this.usualImg.y - 40;
            }
        }
        else {
            this.comboAnim.y = this.usualImg.y - 110;
        }
        this.comboAnim.setVisible(true);
        this.comboAnim.play('Symbol_10_Animation', true)
    }
    PlayAComboAnim() {
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.comboAnim.y = this.usualImg.y - 100;
            }
            else {
                this.comboAnim.y = this.usualImg.y - 40;
            }
        }
        else {
            this.comboAnim.y = this.usualImg.y - 110;
        }
        this.comboAnim.setVisible(true);
        this.comboAnim.play('Symbol_A_Animation', true)
    }
    PlayJComboWin() {
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.comboAnim.y = this.usualImg.y - 100;
            }
            else {
                this.comboAnim.y = this.usualImg.y - 40;
            }
        }
        else {
            this.comboAnim.y = this.usualImg.y - 110;
        }
        this.comboAnim.setVisible(true);
        this.comboAnim.play('Symbol_J_Animation', true)
    }
    PlayKComboWin() {
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.comboAnim.y = this.usualImg.y - 100;
            }
            else {
                this.comboAnim.y = this.usualImg.y - 40;
            }
        }
        else {
            this.comboAnim.y = this.usualImg.y - 110;
        }
        this.comboAnim.setVisible(true);
        this.comboAnim.play('Symbol_K_Animation', true)
    }
    PlayQComboWin() {
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.comboAnim.y = this.usualImg.y - 100;
            }
            else {
                this.comboAnim.y = this.usualImg.y - 40;
            }
        }
        else {
            this.comboAnim.y = this.usualImg.y - 110;
        }
        this.comboAnim.setVisible(true);
        this.comboAnim.play('Symbol_Q_Animation', true)
    }
    PlayKNineComboWin() {
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                this.comboAnim.y = this.usualImg.y - 100;
            }
            else {
                this.comboAnim.y = this.usualImg.y - 40;
            }
        }
        else {
            this.comboAnim.y = this.usualImg.y - 110;
        }
        this.comboAnim.setVisible(true);
        this.comboAnim.play('Symbol_9_Animation', true)
    }
    // StopScatterSpineAnim() {
    //     this.ten_anim.stop();
    //     this.ten_anim.setVisible(false);
    //     this.ten_anim.play("A_Symbol_Animation", true);
    // }
    stopWin() {
        // console.log("stopWin ");
        this.fire.stop();
        // this.thunderAnim.setEmptyAnimation(0)
        this.cross.setVisible(false);

        this.fire.setVisible(false);
        this.thunderAnim.setVisible(false);
        this.number.setVisible(false);

        // this.char_Anim.stop();
        // this.char_Anim.setVisible(false);

        this.scatter.play("SCATTERANIMATION", false);
        this.scatter.setVisible(false);

        // this.ten_anim.play("10_Symbol_Animation", false);
        // this.ten_anim.setVisible(false);

        // this.A_animation.play("A_Symbol_Animation", false);
        // this.A_animation.setVisible(false);

        this.barbasAnim.play('Barbas_Animation_Scaled', false);
        this.barbasAnim.setVisible(false);

        this.morenaAnim.play('Morena_Animation_Scaled', false);
        this.morenaAnim.setVisible(false);

        this.roughBoyAnim.play('Roughboy_Animation_Scaled', false);
        this.roughBoyAnim.setVisible(false);

        this.peliRojaAnim.play('Peliroja_Animation_Scaled', false);
        this.peliRojaAnim.setVisible(false);
        // this.slowReelAnim.play('Slowreel_',false);
        // this.slowReelAnim.setVisible(false);
        // this.jSymbolAnim.play('J_Symbol_Animation', false);
        // this.jSymbolAnim.setVisible(false);

        // this.kSymbolAnim.play('K_Symbol_Animation', false);
        // this.kSymbolAnim.setVisible(false);

        // this.qSymbolAnim.play('Q_Symbol_Animation', false);
        // this.qSymbolAnim.setVisible(false);

        //---------------------------------- 
        this.comboAnim.play('Symbol_10_Animation', false);
        this.comboAnim.setVisible(false);
        //----------------------------------

        // this.winAnim.anims.stop();
        // this.usualImg.setVisible(true);
        // this.spinAnim.setVisible(false);
        // this.winAnim.setVisible(false);
    }



}

export default Symbol;