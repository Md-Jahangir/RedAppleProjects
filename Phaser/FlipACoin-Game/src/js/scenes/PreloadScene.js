/********* Script_Details ************
 * @Original_Creator :- Amit Kumar.
 * @Created_Date :- 23-10-2024.
 * @Last_Update_By :- Amit Kumar.
 * @Last_Updatd_Date :- 23-10-2024
 * @Description :-Preload Assets.
 ************************************/

/* global window,setTimeout,document*/
import Phaser from 'phaser';
import { Constant } from '../Constant';
import FontFaceObserver from 'fontfaceobserver';
import { SoundManager } from '../SoundManager';
import { Server } from '../Server';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
    this.folder = {
      background: 'assets/images/background/',
      gameplay: 'assets/images/gameplay/',
      ui: 'assets/images/ui/',
      sound: 'assets/sounds/',
      instruction: 'assets/images/instructionPage/'
    };
    this.fonts = {
      'CarosExtraBold': null,
      'CarosMedium': null,
    };
    this.isGameLoaded = false;
  }

  //#region -Preload
  preload() {
    this.loadArray = [];
    const background = document.getElementById('background');
    const loadingBase = document.getElementById('gameStartLoadingBase');
    const loadingBar = document.getElementById('gameStartLoadingBar');
    const gameLogo = document.getElementById('gameLogo');
    this.loadArray.push(background, loadingBase, loadingBar, gameLogo);

    this.game.events.on('resize', this.Resize, this);
    // this.load.image('background', `${this.folder.background}background.png`);
    // this.load.image('gameStartLoadingBase', `${this.folder.ui}gameStartLoadingBase.png`);
    // this.load.image('gameStartLoadingBar', `${this.folder.ui}gameStartLoadingBar.png`);
    this.load.spritesheet('coinSheet', `${this.folder.gameplay}coinAnim.png`, { frameWidth: 1024 / 4, frameHeight: 1792 / 7 });
    // this.load.image('gameLogo', `${this.folder.ui}gameLogo.png`);
  }
  //#endregion

  //#region -create
  create() {
    // this.loadArray = [];
    // const background = document.getElementById('background');
    // const loadingBase = document.getElementById('gameStartLoadingBase');
    // const loadingBar = document.getElementById('gameStartLoadingBar');
    // const gameLogo = document.getElementById('gameLogo');
    // this.loadArray.push(background, loadingBase, loadingBar, gameLogo);

    for (let index = 0; index < this.loadArray.length; index++) {
      const element = this.loadArray[index];

      if (element.complete) {
        // If the image is already loaded
        this.loadHTMLImage(element);
      } else {
        // Wait for the image to load if it's not yet ready
        element.onload = () => this.loadHTMLImage(element);
      }
    }
    // this.background = this.add.image(0, 0, background.id)
    //   .setOrigin(0.5);
    // this.progressBase = this.add.image(0, 0, loadingBase.id)
    //   .setOrigin(0.5);
    // this.progressBar = this.add.image(0, 0, loadingBar.id)
    //   .setOrigin(0.5);
    this.progressText = this.add.text(0, 0, 'Loading').setVisible(false)
      .setOrigin(0.5);
    this.anims.create({
      key: 'rotateLoop',
      frames: this.anims.generateFrameNumbers('coinSheet', { start: 0, end: 26 }),
      frameRate: 30,
      repeat: -1
    });
    this.coinAnimation = this.add.sprite(0, 0, 'coinSheet');
    this.coinAnimation.play('rotateLoop', true);

    this.gameLogo = this.add.image(0, 0, this.loadArray[3].id);
    // this.gameLogo = this.add.image(0, 0, gameLogo.id);

    this.LoadFonts();
    this.Resize(window.innerWidth, window.innerHeight);
  }
  //#endregion

  loadHTMLImage(element) {
    if (!element.id) return;

    const textureKey = element.id;

    if (!this.textures.exists(textureKey)) {
      this.textures.addImage(textureKey, element);
    }

    const imageConfig = {
      background: () => {
        this.background = this.add.image(0, 0, textureKey).setOrigin(0.5);
      },
      gameLogo: () => {
        this.gameLogo = this.add.image(0, 0, textureKey);
      },
      gameStartLoadingBase: () => {
        this.progressBase = this.add.image(0, 0, textureKey).setOrigin(0.5);
      },
      gameStartLoadingBar: () => {
        this.progressBar = this.add.image(0, 0, textureKey).setOrigin(0.5);
        this.progressBar.setCrop(0, 0, 0, this.progressBar.height);
      },
    };

    if (imageConfig[textureKey]) {
      imageConfig[textureKey]();
      this.Resize(window.innerWidth, window.innerHeight);
    }
  };


  // loadHTMLImage(element) {
  //   if (element.id) {
  //     const textureKey = element.id;
  //     // Add the HTML image as a texture in Phaser
  //     if (!this.textures.exists(textureKey)) {
  //       // console.log(' texture not exists ');
  //       this.textures.addImage(textureKey, element);
  //     }
  //     if (textureKey === 'background') {
  //       this.background = this.add.image(0, 0, textureKey)
  //         .setOrigin(0.5);
  //       this.Resize(window.innerWidth, window.innerHeight);
  //     } else if (textureKey === 'gameLogo') {
  //       this.gameLogo = this.add.image(0, 0, textureKey);
  //       this.Resize(window.innerWidth, window.innerHeight);
  //     } else if (textureKey === 'gameStartLoadingBase') {
  //       this.progressBase = this.add.image(0, 0, textureKey)
  //         .setOrigin(0.5);
  //       this.Resize(window.innerWidth, window.innerHeight);
  //     } else if (textureKey === 'gameStartLoadingBar') {
  //       this.progressBar = this.add.image(0, 0, textureKey)
  //         .setOrigin(0.5);
  //       this.progressBar.setCrop(0, 0, 0, this.progressBar.height);
  //       this.Resize(window.innerWidth, window.innerHeight);
  //     }
  //     // console.log(`Texture added and displayed: ${textureKey}`);
  //   } else {
  //     // console.warn("Element does not have an ID:", element);
  //   }
  // }

  //#region -LoadFonts
  LoadFonts() {
    const propNames = Object.getOwnPropertyNames(this.fonts);
    propNames.forEach((fontName, index) => {
      const isLast = index >= propNames.length - 1;
      this.fonts[fontName] = new FontFaceObserver(fontName);
      this.fonts[fontName].load().then(this.FontLoadSuccess.bind(this, fontName, isLast), this.FontLoadError.bind(this, fontName));
    });
  }
  //#endregion

  //#region -FontLoadSuccess
  async FontLoadSuccess(_fontName, _isLastFont) {
    if (_isLastFont) {
      if (this.isGameLoaded) return;

      this.isGameLoaded = true;
      if (Server.IsUrlParamsMissing()) {
        this.scene.stop('PreloadScene');
        this.scene.start('GameError');
      } else {
        // await this.GetUserProfilePicture();
        // await this.GetOpponentUserProfilePicture();
        Constant.isFree = Server.isFree;
        Constant.isFree === 'false' || Constant.isFree === 'False' ? Constant.isFree = false : Constant.isFree = true;
        Constant.gameCoordinates = JSON.parse(Server.gameCoordinates);
        this.progressText.setStyle({ fontFamily: 'CarosExtraBold', fontSize: 40 });
        await this.LoadAssets();
      }
    }
  }
  //#endregion

  //#region -FontLoadError
  FontLoadError() {
  }
  //#endregion

  //#region -LoadAssets
  async LoadAssets() {
    this.load.on('progress', this.LoadProgress, this);
    this.load.on('complete', this.OnComplete, { scene: this.scene });

    //Images
    this.load.image('coinUI', `${this.folder.ui}coinUI.png`);
    this.load.image('quickest_win', `${this.folder.instruction}quickest_win.png`);
    this.load.image('coinLogo', `${this.folder.instruction}coinLogo.png`);
    this.load.image('backButton', `${this.folder.ui}backButton.png`);
    this.load.image('soundOn', `${this.folder.ui}soundOn.png`);
    this.load.image('soundOff', `${this.folder.ui}soundOff.png`);
    this.load.image('defaultPlayerImage', `${this.folder.ui}user1.png`);
    this.load.image('userBaseImage', `${this.folder.ui}baseImage.png`);
    this.load.image('vs', `${this.folder.ui}vs.png`);
    this.load.image('flip_a_coin_logo', `${this.folder.ui}flip_a_coin_logo.png`);
    this.load.image('question', `${this.folder.ui}question.png`);
    this.load.image('yesButtonBase', `${this.folder.ui}yesButtonBase.png`);

    //Sounds
    this.load.audio('coinCollectSound', `${this.folder.sound}coinCollectSound.mp3`);
    this.load.audio('backgroundMusic', `${this.folder.sound}backgroundMusic.mp3`);
    this.load.audio('buttonClickSound', `${this.folder.sound}buttonClickSound.mp3`);
    this.load.audio('gameOverSound', `${this.folder.sound}gameOverSound.mp3`);
    this.load.audio('gameStartWooshEffect', `${this.folder.sound}gameStartWooshEffect.mp3`);
    this.load.audio('whistlesound', `${this.folder.sound}whistlesound.mp3`);
    this.load.start();
  }
  //#endregion

  //#region -LoadProgress
  LoadProgress(_percent) {
    this.progressText.setVisible(true);
    this.progressBar.setCrop(0, 0, this.progressBar.width * _percent, this.progressBar.height);
  }
  //#endregion

  //#region -OnComplete
  async OnComplete() {
    // Skip profile loading for browser testing (no sessionToken means browser mode)
    if (!window.sessionToken) {
      // Use dummy data for browser testing
      Constant.userData = { id: Server.myUserId, name: 'Test Player' };
      Constant.opponentData = { id: Server.opponentUserId, name: 'Test Opponent' };
    } else {
      // Mobile app mode - load real profiles
      await this.scene.scene.GetUserProfilePicture();
      await this.scene.scene.GetOpponentUserProfilePicture();
    }
    SoundManager.create();
    setTimeout(() => {
      this.scene.stop('PreloadScene');
      this.scene.start('GameScene');
    }, 100);
  }
  //#endregion

  async GetUserProfilePicture() {
    const userType = 'user';
    const playerProfileData = await Server.GetUserProfileData(Server.myUserId, userType);
    if (!playerProfileData.error) {
      Constant.userData = playerProfileData.data[0];
    }
  };

  async GetOpponentUserProfilePicture() {
    let userType = '';
    if (Server.isBot === 'false') {
      userType = 'user';
    } else {
      userType = 'bot';
    }
    const opponentProfileData = await Server.GetUserProfileData(Server.opponentUserId, userType);
    if (!opponentProfileData.error) {
      Constant.opponentData = opponentProfileData.data[0];
    }
  };

  //#region -Resize
  Resize(_width, _height) {
    const newScale = Constant.GetNewScale(_width, _height, Constant.DESIGNWIDTH, Constant.DESIGNHEIGHT);
    this.background?.setDisplaySize(_width, _height)
      .setPosition(_width / 2, _height / 2);
    this.progressBase?.setScale(newScale)
      .setPosition(_width / 2, _height - (200 * newScale));
    this.progressBar?.setScale(newScale)
      .copyPosition(this.progressBase);
    this.progressText?.setScale(newScale)
      .setPosition(this.progressBase.x, this.progressBase.y);
    this.coinAnimation?.setScale(newScale * 2)
      .setPosition(_width / 2, _height / 2);
    this.gameLogo?.setScale(newScale)
      .setPosition(_width / 2, 200 * newScale);
  }
  //#endregion
}