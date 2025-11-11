class Background {
    constructor(scene, Constant) {
        this.scene = scene;
        this.fog_anim = null;
        this.create(scene, Constant);
    };

    create(scene, Constant) {
        if (Constant.isPortrait) {
            // console.log("Portrait......");
            let background = scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "bg_portrait_game").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

            this.fog_anim = this.scene.add.spine(Constant.game.config.width / 2, Constant.game.config.height / 4, "fog")//.setOrigin(0.5, 0.5); 
            this.fog_anim.play("Fog_Animation");
            this.fog_anim.setVisible(false);


            // let reelFrame = scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "gameplay_frame").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

            let reelFrameBase = scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "gameplay_frame_layer_2").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            let reelFrame = scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "gameplay_frame_layer_1").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
            reelFrame.depth = 2;
        }
        else {
            let background = scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2), "gameplay_bg_blur_game").setOrigin(0.5).setScale(Constant.scaleFactorX, Constant.scaleFactorY);

            this.fog_anim = this.scene.add.spine(Constant.game.config.width / 2, Constant.game.config.height / 2, "fog")//.setOrigin(0.5, 0.5); 
            this.fog_anim.play("Fog_Animation");
            this.fog_anim.setVisible(false);


            // let reelFrame = scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2.28), "gameplay_frame").setOrigin(0.5).setScale(Constant.scaleFactorX * 0.98, Constant.scaleFactorY);

            let reelFrameBase = scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2.28), "gameplay_frame_layer_2").setOrigin(0.5).setScale(Constant.scaleFactorX * 0.98, Constant.scaleFactorY);
            let reelFrame = scene.add.image(Math.round(Constant.game.config.width / 2), Math.round(Constant.game.config.height / 2.28), "gameplay_frame_layer_1").setOrigin(0.5).setScale(Constant.scaleFactorX * 0.98, Constant.scaleFactorY);
            reelFrame.depth = 2;
        }
    }

    CreateFogAnimation() {
        this.fog_anim = this.scene.add.spine(Constant.game.config.width / 2, Constant.game.config.height / 2, "fog")//.setOrigin(0.5, 0.5); 
        this.fog_anim.play("Fog_Animation");
        // this.fog_anim.setVisible(false);
    }
    PlayFogAnimation() {
        // console.log('playing fog animation')
        this.fog_anim.setVisible(true);
        this.fog_anim.play("Fog_Animation");
    }
    StopFogAnimation() {
        this.fog_anim.setVisible(false);
    }
}


export default Background;