import { Constant } from "./Constant.js";
class SoundManeger {
    constructor() {
        this.ballHit = null;
        this.missedGoal = null;
        this.bgMusic = null;
        this.goalCheer = null;
        this.hitToTheBud = null;
        this.whistleSound = null;
        this.isSoundOn = 1;
    }
    CreateSounds() {
        this.ballHit = Constant.game.sound.add('Ball_Hit');
        this.missedGoal = Constant.game.sound.add('boo_missed_goal_sound');
        this.bgMusic = Constant.game.sound.add('crowd_general');
        this.goalCheer = Constant.game.sound.add('goal_cheer');
        this.hitToTheBud = Constant.game.sound.add('goal_post_hit');
        this.whistleSound = Constant.game.sound.add('soccer_whistle_point_scored');
    }
    PlayBallHitSound() {
        if (this.isSoundOn == 1) {
            this.ballHit.play();
        }
    }
    PlayMissedGoalSound() {
        if (this.isSoundOn == 1) {
            this.missedGoal.play();
        }
    }
    PlayBackgroundSound() {
        if (this.isSoundOn == 1) {
            this.bgMusic.play();
        }
    }
     StopBackgroundMusic() {
        this.bgMusic.stop();
    }
    PlayCheerUpOnGoalSound() {
        if (this.isSoundOn == 1) {
            this.goalCheer.play();
        }
    }
    PlayBudHitSound() {
        if (this.isSoundOn == 1) {
            this.hitToTheBud.play();
        }
    }
    PlayWistleSound() {
        if (this.isSoundOn == 1) {
            this.whistleSound.play();
        }
    }
    DisableSound() {
        this.isSoundOn = 0;
    }
    EnableSound() {
        this.isSoundOn = 1;
    }
}
let soundManeger = new SoundManeger();
export { soundManeger as SoundManeger };
