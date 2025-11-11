function CGameSettings(){
    
    var _aCardDeck;
    var _aShuffledCardDecks;
    var _aCardValue;
    var _aFichesValue;
    
    this._init = function(){
        _aFichesValue = new Array(1, 5, 10, 25, 100, 500);
    };
		
    this.getFichesValues = function(){
            return _aFichesValue;
    };
		
    this.getFichesValueAt = function(iIndex){
            return _aFichesValue[iIndex];
    };
		
    this.getIndexForFiches = function(iValue){
        var iRes=0;
        for(var i=0;i<_aFichesValue.length;i++){
                if(_aFichesValue[i] === iValue){
                        iRes=i;
                }
        }
        return iRes; 
    };
		
    this.generateFichesPile = function(iFichesValue){
        var aFichesPile=new Array();
        var iValueRest;
        var iCont=_aFichesValue.length-1;
        var iCurMaxFicheStake=_aFichesValue[iCont];


        do{
                iValueRest=iFichesValue%iCurMaxFicheStake;
                iValueRest=CMath.roundDecimal(iValueRest,1);

                var iDivision=Math.floor(iFichesValue/iCurMaxFicheStake);

                for(var i=0;i<iDivision;i++){
                        aFichesPile.push(iCurMaxFicheStake);
                }

                iCont--;
                iCurMaxFicheStake=_aFichesValue[iCont];
                iFichesValue=iValueRest;
        }while(iValueRest>0 && iCont>-1);

        return aFichesPile;
    };
		
    this.timeToString = function( iMillisec ){		
        iMillisec = Math.round((iMillisec/1000));

        var iMins = Math.floor(iMillisec/60);
        var iSecs = iMillisec-(iMins*60);

        var szRet = "";

        if ( iMins < 10 ){
                szRet += "0" + iMins + ":";
        }else{
                szRet += iMins + ":";
        }

        if ( iSecs < 10 ){
                szRet += "0" + iSecs;
        }else{
                szRet += iSecs;
        } 

        return szRet;   
    };   
    this._init();
}