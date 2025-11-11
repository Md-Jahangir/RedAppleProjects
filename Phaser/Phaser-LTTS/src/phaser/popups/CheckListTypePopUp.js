// import store from '@/store';
// import { filter } from 'core-js/core/array';
// import { StateManager } from '../StateManager.js';
class CheckListTypePopUp {
    constructor(scene, _data) {
        this.scene = scene;
        this.data = _data.data;
        this.name = _data.name;
        this.visibility = _data.visibility;
        this.correctAnswer = _data.correctAnswer;
        this.correctEvent = _data.correctEvent;
        this.incorrectEvent = _data.incorrectEvent;
        this.closeEvent = _data.closeEvent;
        this.buttonsContainer;
        this.CheckListTypePopUp();
    }

    CheckListTypePopUp() {
        this.element = this.scene.add.dom(0, 0).createFromCache('modal_template'); //.setOrigin(0.5);
        this.element.parent.classList.add('modal-outer');
        this.element.node.classList.add('modal');
        this.element.visible = this.visibility;
        this.element.node.querySelector('.modal-body').innerHTML = this.data;

        this.buttonsContainer = this.element.node.querySelector('.data');
        let buttons = this.buttonsContainer.getElementsByTagName('button');

        for (const key of buttons) {
            //     // console.log(key);
            key.onclick = () => {
                // fire on correct answer only
                this.scene.eventEmitter.emit(this.correctEvent);
                // this.scene.eventEmitter.emit(this.submitEvent);
            };
        }
        //Close event of modal--------------------------------
        // this.element.node.querySelector('.container ')
        this.element.getChildByName('close-icon').onclick = () => {
            console.log('close button');
            this.scene.eventEmitter.emit('modalEvent', {
                eventName: this.closeEvent,
                key: this.name,
                element: this.element
            });
        };

    }
}
export default CheckListTypePopUp;