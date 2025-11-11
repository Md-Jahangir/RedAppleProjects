export default class QuitPopup {
    constructor(scene) {
        this.scene = scene;
        this.create();
    }
    create() {
        
        this.popupOverlay = this.scene.add.image(0, 0, 'loading_overlay').setOrigin(0).setAlpha(0.5).setInteractive();
        this.quitPopupBg = this.scene.add.image(0, 0, 'msg_box');
        this.yesButtonBg = this.scene.add.image(0, 0, 'plus_display').setInteractive({useHandCursor : true});
        this.noButtonBg = this.scene.add.image(0, 0, 'plus_display').setInteractive({useHandCursor : true});
        this.titleText = this.scene.add.text(
            0,
            0,
            'ARE YOU \n SURE?', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '100px',
            color: '#fff'
        }).setOrigin(0.5);
        this.yesText = this.scene.add.text(
            0,
            0,
            'YES', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }).setOrigin(0.5);
        this.noText = this.scene.add.text(
            0,
            0,
            'NO', {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '40px',
            color: '#fff'
        }).setOrigin(0.5);
        this.Hide();
        this.noButtonBg.on('pointerup', this.Hide, this);
        this.yesButtonBg.on('pointerup', this.HideAndSceneTransit, this);
    }
    Show() {
        this.popupOverlay.setVisible(true);
        this.quitPopupBg.setVisible(true);
        this.yesButtonBg.setVisible(true);
        this.noButtonBg.setVisible(true);
        this.titleText.setVisible(true);
        this.yesText.setVisible(true);
        this.noText.setVisible(true);
    }
    Hide() {
        this.popupOverlay.setVisible(false);
        this.quitPopupBg.setVisible(false);
        this.yesButtonBg.setVisible(false);
        this.noButtonBg.setVisible(false);
        this.titleText.setVisible(false);
        this.yesText.setVisible(false);
        this.noText.setVisible(false);
    }
    HideAndSceneTransit(){
        this.Hide();
        this.scene.scene.stop('GameScene');
        this.scene.scene.start('SplashScene');
    }
    Resize(newWidth , newHeight , newScale) {
        this.popupOverlay.setDisplaySize(newWidth , newHeight);
        this.quitPopupBg.setScale(newScale);
        this.quitPopupBg.setPosition(newWidth / 2 , newHeight / 2);
        this.titleText.setScale(newScale);
        this.titleText.setPosition(this.quitPopupBg.x + 20 * newScale , this.quitPopupBg.y - 45 * newScale)
        this.noButtonBg.setScale(newScale);
        this.noButtonBg.setPosition(this.quitPopupBg.x - 170 * newScale , this.quitPopupBg.y + 200 * newScale)
        this.yesButtonBg.setScale(newScale);
        this.yesButtonBg.setPosition(this.quitPopupBg.x + 185 * newScale , this.quitPopupBg.y + 200 * newScale)
        this.noText.setScale(newScale);
        this.noText.copyPosition(this.noButtonBg);
        this.yesText.setScale(newScale);
        this.yesText.copyPosition(this.yesButtonBg);
    }
}