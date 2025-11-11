// import store from '@/store';


class CheckTextTypePopup {
    constructor(scene, _data) {
        this.scene = scene;
        this.data = _data.data;
        this.name = _data.name;
        this.visibility = _data.visibility;
        this.correctAnswer = _data.correctAnswer;
        this.correctEvent = _data.correctEvent;
        this.incorrectEvent = _data.incorrectEvent;
        this.closeEvent = _data.closeEvent;

        this.CreateCheckTextTypePopup();
    }

    CreateCheckTextTypePopup() {
        this.element = this.scene.add.dom(0, 0).createFromCache('modal_template'); //.setOrigin(0.5);
        this.element.parent.classList.add('modal-outer');
        this.element.node.classList.add('modal');
        this.element.visible = this.visibility;
        this.element.node.querySelector('.modal-body').innerHTML = this.data;
        this.element.node.querySelector('.error p').innerHTML = '';
        this.element.addListener('click');

        //Event register-------------------------------------
        // switch (this.correctEvent) {
        //     case 'EntranceDoorOpen':
        //         this.scene.eventEmitter.on(this.correctEvent, this.EntranceDoorOpen, this);
        //         break;
        //     case 'UsbTerminalDoorOpen':
        //         this.scene.eventEmitter.on(this.correctEvent, this.UsbTerminalDoorOpen, this);
        //         break;
        //     default:
        //         break;
        // }
        // this.scene.eventEmitter.on(this.correctEvent, this.CorrectInput, this);
        // this.scene.eventEmitter.on(this.inCorrectEvent, this.IncorrectInput, this);
        // this.scene.eventEmitter.on(this.submitEvent, this.CheckInput, this);
        //
        // // this.scene['SaveName']();
        // this.scene.eventEmitter.on(this.closeEvent, this.HideModal, this);

        //Submit event of modal--------------------------------
        this.element.getChildByName('submit').onclick = () => {
            console.log('submit button');
            this.CheckInput();
            // this.scene.eventEmitter.emit(this.submitEvent, );
            // this.scene.eventEmitter.emit(this.correctEvent, this.element.getChildByName(this.name).value);
        };
        //Close event of modal--------------------------------
        this.element.getChildByName('close-icon').onclick = () => {
            console.log('close button');
            this.scene.eventEmitter.emit('modalEvent', {
                eventName: this.closeEvent,
                key: this.name,
                element: this.element
            });
        };

        //Input Element
        let input = document.getElementsByTagName('input');
        for (var i = 0; i < input.length; i++) {
            input[i].addEventListener('keypress', (event) => {
                if (this.element.visible) {
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        this.CheckInput();
                    }
                }
            });
        }

    }

    CheckInput() {
        // const value = this.element.getChildByName(this.name).value;
        let input = this.element.getChildByName(this.name).value;
        input = input.replace(/\s/g, '');
        //make string lower
        input = input.toLowerCase();
        if (input !== '' && input.toString() === this.correctAnswer.toString()) {
            this.scene.eventEmitter.emit('modalEvent', {
                eventName: this.correctEvent,
                key: this.name,
                element: this.element,
                value: input
            });
        } else {
            this.scene.eventEmitter.emit('modalEvent', {
                eventName: this.incorrectEvent,
                key: this.name,
                element: this.element,
                value: input
            });
        }
    }

    // UsbTerminalDoorOpen() {
    //     if (this.scene.elementManager.selectedElement) {
    //         this.scene.elementManager.selectedElement.DisableBodyOfElement();
    //         this.scene.elementManager.selectedElement.PlayAnimation();
    //         this.scene.elementManager.selectedElement.UpdateState('open');
    //         this.scene.elementManager.selectedElement.setVisible(false);
    //         this.scene.eventEmitter.emit(this.closeEvent);
    //     }
    // }
    // EntranceDoorOpen() {
    //     if (this.scene.elementManager.selectedElement) {
    //         this.scene.elementManager.selectedElement.DisableBodyOfElement();
    //         this.scene.elementManager.selectedElement.PlayAnimation();
    //         this.scene.elementManager.selectedElement.UpdateState('open');
    //         this.scene.elementManager.selectedElement = null;
    //         this.scene.eventEmitter.emit(this.closeEvent);
    //     }
    // }
    // CorrectInput() {
    //     // setTimeout(() => {
    //     if (this.scene.elementManager.selectedElement) {
    //         this.scene.elementManager.selectedElement.DisableBodyOfElement();
    //         this.scene.elementManager.selectedElement.PlayAnimation();
    //         this.scene.elementManager.selectedElement.UpdateState('open');
    //         this.scene.eventEmitter.emit(this.closeEvent);
    //     }
    //     // }, 500);
    // }
    //
    // IncorrectInput(_error) {
    //     console.log('Incorrect input------------------------');
    //     this.element.node.querySelector('.error p').innerHTML = _error;
    // }
}

export default CheckTextTypePopup;