var LoadAssets = {
    LoadAllAssets: function(){
        //Menu Page
        // commonBackgroundImage1 = game.load.image('bg_1', 'assets/Common/bg_1.png');
        // commonBackgroundImage2 = game.load.image('bg_2', 'assets/Common/bg_2.png');
        commonBackgroundImage3 = game.load.image('bg_3', 'assets/Common/bg_3.png');

        // game.load.image('classic', 'assets/Common/classic.png');
        // game.load.image('joker_bg', 'assets/Common/joker.png');
        // game.load.image('muflis', 'assets/Common/muflis.png');

        classicCardImage = game.load.image('classic_card','assets/MainMenu/Classics_card.png');
        jokerCardImage = game.load.image('joker_card','assets/MainMenu/Joker_Card.png');
        muflisCardImage = game.load.image('muflis_card','assets/MainMenu/Muflis_Card.png');
        pokerChipImage = game.load.image('poker_chip','assets/MainMenu/Poker_chip.png');
        privateTableBttnImage = game.load.image('private_table_button','assets/MainMenu/Private_Table_Button.png');
        settingsBttnImage = game.load.image('settings_button','assets/MainMenu/Settings_Button.png');
        textShowCaseImage = game.load.image('text_showcase','assets/MainMenu/text_showcase.png');
        userProfileImage = game.load.image('user_profile_pic','assets/GamePlay/user.png');
        //Private Table Page
        backBttnImage = game.load.image('back_button','assets/PrivateTable/Back_Button.png');
        classicCheckCircleImage = game.load.image('classic_check_circle','assets/PrivateTable/classic_check_circle.png');
        jokerCheckCircleImage = game.load.image('joker_check_circle','assets/PrivateTable/joker_check_circle.png');
        muflisCheckCircleImage = game.load.image('muflis_check_circle','assets/PrivateTable/muflis_check_circle.png');
        createTableTxtImage = game.load.image('create_table_text','assets/PrivateTable/create_table.png');
        createTableBttnImage = game.load.image('create_table_button','assets/PrivateTable/create_table_button.png');
        enterCodeImage = game.load.image('enter_code','assets/PrivateTable/enter_code.png');
        joinTableBttnImage = game.load.image('join_table_button','assets/PrivateTable/join_table_button.png');
        joinTableTxtImage = game.load.image('join_table_text','assets/PrivateTable/join_table.png');
        tickMarkImage = game.load.image('tick_mark','assets/PrivateTable/tick_mark.png');
        //Gameplay Page
        chatBttnImage = game.load.image('chat_button','assets/GamePlay/chat_button.png');
        infoBttnImage = game.load.image('info_Button','assets/GamePlay/info_Button.png');
        classicHeadingImage = game.load.image('classic_heading','assets/GamePlay/classic_heading.png');
        jokerHeadingImage = game.load.image('joker_heading','assets/GamePlay/joker_heading.png');
        muflisHeadingImage = game.load.image('muflis_heading','assets/GamePlay/muflis_heading.png');
        girlsDealerImage = game.load.image('girls_dealer','assets/GamePlay/girl_dealer.png');
        bootIconImage = game.load.image('boot_icon','assets/GamePlay/boot_icon.png');
        chaalBttnImage = game.load.image('chaal_button','assets/GamePlay/chaal_button.png');
        chaalLimitIconImage = game.load.image('chaal_limit_icon','assets/GamePlay/chaal_limit_icon.png');
        minusIconImage = game.load.image('minus_icon','assets/GamePlay/minus_icon.png');
        packBttnImage = game.load.image('pack_button','assets/GamePlay/pack_button.png');
        plusIconImage = game.load.image('plus_icon','assets/GamePlay/plus_icon.png');
        potLimitImage = game.load.image('pot_limit_icon','assets/GamePlay/pot_limit_icon.png');
        sideShowBttnImage = game.load.image('side_show_button','assets/GamePlay/side_show_button.png');

        tableBttnImage1 = game.load.image('table_01','assets/Common/table_01.png');
        tableBttnImage2 = game.load.image('table_02','assets/Common/table_02.png');
        tableBttnImage3 = game.load.image('table_03','assets/Common/table_03.png');

        bttnUiBaseImage = game.load.image('button_ui_base','assets/GamePlay/button_ui_base.png');
        showBttnImage = game.load.image('show_button','assets/GamePlay/show_button.png');
        blindBttnImage = game.load.image('blind','assets/GamePlay/blind.png');
        cardBackImage =  game.load.image('backSideCard','assets/GamePlay/backSideCard.png');
        dealericonImage = game.load.image('delaer_icon','assets/GamePlay/dealer_icon.png');
        giftIconImage = game.load.image('gift_icon','assets/GamePlay/gift_icon.png');
        crownImage = game.load.image('crown_image','assets/GamePlay/crown.png');
        decisionImage = game.load.image('decision_image','assets/GamePlay/decision_base.png');
        packImage = game.load.image('pack_image','assets/GamePlay/pack_base.png');
        allCard = game.load.spritesheet('card', 'assets/GamePlay/allCard.png', 657.0/13.0, 286.0/4.0,52);
        userRing = game.load.image('user_ring','assets/GamePlay/user_ring.png');

        greenButtonBase = game.load.image('green_base','assets/GamePlay/green_base.png');
        redButtonBase = game.load.image('red_base','assets/GamePlay/red_base.png');
        blueButtonBase = game.load.image('blue_base','assets/GamePlay/blue_base.png');

        jokerCard = game.load.image('joker','assets/GamePlay/joker.png');

        //PopUpBase
        popUpBase = game.load.image('popupBase', 'assets/Common/popup_base.png');
        okButton = game.load.image('okButton','assets/Common/ok_button.png');
        blackOnePixel = game.load.image('blackOnePixel', 'assets/Common/one_pixel_black.png');

        //SettingsPopUp

        game.load.image('arrowButton', 'assets/SettingPopUp/arrow.png');
        game.load.image('setting_tick_mark','assets/ChangePicturePopUp/tick_mark.png');
        for(var i = 1;i<16;i++){
            game.load.image(i,'assets/ChangePicturePopUp/'+i+'.png');
        }

        //ChatBox
        game.load.image('ownMsgBox','assets/ChatBox/chat_box_02.png');
        game.load.image('chatBubble','assets/ChatBox/chat_bubble.png');
        game.load.image('crossButton','assets/ChatBox/cross_button.png');
        game.load.image('sendButton','assets/ChatBox/send_button.png');
        game.load.image('typingBase','assets/ChatBox/typing_box.png');
       // game.load.image('crossButton','assets/ChatBox/cross_button.png');

        //SettingsPage
        game.load.image('whiteOnePixel', 'assets/Common/one_pixel_white.png');
        game.load.image('settingsHeading', 'assets/SettingPopUp/settings_text.png');
        game.load.image('changeNameIcon', 'assets/SettingPopUp/change_name.png');
        game.load.image('changePictureIcon', 'assets/SettingPopUp/change_picture.png');
        game.load.image('gameRulesIcon', 'assets/SettingPopUp/game_rules.png');
        game.load.image('soundIcon', 'assets/SettingPopUp/sound_on.png');
        game.load.image('signOutIcon', 'assets/SettingPopUp/sign_out.png');
        game.load.image('arrow','assets/SettingPopUp/arrow.png');
        game.load.image('soundOffIcon','assets/SettingPopUp/sound_off.png');

        //SplashPage
        game.load.image('splash', 'assets/Splash/splash.png');

        //GiftIconClick
        game.load.image('gift_base','assets/GiftIcon/gift_base.png');
        for(var i = 1;i<16;i++){
            game.load.image('gift_'+i,'assets/GiftIcon/gift_'+i+'.png');
        }
        game.load.spritesheet('gift_spritesheet_1', 'assets/GiftIcon/GiftSpriteSheetAnimation/gift_spritesheet_1.png', 1024/4, 768/3, 11);
        game.load.spritesheet('gift_spritesheet_2', 'assets/GiftIcon/GiftSpriteSheetAnimation/gift_spritesheet_2.png', 1024/4, 768/3, 11);
        game.load.spritesheet('gift_spritesheet_3', 'assets/GiftIcon/GiftSpriteSheetAnimation/gift_spritesheet_3.png', 1024/4, 768/3, 12);
        game.load.spritesheet('gift_spritesheet_4', 'assets/GiftIcon/GiftSpriteSheetAnimation/gift_spritesheet_4.png', 1024/4, 768/3, 12);
        game.load.spritesheet('gift_spritesheet_5', 'assets/GiftIcon/GiftSpriteSheetAnimation/gift_spritesheet_5.png', 1024/4, 768/3, 12);
        game.load.spritesheet('gift_spritesheet_6', 'assets/GiftIcon/GiftSpriteSheetAnimation/gift_spritesheet_6.png', 1024/4, 768/3, 12);
        game.load.spritesheet('gift_spritesheet_7', 'assets/GiftIcon/GiftSpriteSheetAnimation/gift_spritesheet_7.png', 1024/4, 768/3, 12);
        game.load.spritesheet('gift_spritesheet_8', 'assets/GiftIcon/GiftSpriteSheetAnimation/gift_spritesheet_8.png', 1024/4, 768/3, 12);
        game.load.spritesheet('gift_spritesheet_9', 'assets/GiftIcon/GiftSpriteSheetAnimation/gift_spritesheet_9.png', 1024/4, 768/3, 12);
        game.load.spritesheet('gift_spritesheet_10', 'assets/GiftIcon/GiftSpriteSheetAnimation/gift_spritesheet_10.png', 1024/4, 512/2, 7);
        game.load.spritesheet('gift_spritesheet_11', 'assets/GiftIcon/GiftSpriteSheetAnimation/gift_spritesheet_11.png', 1024/4, 768/3, 12);
        game.load.spritesheet('gift_spritesheet_12', 'assets/GiftIcon/GiftSpriteSheetAnimation/gift_spritesheet_12.png', 1024/4, 768/3, 12);
        game.load.spritesheet('gift_spritesheet_13', 'assets/GiftIcon/GiftSpriteSheetAnimation/gift_spritesheet_13.png', 1024/4, 768/3, 12);
        game.load.spritesheet('gift_spritesheet_14', 'assets/GiftIcon/GiftSpriteSheetAnimation/gift_spritesheet_14.png', 1024/4, 768/3, 10);
        game.load.spritesheet('gift_spritesheet_15', 'assets/GiftIcon/GiftSpriteSheetAnimation/gift_spritesheet_15.png', 1024/4, 768/3, 12);

        game.load.image('tick_on','assets/GiftIcon/tick_box_02.png');
        game.load.image('tick_off','assets/GiftIcon/tick_box_01.png');

        //LoadingWheel
        game.load.image('loadingWheel', 'assets/Common/loading_wheel.png');
        game.load.image('circle','assets/Common/circle.png');

        //WinnerParticle Effect
        game.load.spritesheet('particleBlast', 'assets/GamePlay/particleBlast.png',2048/8,2560/10,80);

        //Menu Controller
        game.load.image('closeIcon','assets/MenuController/close_icon.png');
        game.load.image('exitToLobbyIcon','assets/MenuController/exit_to_lobby.png');
        game.load.image('switchIcon','assets/MenuController/switch.png');
        game.load.image('questionMarkIcon','assets/MenuController/question_mark.png');

        //Rules
        game.load.image('classicRule','assets/Rules/Classic_rule.png');
        game.load.image('jokerRule','assets/Rules/Joker_rule.png');
        game.load.image('muflisRule','assets/Rules/Mufflis_rule.png');

        game.load.image('tip','assets/GamePlay/Tip.png');
        game.load.image('defaultPlayer','assets/GamePlay/icon2.png');

        // game.load.spritesheet('waiting_opponent_spritesheet', 'assets/GamePlay/opponentWaitingSpriteSheet.png', 2560/5, 3584/7, 33);

        // game.load.spritesheet('smiley','assets/GamePlay/not_found.png',606/3,800/4,12);

        game.load.spritesheet('sideshowglow','assets/GamePlay/sideshowglow.png',2048/4,2560/5,17)

        game.load.image('smallCrownImage','assets/GamePlay/smallCrown.png');
        game.load.image('inHandMoneyHolder','assets/GamePlay/inHandMoneyHolder.png');

        game.load.image('private_table_card','assets/MainMenu/Private_table.png');
        
        SoundManager.LoadSound();

        game.load.start();
    }   
}