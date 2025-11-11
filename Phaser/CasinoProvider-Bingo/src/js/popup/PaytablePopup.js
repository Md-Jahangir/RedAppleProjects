import PaytableData from "../GameUiManager/PaytableData";
import Button from "../GameUiManager/Button";
export default class PaytablePopup {
    constructor(scene) {
        this.scene = scene;
        this.config = this.scene.cache.json.get("game-config");
        this.create();
        this.Hide();
    }
    create() {
        let config = this.config.paytable;
        this.popupOverlay = this.scene.add.image(0, 0, 'loading_overlay').setOrigin(0).setAlpha(0.5).setInteractive();
        this.paytablePopupBg = this.scene.add.image(0, 0, 'msg_box');

        this.paytableTitleText = this.scene.add.text(
            0,
            0,
            "PAYTABLE", {
            fontFamily: "CAMBRIAB",
            fontStyle: "bold",
            fontSize: '60px',
            color: '#fff'
        }
        ).setOrigin(0.5);
        this.playButton = new Button(this.scene, 'plus_display', config, 0.5, 'PLAY');
        this.playButton.SetClickCallBack(this.Hide, this);
        this.paytableData = new PaytableData(this.scene,this.paytablePopupBg.x , this.paytablePopupBg.y,config,  'card_cell_small' );
        this.paytableData.Hide();
    }
  
    Hide() {
        this.popupOverlay.setVisible(false);
        this.paytablePopupBg.setVisible(false);
        this.playButton.Hide();
        this.paytableData.Hide();
        this.paytableTitleText.setVisible(false);
    }
    Show() {
        this.popupOverlay.setVisible(true);
        this.paytablePopupBg.setVisible(true);
        this.playButton.Show();
        this.paytableData.Show();
        this.paytableTitleText.setVisible(true);
    }
    Resize(newWidth, newHeight, newScale) {
        let config = this.config.paytable;
        this.popupOverlay.setDisplaySize(newWidth, newHeight);
        this.paytablePopupBg.setScale(newScale);
        this.paytablePopupBg.setPosition(newWidth / 2, newHeight / 2);
        this.playButton.setScale(newScale);
        this.playButton.setPosition(this.paytablePopupBg.x + config.play_button.x * newScale, this.paytablePopupBg.y + config.play_button.y * newScale)
        this.paytableTitleText.setScale(newScale);
        this.paytableTitleText.setPosition(this.paytablePopupBg.x  + config.title_text.x * newScale,this.paytablePopupBg.y  +  config.title_text.y * newScale);
        this.paytableData.Resize(this.paytablePopupBg.x , this.paytablePopupBg.y ,newScale, config);
    }
}