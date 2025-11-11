import store from '@/store';


class StateManager {
    constructor() {
        // this.currentState = null;
        // this.playerData = null;
    }

    // eslint-disable-next-line no-unused-vars
    // SyncState(_args) {
    //     const event = new Event('stateChange');
    //     document.dispatchEvent(event);
    //     //
    //     // co
    //     // console.log('state manager args: : ', _args);
    //     // this.SetCurrentState(_args.status);
    //     // this.currentState = _args.status;
    //     // this.playerData = _args.players;
    //     // console.log('crnt st: ;:', this.currentState);
    // }

    get gameData() {
        return store.getters['room/getGameState'];
    }

    // GetCurrentState() {
    //     // return this.currentState;
    //     // console.log('GetCurrentState: ;:', this.currentState);
    //     return store.getters['room/getGameState'];
    // }

    GetPlayerData() {
        return this.playerData;
    }

    async UpdateState(elementId, newState) {
        try {
            await store.dispatch('room/updateState', { elementId, newState });
        } catch (error) {
            console.log(error);
        }
    }
    async TrackSequence(name, value) {
        try {
            await store.dispatch('room/trackSequence', { name, value });
        } catch (error) {
            console.log(error);
        }
    }
    async ToggleState(elementId) {
        try {
            let val = await store.dispatch('room/toggleState', elementId);
            console.log(val);
        } catch (error) {
            console.log('error', error);
        }
    }

    async addElementToBag(elementId) {
        //Save Data
        try {
            await store.dispatch('room/addToBag', elementId);
            await store.dispatch('room/updateState', {
                elementId,
                newState: 'picked'
            });
        } catch (error) {
            console.log('error', error);
        }
    }

    async removeElementFromBag(elementId, x, y) {
        try {
            await store.dispatch('room/removeFromBag', {
                elementId, x, y
            });
            await store.dispatch('room/updateState', {
                elementId,
                newState: 'dropped'
            });
        } catch (error) {
            console.log('error', error);
        }
    }
}

let stateManager = new StateManager();
export { stateManager as StateManager };
