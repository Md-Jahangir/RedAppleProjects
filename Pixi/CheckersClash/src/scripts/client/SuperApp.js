/********* Script_Details ************
 * @Original_Creator :- Swarnav.
 * @Created_Date :- 05-05-2025.
 * @Last_Update_By :- Swarnav.
 * @Last_Updatd_Date :- 12-05-2025
 * @Description :- Wrapper class for initializing and managing a PixiJS application.
 ************************************/

import * as PIXI from 'pixi.js';
import { EventEmitter } from 'events';
/**
 * Wrapper class for initializing and managing a PixiJS application.
 */
export class SuperApp extends EventEmitter {
    // Initialization -------------------------------
    constructor(width = 1080, height = 1920, canvasId = 'pixi-application-canvas') {
        super();
        this.width = width;
        this.height = height;
        // console.log("widthxheight", this.width, this.height);

        this.resize = () => {
            this.emit(SuperApp.EVENT_RESIZE, this);
        };
        this._canvasId = canvasId;
        this.app = new PIXI.Application();
    }
    /**
     * Initializes the PixiJS application.
     */
    async init() {
        try {
            await this.app.init({
                width: this.width,
                height: this.height,
                // backgroundColor: 0x1099bb,
                resizeTo: window,
                canvas: document.getElementById(this._canvasId),
            });
            console.log(`PIXI.Application.init() v${PIXI.VERSION} success!`);
            this.emit(SuperApp.EVENT_INITIALIZE_COMPLETE, this);
            this.setupResizeHandling();
        }
        catch (error) {
            console.error(`PIXI.Application.init() v${PIXI.VERSION} failed. error = ${error}`);
            this.emit(SuperApp.EVENT_INITIALIZE_ERROR, error);
        }
    }

    setupResizeHandling() {
        const resizeAfterDelay = () => {
            setTimeout(this.resize, 100);
        };
        /////////////////////////////
        // Observe window resize
        /////////////////////////////
        window.addEventListener('resize', this.resize);
        window.addEventListener('resize', resizeAfterDelay);
        window.addEventListener('orientationchange', this.resize);
        window.addEventListener('orientationchange', resizeAfterDelay);
        this.resize(); // Initial resize
    }
}
// Constants ------------------------------------
SuperApp.EVENT_INITIALIZE_COMPLETE = 'initializeComplete';
SuperApp.EVENT_INITIALIZE_ERROR = 'initializeError';
SuperApp.EVENT_RESIZE = 'resize';
