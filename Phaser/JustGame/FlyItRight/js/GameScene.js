import GameOverPopup from "../js/popups/GameOverPopup.js";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    init() {
        this.gameOverPopup = new GameOverPopup(this);
    }
    preload() {}

    create() {
        this.score = 0;
        this.isGameOver = false;
        this.isTouchStart = false;
        this.isAlreadyCollect = false;

        this.obsTweenGroup = [];

        this.CreateTopItem();

        this.CreatePlayer();
        this.CreatePlayerStandPlatform();
        this.CollisionCheckBetweenPlayerPlatform();

        this.obsGroup = this.physics.add.group();
        this.CreateTwoTypeObs();

        this.CreateFalseCollider();

        this.CreateUserInput();

    }

    CreateTopItem() {
        this.gameplayBg = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 2), Math.round(game.config.height / 2), "gameplay_bg", 0.5, 0.5, scaleFactor, scaleFactor);

        var scoreTextStyle = { fontFamily: 'AmericanCaptain', fontSize: '84px', fill: '#ffffff', fontStyle: 'bold', align: 'center' };
        this.scoreText = this.add.text(Math.round(game.config.width / 2), Math.round(game.config.height / 23), this.score, scoreTextStyle).setOrigin(0.5, 0.5).setScale(scaleFactor, scaleFactor);
        this.scoreText.depth = 1

        this.backButton = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 11), Math.round(game.config.height / 22), "back_button", 0.5, 0.5, scaleFactor, scaleFactor, "true", this.BackButtonPressed, this.BackButtonReleased);
        this.backButton.depth = 1

        this.soundButton = Utils.SpriteSettingsControl(this, Math.round(game.config.width / 1.091), Math.round(game.config.height / 22), "sound_on", 0.5, 0.5, scaleFactor, scaleFactor, "true", this.SoundButtonPressed, this.SoundButtonReleased);
        this.soundButton.depth = 1

        this.DefaultSoundButton();
    }

    BackButtonPressed() {
        Utils.ButtonScaleTween(this.scene.scene, this.scene.scene.backButton, scaleFactor);
        SoundManager.PlayButtonClickSound();
    }
    BackButtonReleased() {
        setTimeout(() => {
            game.scene.stop('GameScene');
            game.scene.start('TitleScene');
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
        var rnd = Math.floor(Math.random() * (_max - _min) + _min);
        return rnd;
    }

    //######################################################################################
    CreateUserInput() {
        this.gameplayBg.setInteractive();
        this.gameplayBg.on('pointerdown', function(pointer) {
            var touchX = pointer.x;
            var touchY = pointer.y;
            this.isTouchStart = true;
            this.scene.MoveThePlayer();
            this.scene.MoveObsGroupDown();
        });

        this.gameplayBg.on('pointerup', function(pointer) {
            var touchX = pointer.x;
            var touchY = pointer.y;
            this.isTouchStart = false;

        });

    }


    //######################################################################################
    CreatePlayer() {
        this.player = this.physics.add.sprite(Math.round(game.config.width / 2), Math.round(game.config.height / 1.172), "player").setScale(scaleFactor, scaleFactor).setOrigin(0.5, 0.5);
        this.player.depth = 1
        this.player.body.setGravityY(7000);
        this.player.body.setCollideWorldBounds(true);
        this.physics.world.setBounds(0, 0, game.config.width, game.config.height, false, false, true, false);
    }

    MoveThePlayer() {
        this.player.setVelocityY(-2000);
    }

    //######################################################################################

    CreatePlayerStandPlatform() {
        this.platform = this.physics.add.sprite(Math.round(game.config.width / 2), Math.round(game.config.height / 1.153), "platform").setScale(scaleFactor, scaleFactor).setOrigin(0.5, 0.5);
        this.platform.setImmovable();
        this.platform.setSize(Math.round(this.platform.width), Math.round(this.platform.height / 2.58));
        this.platform.body.offset.y = Math.round(game.config.height / 5.81);
    }

    CollisionCheckBetweenPlayerPlatform() {
        this.physics.add.collider(this.player, this.platform);
    }

    //######################################################################################
    ReCreateObs(_posY) {
        var rnd = this.GetRandomNumber(0, 2);
        if (rnd == 0) {
            var rndSpeed1 = this.GetRandomNumber(900, 1100);
            var obs1 = this.physics.add.sprite(365, _posY, "obstacle").setScale(scaleFactor, scaleFactor).setOrigin(0.5, 0.5);
            var obs2 = this.physics.add.sprite(715, _posY, "obstacle").setScale(scaleFactor, scaleFactor).setOrigin(0.5, 0.5);
            obs1.flipX = true;
            obs1.setSize(Math.round(obs1.width), 100);
            obs1.body.offset.y = 50;
            obs2.setSize(Math.round(obs2.width), 100);
            obs2.body.offset.y = 50;
            this.ObsType1Tween(obs1, obs2, rndSpeed1);
            this.obsGroup.add(obs1);
            this.obsGroup.add(obs2);
        } else {
            var rndSpeed2 = this.GetRandomNumber(600, 800);
            var obs3 = this.physics.add.sprite(350, _posY, "obstacle").setScale(scaleFactor, scaleFactor).setOrigin(0.5, 0.5);
            var obs4 = this.physics.add.sprite(960, _posY, "obstacle").setScale(scaleFactor, scaleFactor).setOrigin(0.5, 0.5);
            obs3.flipX = true;
            obs3.setSize(Math.round(obs3.width), 100);
            obs3.body.offset.y = 50;
            obs4.setSize(Math.round(obs4.width), 100);
            obs4.body.offset.y = 50;
            this.ObsType2Tween(obs3, obs4, rndSpeed2);
            this.obsGroup.add(obs3);
            this.obsGroup.add(obs4);
        }
    }

    CreateTwoTypeObs() {
        var rnd = this.GetRandomNumber(0, 2);
        for (var i = 0; i < 5; i++) {
            if (i > 0) {
                if (rnd == 0) {
                    var rndSpeed1 = this.GetRandomNumber(900, 1100);
                    var obs1 = this.physics.add.sprite(365, i * (-800) + 1000, "obstacle").setScale(scaleFactor, scaleFactor).setOrigin(0.5, 0.5);
                    var obs2 = this.physics.add.sprite(715, i * (-800) + 1000, "obstacle").setScale(scaleFactor, scaleFactor).setOrigin(0.5, 0.5);
                    obs1.flipX = true;
                    obs1.setSize(Math.round(obs1.width), 100);
                    obs1.body.offset.y = 50;
                    obs2.setSize(Math.round(obs2.width), 100);
                    obs2.body.offset.y = 50;
                    this.ObsType1Tween(obs1, obs2, rndSpeed1);
                    this.obsGroup.add(obs1);
                    this.obsGroup.add(obs2);
                } else {
                    var rndSpeed2 = this.GetRandomNumber(800, 1000);
                    var obs3 = this.physics.add.sprite(350, i * (-800) + 1000, "obstacle").setScale(scaleFactor, scaleFactor).setOrigin(0.5, 0.5);
                    var obs4 = this.physics.add.sprite(960, i * (-800) + 1000, "obstacle").setScale(scaleFactor, scaleFactor).setOrigin(0.5, 0.5);
                    obs3.flipX = true;
                    obs3.setSize(Math.round(obs3.width), 100);
                    obs3.body.offset.y = 50;
                    obs4.setSize(Math.round(obs4.width), 100);
                    obs4.body.offset.y = 50;
                    this.ObsType2Tween(obs3, obs4, rndSpeed2);
                    this.obsGroup.add(obs3);
                    this.obsGroup.add(obs4);
                }
            } else {
                var obs1 = this.physics.add.sprite(365, 1000, "obstacle").setScale(scaleFactor, scaleFactor).setOrigin(0.5, 0.5);
                var obs2 = this.physics.add.sprite(715, 1000, "obstacle").setScale(scaleFactor, scaleFactor).setOrigin(0.5, 0.5);
                obs1.flipX = true;
                obs1.setSize(Math.round(obs1.width), 100);
                obs1.body.offset.y = 50;
                obs2.setSize(Math.round(obs2.width), 100);
                obs2.body.offset.y = 50;
                this.ObsType1Tween(obs1, obs2, 1200);
                this.obsGroup.add(obs1);
                this.obsGroup.add(obs2);
            }

        }

        this.physics.add.overlap(this.player, this.obsGroup, this.OnCollideWithObsGroup, null, this);

    }
    OnCollideWithObsGroup(_ply, _obsGrp) {
        if (!this.isGameOver) {
            console.log("obs col: ", _ply);
            this.GameOver();
        }
    }

    ObsType1Tween(_image1, _image2, _speed) {
        var obsTween1 = this.tweens.add({
            targets: [_image1],
            x: _image1.x - _image1.width / 2,
            duration: _speed,
            repeat: -1,
            yoyo: true,
            callbackScope: this,
            onComplete: function(tween) {}
        });

        var obsTween2 = this.tweens.add({
            targets: [_image2],
            x: _image2.x + _image2.width / 2,
            duration: _speed,
            repeat: -1,
            yoyo: true,
            callbackScope: this,
            onComplete: function(tween) {}
        });

        this.obsTweenGroup.push(obsTween1);
        this.obsTweenGroup.push(obsTween2);
    }

    ObsType2Tween(_image1, _image2, _speed) {
        var obsTween3 = this.tweens.add({
            targets: [_image1],
            x: _image1.x - 200,
            duration: _speed,
            repeat: -1,
            yoyo: true,
            callbackScope: this,
            onComplete: function(tween) {}
        });

        var obsTween4 = this.tweens.add({
            targets: [_image2],
            x: _image2.x - 200,
            duration: _speed,
            repeat: -1,
            yoyo: true,
            callbackScope: this,
            onComplete: function(tween) {}
        });
        this.obsTweenGroup.push(obsTween3);
        this.obsTweenGroup.push(obsTween4);
    }

    MoveObsGroupDown() {
        if (this.player.y < 1200) {
            for (var i = 0; i < this.obsGroup.children.entries.length; i++) {
                this.tweens.add({
                    targets: [this.obsGroup.children.entries[i]],
                    y: this.obsGroup.children.entries[i].y + 350,
                    duration: 400,
                    callbackScope: this,
                    onComplete: function(tween) {}
                });
            }

            this.tweens.add({
                targets: [this.platform],
                y: this.platform.y + 350,
                duration: 400,
                callbackScope: this,
                onComplete: function(tween) {}
            });

            if (this.obsGroup.getLength() > 2) {
                var child = this.obsGroup.getChildren();
                var length = this.obsGroup.getLength();
                if (child[0].y > game.config.height && child[1].y > game.config.height) {
                    console.log("hide");
                    child[0].destroy();
                    child[0].destroy();
                    var ch = this.obsGroup.getChildren();
                    var ln = this.obsGroup.getLength();
                    this.ReCreateObs(ch[ln - 1].y - 700);
                }
            }

            if (this.obsGroup.getChildren()[0].y > 1500) {
                this.IncrementScore();
            }
        } else {}
    }

    CreateFalseCollider() {
        this.falseCollider = this.physics.add.sprite(Math.round(game.config.width / 2), Math.round(game.config.height + 50), "one_pixel_black").setScale(game.config.width * scaleFactor, 5 * scaleFactor).setOrigin(0.5, 0.5);
        this.physics.add.overlap(this.player, this.falseCollider, this.OnCollideWithFalseCollider, null, this);
    }

    OnCollideWithFalseCollider(_player, _falseCollier) {
        if (!this.isGameOver) {
            console.log("_player: ", _player);
            this.GameOver();
        }
    }

    //######################################################################################
    IncrementScore() {
        this.score += 1;
        this.scoreText.text = this.score;
    }

    //######################################################################################
    GameOver() {
        if (!this.isGameOver) {
            console.log("game over");
            this.isGameOver = true;
            this.gameplayBg.disableInteractive();
            this.player.body.enable = false;
            this.player.setVelocityY(0);
            this.cameras.main.shake(300);
            for (var i = 0; i < this.obsTweenGroup.length; i++) {
                this.obsTweenGroup[i].stop();
            }

            setTimeout(() => {
                this.gameOverPopup.CreateGameOverPopup(this.score);
            }, 200);

        }
    }

    //########################################################################################

    update(t, dt) {}


}