import Phaser from 'phaser';
import FontFaceObserver from 'fontfaceobserver';
import { Model } from './Model.js';
import store from '@/store';

export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
        this.progressBar = null;
        this.percentText = null;
        this.fonts = {
            'Roboto_Bold': null,
            'Roboto_Regular': null
        };
    }

    preload() {
        this.load.image('progress_bar', 'assets/images/progress_bar.png');
        // this.load.json('popupDetails', 'assets/json/popupDetails.json');
        this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
        this.load.html('modal_template', 'assets/modals/modal_template.html');
        this.load.json('modalsJson', 'assets/json/modals.json');
        this.load.json('events', 'assets/json/events.json');
        // this.load.json('elements', 'assets/json/elements.json');

    }

    async create() {
        // let elementsJsonData = this.cache.json.get('elements');
        // Model.SetElementsDetailsData(elementsJsonData);

        const elements = await store.dispatch('room/getElements');
        Model.SetElementsDetailsData(elements);

        this.progressBar = this.add.image(
            Math.round(window.phaserGame.game.config.width / 2),
            Math.round(window.phaserGame.game.config.height / 1.5), 'progress_bar'
        ).setOrigin(0.5).setScale(window.phaserGame.scaleFactorX);
        this.progressBar.setCrop(0, 0, 0, this.progressBar.height);

        let percentTextStyle = {
            fontFamily: 'Roboto_Bold',
            fontSize: '45px',
            fill: '#fff',
            fontStyle: 'bold',
            align: 'center'
        };
        this.percentText = this.add.text(this.progressBar.x, this.progressBar.y + 100 * window.phaserGame.scaleFactorX, 'Loading...', percentTextStyle).setOrigin(0.5).setScale(window.phaserGame.scaleFactorX);

        this.LoadFonts();
        let data = this.cache.json.get('popupDetails');
        Model.SetPopupDetailsData(data);
    }

    //======================================
    LoadFonts() {
        let propNames = Object.getOwnPropertyNames(this.fonts);
        propNames.forEach((fontName, index) => {
            let isLast = index >= propNames.length - 1;
            this.fonts[fontName] = new FontFaceObserver(fontName);
            this.fonts[fontName].load().then(this.FontLoadSuccess.bind(this, fontName, isLast), this.FontLoadError.bind(this, fontName));
        });
    }

    FontLoadSuccess(fontName, isLast) {
        if (isLast) {
            this.LoadAssets();
        }
    }

    // eslint-disable-next-line no-unused-vars
    FontLoadError(fontName) {}

    LoadAssets() {
        this.load.on('progress', this.LoadProgress, this);
        this.load.on('complete', this.OnComplete, { scene: this.scene });

        this.load.image('one_pixel_white', 'assets/images/one_pixel_white.png');
        this.load.image('transparent_image', 'assets/images/transparent_image.png');

        this.load.tilemapTiledJSON('map', 'assets/images/mainArea/main_area_map.json');
        this.load.image('main_area_spritesheet', 'assets/images/mainArea/main_area_spritesheet.png');

        //ELEMENTS
        let elementsData = Model.GetElementsDetailsData();
        for (let i = 0; i < elementsData.length; i++) {
            if (elementsData[i].imageType === 'sprite') {
                this.load.image(elementsData[i].imageName, elementsData[i].imageUrl);
            } else if (elementsData[i].imageType === 'spriteSheet') {
                this.load.spritesheet(elementsData[i].imageName, elementsData[i].imageUrl, {
                    frameWidth: elementsData[i].frameWidth,
                    frameHeight: elementsData[i].frameHeight
                });
            }
        }

        this.load.atlas('character', 'assets/sprites/character.png', 'assets/sprites/character.json');

        this.load.html('modal_template', 'assets/modals/modal_template.html');

        this.load.image('LTTS_Logo_Regular', 'assets/images/LTTS_Logo_Regular.png');

        this.load.start();
    }

    LoadProgress(percentage) {
        this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        percentage = percentage * 100;
        this.percentText.setText('Loading...' + Math.round(percentage) + '%');
    }

    OnComplete() {
        setTimeout(() => {
            this.scene.stop('PreloadScene');
            this.scene.start('GameScene');
        }, 1000);
    }
}