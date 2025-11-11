import GameOverPopup from "../js/popups/GameOverPopup.js";
import QuitPopup from "../js/popups/QuitPopup.js";
import InstructionPopup from "../js/popups/InstructionPopup.js";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    init() {
        this.gameOverPopup = new GameOverPopup(this);
        this.quitPopup = new QuitPopup(this);
        this.instructionPopup = new InstructionPopup(this);
    }
    preload() {}

    create() {
        this.score = 0;
        this.isGameOver = false;
        this.isTouchStart = false;
        this.isAlreadyCollect = false;
        this.willStartGame = false;
        this.obstacleArray = [];
        this.obstacleCounter = 0;
        this.obstacleTimedEvent = null;
        this.obstacleHideTimedEvent = null;
        this.HideObsCounter = 0;

        this.CreateTopItem();

        this.CreatePlayer();

        this.CreateObstacle();
        this.SetRandomPosition();
        this.CollisionCheckWithObstacleArray();

        this.CreateObstacleTimerEvent();
        this.CreateObstacleHideTimerEvent();

        this.CreateUserInput();

        this.instructionPopup.CreateInstructionPopup();

    }

    //######################################################################################
    CreateTopItem() {
        this.gameplayBg = this.add.spine(Math.round(game.config.width / 2), Math.round(game.config.height / 2), 'gameplay_bg', true).setScale(scaleFactor, scaleFactor);
        this.gameplayBg.play("gameplay_bg_animation", true);

        let scoreTextStyle = { fontFamily: 'AmericanCaptain', fontSize: '84px', fill: '#ffffff', fontStyle: 'bold', align: 'center' };
        this.scoreText = this.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 30), this.score, scoreTextStyle).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);
        this.scoreText.depth = 1

        this.backButton = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 14), Math.round(game.config.height / 25), "back_button", 0.5, 0.5, scaleFactor, scaleFactor, "true", this.BackButtonPressed, this.BackButtonReleased);
        this.backButton.depth = 1

        this.soundButton = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 1.077), Math.round(game.config.height / 25), "sound_on", 0.5, 0.5, scaleFactor, scaleFactor, "true", this.SoundButtonPressed, this.SoundButtonReleased);
        this.soundButton.depth = 1

        this.DefaultSoundButton();
    }

    BackButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.backButton, scaleFactor);
        SoundManager.PlayButtonClickSound();
        this.willStartGame = false;
        this.StopMovement();
    }
    BackButtonReleased() {
        setTimeout(() => {
            this.quitPopup.CreateQuitPopup();
            SoundManager.StopBgMusic();
        }, 100);
    }

    SoundButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.soundButton, scaleFactor);
        SoundManager.PlayButtonClickSound();
    }
    SoundButtonReleased() {
        this.ToggleSoundButton();
    }

    DefaultSoundButton() {
        if (localStorage.getItem("dont_drop_is_sound_on") == null) {
            localStorage.setItem("dont_drop_is_sound_on", 1);
        }
        if (localStorage.getItem("dont_drop_is_sound_on") == 1) {
            this.soundButton.setTexture("sound_on");
        } else {
            this.soundButton.setTexture("sound_off");
        }
    }
    ToggleSoundButton() {
        if (localStorage.getItem("dont_drop_is_sound_on") == 1) {
            localStorage.setItem("dont_drop_is_sound_on", 0);
            this.soundButton.setTexture("sound_off");
            SoundManager.PlayButtonClickSound();
            SoundManager.StopBgMusic();
        } else {
            localStorage.setItem("dont_drop_is_sound_on", 1);
            this.soundButton.setTexture("sound_on");
            SoundManager.PlayBgMusic();
        }
    }

    GetRandomNumber(_min, _max) {
        let rnd = Math.floor(Math.random() * (_max - _min) + _min);
        return rnd;
    }

    //######################################################################################


    //######################################################################################
    CreateUserInput() {
        this.gameplayBg.setInteractive();
        this.gameplayBg.on('pointerdown', function(pointer) {
            let touchX = pointer.x;
            let touchY = pointer.y;
            this.isTouchStart = true;
        });

        this.gameplayBg.on('pointerup', function(pointer) {
            let touchX = pointer.x;
            let touchY = pointer.y;
            this.isTouchStart = false;
        });

        this.gameplayBg.on('pointermove', function(pointer) {
            if (this.isTouchStart && !this.isGameOver) {
                let deltaY = 250;
                let touchX = pointer.x;
                let touchY = pointer.y - deltaY;
                this.scene.MoveThePlayer(touchX, touchY);
            }
        });
    }

    //######################################################################################
    CreatePlayer() {
        this.player = this.add.spine(Math.round(game.config.width / 2), Math.round(game.config.height / 2), "ball_animation", 'ball_correct_animation', false).setScale(scaleFactor, scaleFactor);
        this.physics.add.existing(this.player, true);
        let numberTextStyle = { fontFamily: 'AmericanCaptain', fontSize: '60px', fill: '#000', fontStyle: 'bold', align: 'center' };
        this.playerNumberText = this.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 2), "4", numberTextStyle).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);
        this.player.body.immovable = false;
        this.player.body.position.x = this.player.x - this.player.body.center.x;
        this.player.body.position.y = this.player.y - this.player.body.center.y;
    }

    MoveThePlayer(touchX, touchY) {
        if (touchX > Math.round(this.player.width / 2) &&
            touchX < game.config.width - Math.round(this.player.width / 2) &&
            touchY > Math.round(this.player.height / 2) &&
            touchY < game.config.height - Math.round(this.player.height / 2)) {
            this.player.body.x = touchX - this.player.body.center.x;
            this.player.body.y = touchY - this.player.body.center.y;
            this.player.y = touchY;
            this.player.x = touchX;
            this.playerNumberText.x = touchX;
            this.playerNumberText.y = touchY;
        }
    }

    //######################################################################################

    //######################################################################################
    CreateObstacle() {
        for (let i = 0; i < 10; i++) {
            let randomNumber = this.GetRandomNumber(1, 9);

            let container = this.add.container(0, 0);
            let obstacle = this.add.sprite(0, 0, 'obstacle_ball').setScale(scaleFactor, scaleFactor).setOrigin(0.5, 0.5);

            let numberTextStyle = { fontFamily: 'AmericanCaptain', fontSize: '60px', fill: '#000', fontStyle: 'bold', align: 'center' };
            let obstacleNumberText = this.add.text(0, 0, randomNumber, numberTextStyle).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);
            container.add([obstacle, obstacleNumberText]);

            container.setSize(120, 120);
            this.physics.world.enable(container);
            container.body.setCollideWorldBounds(true);

            container.setVisible(false);
            this.obstacleArray.push(container);
        }
    }

    CreateObstacleTimerEvent() {
        this.obstacleTimedEvent = this.time.addEvent({
            delay: 2000,
            callback: this.SetRandomPosition,
            callbackScope: this,
            loop: true
        });
    }

    SetObstacleRandomPos(_rndMinX, _rndMinY, _rndMaxX, _rndMaxY, _rndMinSpeedX, _rndMinSpeedY, _rndMaxSpeedX, _rndMaxSpeedY, _obsCounter) {
        this.obstacleArray[_obsCounter].setVisible(true);
        this.obstacleArray[_obsCounter].body.enable = true;
        this.obstacleArray[_obsCounter].x = this.GetRandomNumber(_rndMinX, _rndMaxX);
        this.obstacleArray[_obsCounter].y = this.GetRandomNumber(_rndMinY, _rndMaxY);
        this.obstacleArray[_obsCounter].body.setVelocity(this.GetRandomNumber(_rndMinSpeedX, _rndMaxSpeedX), this.GetRandomNumber(_rndMinSpeedY, _rndMaxSpeedY)).setBounce(1, 1);
    }

    SetRandomPosition() {
        if (!this.isGameOver && this.willStartGame) {
            if (this.obstacleCounter < this.obstacleArray.length) {
                let rnd = this.GetRandomNumber(0, 4);
                switch (rnd) {
                    case 0:
                        this.SetObstacleRandomPos(0, 0, 200, 200, 150, 150, 300, 300, this.obstacleCounter);
                        break;
                    case 1:
                        this.SetObstacleRandomPos(880, 1080, 1720, 1920, 150, 150, 300, 300, this.obstacleCounter);
                        break;
                    case 2:
                        this.SetObstacleRandomPos(0, 1720, 200, 1920, 150, 150, 300, 300, this.obstacleCounter);
                        break;
                    case 3:
                        this.SetObstacleRandomPos(880, 0, 1080, 200, 150, 150, 300, 300, this.obstacleCounter);
                        break;
                }
                this.obstacleCounter++;
            } else {
                this.obstacleCounter = 0;
            }
        }
    }

    //######################################################################################

    //######################################################################################
    CreateObstacleHideTimerEvent() {
        this.obstacleHideTimedEvent = this.time.addEvent({
            delay: 10000,
            callback: this.HideAfterSomeTime,
            callbackScope: this,
            loop: true
        });
    }
    HideAfterSomeTime() {
        if (!this.isGameOver && this.willStartGame) {
            if (this.HideObsCounter < this.obstacleArray.length) {
                this.obstacleArray[this.HideObsCounter].setVisible(false);
                this.obstacleArray[this.HideObsCounter].body.setVelocity(0, 0);
                this.obstacleArray[this.HideObsCounter].body.destroy();
                this.HideObsCounter++;
            } else {
                this.HideObsCounter = 0;
            }
        }
    }

    StopMovement() {
        for (let i = 0; i < this.obstacleArray.length; i++) {
            this.obstacleArray[i].body.moves = false;
        }
    }
    StartMovement() {
        for (let i = 0; i < this.obstacleArray.length; i++) {
            this.obstacleArray[i].body.moves = true;
        }
    }

    //######################################################################################


    //######################################################################################
    CollisionCheckWithObstacleArray() {
        for (let i = 0; i < this.obstacleArray.length; i++) {
            this.physics.add.overlap(this.player, this.obstacleArray[i], this.OnCollideWithObstacleArray, null, this);
        }
    }
    OnCollideWithObstacleArray(_player, _obstacle) {
        if (!this.isGameOver) {
            if (!this.isAlreadyCollect) {
                this.isAlreadyCollect = true;
                let obsText = parseInt(_obstacle.list[1].text);

                this.HideTheCollideObstacle(_obstacle);
                this.AddNumberToThePlayer(_obstacle);
            }
        }

    }
    AddNumberToThePlayer(_obstacle) {
        let plyText = parseInt(this.playerNumberText.text);
        let obsText = parseInt(_obstacle.list[1].text);
        if (obsText < plyText) {
            let total = plyText + obsText;
            if (total > 8) {
                total = 4;
            } else {
                total = plyText + obsText;
            }
            this.playerNumberText.setText(total);

            this.player.play("ball_correct_animation", false);

            this.IncrementScore(obsText);
        } else {
            this.player.play("wrong_ball_animation", false);
            this.cameras.main.shake(200);
            this.GameOver();
        }
    }
    HideTheCollideObstacle(_obstacle) {
        this.tweens.add({
            targets: [_obstacle],
            alpha: 0,
            duration: 100,
            callbackScope: this,
            onComplete: function(tween) {
                _obstacle.setVisible(false);
                _obstacle.body.destroy();
                this.isAlreadyCollect = false;
            }
        });
    }

    //######################################################################################



    //######################################################################################
    IncrementScore(_score) {
        this.score += _score;
        this.scoreText.text = this.score;
    }

    //######################################################################################
    GameOver() {
        if (!this.isGameOver) {
            console.log("game over");
            this.isGameOver = true;
            this.gameplayBg.disableInteractive();
            this.obstacleTimedEvent.remove();
            this.obstacleHideTimedEvent.remove();

            for (let i = 0; i < this.obstacleArray.length; i++) {
                this.obstacleArray[i].body.setVelocity(0, 0);
            }
            setTimeout(() => {
                this.gameOverPopup.CreateGameOverPopup(this.score);
            }, 400);
        }
    }

    //########################################################################################

}