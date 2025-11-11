class Constant {
    /**
     * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
     * @constructs
     */
    constructor() {
        this.game = null;
        this.scaleFactor = null;
        this.isMobile = null;
        this.currentAspectRatio = null;
        this.originalAspectRatio = null;
        this.currentRatio = null;
        this.SetLanguage();
    };

    SetLanguage() {
        this.ERROR_MSG_TEXT = "Sorry ! There are some value not found...";
        this.PLAY_TEXT = "PLAY";
        this.EMAIL_ID_TEXT = "EMAIl ID";
        this.PASSWORD_TEXT = "PASSWORD";
        this.FORGOT_PASSWORD_TEXT = "FORGOT PASSWORD";
        this.NEW_PASSWORD_TEXT = "NEW PASSWORD";
        this.CONFIRM_PASSWORD_TEXT = "CONFIRM PASSWORD";
        this.OTP_TEXT = "OTP";

        this.EMAIL_PLACE_HOLDER_TEXT = "Enter your email"
        this.PASSWORD_PLACE_HOLDER_TEXT = "Enter your password"
        this.NEW_PAASWORD_PLACE_HOLDER_TEXT = "New Password"
        this.CONFIRM_PAASWORD_PLACE_HOLDER_TEXT = "Confirm password"
        this.MOBILE_NUMBER_PLACE_HOLDER_TEXT = "Enter your Mobile Number"
        this.USER_NAME_PLACE_HOLDER_TEXT = "Enter your name"
        this.OTP_PLACE_HOLDER_TEXT = "Enter OTP"

        this.EMAIL_MISSING_TEXT = "Enter email id";
        this.USER_NAME_MISSING_TEXT = "Enter user name";
        this.MOBILE_MISSING_TEXT = "Enter mobile number";
        this.PASSWORD_MISSING_TEXT = "Enter password";
        this.NEW_PASSWORD_MISSING_TEXT = "Enter new password";
        this.CONFIRM_PASSWORD_MISSING_TEXT = "Enter password again";
        this.OTP_MISSING_TEXT = "Enter OTP sent your email";
        this.PASSWORD_NOT_MATCH_TEXT = "Pasword not matched";

        this.I_HAVE_READ_TEXT = "I have read and agreed with";
        this.USER_SERVICE_TEXT = "User Service Agreement";
        this.NEW_HERE_TEXT = "NEW HERE ?";
        this.SIGN_UP_TEXT = "SIGN UP";
        this.SIGN_IN_TEXT = "SIGN IN";
        this.USER_NAME_TEXT = "USER NAME";
        this.MOBILE_NO_TEXT = "MOBILE NO";
        this.ALREADY_HAVE_ACCOUNT_TEXT = "ALREADY HAVE AN ACCOUNT ?";
        this.FORGOT_YOUR_PASSWORD_TEXT = "FORGOT YOUR PASSWORD ?";
        this.ENTER_EMAIL_BELLOW_MESSAGE_TEXT = "Enter your email below to reset your password";
        this.SUBMIT_TEXT = "SUBMIT";
        this.TABLES_TEXT = "TABLES";
        this.SELECT_TABLES_AND_PLAY_TEXT = "Select Tables And Start Playing";
        this.TOURNAMENTS_TEXT = "TOURNAMENTS";
        this.NLH_TEXT = "NLH";
        this.PLH_TEXT = "PLH";
        this.FOLD_TEXT = "FOLD";
        this.CALL_TEXT = "CALL";
        this.CHECK_TEXT = "CHECK";
        this.RAISE_TEXT = "RAISE";
        this.ALL_IN_TEXT = "ALL IN";

    };
};
let constant = new Constant();
export { constant as Constant };