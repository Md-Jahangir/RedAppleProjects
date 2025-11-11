class Map {
    constructor(scene) {
        this.scene = scene;
        this.staticColliderGroup = null;
        this.colliderPositionArray = [];
        this.colliderScaleArray = [];
        this.wallColliderArray = [];
        this.mapContainer = null;

        this.create();
    }

    create() {
        const { game, scaleFactorX } = window.phaserGame;

        this.colliderPositionArray = [
            { x: Math.floor(game.config.width / 4.214), y: Math.floor(game.config.height / 3.56) },
            { x: Math.floor(game.config.width / 3.2), y: Math.floor(game.config.height / 3.32) },
            { x: Math.floor(game.config.width / 2.46), y: Math.floor(game.config.height / 3.82) },
            { x: Math.floor(game.config.width / 2.312), y: Math.floor(game.config.height / 7.66) },
            { x: Math.floor(game.config.width / 1.586), y: Math.floor(game.config.height / 7.66) },
            { x: Math.floor(game.config.width / 1.42), y: Math.floor(game.config.height / 3.82) },
            { x: Math.floor(game.config.width / 1.881), y: Math.floor(game.config.height / 52) },
            { x: Math.floor(game.config.width / 1.192), y: Math.floor(game.config.height / 1.623) },
            { x: Math.floor(game.config.width / 5.81), y: Math.floor(game.config.height / 1.623) },
            { x: Math.floor(game.config.width / 3.222), y: Math.floor(game.config.height / 1.998) },
            { x: Math.floor(game.config.width / 4.17), y: Math.floor(game.config.height / 1.86) },
            { x: Math.floor(game.config.width / 4.17), y: Math.floor(game.config.height / 1.998) },
            { x: Math.floor(game.config.width / 1.978), y: Math.floor(game.config.height / 1.009) },
            { x: Math.floor(game.config.width / 3.223), y: Math.floor(game.config.height / 1.316) },
            { x: Math.floor(game.config.width / 3.223), y: Math.floor(game.config.height / 1.043) },
            { x: Math.floor(game.config.width / 1.978), y: Math.floor(game.config.height / 1.35) },
            { x: Math.floor(game.config.width / 1.422), y: Math.floor(game.config.height / 1.173) },
            { x: Math.floor(game.config.width / 1.881), y: Math.floor(game.config.height / 1.92) },
            { x: Math.floor(game.config.width / 1.988), y: Math.floor(game.config.height / 3.56) },
            { x: Math.floor(game.config.width / 1.785), y: Math.floor(game.config.height / 3.56) },
        ];

        this.colliderScaleArray = [
            { x: 250 * scaleFactorX, y: 10 * scaleFactorX },
            { x: 45 * scaleFactorX, y: 55 * scaleFactorX },
            { x: 330 * scaleFactorX, y: 45 * scaleFactorX },
            { x: 45 * scaleFactorX, y: 250 * scaleFactorX },
            { x: 45 * scaleFactorX, y: 250 * scaleFactorX },
            { x: 523 * scaleFactorX, y: 45 * scaleFactorX },
            { x: 330 * scaleFactorX, y: 10 * scaleFactorX },
            { x: 10 * scaleFactorX, y: 800 * scaleFactorX },
            { x: 10 * scaleFactorX, y: 800 * scaleFactorX },
            { x: 45 * scaleFactorX, y: 100 * scaleFactorX },
            { x: 250 * scaleFactorX, y: 10 * scaleFactorX },
            { x: 250 * scaleFactorX, y: 10 * scaleFactorX },
            { x: 1290 * scaleFactorX, y: 10 * scaleFactorX },
            { x: 45 * scaleFactorX, y: 90 * scaleFactorX },
            { x: 45 * scaleFactorX, y: 58 * scaleFactorX },
            { x: 750 * scaleFactorX, y: 50 * scaleFactorX },
            { x: 50 * scaleFactorX, y: 300 * scaleFactorX },
            { x: 140 * scaleFactorX, y: 140 * scaleFactorX },
            { x: 33 * scaleFactorX, y: 90 * scaleFactorX },
            { x: 33 * scaleFactorX, y: 90 * scaleFactorX }
        ];

        this.mapContainer = this.scene.add.container(0, 0);

        const map = this.scene.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('main_area_spritesheet', 'main_area_spritesheet');
        const platforms = map.createStaticLayer('Tile_Layer_1', tileset, Math.round(game.config.width / 2) - 670 * scaleFactorX, -25 * scaleFactorX).setScale(scaleFactorX);

        this.staticColliderGroup = this.scene.add.container(0, 0);
        for (let i = 0; i < this.colliderPositionArray.length; i++) {
            let wall = this.scene.add.sprite(this.colliderPositionArray[i].x, this.colliderPositionArray[i].y, 'transparent_image').setScale(this.colliderScaleArray[i].x, this.colliderScaleArray[i].y).setAlpha(0.00001);
            this.scene.physics.world.enable([wall]);
            wall.body.setImmovable(true);
            this.staticColliderGroup.add(wall);
            this.wallColliderArray.push(wall);
        }

        this.mapContainer.add([platforms, this.staticColliderGroup]);
        this.mapContainer.setScale(1.8);
        
    }

    CollisionCheckWithWall(_player) {
        this.scene.physics.add.collider(this.wallColliderArray, _player);
    }

}

export default Map;