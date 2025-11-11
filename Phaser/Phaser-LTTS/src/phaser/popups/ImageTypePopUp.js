class ImageTypePopUp {
    constructor(scene, _data) {
        this.scene = scene;
        this.scene = scene;
        this.data = _data.data;
        this.name = _data.name;
        this.visibility = _data.visibility;
        this.submitEvent = _data.submitEvent;
        this.closeEvent = _data.closeEvent;
        this.CreateImageTypePopUp(this.data);
    }

    CreateImageTypePopUp(_data) {
        this.element = this.scene.add.dom(0, 0).createFromCache('modal_template'); //.setOrigin(0.5);
        this.element.parent.classList.add('modal-outer');
        this.element.node.classList.add('modal');
        this.element.visible = this.visibility;
        // this.element.x = Math.round(this.scene.playerArray[0].player.x) - (960);
        // this.element.y = Math.round(this.scene.playerArray[0].player.y) - 300;
        this.element.node.querySelector('.modal-body').innerHTML = _data;
        // this.element.node.querySelector('.container img').setAttribute('src', 'assets/images/popups/line_1_component_output_icon.png');

        this.element.addListener('click');
        this.element.getChildByName('close-icon').onclick = () => {
            this.scene.eventEmitter.emit('modalEvent', {
                eventName: this.closeEvent,
                key: this.name,
                element: this.element
            });
        };
    }
}

export default ImageTypePopUp;
