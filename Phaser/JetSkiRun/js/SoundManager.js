/*@Original_Creator : - Supriyo_Mukherjee.
@Created_Date : - 26 - 11 - 2022.
@Last_Update_By : - Supriyo_Mukherjee.
@Last_Updatd_Date : - 1 - 12 - 2022
@Description : - added different sound bg and sfx needed for the game*/


class SoundManager {
    constructor(scene) {
        this.scene = scene;
        this.backgroundSound;
        this.coinCollectSound;
        this.gameOverSound;
    }
    AddSoundsForGame() {
        this.backgroundSound = this.scene.sound.add('bg_music');
        this.coinCollectSound = this.scene.sound.add('coin_collect');
        this.gameOverSound = this.scene.sound.add('game_over');
    }
}
export default SoundManager