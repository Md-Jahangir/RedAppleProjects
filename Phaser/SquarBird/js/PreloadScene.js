export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
        this.progressBase = null;
        this.progressLine = null;
        this.fonts = {
            "PoetsenOne-Regular": null,
        }
    }
    preload() {
        this.load.setPath('assets/images/');
        this.load.image('bg', 'BG.png');
        this.load.image('bird', 'Character.png');
        this.load.image('effects', 'Effects.png');
        this.load.image('ice_cube', 'Ice.png');
        this.load.image('rocks', 'Rocks.png');
        this.load.image('title', 'Title.png')
        this.load.image('progressLine', 'Loading_bar.png');
        this.load.image('progressBase', 'Loading_bar_02.png');
    }
    create() {
        let bg = this.add.image(game.config.width / 2, game.config.height / 2, 'bg');
        let platform = this.add.image(game.config.width / 2, game.config.height / 1.165, 'rocks');
        let iceCube = this.add.image(game.config.width / 1.7, game.config.height / 1.361, 'ice_cube');
        let effects = this.add.image(0, 0, 'effects');
        effects.copyPosition(iceCube);
        effects.x -= 210;
        effects.y -= 47;
        let title = this.add.image(game.config.width / 2.02, game.config.height / 3.77, 'title');
        let bird = this.add.image(game.config.width / 1.99, game.config.height / 1.8, 'bird');
        this.progressBase = this.add.image(Math.round(game.config.width / 2), Math.round(game.config.height / 1.08), "progressBase").setOrigin(0.5, 0.5) //.setScale(1 * scaleFactorX, 1 * scaleFactorY);
        this.progressLine = this.add.image(Math.round(game.config.width / 2), Math.round(game.config.height / 1.08), "progressLine").setOrigin(0.5, 0.5) //.setScale(1.4 * scaleFactorX, 1 * scaleFactorY);
        this.progressLine.setCrop(0, 0, 0, this.progressLine.height);
        // this.LoadAssets();
        this.LoadFonts();
    }
    LoadFonts() {
        let propNames = Object.getOwnPropertyNames(this.fonts);
        propNames.forEach((fontName, index) => {
            console.log("Here");
            let isLast = index >= propNames.length - 1;
            console.log("Here");
            this.fonts[fontName] = new FontFaceObserver(fontName);
            this.fonts[fontName].load().then(this.FontLoadSuccess.bind(this, fontName, isLast), this.FontLoadError.bind(this, fontName));
        });
    };

    FontLoadSuccess(fontName, isLast) {
        if (isLast) {
            console.log('this.load')
            this.LoadAssets();
        }
    };
    FontLoadError(fontName) { console.log('error------') };

    LoadAssets() {
        this.load.on('progress', this.LoadProgress, this);
        this.load.on('complete', this.OnComplete, { scene: this.scene });
        this.load.setPath('assets/images/');
        this.load.image('title', 'Title_art.png');
        this.load.image('playButton', 'Play_button.png');
        this.load.image('homeButton', 'Home_button.png');
        this.load.image('settingsButton', 'Settings_button.png');
        this.load.image('achievementButton', 'Achievement_button.png');
        this.load.image('continueButton', 'Continue_button.png');
        this.load.image('backButton', 'Back_to_menu_button.png');
        this.load.image('pauseButton', 'Pause_button.png');
        this.load.image('tutorial_bg', 'Tutorial_bg.jpg');
        this.load.image('game_bg', 'GameBG.jpg');
        this.load.image('overlay', 'Overlay_box.png');
        this.load.image('instruction_box', 'Instruction_box.png');
        this.load.image('right_corner_top', '06_Right_corner_top.png');
        this.load.image('left_corner_top', '09_Left_corner_top.png');
        this.load.image('right_side', '04_Right_side.png');
        this.load.image('left_side', '03_Left_side.png');
        this.load.image('left_corner_small', '11_Left_corner_small.png');
        this.load.image('top', '01_Top.png')
        this.load.image('center', '05_Center.png');
        this.load.image('bottomFloor_One', 'Bottom_floor_01.png');
        this.load.image('bottomFloor_Two', 'Bottom_floor_02.png');
        this.load.image('bottomFloor_Three', 'Bottom_floor_03.png');
        this.load.image('bottomFloor_Four', 'Bottom_floor_04.png');
        this.load.image('topFloor_One', 'Upper_floor_01.png');
        this.load.image('topFloor_Two', 'Upper_floor_02.png');
        this.load.image('topFloor_Three', 'Upper_floor_03.png');
        this.load.image('topFloor_Four', 'Upper_floor_04.png');
        this.load.image('obstacle_One', 'Obstracle_01.png');
        this.load.image('obstacle_Two', 'Obstracle_02.png');
        this.load.image('obstacle_Three', 'Obstracle_03.png');
        this.load.image('platform', 'Platform.png');
        this.load.image('player', 'Penguin.png');
        this.load.image('cubes', '14_Ice_cube.png');
        this.load.tilemapTiledJSON('platformInstruction', 'platformTutorial.json');
        this.load.tilemapTiledJSON('platformInBox', 'platformInBox.json');
        this.load.tilemapTiledJSON('platform_map', 'BottomPlatform.json');
        this.load.tilemapTiledJSON('mid_bottom_platform', 'BottomMidPlatform.json');
        this.load.image('tutorial_overlay', 'Overlay_box.png');
        this.load.image('instruction_box', 'Instruction_box.png');
        this.load.image('gameOver_box', 'game_over_box_bar.png');
        this.load.image("gameOver_player", "pengiun_gameover.png");
        this.load.image('onepixel', 'onepixel.png');
        this.load.setPath('assets/spines/');
        this.load.spine('penguin', 'Penguin Character.json', 'Penguin Character.atlas');
        this.load.spine('cube', 'Ice_Cube.json', 'Ice_Cube.atlas');
        // this.load.image()
        this.load.start();
    }
    LoadProgress(percentage) {
        this.progressLine.setCrop(0, 0, this.progressLine.width * percentage, this.progressLine.height);
        percentage = percentage * 100;
    }
    OnComplete() {
        this.scene.stop('PreloadScene');
        this.scene.start('TutorialScene');
    }
}