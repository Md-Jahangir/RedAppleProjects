import Phaser from 'phaser';
import Map from './Map.js';
import Camera from './Camera.js';
import Player from './Player.js';
// import { Model } from './Model.js';
import ElementManager from './ElementManager.js';
// import AnimationManager from './AnimationManager.js';
import ModalManager from './ModalManager.js';
import store from '@/store/index.js';
import { StateManager } from './StateManager.js';
import KeyboardController from './KeyboardController.js';
// import IndicatorPopup from './popups/IndicatorPopup.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.mainAreaBg = null;
        this.map = null;
        this.camera = null;

        this.emailTerminalPopup = null;
        this.characterChoosePopup = null;
        this.submitNamePopup = null;
        this.entranceDoorPopup = null;
        this.videoPlayPopup = null;
        this.howToPlayPopup = null;
        this.idCardTerminalPopup = null;
        this.lineOneComponentOutput = null;
        this.lineTwoComponentOutput = null;
        this.lineThreeComponentOutput = null;
        this.warningPopup = null;
        this.vendingMachinePopup = null;
        this.printerPopup = null;
        this.scannerPopup = null;
        this.inputPopup = null;
        this.securityTerminalPopup = null;

        this.cursors = null;
        this.staticColliderGroup = null;
        this.elementManager = null;

        this.selectedElement = null;

        this.playerArray = null;
        this.isAnimPlaying = false;
        this.isColliding = false;

        this.logo = null;
        this.initialModalIndex = 0;
        this.eventEmitter = null;

        this.modalManager = null;
        this.localPlayer = null;
        this.localPlayerId = null;
        //this.localPlayerContainer = null;

        this.keyboardcontroller = null;
        this.indicatorPopup = null;
        //
    }

    init() {}

    preload() {}

    create() {
        this.eventEmitter = new Phaser.Events.EventEmitter();
        // console.log(this.eventEmitter);
        this.cameras.main.setBackgroundColor(0x0f4b8f);
        this.isAnimPlaying = false;
        this.playerArray = [];
        this.playerConfig = {
            name: 'PLAYER1',
            id: '1'
        };

        this.map = new Map(this);
        this.camera = new Camera(this);
        this.keyboardcontroller = new KeyboardController(this);

        document.addEventListener('onPlayerStateChange', () => {
            this.CreateOrUpdatePlayerObj();
        });

        document.addEventListener('onElementStateChange', () => {
            this.UpdateElementsState();
        });
        document.addEventListener('onClockChange', () => {
            this.OnTimeUpdate();
        });
        document.addEventListener('onGameStatusChange', () => {
            this.onGameStatusChange();
        });

        this.modalManager = new ModalManager(this);
        this.modalManager.ShowModal('ROOM_ID');
        //----------------------------------

        // this.cursors = this.input.keyboard.addKeys('LEFT,RIGHT,UP,DOWN,SPACE,P,L,ESC');
        // this.input.keyboard.removeCapture('LEFT,RIGHT,UP,DOWN,L,P,ESC,SPACE,ENTER');
        this.cursors = this.input.keyboard.addKeys('LEFT,RIGHT,UP,DOWN,SPACE,P,L,ESC,I');
        this.input.keyboard.removeCapture('LEFT,RIGHT,UP,DOWN,L,P,ESC,SPACE,ENTER,I');

        this.eventEmitter.on('modalEvent', (eventData) => {
            this.modalManager.EventHandler(eventData);
        });
    }



    CreateOrUpdatePlayerObj() {
        const gameData = StateManager.gameData;
        // console.log('gameData: :', gameData);
        // console.log(gameData.players);
        for (let i = 0; i < gameData.players.length; i++) {
            let playerData = gameData.players[i];
            if (playerData.active) {
                const playerIndex = this.playerArray.findIndex(x => x.id === playerData.id);
                if (playerIndex < 0) {
                    // console.log('new player: ', playerData + ' : ' + gameData.myPlayer.id);
                    let player = new Player(this, playerData);
                    if (gameData.myPlayer.id === playerData.id) {
                        this.localPlayerId = playerData.id;
                        this.localPlayer = player.playerContainer;
                        this.localPlayer.depth = 1;
                        this.FollowCameraToPlayer();
                        this.CreateElementObj();
                        this.CollisionCheckWithPlayerAndWall();
                    }
                    this.playerArray.push(player);
                } else {
                    if (gameData.myPlayer.id !== playerData.id) {
                        this.playerArray[playerIndex].UpdateMovement(playerData.position.x, playerData.position.y, playerData.position.direction);
                    }
                }
            }
        }
    }

    FollowCameraToPlayer() {
        if (this.localPlayer != null) {
            this.camera.FollowCameraToPlayer(this.localPlayer);
        }
    }

    CreateElementObj() {
        if (this.localPlayer != null) {
            this.elementManager = new ElementManager(this, this.localPlayer);
            this.elementManager.elementContainer.setScale(1.8);
        }
    }

    UpdateElementsState() {
        // const gameData = StateManager.gameData;
        // console.log('UpdateElementsState gameData: :', gameData);
        if (this.elementManager != null) {
            this.elementManager.UpdateState();
        }
    }

    CollisionCheckWithPlayerAndWall() {
        if (this.localPlayer != null) {
            this.map.CollisionCheckWithWall(this.localPlayer);
        }
    }

    PlayWalkAnimation(dir = 'right') {
        if (this.localPlayer != null && this.localPlayerId != null) {
            if (!this.isAnimPlaying) {
                this.isAnimPlaying = true;
                this.localPlayer.direction = dir;
                this.localPlayer.list[0].play(`walk-${dir}-${this.localPlayerId}`);
            }
        }
    }

    PlayIdleAnimation(dir = 'right') {
        if (this.localPlayer != null && this.localPlayerId != null) {
            this.isAnimPlaying = false;
            this.localPlayer.direction = dir;
            if (this.localPlayer.list[0].anims.currentAnim != null) {
                this.localPlayer.list[0].play(`idle-${dir}-${this.localPlayerId}`);
            }
        }
    }

    // eslint-disable-next-line no-unused-vars
    update(t, dt) {
        if (window.phaserGame.isGameStarted) {
            if (this.localPlayer != null) {
                // console.log(this.localPlayer);
                // if (!window.phaserGame.popupOpened) {
                //     if (this.cursors.LEFT.isDown) {
                //         this.localPlayer.body.setVelocityX(-160);
                //         // this.elementManager.selectedElement = null;
                //         this.PlayWalkAnimation('left');
                //     } else if (this.cursors.RIGHT.isDown) {
                //         this.localPlayer.body.setVelocityX(160);
                //         // this.elementManager.selectedElement = null;
                //         this.PlayWalkAnimation('right');
                //     } else if (this.cursors.UP.isDown) {
                //         this.localPlayer.body.setVelocityY(-160);
                //         // this.elementManager.selectedElement = null;
                //         this.PlayWalkAnimation('up');
                //     } else if (this.cursors.DOWN.isDown) {
                //         this.localPlayer.body.setVelocityY(160);
                //         // this.elementManager.selectedElement = null;
                //         this.PlayWalkAnimation('right');
                //     } else if (Phaser.Input.Keyboard.JustDown(this.cursors.SPACE)) {
                //         let element = null;
                //         if (this.elementManager.selectedElement &&
                //             !this.isElementPickable(this.elementManager.selectedElement)) {
                //             element = this.elementManager.selectedElement.elem;

                //         } else if (this.elementManager.pickedElement) {
                //             element = this.elementManager.pickedElement.elem;
                //         }

                //         if (element && element.interactions[element.currentState]) {
                //             const interactions = element.interactions[element.currentState].i;
                //             for (let i = 0; i < interactions.length; i++) {
                //                 if (interactions[i].interactivity === 'space') {
                //                     if (interactions[i].interactivityEvent === 'ShowModal') {
                //                         this.modalManager.ShowModal(interactions[i].interactivityEventData);
                //                     } else if (interactions[i].interactivityEvent === 'CheckInBag') {
                //                         this.CheckInBag(interactions[i].interactivityEventData);
                //                     }
                //                 }
                //             }
                //         }
                //     } else if (Phaser.Input.Keyboard.JustDown(this.cursors.L)) {
                //         if (this.elementManager.pickedElement != null) {
                //             // console.log('D pressed Drop elem');
                //             this.elementManager.pickedElement.DropItem();
                //         }
                //     } else if (Phaser.Input.Keyboard.JustDown(this.cursors.P)) {
                //         if (this.elementManager.selectedElement != null) {
                //             // console.log('P pressed pickup elem');
                //             this.elementManager.selectedElement.PickItem();
                //         }
                //     } else if (Phaser.Input.Keyboard.JustDown(this.cursors.ESC)) {
                //         if ((this.modalManager.currentModalKey != null)) {
                //             let modal = this.modalManager.modalsArr.find((element) => element.name === this.modalManager.currentModalKey);
                //             // console.log('this.modalManager.currentModalKey', modal);
                //             if (modal.element.node.querySelector('.close-icon')) {
                //                 this.eventEmitter.emit('modalEvent', {
                //                     eventName: modal.closeEvent,
                //                     key: modal.name,
                //                     element: modal.element
                //                 });
                //             }
                //         }
                //     }
                //     // else if (this.cursors.LEFT.isUp) {
                //     //     console.log('is up left');
                //     //     this.PlayIdleAnimation(this.localPlayer.direction);
                //     //     this.localPlayer.body.setVelocityX(0);
                //     //     this.localPlayer.body.setVelocityY(0);
                //     //     this.elementManager.selectedElement = null;
                //     // } else if (this.cursors.RIGHT.isUp) {
                //     //     console.log('is up right');
                //     //     this.PlayIdleAnimation(this.localPlayer.direction);
                //     //     this.localPlayer.body.setVelocityX(0);
                //     //     this.localPlayer.body.setVelocityY(0);
                //     //     this.elementManager.selectedElement = null;
                //     // } else if (this.cursors.UP.isUp) {
                //     //     console.log('is up UP');
                //     //     this.PlayIdleAnimation(this.localPlayer.direction);
                //     //     this.localPlayer.body.setVelocityX(0);
                //     //     this.localPlayer.body.setVelocityY(0);
                //     //     this.elementManager.selectedElement = null;
                //     // } else if (this.cursors.DOWN.isUp) {
                //     //     console.log('is up DOWN');
                //     //     this.PlayIdleAnimation(this.localPlayer.direction);
                //     //     this.localPlayer.body.setVelocityX(0);
                //     //     this.localPlayer.body.setVelocityY(0);
                //     //     this.elementManager.selectedElement = null;
                //     // }
                //     else {
                //         this.PlayIdleAnimation(this.localPlayer.direction);
                //         this.localPlayer.body.setVelocityX(0);
                //         this.localPlayer.body.setVelocityY(0);
                //         // this.elementManager.selectedElement = null;
                //     }
                //     //SET POSITION FUNCTION CALL FROM HERE
                //     let pos = { x: 0, y: 0, direction: 'right' };
                //     pos.x = this.localPlayer.x;
                //     pos.y = this.localPlayer.y;
                //     pos.direction = this.localPlayer.direction;
                //     this.SetPlayerPosition(pos);
                //     if (this.elementManager.selectedElement != null) {
                //         let msg = this.elementManager.selectedElement.elem.indicatorMessage;
                //         // console.log('selected gamescne .............', this.elementManager.selectedElement.elem);
                //         this.SetIndicatorMessage(msg);
                //         // this.elementManager.selectedElement = null;
                //     } else {
                //         this.SetIndicatorMessage('');
                //     }
                //     // Check if its still colliding with any object(s)
                // } else {
                //     // this.localPlayerContainer.PlayIdleAnimation(this.localPlayer.direction);
                //     this.PlayIdleAnimation(this.localPlayer.direction);
                //     this.localPlayer.body.setVelocityX(0);
                //     this.localPlayer.body.setVelocityY(0);
                // }

                if (!window.phaserGame.popupOpened) {
                    if (this.cursors.LEFT.isDown) {
                        if (this.modalManager.currentModalKey == null) {
                            this.localPlayer.body.setVelocityX(-160);
                            this.elementManager.selectedElement = null;
                            this.PlayWalkAnimation('left');
                        }
                    } else if (this.cursors.RIGHT.isDown) {
                        if (this.modalManager.currentModalKey == null) {
                            this.localPlayer.body.setVelocityX(160);
                            this.elementManager.selectedElement = null;
                            this.PlayWalkAnimation('right');
                        }
                    } else if (this.cursors.UP.isDown) {
                        if (this.modalManager.currentModalKey == null) {
                            this.localPlayer.body.setVelocityY(-160);
                            this.elementManager.selectedElement = null;
                            this.PlayWalkAnimation('up');
                        }
                    } else if (this.cursors.DOWN.isDown) {
                        if (this.modalManager.currentModalKey == null) {
                            this.localPlayer.body.setVelocityY(160);
                            this.elementManager.selectedElement = null;
                            this.PlayWalkAnimation('right');
                        }
                    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.SPACE)) {
                        let element = null;
                        if (this.elementManager.selectedElement &&
                            !this.isElementPickable(this.elementManager.selectedElement)) {
                            element = this.elementManager.selectedElement.elem;

                        } else if (this.elementManager.pickedElement) {
                            element = this.elementManager.pickedElement.elem;
                        }

                        if (element && element.interactions[element.currentState]) {
                            const interactions = element.interactions[element.currentState].i;
                            for (let i = 0; i < interactions.length; i++) {
                                if (interactions[i].interactivity === 'space') {
                                    if (interactions[i].interactivityEvent === 'ShowModal') {
                                        this.modalManager.ShowModal(interactions[i].interactivityEventData);
                                    } else if (interactions[i].interactivityEvent === 'CheckInBag') {
                                        this.CheckInBag(interactions[i].interactivityEventData);
                                    }
                                }
                            }
                        }
                    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.L)) {
                        if (this.elementManager.pickedElement != null) {
                            // console.log('D pressed Drop elem');
                            this.elementManager.pickedElement.DropItem();
                        }
                    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.P)) {
                        if (this.elementManager.selectedElement != null) {
                            // console.log('P pressed pickup elem');
                            this.elementManager.selectedElement.PickItem();
                        }
                    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.ESC)) {
                        if ((this.modalManager.currentModalKey != null)) {
                            let modal = this.modalManager.modalsArr.find((element) => element.name === this.modalManager.currentModalKey);
                            // console.log('this.modalManager.currentModalKey', modal);
                            if (modal.element.node.querySelector('.close-icon')) {
                                this.eventEmitter.emit('modalEvent', {
                                    eventName: modal.closeEvent,
                                    key: modal.name,
                                    element: modal.element
                                });
                            }
                        }
                    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.I)) {
                        this.modalManager.ShowModal('HOW_TO_PLAY');
                    } else {
                        this.PlayIdleAnimation(this.localPlayer.direction);
                        this.localPlayer.body.setVelocityX(0);
                        this.localPlayer.body.setVelocityY(0);
                    }
                    //SET POSITION FUNCTION CALL FROM HERE
                    let pos = { x: 0, y: 0, direction: 'right' };
                    pos.x = this.localPlayer.x;
                    pos.y = this.localPlayer.y;
                    pos.direction = this.localPlayer.direction;
                    this.SetPlayerPosition(pos);
                    if (this.elementManager.selectedElement != null) {
                        let msg = this.elementManager.selectedElement.elem.indicatorMessage;
                        // console.log('selected gamescne .............', this.elementManager.selectedElement.elem);
                        this.SetIndicatorMessage(msg);
                    } else {
                        this.SetIndicatorMessage('');
                    }
                    // Check if its still colliding with any object(s)
                } else {
                    // this.localPlayerContainer.PlayIdleAnimation(this.localPlayer.direction);
                    this.PlayIdleAnimation(this.localPlayer.direction);
                    this.localPlayer.body.setVelocityX(0);
                    this.localPlayer.body.setVelocityY(0);
                }
            }
        }
    }

    CheckInBag(_data) {
        // let [elementId, event1, event2] = _data.split(':');
        let arr = _data.split(':');

        let element = {
            id: arr[0],
            name: arr[0]
        };
        let _event1 = {
            id: arr[1],
            name: arr[1]
        };
        let _event2 = {
            id: arr[2],
            name: arr[2]
        };
        console.log('element->', element);
        console.log('_event1->', _event1);
        console.log('_event2->', _event2);
        if (StateManager.gameData.myPlayer.bag.includes(element.id)) {
            this.eventEmitter.emit('modalEvent', {
                eventName: _event1.id,
                element: element.id
            });
        } else {
            this.eventEmitter.emit('modalEvent', {
                eventName: _event2.id,
                element: element.id
            });
        }
    }
    async SetPlayerPosition(_pos) {
        // console.log('pos: :', _pos);
        try {
            if (_pos != '') {
                await store.dispatch('room/setPosition', _pos);
            }
        } catch (error) {
            console.log('error: :', error);
        }
    }

    isElementPickable(element) {
        const interactions = element.elem.interactions[element.elem.currentState].i;
        let flag = false;
        for (let i = 0; i < interactions.length; i++) {
            if (interactions[i].interactivityEvent === 'pickup') {
                flag = true;
                break;
            }
        }
        return flag;
    }

    async SetIndicatorMessage(_message) {
        try {
            await store.commit('room/setMessage', _message);
        } catch (error) {
            console.log('error: :', error);
        }
    }
    OnTimeUpdate() {
        switch (parseInt(StateManager.gameData.clock)) {
            case 600:
                this.modalManager.ShowModal('warning_10_min');
                break;
            case 300:
                this.modalManager.ShowModal('warning_5_min');
                break;
            case 0:
                this.modalManager.ShowModal('times_up');
                break;
        }
    }
    onGameStatusChange() {
        console.log('Game status->' + StateManager.gameData.status);
        if (StateManager.gameData.status === 'Completed') {
            this.eventEmitter.emit('modalEvent', {
                eventName: 'GameComplete'
            });
        }

    }
}