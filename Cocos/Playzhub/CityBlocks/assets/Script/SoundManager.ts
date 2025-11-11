import { _decorator, AudioClip, AudioSource, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    //#region -Fields
    public static instance: SoundManager = null;
    @property(AudioClip) audioClipArray: AudioClip[] = [];
    audioSource: AudioSource = null;
    backgroundMusic: AudioSource = null;
    isMuted: boolean = false;
    //#endregion

    //#region -onEnable
    protected onEnable(): void {
        if (SoundManager.instance == null) {
            SoundManager.instance = this;
        } else {
            // this.destroy();
        }
        this.backgroundMusic = director.getScene().getChildByName("Canvas").getChildByName("Camera").getComponent(AudioSource);
        this.PlayBackgroundMusic();
        this.audioSource = this.node.getComponent(AudioSource);
    }
    //#endregion

    //#region -Start
    start() {
        this.CheckBackgroundMusicEnable();
    }
    //#endregion

    //#region -SetMute
    SetMute(): void {
        this.isMuted ? this.isMuted = false : this.isMuted = true;
    }
    //#endregion

    //#region -CheckBackgroundMusicEnable
    CheckBackgroundMusicEnable(): void {
        this.isMuted ? this.backgroundMusic.volume = 0 : this.backgroundMusic.volume = 0.5;
    }
    //#endregion

    //#region -PlayBackgroundMusic
    PlayBackgroundMusic(): void {
        this.backgroundMusic.play();
    }
    //#endregion

    //#region -StopBackgroundMusic
    StopBackgroundMusic(): void {
        this.backgroundMusic.stop();
    }
    //#endregion

    //#region -PlayButtonSound
    PlayButtonSound(): void {
        if (!this.isMuted)
            this.audioSource.playOneShot(this.audioClipArray[1], 1);
    }
    //#endregion

    //#region -PlayBuildingPlace
    PlayBuildingPlace(): void {
        if (!this.isMuted)
            setTimeout(() => { this.audioSource.playOneShot(this.audioClipArray[0], 1); }, 150);
    }
    //#endregion

    //#region -PlayBuildingMerge
    PlayBuildingMerge(): void {
        if (!this.isMuted)
            this.audioSource.playOneShot(this.audioClipArray[3], 1);
    }
    //#endregion

    //#region -PlaySpecialCoinRecieve
    PlaySpecialCoinRecieve(): void {
        if (!this.isMuted)
            setTimeout(() => { this.audioSource.playOneShot(this.audioClipArray[4], 1); }, 150);
    }
    //#endregion

    //#region -PlayBuildingBuy
    PlayBuildingBuy(): void {
        if (!this.isMuted)
            this.audioSource.playOneShot(this.audioClipArray[5], 1.5);
    }
    //#endregion

    //#region -PlayGameEnd
    PlayGameEnd(): void {
        if (!this.isMuted)
            this.audioSource.playOneShot(this.audioClipArray[2], 1.5);
    }
    //#endregion
}


