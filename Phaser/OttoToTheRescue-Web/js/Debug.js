var isShowConsole = true;
var Debug = {
    log : function(message,methodName,className){
        if(isShowConsole){
            console.log(message+"The Method Name..."+methodName+"The Class Name..."+className);
        }
    }
}