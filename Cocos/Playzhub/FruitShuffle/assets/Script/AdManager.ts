import { EventTarget } from "cc";
import { PlayzhubEventHandler } from "./PlayzhubEventHandler";

export class AdManager {
    private static instance: AdManager;
    private eventTarget: EventTarget = new EventTarget();
    private isInitialized = false;

    static getInstance(): AdManager {
        if (!AdManager.instance) {
            AdManager.instance = new AdManager();
        }
        return AdManager.instance;
    }

    private init() {
        if (this.isInitialized) return;

        // Hook into SDK only once
        PlayzhubEventHandler.AdStarted(() => {
            this.eventTarget.emit("AdStarted");
        });

        PlayzhubEventHandler.AdCompleted(() => {
            this.eventTarget.emit("AdCompleted");
        });

        this.isInitialized = true;
    }

    onAdStarted(callback: () => void) {
        this.init();
        this.eventTarget.on("AdStarted", callback);
    }

    onAdCompleted(callback: () => void) {
        this.init();
        this.eventTarget.on("AdCompleted", callback);
    }

    async RequestAdAsync(timeoutMs = 1000, onAdCompleteCallback?: () => void): Promise<void> {
        this.init();

        return new Promise((resolve, reject) => {
            let started = false;
            let finished = false;
            let timeoutId: any;

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
                this.eventTarget.off("AdStarted", startedCallback);
                this.eventTarget.off("AdCompleted", completedCallback);
            };

            timeoutId = setTimeout(() => {
                if (!started) {
                    cleanup();
                    resolve();
                }
            }, timeoutMs);

            this.eventTarget.on("AdStarted", startedCallback);
            this.eventTarget.on("AdCompleted", completedCallback);

            PlayzhubEventHandler.RequestAD();
        });
    }
}