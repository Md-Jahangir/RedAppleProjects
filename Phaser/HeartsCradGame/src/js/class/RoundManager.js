export default class RoundManager {
    constructor(scene) {
        this.scene = scene;
        this.roundCounter = null;
        this.create();
    }
    create() {
        this.roundCounter = 0;
    }
    RoundCountUpdate() {
        this.roundCounter += 1;
        if (this.roundCounter > 3) {
            this.roundCounter = 0;
        }
        this.PassingDirectionSelect();
    }
    PassingDirectionSelect() {
        this.scene.passingOrderArray = [];
        switch (this.roundCounter) {
            case 1:
                this.scene.passDirection.Left = true;
                this.scene.passDirection.Right = false;
                this.scene.passDirection.Up = false;
                this.scene.passingOrderArray = [1, 2, 3, 0];
                break;
            case 2:
                this.scene.passDirection.Left = false;
                this.scene.passDirection.Right = true;
                this.scene.passDirection.Up = false;
                this.scene.passingOrderArray = [3, 0, 1, 2];
                break;
            case 3:
                this.scene.passDirection.Left = false;
                this.scene.passDirection.Right = false;
                this.scene.passDirection.Up = true;
                this.scene.passingOrderArray = [2, 3, 0, 1]
                break;
            default:
                this.scene.passDirection.Left = false;
                this.scene.passDirection.Right = false;
                this.scene.passDirection.Up = false;
                break;

        }
    }
}