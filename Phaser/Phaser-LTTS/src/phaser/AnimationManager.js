class AnimationManager {

    constructor(scene) {
        this.scene = scene;
    }

    CreatePlayerAnimation(_aid = 1,_pid = 1) {
        console.log('id: :', _aid);
        this.scene.anims.create({
            key: `idle-left-${_pid}`,
            frameRate: 20,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames('character', { start: 1, end: 1, prefix: `p${_aid}_walk_left_`, suffix: '.png', zeroPad: 0 }),
        });
        this.scene.anims.create({
            key: `idle-right-${_pid}`,
            frameRate: 20,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames('character', { start: 1, end: 1, prefix: `p${_aid}_walk_right_`, suffix: '.png', zeroPad: 0 }),
        });
        this.scene.anims.create({
            key: `idle-up-${_pid}`,
            frameRate: 20,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames('character', { start: 1, end: 1, prefix: `p${_aid}_walk_up_`, suffix: '.png', zeroPad: 0 }),
        });
        this.scene.anims.create({
            key: `walk-left-${_pid}`,
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames('character', { start: 1, end: 5, prefix: `p${_aid}_walk_left_`, suffix: '.png', zeroPad: 0 }),
        });
        this.scene.anims.create({
            key: `walk-right-${_pid}`,
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames('character', { start: 1, end: 5, prefix: `p${_aid}_walk_right_`, suffix: '.png', zeroPad: 0 }),
        });
        this.scene.anims.create({
            key: `walk-up-${_pid}`,
            frameRate: 10,
            repeat: -1,
            frames: this.scene.anims.generateFrameNames('character', { start: 1, end: 3, prefix: `p${_aid}_walk_up_`, suffix: '.png', zeroPad: 0 }),
        });
    }

}

export default AnimationManager;