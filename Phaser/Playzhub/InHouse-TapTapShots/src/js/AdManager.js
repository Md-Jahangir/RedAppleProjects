// import { PlayzhubEventHandler } from "./PlayzhubEventHandler";
import { PlayzhubEventHandler } from "./PlayzhubEventHandler";

export default class AdManager {
    static instance = null;

    constructor() {
        if (AdManager.instance) {
            return AdManager.instance;
        }

        this.eventEmitter = new Phaser.Events.EventEmitter();
        this.isInitialized = false;

        AdManager.instance = this;
    }

    static getInstance() {
        if (!AdManager.instance) {
            AdManager.instance = new AdManager();
        }
        return AdManager.instance;
    }

    init() {
        if (this.isInitialized) return;

        // Hook into SDK only once
        PlayzhubEventHandler.AdStarted(() => {
            this.eventEmitter.emit("AdStarted");
        });

        PlayzhubEventHandler.AdCompleted(() => {
            this.eventEmitter.emit("AdCompleted");
        });

        this.isInitialized = true;
    }

    onAdStarted(callback) {
        this.init();
        this.eventEmitter.on("AdStarted", callback);
    }

    onAdCompleted(callback) {
        this.init();
        this.eventEmitter.on("AdCompleted", callback);
    }

    async RequestAdAsync(timeoutMs = 1000, onAdCompleteCallback) {
        this.init();

        return new Promise((resolve) => {
            let started = false;
            let finished = false;
            let timeoutId;

            const startedCallback = () => {
                started = true;
            };

            const completedCallback = () => {
                cleanup();
                resolve();
            };

            const cleanup = () => {
                if (finished) return;
                finished = true;

                if (onAdCompleteCallback) {
                    onAdCompleteCallback();
                }
                clearTimeout(timeoutId);
                this.eventEmitter.off("AdStarted", startedCallback);
                this.eventEmitter.off("AdCompleted", completedCallback);
            };

            timeoutId = setTimeout(() => {
                if (!started) {
                    cleanup();
                    resolve();
                }
            }, timeoutMs);

            this.eventEmitter.on("AdStarted", startedCallback);
            this.eventEmitter.on("AdCompleted", completedCallback);

            PlayzhubEventHandler.RequestAD();
        });
    }
}


