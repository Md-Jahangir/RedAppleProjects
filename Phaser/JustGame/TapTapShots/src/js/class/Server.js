

class Server {
    constructor() {
        this.urlParams = new URLSearchParams(window.location.search);
        this.timerValue = this.urlParams.get("timer");
    }
    IsUrlParamMissing() {
        if (!this.timerValue) {
            return true;
        }
        return false;
    }
}
let server = new Server();
export { server as Server }