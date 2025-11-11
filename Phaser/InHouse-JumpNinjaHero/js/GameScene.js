import Background from "./Background.js";
import Ninja from "./Ninja.js";
import Shuriken from "./Shuriken.js";
import Controls from "./Controls.js";
import Score from "./Score.js"
import PopUp from "./Popup.js";
import Audio from "./SoundManager.js";
export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }
    init() {
        this.bg;
        this.background = new Background(this);
        this.ninja = new Ninja(this);
        this.shuriken = new Shuriken(this);
        this.control = new Controls(this);
        this.score = new Score(this);
        this.popup = new PopUp(this);
        this.gameAudio = new Audio(this);
        this.distance = 0;
        this.isRunniung = false;
        this.isJumping = false;
        this.isDucking = false;
        this.jumpCounter = 0;
        this.isDuck = false;
        this.isHit = false;
        this.isClimax = false;
    }
    create() {
        this.ShowBG();
        this.PlayGameAudio();
        this.ShowPlatForm();
        this.ShowNinja();
        this.NinjaObstacleCollision();
        this.PlayNinjaRunAnimations();
        this.ShowObstacles();
        this.NinjaControls();
        this.ShowScore();

    }
    ShowBG() {
        if (randomNumber == 0) {
            this.background.CreateDayBackground();
        }
        else {
            this.background.CreateNightBackgound();
        }
    }
    MoveBG() {
        if (randomNumber == 0) {
            this.background.MoveDayBackground();
        }
        else {
            this.background.MoveNightBackground();
        }
    }
    PlayGameAudio() {
        this.gameAudio.CreateSound();
        this.gameAudio.menuSound.stop();
        this.gameAudio.PlayGameAudio();
    }
    ShowPlatForm() {
        if (randomNumber == 0) {
            this.background.CreateDayPlatform();
        }
        else {
            this.background.CreateNightPlatform();
        }
    }
    MovePlatForm() {
        if (this.score.score % 10 == 0) {
            this.distance = this.score.score;
            // if (distance > 20) {
            //     distance -= 20;
            // }
        }
        if (randomNumber == 0) {
            this.background.MoveDayPlatform();
            if (this.score.score % this.distance == 0) {
                this.distance = 0;
                if (this.background.speed <= 20) {
                    this.background.speed = this.background.speed + (0.003 * this.background.speed);
                    // console.log(this.background.speed);
                    // console.log(distance);
                }
            }
        }
        else {
            this.background.MoveNightPlatform();
            if (this.score.score % this.distance == 0) {
                this.distance = 0;
                if (this.background.speed <= 20) {
                    this.background.speed = this.background.speed + (0.003 * this.background.speed);
                    // console.log(this.background.speed);
                    // console.log(distance);
                }
            }
        }
    }
    ShowNinja() {
        this.ninja.CreateNinja();
        this.ninja.CreateJumpNinja();
        this.ninja.CreateDeadNinja();
        this.ninja.ninjaJump.setVisible(false);
        this.ninja.ninjaDead.setVisible(false);
        this.ninja.ninja.setPosition(game.config.width / 4.36, game.config.height / 1.421);
        this.ninja.ninjaJump.setPosition(game.config.width / 4.36, game.config.height / 1.469);
        this.ninja.ninjaDead.setPosition(game.config.width / 4.36, game.config.height / 1.43);
        this.ninja.ninjaDead.setDepth(-1);
    }
    NinjaPlatformCollision() {
        this.physics.add.collider(this.ninja.ninja, this.background.platformDayArray);
        this.physics.add.collider(this.ninja.ninjaDead, this.background.platformDayArray);
        this.physics.add.collider(this.ninja.ninjaJump, this.background.platformDayArray, this.OnCollisionWithPlatform, null, this);
        this.physics.add.collider(this.ninja.ninja, this.background.platformNightArray);
        this.physics.add.collider(this.ninja.ninjaDead, this.background.platformNightArray);
        this.physics.add.collider(this.ninja.ninjaJump, this.background.platformNightArray, this.OnCollisionWithPlatform, null, this);
    }
    NinjaObstacleCollision() {
        this.physics.add.collider(this.ninja.ninja, this.shuriken.shurikenArray, this.OnCollisionWithObstacleWhileRunning, null, this);
        this.physics.add.collider(this.ninja.ninjaJump, this.shuriken.shurikenArray, this.OnCollisionWithObstacleWhileJumping, null, this);
        this.physics.add.collider(this.ninja.ninjaDead, this.shuriken.shurikenArray, this.OnCollisionWithObstacleWhileDucking, null, this);
    }
    PlayNinjaRunAnimations() {
        if (!this.isRunniung) {
            this.isRunniung = true;
            this.ninja.CreateAnimations();
            if (this.ninja.ninja.visible == false) {
                this.ninja.ninja.setVisible(true);
            }
            this.ninja.ninja.play('run');
        }
    }
    NinjaControls() {
        this.control.CreateOverlaps();
        this.control.leftOverlap.on('pointerup', this.NinjaDuckAnimation, this);
        this.control.rightOverlap.on('pointerdown', this.NinjaJumpAnimation, this);
    }
    NinjaDuckAnimation() {
        if (!this.isClimax && !this.isDuck && !this.isDucking && !this.isJumping && this.ninja.ninjaDead.visible == false) {
            this.isDuck = true;
            this.isDucking = true;
            this.ninja.ninja.setVisible(false);
            this.ninja.ninjaJump.setVisible(false);
            this.ninja.ninjaDead.setVisible(true);
            this.ninja.ninjaDead.setDepth(7);
            this.ninja.CreateAnimations();
            this.ninja.ninjaDead.play('duck');
            this.gameAudio.PlayJumpDuckAudio();
            this.ninja.ninjaDead.on('animationcomplete', function () {
                this.OnCompletion();
                // console.log("Animation Completed");
            }, this);
        }
    }
    OnCompletion() {
        // console.log("Duck complete");
        this.isDuck = false;
        this.isDucking = false;
        this.isRunniung = false;
        this.ninja.ninjaDead.setVisible(false);
        // console.log(" this.ninja.ninjaDead" + this.ninja.ninjaDead);
        if (!this.isHit) {
            this.PlayNinjaRunAnimations();
        }
    }
    NinjaJumpAnimation() {
        if (!this.isClimax && !this.isJumping && !this.isDuck && !this.isDucking) {
            this.isJumping = true;
            this.ninja.ninja.setVisible(false);
            this.ninja.ninjaJump.setVisible(true);
            this.ninja.CreateAnimations();
            if (this.jumpCounter == 0 || this.jumpCounter == 1) {
                this.isJumping = false;
                this.ninja.ninjaJump.setVelocityY(-800);
                this.ninja.ninja.setVelocityY(-800);
                this.ninja.ninjaDead.setVelocityY(-800);
                // this.ninja.ninjaDead.setDepth(-1);
                this.ninja.ninja.body.allowGravity = true;
                this.ninja.ninjaJump.body.allowGravity = true;
                this.ninja.ninjaDead.body.allowGravity = true;
                this.ninja.ninjaJump.play('jump');
                this.gameAudio.PlayJumpDuckAudio();
                this.jumpCounter++;
            }
            this.NinjaPlatformCollision();
        }
    }
    OnCollisionWithPlatform() {
        // console.log("Booyeah");
        if (!this.isDuck && this.ninja.ninjaJump.body.touching.down) {
            this.isJumping = false;
            this.ninja.ninjaJump.setVisible(false);
            this.ninja.ninja.setVisible(true);
            this.jumpCounter = 0;
        }
    }
    SceneEpilogue() {
        if (this.isClimax) {
            this.cameras.main.shake(185, 0.026);
            this.ninja.ninja.destroy();
            this.ninja.ninjaJump.destroy();
            this.ninja.ninjaDead.setVisible(true);
            // console.log("Dead");
            this.ninja.ninjaDead.play('death');
            this.gameAudio.StopGameAudio();
            this.gameAudio.PlayGameOverAudio();
            setTimeout(() => {
                this.ninja.ninjaDead.on('animationcomplete', this.GameOver, this);
            }, 500);
        }
    }
    OnCollisionWithObstacleWhileRunning(_ninjaRun, _shuriken) {
        if (this.isRunniung && this.isDucking && !this.isHit) {
            this.isHit = true;
            this.isClimax = true;
            this.SceneEpilogue();
        }
    }
    OnCollisionWithObstacleWhileJumping(_ninjaJump, _shuriken) {
        this.ninja.ninjaJump.body.allowGravity = false;
        this.ninja.ninjaDead.setDepth(7);
        this.ninja.ninjaDead.setPosition(this.ninja.ninjaJump.x, this.ninja.ninjaJump.y);
        this.physics.add.collider(this.ninja.ninjaDead, this.shuriken.shurikenArray)
        this.physics.add.collider(this.ninja.ninjaDead, this.background.platformDayArray);
        this.physics.add.collider(this.ninja.ninjaDead, this.background.platformNightArray);
        this.ninja.ninjaDead.body.immovable = false;
        this.isHit = true;
        this.isClimax = true;
        // console.log("Enter");
        this.SceneEpilogue();
    }
    OnCollisionWithObstacleWhileDucking(_ninjaDuck, _shuriken) {
        if (this.isDucking && !this.isHit) {
            this.isHit = true
            this.isClimax = true;
            this.SceneEpilogue();
        }
    }
    ShowObstacles() {
        this.shuriken.CreateShuriken();
    }
    ObstacleRotation() {
        this.shuriken.ShurikenRotation();
    }
    ObstacleSpeed() {
        this.shuriken.ShurikenSpeed();
        if (this.score.score % this.distance == 0) {
            this.distance = 0;
            if (this.shuriken.shurikenVelocity <= 1400) {
                this.shuriken.shurikenVelocity = this.shuriken.shurikenVelocity + (0.003 * this.shuriken.shurikenVelocity);
            }
        }
    }
    MoveObstacle() {
        if (!this.isHit)
            this.shuriken.MoveShuriken();
    }
    ShowScore() {
        this.score.CreateScore();
    }
    UpdateScore() {
        if (!this.isClimax) {
            for (let i = 0; i < this.shuriken.shurikenArray.length; i++) {
                if (this.shuriken.shurikenArray[i].x <= 15) {
                    // console.log("Score");
                    this.score.score += 1;
                    this.score.scoreTxt.setText(this.score.score);
                }
            }
        }
    }
    ShowBestScore() {
        let bestScore = 0;
        bestScore = localStorage.getItem('ninja_score');
        if (bestScore == null) {
            localStorage.setItem('ninja_score', 0);
        }
        // console.log("localStorage.getItem('ninja_score')" + localStorage.getItem('ninja_score'));
        if (localStorage.getItem('ninja_score') < this.score.score) {
            localStorage.setItem('ninja_score', this.score.score);
        }
        this.score.bestScoreTxt.setText("Best : " + localStorage.getItem('ninja_score'));
    }
    GameOver() {
        this.cameras.main.fadeIn(1000, 0, 0, 0);
        this.popup.CreatePop();
        this.ninja.ninjaDead.destroy();
        for (let i = 0; i < this.shuriken.shurikenArray.length; i++) {
            this.shuriken.shurikenArray[i].destroy();
        }
        this.score.scoreTxt.setPosition(game.config.width / 2, game.config.height / 3.61).setTint(0xFFFFFF).setAlpha(0.7);
        this.score.CreateBestScore();
        this.ShowBestScore();
    }
    update() {
        this.MoveBG();
        this.MovePlatForm();
        this.ObstacleRotation();
        this.MoveObstacle();
        this.UpdateScore();
    }
}