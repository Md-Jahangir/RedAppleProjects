//#region - Class defination 
class Constant {
    constructor() {
        this.gameNameArray = [
            { name: "Bingo", url: "https://game.redappletech.info/Bingo/", image: "./images/bingo.png" },
            { name: "Craps", url: "https://game.redappletech.info/Craps/", image: "./images/craps.png" },
            { name: "SlotWarland", url: "https://game.redappletech.info/slot_container_anim/", image: "./images/warland_slot.png" },
            { name: "SlotVegasSlot", url: "https://justgamebuild.s3.us-east-2.amazonaws.com/SlotVegasSlot/index.html?mode=offline", image: "./images/vegas_slot.png" },
            { name: "SlotBasketballMania", url: "https://justgamebuild.s3.us-east-2.amazonaws.com/SlotBasketballMania/index.html?mode=offline", image: "./images/basketball_mania.png" },
            { name: "SlotCryptoKings", url: "https://justgamebuild.s3.us-east-2.amazonaws.com/SlotCryptoKings/index.html?mode=offline", image: "./images/crypto_kings.png" },
            { name: "SlotSoccerStrike", url: "https://justgamebuild.s3.us-east-2.amazonaws.com/SlotSoccerStrike/index.html?mode=offline", image: "./images/soccer_strike.png" },
            { name: "SlotFootballBlitz", url: "https://justgamebuild.s3.us-east-2.amazonaws.com/SlotFootballBlitz/index.html?mode=offline", image: "./images/football_blitz.png" },
            { name: "Blackjack", url: "https://justgamebuild.s3.us-east-2.amazonaws.com/CasinoBlackjack/index.html?mode=offline", image: "./images/blackjack.png" },
            { name: "Baccarat", url: "https://justgamebuild.s3.us-east-2.amazonaws.com/CasinoBaccarat/index.html?mode=offline", image: "./images/baccarat.png" },
            { name: "SlotGreatBlue", url: "http://justgamebuild.s3.us-east-2.amazonaws.com/SlotGreatBlue/index.html?gameID=2&remoteId=https://ultra888.com/_1647950673&soundStatus=1&musicStatus=1", image: "./images/great_blue.png" },
            { name: "SlotIceLand", url: "http://justgamebuild.s3.us-east-2.amazonaws.com/SlotIceLand/index.html?gameID=3&remoteId=https://ultra888.com/_1647950673&soundStatus=1&musicStatus=1", image: "./images/ice_land.png" },
            { name: "SlotHighwayKings", url: "http://justgamebuild.s3.us-east-2.amazonaws.com/SlotHighwayKings/index.html?gameID=1&remoteId=https://ultra888.com/_1647950673&soundStatus=1&musicStatus=1", image: "./images/highway_kings.png" },

        ];
    };

};
//#endregion 
let constant = new Constant();
export { constant as Constant };