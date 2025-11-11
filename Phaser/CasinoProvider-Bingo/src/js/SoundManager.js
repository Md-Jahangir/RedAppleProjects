class SoundManager {
    constructor() {
        this.buttonClickSound = null;
        this.spinButtonSound = null;
        this.gameBgSound = null;
        this.coinPayoutSound = null;
        this.coinAnimSound = null;
        this.bigWinSound = null;
        this.ultraWinSound = null;
        this.updateBalanceSound = null;

    };

    CreateSound(scene) {

        this.scene = scene.systems.game;
        this.gameBgSound = this.scene.sound.add('game_bg');
        this.buttonClickSound = this.scene.sound.add('button_click');
        this.coinPlaceSound = this.scene.sound.add('coin_place_sound');
        this.gameOverSound = this.scene.sound.add('game_over');
        this.launchBallSound = this.scene.sound.add('launch_ball');
        this.winSound = this.scene.sound.add('win_sound');
        this.winRowSound = this.scene.sound.add('win_row');



        // this.multiplePayLineSound = Constant.game.sound.add('multiple_payline_sound');
    };

    ButtonClickSound() {
        if (localStorage.getItem('sound_status_bingo') == 0) {
            this.buttonClickSound.play();
            this.gameBgSound.volume = 0.6;
        }
    };
    PlayGameBgSound() {
        if (localStorage.getItem('sound_status_bingo') == 0) {
            this.gameBgSound.play();
            this.gameBgSound.loop = true;
            this.gameBgSound.volume = 1;
        }
    }
    StopGameBgSound() {
        if (localStorage.getItem('sound_status_bingo') == 1) {
            this.gameBgSound.stop();
        }
    }
    CoinPlaceSound() {
        if (localStorage.getItem('sound_status_bingo') == 0) {
            this.coinPlaceSound.play();
            this.gameBgSound.volume = 0.6;
        }
    };
    GameOverSound() {
        if (localStorage.getItem('sound_status_bingo') == 0) {
            this.gameOverSound.play();
            this.gameBgSound.volume = 0.6;
        }
    };
    LaunchBallSound() {
        if (localStorage.getItem('sound_status_bingo') == 0) {
            this.launchBallSound.play();
            this.gameBgSound.volume = 0.6;
        }
    };
    WinSound() {
        if (localStorage.getItem('sound_status_bingo') == 0) {
            this.winSound.play();
            this.gameBgSound.volume = 0.6;
        }
    };
    WinRowSound() {
        if (localStorage.getItem('sound_status_bingo') == 0) {
            this.winRowSound.play();
            this.gameBgSound.volume = 0.6;
        }
    };



};

let sound = new SoundManager();

export { sound as SoundManager };