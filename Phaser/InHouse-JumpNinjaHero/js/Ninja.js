class Ninja {
    constructor(scene) {
        this.scene = scene;
        this.ninja;
        this.ninjaJump;
    }
    CreateNinja() {
        this.ninja = this.scene.physics.add.sprite(game.config.width / 2.09, game.config.height / 1.421, 'run_ninja').setDepth(7);
        if (isMobile) {
            this.ninja.setScale(1.2 * scaleFactorX, 1.2 * scaleFactorY);
        }
        this.ninja.body.allowGravity = false;
    }
    CreateJumpNinja() {
        this.ninjaJump = this.scene.physics.add.sprite(game.config.width / 2.09, game.config.height / 1.421, 'jump_ninja').setDepth(7);
        if (isMobile) {
            this.ninjaJump.setScale(1.2 * scaleFactorX, 1.2 * scaleFactorY);
        }
        this.ninjaJump.body.allowGravity = false;
    }
    CreateDeadNinja() {
        this.ninjaDead = this.scene.physics.add.sprite(game.config.width / 2.09, game.config.height / 1.421, 'dead_ninja').setDepth(7);
        if (isMobile) {
            this.ninjaDead.setScale(1.2 * scaleFactorX, 1.2 * scaleFactorY);
        }
        this.ninjaDead.body.allowGravity = false;
    }
    CreateAnimations() {
        this.scene.anims.create({
            key: 'run_start',
            frames: this.scene.anims.generateFrameNumbers('run_ninja', { start: 0, end: 5 }),
            frameRate: 12,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'run',
            frames: this.scene.anims.generateFrameNumbers('run_ninja', { start: 0, end: 5 }),
            frameRate: 18,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'jump',
            frames: this.scene.anims.generateFrameNumbers('jump_ninja', { start: 0, end: 1 }),
            frameRate: 12,
            repeat: -1
        });
        this.scene.anims.create({
            key: 'death',
            frames: this.scene.anims.generateFrameNumbers('dead_ninja', { start: 0, end: 7 }),
            frameRate: 9,
        });
        this.scene.anims.create({
            key: 'duck',
            frames: this.scene.anims.generateFrameNumbers('dead_ninja', { start: 4, end: 7 }),
            frameRate: 10,
        });
    }
}
export default Ninja;