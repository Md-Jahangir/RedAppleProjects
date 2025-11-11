class MuteConsole {
    static mute() {
        console.log = () => { };
        console.info = () => { };
        console.warn = () => { };
        console.error = () => { };
        console.debug = () => { };
    }
}

// Automatically mute on import
MuteConsole.mute();

// mute consoles

export default MuteConsole;


