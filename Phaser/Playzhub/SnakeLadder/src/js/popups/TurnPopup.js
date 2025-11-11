import gsap from "gsap";

class TurnPopup {
    constructor(scene) {
        this.scene = scene;
        this.textTrailPool = [];
        this.textTrailIndex = 0;

        this.addTurnOverlay();
        this.createTurnPopup();
        this.createBotDice();
        this.initTextTrailPool(6);
        this.hideTurnPopup();
    }

    addTurnOverlay() {
        this.turnOverlayContainer = this.scene.add.container().setDepth(6);
        this.turnOverlay = this.scene.add.image(0, 0, 'turn_overlay')
            .setOrigin(0.5)
            .setScale(0)
            .setVisible(true);

        this.turnOverlayContainer.add(this.turnOverlay);
    }

    createTurnPopup() {
        this.turnPopupContainer = this.scene.add.container().setDepth(6);

        const fontTextStyle = {
            fontFamily: 'LuckiestGuy-Regular',
            fontSize: '90px',
            fill: '#ffffff',
            align: 'center'
        };

        this.turnNotifTxt = this.scene.add.text(
            this.turnOverlay.x - this.turnOverlay.width,
            this.turnOverlay.y,
            'YOUR TURN',
            fontTextStyle
        ).setOrigin(0.5).setVisible(true);

        this.turnPopupContainer.add(this.turnNotifTxt);
    }

    createBotDice() {
        this.botDiceContainer = this.scene.add.container().setDepth(6);

        this.botDice = this.scene.add.image(0, 0, 'game_obj', '1').setOrigin(0.5).setScale(0);
        this.botDiceContainer.add(this.botDice);
    }

    hideTurnPopup() {
        this.turnNotifTxt.setPosition(
            this.turnOverlay.x - this.turnOverlay.width,
            this.turnOverlay.y
        );
        this.turnPopupContainer.setVisible(false);
    }

    hideOverlay() {
        this.turnOverlayContainer.setVisible(false);
    }

    hideBotDice() {
        this.botDiceContainer.setVisible(false);
        this.botDice.setScale(0);
        this.botDice.setAlpha(1);
        this.botDice.setPosition(0, 0);
        this.scaleDownOverlay();
    }

    showTurnPopup() {
        this.turnPopupContainer.setVisible(true);
        this.animateTurnNotifTxt();
    }

    showOverlay() {
        this.turnOverlayContainer.setVisible(true);
        this.scaleUpOverlay();
    }

    showBotDice() {
        if (!this.scene || !this.scene.sys || !this.scene.sys.isActive()) {
            return;
        }

        this.showOverlay();
        this.botDice.setTexture('game_obj', this.scene.currDiceNum);
        this.botDiceContainer.setVisible(true);
    }

    scaleUpOverlay() {
        gsap.to(this.turnOverlay, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.15,
            ease: "none",
        });
    }

    scaleDownOverlay() {
        gsap.to(this.turnOverlay, {
            scaleX: 0,
            scaleY: 0,
            duration: 0.12,
            ease: "none",
            onComplete: () => {
                this.hideOverlay();
            }
        });
    }

    animateBotDice() {
        this.showOverlay();
        this.showBotDice();
        const showBotDice = gsap.to(this.botDice, {
            scaleY: 1,
            scaleX: 1,
            alpha: 1,
            duration: 0.5,
            ease: "elastic.out(1.2,0.5)",
            onComplete: () => {
                showBotDice.kill();
                this.toastUpBotDice();
            }
        });
    }

    clickBotDice() {
        let clickBotDice = gsap.to(this.botDice, {
            scaleX: 0.6,
            scaleY: 0.6,
            duration: 0.4,
            onComplete: () => {
                clickBotDice.kill();
                clickBotDice = null;
                this.toastUpBotDice();
            }
        });
    }

    toastUpBotDice() {
        const toastBotDice = gsap.to(this.botDice, {
            delay: 0.95,
            y: this.botDice.y - 300,
            alpha: 0,
            duration: 0.7,
            ease: "elastic.out(1,0.5)",
            onComplete: () => {
                toastBotDice.kill();
                // toastBotDice = null;
                this.hideBotDice();
                setTimeout(() => {
                    this.scene.MovePawn();
                }, 100);
            }
        });
    }

    animateTurnNotifTxt() {
        this.showOverlay();
        const timeline = gsap.timeline({
            onComplete: () => {
                this.createTextTrailGhost(() => {
                    this.scaleDownOverlay();
                    this.hideTurnPopup();
                    this.scene.CheckTurn();
                });
            }
        });

        timeline.to(this.turnNotifTxt, {
            x: 0,
            y: this.turnNotifTxt.y - 15,
            duration: 0.3,
            ease: "power2.out",
            onUpdate: () => this.createTextTrailGhost()
        });

        timeline.to(this.turnNotifTxt, {
            x: "+=100",
            duration: 1,
            ease: "linear"
        });

        timeline.to(this.turnNotifTxt, {
            x: this.turnOverlay.x + (this.turnOverlay.width * 1.5),
            duration: 0.3,
            ease: "power2.out",
            onUpdate: () => this.createTextTrailGhost()
        });
    }

    initTextTrailPool(poolSize) {
        for (let i = 0; i < poolSize; i++) {
            const ghost = this.scene.add.text(0, 0, '', {
                fontFamily: 'LuckiestGuy-Regular',
                fontSize: '90px',
                fill: '#ffffff',
                align: 'center'
            });

            ghost.setAlpha(0);
            ghost.setVisible(false);
            ghost.setActive(false);
            ghost.timeline = null;

            this.turnPopupContainer.add(ghost);
            this.textTrailPool.push(ghost);
        }
    }

    createTextTrailGhost(onComplete = null) {
        const ghost = this.textTrailPool[this.textTrailIndex];
        this.textTrailIndex = (this.textTrailIndex + 1) % this.textTrailPool.length;

        const original = this.turnNotifTxt;

        ghost.setText(original.text);
        ghost.setPosition(original.x, original.y);
        ghost.setOrigin(original.originX, original.originY);
        ghost.setRotation(original.rotation);
        this.makeGhostAppear(ghost);
        // ghost.setAlpha(0.25);
        // ghost.setScale(1);

        if (ghost.timeline) {
            ghost.timeline.kill();
            ghost.timeline = null;
        }

        ghost.timeline = gsap.timeline({
            onComplete: () => {
                ghost.setVisible(false);
                ghost.setActive(false);
                ghost.timeline.kill();
                ghost.timeline = null;

                if (typeof onComplete === 'function') {
                    onComplete();
                }
            }
        });

        ghost.timeline.to(ghost, {
            scaleX: 1.5,
            scaleY: 1.2,
            duration: 0.3,
            ease: "power1.out"
        }, 0);

        ghost.timeline.to(ghost, {
            alpha: 0,
            duration: 0.3,
            ease: "power1.out"
        }, 0);
    }

    makeGhostAppear(_obj) {
        const showGhost = gsap.to(_obj, {
            alpha: 0.25,
            scale: 1,
            // active: true,
            // visibility: true,
            ease: "power1.in",
            duration: 0.01,
            onComplete: () => {
                _obj.setActive(true);
                _obj.setVisible(true);
                showGhost.kill();
            }
        })
    }

    resizeTurnPopup(_newWidth, _newHeight, _newScale) {
        this.turnOverlayContainer.setScale(_newScale);
        this.turnOverlayContainer.setPosition(_newWidth / 2, _newHeight / 2);

        this.turnPopupContainer.setScale(_newScale);
        this.turnPopupContainer.setPosition(_newWidth / 2, _newHeight / 2);

        this.botDiceContainer.setScale(_newScale);
        this.botDiceContainer.setPosition(_newWidth / 2, _newHeight / 2);
    }
}

export default TurnPopup;
