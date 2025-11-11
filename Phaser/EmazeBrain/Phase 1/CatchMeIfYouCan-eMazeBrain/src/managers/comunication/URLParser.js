import Utils from "@base/utils/Utils"
import Signals from "@/signals/GameSignals";
import Facade from "@/Facade";

export default class URLParser {

  constructor() {
    this.gameCode = null
    this.platform = null
    this.casinoToken = null
    this.currency = null
    this.language = null
    this.playForFun = null
    this.playerUid = null
    this.autoSpin = true
    this.maxBet = true
    this.lobbyUrl = false
    this.realityCheckTime = null
    this.forceCoinAmount = false
    this.extParams = null
    this.customer = null

    this.init()
  }

  init() {
    this.parseUrlSettings()
  }

  parseUrlSettings() {
      this.gameCode = Utils.getUrlParam('game_code', this.gameCode)
      this.platform = Utils.getUrlParam('platform', this.platform)
      this.casinoToken = Utils.getUrlParam('casino_token', this.casinoToken)
      this.currency = Utils.getUrlParam('currency', this.currency)
      this.language = Utils.getUrlParam('language', this.language)
      this.playForFun = Utils.getUrlParam('play_for_fun', this.playForFun)
      this.playerUid = Utils.getUrlParam('player_uid', this.playerUid)
      this.autoSpin = Utils.getUrlParam('auto_spin', this.autoSpin) !== 'false'
      this.maxBet = Utils.getUrlParam('max_bet', this.maxBet) !== 'false'
      this.customer = Utils.getUrlParam('customer', this.customer)
      this.realityCheckTime = Utils.getUrlParam('reality_check_time', this.realityCheckTime)
      this.forceRace = Utils.getUrlParam('force_race', this.forceRace)
      this.forceRaceSymbolMultiplier = Utils.getUrlParam('force_race_symbol_multiplier', this.forceRaceSymbolMultiplier)
      this.forceRaceFreebet = Utils.getUrlParam('force_race_freebet', this.forceRaceFreebet)
      this.forceFreebet = Utils.getUrlParam('force_freebet', this.forceFreebet)
      this.forceCoinAmount = Utils.getUrlParam('force_coin_amount', this.forceCoinAmount)
      this.extParams = Utils.searchParam('ext_params') //Utils.getUrlParam('ext_params', this.extParams)
      this.customer = Utils.getUrlParam('customer', this.customer)
      this.lobbyUrl = Utils.getUrlParam('lobby_url', this.lobbyUrl)

      this.data = {
          gameCode: this.gameCode,
          platform: this.platform,
          casinoToken: this.casinoToken,
          currency: this.currency,
          language: this.language,
          playForFun: this.playForFun,
          playerUid: this.playerUid,
          autoSpin: this.autoSpin,
          maxBet: this.maxBet,
          realityCheckTime: this.realityCheckTime,
          forceCoinAmount: this.forceCoinAmount,
          extParams: this.extParams,
          customer: this.customer,
          lobbyUrl: this.lobbyUrl
      }

      if (this.data.playForFun == null) {
          if (this.data.playerUid) {
              this.data.playForFun = false
          } else {
              this.data.playForFun = true
          }
      }

      Facade.urlParams = this.data
  }

}
