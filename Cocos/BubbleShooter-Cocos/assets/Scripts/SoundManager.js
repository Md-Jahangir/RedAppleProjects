var databaseComponet;

cc.Class({
    extends: cc.Component,

    properties: {
        bgSound: cc.AudioSource,
        timerRemainderSound: cc.AudioSource,
        dangerLineRemainderSound: cc.AudioSource,
        buttonSound: cc.AudioSource,
        multipleBlustSound: cc.AudioSource,
        addNewBubbleSound: cc.AudioSource,
        awesomeSound: cc.AudioSource,
        excellentSound: cc.AudioSource,
        niceSound: cc.AudioSource,
        bombBlustSound: cc.AudioSource,
        fireBallBlustSound: cc.AudioSource,
        wildBallBlustSound: cc.AudioSource,
        dataBaseNode: cc.Node,
    },

    onLoad: function() {
        databaseComponet = this.dataBaseNode.getComponent("Database");
    },

    PlayBgSound: function() {
        if (databaseComponet.LoadData("is_music_on") == 0) {
            this.bgSound.play();
        }

    },

    StopBgSound: function() {
        this.bgSound.stop();
    },

    getCurrentValue:function(key) {
        return databaseComponet.LoadData(key);
    },

    updateMusicStatus:function (value) {
        databaseComponet.SaveData("is_music_on", value) ;
        if (value == 1) {
            this.StopBgSound();
        }
    },

    updateSoundStatus:function (value) {
        databaseComponet.SaveData("is_sound_on", value) ;
    },


    PlayMultipleBubbleBlustSound: function() {
        if (databaseComponet.LoadData("is_sound_on") == 0) {
            this.multipleBlustSound.play();
        }
    },

    // StopMultipleBubbleBlustSound:function(){
    //     this.multipleBlustSound.stop();
    // },

    PlayAddBubbleSound: function() {
        if (databaseComponet.LoadData("is_sound_on") == 0) {
            this.addNewBubbleSound.play();
        }

    },

    PlayButtonClickSound: function() {
        if (databaseComponet.LoadData("is_sound_on") == 0) {
            this.buttonSound.play();
        }
    },

    PlayDangerLineRemainderSound: function() {
        if (databaseComponet.LoadData("is_sound_on") == 0) {
            if (!this.dangerLineRemainderSound.isPlaying) {
                this.dangerLineRemainderSound.play();
            }
        }
    },

    StopDangerLineOverRemainderSound: function() {
        this.dangerLineRemainderSound.stop();
    },

    PlayTimerRemainderSound: function() {
        if (databaseComponet.LoadData("is_sound_on") == 0) {
            if (!this.timerRemainderSound.isPlaying) {
                this.timerRemainderSound.play();
            }
        }
    },

    StopTimerRemainderSound: function() {
        this.timerRemainderSound.stop();
    },

    PlayAwesomeTextSound: function() {
        if (databaseComponet.LoadData("is_sound_on") == 0) {
            this.awesomeSound.play();
        }
    },
    PlayExcellentTextSound: function() {
        if (databaseComponet.LoadData("is_sound_on") == 0) {
            this.excellentSound.play();
        }
    },
    PlayNiceTextSound: function() {
        if (databaseComponet.LoadData("is_sound_on") == 0) {
            this.niceSound.play();
        }
    },

    PlayBombBlustSound: function() {
        if (databaseComponet.LoadData("is_sound_on") == 0) {
            this.bombBlustSound.play();
        }
    },
    PlayFireBallBlustSound: function() {
        if (databaseComponet.LoadData("is_sound_on") == 0) {
            this.fireBallBlustSound.play();
        }
    },
    PlayWildBallBlustSound: function() {
        if (databaseComponet.LoadData("is_sound_on") == 0) {
            this.wildBallBlustSound.play();
        }
    },


    musicOnOffClick:function(val) {

    },

    soundOnOffClick:function(val) {

    },


    // update (dt) {},
});