import { Constant } from "../Constant";
import { AudioManager } from "../media/AudioManager";
import gsap from "gsap";

class Player {
    constructor(scene, playerNum, playerposData, gameboard) {
        this.scene = scene;
        this.pawn = null;
        this.playerNum = playerNum;
        this.playerposData = playerposData;//-450,200 //450,200
        this.gameboard = gameboard;
        this.finalXPos = null;
        this.finalYPos = null;
        this.alarmTween = null;
        this.shiftFrameX = this.playerposData.shiftFrameX;
        this.pfpFrameXPos = this.playerposData.pfpFrameXPos;
        this.castleShiftX = this.playerposData.castleShiftX;
        this.turnBaseShiftX = this.playerposData.turnBaseShiftX;
        this.turnTxtShiftX = this.playerposData.turnTxtShiftX;

        this.baseShift = this.playerposData.baseShift;
        this.shiftPlayerNameX = this.playerposData.shiftPlayerNameX;
        this.shiftPawn = this.playerposData.shiftPawn;

        if (this.playerNum === 1) {
            this.playerposData.names.sort(() => Math.random() - 0.5);
            this.playerName = this.playerposData.names[Phaser.Math.Between(0, this.playerposData.names.length - 1)];
            this.turnText = this.playerName + "'s" + " TURN";
            this.flipX = true;
            this.pfpFrameNum = Phaser.Math.Between(0, 8);
        }
        else {
            this.playerName = this.playerposData.name;
            this.turnText = "YOUR TURN";
            this.flipX = false;
            this.pfpFrameNum = Phaser.Math.Between(0, 8);
        }
        this.score = 0;
        this.lifeArr = [];

        this.CreatePlayer();
    }

    CreatePlayer() {
        this.playerUIContainer = this.scene.add.container(this.playerposData.x, (this.gameboard.y - this.gameboard.height / 2) - 245);
        this.playerPawnContainer = this.scene.add.container().setDepth(2);

        let playerBase = this.scene.add.image(0, 7, 'game_obj', 'name_base').setOrigin(0.5).setFlipX(this.flipX);
        let fontTextStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: 35, fill: '#FFFFFF', align: 'center' };
        let txt = this.playerName;
        this.playerGameName = this.scene.add.text((playerBase.x + playerBase.width / this.baseShift) + this.shiftPlayerNameX, (playerBase.y - 35), txt, fontTextStyle).setOrigin(0.5);
        this.playerGameName.setStroke('#b9bbb8', 1);
        let pfpPlaceHolder = this.scene.add.image((playerBase.width / this.pfpFrameXPos) + this.shiftFrameX, playerBase.y - 9, 'game_obj', 'picture_box').setOrigin(0.5)//.setFlipX(this.flipX);
        pfpPlaceHolder.width = 100;
        pfpPlaceHolder.height = 100;
        this.pfp = this.scene.add.sprite(pfpPlaceHolder.x, pfpPlaceHolder.y, "avatar").setOrigin(0.5);
        this.pfp.setDisplaySize(pfpPlaceHolder.width, pfpPlaceHolder.height);
        this.pfp.setFrame(this.pfpFrameNum);
        this.pfpFrame = this.scene.add.image(this.pfp.x, this.pfp.y, 'game_obj', 'picture_box_Frame').setOrigin(0.5);
        this.pfpFrame.displayWidth = 101;
        this.pfpFrame.displayHeight = 110;
        this.timer = this.scene.add.spine(playerBase.x - this.castleShiftX, (playerBase.y + 155), 'timer_data', 'timer_atlas').setOrigin(0.5);
        this.emptyTimer = this.scene.add.image(this.timer.x, this.timer.y, 'game_obj', 'timer_base').setOrigin(0.5);
        // this.timer.animationState.setAnimation(0, 'idle', true);
        this.OnTimerAnimationComplete();
        this.playerCastle = this.scene.add.image(this.timer.x - 2, this.timer.y - 25, 'game_obj', 'castle_' + this.playerNum).setOrigin(0.5);
        this.castleDoor = this.scene.add.image(this.playerCastle.x + 32.5, this.playerCastle.y + 2, 'castle_door').setOrigin(1);
        fontTextStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '35px', fill: '#ffffff', align: 'center' };
        txt = this.score;
        this.scoreTxt = this.scene.add.text(this.playerGameName.x, this.playerGameName.y + 45, txt, fontTextStyle).setOrigin(0.5);
        this.scoreTxt.setStroke('#979b94', 1);
        this.turnBase = this.scene.add.sprite(this.timer.x + this.timer.width + this.turnBaseShiftX, this.timer.y + 15, 'game_obj', 'turn_base').setOrigin(0.5).setVisible(true).setFlipX(this.flipX).setScale(0).setFlipX(this.flipX);
        fontTextStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '30px', fill: '#9b4b23', align: 'center' };
        txt = this.turnText;
        this.turnTxt = this.scene.add.text(this.turnBase.x + this.turnTxtShiftX, this.turnBase.y - 10, txt, fontTextStyle).setOrigin(0.5).setScale(0);
        this.turnTxt.setStroke('#ba8663', 1);
        this.pawn = this.scene.add.sprite(this.gameboard.x - (this.gameboard.width / 2.2) + this.shiftPawn, this.gameboard.y + this.gameboard.height / 1.9, 'player_' + this.playerNum).setOrigin(0.5);//.setScale(0.8)
        this.pawn.currBlockNum = 0;
        this.playerPawnContainer.add(this.pawn);

        this.playerUIContainer.add([playerBase, this.playerGameName, pfpPlaceHolder, this.pfp, this.pfpFrame, this.timer, this.emptyTimer, this.playerCastle, this.castleDoor, this.scoreTxt, this.turnBase, this.turnTxt]);

        this.shiftFrameX = null;
        this.pfpFrameXPos = null;
        this.castleShiftX = null;
        this.turnBaseShiftX = null;
        this.turnTxtShiftX = null;
        this.baseShift = null;
        this.shiftPlayerNameX = null;
        this.shiftPawn = null;
        this.flipX = null;
    }

    StartPlayerTimer() {
        this.timer.animationState.clearTracks();
        this.timer.animationState.setEmptyAnimations(0);
        this.timer.skeleton.setToSetupPose();
        this.timer.animationState.timeScale = 1;
        this.timer.animationState.setAnimation(0, 'timer', false);

        this.notifyTurns();
    }

    PausePlayerTimer() {
        this.timer.animationState.timeScale = 0;
    }

    ResumePlayerTimer() {
        this.timer.animationState.timeScale = 1;
    }

    OnTimerAnimationComplete() {
        this.timer.animationState.addListener({
            complete: (entry) => {
                this.scene.CheckSkipBalance();
            },
            event: (entry, event) => {
                if (event.data.name === "80percent")
                    this.scene.MakeSkipBtnInactive();
                if (event.data.name === "99percent")
                    this.scene.MakePlayerBtnsInactive();
            }
        });
    }


    PawnMoveAnimation(_block = null, _pawn = null) {
        const pawn = _pawn;
        const scene = this.scene;
        const basePos = { x: _block.x, y: _block.y - 10 };

        this.stopExistingPawnTween();

        this.movePawnTween = scene.tweens.add({
            targets: pawn,
            x: basePos.x,
            duration: 200,
            delay: 25,
            ease: 'Cubic.easeOut',
            onUpdate: t => this.animateJumpArc(t, pawn, basePos.y),
            onComplete: () => this.onPawnTweenComplete(pawn, basePos, _block)
        });
    }

    stopExistingPawnTween() {
        if (this.movePawnTween?.isPlaying()) {
            this.movePawnTween.remove();
            this.movePawnTween = null;
        }
    }

    animateJumpArc(tween, pawn, baseY) {
        const arc = Math.sin(tween.progress * Math.PI);
        pawn.y = baseY - arc * 25;
    }

    onPawnTweenComplete(pawn, basePos, block) {
        const scene = this.scene;
        this.movePawnTween = null;

        pawn.setPosition(basePos.x, basePos.y);
        pawn.currBlockNum = block.name;

        AudioManager.PlayFootStepAudio();

        if (pawn.currBlockNum < scene.tBoardBlockNum) {
            let nBlockNum = pawn.currBlockNum + 1;
            const nextBlock = scene.gameContainer.getByName(nBlockNum);
            this.runOrPause(() => this.PawnMoveAnimation(nextBlock, pawn));
        } else {
            this.runOrPause(() => scene.OnCompletingPawnMovement());
        }
    }

    runOrPause(fn) {
        const scene = this.scene;
        if (scene.isPaused) {
            scene.pausedMethods ||= [];
            if (!scene.pausedMethods.includes(fn)) {
                scene.pausedMethods.push(fn);
            }
        } else {
            fn();
        }
    }

    ShakePawn() {
        const pawn = this.pawn;
        this.finalXPos = pawn.x;
        this.finalYPos = pawn.y;
        this.pawn.setScale(1);

        this.alarmTween = gsap.timeline({ repeat: -1 });

        this.alarmTween.to(pawn, { x: '+=10', duration: 0.08, repeat: 7, yoyo: true, scale: 1.1, delay: 0.8 });
        this.alarmTween.to(pawn, { y: '-=30', duration: 0.25 }, '<');
        this.alarmTween.to(pawn, { y: '+=30', duration: 0.25 });
        this.alarmTween.to(pawn, { x: this.finalXPos, y: this.finalYPos, duration: 0.1, scale: 1 });
    }

    stopAlarmAnimation() {
        if (this.alarmTween) {
            this.alarmTween.kill();
            this.alarmTween = null;
            this.pawn.setPosition(this.finalXPos, this.finalYPos);
        }
    }

    notifyTurns() {
        this.turnAnim = gsap.to([this.turnBase, this.turnTxt], {
            scale: 1,
            ease: "bounce.out",
            duration: 0.4,
            alpha: 1,
            onComplete: () => {
                setTimeout(() => {
                    this.scene.MakeTurnChainActive();
                }, 100);
            }
        });
    }

    removeTurnNotif() {
        this.turnAnim.kill();
        this.turnAnim = null;
        this.turnAnim = gsap.to([this.turnBase, this.turnTxt], {
            scale: 0,
            ease: "power.out",
            duration: 0.4,
            alpha: 0,
            onComplete: () => {
                this.turnAnim.kill(); this.turnAnim = null;
            }
        });
    }

    leapPawn() {
        const pawn = this.pawn;
        this.leapUp = gsap.to(pawn, {
            y: pawn.y - 50,
            ease: "power2.out",
            scale: 0.8,
            duration: 0.4,
            onComplete: () => {
                this.leapDown = gsap.to(pawn, {
                    y: pawn.y + 45,
                    ease: "power2.in",
                    scale: 0,
                    duration: 0.5,
                    alpha: 0,
                    onComplete: () => {
                        this.scene.MinimizePortal();
                        this.openCastleDoor();
                        pawn.setScale(0);
                        this.leapDown.kill();
                        this.leapUp.kill();
                        this.leapUp = null;
                        this.leapDown = null;
                    }
                });
            }
        });
    }

    takePawnToCastle() {
        const temp = new Phaser.Math.Vector2();
        const pawn = this.pawn;
        this.playerCastle.getWorldTransformMatrix().transformPoint(0, 0, temp);
        const playerCastleHt = this.playerCastle.height;
        const targetLocal = pawn.parentContainer.getWorldTransformMatrix().applyInverse(temp.x, temp.y);

        pawn.setPosition(targetLocal.x, (targetLocal.y + (playerCastleHt / 2.6)));

        const pawnToHome = gsap.to(pawn, {
            ease: "power1.in",
            scale: 1,
            alpha: 0.88,
            y: (targetLocal.y - (playerCastleHt / 2.6)),
            duration: 0.4,
            onComplete: () => {
                this.closeCastleDoor();
                pawnToHome.kill();
                this.scene.DeclareWinner(1);
            }
        });
    }

    openCastleDoor() {
        const castleDoor = this.castleDoor;
        const openDoor = gsap.to(castleDoor, {
            scaleY: 0,
            duration: 0.3,
            onComplete: () => {
                openDoor.kill();
                this.takePawnToCastle();
                // this.scene.DeclareWinner(1);
            }
        });
    }

    closeCastleDoor() {
        const castleDoor = this.castleDoor;
        const closeDoor = gsap.to(castleDoor, {
            scaleY: 1,
            duration: 0.3,
            onComplete: () => {
                this.pawn.alpha = 1;
                closeDoor.kill();
                // this.scene.DeclareWinner(1);
            }
        });
    }

    ResizePlayerContainers(_newWidth, _newHeight, _newScale) {
        this.playerPawnContainer.setScale(_newScale);
        this.playerPawnContainer.setPosition(_newWidth / 2,
            _newHeight / 2);
    }
}

export default Player;