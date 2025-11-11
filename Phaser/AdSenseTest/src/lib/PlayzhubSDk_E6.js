/* eslint-disable no-console */
/* eslint-disable indent */
/* global navigator, window, console, JSBridge */

class PlayzhubSDk_E6 {
    constructor() {
        this.listeners = {};
        this.setupMessageListener();
    };

    getMobileOperatingSystem() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/android/i.test(userAgent)) {
            return "Android";
        }
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            return "iOS";
        }
        return "Browser";
    };

    sendMessageForAnalytics(eventName, message) {
        const os = this.getMobileOperatingSystem();
        const data = JSON.stringify(message);

        switch (os) {
            case "Android":
                try {
                    console.log(`Android - ${eventName} called`, data);
                    window.parent.postMessage({ eventName, data }, '*');
                    if (window.flutter_inappwebview) {
                        window.flutter_inappwebview.callHandler('playzhubsdk_event_handler', eventName, data);
                    } else {
                        JSBridge[eventName](data);
                    }
                } catch (error) {
                    console.error(`Android JS Bridge error: ${error}`);
                }
                break;

            case "iOS":
                try {
                    console.log(`iOS - ${eventName} called`, data);
                    window.parent.postMessage({ eventName, data }, '*');
                    const postData = { [eventName]: data };

                    if (window.flutter_inappwebview) {
                        window.flutter_inappwebview.callHandler('playzhubsdk_event_handler', eventName, data);
                    } else {
                        window.webkit.messageHandlers.jsHandler.postMessage(JSON.stringify(postData));
                    }
                } catch (error) {
                    console.error(`iOS JS Bridge error: ${error}`);
                }
                break;

            case "Browser":
                try {
                    console.log(`Browser - ${eventName} called`, data);
                    window.parent.postMessage({ eventName, data }, '*');
                    if (window.flutter_inappwebview) {
                        window.flutter_inappwebview.callHandler('playzhubsdk_event_handler', eventName, data);
                    } else { }
                } catch (error) {
                    console.error(`Browser JS Bridge error: ${error}`);
                }
                break;

            default:
                try {
                    console.log(`Default - ${eventName} called`, data);
                    window.parent.postMessage({ eventName, data }, '*');
                    if (window.flutter_inappwebview) {
                        window.flutter_inappwebview.callHandler('playzhubsdk_event_handler', eventName, data);
                    } else { }
                } catch (error) {
                    console.error(`Default JS Bridge error: ${error}`);
                }
        }
    };

    // Emit an event to be sent to the platform
    emitEvent(eventName, payload) {
        console.log(`Emit event: ${eventName} =====> ${JSON.stringify(payload)}`);
        this.sendMessageForAnalytics(eventName, payload);
    };

    // Listen for incoming events and parse the data
    listen(eventName, callback) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push((payload) => {
            try {
                // Ensure the payload is safely parsed
                const parsedData = typeof payload === "string" ? JSON.parse(payload) : payload;
                callback(parsedData);
            } catch (error) {
                console.error(`Error parsing data for event "${eventName}":`, error);
            }
        });
        console.log(`Listener added for event: ${eventName}`);
    };

    trigger(eventName, payload) {
        console.log(`Triggering event: ${eventName}`, payload);
        // Ensure that the payload is parsed correctly
        try {
            payload = typeof payload === 'string' ? JSON.parse(payload) : payload;
        } catch (error) {
            console.error(`Error parsing payload for event ${eventName}:`, error);
        }

        // Check if any listener is attached for the eventName
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach(callback => callback(payload));
        }
    };

    // Automatically handle incoming messages from the platform
    setupMessageListener() {
        window.addEventListener("message", (event) => {
            const { eventName, data } = event.data || {};
            if (eventName && this.listeners[eventName]) {
                console.log(`Received event: ${eventName}`, data);
                // Parse the data and trigger the event
                this.trigger(eventName, data);
            }
        });
    };

}

// Export an instance of the SDK
export const PlayzhubSDk = new PlayzhubSDk_E6();
