import * as Colyseus from 'colyseus.js';
import axios from 'axios';
const clockEvent = new Event('onClockChange');
const gameStatusEvent = new Event('onGameStatusChange');
const playerEvent = new Event('onPlayerStateChange');
const elementEvent = new Event('onElementStateChange');

const state = {
    client: null,
    room: null,
    gameState: {},
    indicatorMessage: ''
};

const getters = {
    getClient: (state) => {
        return state.client;
    },
    getRoom: (state) => {
        return state.room;
    },
    getUsedAvatars: (state) => {
        const avatars = state.gameState.players.map(player => player.avatar);
        return avatars.filter(avatar => avatar.length > 0);
    },
    getGameState: (state) => {
        return state.gameState;
    },
    indicatorMessage: (state) => {
        return state.indicatorMessage;
    }
};

const mutations = {
    setClient: (state, client) => {
        state.client = client;
    },
    setRoom: (state, room) => {
        state.room = room;
    },
    clearRoom: (state) => {
        state.room = null;
    },
    syncState: (state, payload) => {
        const gameState = payload.toJSON();
        gameState.myPlayer = gameState.players.find(player => player.id === state.room.sessionId);
        state.gameState = Object.assign({}, gameState);
    },
    setMessage: (state, message) => {
        state.indicatorMessage = message;
    }
};

const actions = {
    registerListeners: ({ getters }) => {
        const room = getters['getRoom'];

        // Clock Event
        room.state.listen('clock', () => {
            setTimeout(() => {
                document.dispatchEvent(clockEvent);
            }, 100);
        });

        // Status Event
        room.state.listen('status', () => {
            setTimeout(() => {
                document.dispatchEvent(gameStatusEvent);
            }, 100);
        });

        // Player Listeners
        room.state.players.onAdd = (player) => {
            player.onChange = () => {
                setTimeout(() => {
                    document.dispatchEvent(playerEvent);
                }, 100);
            };
            setTimeout(() => {
                document.dispatchEvent(playerEvent);
            }, 100);
        };
        room.state.players.onRemove = () => {
            setTimeout(() => {
                document.dispatchEvent(playerEvent);
            }, 100);
        };

        // Element Listeners
        room.state.elements.forEach(element => {
            element.onChange = () => {
                setTimeout(() => {
                    document.dispatchEvent(elementEvent);
                }, 100);
            };
        });
        room.state.elements.onAdd = (element) => {
            element.onChange = () => {
                setTimeout(() => {
                    document.dispatchEvent(elementEvent);
                }, 100);
            };
            setTimeout(() => {
                document.dispatchEvent(elementEvent);
            }, 100);
        };
        room.state.elements.onRemove = () => {
            setTimeout(() => {
                document.dispatchEvent(elementEvent);
            }, 100);
        };
    },
    connectClient: ({ commit }) => {
        const client = new Colyseus.Client('wss://lttsbeta.orckidlab.com');
        // const client = new Colyseus.Client('ws://localhost:5000');
        commit('setClient', client);
    },
    joinRoom: async({ commit, getters, dispatch }, roomId) => {
        const client = getters['getClient'];
        const room = await client.joinById(roomId);
        commit('setRoom', room);
        commit('syncState', room.state);
        room.onStateChange((state) => {
            commit('syncState', state);
        });
        dispatch('registerListeners');
        return true;
    },
    setName: async({ getters }, name) => {
        const room = getters['getRoom'];
        await room.send('setName', name);
        return true;
    },
    setAvatar: async({ getters }, avatarId) => {
        const room = getters['getRoom'];
        await room.send('setAvatar', avatarId);
        return true;
    },
    setPosition: async({ getters }, payload) => {
        const room = getters['getRoom'];
        await room.send('setPosition', {
            x: payload.x,
            y: payload.y,
            direction: payload.direction
        });
        return true;
    },
    startGame: async({ getters }) => {
        const room = getters['getRoom'];
        await room.send('startGame');
        return true;
    },
    addToBag: async ({ getters }, elementId) => {
        const room = getters['getRoom'];
        await room.send('addToBag', elementId);
        return true;
    },
    removeFromBag: async ({ getters }, elementId) => {
        const room = getters['getRoom'];
        await room.send('removeFromBag', elementId);
        return true;
    },
    toggleState: async({ getters }, elementId) => {
        const room = getters['getRoom'];
        await room.send('toggleState', elementId);
        return true;
    },
    updateState: async({ getters }, { elementId, newState }) => {
        const room = getters['getRoom'];
        await room.send('updateState', {
            elementId,
            newState
        });
        return true;
    },
    trackSequence: async({ getters }, { name, value }) => {
        const room = getters['getRoom'];
        await room.send('trackSequence', {
            name,
            value
        });
        return true;
    },
    leave: async({ getters, commit }) => {
        const room = getters['getRoom'];
        await room.leave();
        commit('clearRoom');
    },
    getElements: async() => {
        const res = await axios.get('https://lttsbeta.orckidlab.com/api/rooms/elements');
        // const res = await axios.get('http://localhost:5000/api/rooms/elements');
        return res.data;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
