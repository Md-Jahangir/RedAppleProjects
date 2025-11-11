class TextTypePopUp {
    constructor(scene, _data) {
        this.scene = scene;
        this.data = _data.data;
        this.name = _data.name;
        this.correctAnswer = _data.correctAnswer;
        this.visibility = _data.visibility;
        this.submitEvent = _data.submitEvent;
        this.closeEvent = _data.closeEvent;
        this.incorrectEvent = _data.closeEvent;

        this.CreateTextTypePopUp(this.data);
    }

    CreateTextTypePopUp(_data) {
        this.element = this.scene.add.dom(0, 0).createFromCache('modal_template'); //.setOrigin(0.5);
        this.element.parent.classList.add('modal-outer');
        this.element.node.classList.add('modal');
        // this.element.x = Math.round(this.scene.playerArray[0].player.x) - (960);
        // this.element.y = Math.round(this.scene.playerArray[0].player.y) - 300;
        if (this.scene.playerArray.length > 0) {
            this.element.x = Math.round(this.scene.playerArray[0].player.x) - (960);
            this.element.y = Math.round(this.scene.playerArray[0].player.y) - 300;
        } else {
            this.element.x = Math.round(window.phaserGame.game.config.width / 2);
            this.element.y = Math.round(window.phaserGame.game.config.height / 2);
        }
        this.element.visible = this.visibility;
        this.element.node.querySelector('.modal-body').innerHTML = _data;
        this.element.node.querySelector('.error p').innerHTML = '';
        this.element.addListener('click');
        // switch (this.closeEvent) {
        //     case 'GameStart':
        //         this.scene.eventEmitter.on(this.closeEvent, this.GameStart, this);
        //         break;
        //
        //     case 'HideModal':
        //         this.scene.eventEmitter.on(this.closeEvent, this.HideModal, this);
        //         break;
        // }
        if (this.element.getChildByName('close-icon') !== null) {
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
}

export default TextTypePopUp;