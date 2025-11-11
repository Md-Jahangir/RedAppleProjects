class PlayzhubSDk_E6 {
    private listeners: Record<string, ((payload: any) => void)[]>;

    constructor() {
        this.listeners = {};
        this.setupMessageListener();
    };

    private getMobileOperatingSystem(): string {
        const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

        if (/android/i.test(userAgent)) {
            return "Android";
        }
        if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
            return "iOS";
        }
        return "Browser";
    };

    private sendMessageForAnalytics(eventName: string, message: any): void {
        const os = this.getMobileOperatingSystem();
        const data = JSON.stringify(message);
        switch (os) {
            case "Android":
                try {
                    console.log(`Android - ${eventName} called`, data);
                    window.parent.postMessage({ eventName, data }, '*');
                    if ((window as any).flutter_inappwebview) {
                        (window as any).flutter_inappwebview.callHandler('playzhubsdk_event_handler', eventName, data);
                    } else {
                        (window as any).JSBridge[eventName](data);
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

                    if ((window as any).flutter_inappwebview) {
                        (window as any).flutter_inappwebview.callHandler('playzhubsdk_event_handler', eventName, data);
                    } else {
                        (window as any).webkit.messageHandlers.jsHandler.postMessage(data);
                    }
                } catch (error) {
                    console.error(`iOS JS Bridge error: ${error}`);
                }
                break;
            case "Browser":
                try {
                    console.log(`Browser - ${eventName} called`, data);
                    window.parent.postMessage({ eventName, data }, '*');
                    if ((window as any).flutter_inappwebview) {
                        (window as any).flutter_inappwebview.callHandler('playzhubsdk_event_handler', eventName, data);
                    }
                } catch (error) {
                    console.error(`Browser JS Bridge error: ${error}`);
                }
                break;

            default:
                try {
                    console.log(`Default - ${eventName} called`, data);
                    window.parent.postMessage({ eventName, data }, '*');
                    if ((window as any).flutter_inappwebview) {
                        (window as any).flutter_inappwebview.callHandler('playzhubsdk_event_handler', eventName, data);
                    }
                } catch (error) {
                    console.error(`Default JS Bridge error: ${error}`);
                }
        }
    };

    emitEvent(eventName: string, payload: any): void {
        console.log(`Emit event: ${eventName} =====> ${JSON.stringify(payload)}`);
        this.sendMessageForAnalytics(eventName, payload);
    };

    listen(eventName: string, callback: (payload: any) => void): void {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push((payload: any) => {
            try {
                const parsedData = typeof payload === "string" ? JSON.parse(payload) : payload;
                callback(parsedData);
            } catch (error) {
                console.error(`Error parsing data for event "${eventName}":`, error);
            }
        });
        console.log(`Listener added for event: ${eventName}`);
    };

    private trigger(eventName: string, payload: any): void {
        console.log(`Triggering event: ${eventName}`, payload);
        // Ensure that the payload is parsed correctly
        try {
            payload = typeof payload === 'string' ? JSON.parse(payload) : payload;
        } catch (error) {
            console.error(`Error parsing payload for event ${eventName}:`, error);
            return;
        }
        if (this.listeners?.[eventName]) {
            this.listeners[eventName].forEach((callback: (data: any) => void) => callback(payload));
        }
    };

    private setupMessageListener(): void {
        window.addEventListener("message", (event: MessageEvent) => {
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
