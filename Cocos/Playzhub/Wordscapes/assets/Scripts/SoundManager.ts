import { _decorator, AudioClip, AudioSource, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    //Singleton
    public static instance: SoundManager = null;

    //References
    @property(AudioClip) audioClipArray: AudioClip[] = [];
    audioSource: AudioSource = null;
    backgroundAudioSource: AudioSource = null;

    //Local Varuiable
    isMuted: boolean = false;
    isBackgroundAudioPlaying: boolean = false;
    currentScene = null;

    //#region onEnable
    protected onEnable(): void {
        if (SoundManager.instance == null)
            SoundManager.instance = this;

        this.backgroundAudioSource = director.getScene().getChildByName("Canvas").getChildByName("Camera").getComponent(AudioSource);
        this.audioSource = this.node.getComponent(AudioSource);
    }
    //#endregion

    //#region -start
    protected start(): void {
        // Initially Check Mute 
        this.CheckBackgroundMusicEnable();
    }
    //#endregion

    //#region CheckBackgroundMusicEnable
    CheckBackgroundMusicEnable(): void {
        // let vol = 0
        // if (director.getScene().name === "GameScene") vol = 0.4;
        // else vol = 0.8;
        this.isBackgroundAudioPlaying ? this.backgroundAudioSource.volume = 0 : this.backgroundAudioSource.volume = 1;
    }
    //#endregion

    //#region -SetMute
    SetMute(): void {
        this.isMuted ? this.isMuted = false : this.isMuted = true;
    }
    //#endregion

    SetBackgroundMusicEnable(): void {
        this.isBackgroundAudioPlaying ? this.isBackgroundAudioPlaying = false : this.isBackgroundAudioPlaying = true;
        this.CheckBackgroundMusicEnable();
    }

    //#region ButtonClickSound
    ButtonClickSound(): void {
        if (this.isMuted) return;
        this.audioSource.playOneShot(this.audioClipArray[0], 1);
    }
    //#endregion

    //#region WordMatchSound
    WordMatchSound(): void {
        if (this.isMuted) return;
        this.audioSource.playOneShot(this.audioClipArray[1], 1);
    }
    //#endregion

    //#region WordNotMatchedSound
    WordNotMatchedSound(): void {
        if (this.isMuted) return;
        this.audioSource.playOneShot(this.audioClipArray[2], 1);
    }
    //#endregion

    //#region AlphabetShuffleSound
    AlphabetShuffleSound(): void {
        if (this.isMuted) return;
        this.audioSource.playOneShot(this.audioClipArray[3], 1);
    }
    //#endregion

    //#region WordReveal
    WordReveal(): void {
        if (this.isMuted) return;
        this.audioSource.playOneShot(this.audioClipArray[4], 0.7);
    }
    //#endregion

    //#region WaterDropSound
    WaterDropSound(): void {
        if (this.isMuted) return;
        this.audioSource.playOneShot(this.audioClipArray[5], 1);
    }
    //#endregion

    //#region AlphabetSelectionSound
    AlphabetSelectionSound(): void {
        if (this.isMuted) return;
        this.audioSource.playOneShot(this.audioClipArray[6], 1);
    }
    //#endregion

    //#region BoosterCollectionSound
    BoosterCollectionSound(): void {
        if (this.isMuted) return;
        this.audioSource.playOneShot(this.audioClipArray[10], 2);

        this.backgroundAudioSource.volume = 0.4
        this.scheduleOnce(() => { this.backgroundAudioSource.volume = 1 }, 1);
    }
    //#endregion

    //#region TimerSound
    TimerSound(): void {
        if (this.isMuted) return;
        this.audioSource.playOneShot(this.audioClipArray[7], 2);
    }
    //#endregion

    //#region LevelFailedSound
    LevelFailedSound(): void {
        if (this.isMuted) return;
        this.audioSource.playOneShot(this.audioClipArray[8], 1);
    }
    //#endregion

    //#region LevelCompleteSound
    LevelCompleteSound(): void {
        if (this.isMuted) return;
        this.audioSource.playOneShot(this.audioClipArray[9], 1);
    }
    //#endregion

}