function CSeat() {
    var _iCurBet;
    var _iCredit;
    var _aNumbersSelected;
    var _oFicheController;

    this._init = function() {
        this.reset();
    };

    this.reset = function() {
        _aNumbersSelected = new Array();

        if (_oFicheController) {
            _oFicheController.reset();
        }

        _iCurBet = 0;
    };

    this.setInfo = function(iCredit, oContainerFiche) {
        _iCredit = iCredit;
        _iCurBet = 0;

        _oFicheController = new CFichesController(oContainerFiche);
    };

    this.setFicheBettedOld = function(iFicheValue, aFichesMc, iNumFiches) {
        _iCurBet += (iFicheValue * iNumFiches);
        _iCredit -= (iFicheValue * iNumFiches);
        _iCredit = roundDecimal(_iCredit, 1);
    };

    this.setFicheBetted = function(iFicheValue, aFichesMc, iNumFiches) {
        _iCurBet += (iFicheValue * iNumFiches);

        if (serverRequests.mode === 'offline') {
            _iCredit -= (iFicheValue * iNumFiches);
            _iCredit = roundDecimal(_iCredit, 1);
        } else {}
    };

    this.addFicheOnTable = function(iFicheValue, iIndexFicheSelected, szNameAttach) {
        var aFichesMc = new Array();
        _oFicheController.setFicheOnTable(iIndexFicheSelected, szNameAttach, aFichesMc);
        this.setFicheBetted(iFicheValue, aFichesMc, 1);
    };

    this.decreaseBet = function(iAmount) {
        _iCurBet -= iAmount;
    };

    this.removeBet = function(szName) {
        _oFicheController.removeBet(szName);
    };

    this.swapBet = function(szPrevBet, szNewBet) {
        _oFicheController.swapBet(szPrevBet, szNewBet);
    };

    this.clearAllBets = function() {
        _oFicheController.clearAllBets();
        if (serverRequests.mode == 'offline') {
            _iCredit -= _iCurBet;
            _iCredit = roundDecimal(_iCredit, 1);
        } else {}
        _iCurBet = 0;
    };

    this.clearAllBetsInComePoint = function() {
        var iBetToSubtract = _oFicheController.clearAllBetsInComePoint();
        if (serverRequests.mode == 'offline') {
            _iCurBet -= iBetToSubtract;
            _iCredit += iBetToSubtract;
            _iCredit = roundDecimal(_iCredit, 1);
        } else {}
    };

    this.showWin = function(iWin) {
        if (serverRequests.mode == 'offline') {
            _iCredit += iWin;
            _iCredit = roundDecimal(_iCredit, 1);
        } else {
            _iCredit = serverRequests.updateWinAmount(iWin);
            _iCredit = _iCredit.balance;
        }
    };

    this.showWinOld = function(iWin) {
        _iCredit += iWin;
        _iCredit = roundDecimal(_iCredit, 1);
    };

    this.recharge = function(iMoney) {
        _iCredit = iMoney;
    };

    this.getCurBet = function() {
        return _iCurBet;
    };

    this.setCredit = function(_newMoney) {
        _iCredit = _newMoney;
    };

    this.getCredit = function() {
        return _iCredit;
    };

    this.getNumberSelected = function() {
        return _aNumbersSelected;
    };

    this.getFicheMc = function(szName) {
        return _oFicheController.getFicheMc(szName);
    };

    this.getBetAmountInPos = function(szName) {
        return _oFicheController.getBetAmountInPos(szName);
    };

    this._init();
}