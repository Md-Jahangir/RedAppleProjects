class Audiomanager {
    constructor() {
        this.click = null;
        this.carSound = null;
        this.carCrash = null;
    }
    CreateClickSound() {
        let volumeIncrease = 5;
        this.click = game.sound.add('click');
        this.click.play();
        this.click.volume = 5;
    }
    CreateSounds() {
        this.carSound = game.sound.add('vroom');
        this.carCrash = game.sound.add('crash');
    }
    PlayCarEngineSound() {
        this.carSound.play();
        this.carSound.loop = true;
        this.carSound.rate = 0.2;
        this.carCrash.volume = 5
    }
    PlayCarCrashSound() {
        this.carCrash.play();
        this.carCrash.volume = 5;
    }
    StopCarEngineSound() {
        this.carSound.loop = false;
        this.carSound.stop();
    }
}
let audio = new Audiomanager();

export { audio as Audiomanager };
