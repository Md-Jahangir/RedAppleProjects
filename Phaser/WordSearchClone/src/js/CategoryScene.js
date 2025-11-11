import { Constant } from "./Constant";
import { Align } from "./util/align";
import { AlignGrid } from "./util/alignGrid";
import { Base } from "./util/base";
import { AudioManager } from "./AudioManager";

export default class CategoryScene extends Phaser.Scene {
    constructor() {
        super('CategoryScene');
    }
    init() {
        this.baseArray = [];
    }
    create(_mode) {
        this.mode = _mode;
        Constant.bgTheme = Phaser.Math.Between(1, 2); // randomize background
        let jsonWordList = this.cache.json.get('category');
        Constant.category = jsonWordList.categories.pairs;
        Align.shuffleArray(Constant.category);
        this.bg = Base.placeImage(this, 'gBG', false, { _oX: 0, _oY: 0 }, 0, 0);
        this.bg.setDisplaySize(Constant.game.config.width, Constant.game.config.height);
        this.CreateGrid();
    }
    PlaceCBases() {
        let index = 0;
        for (let i = 22; i <= 77; i += 5) {
            this.catBase = Base.placeImage(this, 'wBase', true, null, 0, 0, Constant.scaleFactor);
            this.aGrid.placeAtIndex(i, this.catBase);
            let textStr = Constant.category[index];
            let textStyle = {
                fontFamily: 'FredokaOne-Regular', align: 'center', fontSize: 40, color: '#000'
            };
            this.catBase.name = textStr;
            this.catText = Base.placeText(this, textStr, { x: 0, y: 0 }, textStyle);
            this.catText.setOrigin(0.5, 0.7);
            this.aGrid.placeAtIndex(i, this.catText);
            index += 1;
            this.baseArray.push(this.catBase);
        }
        // console.log(this.baseArray);
    }
    InteractionWithCategories() {
        this.baseArray.forEach((_base) => {
            _base.on('pointerdown', () => {
                // this.scene.stop();
                // console.log(_base.name);
                AudioManager.PlayButtonPressAudio();
                this.scene.start('GameScene', _base.name);
            });
        })
    }
    CreateGrid() {
        this.aGrid = new AlignGrid({
            scene: this,
            rows: 10,
            cols: 10,
            width: this.bg.displayWidth,
            height: this.bg.displayHeight,
            startX: this.bg.x,
            startY: this.bg.y,
        });
        this.PlaceCBases();
        this.InteractionWithCategories();
    }
}