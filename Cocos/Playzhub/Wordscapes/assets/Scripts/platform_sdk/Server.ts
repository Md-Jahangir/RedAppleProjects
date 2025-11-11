class Server {
    //#region Fields
    urlParams: URLSearchParams = null;
    gameID: string = null;
    numberOfPlayButtonClicked: number = 0;
    //#endregion

    //#region -Constructor
    constructor() {
        this.urlParams = new URLSearchParams(window.location.search);
        this.gameID = this.urlParams.get("game_id");
    }
    //#endregion

    //#region IsUrlParamsMissing
    IsUrlParamsMissing(): boolean {

        if (!this.gameID) return true;

        else return false;

    };
    //#endregion

    NumberOfPlayButtonClickedIncreament(): void {
        this.numberOfPlayButtonClicked += 1;
    }
}

const server = new Server()
export { server as Server };

