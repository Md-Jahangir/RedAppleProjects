import Phaser from "phaser";
import { Constant } from "../Constant.js";
import { SelectedResolution } from "../ResolutionSelector.js";
import { Utils } from "../Utils.js";
import Table from "../ui/Table.js";
import Player from "../ui/Player.js";
import BottomPanel from "../ui/BottomPanel.js";
import { Model } from "../Model.js";
import { Client } from "../services/Client.js";
import LoadingPopup from "../popup/LoadingPopup.js";
import WinPopup from "../popup/WinPopup.js";
import AlertPopup from "../popup/AlertPopup.js";
// import { Timer } from "../Timer.js";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
        this.bottomPanel = null;
        this.table = null;
        // this.player = null;
        this.allPlayerArray = [];
        this.blindAnimCount = 0;
        this.chipArray = [];
        this.currentBet = 0;
        this.currentRound = null;
        this.loadingPopup = null;
        this.winPopup = null;
        this.alertPopup = null;
        this.cardAnimArray = [];
        this.currentPlayerId = null;
        this.totalTurnTime = null;
    };

    init() { };
    preload() { };

    create() {
        // Client.SetConnection();
        this.game.events.on("resize", this.resize, this);

        this.game.events.on("evtCreatePlayer", this.CreatePlayer, this);
        this.game.events.on("evtInactivePlayer", this.InactivePlayer, this);
        this.game.events.on("evtShowSmallAndBigBlind", this.ShowSmallAndBigBlind, this);
        this.game.events.on("evtShowBlindDeductAnimation", this.ShowBlindAmountDeductAnimation, this);
        this.game.events.on("evtShowCardDistributionAnimation", this.ShowCardDistributionAnimation, this);
        this.game.events.on("evtChangeTurn", this.ShowPlayerTurn, this);
        this.game.events.on("evtShowTimer", this.SetPlayerTimer, this);
        this.game.events.on("evtUpdatePotValue", this.OnUpdatePotValue, this);

        this.game.events.on("evtDealFlopRound", this.ShowFlopRound, this);
        this.game.events.on("evtDealTurnRound", this.ShowTurnRound, this);
        this.game.events.on("evtDealRiverRound", this.ShowRiverRound, this);
        this.game.events.on("evtShowDownRound", this.ShowShowDownRound, this);
        this.game.events.on("evtReplayHand", this.ShowReplayHand, this);
        this.game.events.on("evtReconnect", this.ReconnectPlayer, this);
        this.game.events.on("evtShowAlert", this.ShowAlertPopup, this);



        this.playerPosArray = [
            { x: 0, y: 220 },//middle down//0
            { x: -460, y: 150 },//left down//1
            { x: -430, y: -340 },//left up//2
            { x: 0, y: -415 },//middle up//3
            { x: 430, y: -340 },//right up//4
            { x: 460, y: 150 },//right down//5
        ];

        this.CreateGameplayBg();
        this.table = new Table(this);
        this.bottomPanel = new BottomPanel(this);
        this.CreateChip();
        this.loadingPopup = new LoadingPopup(this);
        this.winPopup = new WinPopup(this);
        this.alertPopup = new AlertPopup(this);

        //Create All player
        // for (let i = 0; i < 6; i++) {
        //     let player = new Player(this, this.playerPosArray[i].x, this.playerPosArray[i].y);
        //     // player.InactivePlayer();
        //     // player.ShowHideBackCard(true);
        //     this.allPlayerArray.push(player);
        // }
        // this.allPlayerArray[0].timer.ShowTimer(10);
        // this.allPlayerArray[0].ShowHideFrontCard(true);
        // this.winPopup.ShowWinPopup();
        // this.allPlayerArray[0].playerContainer.setDepth(2);

        // this.allPlayerArray[0].HighlightSelectedFrontCard(0);
        // this.allPlayerArray[0].ShowHideBackCard(true);
        // this.allPlayerArray[1].FoldPlayer();
        // console.log("this.allPlayerArray: ", this.allPlayerArray);

        // let time = new Timer(this, 300, 300);
        // setTimeout(() => {
        //     time.start(30);
        // }, 2000);

        this.resize(window.innerWidth, window.innerHeight);
        this.loadingPopup.ShowLoadingPopup();

    };

    CreateGameplayBg() {
        this.gameplayBg = this.add.image(0, 0, "background").setOrigin(0);
    };
    ResizeGameplayBg(newWidth, newHeight) {
        this.gameplayBg.setDisplaySize(newWidth, newHeight);
    };

    ShowAlertPopup(_msg) {
        this.alertPopup.ShowAlertPopup(_msg);
    };

    //----------------------------------------------------------
    //#region - CHIP ANIMATION
    CreateChip() {
        for (let i = 0; i < this.playerPosArray.length; i++) {
            let chip = this.add.image(0, 0, "poker_chip");
            chip.setVisible(false);
            this.chipArray.push(chip);
        }
    };
    ResizeChip(newWidth, newHeight, newScale) {
        for (let i = 0; i < this.chipArray.length; i++) {
            this.chipArray[i].setScale(newScale);
            this.chipArray[i].setPosition(newWidth / 2 + this.playerPosArray[i].x * newScale, newHeight / 2 + this.playerPosArray[i].y * newScale);
        }
    };
    ShowChipAnimation(_potAmount, _obj, _startX, _startY, _endPosX, _endPosY) {
        _obj.setVisible(true);
        let posTween = this.add.tween({
            targets: [_obj],
            delay: 200,
            x: _endPosX,
            y: _endPosY,
            ease: 'Linear',
            duration: 400,
            callbackScope: this,
            onComplete: function () {
                _obj.setVisible(false);
                _obj.setPosition(_startX, _startY);
                this.UpdatePotAmount(_potAmount);
            }
        });
    };

    //#endregion
    //----------------------------------------------------------------

    //#region - CREATE PLAYER
    CreatePlayer() {
        this.DestroyPlayer();
        let localPlayerID = Model.GetLocalPlayerID();
        let roomDetailsData = Model.GetRoomDetailsData();
        let playersResponseData = Model.GetPlayersData();
        let localPlayerIndex = playersResponseData.findIndex(user => user.user_id == localPlayerID);
        let localPlayerSeatIndex = playersResponseData[localPlayerIndex].seat_no;
        Model.SetLocalPlayerIndex(localPlayerSeatIndex);

        for (let i = 0; i < playersResponseData.length; i++) {
            let positionIndex = (playersResponseData[i].seat_no - localPlayerSeatIndex);
            if (positionIndex < 0) positionIndex += 6;
            let player = new Player(this, this.playerPosArray[positionIndex].x, this.playerPosArray[positionIndex].y);
            player.SetUserName(playersResponseData[i].username);
            player.SetUserBalance(playersResponseData[i].buyIn);
            player.SetPlayerId(playersResponseData[i].user_id);
            player.SetPlayerSittingIndex(playersResponseData[i].seat_no);
            player.SetPlayerPositionIndex(positionIndex);
            player.isDelear = playersResponseData[i].is_dealer;
            player.ShowHideDelearIcon(player.isDelear);
            this.allPlayerArray.push(player);
        }
        this.loadingPopup.HideLoadingPopup();
        this.resize(window.innerWidth, window.innerHeight);
    };

    DestroyPlayer() {
        for (let i = 0; i < this.allPlayerArray.length; i++) {
            this.allPlayerArray[i].DestroyPlayer();
        }
        this.allPlayerArray = [];
    };

    InactivePlayer() {
        let leavedUserId = Model.GetLeavedRoomPlayerDetails().user_id;
        for (let i = 0; i < this.allPlayerArray.length; i++) {
            if (this.allPlayerArray[i].GetPlayerId() == leavedUserId) {
                this.allPlayerArray[i].InactivePlayer();
            }
        }
    };
    //#endregion

    //#region - Show Hide SB BB    
    ShowSmallAndBigBlind() {
        let smallBlindId = Model.GetSmallBlindPlayerId();
        let bigBlindId = Model.GetBigBlindPlayerId();

        let smallBlindPlayerIndex = this.allPlayerArray.findIndex(user => user.playerId == smallBlindId);
        let bigBlindPlayerIndex = this.allPlayerArray.findIndex(user => user.playerId == bigBlindId);

        if (smallBlindPlayerIndex != -1 && bigBlindPlayerIndex != -1) {
            this.allPlayerArray[smallBlindPlayerIndex].SetSmallBlindAmount(Model.GetSmallBlindAmount());
            this.allPlayerArray[bigBlindPlayerIndex].SetBigBlindAmount(Model.GetBigBlindAmount());
            this.allPlayerArray[smallBlindPlayerIndex].ShowHideSmallBlind(true);
            this.allPlayerArray[bigBlindPlayerIndex].ShowHideBigBlind(true);
        }
    };
    HideSmalAndBigBlind() {
        let smallBlindId = Model.GetSmallBlindPlayerId();
        let bigBlindId = Model.GetBigBlindPlayerId();

        let smallBlindPlayerIndex = this.allPlayerArray.findIndex(user => user.playerId == smallBlindId);
        let bigBlindPlayerIndex = this.allPlayerArray.findIndex(user => user.playerId == bigBlindId);

        if (smallBlindPlayerIndex != -1 && bigBlindPlayerIndex != -1) {
            this.allPlayerArray[smallBlindPlayerIndex].ShowHideSmallBlind(false);
            this.allPlayerArray[bigBlindPlayerIndex].ShowHideBigBlind(false);
        }

        this.CreateCardForDistribution();
        this.resize(window.innerWidth, window.innerHeight);
    };
    //#endregion

    //#region - SB BB Deduct Animation
    ShowBlindAmountDeductAnimation() {
        let updateBlindsData = Model.GetUpdateBlindsData();
        let blindsId;
        for (let i = 0; i < this.allPlayerArray.length; i++) {
            if (this.allPlayerArray[i].playerId == updateBlindsData.user_id) {
                blindsId = this.allPlayerArray[i].positionIndex;
                this.allPlayerArray[i].SetUserBalance(updateBlindsData.buyIn);
            }
            if (this.allPlayerArray[i].playerId == updateBlindsData.user_id) {
                blindsId = this.allPlayerArray[i].positionIndex;
                this.allPlayerArray[i].SetUserBalance(updateBlindsData.buyIn);
            }
        }

        if (blindsId != null) {
            if (this.blindAnimCount == 0) {
                this.ShowChipAnimation(updateBlindsData.pot, this.chipArray[blindsId], this.chipArray[blindsId].x, this.chipArray[blindsId].y, this.table.tableContainer.x, Math.abs(this.table.potValueBase.y + 20));
                this.blindAnimCount++;
            } else if (this.blindAnimCount == 1) {
                this.ShowChipAnimation(updateBlindsData.pot, this.chipArray[blindsId], this.chipArray[blindsId].x, this.chipArray[blindsId].y, this.table.tableContainer.x, Math.abs(this.table.potValueBase.y + 20));
                this.blindAnimCount = 0;
            }
        }
    };
    //#endregion

    //#region - CARD DISTRIBUTION 
    CreateCardForDistribution() {
        console.log("CreateCardForDistribution: ", this.allPlayerArray.length)
        this.cardAnimArray = [];
        for (let i = 0; i < this.allPlayerArray.length * 2; i++) {
            // let card = this.add.image(0, 0, "user_card_back");
            let card = this.add.sprite(0, 0, "card_spritesheet").setOrigin(0.5).setScale(0.4);
            card.setFrame(52);
            this.cardAnimArray.push(card);
        }
    };
    ResizeCardForDistribution(newWidth, newHeight, newScale) {
        let gapY = 1;
        for (let i = 0; i < this.cardAnimArray.length; i++) {
            // this.cardAnimArray[i].setScale(newScale );
            // this.cardAnimArray[i].setPosition(newWidth / 2, newHeight / 2 - this.cardAnimArray[0].height * newScale - (gapY * i));
            this.cardAnimArray[i].setScale(newScale * 0.3);
            this.cardAnimArray[i].setPosition(newWidth / 2, newHeight / 2 - this.cardAnimArray[0].displayHeight * newScale - (gapY * i));
        }
    };

    PlayCardDistributionAnimation() {
        for (let i = 0; i < this.cardAnimArray.length; i++) {
            if (i < this.cardAnimArray.length / 2) {
                this.CreateDistributeTween(
                    i,
                    this.cardAnimArray[i],
                    this.allPlayerArray[i].playerContainer.x + this.allPlayerArray[i].userBackCard1.x / 1.5,
                    this.allPlayerArray[i].playerContainer.y + this.allPlayerArray[i].userBackCard1.y
                );
            } else {
                this.CreateDistributeTween(
                    i,
                    this.cardAnimArray[i],
                    this.allPlayerArray[i - this.cardAnimArray.length / 2].playerContainer.x + this.allPlayerArray[i - this.cardAnimArray.length / 2].userBackCard2.x / 1.5,
                    this.allPlayerArray[i - this.cardAnimArray.length / 2].playerContainer.y + this.allPlayerArray[i - this.cardAnimArray.length / 2].userBackCard2.y
                );
            }
        }
    }

    CreateDistributeTween(_indx, _obj, _endPosX, _endPosY) {
        // console.log("_endPosX: ", _endPosX);
        // console.log("_endPosY: ", _endPosY);
        // console.log("_obj: ", _obj);
        let posTween = this.add.tween({
            targets: [_obj],
            delay: 100 * _indx,
            x: _endPosX,
            y: _endPosY,
            scaleX: 0.26,
            scaleY: 0.26,
            ease: 'Linear',
            duration: 100,
            callbackScope: this,
            onComplete: function () {
                if (_indx == this.cardAnimArray.length - 1) {
                    console.log("show back and front card");
                    this.HideDistributionAnimCard();
                    this.ShowUserCard();
                }
            }

        });
    };

    HideDistributionAnimCard() {
        for (let i = 0; i < this.cardAnimArray.length; i++) {
            this.cardAnimArray[i].setVisible(false);
        }
    };

    ShowCardDistributionAnimation() {
        this.HideSmalAndBigBlind();
        console.log("ShowCardDistributionAnimation: ");
        this.PlayCardDistributionAnimation();
    };

    ShowUserCard() {
        let localPlayerID = Model.GetLocalPlayerID();
        let preFlopData = Model.GetPreFlopRoundData();
        if (preFlopData.player_details.user_id == localPlayerID) {
            for (let i = 0; i < this.allPlayerArray.length; i++) {
                if (this.allPlayerArray[i].GetPlayerId() == localPlayerID) {
                    this.allPlayerArray[i].SetCardValue(preFlopData.player_details.hands);
                    this.allPlayerArray[i].ShowHideFrontCard(true);
                } else {
                    this.allPlayerArray[i].ShowHideBackCard(true);
                }
            }
        }
    };
    //#endregion

    //#region - Show Timer
    SetPlayerTimer() {
        let timerData = Model.GetTimerData();
        // console.log("timerData: ", timerData);
        for (let i = 0; i < this.allPlayerArray.length; i++) {
            if (this.allPlayerArray[i].GetPlayerId() == timerData.current_player_id) {
                this.allPlayerArray[i].SetTimerValue(timerData.counter);
                this.totalTurnTime = timerData.actionTime;
            }
        }
    };
    //#endregion

    //#region - Show Player Turn
    ShowPlayerTurn() {
        let localPlayerID = Model.GetLocalPlayerID();
        let currentBetData = Model.GetTurnData();

        if (Object.keys(currentBetData).length > 0) {
            this.UpdatePotAmount(currentBetData.current_pot);
            for (let i = 0; i < this.allPlayerArray.length; i++) {
                this.allPlayerArray[i].ShowHideTimer(false);
                this.allPlayerArray[i].HideGraphicsTimer();
                this.allPlayerArray[i].ShowHideCurrentBetShowArea(false, "");
                if (this.allPlayerArray[i].GetPlayerId() == currentBetData.current_player_id) {
                    if (!currentBetData.isFolded) {
                        this.allPlayerArray[i].ShowHideTimer(true);
                        this.allPlayerArray[i].ShowGraphicsTimer(this.totalTurnTime);
                        if (currentBetData.current_player_id == localPlayerID) {
                            // this.bottomPanel.SetCurrentHighestRaiseAmount(currentBetData.current_player_buyIn);
                            // if (currentBetData.current_bet > 0) {
                            //     this.bottomPanel.SetCurrentRaiseAmount(currentBetData.current_bet);
                            // } else {
                            //     this.bottomPanel.SetCurrentRaiseAmount(Model.GetBigBlindAmount());
                            // }
                            this.bottomPanel.ShowAllBetButton();
                            this.bottomPanel.ShowCheckOrCallButton(currentBetData.is_check);
                            this.bottomPanel.ShowAllInButtonForPlayer(currentBetData.is_all_in);
                            this.allPlayerArray[i].ShowHideCurrentBetShowArea(true, currentBetData.current_bet);
                            this.currentBet = currentBetData.current_bet;
                            this.currentPlayerId = currentBetData.current_player_id;
                            this.currentInHandBalance = currentBetData.current_player_buyIn;
                        } else {
                            this.bottomPanel.HideAllBetButton();
                            this.bottomPanel.HideRaiseSlider();
                        }
                    } else {
                        this.allPlayerArray[i].ShowHideTimer(false);
                        this.allPlayerArray[i].HideGraphicsTimer();
                    }
                } else {
                    this.allPlayerArray[i].ShowHideTimer(false);
                    this.allPlayerArray[i].HideGraphicsTimer();
                }
            }
        } else {
            //Taking from Recoonet 
        }
    };
    //#endregion

    //#region - Place Bet 
    PlaceBetForCurrentPlayer() {
        for (let i = 0; i < this.allPlayerArray.length; i++) {
            // this.allPlayerArray[i].ResetTimerGraphics();
            this.allPlayerArray[i].ShowHideTimer(false);
            this.allPlayerArray[i].HideGraphicsTimer();
            this.allPlayerArray[i].ShowHideCurrentBetShowArea(false, "");
        }
        Client.PlaceBet(Model.GetAuthToken(), Model.GetGameId(), this.currentPlayerId, this.currentInHandBalance, this.currentBet);
    };
    //#endregion

    //#region - Update Pot Value
    OnUpdatePotValue() {
        let updatePotdata = Model.GetUpdatePotValueData();
        let playerId;

        for (let i = 0; i < this.allPlayerArray.length; i++) {
            this.allPlayerArray[i].ShowHideTimer(false);
            this.allPlayerArray[i].HideGraphicsTimer();

            if (this.allPlayerArray[i].playerId == updatePotdata.data.user_id) {
                this.allPlayerArray[i].HideDecisionBase();
                if (!updatePotdata.data.isFolded) {
                    this.allPlayerArray[i].SetUserBalance(updatePotdata.data.buyIn);
                    playerId = this.allPlayerArray[i].positionIndex;
                    setTimeout(() => {
                        this.allPlayerArray[i].ShowDecisionBase(updatePotdata.data.bet_status);
                    }, 100);
                } else {
                    this.allPlayerArray[i].FoldPlayer();
                    // this.allPlayerArray[i].ShowHideTimer(false);
                    // this.allPlayerArray[i].HideGraphicsTimer();
                    this.bottomPanel.HideAllBetButton();
                    this.bottomPanel.HideRaiseSlider();
                }
            }
        }

        if (playerId != null) {
            if (updatePotdata.data.bet_status == "called" || updatePotdata.data.bet_status == "raised") {
                this.ShowChipAnimation(updatePotdata.data.pot, this.chipArray[playerId], this.chipArray[playerId].x, this.chipArray[playerId].y, this.table.tableContainer.x, Math.abs(this.table.potValueBase.y + 20));
            }
        }

        if (updatePotdata.data.pot_split) {
            this.table.CreatePotSplitArea(updatePotdata.data.pot_spit_data);
        } else {
            this.table.DestroyPotSplitArea();
        }
    };

    UpdatePotAmount(_amount) {
        this.table.SetPotValue(_amount);
    };
    //#endregion

    //#region - Flop Round
    ShowFlopRound() {
        for (let i = 0; i < this.allPlayerArray.length; i++) {
            // this.allPlayerArray[i].ResetTimerGraphics();
            this.allPlayerArray[i].ShowHideTimer(false);
            this.allPlayerArray[i].HideGraphicsTimer();
        }
        let flopRoundData = Model.GetDealFlopRoundData();
        this.table.ShowTableCard(flopRoundData.community_cards, "dealFlop");
    };

    //#endregion

    //#region - Turn Round
    ShowTurnRound() {
        for (let i = 0; i < this.allPlayerArray.length; i++) {
            // this.allPlayerArray[i].ResetTimerGraphics();
            this.allPlayerArray[i].ShowHideTimer(false);
            this.allPlayerArray[i].HideGraphicsTimer();
        }
        let turnRoundData = Model.GetDealTurnRoundData();
        this.table.ShowTableCard(turnRoundData.community_cards, "dealTurn");
    };
    //#endregion

    //#region - River Round
    ShowRiverRound() {
        for (let i = 0; i < this.allPlayerArray.length; i++) {
            // this.allPlayerArray[i].ResetTimerGraphics();
            this.allPlayerArray[i].ShowHideTimer(false);
            this.allPlayerArray[i].HideGraphicsTimer();
        }
        let riverRoundData = Model.GetDealRiverRoundData();
        this.table.ShowTableCard(riverRoundData.community_cards, "dealRiver");
    };
    //#endregion

    //#region -ShowDown Round
    ShowShowDownRound() {
        for (let i = 0; i < this.allPlayerArray.length; i++) {
            // this.allPlayerArray[i].ResetTimerGraphics();
            this.allPlayerArray[i].ShowHideTimer(false);
            this.allPlayerArray[i].HideGraphicsTimer();
        }
        let showDownRoundData = Model.GetShowDownRoundData();

        for (let i = 0; i < this.allPlayerArray.length; i++) {
            for (let j = 0; j < showDownRoundData.players.length; j++) {
                if (!showDownRoundData.players[j].isFolded) {
                    if (this.allPlayerArray[i].GetPlayerId() == showDownRoundData.players[j].user_id) {
                        this.allPlayerArray[i].SetCardValue(showDownRoundData.players[j].hands);
                        this.allPlayerArray[i].ShowHideFrontCard(true);
                        this.allPlayerArray[i].ShowHideBackCard(false);
                        this.allPlayerArray[i].HideDecisionBase();
                        setTimeout(() => {
                            this.allPlayerArray[i].ShowDecisionBase(showDownRoundData.players[j].hand_rank);
                        }, 100);
                        this.allPlayerArray[i].SetUserBalance(showDownRoundData.players[j].buyIn);
                    }
                    if (showDownRoundData.players[j].is_winner) {
                        if (this.allPlayerArray[i].GetPlayerId() == showDownRoundData.players[j].user_id) {
                            this.winPopup.ShowWinPopup();
                            this.winPopup.SetWinAmountAndName(showDownRoundData.players[j].username, showDownRoundData.players[j].win_amt);
                            this.allPlayerArray[i].playerContainer.setDepth(2);
                            this.table.HighLightWinCards(showDownRoundData.players[j].com_cards);

                            for (let i = 0; i < showDownRoundData.players[j].hands.length; i++) {
                                if (showDownRoundData.players[j].hands[i].is_combination) {
                                    this.allPlayerArray[j].HighlightSelectedFrontCard(i);
                                } else {
                                    this.allPlayerArray[j].UnselectedFrontCardWhenHighlight(i);
                                }
                            }
                        }
                    }
                } else {

                    if (this.allPlayerArray[i].GetPlayerId() == showDownRoundData.players[j].user_id) {
                        this.allPlayerArray[i].HideDecisionBase();
                        this.allPlayerArray[i].FoldPlayer();
                    }
                }
            }
        }
    };
    //#endregion

    //#region - Replay Hand
    ShowReplayHand() {
        this.loadingPopup.ShowLoadingPopup();
        let replayData = Model.GetReplayHandData();
        this.ResetAllHandDataAndPlayer();
        for (let i = 0; i < this.allPlayerArray.length; i++) {
            for (let j = 0; j < replayData.players.length; j++) {
                if (!replayData.players[i].is_left) {
                    if (this.allPlayerArray[i].GetPlayerId() == replayData.players[j].user_id) {
                        this.allPlayerArray[i].ShowHideDelearIcon(replayData.players[j].is_dealer);
                    }
                } else {
                    this.allPlayerArray[i].InactivePlayer();
                }
            }
        }
        this.loadingPopup.HideLoadingPopup();
    };

    ResetAllHandDataAndPlayer() {
        this.winPopup.HideWinPopup();
        this.winPopup.SetWinAmountAndName("", 0);
        this.table.ResetHighLightWinCard();
        this.UpdatePotAmount(0);
        this.bottomPanel.HideAllBetButton();
        this.bottomPanel.HideRaiseSlider();
        for (let i = 0; i < this.allPlayerArray.length; i++) {
            this.allPlayerArray[i].ShowHideTimer(false);
            this.allPlayerArray[i].HideGraphicsTimer();
            this.allPlayerArray[i].playerContainer.setDepth(0);
            this.allPlayerArray[i].UnfoldPlayer();
            this.allPlayerArray[i].HideDecisionBase();
            this.allPlayerArray[i].ShowHideCurrentBetShowArea(false, "");

            this.allPlayerArray[i].ShowHideFrontCard(false);
            this.allPlayerArray[i].ShowHideBackCard(false);
            this.allPlayerArray[i].HideOutline();
        }
    };
    //#endregion

    //#region - Reconnect Session
    ReconnectPlayer() {
        this.loadingPopup.ShowLoadingPopup();
        let reconnectData = Model.GetReconnectData();
        this.UpdatePotAmount(reconnectData.current_pot);
        this.currentRound = reconnectData.current_round;
        this.table.ShowTableCard(reconnectData.community_cards, "");
        Model.SetRoomName(reconnectData.room_name);
        Model.SetGameId(reconnectData.game_id);
        //player create
        Model.SetPlayersData(reconnectData.players);
        this.CreatePlayer();
        for (let i = 0; i < this.allPlayerArray.length; i++) {
            this.allPlayerArray[i].ShowHideTimer(false);
            this.allPlayerArray[i].HideGraphicsTimer();
            if (this.allPlayerArray[i].GetPlayerId() == reconnectData.current_player_id) {
                this.allPlayerArray[i].ShowHideTimer(true);
                this.allPlayerArray[i].ShowGraphicsTimer(this.totalTurnTime);
            } else {
                this.allPlayerArray[i].ShowHideTimer(false);
                this.allPlayerArray[i].HideGraphicsTimer();
            }
        }

        if (reconnectData.current_round != "pre-flop") {
            this.ShowUserCard();
        }

        // for (let i = 0; i < this.allPlayerArray.length; i++) {
        //     this.allPlayerArray[i].ShowHideTimer(false);
        //     if (this.allPlayerArray[i].GetPlayerId() == reconnectData.current_player_id) {
        //         console.log("reconnec: ", this.allPlayerArray[i]);
        //         for (let j = 0; j < reconnectData.players.length; j++) {
        //             if (reconnectData.players[j].user_id == reconnectData.current_player_id) {
        //                 console.log("yes matched: ", reconnectData.players[j]);
        //                 if (!reconnectData.players[j].isFolded) {
        //                     console.log("show time.....");
        //                     this.allPlayerArray[i].ShowHideTimer(true);
        //                 } else {
        //                     this.allPlayerArray[i].ShowHideTimer(false);
        //                 }
        //             } else {
        //                 this.allPlayerArray[i].ShowHideTimer(false);
        //             }
        //         }
        //     } else {
        //         this.allPlayerArray[i].ShowHideTimer(false);
        //     }
        // }
    };
    //#endregion

    resize(newWidth, newHeight) {
        let newScale = Utils.getScale(SelectedResolution.width, SelectedResolution.height, newWidth, newHeight);
        this.ResizeGameplayBg(newWidth, newHeight);

        this.table.resize(newWidth, newHeight, newScale);
        this.bottomPanel.resize(newWidth, newHeight, newScale);
        for (let i = 0; i < this.allPlayerArray.length; i++) {
            this.allPlayerArray[i].resize(newWidth, newHeight, newScale);;
        }
        this.ResizeChip(newWidth, newHeight, newScale);
        this.ResizeCardForDistribution(newWidth, newHeight, newScale);

        this.loadingPopup.resize(newWidth, newHeight, newScale);
        this.winPopup.resize(newWidth, newHeight, newScale);
        this.alertPopup.resize(newWidth, newHeight, newScale);
    };

    //########################################################################################


}