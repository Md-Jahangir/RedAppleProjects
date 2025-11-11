import store from '@/store';


class InputListTypePopUp {
    constructor(scene, _data) {
        this.scene = scene;
        this.data = _data.data;
        this.name = _data.name;
        this.visibility = _data.visibility;
        this.submitEvent = _data.submitEvent;
        this.closeEvent = _data.closeEvent;
        // this.closeEvent = _data.closeEvent;
        this.buttonsContainer;
        this.InputListTypePopUp();
    }

    InputListTypePopUp() {
        this.element = this.scene.add.dom(0, 0).createFromCache('modal_template'); //.setOrigin(0.5);
        this.element.parent.classList.add('modal-outer');
        this.element.node.classList.add('modal');

        this.element.visible = this.visibility;
        this.element.node.querySelector('.modal-body').innerHTML = this.data;

        this.buttonsContainer = this.element.node.querySelector('.btn-group');
        let buttons = this.buttonsContainer.getElementsByTagName('button');
        for (const key of buttons) {
            key.onclick = () => {
                this.scene.eventEmitter.emit('modalEvent', {
                    eventName: this.submitEvent,
                    key: this.name,
                    element: this.element,
                    value: key.name
                });
                console.log('close button', key.name);
            };
        }
        if (this.element.getChildByName('close-icon') !== null) {
            this.element.getChildByName('close-icon').onclick = () => {
                console.log('close button');
                this.scene.eventEmitter.emit('modalEvent', {
                    eventName: this.closeEvent,
                    key: this.name,
                    element: this.element,
                    value: this.name
                });
            };
        }

    }

    async GetUsedAvatar() {
        try {
            const usedAvatars = store.getters['room/getUsedAvatars'];
            console.log('buttonName', usedAvatars);
            // let _usedAvatars = ['Character_1', 'Character_10', 'Character_5'];
            if (usedAvatars.length > 0) {
                usedAvatars.forEach(element => {
                    this.buttonsContainer.childNodes.forEach(_element => {
                        let buttonName = _element.name;
                        if (element === buttonName) {
                            _element.classList.add('no-click');
                        }
                    });
                });
            }
        } catch (error) {
            console.log('error', error);
        }
    }
}
export default InputListTypePopUp;
