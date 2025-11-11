
class Server {

    urlParams: URLSearchParams = new URLSearchParams(window.location.search);
    // timerValue: string = this.urlParams.get("timer");
    gameID: string = this.urlParams.get("game_id");

    // public IsUrlParamsMissing(): boolean {
    //     if (!this.timerValue) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // };
    public isListenerRegister = false;
}

const server = new Server()
export { server as Server };


