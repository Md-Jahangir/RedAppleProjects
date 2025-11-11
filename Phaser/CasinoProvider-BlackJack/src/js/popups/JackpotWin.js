import { Constant } from '../Constant.js';
import { SoundManager } from '../SoundManager.js';
class JackpotWin {
    constructor(scene) {
        this.scene = scene;
        this.jackpotOverlay = null;
        this.winAnimation = null;
        this.blackJackContainer = null;
        this.create();
    }
    create() {
        this.CreateOverlay();
        this.BlackJackJackpot();
    }
    CreateOverlay() {
        this.jackpotOverlay = this.scene.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'info_popup_overlay').setOrigin(0.5, 0.5).setInteractive({ useHandCursor: true }).setScale(Constant.scaleFactor, Constant.scaleFactor).setVisible(false);
        this.jackpotOverlay.setInteractive();
    }
    BlackJackJackpot() {
        this.blackJackContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor).setDepth(2);
        this.winAnimation = this.scene.add.spine(0, 0, 'spine_blackjack');
        this.blackJackContainer.add([this.winAnimation]);
        this.blackJackContainer.setVisible(false);

    }
   
    ShowLoosePopup() {
        SoundManager.PlayLooseSound();
        this.jackpotOverlay.setVisible(true);
        this.blackJackContainer.setVisible(true);
        this.winAnimation.setSkeleton('spine_loose');
        this.winAnimation.off('complete');
        this.winAnimation.play('appear', false);
        this.winAnimation.on('complete', () => {
            this.winAnimation.play('loop', false);
            this.winAnimation.on('complete', () => {
                this.winAnimation.play('disappear', false);
                this.winAnimation.on('complete', () => {
                    this.jackpotOverlay.setVisible(false);
                    this.blackJackContainer.setVisible(false);
                    this.winAnimation.off('complete');
                    Constant.game.events.emit('evtShowResultDone');
                })
            })
        })
    }
    ShowWinPopup() {
        SoundManager.PlayWinSound();
        this.jackpotOverlay.setVisible(true);
        this.blackJackContainer.setVisible(true);
        this.winAnimation.setSkeleton('spine_win');
        this.winAnimation.off('complete');
        this.winAnimation.play('animation', false);
        this.winAnimation.on('complete', () => {
            this.winAnimation.play('loop', false);
            this.winAnimation.on('complete', () => {
                this.winAnimation.play('disappear', false);
                this.winAnimation.on('complete', () => {
                    this.jackpotOverlay.setVisible(false);
                    this.blackJackContainer.setVisible(false);
                    this.winAnimation.off('complete');
                    Constant.game.events.emit('evtShowResultDone')
                })
            })
        })


    }
    ShowBlackJackPopup() {
        SoundManager.PlayWinSound();
        this.jackpotOverlay.setVisible(true);
        this.blackJackContainer.setVisible(true);
        this.winAnimation.setSkeleton('spine_blackjack');
        this.winAnimation.off('complete');
        this.winAnimation.play('animation', false);
        this.winAnimation.on('complete', () => {
            this.jackpotOverlay.setVisible(false);
            this.blackJackContainer.setVisible(false);
            this.winAnimation.off('complete');
            Constant.game.events.emit('evtShowResultDone')
        })
    }
    ShowTiePopup() {
        SoundManager.PlayLooseSound();
        this.jackpotOverlay.setVisible(true);
        this.blackJackContainer.setVisible(true);
        this.winAnimation.setSkeleton('spine_tie');
        this.winAnimation.off('complete');
        this.winAnimation.play('animation', false);
        this.winAnimation.on('complete', () => {
            this.jackpotOverlay.setVisible(false);
            this.blackJackContainer.setVisible(false);
            this.winAnimation.off('complete');
            Constant.game.events.emit('evtShowResultDone')
        })
    }
}
export default JackpotWin;