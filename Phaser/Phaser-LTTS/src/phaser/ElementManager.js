import Element from './Element.js';
import { StateManager } from '@/phaser/StateManager';

class ElementManager {
    constructor(scene, _player) {
        this.scene = scene;
        this.elementContainer = null;
        this.player = _player;
        this.selectedElement = null;
        this.pickedElement = null;
        this.elementArray = [];
        this.create();
    }

    create() {
        // let elementsData = Model.GetElementsDetailsData();
        let elementsData = StateManager.gameData.elements;
        // console.log('ELe Mang: : ', elementsData);

        this.elementContainer = this.scene.add.container(0, 0);
        for (let i = 0; i < elementsData.length; i++) {
            let elem = new Element(elementsData[i], this.scene);
            this.elementArray.push(elem);
            this.elementContainer.add(elem.elem);
            this.elementContainer.depth = 2;
            elem.AddPhysics(this.player);
        }
    }

    UpdateState() {
        const gameData = StateManager.gameData;
        // const gameData = Model.GetElementsDetailsData();
        // console.log('elementManager UpdateState gameData: :', gameData);
        for (let i = 0; i < this.elementArray.length; i++) {
            // console.log('elementArray localstate:: ', this.elementArray[i]);
            if (!this.elementArray[i].elem.localState) {
                this.elementArray[i].UpdateState(gameData.elements[i].currentState, gameData.elements[i].x, gameData.elements[i].y);
            }

        }
    }

}

export default ElementManager;
