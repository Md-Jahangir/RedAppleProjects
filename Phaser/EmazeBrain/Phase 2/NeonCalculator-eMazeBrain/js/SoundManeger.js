var SoundManager = {
    AddSound: function() {
        this.Bool = true;
        this.gameStartSound = game.sound.add('game_start_sound');
        this.gameEndSound = game.sound.add('game_end_sound');
        this.correctSound = game.sound.add('correct_answer_sound');
        this.inCorrectSound = game.sound.add('incorrect_answer_sound');
        this.levelUpSound = game.sound.add('level_up_sound');
    },
    StartSoundPlay: function() {
        this.gameStartSound.play();
        //     gamePlayPageBgMusic.loop = true;
    },
    EndSoundPlay: function() {
        this.gameEndSound.play();
    },
    LevelUpSoundPlay: function() {
        this.levelUpSound.play();
    },
    CorrectAnswerSoundPlay: function() {
        this.correctSound.play();
    },
    InCorrectAnswerSoundPlay: function() {
        this.inCorrectSound.play();
    },
}