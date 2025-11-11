class InputTextTypePopUp {
    constructor(scene, _data) {
        this.scene = scene;
        this.data = _data.data;
        this.name = _data.name;
        this.visibility = _data.visibility;
        this.submitEvent = _data.submitEvent;
        this.closeEvent = _data.closeEvent;
        // this.closeEvent = _data;
        this.CreateInputTypePopUp();
    }

    CreateInputTypePopUp() {
        this.element = this.scene.add.dom(0, 0).createFromCache('modal_template'); //.setOrigin(0.5);
        this.element.parent.classList.add('modal-outer');
        this.element.node.classList.add('modal');

        this.element.visible = this.visibility;
        this.element.node.querySelector('.modal-body').innerHTML = this.data;
        this.element.node.querySelector('.error p').innerHTML = '';

        this.element.addListener('click');
        //Submit event of modal--------------------------------
        this.element.getChildByName('submit').onclick = () => {
            console.log('submit button');
            this.scene.eventEmitter.emit('modalEvent', {
                eventName: this.submitEvent,
                key: this.name,
                element: this.element,
                value: this.element.getChildByName(this.name).value
            });
        };

        //Input Element
        let input = document.getElementsByTagName('input');
        for (let i = 0; i < input.length; i++) {
            input[i].addEventListener('keypress',(event)=>{
                if(this.element.visible){
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        this.element.getChildByName('submit').click();
                    }
                }
            });
        }

    }
}

export default InputTextTypePopUp;
