var isShowConsole = true;
var Debug = {
    log : function(message,methodName){
        if(isShowConsole){
            console.log("The Debug..."+message+"The Method Name..."+methodName);
        }
    }
}