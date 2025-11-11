
/* eslint-disable indent */

export class AdSDK {
    // constructor({ gameId, zoneId, accountId, injectionElementId }) {
    constructor({ injectionElementId, apiKey }) {
        // this.options = {
        //     gameId,
        //     zoneId,
        //     accountId,
        //     injectionElementId,
        //     adStatusCallbackFn: this._handleAdStatus.bind(this),
        //     adErrorCallbackFn: this._handleAdError.bind(this),
        // };
        this.options = {
            injectionElementId,
            apiKey,
            adStatusCallbackFn: this._handleAdStatus.bind(this),
            adErrorCallbackFn: this._handleAdError.bind(this),
        };
        this.application = null;
        this.statusListeners = [];
        this.errorListeners = [];

        this.initialize();
    }

    initialize() {
        if (typeof window.Application !== 'function') {
            console.error('AdSdk: Applixir SDK not loaded yet.');
            return;
        }
        try {
            this.application = new Application(this.options);
            console.log('AdSdk: Application initialized', this.application);
            this.application.initialize();
        } catch (error) {
            console.error('AdSdk: Failed to initialize Applixir Application', error);
        }
    }

    showAd() {
        if (!this.application) {
            console.error('AdSdk: Application not initialized.');
            return;
        }
        console.log('AdSdk: Showing ad', this.application);
        this.application.openPlayer();
    }

    onStatus(callback) {
        if (typeof callback === 'function') {
            this.statusListeners.push(callback);
        }
    }

    onError(callback) {
        if (typeof callback === 'function') {
            this.errorListeners.push(callback);
        }
    }

    _handleAdStatus(status) {
        console.log('AdSdk: Ad status -', status);
        this.statusListeners.forEach((cb) => cb(status));
    }

    _handleAdError(error) {
        const errorMsg = error?.getError?.()?.data || error?.message || String(error);
        console.error('AdSdk: Error -', errorMsg);
        this.errorListeners.forEach((cb) => cb(errorMsg));
    }
}

