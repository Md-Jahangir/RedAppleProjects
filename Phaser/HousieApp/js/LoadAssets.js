var LoadAssets = {
    LoadAllAssets: function() {

        game.load.image('transparent_image', 'assets/transparentImage.png');
        game.load.image('one_pixel', 'assets/one_pixel_white.png');
        game.load.image('alert_box', 'assets/alert_box.png');
        game.load.spritesheet('loading_wheel', 'assets/loading_wheel.png', 157, 157, 3);

        game.load.json('gender_json', 'json/gender.json');
        // game.load.json('dateTimeJson', 'json/dateTime.json');

        //splashPage
        game.load.image('splash_bg', 'assets/login_signup/login_signup_bg.png');
        game.load.image('loading_base', 'assets/Splash/loading_base.png');
        game.load.image('loading_fill', 'assets/Splash/loading_fill.png');

        //Login and Signup
        game.load.image('login_signup_bg', 'assets/login_signup/login_signup_bg.png');
        game.load.image('button_base', 'assets/login_signup/button_base.png');
        game.load.image('select_box', 'assets/login_signup/select_box.png');
        game.load.image('right_sign', 'assets/login_signup/right_sign.png');
        game.load.image('under_line', 'assets/login_signup/under_line.png');
        game.load.image('text_box', 'assets/login_signup/text_box.png');
        game.load.image('text_box_small', 'assets/login_signup/text_box_small.png');
        game.load.image('text_box_fat', 'assets/login_signup/text_box_fat.png');
        game.load.image('edit_button', 'assets/login_signup/edit_button.png');
        game.load.image('arrow', 'assets/login_signup/arrow.png');
        game.load.image('profile_base', 'assets/login_signup/profile_base.png');
        game.load.image('profile_pic', 'assets/login_signup/user_icon.png');
        game.load.image('panel_box', 'assets/login_signup/panel_box.png');

        //How To Play
        game.load.image('watch_video_box', 'assets/howToPlay/watch_video_box.png');
        game.load.image('back_button', 'assets/howToPlay/back_button.png');
        game.load.image('key', 'assets/howToPlay/key.png');
        game.load.image('lock', 'assets/howToPlay/lock.png');
        game.load.image('watch_video_icon', 'assets/howToPlay/watch_video_icon.png');
        game.load.video('tutorial_video', 'video/tutorial.mp4');

        //Menu
        game.load.image('menu_bg', 'assets/menu/menu_bg.png');
        game.load.image('top_area', 'assets/menu/top_area.png');
        game.load.image('how_to_play', 'assets/menu/how_to_play.png');
        game.load.image('remind_button_base', 'assets/menu/remind_button_base.png');
        game.load.image('remind_button_off_base', 'assets/menu/remind_button_off_base.png');
        game.load.image('join_button_base', 'assets/menu/join_button_base.png');
        game.load.image('home', 'assets/menu/home.png');
        game.load.image('history', 'assets/menu/history.png');
        game.load.image('leaderboard', 'assets/menu/leaderboard.png');
        game.load.image('menu', 'assets/menu/menu.png');
        game.load.image('refresh', 'assets/menu/refresh.png');
        game.load.image('selected_button_base', 'assets/menu/selected_button_base.png');
        game.load.image('arrow_white', 'assets/menu/arrow_white.png');
        game.load.image('calender_icon', 'assets/menu/calender_icon.png');
        game.load.image('clock_icon', 'assets/menu/clock_icon.png');
        game.load.image('reward_base', 'assets/menu/reward_base.png');
        game.load.image('reward_icon', 'assets/menu/reward_icon.png');
        game.load.image('wallet_icon', 'assets/menu/wallet_icon.png');
        game.load.image('heart_icon', 'assets/menu/heart_icon.png');
        game.load.image('plus_icon', 'assets/menu/plus_icon.png');
        game.load.image('live_slab', 'assets/menu/live_slab.png');
        game.load.image('top_panel', 'assets/menu/top_panel.png');
        game.load.image('dashboard_info_box', 'assets/menu/dashboard_info_box.png');
        game.load.image('next_arrow', 'assets/menu/arrow.png');
        game.load.image('notification_on', 'assets/menu/notification.png');
        game.load.image('notification_off', 'assets/menu/notification_off.png');

        //Game History
        game.load.image('game_history_not_selected_button_base', 'assets/gameHistory/played_game_button_base.png');
        game.load.image('game_history_selected_button_base', 'assets/gameHistory/upcoming_game_button_base.png');
        game.load.image('no_data_found_base', 'assets/gameHistory/no_data_found_base.png');

        //ProfilPage
        game.load.image('settings', 'assets/profilePage/settings.png');
        game.load.image('setting_button_base', 'assets/profilePage/setting_button_base.png');
        game.load.image('profile_page_base', 'assets/profilePage/profile_page_base.png');
        game.load.image('profile_price_box', 'assets/profilePage/profile_price_box.png');
        game.load.image('refer_and_earn', 'assets/profilePage/refer_and_earn.png');
        game.load.image('free_play_icon', 'assets/profilePage/free_play_icon.png');
        game.load.image('profile_award_icon', 'assets/profilePage/profile_award_icon.png');
        game.load.image('profile_heart', 'assets/profilePage/profile_heart.png');
        game.load.image('profile_wallet', 'assets/profilePage/profile_wallet.png');

        //LeaderBoard
        game.load.image('leaderboard_box', 'assets/leaderBoard/leaderboard_box.png');
        game.load.image('1st_pos', 'assets/leaderBoard/1st_pos.png');
        game.load.image('2nd_pos', 'assets/leaderBoard/2nd_pos.png');
        game.load.image('3rd_pos', 'assets/leaderBoard/3rd_pos.png');
        game.load.image('recent_time_base', 'assets/leaderBoard/recent_time_base.png');
        game.load.image('recent_time_icon', 'assets/leaderBoard/recent_time_icon.png');
        game.load.image('recent_date_icon', 'assets/leaderBoard/recent_date_icon.png');
        game.load.image('recent_time_line', 'assets/leaderBoard/recent_time_line.png');
        game.load.image('prize_type_behind_base', 'assets/leaderBoard/prize_type_behind_base.png');
        game.load.image('prize_type_not_selected_base', 'assets/leaderBoard/prize_type_not_selected_base.png');
        game.load.image('prize_type_selected_base', 'assets/leaderBoard/prize_type_selected_base.png');
        game.load.image('player_details_area', 'assets/leaderBoard/player_details_area.png');

        //Wallet Page
        game.load.image('wallet_info_box', 'assets/wallet/wallet_info_box.png');
        game.load.image('wallet_Page_wallet_icon', 'assets/wallet/wallet_icon.png');
        game.load.image('cash_base', 'assets/wallet/cash_base.png');

        //gameplay
        for (var i = 0; i < 2; i++) {
            game.load.image('normal_ticket_board_' + i, 'assets/gameplay/normal_ticket_board_' + i + '.png');
            game.load.image('claim_ticket_board_' + i, 'assets/gameplay/claim_ticket_board_' + i + '.png');
        }
        game.load.image('gameplay_bg', 'assets/gameplay/gameplay_bg.png');
        game.load.image('claim_base', 'assets/gameplay/claim_base.png');
        game.load.image('claim_icon', 'assets/gameplay/claim_icon.png');
        game.load.image('ticket_icon', 'assets/gameplay/ticket_icon.png');
        game.load.image('delear_base', 'assets/gameplay/delear_base.png');
        game.load.image('delear_side_base', 'assets/gameplay/delear_side_base.png');
        game.load.image('timer_base', 'assets/gameplay/timer_base.png');
        game.load.image('inactive_button_base', 'assets/gameplay/inactive_button_base.png');
        game.load.image('inactive_button_icon', 'assets/gameplay/inactive_button_icon.png');
        game.load.image('active_button_base', 'assets/gameplay/active_button_base.png');
        game.load.image('active_button_icon', 'assets/gameplay/active_button_icon.png');
        game.load.image('announced_number_base', 'assets/gameplay/announced_number_base.png');
        game.load.image('menu_panel', 'assets/gameplay/menu_panel.png');
        game.load.image('left_arrow_button', 'assets/gameplay/left_arrow_button.png');
        game.load.image('right_arrow_button', 'assets/gameplay/right_arrow_button.png');
        game.load.image('menu_button', 'assets/gameplay/menu_button.png');
        game.load.image('gameplay_back', 'assets/gameplay/gameplay_back.png');
        game.load.image('gameplay_profile', 'assets/gameplay/gameplay_profile.png');
        game.load.image('gameplay_settings', 'assets/gameplay/gameplay_settings.png');
        game.load.image('info', 'assets/gameplay/info.png');
        game.load.image('numbers_plate', 'assets/gameplay/numbers_plate.png');
        game.load.image('select_number_base', 'assets/gameplay/select_number_base.png');
        game.load.image('players_side_base', 'assets/gameplay/players_side_base.png');
        game.load.image('players_details_row', 'assets/gameplay/players_details_row.png');
        game.load.image('player_name_area', 'assets/gameplay/player_name_area.png');
        game.load.image('profiles_details_area', 'assets/gameplay/profiles_details_area.png');
        game.load.image('behind_number_image', 'assets/gameplay/behind_number_image.png');
        game.load.image('ticket_claim_button', 'assets/gameplay/ticket_claim_button.png');
        game.load.image('ticket_hide_button', 'assets/gameplay/ticket_hide_button.png');
        game.load.image('claim_notifiation', 'assets/gameplay/claim_notifiation.png');

        game.load.image('cross_icon', 'assets/gameplay/cross_icon.png');
        game.load.image('profile_popup_base', 'assets/gameplay/profile_popup_base.png');
        game.load.image('sound_option_popup_line', 'assets/gameplay/sound_option_popup_line.png');
        game.load.image('sound_on_button', 'assets/gameplay/sound_on_button.png');
        game.load.image('sound_off_button', 'assets/gameplay/sound_off_button.png');

        //New Assets
        game.load.image('walletIcon','assets/gameplay/new/wallet.png');
        game.load.image('adPanel','assets/gameplay/new/ad_Panel.png');
        game.load.image('check','assets/gameplay/new/check.png');
        game.load.image('checkBox','assets/gameplay/new/checkBox.png');
        game.load.image('claim','assets/gameplay/new/claim.png');
        game.load.image('joinNow','assets/gameplay/new/join_Now.png');
        game.load.image('claim_top_area','assets/claim/top_area.png');
        //
        //


        //Load Sounds
        game.load.audio('welcome_sound', 'sounds/welcome_sound.mp3');
        game.load.audio('playing_with_one_sound', 'sounds/playing_with_one.mp3');
        game.load.audio('playing_with_two_sound', 'sounds/playing_with_two.mp3');
        game.load.audio('blocked_sound', 'sounds/blocked_notification.mp3');
        game.load.audio('claimed_sound', 'sounds/claimed.mp3');
        game.load.audio('button_click', 'sounds/button_click.mp3');
        game.load.audio('button_click_type_2', 'sounds/button_click_2.mp3');
        game.load.audio('number_click', 'sounds/number_click.mp3');
        game.load.audio('popup_showing_sound', 'sounds/popup_showing.mp3');
        game.load.audio('early_five_sound', 'sounds/early_five.mp3');
        game.load.audio('top_line_sound', 'sounds/top_line.mp3');
        game.load.audio('middle_line_sound', 'sounds/middle_line.mp3');
        game.load.audio('bottom_line_sound', 'sounds/bottom_line.mp3');
        game.load.audio('four_corners_sound', 'sounds/four_corners.mp3');
        game.load.audio('full_house_sound', 'sounds/full_house.mp3');

        for (var i = 1; i <= 90; i++) {
            game.load.audio('number_sound_' + i, 'sounds/numberDescription/number_sound_' + i + '.mp3');
        }
    }



}