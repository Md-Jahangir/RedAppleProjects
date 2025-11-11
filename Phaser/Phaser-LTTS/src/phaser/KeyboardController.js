class KeyboardController {

    constructor(scene) {
        this.scene = scene;
        //this.create();
    }

    create() {
        this.cursors = this.scene.input.keyboard.addKeys('LEFT,RIGHT,UP,DOWN,SPACE');
    }

    KeyPressedCheck(_player, _direction) {
        switch (_direction) {
            case 'LEFT':
                if (this.cursors.LEFT.isDown) {
                    console.log('left');
                    _player.x -= 150;

                }
                break;
            case 'RIGHT':
                if (this.cursors.RIGHT.isDown) {
                    console.log('right');
                    _player.x += 150;

                }
                break;
            case 'UP':
                if (this.cursors.UP.isDown) {
                    console.log('up');
                    _player.y -= 150;

                }
                break;
            case 'DOWN':
                if (this.cursors.DOWN.isDown) {
                    console.log('down');
                    _player.y += 150;

                }
                break;
        }
    }

    DisableKeys(){
        //this.scene.input.keyboard.manager.enabled = false;
    }

    EnableKeys(){
        //this.scene.input.keyboard.manager.enabled = true;
    }

}

// let keyBoard = new KeyboardController();
// export { keyBoard as KeyboardController };
export default KeyboardController;
