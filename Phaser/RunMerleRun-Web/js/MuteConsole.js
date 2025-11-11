function MuteConsole() { }

MuteConsole.mute = function () {
  console.log = function () { };
  console.info = function () { };
  console.warn = function () { };
  console.error = function () { };
  console.debug = function () { };
};

// Automatically mute on load
MuteConsole.mute();