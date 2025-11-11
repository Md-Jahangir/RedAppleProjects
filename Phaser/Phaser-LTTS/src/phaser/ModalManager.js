import TextTypePopUp from './popups/TextTypePopUp.js';
import InputTextTypePopUp from './popups/InputTextTypePopUp.js';
import InputListTypePopUp from './popups/InputListTypePopUp.js';
import ImageTypePopUp from './popups/ImageTypePopUp.js';
import CheckTextTypePopup from './popups/CheckTextTypePopup.js';
import CheckListTypePopUp from './popups/CheckListTypePopUp.js';
import VideoTypePopUp from './popups/VideoTypePopUp.js';
import store from '@/store';
import { StateManager } from './StateManager';

class ModalManager {
    constructor(_scene) {
        this.scene = _scene;
        this.popupDetails = this.scene.cache.json.get('popupDetails');
        this.modalsDetails = this.scene.cache.json.get('modalsJson');
        this.eventsDetails = this.scene.cache.json.get('events');
        this.modalsArr = [];
        this.currentModalKey = null;
        this.event = null;
        this.ModalCreation();
    }

    // eslint-disable-next-line no-unused-vars
    ModalCreation() {
        //------------------------------------------------
        let modal;

        for (let i = 0; i < this.modalsDetails.modals.length; i++) {
            switch (this.modalsDetails.modals[i].type) {
                case 'image':
                    modal = new ImageTypePopUp(
                        this.scene,
                        this.modalsDetails.modals[i]
                    );
                    break;
                case 'text':
                    modal = new TextTypePopUp(
                        this.scene,
                        this.modalsDetails.modals[i]
                    );
                    break;
                case 'inputText':
                    modal = new InputTextTypePopUp(
                        this.scene,
                        this.modalsDetails.modals[i]
                    );

                    break;
                case 'inputList':
                    modal = new InputListTypePopUp(
                        this.scene,
                        this.modalsDetails.modals[i]
                    );
                    // console.log('inputList popup created');
                    break;
                case 'video':
                    modal = new VideoTypePopUp(
                        this.scene,
                        this.modalsDetails.modals[i]
                    );
                    break;
                case 'checkList':
                    modal = new CheckListTypePopUp(
                        this.scene,
                        this.modalsDetails.modals[i]
                    );
                    // console.log('checkList popup created');
                    break;
                case 'checkText':
                    modal = new CheckTextTypePopup(
                        this.scene,
                        this.modalsDetails.modals[i]
                    );
                    // console.log('check text type popup created');
                    break;
            }
            this.modalsArr.push(modal);
        }


    }

    async EventHandler(_event) {
        const customEvent = this.eventsDetails.events.find((_elem) => _elem.id === _event.eventName);
        if (customEvent) {
            customEvent.actions.forEach(action => {
                switch (action.type) {
                    case 'PlayAnimation':
                        this.PlayAnimation(action.elementId);
                        break;
                    case 'UpdateState':
                        this.UpdateState(action.elementId, action.newState);
                        break;
                    case 'ToggleState':
                        this.ToggleState(action.elementId);
                        break;
                    case 'RevertSecurityTerminalUpdate':
                        this.RevertSecurityTerminalUpdate(action.elementId);
                        break;
                    case 'SetVisibility':
                        this.SetVisibility(action.elementId, action.visibility);
                        break;
                    case 'ShowModal':
                        this.ShowModal(action.modalId);
                        break;
                    case 'HideModal':
                        this.HideModal(action.modalId);
                        break;
                }
            });
            return;
        }
        this.event = _event;
        switch (_event.eventName) {
            case 'JoinRoom':
                await this.JoinRoom();
                break;
            case 'SaveName':
                await this.SaveName();
                break;
            case 'SetAvatar':
                await this.SetAvatar();
                break;
            case 'GameStart':
                await this.GameStart();
                break;
            case 'ShowModal':
                await this.ShowModal(_event.key);
                break;
            case 'HideModal':
                await this.HideModal(_event.key);
                break;
            case 'IncorrectInput':
                await this.IncorrectInput();
                break;
            case 'ToggleState':
                await this.ToggleState(_event.key);
                break;
            case 'UpdateState':
                // eslint-disable-next-line no-case-declarations
                const [elementId, newValue] = _event.value.split(':');
                await this.UpdateState(elementId, newValue);
                this.HideModal(_event.key);
                break;
            case 'TrackSequence':
                await this.TrackSequence(_event.key, _event.value);
                break;
            case 'ReStart':
                this.ReStart();
                break;
            case 'GameComplete':
                this.GameComplete();
                break;
            default:
                break;
        }
    }
    ReStart() {
        location.reload(true);
    }
    async JoinRoom() {
        // console.log('_value', this.event.value);
        try {
            if (this.event.value !== '') {
                // val = await store.dispatch('room/joinRoom', { roomId: _value, syncState: this.SyncState });
                const val = await store.dispatch('room/joinRoom', this.event.value);
                if (val) {
                    // console.log('joining room ', val);
                    // let posObj = {
                    //     x: Math.round(window.phaserGame.game.config.width / 2) + 700,
                    //     y: Math.round(window.phaserGame.game.config.height / 2) - 420
                    // };
                    let posObj = {
                        x: Math.round(window.phaserGame.game.config.width / 2) + 700,
                        y: Math.round(window.phaserGame.game.config.height / 2) - 420,
                        direction: 'right'
                    };
                    await this.scene.SetPlayerPosition(posObj);
                    this.HideModal('ROOM_ID');
                    this.ShowModal('SUBMIT_NAME');
                    window.phaserGame.isGameStarted = true;
                }
            } else {
                throw new Error('Please type valid input');
            }
        } catch (error) {
            this.event.element.node.querySelector('.error p').innerHTML = error.message;
            console.log('error', error);
        }
    }

    async SaveName() {
        try {
            if (this.event.value !== '') {
                const val = await store.dispatch('room/setName', this.event.value);
                if (val) {
                    // console.log('SaveName joining room ', val);
                    // this.scene.SetNameForPlayer(_value);
                    this.HideModal('SUBMIT_NAME');
                    this.ShowModal('CHARACTER_SELECTION');
                }
            } else {
                throw new Error('Please type valid input');
            }
        } catch (error) {
            this.event.element.node.querySelector('.error p').innerHTML = error.message;
            console.log('error', error);
        }
    }

    IncorrectInput() {
        this.event.element.node.querySelector('.error p').innerHTML = 'Incorrect Input';
    }

    async SetAvatar() {
        try {
            const val = await store.dispatch('room/setAvatar', this.event.value);
            if (val) {
                this.HideModal('CHARACTER_SELECTION');
            }
        } catch (error) {
            console.log('error', error);
        }
    }
    async RevertSecurityTerminalUpdate(_elemId) {
        console.log(_elemId);
    }
    ShowModal(_key) {
        this.HideAllModals();
        // console.log('this.modalsArr ', this.modalsArr);
        this.currentModalKey = _key || null;
        let modal = this.modalsArr.find((element) => element.name === _key); // Initial Modal to show
        if (modal) {
            if (modal.name === 'CHARACTER_SELECTION') {
                modal.GetUsedAvatar();
            }
            if (this.scene.playerArray.length > 0) {
                modal.element.x = Math.round(this.scene.playerArray[0].player.x) - (960);
                modal.element.y = Math.round(this.scene.playerArray[0].player.y) - 300;
            } else {
                modal.element.x = Math.round(window.phaserGame.game.config.width / 2);
                modal.element.y = Math.round(window.phaserGame.game.config.height / 2);
            }
            modal.element.visible = true;
            //Auto Play video
            if (modal.name === 'VIDEO INTRO') {
                document.getElementById('video').play();
            }
            //Enable text focus
            if (modal.name && modal.element.visible) {
                if (document.getElementById(modal.name)) {
                    setTimeout(() => {
                        document.getElementById(modal.name).focus();
                    }, 500);
                }
            }
            this.scene.keyboardcontroller.DisableKeys();
        }
        // modal.element.visible = true;
    }
    HideAllModals() {
        this.modalsArr.forEach(_elem => {
            _elem.element.visible = false;
        });
    }
    HideModal(_key) {
        this.scene.keyboardcontroller.EnableKeys();
        this.currentModalKey = null;
        let modal = this.modalsArr.find((element) => element.name === _key); // Initial Modal to show
        // console.log('_key', _key);
        // console.log('modal', modal);
        if (modal) {
            // if (this.scene.elementManager && this.scene.elementManager.selectedElement)
            //     this.scene.elementManager.selectedElement = null;
            modal.element.visible = false;
        }
    }

    async GameStart() {
        document.getElementById('video').pause();
        try {
            const _gameStart = await store.dispatch('room/startGame');

            if (_gameStart) {
                this.HideModal(this.event.key);
                // this.scene.timer.StartTimer();
                let currentElement = this.scene.elementManager.elementContainer.list.find((_data) => _data.elementId === 'start_icon');
                // console.log('current elemt..........: ', currentElement);
                currentElement.play(currentElement.animationName);
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    async ToggleState(elementId) {
        let _currentElement = this.scene.elementManager.elementContainer.list.find((_data) => _data.elementId === elementId);
        console.log('_currentElement -------------', _currentElement);
        if (_currentElement) {
            await StateManager.ToggleState(elementId);
            let _currentFrame = parseInt(_currentElement.frame.name);
            console.log('_currentFrame -------------' + _currentFrame);
            if (_currentFrame === 0) {
                _currentFrame = 1;
            } else {
                _currentFrame = 0;
            }

            _currentElement.setFrame(_currentFrame);
            let _currentFrame1 = parseInt(_currentElement.frame.name);
            console.log('_currentFrame -------------' + _currentFrame1);
        }
    }

    // async UpdateState(elementId, newState) {
    //     // let _currentElement = this.scene.elementManager.elementContainer.list.find((_data) => _data.elementId === elementId);
    //     let _currentElement = this.scene.elementManager.elementArray.find((_data) => _data.elem.elementId === elementId);
    //     console.log('first currentEleme: : ', _currentElement);
    //     if (_currentElement) {
    //         console.log('outside _currentElement.localState: ', _currentElement.localState);
    //         if (!_currentElement.localState) {
    //             console.log('_currentElement.localState: ', _currentElement.localState);
    //             await StateManager.UpdateState(_currentElement, newState);
    //         } else {
    //             await null;
    //             console.log('currentEleme: : ', _currentElement);
    //             _currentElement.scene.elementManager.elementArray.UpdateState(_currentElement.currentState, _currentElement.interactions);
    //         }

    //         _currentElement.currentState = newState;
    //     }
    // }
    async UpdateState(elementId, newState) {
        // let _currentElement = this.scene.elementManager.elementContainer.list.find((_data) => _data.elementId === elementId);
        let _currentElement = this.scene.elementManager.elementArray.find((_data) => _data.elem.elementId === elementId);
        if (_currentElement) {
            if (!_currentElement.elem.localState) {
                await StateManager.UpdateState(elementId, newState);
            } else {
                _currentElement.UpdateLocallyState();
            }

            _currentElement.currentState = newState;
        }
    }
    async TrackSequence(elementId, _value) {
        await StateManager.TrackSequence(elementId, _value);
        this.HideModal(this.event.key);
        // console.log(elementId + ' elementId ' + _value);
    }

    PlayAnimation(elementId) {
        let currentElement = this.scene.elementManager.elementContainer.list.find((element) => element.elementId === elementId);
        if (currentElement) {
            currentElement.body.enable = false;
            currentElement.play(currentElement.animationName);
        }
    }

    SetVisibility(elementId, visibility) {
        let currentElement = this.scene.elementManager.elementContainer.list.find((element) => element.elementId === elementId);
        if (currentElement) {
            currentElement.setVisible(visibility);
            currentElement.body.enable = false;
        }
    }
    async ToggleUsbTerminalState() {
        // try {
        // const _gameStart = await store.dispatch('room/startGame');
        console.log(this.event);
        // if (_gameStart) {
        this.HideModal(this.event.key);
        switch (this.event.value) {
            case 'none':
                this.ShowModal('Usb_terminal_none');
                break;
            case '314':
                this.ShowModal('Usb_terminal_314');
                break;
            case '892':
                this.ShowModal('Usb_terminal_892');
                break;
            case '241':
                this.ShowModal('Usb_terminal_241');
                break;
        }
        // let currentElement = this.scene.elementManager.elementContainer.list.find((_data) => _data.elementId === 'start_icon');
        // currentElement.play(currentElement.animationName);
        // }
        // } catch (error) {
        //     console.log('error', error);
        // }
    }
    GameComplete() {
        this.ShowModal('games_complete');
    }
}

export default ModalManager;