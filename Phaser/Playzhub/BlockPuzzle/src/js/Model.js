/********* Script_Details ************
 * @Original_Creator :- Md Jahangir.
 * @Created_Date :- 16-02-2024.
 * @Last_Update_By :- Md Jahangir.
 * @Last_Updatd_Date :- 09-08-2024
 * @Description :- Store all the data for globally access.
 ************************************/

class Model {
  constructor() {
    this.authToken = null;
    this.tableId = null;
    this.maxPlayerCount = null;
    this.buyInAmount = null;
    this.playerData = null;
    this.roomDetailsData = null;
    this.playersData = null;
    this.localPlayerId = null;
    this.localPlayerIndex = null;
    this.smallBigBlindPlayerIdData = null;
    this.smallBlindAmount = null;
    this.bigBlindAmount = null;
    this.smallBlindPlayerId = null;
    this.bigBlindPlayerId = null;
    this.blindsData = null;
    this.preFlopData = null;
    this.currentBetAndButtonData = null;
    this.updatePotData = null;
    this.dealFlopRoundData = null;
    this.dealTurnRoundData = null;
    this.dealRiverRoundData = null;
    this.showDownRoundData = null;
    this.timerData = null;
    this.replayHandData = null;
    this.reconnectData = null;
  };
  //#############################################################################################

  GetAuthToken() {
    return this.authToken;
  };
  SetAuthToken(_token) {
    this.authToken = _token;
  };

  GetGameId() {
    return this.gameId;
  };
  SetGameId(_id) {
    this.gameId = _id;
  };

  GetTableId() {
    return this.tableId;
  };
  SetTableId(_id) {
    this.tableId = _id;
  };

  SetMaxPlayersCount(_count) {
    this.maxPlayerCount = _count;
  };
  GetMaxPlayersCount() {
    return this.maxPlayerCount;
  };

  SetBuyInAmount(_amount) {
    this.buyInAmount = _amount;
  };
  GetBuyInAmount() {
    return this.buyInAmount;
  };

  SetRoomName(_name) {
    this.roomName = _name;
  };
  GetRoomName() {
    return this.roomName;
  };

  SetRoomDetailsData(_data) {
    this.roomDetailsData = _data;
  };
  GetRoomDetailsData() {
    return this.roomDetailsData;
  };

  SetPlayersData(_data) {
    this.playersData = _data;
  };
  GetPlayersData() {
    return this.playersData;
  };

  UpdateRoomDetailsData(_playerData) {
    this.roomDetailsData.players.push(_playerData);
  };

  SetLeavedRoomPlayerDetails(_data) {
    this.leavedRoomPlayerData = _data;
  };
  GetLeavedRoomPlayerDetails() {
    return this.leavedRoomPlayerData;
  };

  SetSmallBigBlindPlayerData(_data) {
    this.smallBigBlindPlayerIdData = _data;
  };
  GetSmallBigBlindPlayerData() {
    return this.smallBigBlindPlayerIdData;
  };

  SetSmallBlindPlayerId(_data) {
    for (let i = 0; i < _data.blinds.length; i++) {
      if (_data.blinds[i].blind === 'small-blind') {
        this.smallBlindPlayerId = _data.blinds[i].user_id;
      }
    }
  }
  GetSmallBlindPlayerId() {
    return this.smallBlindPlayerId;
  }
  SetBigBlindPlayerId(_data) {
    for (let i = 0; i < _data.blinds.length; i++) {
      if (_data.blinds[i].blind === 'big-blind') {
        this.bigBlindPlayerId = _data.blinds[i].user_id;
      }
    }
  }
  GetBigBlindPlayerId() {
    return this.bigBlindPlayerId;
  }

  SetUpdateBlindsData(_data) {
    this.blindsData = _data;
  };
  GetUpdateBlindsData() {
    return this.blindsData;
  }

  SetPreFlopRoundData(_data) {
    this.preFlopData = _data;
  }
  GetPreFlopRoundData() {
    return this.preFlopData;
  }

  SetLocalPlayerId(_id) {
    this.localPlayerId = _id;
  };
  GetLocalPlayerID() {
    return this.localPlayerId;
  }

  SetLocalPlayerIndex(_index) {
    this.localPlayerIndex = _index;
  };
  GetlocalPlayerIndex() {
    return this.localPlayerIndex;
  };

  SetSmallBlindAmount(_amount) {
    this.smallBlindAmount = parseInt(_amount);
  };
  GetSmallBlindAmount() {
    return this.smallBlindAmount;
  };
  SetBigBlindAmount(_amount) {
    this.bigBlindAmount = parseInt(_amount);
  };
  GetBigBlindAmount() {
    return this.bigBlindAmount;
  };

  SetTurnData(_data) {
    this.currentBetAndButtonData = _data;
  };

  GetTurnData() {
    return this.currentBetAndButtonData;
  };

  SetTimerData(_data) {
    this.timerData = _data;
  };

  GetTimerData() {
    return this.timerData;
  };

  SetUpdatePotValueData(_data) {
    this.updatePotData = _data;
  };

  GetUpdatePotValueData() {
    return this.updatePotData;
  };

  SetDealFlopRoundData(_data) {
    this.dealFlopRoundData = _data;
  }

  GetDealFlopRoundData() {
    return this.dealFlopRoundData;
  }

  SetDealTurnRoundData(_data) {
    this.dealTurnRoundData = _data;
  }

  GetDealTurnRoundData() {
    return this.dealTurnRoundData;
  }

  SetDealRiverRoundData(_data) {
    this.dealRiverRoundData = _data;
  }

  GetDealRiverRoundData() {
    return this.dealRiverRoundData;
  }

  SetShowDownRoundData(_data) {
    this.showDownRoundData = _data;
  }

  GetShowDownRoundData() {
    return this.showDownRoundData;
  }

  SetReplayHandData(_data) {
    this.replayHandData = _data;
  }
  GetReplayHandData() {
    return this.replayHandData;
  }

  SetReconnectData(_data) {
    this.reconnectData = _data;
  }
  GetReconnectData() {
    return this.reconnectData;
  }

  //#region -Get card suit
  GetCardSuit(_type) {
    switch (_type) {
      case 'H':
        return 0;

      case 'D':
        return 1;

      case 'C':
        return 2;

      case 'S':
        return 3;

    }
  };
  //#endregion

  //#region - Get card number 
  GetCardNumber(_number) {
    const map = {
      'A': 0,
      '2': 1,
      '3': 2,
      '4': 3,
      '5': 4,
      '6': 5,
      '7': 6,
      '8': 7,
      '9': 8,
      '10': 9,
      'J': 10,
      'Q': 11,
      'K': 12
    };
    return map[_number];
  };
  //#endregion

  //#region - Get Actual card frame index
  GetActualCardFrameIndex(_cardId) {
    if (_cardId !== null) {
      const str = _cardId;
      const splitArr = str.split('');
      const numPart = (splitArr.length > 2) ? (splitArr[0] + splitArr[1]) : splitArr[0];
      const suitePart = (splitArr.length > 2) ? splitArr[2] : splitArr[1];
      const cardNumber = this.GetCardNumber(numPart);
      const suitIndex = this.GetCardSuit(suitePart);
      const frameIndex = (suitIndex * 13) + cardNumber;
      return frameIndex;
    }
  };
  //#endregion
};

const gameModel = new Model();

export { gameModel as Model };