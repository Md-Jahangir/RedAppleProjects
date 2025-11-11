
class MuteConsole {
    static mute() {
        console.log = () => { },
            console.info = () => { },
            console.warn = () => { },
            console.debug = () => { }
    }
}

// Automatically mute on import
MuteConsole.mute();

export default MuteConsole;

