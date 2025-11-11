class Player {
    constructor(scene) {
        this.scene = scene;
        this.player = null;
    }
    CreatePlayer() {
        // this.player = this.scene.physics.add.image(480, 960, 'player').setDepth(0)  //.setIgnoreGravity(false);
        this.player = this.scene.add.spine(480, 960, 'penguin').setScale(0.2 * scaleFactor, 0.2 * scaleFactor);
        this.player.setSize(this.player.width - 5, this.player.height, true);
        this.player.setOffset(102, 48);
        this.scene.physics.add.existing(this.player);
        this.player.body.allowGravity = true;
        this.player.body.immovable = false;
        // this.player.body.setVelocityX(70);
        this.player.play('Idle', true);
        // this.scene.time.addEvent({
        //     delay: 1000,
        //     callback: this.scene.delayDone,
        //     callbackScope: this,
        //     loop: false
        // });
        // console.log(this.player)
        // this.player.setSize(this.player.width, this.player.height, true);

        // // if (!isPaused) {

    }
    // delayDone() {
    //     // this.player.setSize(this.player.width + 500, this.player.height, true);
    // }
}
export default Player;