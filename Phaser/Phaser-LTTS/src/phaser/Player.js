import AnimationManager from './AnimationManager.js';


class Player {
    constructor(scene, _data) {
        this.scene = scene;
        this.player = null;
        this.id = _data.id;
        this.name = _data.name;
        let _arr = ['0', '1', '3', '2', '6', '5', '4', '7', '9', '8', '12', '11', '10'];
        let avatarName = _data.avatar;
        avatarName = avatarName.split('_');
        this.avatarId = _arr[parseInt(avatarName[1])]; //_data.avatar;

        this.posX = _data.position.x;
        this.posY = _data.position.y;
        this.animationManager = null;
        this.isAnimPlaying = false;

        this.playerContainer = null;
        this.CreatePlayer();
    }

    CreatePlayer() {
        this.playerContainer = this.scene.add.container(this.posX * window.phaserGame.scaleFactorX, this.posY * window.phaserGame.scaleFactorX).setScale(window.phaserGame.scaleFactorX);
        let player = this.scene.add.sprite(0, 0, 'character', `p${this.avatarId}_walk_right_1.png`).setOrigin(0.5);
        this.playerContainer.setSize(player.displayWidth - 20, player.displayHeight);
        this.scene.physics.world.enable([this.playerContainer]);
        this.playerContainer.body.setOffset(0, -12);
        // Text
        let playerNameTextStyle = {
            fontFamily: 'Roboto_Bold',
            fontSize: 17,
            fill: '#fff',
            fontStyle: 'bold',
            align: 'center'
        };
        let playerNameText = this.scene.add.text(player.x, player.y - 60, (this.name || 'PLAYER'), playerNameTextStyle).setOrigin(0.5);

        this.playerContainer.add([player, playerNameText]);
        this.player = this.playerContainer;
        this.player.direction = 'right';
        //console.log(this.playerContainer);
        this.animationManager = new AnimationManager(this.scene);
        this.animationManager.CreatePlayerAnimation(this.avatarId, this.id);
    }

    SetPlayerName() {
        // console.log('SetPlayerName from player.js', );
        this.player.list[1].setText(this.name);
    }

    PlayIdleAnimation(dir = 'right') {
        if (this.isAnimPlaying) {
            this.isAnimPlaying = false;
            this.player.direction = dir;
            this.player.list[0].anims.play(`idle-${dir}-${this.id}`);
        }
    }

    PlayWalkAnimation(dir = 'right') {
        if (!this.isAnimPlaying) {
            this.isAnimPlaying = true;
            this.player.direction = dir;
            this.player.list[0].anims.play(`walk-${dir}-${this.id}`);
        }
    }

    UpdateMovement(_x, _y, _direction) {
        // console.log('_x::' + _x + ' ' + _y + ' ' + this.player.x + ' ' + this.player.y);
        if (_x != this.player.x || _y != this.player.y) {
            this.PlayWalkAnimation(_direction);
        } else {
            this.PlayIdleAnimation(this.player.direction);
        }
        this.player.x = _x;
        this.player.y = _y;
    }

}

export default Player;