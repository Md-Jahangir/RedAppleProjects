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

    async requestAdAsync() {
        this.init();

        return new Promise((resolve) => {
            const completedCallback = () => {
                this.eventEmitter.off("AdCompleted", completedCallback); // cleanup
                resolve();
            };

            this.eventEmitter.on("AdCompleted", completedCallback);

            PlayzhubEventHandler.RequestAD();
        });
    }
}


