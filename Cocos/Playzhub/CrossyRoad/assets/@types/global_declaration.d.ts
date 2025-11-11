declare const PlayzhubSDk: {
    emitEvent: (eventName: string, payload: Record<string, any>) => void;
    listen: (eventName: string, callback: (payload: Record<string, any>) => void) => void;
};