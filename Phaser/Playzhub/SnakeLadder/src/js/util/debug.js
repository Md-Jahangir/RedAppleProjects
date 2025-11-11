class Debug {

    log(_bool = false, _msg, _obj = null) {
        if (_bool) {
            if (_obj != null) {
                console.log(_msg, _obj);
            }
            else {
                console.log(_msg);
            }
        }
    }
}
const debug = new Debug();
export { debug as Debug };
