/* eslint-disable no-console */
/* eslint-disable indent */
/* global navigator, window,console,JSBridge */
class GameAnalyticsSDK {
    constructor() {
        this.listeners = {};
        this.setupMessageListener();
    };

    getMobileOperatingSystem() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/android/i.test(userAgent)) {
            return 'Android';
        }
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return 'iOS';
        }
        return 'Browser';
    };

    sendMessageForAnalytics(eventName, message) {
        const os = this.getMobileOperatingSystem();
        const data = JSON.stringify(message);

        switch (os) {
            case 'Android':
                try {
                    console.log(`Android - ${eventName} called`, data);
                    window.parent.postMessage({ eventName, data }, '*');
                    JSBridge[eventName](data);
                } catch (error) {
                    console.error(`Android JS Bridge error: ${error}`);
                }
                break;

            case 'iOS':
                try {
                    console.log(`iOS - ${eventName} called`, data);
                    window.parent.postMessage({ eventName, data }, '*');
                    const postData = { [eventName]: data };
                    window.webkit.messageHandlers.jsHandler.postMessage(JSON.stringify(postData));
                } catch (error) {
                    console.error(`iOS JS Bridge error: ${error}`);
                }
                break;

            default:
                try {
                    console.log(`Browser - ${eventName} called`, data);
                    window.parent.postMessage({ eventName, data }, '*');
                } catch (error) {
                    console.error(`Browser JS Bridge error: ${error}`);
                }
        }
    };

    emit(eventName, payload) {
        console.log(`${eventName} =====> ${JSON.stringify(payload)}`);
        this.sendMessageForAnalytics(eventName, payload);
    };

    listen(eventName, callback) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(callback);
    };

    trigger(eventName, payload) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach(callback => callback(payload));
        }
    };

    setupMessageListener() {
        window.addEventListener('message', (event) => {
            // console.log('message listener sdk:: ', event);
            const { eventName, data } = event.data || {};
            if (eventName && this.listeners[eventName]) {
                this.trigger(eventName, data);
            }
        });
    };
};

// Export an instance of the SDK
export const GameAnalytics = new GameAnalyticsSDK();
