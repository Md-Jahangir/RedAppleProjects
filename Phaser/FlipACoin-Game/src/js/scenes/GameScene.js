/********* Script_Details ************
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 23-10-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 23-10-2024
 * @Description :-Game Scene.
 ************************************/
/* global window,setTimeout,sendMessage,getMobileOperatingSystem,console */

import Phaser from 'phaser';
import { Constant } from '../Constant';
import Coin from '../Coin';
import GameOver from '../popup/GameOverPopup';
import Instructions from '../popup/InstructionPopup';
import { SoundManager } from '../SoundManager';
import { Server } from '../Server';
import GameExit from '../popup/GameExitPopup';
import PlayerProfile from '../Player';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.timeCounter = null;
    this.isGameStart = null;
    this.isGamePause = null;
    this.currentCoinArrayIndex = null;
    this.startCountdown = null;
    this.totalCoinCollected = null;
    this.coinArray = null;
    this.minSpawnPositionX = Constant.minX;
    this.minSpawnPositionY = Constant.minY;
    this.maxSpawnPositionX = Constant.maxX;
    this.maxSpawnPositionY = Constant.maxY;
    this.userProfile = null;
    this.opponentProfile = null;
    this.numberOfCoinClicked = 0;
    this.isInstructionEnds = null;
    this.currenScale = 1;
  }
  //#region -create
  create() {
    //ResizeEvent
    this.game.events.on('resize', this.Resize, this);
    this.events.once('game_over', this.OnGameOver, this);
    //Important Varable Set/Reset
    this.ResetVariables();
    //Background
    this.background = this.add.image(0, 0, 'background')
      .setOrigin(0.5);

    this.CreateProfiles();
    //GameTimer
    this.speedText = this.add.text(0, 0, 'SPEED', { fontFamily: 'CarosExtraBold', fontSize: 50, color: '#231440' })
      .setOrigin(0);
    this.timerText = this.add.text(0, 0, '', { fontFamily: 'CarosExtraBold', fontSize: 100, color: '#231440' })
      .setOrigin(0);
    this.TimerTextFormat(this.timeCounter);
    //Countdown before start game.
    this.StartCounterText = this.add.text(0, 0, `${this.startCountdown}`, { fontFamily: 'CarosExtraBold', fontSize: 500, color: '#5F2DCC' })
      .setOrigin(0.5);
    //Coins Count
    this.coinLogoText = this.add.text(0, 0, 'COINS', { fontFamily: 'CarosExtraBold', fontSize: 50, color: '#231440' });
    this.coinUIArray = [];
    for (let i = 0; i < 3; i++) {
      const coinUI = this.add.image(0, 0, 'question').setOrigin(0, 0.5);
      this.coinUIArray.push(coinUI);
    }
    //Instantiate Coin for pooling
    this.AddCoin();
    //Instruction
    this.instructionPage = new Instructions(this);
    this.instructionPage.OnButtonClick(this.OnInstructionsEnd, this);
    this.instructionPage.SetVisible(true);
    //SoundButton
    this.soundButton = this.add.image(0, 0, 'soundOn')
      .setOrigin(0.5)
      .setInteractive();

    this.soundButton.on('pointerdown', () => {
      SoundManager.SoundOnAndOff();
      if (SoundManager.isMute) {
        this.soundButton.setTexture('soundOff');
      }
      else {
        this.soundButton.setTexture('soundOn');
      }
    });
    //ExitButton
    this.exitButton = this.add.image(0, 0, 'backButton')
      .setOrigin(0.5);
    this.exitButton.setInteractive(new Phaser.Geom.Rectangle(-30, -30, 100 + this.exitButton.width, 100 + this.exitButton.height), Phaser.Geom.Rectangle.Contains);
    this.exitButton.on('pointerdown', () => {
      this.OnExitButtonClick();
    });
    //GameOverPopup
    this.gameOverPopup = new GameOver(this);
    this.gameOverPopup.OnReplayClick(this.OnReplayClicked, this);
    this.gameOverPopup.SetVisible(false);
    //GameExitPopup
    this.exitPopup = new GameExit(this);
    this.exitPopup.SetVisible(false);
    this.exitPopup.OnYesClick(this.OnExitYes, this);
    this.exitPopup.OnNoClick(this.OnExitNo, this);
    this.instructionPage.ButtonProgress(this.OnInstructionsEnd, this);

    // Register global callback for tap acknowledgments from iOS
    window.handleTapAcknowledgment = (coinNumber) => {
      console.log('[Game] Tap acknowledged:', coinNumber); // eslint-disable-line no-console
      // Could show visual feedback here if needed
    };

    // Register global callback for tap errors from iOS
    window.handleTapError = (coinNumber, error) => {
      console.error('[Game] Tap error for coin', coinNumber, error); // eslint-disable-line no-console
      // Could show error message to user
    };

    //Initial Resize call
    this.Resize(window.innerWidth, window.innerHeight);
  }
  //#endregion

  //#region -CreateProfiles
  CreateProfiles() {
    if (!Constant.isFree && Server.gameType === 'battle') {
      this.CreateUserProfile(-150, 200, false);
      this.CreateOpponentPorfile(150, 200);
      this.vsLogo = this.add.image(0, 0, 'vs');
    }
    else if (Server.gameType === 'tournament') {
      this.CreateUserProfile(0, 200, true);
      // this.practiceText = this.add.text(0, 0, 'Me', { fontFamily: 'CarosExtraBold', fontSize: 80, color: '#5F2DCC' })
      //   .setOrigin(0.5);
    } else {
      this.practiceText = this.add.text(0, 0, 'Practice', { fontFamily: 'CarosExtraBold', fontSize: 80, color: '#5F2DCC' })
        .setOrigin(0.5);
    }
  }
  //#endregion

  //#region -CreateUserProfile
  async CreateUserProfile(_x, _y, _isTounament) {
    // const userType = 'user';
    // const playerProfileData = await Server.GetUserProfileData(Server.myUserId, userType);
    if (Constant.userData) {
      this.userProfile = new PlayerProfile(this, Constant.userData, _x, _y, true, _isTounament);
      this.userProfile.Resize(window.innerWidth, window.innerHeight);
      this.userProfile.SetVisible(false);
    }
  }
  //#endregion

  //#region -CreateOpponentPorfile
  async CreateOpponentPorfile(_x, _y) {
    // let userType = '';
    // if (Server.isBot === 'false') {
    //   userType = 'user';
    // } else {
    //   userType = 'bot';
    // }
    // const opponentProfileData = await Server.GetUserProfileData(Server.opponentUserId, userType);
    if (Constant.opponentData) {
      this.opponentProfile = new PlayerProfile(this, Constant.opponentData, _x, _y, false, false);
      this.opponentProfile.Resize(window.innerWidth, window.innerHeight);
      this.opponentProfile.SetVisible(false);
    }
  }
  //#endregion

  //#region -VariableReset
  ResetVariables() {
    this.timeCounter = 0.00000;
    this.isGameStart = false;
    this.isGamePause = false;
    this.currentCoinArrayIndex = 0;
    this.startCountdown = 3;
    this.totalCoinCollected = 0;
    this.coinArray = [];
    this.numberOfCoinClicked = 0;
    this.isInstructionEnds = false;
    this.spawnPositions = Constant.gameCoordinates;
  }
  //#endregion
  //#region -StartTimer
  StartTimer(_delay, _repeat, _callback, _callbackscope) {
    this.timer = this.time.addEvent({
      delay: _delay,
      callback: _callback,
      callbackScope: _callbackscope,
      repeat: _repeat
    });
  }
  //#endregion
  //#region -StartCallback
  StartCallback() {
    this.isGameStart = true;
    this.StartCounterText.setVisible(false);

    // Send tap 0 to mark game ready (timer starting)
    // Retry if sessionToken not ready yet (race condition with session API)
    this.SendTapEventWithRetry(0);

    // Increment index so first clickable coin is at index 1 (for tap 1)
    this.currentCoinArrayIndex = 1;

    SoundManager.PlayStartWhistleSound();
    SoundManager.PlayBackgroundMusic();
    this.SpawnCoinAtScreen(this.currentCoinArrayIndex);
  }
  //#endregion
  //#region -update
  update(_time, _deltaTime) {
    if (this.isGameStart && !this.isGamePause) {
      this.timeCounter += _deltaTime;
      this.TimerTextFormat(this.timeCounter);
    }
    if (this.timeCounter >= Constant.maxTime) {
      this.events.emit('game_over');
    }
  }
  //#endregion
  //#region -TimerTextFormat
  TimerTextFormat(_time) {
    const seconds = (_time / 1000).toFixed(5);
    // const milliseconds = (_time % 1000) * 10;
    this.timerText.setText(`${seconds}s`);
    // this.timerText.setText(`${seconds}:${milliseconds.toFixed(0)}s`);
  }
  //#endregion
  //#region -AddCoin
  AddCoin() {
    this.anims.create({
      key: 'rotate',
      frames: this.anims.generateFrameNumbers('coinSheet', { start: 0, end: 26 }),
      frameRate: 30,
      repeat: 1
    });

    for (let i = 0; i < Constant.NUMBEROFCOINS; i++) {
      const coin = new Coin(this);
      coin.OnClick(this.OnCoinClicked, this);
      this.coinArray.push(coin);
    }
  }
  //#endregion
  //#region -OnCoinClicked
  OnCoinClicked(_object) {
    if (this.isGameStart && this.currentCoinArrayIndex >= 1 && this.currentCoinArrayIndex < 4) {
      this.numberOfCoinClicked++;
      const coinObject = _object;
      coinObject.DisableInteractive();
      coinObject.PlayAnimation();

      // currentCoinArrayIndex now represents the actual coin number (1, 2, 3)
      // since we incremented it to 1 after auto-sending tap 0
      const coinNumber = this.currentCoinArrayIndex;

      // Send tap event to Android/iOS via JSBridge (server-authoritative scoring)
      this.SendTapEvent(coinNumber);

      setTimeout(() => {
        // coinObject.StopAnimation();
        // Save the clicked coin's index BEFORE incrementing
        const clickedCoinIndex = this.currentCoinArrayIndex;

        this.currentCoinArrayIndex < this.coinArray.length - 1 ? this.currentCoinArrayIndex++ : this.currentCoinArrayIndex = 0;
        SoundManager.PlayCoinCollectSound();
        this.totalCoinCollected++;

        // Use the clicked coin's index (not the incremented one) to determine animation target
        if (clickedCoinIndex <= this.coinUIArray.length) {
          const targetCoinIndex = this.coinUIArray.length - clickedCoinIndex;
          coinObject.CoinCollectAnimation(this.coinUIArray[targetCoinIndex]);
          setTimeout(() => {
            this.coinUIArray[targetCoinIndex].setTexture('coinUI');
            this.add.tween({
              targets: this.coinUIArray[targetCoinIndex],
              scaleX: 1,
              scaleY: 1,
              duration: 200,
              ease: 'back.easeIn',
              onStart: () => {
                this.coinUIArray[targetCoinIndex].setScale(1.5);
              },
              repeat: 0,
              yoyo: false,
            });
            this.SpawnCoinAtScreen(this.currentCoinArrayIndex);

            // Call OnGameComplete after coin animation finishes
            if (this.currentCoinArrayIndex === 4) {
              this.OnGameComplete();
            }
          }, 450);
        } else {
          // No coin UI animation, complete immediately
          if (this.currentCoinArrayIndex === 4) {
            this.OnGameComplete();
          }
        }
      }, 350);
    }
  }
  //#endregion
  //#region -SpawnCoinAtScreen
  SpawnCoinAtScreen(_index) {
    if (_index >= 1 && _index < 4) {
      this.coinArray[_index].SetVisible(true);
      let x;
      let y;
      if (Constant.gameCoordinates) {
        // Use _index - 1 because spawnPositions array is 0-indexed [0,1,2]
        // but coin numbers are 1-indexed [1,2,3]
        const coordIndex = _index - 1;
        const coord = this.spawnPositions[coordIndex];
        console.log(`[Coin ${_index}] Raw coord [${coordIndex}]:`, coord); // eslint-disable-line no-console
        console.log(`[Coin ${_index}] currenScale: ${this.currenScale}`); // eslint-disable-line no-console
        x = coord.x * this.currenScale;
        y = coord.y * this.currenScale;
        console.log(`[Coin ${_index}] Final position: (${x}, ${y})`); // eslint-disable-line no-console
        console.log(`[Coin ${_index}] Screen size: ${window.innerWidth}x${window.innerHeight}`); // eslint-disable-line no-console
      } else {
        x = (Phaser.Math.Between(this.minSpawnPositionX, this.maxSpawnPositionX));
        y = (Phaser.Math.Between(this.minSpawnPositionY, this.maxSpawnPositionY));
      }
      this.coinArray[_index].SetPosition(x, y);
    }
  }
  //#endregion
  //#region -OnReplayClicked
  OnReplayClicked() {
    SoundManager.PlayButtonClickSound();
    setTimeout(() => {
      this.scene.stop('GameScene');
      this.scene.start('GameScene');
    }, 100);
  }
  //#endregion

  //#region -OnExitButtonClick
  OnExitButtonClick() {
    SoundManager.PlayButtonClickSound();
    this.exitPopup.SetVisible(true);
    this.isGamePause = true;

    this.userProfile?.SetVisible(false);
    this.opponentProfile?.SetVisible(false);
  }
  //#endregion

  //#region -OnExitYes
  OnExitYes() {
    // For battle games (legacy), send score when user exits
    // For tournament/league/free games (server-authoritative), no need to send - backend tracks via session
    if (!window.sessionToken) {
      this.CallTheScoreSendAPI(0, this.timeCounter);
    }
    // SoundManager.PlayGameOverPopupSound();
    SoundManager.StopBackgroundMusic();
    SoundManager.OnPlayerExit();
  }
  //#endregion

  //#region -OnExitNo
  OnExitNo() {
    this.exitPopup.SetVisible(false);
    this.isGamePause = false;

    if (this.isInstructionEnds) {
      this.userProfile?.SetVisible(true);
      this.opponentProfile?.SetVisible(true);
    }
  }
  //#endregion

  //#region -OnInstructionsEnd
  OnInstructionsEnd() {
    this.isInstructionEnds = true;
    SoundManager.PlayGameStartSound();
    SoundManager.PlayButtonClickSound();
    this.StartTimer(1000, 3, this.GameStartCountdown, this);
    this.StartTimer(3000, 0, this.StartCallback, this);
    this.instructionPage.SetVisible(false);
    this.StartCounterText.setVisible(true);
    if (this.isGamePause) {
      this.userProfile?.SetVisible(false);
      this.opponentProfile?.SetVisible(false);
    } else {
      this.userProfile?.SetVisible(true);
      this.opponentProfile?.SetVisible(true);
    }
  }
  //#endregion

  //#region -GameStartCountdown
  GameStartCountdown() {
    this.startCountdown > 0 ? this.startCountdown-- : this.startCountdown = 0;
    this.StartCounterText.setText(`${this.startCountdown}`);
  }
  //#endregion

  //#region -OnGameOver
  OnGameOver() {
    // Server.PostGameOverToParent(this.timeCounter.toFixed(0));
    // sendMessage(this.totalCoinCollected);
    // console.log("score", this.totalCoinCollected, this.timeCounter.toFixed(0));
    // console.log('timeCounter', this.timeCounter);

    setTimeout(() => {
      // this.CallTheScoreSendAPI(0);
      this.CallTheScoreSendAPI(0, 60000);
    }, 2000);
    this.isGameStart = false;
    if (this.timeCounter >= Constant.maxTime) this.timeCounter = Constant.maxTime;

    this.TimerTextFormat(this.timeCounter);
    // this.gameOverPopup.SetCoinCollectedText(`Total Coin Collected : ${this.totalCoinCollected}`);
    // this.gameOverPopup.SetVisible(true);
    // SoundManager.PlayGameOverPopupSound();
    SoundManager.StopBackgroundMusic();
  }
  //#endregion

  //#region OnGameComplete
  OnGameComplete() {
    // Server.PostGameOverToParent(this.timeCounter.toFixed(0));
    // sendMessage(this.totalCoinCollected);
    // console.log("score", this.totalCoinCollected, this.timeCounter.toFixed(0));

    this.isGameStart = false;
    if (this.timeCounter >= Constant.maxTime) this.timeCounter = Constant.maxTime;

    this.TimerTextFormat(this.timeCounter);
    // this.gameOverPopup.SetCoinCollectedText(`Total Coin Collected : ${this.totalCoinCollected}`);
    // this.gameOverPopup.SetVisible(true);
    // SoundManager.PlayGameOverPopupSound();
    SoundManager.StopBackgroundMusic();

    setTimeout(() => {
      if (window.sessionToken) {
        // Tournament/league/free game: ONLY send complete event for server-authoritative scoring
        // The backend will calculate the score and Android/iOS will wait for the response
        this.SendCompleteEvent();
      } else {
        // Battle game: send score directly via legacy format (uses socket system)
        let timer = this.timeCounter.toFixed(1);
        timer = Math.floor(timer);
        const timeTaken = Math.abs(Constant.maxTime - timer);
        this.CallTheScoreSendAPI(timeTaken, this.timeCounter);
      }
    }, 2000);
  }
  //#endregion

  //#region -CallTheScoreSendAPI
  // CallTheScoreSendAPI(score) {
  CallTheScoreSendAPI(score, time) {
    const seconds = (time / 1000).toFixed(5);
    // const milliseconds = (time % 1000) * 10;
    const scoreData = {
      score: score.toFixed(0),
      // time: `${seconds}.${milliseconds.toFixed(0)}`
      time: `${seconds}`
    };
    try {
      if (getMobileOperatingSystem() === 'Android') {
        sendMessage(JSON.stringify(scoreData));
        // sendMessage(score.toFixed(0));
      } else if (getMobileOperatingSystem() === 'iOS') {
        // const postdata = {
        //   score: score.toFixed(0),
        // };
        // const postmessage = JSON.stringify(postdata);
        // window.webkit.messageHandlers.jsHandler.postMessage(postmessage);
        window.webkit.messageHandlers.jsHandler.postMessage(JSON.stringify(scoreData));
      } else {
        // const postdata = { score: score.toFixed(0) };
        // sendMessage(JSON.stringify(postdata));
        sendMessage(JSON.stringify(scoreData));
      }
    } catch (err) {
      throw new Error(err);
    }
  }
  //#endregion

  //#region -SendTapEvent (JSBridge for server-authoritative scoring)
  SendTapEvent(coinNumber) {  
    // Only send tap events if we have a session token (tournament/league/battle game)
    if (!window.sessionToken) {
      return false;
    }

    try {
      const tapData = {
        event: 'tap',
        coin_number: coinNumber // eslint-disable-line camelcase
      };

      if (getMobileOperatingSystem() === 'Android') {
        // Android JSBridge
        if (window.JSBridge && window.JSBridge.receivedFromJS) {
          window.JSBridge.receivedFromJS(JSON.stringify(tapData));
        }
      } else if (getMobileOperatingSystem() === 'iOS') {
        // iOS JSBridge
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.jsHandler) {
          window.webkit.messageHandlers.jsHandler.postMessage(tapData);
        }
      }
      return true;
    } catch (err) {
      console.error('Error sending tap event:', err); // eslint-disable-line no-console
      return false;
    }
  }
  //#endregion

  //#region -SendTapEventWithRetry
  SendTapEventWithRetry(coinNumber, retries = 10) {
    // Try to send the tap event
    if (this.SendTapEvent(coinNumber)) {
      return; // Success
    }

    // If sessionToken not ready, retry after a short delay
    if (retries > 0) {
      setTimeout(() => {
        this.SendTapEventWithRetry(coinNumber, retries - 1);
      }, 100); // Retry every 100ms for up to 1 second
    } else {
      console.warn(`Failed to send tap ${coinNumber} after retries - sessionToken not available`); // eslint-disable-line no-console
    }
  }
  //#endregion

  //#region -SendCompleteEvent (JSBridge for server-authoritative scoring)
  SendCompleteEvent() {
    // Only send complete event if we have a session token (tournament/league/battle game)
    if (!window.sessionToken) {
      return;
    }

    try {
      const completeData = {
        event: 'complete',
        client_completion_time_ms: Math.round(this.timeCounter), // eslint-disable-line camelcase
        final_score: this.totalCoinCollected // eslint-disable-line camelcase
      };

      if (getMobileOperatingSystem() === 'Android') {
        // Android JSBridge
        if (window.JSBridge && window.JSBridge.receivedFromJS) {
          window.JSBridge.receivedFromJS(JSON.stringify(completeData));
          console.log(`[Game] Sent complete event with client time: ${Math.round(this.timeCounter)}ms`); // eslint-disable-line no-console
        }
      } else if (getMobileOperatingSystem() === 'iOS') {
        // iOS JSBridge
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.jsHandler) {
          window.webkit.messageHandlers.jsHandler.postMessage(completeData);
          console.log(`[Game] Sent complete event with client time: ${Math.round(this.timeCounter)}ms`); // eslint-disable-line no-console
        }
      }
    } catch (err) {
      console.error('Error sending complete event:', err); // eslint-disable-line no-console
    }
  }
  //#endregion

  OffsetResize(_newScale) {
    this.minSpawnPositionX = Constant.minX * _newScale;
    this.minSpawnPositionY = Constant.minY * _newScale;
    this.maxSpawnPositionX = Constant.maxX * _newScale;
    this.maxSpawnPositionY = Constant.maxY * _newScale;
  }

  //#region -Resize
  Resize(_width, _height) {
    const newScale = Constant.GetNewScale(_width, _height, Constant.DESIGNWIDTH, Constant.DESIGNHEIGHT);
    this.currenScale = newScale;
    this.background.setDisplaySize(_width, _height)
      .setPosition(_width / 2, _height / 2);

    this.speedText.setScale(newScale)
      .setPosition(50 * newScale, 400 * newScale);
    this.timerText.setScale(newScale)
      .setPosition(50 * newScale, this.speedText.y + (70 * newScale));

    this.StartCounterText.setScale(newScale)
      .setPosition(_width / 2, _height / 2);
    this.exitButton.setScale(newScale)
      .setPosition((this.exitButton.displayWidth / 2) + (80 * newScale), 200 * newScale);

    this.soundButton.setScale(newScale)
      .setPosition(_width - (80 * newScale), 200 * newScale);

    this.coinLogoText.setScale(newScale)
      .setPosition(_width - (210 * newScale), 400 * newScale);

    for (let i = 0; i < this.coinArray.length; i++) {
      this.coinArray[i].SetVisible(false);
      this.coinArray[i].Resize(_width, _height, newScale);
    }
    for (let i = this.coinUIArray.length - 1; i >= 0; i--) {
      this.coinUIArray[i].setScale(newScale)
        .setPosition(this.coinLogoText.x + (i * (70 * newScale)), this.coinLogoText.y + (100 * newScale));
    }
    this.OffsetResize(newScale);
    this.gameOverPopup.Resize(_width, _height, newScale);
    this.instructionPage.Resize(_width, _height, newScale);
    this.exitPopup.Resize(_width, _height, newScale);
    this.userProfile?.Resize(_width, _height, newScale);
    this.opponentProfile?.Resize(_width, _height, newScale);
    this.vsLogo?.setScale(newScale)
      .setPosition(_width / 2, 200 * newScale);
    this.practiceText?.setScale(newScale)
      .setPosition(_width / 2, 200 * newScale);
  }
  //#endregion
}