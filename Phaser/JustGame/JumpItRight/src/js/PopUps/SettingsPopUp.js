class SettingsPopUp {
    constructor(scene) {
        this.scene = scene;
        this.SettingsPopUpContainer = null;
        this.soundCounter = 0;
        this.musicCounter = 0;
    }
    CreateSettingsPopUp() {
        this.SettingsPopUpContainer = this.scene.add.container(0, 0)

        let settingBg = this.scene.add.image(540, 960, 'Setting_bar').setOrigin(0.5).setInteractive();
        let sound = this.scene.add.image(400, 860, 'Sound').setOrigin(0.5);
        let soundonOff = this.scene.add.sprite(650, 860, 'onoff').setOrigin(0.5).setInteractive();
        let music = this.scene.add.image(400, 1060, 'Music').setOrigin(0.5);
        let musiconOff = this.scene.add.sprite(650, 1060, 'onoff').setOrigin(0.5).setInteractive();

        settingBg.on('pointerdown', this.SettingBgDown, this);
        settingBg.on('pointerup', this.SettingBgUp, this);



        soundonOff.on('pointerdown', this.OnSoundDown, this);
        soundonOff.on('pointerup', this.OnSoundUp, this);

        musiconOff.on('pointerdown', this.OnMusicDown, this);
        musiconOff.on('pointerup', this.OnMusicUp, this);

        this.SettingsPopUpContainer.add([
            settingBg,
            sound,
            soundonOff,
            music,
            musiconOff
        ])

        this.SettingsPopUpContainer.setVisible(false);
    }
    EnableSettings() {
        this.SettingsPopUpContainer.setVisible(true);
    }
    DisableSettingsPopUp() {
        this.SettingsPopUpContainer.setVisible(false);
    }
    SettingBgDown() { }
    SettingBgUp() { }
    OnSoundDown() { }
    OnSoundUp() {
        this.soundCounter += 1;
        if (this.soundCounter % 2 == 1) {
            this.SettingsPopUpContainer.list[2].setFrame(1);
        }
        else if (this.soundCounter % 2 == 0) {
            this.SettingsPopUpContainer.list[2].setFrame(0);
        }
    }
    OnMusicDown() { }
    OnMusicUp() {
        this.musicCounter += 1;
        if (this.musicCounter % 2 == 1) {
            this.SettingsPopUpContainer.list[4].setFrame(1);
        }
        else if (this.musicCounter % 2 == 0) {
            this.SettingsPopUpContainer.list[4].setFrame(0);
        }
    }
}
export default SettingsPopUp;