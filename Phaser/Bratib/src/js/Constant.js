class Constant {
    /**
     * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
     * @constructs
     */
    constructor() {
        this.game = null;
        this.scaleFactor = null;
        this.scaleFactorX = null;
        this.isMobile = null;
        this.currentAspectRatio = null;
        this.originalAspectRatio = null;
        this.currentRatio = null;
        this.timeToEnd = 60;
        this.fontName = null;
    };

    SetTextAsPerLanguage(_language) {
        switch (_language) {
            case "eng":
                this.fontName = "Kh_KoulenL";

                this.loadingText = "LOADING: ";
                this.playText = "PLAY";
                this.chooseBratibText = "CHOOSE YOUR BRATIB\nPLATE FIRST.\n\nYOU CAN'T CHANGE THE\nPLATE SIZE LATER.";
                this.decorateBratibText = "DECORATE YOUR BRATIB.";
                this.carefulText = "CAREFUL!\nYOU HAVE ONLY\n60 SECONDS TO\nFLOAT THE BRATIB.";
                this.nextText = "NEXT";
                this.startText = "START";
                this.previousText = "PREVIOUS";
                this.timeLeftText = "TIME LEFT";
                this.incenseText = "INCENSE";
                this.candleText = "CANDLE";
                this.flowerText = "FLOWER";
                this.marigoldText = "MARIGOLD";
                this.lotusText = "LOTUS";
                this.chompeyText = "CHOMPEY";
                this.jasmineText = "JASMINE";
                this.smallText = "SMALL";
                this.mediumText = "MEDIUM";
                this.bigText = "LARGE";
                this.redText = "RED";
                this.yellowText = "YELLOW";
                this.pinkText = "PINK";
                this.whiteText = "WHITE";
                this.orangeText = "ORANGE";
                this.selectYourBratibText = "SELECT YOUR BRATIB";
                this.floatBratibText = "FLOAT BRATIB";
                this.winMessage = "YOUR WISH\nHAS BEEN GRANTED!";
                this.looseMessage = "OOPS! TIME'S UP";
                this.scoreText = "SCORE : ";
                break;
            case "kh":
                this.fontName = "NotoSans_Regular";

                this.loadingText = "កំពុងដំណើរការ៖ ";
                this.playText = "លេង";
                this.chooseBratibText = "ជ្រើសរើស BRATIB របស់អ្នក\nចានដំបូង.\n\nអ្នកមិនអាចផ្លាស់ប្តូរ\nទំហំចាននៅពេលក្រោយបានទេ។.";
                this.decorateBratibText = "តុបតែង BRATIB របស់អ្នក។.";
                this.carefulText = "ប្រយ័ត្ន!\nអ្នកមានពេលតែ\n60វិនាទីដើម្បី\nអណ្តែតទឹក.";
                this.nextText = "បន្ដ";
                this.startText = "ចាប់ផ្ដើម";
                this.previousText = "ថយក្រោយ";
                this.timeLeftText = "រយៈពេលនៅសល់";
                this.incenseText = "ធូប";
                this.candleText = "ទាន";
                this.flowerText = "ផ្កា";
                this.marigoldText = "ផ្កាស្បៃលឿង";
                this.lotusText = "ផ្កាឈូក";
                this.chompeyText = "ផ្កាចំប៉ី";
                this.jasmineText = "ផ្កាម្លិះ";
                this.smallText = "តូច";
                this.mediumText = "កណ្ដាល";
                this.bigText = "ធំ";
                this.redText = "ពណ៌ក្រហម";
                this.yellowText = "ពណ៌លឿង";
                this.pinkText = "ពណ៌ផ្កាឈូក";
                this.whiteText = "ពណ៌ស";
                this.orangeText = "ពណ៌ទឹកក្រូច";
                this.selectYourBratibText = "ជ្រើសរើសប្រទីបរបស់អ្នក";
                this.floatBratibText = "បណ្ដែតប្រទីបរបស់អ្នក";
                this.winMessage = "បំណងប្រាថ្នារបស់អ្នកបានសម្រេច!";
                this.looseMessage = "អូ!! អស់ពេលហើយ"
                this.scoreText = "ពិន្ទុ : ";
                break;
        }
    };
};
let constant = new Constant();
export { constant as Constant };