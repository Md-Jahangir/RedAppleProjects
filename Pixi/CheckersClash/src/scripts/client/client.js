/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 05-05-2025.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 12-05-2025
 * @Description :- Entry Script.
 ************************************/

import * as PIXI from 'pixi.js';
import { Assets, Sprite, Container, Text, TextStyle } from 'pixi.js';
// import Stats from 'stats.js';
import { SuperApp } from './SuperApp.js';
// import { io } from 'socket.io-client';
import '../../styles/styles.css';
import { Constant } from './Constant.js';
import LoadScreen from './screens/LoadScreen.js';
import FontFaceObserver from 'fontfaceobserver';
import { GameAnalytics } from 'gameanalytics';
/////////////////////////////
// PIXI Configuration
/////////////////////////////
PIXI.AbstractRenderer.defaultOptions.roundPixels = true; // Crisp pixels
PIXI.AbstractRenderer.defaultOptions.resolution = window.devicePixelRatio || 1; // Crisp pixels
/////////////////////////////
// Project Configuration
/////////////////////////////
// Create App
/////////////////////////////
Constant.game = new SuperApp(window.innerWidth, window.innerHeight, 'pixi-application-canvas');
console.log('Game Analytics oBj: ', GameAnalytics);
GameAnalytics.setEnabledManualSessionHandling(false); // Let GA manage sessions
GameAnalytics.setEnabledEventSubmission(true);        // Ensure events send

GameAnalytics.setEnabledInfoLog(true)
GameAnalytics.configureUserId(Constant.GAME_KEY);
GameAnalytics.initialize(Constant.GAME_KEY, Constant.SECRET_KEY);
GameAnalytics.addDesignEvent("game:boot");
// let myFlowerSuperSprite;
// let bg;
// let loadingTxt;
// let sprite;

// let progressBar;

/////////////////////////////
// Setup Stats
/////////////////////////////
// const stats = new Stats();
// stats.showPanel(0);
// stats.dom.className = 'stats-panel2';
// document.body.appendChild(stats.dom);
/////////////////////////////
// Setup Pixi JS DevTools
// https://bit.ly/pixijs-devtools
/////////////////////////////
globalThis.__PIXI_APP__ = Constant.game.app;
/////////////////////////////
// Handle App Initialize
/////////////////////////////
function onInitializeCompleted(superApp) {
    /////////////////////////////
    // Update Systems Every Frame
    /////////////////////////////
    // superApp.app.ticker.add((ticker) => {
    // stats.begin();
    // stats.end();
    // });
    const fontOne = new FontFaceObserver('Fredoka Bold');
    const fontTwo = new FontFaceObserver('Fredoka Regular');
    const fontThree = new FontFaceObserver('Fredoka Medium');
    const fontFour = new FontFaceObserver('Fredoka SemiBold');

    Assets.add({ alias: 'ui_data', src: 'assets/images/atlas/ui_data.json' });
    Assets.add({ alias: 'progress_bg', src: 'assets/images/progress_base.png' });
    Assets.add({ alias: 'progress_fill', src: 'assets/images/progress_bar.png' });
    Promise.all([
        fontOne.load(),
        fontTwo.load(),
        fontThree.load(),
        fontFour.load()
    ]).then(() => {
        const texturesPromise = Assets.load(['ui_data', 'progress_bg', 'progress_fill']);
        texturesPromise.then((resolvedTexture) => {
            Constant.uiAtlas = Assets.get('ui_data');
            new LoadScreen();
        });
    });
}
/////////////////////////////
// Handle App Error
/////////////////////////////
function onInitializeError(error) {
    console.error(`PIXI.Application.init() failed. error = ${error}`);
}
Constant.game.addListener(SuperApp.EVENT_INITIALIZE_COMPLETE, onInitializeCompleted);
Constant.game.addListener(SuperApp.EVENT_INITIALIZE_ERROR, onInitializeError);
(async () => {
    /////////////////////////////
    // Initialize App
    /////////////////////////////
    await Constant.game.init();
    /////////////////////////////
    // Optional : Connect to 
    // Socket Server (See Server.ts)
    /////////////////////////////
    // const socket = io("http://localhost:3001");
    // socket.on("connect", () => {
    //     console.log(`[Client] Connected to server with socket id = ${socket.id}`);
    // });
    // socket.on("disconnect", () => {
    //     console.log(`[Client] Disconnected from server`);
    // });
})();