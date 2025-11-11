class SoundManager {
    constructor() {
        this.normalFrequency = [];
        this.advanceFrequency = [];
    };
    AddSound() {
        let tone_131 = game.sound.add('tone_131');
        let tone_146 = game.sound.add('tone_146');
        let tone_164 = game.sound.add('tone_164');
        let tone_174 = game.sound.add('tone_174');
        let tone_195 = game.sound.add('tone_195');
        let tone_220 = game.sound.add('tone_220');
        let tone_246 = game.sound.add('tone_246');

        this.normalFrequency.push(tone_131);
        this.normalFrequency.push(tone_146);
        this.normalFrequency.push(tone_164);
        this.normalFrequency.push(tone_174);
        this.normalFrequency.push(tone_195);
        this.normalFrequency.push(tone_220);
        this.normalFrequency.push(tone_246);

        let tone_261 = game.sound.add('tone_261');
        let tone_294 = game.sound.add('tone_294');
        let tone_330 = game.sound.add('tone_330');
        let tone_350 = game.sound.add('tone_350');
        let tone_392 = game.sound.add('tone_392');
        let tone_440 = game.sound.add('tone_440');
        let tone_494 = game.sound.add('tone_494');


        this.advanceFrequency.push(tone_261);
        this.advanceFrequency.push(tone_294);
        this.advanceFrequency.push(tone_330);
        this.advanceFrequency.push(tone_350);
        this.advanceFrequency.push(tone_392);
        this.advanceFrequency.push(tone_440);
        this.advanceFrequency.push(tone_494);
    };
    ReturnNormalFrequencyArray() {
        return this.normalFrequency;
    };
    ReturnAdvanceFrequencyArray() {
        return this.advanceFrequency;
    };
}

let _SoundManager = new SoundManager();

export { _SoundManager as SoundManager };
