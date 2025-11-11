class Camera {
    constructor(scene) {
        this.scene = scene;
        this.create();
    }

    create() {
        // this.SetCamera();
    }

    FollowCameraToPlayer(_player) {
        let boundary = [
            this.scene.cameras.main.centerX - this.scene.map.mapContainer.list[0].width * 0.3,
            0,
            (this.scene.cameras.main.centerX + this.scene.map.mapContainer.list[0].width * 1.05),
            (this.scene.cameras.main.height + this.scene.map.mapContainer.list[0].height * 0.75),
        ];
        this.scene.cameras.main.setBounds(boundary[0], boundary[1], (boundary[2]), boundary[3]);
        this.scene.cameras.main.startFollow(_player);
    }

    SetCamera() {
        this.scene.cameras.main.centerOn(0, 0);
    }

    CameraZoomIn() {
        let cam = this.scene.cameras.main;
        cam.zoomTo(1.2, 1000);
    }

    CameraZoomOut() {
        let cam = this.scene.cameras.main;
        cam.pan(Math.round(window.phaserGame.game.config.width / 2), Math.round(window.phaserGame.game.config.height / 2), 1000, 'Power2');
        cam.zoomTo(1, 1000);
    }
}

export default Camera;