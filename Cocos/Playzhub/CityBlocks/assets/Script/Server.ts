
class Server {
    urlParams: URLSearchParams = new URLSearchParams(window.location.search);
    timerValue: string = this.urlParams.get("timer");
    gameID: string = this.urlParams.get("game_id");

    IsUrlParamsMissing(): boolean {
        if (!this.timerValue) {
            return true;
        }
        else {
            return false;
        }
    };
}

const server = new Server()
export { server as Server };


