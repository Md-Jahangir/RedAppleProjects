export default class SoundGroup {
    constructor(name) {
        this._name = name;
        this._muted = false;
        this._volume = 1;
        this._sounds = [];
    }

    addSound(sound, alias) {
        let soundData = {sound: sound, alias: alias};
        soundData.sound.muted = this.muted;
        soundData.sound.volume *= this.volume;
        soundData.sound.instances[0].on('end', (event) => {
            this._onSoundEnd(soundData);
        }, this);
        this._sounds.push(soundData);
    }

    getSound(alias) {
        return this._sounds.find((soundData)=>{
            return soundData.alias === alias;
        });
    }

    _onSoundEnd(soundData) {
        let index = this._sounds.indexOf(soundData);
        if(index !== -1) {
            this._sounds.splice(index, 1);
        }
        //soundData.sound.destroy();
    }

    switchMuted() {
        this.muted = !this.muted;
    }

    destroy() {

    }

    get muted() {
        return this._muted;
    }

    set muted(value) {
        this._muted = value;
        this._sounds.forEach((soundData) => {
            soundData.sound.muted = this.muted;
        });
    }

    get volume() {
        return this._volume;
    }

    set volume(value) {
        this._volume = value;
        this._sounds.forEach((soundData) => {
            soundData.sound.volume = this.volume;
        });
    }

    get sounds() {
        return this._sounds;
    }

    get name() {
        return this._name;
    }
}