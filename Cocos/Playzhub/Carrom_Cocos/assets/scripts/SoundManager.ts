import { _decorator, AudioClip, AudioSource, Component, director, Node, resources } from 'cc';
import { AssetLoader } from './utils/AssetLoader';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    //Singleton
    public static instance: SoundManager | null = null;
    private _cachedAudioClipMap: Record<string, AudioClip> = {};

    //References
    // @property(AudioClip) audioClipArray: AudioClip[] = [];
    audioSource: AudioSource = null;
    backgroundAudioSource: AudioSource = null;

    //Local Varuiable
    isMuted: boolean = false;
    isBackgroundAudioPlaying: boolean = false;

    protected onEnable(): void {
        if (SoundManager.instance == null)
            SoundManager.instance = this;

        this.backgroundAudioSource = director.getScene().getChildByName("Canvas").getChildByName("Camera").getComponent(AudioSource);
        this.audioSource = this.node.getComponent(AudioSource);

        this.CheckBackgroundMusicEnable();
    };

    // private async LoadSound(_audioName: string): Promise<AudioClip> {
    //     const audioPath: string = `audio/${_audioName}`;
    //     let audioClip: AudioClip = SoundManager.instance._cachedAudioClipMap[audioPath];

    //     if (audioClip) {
    //         return audioClip;
    //     } else {
    //         return new Promise<AudioClip>((resolve, reject) => {
    //             resources.load(audioPath, AudioClip, (err: Error | null, data: AudioClip) => {
    //                 if (err) {
    //                     console.error(`Failed to load sound: ${audioPath}`, err);
    //                     reject(err);
    //                     return;
    //                 }
    //                 SoundManager.instance._cachedAudioClipMap[audioPath] = data;
    //                 resolve(data);
    //             });
    //         });
    //     }
    // }

    //#region CheckBackgroundMusicEnable
    CheckBackgroundMusicEnable(): void {
        this.isMuted ? this.backgroundAudioSource.volume = 0 : this.backgroundAudioSource.volume = 0.3;
    };
    //#endregion

    //#region -SetMute
    SetMute(): void {
        this.isMuted ? this.isMuted = false : this.isMuted = true;
        this.CheckBackgroundMusicEnable();
    }
    //#endregion

    //#region PlayBGMusic
    async PlayBGMusic(): Promise<void> {
        const clip: AudioClip = await AssetLoader.LoadAsset('audio', 'carrom_game_bg_sound', AudioClip);//this.LoadSound('carrom_game_bg_sound');
        this.backgroundAudioSource.clip = clip;
        this.backgroundAudioSource.play();
    }
    //#endregion

    //#region ButtonClickSound
    async ButtonClickSound(): Promise<void> {
        if (this.isMuted) return;

        const soundClip: AudioClip = await AssetLoader.LoadAsset('audio', 'click_sound', AudioClip);//this.LoadSound('click_sound');
        this.audioSource.playOneShot(soundClip, 1);
    }
    //#endregion

    //#region PawnsSound
    async PawnsSound(): Promise<void> {
        if (this.isMuted) return;

        const soundClip: AudioClip = await AssetLoader.LoadAsset('audio', 'pawn_sound', AudioClip);//this.LoadSound('pawn_sound');
        this.audioSource.playOneShot(soundClip, 1);
    };
    //#endregion

    //#region PocketSound
    async PocketSound(): Promise<void> {
        if (this.isMuted) return;

        const soundClip: AudioClip = await AssetLoader.LoadAsset('audio', 'pocket_sound', AudioClip);//this.LoadSound('pocket_sound');
        this.audioSource.playOneShot(soundClip, 0.5);
    }
    //#endregion

    //#region StrikerInPocketSound
    async StrikerInPocketSound(): Promise<void> {
        if (this.isMuted) return;

        const soundClip: AudioClip = await AssetLoader.LoadAsset('audio', 'striker_pocket_sound', AudioClip);//this.LoadSound('striker_pocket_sound');
        this.audioSource.playOneShot(soundClip, 0.7);
    }
    //#endregion

    //#region ClockSound
    async ClockSound(): Promise<void> {
        if (this.isMuted) return;

        const soundClip: AudioClip = await AssetLoader.LoadAsset('audio', 'carrom_clock_soundFX', AudioClip);//this.LoadSound('carrom_clock_soundFX');
        this.audioSource.playOneShot(soundClip, 2);
    }
    //#endregion

    //#region ClockSoundOnce
    async ClockSoundOnce(): Promise<void> {
        if (this.isMuted) return;

        const soundClip: AudioClip = await AssetLoader.LoadAsset('audio', 'singleClockSound', AudioClip);//this.LoadSound('singleClockSound');
        this.audioSource.playOneShot(soundClip, 1);
    }
    //#endregion

    //#region BoardSound
    async BoardSound(): Promise<void> {
        if (this.isMuted) return;

        const soundClip: AudioClip = await AssetLoader.LoadAsset('audio', 'striker_sound', AudioClip);//this.LoadSound('striker_sound');
        this.audioSource.playOneShot(soundClip, 1);
    }
    //#endregion

    //#region LevelComplete and Failed
    async LevelCompleteSound(): Promise<void> {
        if (this.isMuted) return;

        const soundClip: AudioClip = await AssetLoader.LoadAsset('audio', 'carrom_level_complete', AudioClip);//this.LoadSound('carrom_level_complete');
        this.audioSource.playOneShot(soundClip, 1);
    }

    async LevelFailedSound(): Promise<void> {
        if (this.isMuted) return;

        const soundClip: AudioClip = await AssetLoader.LoadAsset('audio', 'carrom_level_failed', AudioClip);//this.LoadSound('carrom_level_failed');
        this.audioSource.playOneShot(soundClip, 1);
    }
    //#endregion

    // //#region ExitPopup
    // ExitPopupSound(): void {
    //     if (this.isMuted) return;

    //     this.audioSource.playOneShot(this.audioClipArray[9], 1);
    // }
    // //#endregion

    // //#region MenuStrikerSound
    // MenuStrikerSound(): void {
    //     if (this.isMuted) return;

    //     this.audioSource.playOneShot(this.audioClipArray[10], 1);
    // }
    // //#endregion
}


