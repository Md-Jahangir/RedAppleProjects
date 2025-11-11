import { _decorator, AudioClip, AudioSource, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

// enum SoundType {
//     starCollectSound,
//     eggBreakSound,
//     gameOverSound
// }
// class SoundAudioClip {
//     // @property(SoundType) clipName: SoundType;
//     @property(AudioClip) audioClip: AudioClip;
// }

@ccclass('SoundManager')
export class SoundManager extends Component {
    public static instance: SoundManager = null;
    @property(AudioClip) audioClipArray: AudioClip[] = [];
    audioSource: AudioSource;
    playSoundState: boolean = true;
    backgroundMusic: AudioSource;
    // @property(SoundAudioClip) soundAudioClips: SoundAudioClip[] = [];

    protected onEnable(): void {
        if (SoundManager.instance == null) {
            SoundManager.instance = this;
        } else {
            // this.destroy();
        }
        this.audioSource = this.node.getComponent(AudioSource);
    }

    //#region -SetBackgroundMusicSource
    SetBackgroundMusicSource(): void {
        this.backgroundMusic = director.getScene().getChildByName("Canvas").getChildByName("Camera").getComponent(AudioSource);
    }
    //#endregion

    SetSoundState(): void {
        this.playSoundState ? this.playSoundState = false : this.playSoundState = true;
        this.PlayBackgroundMusic();
    }

    //#region -BackgroundMusic
    PlayBackgroundMusic(): void {
        if (this.playSoundState)
            this.backgroundMusic?.play();
        else
            this.backgroundMusic?.stop();
    }
    //#endregion

    //#region -GettingHitSFX
    PlayPlayerGettingHitSound(): void {
        if (this.playSoundState)
            this.audioSource.playOneShot(this.audioClipArray[0], 1);
    }
    //#endregion

    //#region -StarCollectSound
    PlayStarCollectSound(): void {
        if (this.playSoundState)
            this.audioSource.playOneShot(this.audioClipArray[1], 1);
    }
    //#endregion

    //#region -GameOverSound
    PlayGameOverSound(): void {
        if (this.playSoundState)
            this.audioSource.playOneShot(this.audioClipArray[2], 1);
    }
    //#endregion

    //#region -EggBrokenSound
    PlayEggBrokenSound(): void {
        if (this.playSoundState)
            this.audioSource.playOneShot(this.audioClipArray[3], 2);
    }
    //#endregion

    //#region -ButtonClickSound
    PlayButtonClickSound(): void {
        if (this.playSoundState)
            this.audioSource.playOneShot(this.audioClipArray[4], 1);
    }
    //#endregion

    //#region -TitleArtAnimationSound
    PlayTitleArtAnimationSound(): void {
        if (this.playSoundState)
            this.audioSource.playOneShot(this.audioClipArray[5], 3);
    }
    //#endregion

    //#region -StartButtonAnimationSound
    PlayStartButtonAnimationSound(): void {
        if (this.playSoundState)
            this.audioSource.playOneShot(this.audioClipArray[6], 1);
    }
    //#endregion

    PlayFootStep(_volume: number): void {
        if (this.playSoundState)
            this.audioSource.playOneShot(this.audioClipArray[7], _volume);
    }
}