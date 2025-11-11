var giftSound = [];
var backgroundMusic;
var bonusCoinCollectSound;
var SoundManager = {
    LoadSound: function(){
        for(var i = 1;i<16;i++){
            game.load.audio('gift_sound_'+i,'assets/Sound/gift_sound_'+i+'.mp3');
        }
        game.load.audio('background_sound','assets/Sound/bg_sound.mp3');
        
        game.load.audio('timeEndNotification','assets/Sound/Others/time_end_notification.ogg');
        game.load.audio('yourTurn','assets/Sound/Others/your_turn.ogg');
        game.load.audio('winner','assets/Sound/Others/winner.ogg');
        game.load.audio('chaalBlindSound','assets/Sound/Others/chaal_and_button.ogg');

        game.load.audio('card_deal','assets/Sound/Others/swipe.ogg');
        game.load.audio('pack','assets/Sound/Others/pack.ogg');
        game.load.audio('see_card','assets/Sound/Others/see_cards.ogg');
        game.load.audio('bonusCoinCollect','assets/Sound/coin_collect_sound.ogg');
    },
    CreateSound: function(){
        for(var i = 0;i<16;i++){
            var gift = game.add.audio('gift_sound_'+i);
            giftSound.push(gift);
        }
        backgroundMusic = game.add.audio('background_sound');

        timeEndNotification =  game.add.audio('timeEndNotification');
        yourTurn = game.add.audio('yourTurn');
        winner = game.add.audio('winner');
        chaalBlindSound = game.add.audio('chaalBlindSound');

        
        cardDealSound = game.add.audio('card_deal');
        packSound = game.add.audio('pack');
        seeCard = game.add.audio('see_card');
        bonusCoinCollectSound = game.add.audio('bonusCoinCollect');
    },
    PlayBonusCoinCollectSound: function(){
        if(Database.LoadData("soundOnOff") == "1"){
            bonusCoinCollectSound.play();
        }
    },
    PlayGiftSound: function(giftId){
        if(Database.LoadData("soundOnOff") == "1"){
            console.log("Play The Gift Sound Enter");
            giftSound[giftId].play();
        }
    },
    PlayBackgroundMusic: function(){
        console.log("Play The Background Music Enter");
        if(Database.LoadData("soundOnOff") == "1"){
            console.log("Play The Background Music Enter   2");
            backgroundMusic.play();
            backgroundMusic.loopFull();
            backgroundMusic.volume = 0.5;
        }
    },
    StopBackGroundMusic: function(){
        backgroundMusic.stop();
    },
    PlayTimeEndNotificationSound : function(){
        if(Database.LoadData("soundOnOff") == "1"){
            if(!timeEndNotification.isPlaying){
                timeEndNotification.play();
            }
        }
    },
    StopTimeEndNotification: function(){
        if(Database.LoadData("soundOnOff") == "1"){
            if(timeEndNotification.isPlaying){
                timeEndNotification.stop();
            }
        }
    },
    PlayYourTurnSound : function(){
        if(Database.LoadData("soundOnOff") == "1"){
            if(!yourTurn.isPlaying){
                yourTurn.play();
            }
        }
    },
    PlayWinnerSound : function(){
        if(Database.LoadData("soundOnOff") == "1"){
            if(!winner.isPlaying){
                winner.play();
            }
        }
    },
    PlayChaalBlindSound : function(){
        if(Database.LoadData("soundOnOff") == "1"){
            if(!chaalBlindSound.isPlaying){
                chaalBlindSound.play();
            }
        }
    },
    PlayCardDealSound: function(){
        if(Database.LoadData("soundOnOff") == "1"){
            cardDealSound.play();
        }
    },
    PlayPackSound: function(){
        if(Database.LoadData("soundOnOff") == "1"){
            packSound.play();
        }
    },
    PlaySeeCardSound: function(){
        if(Database.LoadData("soundOnOff") == "1"){
            seeCard.play();
        }
    },
}