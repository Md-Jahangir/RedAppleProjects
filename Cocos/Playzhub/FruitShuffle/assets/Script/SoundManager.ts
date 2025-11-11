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
        this.audioSource = this.node.getComponent(AudioSource);
    }
    //#endregion

    //#region -Start
    protected start(): void {
        this.CheckBackgroundMusicEnable();
    }
    //#endregion

    //#region -CheckBackgroundMusicEnable
    CheckBackgroundMusicEnable(): void {
        this.isMuted ? this.backgroundMusic.volume = 0 : this.backgroundMusic.volume = 0.5;
    }
    //#endregion

    //#region -SetMute
    SetMute(): void {
        this.isMuted ? this.isMuted = false : this.isMuted = true;
    }
    //#endregion

    //#region -ButtonClickSound
    ButtonClickSound(): void {
        if (this.isMuted) return
        this.audioSource.playOneShot(this.audioClipArray[0], 1);
    }
    //#endregion

    //#region -FruitTapSound
    FruitTapSound(): void {
        if (this.isMuted) return
        this.audioSource.playOneShot(this.audioClipArray[5], 0.8);
    }
    //#endregion

    //#region -FruitStackSound
    FruitStackSound(): void {
        if (this.isMuted) return
        this.audioSource.playOneShot(this.audioClipArray[1], 1);
    }
    //#endregion

    //#region -UndoButtonSound
    UndoButtonSound(): void {
        if (this.isMuted) return
        this.audioSource.playOneShot(this.audioClipArray[6], 1);
    }
    //#endregion

    //#region -ShuffleButtonSound
    ShuffleButtonSound(): void {
        if (this.isMuted) return
        this.audioSource.playOneShot(this.audioClipArray[7], 1);
    }
    //#endregion

    //#region -LevelCompleteSound
    LevelCompleteSound(): void {
        if (this.isMuted) return
        this.audioSource.playOneShot(this.audioClipArray[3], 1);
    }
    //#endregion

    //#region -LevelFailedSound
    LevelFailedSound(): void {
        if (this.isMuted) return
        this.audioSource.playOneShot(this.audioClipArray[2], 1);
    }
    //#endregion

    //#region -StackFullSound
    StackFullSound(): void {
        if (this.isMuted) return
        this.audioSource.playOneShot(this.audioClipArray[8], 1);
    }
    //#endregion

    //#region -TitleArtSound
    TitleArtSound(): void {
        if (this.isMuted) return
        this.audioSource.playOneShot(this.audioClipArray[9], 1);
    }
    //#endregion

    //#region -SlidingSoundEffect
    SlidingSoundEffect(): void {
        if (this.isMuted) return
        this.audioSource.playOneShot(this.audioClipArray[10], 1);
    }
    //#endregion

    //#region -MatchSoundEffect
    MatchSoundEffect(): void {
        if (this.isMuted) return
        this.audioSource.playOneShot(this.audioClipArray[4], 1);
    }
    //#endregion
}


