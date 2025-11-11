import GameOverPopup from "../js/popups/GameOverPopup.js";
import InstructionPopup from "../js/popups/InstructionPopup.js";
import QuitPopup from "../js/popups/QuitPopup.js";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    init() {
        this.gameOverPopup = new GameOverPopup(this);
        this.instructionPopup = new InstructionPopup(this);
        this.quitPopup = new QuitPopup(this);
    }
    preload() {}

    create() {
        this.score = 0;
        this.isGameOver = false;
        this.willStartGame = false;

        // this.obstacleArray = [];
        this.obstacle = null;
        this.obstacleTimedEvent = null;
        this.obstacleMovementSpeed = 2500;

        this.tweenPos1 = [];
        this.tweenPos2 = [];
        this.tweenPos3 = [];
        this.tweenPos4 = [];
        this.tweenPos5 = [];
        this.tweenPos6 = [];

        this.CreateTopItem();

        this.CreatePlayer();

        this.CreateObstacleTimerEvent();

        this.CreatePath();

        this.SetRandomPositionOfObstacle();

        this.CollisionCheckWithObstacle();

        this.CreateUserInput();

        this.instructionPopup.CreateInstructionPopup();
    }

    CreateTopItem() {
        this.gameplayBg = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 2), "gameplay_bg", 0.5, 0.5, scaleFactor, scaleFactor);
        // this.wave = this.add.spine(Math.round(game.config.width / 2), Math.round(game.config.height / 2), 'wave', true).setScale(scaleFactor, scaleFactor);
        // this.wave.play("wave_animation", true);

        var scoreTextStyle = { fontFamily: 'Wicked_Mouse_Demo', fontSize: '80px', fill: '#fff268', fontStyle: 'bold', align: 'center' };
        this.scoreText = this.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 25), this.score, scoreTextStyle).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor).setShadow(1, 5, '#ff0000', 5);
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
        if (localStorage.getItem("match_it_right_is_sound_on") == null) {
            localStorage.setItem("match_it_right_is_sound_on", 1);
        }
        if (localStorage.getItem("match_it_right_is_sound_on") == 1) {
            this.soundButton.setTexture("sound_on");
        } else {
            this.soundButton.setTexture("sound_off");
        }
    }
    ToggleSoundButton() {
        if (localStorage.getItem("match_it_right_is_sound_on") == 1) {
            localStorage.setItem("match_it_right_is_sound_on", 0);
            this.soundButton.setTexture("sound_off");
            SoundManager.PlayButtonClickSound();
            SoundManager.StopBgMusic();
        } else {
            localStorage.setItem("match_it_right_is_sound_on", 1);
            this.soundButton.setTexture("sound_on");
            SoundManager.PlayBgMusic();
        }
    }

    GetRandomNumber(_min, _max) {
        var rnd = Math.floor(Math.random() * (_max - _min) + _min);
        return rnd;
    }

    //######################################################################################
    CreateUserInput() {
        this.gameplayBg.setInteractive();
        this.gameplayBg.on('pointerdown', function(pointer) {
            this.scene.ChangeThePlayer();
        });
    }

    CreateObstacleTimerEvent() {
        this.obstacleTimedEvent = this.time.addEvent({
            delay: this.obstacleMovementSpeed + 400,
            callback: this.SetRandomPositionOfObstacle,
            callbackScope: this,
            loop: true
        });
    }

    //######################################################################################
    CreatePlayer() {
        this.CreatePlayer1();

        this.CreatePlayer2();

        var rnd = this.GetRandomNumber(0, 2);
        if (rnd == 0) {
            this.player1.setVisible(true);
            this.player1.body.enable = true;
        } else {
            this.player2.setVisible(true);
            this.player2.body.enable = true;
        }
        this.RotatePlayer(this.player1);
        this.RotatePlayer(this.player2);
    }

    //Blue type player
    CreatePlayer1() {
        this.player1 = this.add.spine(Math.round(game.config.width / 2), Math.round(game.config.height / 2), "blue_turtle", true).setScale(scaleFactor, scaleFactor);
        this.physics.add.existing(this.player1, true);
        this.player1.body.position.x = this.player1.x - this.player1.body.center.x;
        this.player1.body.position.y = this.player1.y - this.player1.body.center.y;
        this.player1.name = "blue";
        this.player1.play("floating 2", true);
        this.player1.body.setSize(this.player1.width - 50, this.player1.height - 50, 0);
        this.player1.body.enable = false;
        this.player1.setVisible(false);
    }

    //Yellow type player
    CreatePlayer2() {
        this.player2 = this.add.spine(Math.round(game.config.width / 2), Math.round(game.config.height / 2), "yellow_turtle", true).setScale(scaleFactor, scaleFactor);
        this.physics.add.existing(this.player2, true);
        this.player2.body.position.x = this.player2.x - this.player2.body.center.x;
        this.player2.body.position.y = this.player2.y - this.player2.body.center.y;
        this.player2.name = "yellow";
        this.player2.play("floating 2", true);
        this.player2.body.setSize(this.player2.width - 50, this.player2.height - 50, 0);
        this.player2.body.enable = false;
        this.player2.setVisible(false);
    }

    RotatePlayer(_player) {
        var rotateTween = this.tweens.addCounter({
            targets: [_player],
            from: 0,
            to: 360,
            duration: 6000,
            repeat: -1,
            onUpdate: function(tween) {
                _player.setAngle(rotateTween.getValue());
            }
        });
    }

    ChangeThePlayer() {
        if (this.player1.visible) {
            this.player1.setVisible(false);
            this.player2.setVisible(true);
            this.player1.body.enable = false;
            this.player2.body.enable = true;
        } else {
            this.player2.setVisible(false);
            this.player1.setVisible(true);
            this.player2.body.enable = false;
            this.player1.body.enable = true;
        }
    }

    //######################################################################################

    CreatePath() {
        // this.tweenPos6 = [{ x: 1080, y: 2092 }, { x: 900, y: 1750 }, { x: 920, y: 1550 }, { x: 800, y: 1350 }, { x: 650, y: 1200 }, { x: 640, y: 1100 }, { x: 580, y: 1000 }];
        // this.tweenPos5 = [{ x: 540, y: 2092 }, { x: 510, y: 1750 }, { x: 600, y: 1550 }, { x: 580, y: 1350 }, { x: 600, y: 1200 }, { x: 580, y: 1100 }, { x: 540, y: 1000 }];
        // this.tweenPos4 = [{ x: 0, y: 2092 }, { x: 200, y: 1750 }, { x: 240, y: 1550 }, { x: 400, y: 1350 }, { x: 420, y: 1200 }, { x: 450, y: 1100 }, { x: 500, y: 1000 }];
        // this.tweenPos3 = [{ x: 1080, y: -172 }, { x: 900, y: 100 }, { x: 850, y: 250 }, { x: 800, y: 400 }, { x: 820, y: 550 }, { x: 750, y: 700 }, { x: 590, y: 900 }];
        // this.tweenPos2 = [{ x: 540, y: -172 }, { x: 500, y: 100 }, { x: 540, y: 250 }, { x: 600, y: 400 }, { x: 550, y: 550 }, { x: 500, y: 700 }, { x: 560, y: 900 }];
        // this.tweenPos1 = [{ x: 0, y: -172 }, { x: 100, y: 100 }, { x: 300, y: 250 }, { x: 380, y: 400 }, { x: 360, y: 550 }, { x: 480, y: 700 }, { x: 500, y: 900 }];
        this.tweenPos6 = [
            { x: (Math.round(game.config.width) + 250), y: (Math.round(game.config.height) + 172) },
            { x: Math.round(game.config.width / 1.2), y: Math.round(game.config.height / 1.097) },
            { x: Math.round(game.config.width / 1.174), y: Math.round(game.config.height / 1.239) },
            { x: Math.round(game.config.width / 1.35), y: Math.round(game.config.height / 1.422) },
            { x: Math.round(game.config.width / 1.661), y: Math.round(game.config.height / 1.6) },
            { x: Math.round(game.config.width / 1.687), y: Math.round(game.config.height / 1.745) },
            { x: Math.round(game.config.width / 1.861), y: Math.round(game.config.height / 1.92) }
        ];
        this.tweenPos5 = [
            { x: Math.round(game.config.width / 2), y: (Math.round(game.config.height) + 172) },
            { x: Math.round(game.config.width / 2.116), y: Math.round(game.config.height / 1.097) },
            { x: Math.round(game.config.width / 1.93), y: Math.round(game.config.height / 1.239) },
            { x: Math.round(game.config.width / 1.861), y: Math.round(game.config.height / 1.422) },
            { x: Math.round(game.config.width / 1.8), y: Math.round(game.config.height / 1.6) },
            { x: Math.round(game.config.width / 1.861), y: Math.round(game.config.height / 1.745) },
            { x: Math.round(game.config.width / 2), y: Math.round(game.config.height / 1.92) }
        ];
        this.tweenPos4 = [
            { x: -Math.round(game.config.width / 4), y: (Math.round(game.config.height) + 172) },
            { x: Math.round(game.config.width / 5.4), y: Math.round(game.config.height / 1.097) },
            { x: Math.round(game.config.width / 4.5), y: Math.round(game.config.height / 1.239) },
            { x: Math.round(game.config.width / 2.7), y: Math.round(game.config.height / 1.422) },
            { x: Math.round(game.config.width / 2.57), y: Math.round(game.config.height / 1.6) },
            { x: Math.round(game.config.width / 2.4), y: Math.round(game.config.height / 1.745) },
            { x: Math.round(game.config.width / 2.16), y: Math.round(game.config.height / 1.92) }
        ];
        this.tweenPos3 = [
            { x: (Math.round(game.config.width) + 300), y: -Math.round(game.config.height / 12) },
            { x: Math.round(game.config.width / 1.2), y: Math.round(game.config.height / 19.2) },
            { x: Math.round(game.config.width / 1.27), y: Math.round(game.config.height / 7.67) },
            { x: Math.round(game.config.width / 1.35), y: Math.round(game.config.height / 4.8) },
            { x: Math.round(game.config.width / 1.317), y: Math.round(game.config.height / 3.49) },
            { x: Math.round(game.config.width / 1.44), y: Math.round(game.config.height / 2.741) },
            { x: Math.round(game.config.width / 1.83), y: Math.round(game.config.height / 2.133) }
        ];
        this.tweenPos2 = [
            { x: Math.round(game.config.width / 2), y: -Math.round(game.config.height / 12) },
            { x: Math.round(game.config.width / 2.16), y: Math.round(game.config.height / 19.2) },
            { x: Math.round(game.config.width / 2), y: Math.round(game.config.height / 7.67) },
            { x: Math.round(game.config.width / 1.8), y: Math.round(game.config.height / 4.8) },
            { x: Math.round(game.config.width / 1.962), y: Math.round(game.config.height / 3.49) },
            { x: Math.round(game.config.width / 2.16), y: Math.round(game.config.height / 2.741) },
            { x: Math.round(game.config.width / 1.93), y: Math.round(game.config.height / 2.133) }
        ];
        this.tweenPos1 = [
            { x: -Math.round(game.config.width / 6), y: -Math.round(game.config.height / 12) },
            { x: Math.round(game.config.width / 10.8), y: Math.round(game.config.height / 19.2) },
            { x: Math.round(game.config.width / 3.6), y: Math.round(game.config.height / 7.67) },
            { x: Math.round(game.config.width / 2.84), y: Math.round(game.config.height / 4.8) },
            { x: Math.round(game.config.width / 3), y: Math.round(game.config.height / 3.49) },
            { x: Math.round(game.config.width / 2.25), y: Math.round(game.config.height / 2.741) },
            { x: Math.round(game.config.width / 2.16), y: Math.round(game.config.height / 2.133) }
        ];

        this.CreateObstacle();

        // this.CreateBall("blue_egg", "blue");
        // this.CreateBall("yellow_egg", "yellow");

        // console.log("ball array: ", this.obstacleArray);
        // var sel = this.SearchAvailabilityBall();
        // console.log("selcted bal: ", sel);
    }

    CreateObstacle() {
        this.obstacle = this.physics.add.sprite(-100, -100, "blue_egg").setScale(scaleFactor, scaleFactor);
        this.obstacle.setVisible(false);
    }

    // CreateBall(_imageName, _keyName) {
    //     for (var i = 0; i < 5; i++) {
    //         var ball = this.physics.add.sprite(-100, -100, _imageName).setScale(scaleFactor, scaleFactor);
    //         ball.name = _keyName;
    //         ball.setVisible(false);
    //         this.obstacleArray.push(ball);
    //     }
    // }

    // SearchAvailabilityBall() {
    //     var selectedBall;
    //     for (var i = 0; i < this.obstacleArray.length; i++) {
    //         if (this.obstacleArray[i].visible == false) {
    //             selectedBall = this.obstacleArray[i];
    //             break;
    //         }
    //     }
    //     return selectedBall;
    // }

    // MoveSelectedBall() {
    //     this.tweens.add({
    //         targets: this.path,
    //         t: 1,
    //         ease: 'Sine.easeInOut',
    //         duration: this.obstacleMovementSpeed,
    //         callbackScope: this,
    //         onComplete: function(tween) {
    //             if (this.obstacleMovementSpeed > 1000) {
    //                 this.obstacleMovementSpeed -= 50;
    //             } else {}
    //             console.log("ballMovementSpeed: " + this.obstacleMovementSpeed);
    //         }
    //     });
    // }

    // ResetBallPosition() {

    // }

    SetRandomPositionOfObstacle() {
        if (!this.isGameOver && this.willStartGame) {
            var random = this.GetRandomNumber(0, 6);
            var pointsArray;
            switch (random) {
                case 0:
                    pointsArray = this.tweenPos1;
                    break;
                case 1:
                    pointsArray = this.tweenPos2;
                    break;
                case 2:
                    pointsArray = this.tweenPos3;
                    break;
                case 3:
                    pointsArray = this.tweenPos4;
                    break;
                case 4:
                    pointsArray = this.tweenPos5;
                    break;
                case 5:
                    pointsArray = this.tweenPos6;
                    break;
            }

            var graphics = this.add.graphics();
            this.path = { t: 0, vec: new Phaser.Math.Vector2() };

            this.curve = new Phaser.Curves.Spline(pointsArray);

            // graphics.clear();
            // graphics.lineStyle(5, 0xffffff, 1);
            // this.curve.draw(graphics, 64);
            // graphics.fillStyle(0x00ff00, 1);

            var rnd = this.GetRandomNumber(0, 2);
            if (rnd == 0) {
                var imageName = "blue_egg";
                var imageKeyName = "blue";
            } else {
                var imageName = "yellow_egg";
                var imageKeyName = "yellow";
            }
            this.obstacle.setTexture(imageName);
            this.obstacle.name = imageKeyName;
            this.obstacle.setVisible(true);
            this.obstacle.enableBody(true, true);
            this.RotateObstacle(this.obstacle);

            this.MoveBall();
        }
    }

    MoveBall() {
        this.tweens.add({
            targets: this.path,
            t: 1,
            ease: 'Sine.easeInOut',
            duration: this.obstacleMovementSpeed,
            callbackScope: this,
            onComplete: function(tween) {
                if (this.obstacleMovementSpeed > 500) {
                    this.obstacleMovementSpeed -= 50;
                } else {}
            }
        });
    }

    //######################################################################################
    RotateObstacle(_obstacle) {
        var rotateTween = this.tweens.addCounter({
            targets: [_obstacle],
            from: 0,
            to: 360,
            duration: 2000,
            repeat: -1,
            onUpdate: function(tween) {
                _obstacle.setAngle(rotateTween.getValue());
            }
        });
    }

    CollisionCheckWithObstacle() {
        this.physics.add.overlap(this.player1, this.obstacle, this.GetResult, null, this);
        this.physics.add.overlap(this.player2, this.obstacle, this.GetResult, null, this);
    }

    GetResult(_player, _obstacle) {
        if (!this.isGameOver) {
            _obstacle.disableBody(true, true);
            _obstacle.visible = false;
            if (_player.name == _obstacle.name) {
                this.IncrementScore();
            } else {
                this.cameras.main.shake(200);
                this.GameOver();
            }
        }
    }

    //######################################################################################


    //######################################################################################
    IncrementScore() {
        this.score++;
        this.scoreText.text = this.score;
    }

    //######################################################################################
    GameOver() {
        if (!this.isGameOver) {
            this.isGameOver = true;
            this.gameplayBg.disableInteractive();
            this.obstacleTimedEvent.remove();
            this.obstacle.destroy();
            this.path = { t: 0, vec: new Phaser.Math.Vector2() };
            setTimeout(() => {
                this.gameOverPopup.CreateGameOverPopup(this.score);
            }, 300);
        }
    }

    //########################################################################################

    update(t, dt) {
        if (!this.isGameOver && this.curve != null) {
            this.curve.getPoint(this.path.t, this.path.vec);
            this.obstacle.setPosition(this.path.vec.x, this.path.vec.y);
        }
    }


}