import { Constant } from '../Constant.js';
import { SoundManager } from '../SoundManager.js';
class JackpotWin {
    constructor(scene) {
        this.scene = scene;
        this.winningSpine = null;
        this.create();
        this.winnerContainer = null;
    }
    create() {
        this.CreateOverlay();
        this.WinnerPopup();
    }
    CreateOverlay() {
        this.jackpotOverlay = this.scene.add.image(Constant.game.config.width / 2, Constant.game.config.height / 2, 'info_popup_overlay').setOrigin(0.5, 0.5).setInteractive({ cursor: 'url(assets/images/custom_cursor.png), pointer' }).setScale(Constant.scaleFactor, Constant.scaleFactor).setVisible(false);
        this.jackpotOverlay.setDepth(4);
    }
    WinnerPopup() {
        this.winnerContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor).setDepth(2);
        this.winningSpine = this.scene.add.spine(0, 0, 'spine_tie_win');
        this.winnerContainer.add([this.winningSpine]);
        this.winnerContainer.setDepth(4);
        this.winnerContainer.setVisible(false);

    }
    ShowWinnerPopup(winnerName) {
        SoundManager.PlayWinSound();
        this.jackpotOverlay.setVisible(true);
        this.winnerContainer.setVisible(true);
        if(winnerName != 'tie_win'){
            this.winningSpine.setSkeleton('spine_' + winnerName);
            this.winningSpine.play('appear', false);
            this.winningSpine.on('complete', () => {
                this.winningSpine.play('idle', false);
                this.winningSpine.on('complete', () => {
                    this.jackpotOverlay.setVisible(false);
                    this.winnerContainer.setVisible(false);
                    this.winningSpine.off('complete');
                    Constant.game.events.emit('evtRestartGame');
                })
            })
        }else{
            this.winningSpine.setSkeleton('spine_' + winnerName);
            this.winningSpine.play('animation', false);
            this.winningSpine.on('complete', () => {
                    this.jackpotOverlay.setVisible(false);
                    this.winnerContainer.setVisible(false);
                    this.winningSpine.off('complete');
                    Constant.game.events.emit('evtRestartGame');
            })
        }
       
       
    }
    ShowLooserPopup(looserName) {
        SoundManager.PlayLooseSound();
        this.jackpotOverlay.setVisible(true);
        this.winnerContainer.setVisible(true);
        this.winningSpine.setSkeleton('spine_' + looserName);
        this.winningSpine.play('appear', false);
        this.winningSpine.on('complete', () => {
            this.winningSpine.play('idle', false);
            this.winningSpine.on('complete', () => {
                this.jackpotOverlay.setVisible(false);
                this.winnerContainer.setVisible(false);
                this.winningSpine.off('complete');
                Constant.game.events.emit('evtRestartGame');
            })
        })
        
    }
}
export default JackpotWin;