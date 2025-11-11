import { _decorator, AudioClip, AudioSource, Component, director, Node } from 'cc';
import { AssetLoader } from './AssetLoader';
import { GameManager } from './GameSceneScripts/GameManager';
const { ccclass, property } = _decorator;

@ccclass('AudioManager')
export class AudioManager extends Component {
    //Singleton
    public static instance: AudioManager | null = null;

    //References
    // @property(AudioClip) audioClipArray: AudioClip[] = [];
    audioSource: AudioSource = null;
    backgroundAudioSource: AudioSource = null;

    //Local Varriable
    isMuted: boolean = false;
    isBackgroundAudioPlaying: boolean = false;
    protected onEnable(): void {
        if (!AudioManager.instance) {
            AudioManager.instance = this;
        } else {
            this.destroy();
        }


        this.backgroundAudioSource = director.getScene().getChildByName("Cam").children[0].getComponent(AudioSource);
        this.audioSource = this.node.getComponent(AudioSource);

        this.CheckBackgroundMusicEnable();
    };
    protected start(): void {
        this.CheckBackgroundMusicEnable();
        this.PlayBGMusic();
    }

    //#region CheckBackgroundMusicEnable
    CheckBackgroundMusicEnable(): void {
        this.isMuted ? this.backgroundAudioSource.volume = 0 : this.backgroundAudioSource.volume = 0.5;
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
        const clip: AudioClip = await AssetLoader.LoadAsset('audio', 'Cross_N_Dash_bgm', AudioClip);
        this.backgroundAudioSource.clip = clip;
        this.backgroundAudioSource.loop = true;
        this.backgroundAudioSource.play();
    }
    //#endregion

    //#region ButtonClickSound
    async ButtonClickSound(): Promise<void> {
        if (this.isMuted) return;

        const soundClip: AudioClip = await AssetLoader.LoadAsset('audio', 'SwordImpact12', AudioClip);
        this.audioSource.playOneShot(soundClip, 1);
    }
    //#endregion

    //#region GameOver Sound
    async GameOverSound(): Promise<void> {
        if (this.isMuted) return;

        const soundClip: AudioClip = await AssetLoader.LoadAsset('audio', 'GameOver', AudioClip);
        this.audioSource.playOneShot(soundClip, 1);
    }
    //#endregion

    //#region GameStart Sound
    async GameStartSound(): Promise<void> {
        if (this.isMuted) return;

        const soundClip: AudioClip = await AssetLoader.LoadAsset('audio', 'Start', AudioClip);
        this.audioSource.playOneShot(soundClip, 1);
    }
    //#endregion

    //#region FootStepSound 
    async FootStepSound(): Promise<void> {
        if (this.isMuted) return;

        const soundClip: AudioClip = await AssetLoader.LoadAsset('audio', 'Footstep', AudioClip);
        this.audioSource.playOneShot(soundClip, 1);
    }
    //#endregion

    //#region HitSound 
    async HitSound(): Promise<void> {
        if (this.isMuted) return;

        const soundClip: AudioClip = await AssetLoader.LoadAsset('audio', 'Hit', AudioClip);
        this.audioSource.playOneShot(soundClip, 1);
    }
    //#endregion

    //#region CollectSound 
    async CollectSound(): Promise<void> {
        if (this.isMuted) return;

        const soundClip: AudioClip = await AssetLoader.LoadAsset('audio', 'Collectible', AudioClip);
        this.audioSource.playOneShot(soundClip, 1);
    }
    //#endregion
}


