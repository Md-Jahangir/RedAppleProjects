import Phaser from 'phaser';
import FontFaceObserver from 'fontfaceobserver';
import { Constant } from './Constant.js';
import { Server } from './Server.js';
import { Model } from "./Model.js";
import { LanguageService } from './LanguageService.js';
import { SoundManager } from './SoundManager.js';

export default class PreloadScene extends Phaser.Scene {

    constructor() {
        super('PreloadScene');
        this.progressBar = null;
        this.loadingText = null;
        this.slotData = null;
        this.inactiveGamePopup = null;
        this.splashContainer = null;
        this.fonts = {
            "Roboto-Black": null,
        }
    };

    preload() {

        this.load.image('loading_overlay', 'assets/images/loader/loading_overlay.png');
        this.load.image('brand_logo', 'assets/images/loader/brand_logo.png');
        this.load.image('loading_bar', 'assets/images/loader/loading_bar.png');
        this.load.image('loading_base', 'assets/images/loader/loading_base.png');
    };

    create() {
        this.splashContainer = this.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        // let splashBg = this.add.image(0, 0, "loader_bg").setOrigin(0.5, 0.5).setScale(1, 1);
        let loadingBg = this.add.image(0, 0, "loading_overlay").setOrigin(0.5, 0.5);
        let brandLogo = this.add.image(0, -150, "brand_logo").setOrigin(0.5, 0.5);
        let splashBase = this.add.image(0, 100, "loading_base").setOrigin(0.5, 0.5);

        this.progressBar = this.add.image(splashBase.x - 635, splashBase.y, "loading_bar").setOrigin(0, 0.5).setScale(0, 1);
        this.progressBar.setCrop(0, 0, 0, this.progressBar.height);
        this.splashContainer.add([loadingBg, brandLogo, splashBase, this.progressBar]);
        this.loadFonts();
    }

    loadFonts() {
        let propNames = Object.getOwnPropertyNames(this.fonts);
        propNames.forEach((fontName, index) => {
            let isLast = index >= propNames.length - 1;
            this.fonts[fontName] = new FontFaceObserver(fontName);
            this.fonts[fontName].load().then(this.fontLoadSuccess.bind(this, fontName, isLast), this.fontLoadError.bind(this, fontName));
        });
    };

    async fontLoadSuccess(fontName, isLast) {
        if (isLast) {
            let getBalanceApi = await Server.GetPlayerBalance();
            if (!getBalanceApi.error) {
                Model.SetBalance(getBalanceApi.data.balance);
                this.loadAssets();
            }
        }

    }
    fontLoadError(fontName) {
        console.error("Font loading error: ", fontName);
    };

    async GetInitialData() {
        // const resp = await LanguageService.init();
        // if (resp) {
        //     let getBalanceApi = await Server.GetPlayerBalance();
        //     if (!getBalanceApi.error) {
        //         Model.SetBalance(getBalanceApi.data.balance);
        //         this.loadAssets();
        //     }
        // }
        this.loadAssets();
    };

    loadAssets() {
        this.load.on('progress', this.loadProgress, this);
        this.load.on('complete', this.complete, { scene: this.scene });

        this.load.spritesheet('card_spritesheet', 'assets/images/card_spritesheet.png', { frameWidth: 1431 / 13, frameHeight: 779 / 5 });
        this.load.image('cardvalue_base', 'assets/images/cardvalue_base.png');

        this.load.image('bg_gameplay', 'assets/images/bg_game.png');

      

        this.load.image('top_chips_bg', 'assets/images/top_chips_bg.png');
        this.load.image('balance_base', 'assets/images/balance_base.png');
        this.load.image('custom_cursor', 'assets/images/custom_cursor.png');

        // enabled Chips ------------------------------------------------------------------------
        this.load.image('fiche_0_normal', 'assets/images/fiche_0.png');
        this.load.image('fiche_1_normal', 'assets/images/fiche_1.png');
        this.load.image('fiche_2_normal', 'assets/images/fiche_2.png');
        this.load.image('fiche_3_normal', 'assets/images/fiche_3.png');
        this.load.image('fiche_4_normal', 'assets/images/fiche_4.png');
        this.load.image('fiche_5_normal', 'assets/images/fiche_5.png');

        this.load.image('fiche_0_disabled', 'assets/images/fiche_0.png');
        this.load.image('fiche_1_disabled', 'assets/images/fiche_1.png');
        this.load.image('fiche_2_disabled', 'assets/images/fiche_2.png');
        this.load.image('fiche_3_disabled', 'assets/images/fiche_3.png');
        this.load.image('fiche_4_disabled', 'assets/images/fiche_4.png');
        this.load.image('fiche_5_disabled', 'assets/images/fiche_5.png');
        this.load.image('fiche_ring', 'assets/images/fiche_ring.png');

        this.load.image("message_box", "assets/images/message_box.png");
        this.load.image("quit_base", "assets/images/quit_base.png");



        // Buttons >>>>-----------------------------------------------------------------
        this.load.image('play_button', 'assets/images/buttons/play_button.png');
        this.load.image("but_back_normal", "assets/images/buttons/but_back.png");
        this.load.image("but_back_disabled", "assets/images/buttons/but_back.png");
        this.load.image("display_bg", "assets/images/display_bg.png");
        this.load.image("bet_banker", "assets/images/bet_banker.png");
        this.load.image("bet_tie", "assets/images/bet_tie.png");
        this.load.image("bet_player", "assets/images/bet_player.png");

        this.load.image("bet_banker1", "assets/images/bet_banker1.png");
        this.load.image("bet_tie1", "assets/images/bet_tie1.png");
        this.load.image("bet_player1", "assets/images/bet_player1.png");

        this.load.image("history_bg", "assets/images/history_bg.png");

        this.load.image("but_clear_normal", "assets/images/buttons/button_normal.png");
        this.load.image("but_deal_normal", "assets/images/buttons/button_normal.png");
        this.load.image("but_rebet_normal", "assets/images/buttons/button_normal.png");
        this.load.image("but_new_normal", "assets/images/buttons/button_normal.png");

        this.load.image("but_clear_disabled", "assets/images/buttons/button_disabled.png");
        this.load.image("but_deal_disabled", "assets/images/buttons/button_disabled.png");
        this.load.image("but_rebet_disabled", "assets/images/buttons/button_disabled.png");
        this.load.image("but_new_disabled", "assets/images/buttons/button_disabled.png");

        this.load.image('sound_on_normal', 'assets/images/buttons/sound_on.png');
        this.load.image('sound_on_disabled', 'assets/images/buttons/sound_off.png');
        // this.load.image('sound_off_normal', 'assets/images/buttons/sound_off.png');
        // this.load.image('sound_off_disabled', 'assets/images/buttons/sound_off.png');

        this.load.image('but_back_normal', 'assets/images/buttons/but_back.png');
        this.load.image('but_back_disabled', 'assets/images/buttons/but_back.png');
        this.load.image('info_icon_normal', 'assets/images/buttons/info_icon.png');
        this.load.image('info_icon_disabled', 'assets/images/buttons/info_icon.png');
        this.load.image('no_button', 'assets/images/buttons/no_button.png');

        this.load.image('how_to_play_normal', 'assets/images/buttons/how_to_play.png');
        this.load.image('how_to_play_disabled', 'assets/images/buttons/how_to_play.png');
        this.load.image('card_base', 'assets/images/card_base.png');
        this.load.image('open_deck', 'assets/images/open_deck.png');
        this.load.image('close_deck', 'assets/images/close_deck.png');

        this.load.image('number_board_grid', 'assets/images/number_board_grid.png');
        this.load.image('player_bet_history_bg', 'assets/images/player_bet_history_bg.png');
        this.load.image('banker_bet_history_bg', 'assets/images/banker_bet_history_bg.png');
        this.load.image('close_deck_card', 'assets/images/close_deck_card.png');
        //popups 

        this.load.image('info_popup_overlay', 'assets/images/popups/info_popup_overlay.png');
        this.load.image('info_popup_bg', 'assets/images/popups/info_popup_bg.png');
        this.load.image('info_cross_button', 'assets/images/popups/info_cross_button.png');
        this.load.image('arrow_next', 'assets/images/popups/arrow_next.png');
        this.load.image('arrow_previous', 'assets/images/popups/arrow_previous.png');
        this.load.image('dealing_cards', 'assets/images/popups/dealing_cards.png');
        this.load.image('super6_win', 'assets/images/popups/super6_win.png');
        this.load.image('banker_win', 'assets/images/popups/banker_win.png');
        this.load.image('you_loose', 'assets/images/popups/loose.png');
        this.load.image('player_win', 'assets/images/popups/win.png');
        this.load.image('tie_win', 'assets/images/popups/tie.png');
        this.load.image('banker_loose', 'assets/images/popups/banker_loose.png');

        //Audio
        this.load.audio('card', 'assets/sounds/card.wav');
        this.load.audio('chip', 'assets/sounds/chip.wav');
        this.load.audio('fiche_collect', 'assets/sounds/fiche_collect.mp3');
        this.load.audio('lose', 'assets/sounds/lose.wav');
        this.load.audio('signal_button', 'assets/sounds/press_but.wav');
        this.load.audio('win', 'assets/sounds/win.wav');
        this.load.audio('game_bg_sound', 'assets/sounds/game_bg_sound.mp3');
        this.load.audio('place_ur_bets', 'assets/sounds/place_ur_bets.mp3');
        this.load.audio('splash_bg_sound', 'assets/sounds/splash_bg_sound.wav');

        // -------------Spine---------------------------------------------------
        this.load.setPath('assets/images/spines')
        this.load.spine('spine_banker_loose', 'banker_lose_export/banker_loose.json', 'banker_lose_export/banker_loose.atlas');
        this.load.spine('spine_banker_win', 'banker_win_export/banker_win.json', 'banker_win_export/banker_win.atlas');
        this.load.spine('spine_super_6', 'super_6_export/super6.json', 'super_6_export/super6.atlas');
        this.load.spine('spine_tie_win', 'tie_export/tie.json', 'tie_export/tie.atlas');
        this.load.spine('spine_title_art', 'title_art/splash_art.json', 'title_art/splash_art.atlas');
        this.load.spine('spine_player_loose', 'you_loose_export/you_loose.json', 'you_loose_export/you_loose.atlas');
        this.load.spine('spine_player_win', 'you_win_export/you_win.json', 'you_win_export/you_win.atlas');
        this.load.start();
    }

    loadProgress(percentage) {
        this.progressBar.scaleX = percentage;
        this.progressBar.setCrop(0, 0, this.progressBar.width * percentage, this.progressBar.height);
        percentage = percentage * 100;
    }

    complete() {
        SoundManager.CreateSound();
        if (localStorage.getItem('checkbox_selected_bacarrat1') === false || localStorage.getItem('checkbox_selected_bacarrat1') === null) {
            this.scene.start('SplashScene');
        } else {
            this.scene.start("GameScene");
        }


    }

}