import { Constant } from '../Constant.js';
import { SoundManager } from '../SoundManager.js';
class JackpotWin {
    constructor(scene) {
        this.scene = scene;
        this.bigWinContainer = null;
        this.megaWinContainer = null;
        this.superWinContainer = null;
        this.currentAnimation = null;
        this.create();
    }
    create() {
        this.BgWin()
        this.BigWin();
        this.MegaWin();
        this.SuperWin();
        this.scene.game.events.on('evtListenScoreAnimEnd', this.HideWin, this);
    }
    BgWin() {
        this.bgWinContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor)
        // this.spineBgAnimBg = this.scene.add.spine(0, 0, "spine_big_win_bg").setScale(1);
        this.overlay = this.scene.add.image(0, 0, "loading_overlay").setScale(1).setAlpha(0.5);
        
        this.bgWinContainer.add(this.overlay);
        this.bgWinContainer.depth = 10;
        this.bgWinContainer.setVisible(false);
    }
    BigWin() {
        this.bigWinContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor)
        this.spineBigAnim = this.scene.add.spine(0, -100, "spine_big_win").setScale(1);
        this.bigWinContainer.add([this.spineBigAnim]);
        this.bigWinContainer.depth = 10;
        this.bigWinContainer.setVisible(false);


    }
    MegaWin() {
        this.megaWinContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor)
        this.spineMegaAnim = this.scene.add.spine(0, -25, "spine_mega_win").setScale(1);
        this.megaWinContainer.add([this.spineMegaAnim]);
        this.megaWinContainer.depth = 10;
        this.megaWinContainer.setVisible(false);
    }
    SuperWin() {
        this.superWinContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor)
        this.spineSuperAnim = this.scene.add.spine(0, -100, "spine_super_win").setScale(1);
        this.superWinContainer.add([this.spineSuperAnim]);
        this.superWinContainer.depth = 10;
        this.superWinContainer.setVisible(false);
    }
    ShowBigWin() {
        SoundManager.BigWinSound();
        this.currentAnimation ='big_win';
        this.bgWinContainer.setVisible(true);
        this.bigWinContainer.setVisible(true);
        this.spineBigAnim.play('big_win_in', false);
        this.spineBigAnim.once('complete', () => {
            this.spineBigAnim.play('big_win_loop', true);
        })
    }
    ShowMegaWin() {
        SoundManager.UltraWinSound();
        this.currentAnimation = 'mega_win';
        this.bgWinContainer.setVisible(true);
        this.megaWinContainer.setVisible(true);
        this.spineMegaAnim.play('mega_win_in', false);
        this.spineMegaAnim.once('complete', () => {
            this.spineMegaAnim.play('mega_win_loop', true);
        })
    }
    ShowSuperWin() {
        SoundManager.UltraWinSound();
        this.currentAnimation = 'super_win';
        this.bgWinContainer.setVisible(true);
        this.superWinContainer.setVisible(true);
        this.spineSuperAnim.play('super_win_in', true);
        this.spineSuperAnim.once('complete', () => {
            this.spineSuperAnim.play('super_win_loop', true);
        })
    }
    HideWin(){
      if(this.currentAnimation == 'big_win'){
        this.spineBigAnim.play('big_win_out', false);
        this.bgWinContainer.setVisible(false);
      }
      if(this.currentAnimation == 'mega_win'){
        this.spineMegaAnim.play('mega_win_out', false);
        this.bgWinContainer.setVisible(false);
      }
      if(this.currentAnimation == 'super_win'){
        this.spineSuperAnim.play('super_win_out', false);
        this.bgWinContainer.setVisible(false);
      }
    }
    
}
export default JackpotWin;