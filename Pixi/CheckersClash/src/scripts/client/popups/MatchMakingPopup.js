import { Constant } from "../Constant.js";
import * as PIXI from 'pixi.js';
import { Sprite, Assets, Texture, Container, Text, TextStyle } from 'pixi.js';
import ButtonTween from "../game_objects/ButtonTween.js";
import gsap from "gsap";


export default class MatchMakingPopup {
    constructor(screen, callback = null) {
        this.screen = screen;
        this.callback = callback;
        this.matchmakingContainer = null;
        this.bottomPanelContainer = null;
        this.matchTimerTxt = null;
        this.timerValues = ['3', '2', '1'];
        this.currentIndex = 0;
        this.mainInterval = null;
        this.oppoProfileImg = null; // Store reference to opponent profile image


        this.CreateMatchScreenPopup();
    }


    CreateMatchScreenPopup() {
        Constant.userFallbackFrame = Math.floor(Math.random() * 6); // 0-5
        const exclude = Constant.userFallbackFrame;
        do {
            Constant.oppoFallbackFrame = Math.floor(Math.random() * 6);
        } while (Constant.oppoFallbackFrame === exclude);


        let style = new TextStyle({
            fontFamily: 'Fredoka Bold',
            fontSize: 60,
            fill: '#7e3e08',
            wordWrap: true,
            wordWrapWidth: 800,
        });


        this.overlay = Sprite.from('match_screen');
        this.overlay.anchor.set(0.5);
        Constant.game.app.stage.addChild(this.overlay);


        this.matchmakingContainer = new Container();
        Constant.game.app.stage.addChild(this.matchmakingContainer);


        this.bottomPanelContainer = new Container();
        Constant.game.app.stage.addChild(this.bottomPanelContainer);


        const userNameBase = Sprite.from('user_base');
        userNameBase.anchor.set(0.5);
        userNameBase.position.set(-180, -110);


        const userName = new Text({
            text: 'Me',
            style: style,
        });
        userName.anchor.set(0.5);
        userName.position.set(userNameBase.x, userNameBase.y - 2.5);


        const vsImg = Sprite.from(Constant.uiAtlas.textures['VS']);
        vsImg.anchor.set(0.5);


        const userProfileBase = Sprite.from(Constant.uiAtlas.textures['Rofile left']);
        userProfileBase.anchor.set(0.5);
        userProfileBase.position.set(vsImg.x - vsImg.width / 2 + 60, vsImg.y - vsImg.height / 2 + 25);


        const userProfileImg = Sprite.from(Constant.pfpAtlas.textures[Constant.userFallbackFrame.toString()]);
        userProfileImg.anchor.set(0.5);
        userProfileImg.position.set(userProfileBase.x, userProfileBase.y);


        const oppoProfileBase = Sprite.from(Constant.uiAtlas.textures['Rofile right']);
        oppoProfileBase.anchor.set(0.5);
        oppoProfileBase.position.set(vsImg.x + vsImg.width / 2, userNameBase.y);


        // Store as class property for reel animation
        this.oppoProfileImg = Sprite.from('0');
        this.oppoProfileImg.anchor.set(0.5);
        this.oppoProfileImg.position.set(oppoProfileBase.x + 35, oppoProfileBase.y);


        const oppoNameBase = Sprite.from(Constant.uiAtlas.textures['user_base']);
        oppoNameBase.anchor.set(0.5);
        oppoNameBase.position.set(200, 135);


        const botData = Assets.get('bot_data');
        const names = botData.bot.names;
        const randomName = names[Math.floor(Math.random() * names.length)];
        Constant.botUserName = randomName;


        const oppoName = new Text({
            text: Constant.botUserName,
            style: style,
        });
        oppoName.anchor.set(0.5);
        oppoName.position.set(oppoProfileBase.x, oppoProfileBase.y + 240);


        const bottomPanelTxtBase = Sprite.from(Constant.uiAtlas.textures['match_base']);
        bottomPanelTxtBase.anchor.set(0.5);
        bottomPanelTxtBase.position.set(0, -220);


        style = new TextStyle({
            fontFamily: 'Fredoka Regular',
            fontSize: 58,
            fill: '#ffffff',
            wordWrap: true,
            wordWrapWidth: 800,
        });


        const matchStartTxt = new Text({
            text: 'Match Starting in ',
            style: style,
        });
        matchStartTxt.anchor.set(0.5);
        matchStartTxt.position.set(bottomPanelTxtBase.x - 40, bottomPanelTxtBase.y - 2.5);


        // Initialize timer text object as class property
        this.matchTimerTxt = new Text({
            text: `${this.timerValues[this.currentIndex]}..`, // two dots always
            style: style,
        });
        this.matchTimerTxt.anchor.set(0.5);
        this.matchTimerTxt.position.set(matchStartTxt.x + 270, matchStartTxt.y);


        this.matchmakingContainer.addChild(
            userNameBase, userName, oppoNameBase, oppoName, vsImg,
            userProfileBase, userProfileImg, oppoProfileBase, this.oppoProfileImg
        );
        this.bottomPanelContainer.addChild(bottomPanelTxtBase, matchStartTxt, this.matchTimerTxt);


        // Save as class properties for later reference in the countdown
        this.matchStartTxt = matchStartTxt;
        this.style58 = style;


        this.playMatchMakingReelAnimation().then(() => {
            this.startGameStartCountdown();
        });
    }


    /**
     * Plays the match-making reel animation on opponent profile image
     */
    playMatchMakingReelAnimation() {
        // Get all available profile textures for cycling
        return new Promise((resolve) => {  // Add return here!
            const textureKeys = ['0', '1', '2', '3', '4', '5'];

            this.playReelAnimation(
                this.oppoProfileImg,
                textureKeys,
                2.5,
                () => {
                    console.log('Match-making reel animation complete!');
                    resolve(); // Resolve the promise when done
                }
            );
        });
    }

    playReelAnimation(sprite, textureKeys, duration = 2.5, onComplete) {
        if (!sprite || !textureKeys || textureKeys.length === 0) {
            console.warn('Invalid sprite or textureKeys for reel animation');
            if (onComplete) onComplete();
            return;
        }

        const totalFrames = 25;
        let currentFrame = 0;
        const frameDelay = (duration * 1000) / totalFrames;

        // Store original scale for restoration
        const originalScaleY = sprite.scale.y;

        // Easing function for deceleration
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

        const animateFrame = () => {
            if (currentFrame < totalFrames) {
                const progress = currentFrame / totalFrames;
                const easedProgress = easeOutCubic(progress);

                // Cycle through textures
                const textureIndex = Math.floor(Math.random() * textureKeys.length);
                sprite.texture = PIXI.Texture.from(textureKeys[textureIndex]);

                // Add motion blur effect during fast spin
                // if (progress < 0.6) {
                //     sprite.scale.y = originalScaleY * 0.85;
                //     sprite.alpha = 0.8;
                // } else {
                //     sprite.scale.y = originalScaleY * 0.9;
                //     sprite.alpha = 0.9;
                // }

                currentFrame++;

                // Calculate delay with easing (slows down over time)
                const delay = frameDelay * (1 + easedProgress * 1.5);
                setTimeout(animateFrame, delay);

            } else {
                // Animation complete - set final texture
                sprite.texture = Constant.pfpAtlas.textures[Constant.oppoFallbackFrame.toString()];

                // Restore and add bounce effect
                gsap.timeline()
                    .to(sprite, {
                        alpha: 1,

                        duration: 0.01,
                        ease: "power2.out"
                    })
                    .to(sprite, {

                        duration: 0.02,
                        ease: "elastic.out(1, 0.4)",
                        onComplete: onComplete
                    });
            }
        };

        // Start animation with initial squash
        gsap.to(sprite.scale, {

            duration: 0.01,
            ease: "power2.in",
            onComplete: animateFrame
        });
    }


    startGameStartCountdown() {
        // Prevent multiple intervals
        if (this.mainInterval) clearInterval(this.mainInterval);


        this.currentIndex = 0;
        // If there's an existing timer text, remove it
        if (this.matchTimerTxt && this.matchTimerTxt.parent) {
            this.matchTimerTxt.parent.removeChild(this.matchTimerTxt);
        }


        // Add the first timer text
        this.matchTimerTxt = new Text({
            text: `${this.timerValues[this.currentIndex]}..`,
            style: this.style58,
        });
        this.matchTimerTxt.anchor.set(0.5);
        this.matchTimerTxt.position.set(this.matchStartTxt.x + 270, this.matchStartTxt.y);
        this.matchTimerTxt.alpha = 1;
        this.bottomPanelContainer.addChild(this.matchTimerTxt);


        // Function to perform each timer step
        const timerStep = () => {
            if (this.currentIndex < this.timerValues.length - 1) {
                const oldTxt = this.matchTimerTxt;
                gsap.to(oldTxt, {
                    y: oldTxt.y - 60,
                    alpha: 0,
                    duration: 0.3,
                    onComplete: () => {
                        if (oldTxt.parent) oldTxt.parent.removeChild(oldTxt);
                    }
                });


                // Move to next value
                this.currentIndex++;
                const newNum = this.timerValues[this.currentIndex];
                const newTxt = new Text({
                    text: `${newNum}..`,
                    style: this.style58,
                });
                newTxt.anchor.set(0.5);
                newTxt.position.set(this.matchStartTxt.x + 270, this.matchStartTxt.y + 60);
                newTxt.alpha = 0;
                this.bottomPanelContainer.addChild(newTxt);


                gsap.to(newTxt, {
                    y: this.matchStartTxt.y,
                    alpha: 1,
                    duration: 0.3,
                    onComplete: () => {
                        this.matchTimerTxt = newTxt;
                    }
                });
            } else {
                // End of countdown
                clearInterval(this.mainInterval);
                console.log("End of countdown");
                this.startGame();
            }
        };


        // Start interval for countdown
        this.mainInterval = setInterval(timerStep, 1000);
    }


    startGame() {
        this.RemoveMatchMakingPopup();
        if (this.callback)
            this.callback();
    }



    OnClickingPlayBtn() {
        this.btnTween = new ButtonTween(this, this.playBtn, null, 0.85, 0.85, this.SwitchScreen.bind(this));
    }


    RemoveMatchMakingPopup() {
        Constant.game.app.stage.removeChild(this.overlay);
        Constant.game.app.stage.removeChild(this.matchmakingContainer);
        Constant.game.app.stage.removeChild(this.bottomPanelContainer);
    }


    resizeBg() {
        this.overlay.x = Constant.game.app.screen.width / 2;
        this.overlay.y = Constant.game.app.screen.height / 2;
        if (Constant.game.app.screen.width > Constant.game.app.screen.height) {
            this.overlay.width = 1080;
            this.overlay.height = 1920;
            this.overlay.scale.set(Constant.newScale)
        }
        else {
            this.overlay.width = Constant.game.app.screen.width;
            this.overlay.height = Constant.game.app.screen.height;
            // bg.scale.set(1, 1);
        }
    }


    ResizeMatchmakingPopup() {
        let scale = Math.min(Constant.game.app.screen.width / 1080, Constant.game.app.screen.height / 1920);
        Constant.newScale = scale;
        this.resizeBg();
        this.matchmakingContainer.x = Constant.game.app.screen.width / 2;
        this.matchmakingContainer.y = Constant.game.app.screen.height / 2;
        this.matchmakingContainer.scale.set(Constant.newScale);


        this.bottomPanelContainer.x = Constant.game.app.screen.width / 2;
        this.bottomPanelContainer.y = Constant.game.app.screen.height / 1;
        this.bottomPanelContainer.scale.set(Constant.newScale);
    }
}
