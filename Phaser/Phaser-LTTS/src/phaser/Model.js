class Model {
    constructor() {
        this.popupDetailsData = [];
        this.elementsData = [];

    }

    //#############################################################################################
    GetElementsDetailsData() {
        return this.elementsData;
    }

    SetElementsDetailsData(_newData) {
        this.elementsData = _newData;
    }

    GetPopupDetailsData() {
        return this.popupDetailsData;
    }

    SetPopupDetailsData(_newDetails) {
        this.popupDetailsData = _newDetails;
    }
}

let gameModel = new Model();
export {gameModel as Model};
