import { Constant } from "../Constant.js";
class SymbolDescription {
    constructor(scene) {
        this.scene = scene;
        this.symbolDescriptionContainer = null;
    }
    CreateSymbolDescriptionPopUp() {
        const textStyle = { fontFamily: 'PR-Viking', fontSize: '35px', fill: '#FFF', fontStyle: 'normal', align: 'center' };

        const scatterTextStyle = { fontFamily: 'PR-Viking', fontSize: '25px', fill: '#FFF', fontStyle: 'normal', align: 'center' };

        this.symbolDescriptionContainer = this.scene.add.container(0, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY).setDepth(2);
        // console.log('this.symbolDescriptionContainer : ', this.symbolDescriptionContainer);

        let overlay = this.scene.add.image(0, 0, "one_pixel_black").setScale(5000).setInteractive();
        overlay.alpha = 0.00000001;
        // overlay.alpha = 1;
        overlay.removeInteractive();
        overlay.on("pointerdown", this.OnBgPress, this);
        overlay.on("pointerup", this.OnBgRelease, this)

        let bg = this.scene.add.image(0, 0, 'description').setOrigin(0.5, 0.5)//.setInteractive();


        let scatter = this.scene.add.spine(-155, -115, 'scatter').setVisible(false);
        let comboAnim = this.scene.add.spine(-155, -115, 'allinone').setVisible(false);

        let character_1 = this.scene.add.spine(-90, 0, 'barbas_anim').setVisible(false);
        let character_2 = this.scene.add.spine(-90, 0, 'peliroja_anim').setVisible(false);
        let character_3 = this.scene.add.spine(-90, 0, 'roughboy_anim').setVisible(false);
        let character_4 = this.scene.add.spine(-90, 0, 'morena_anim').setVisible(false);


        //Adding texts
        let text1 = this.scene.add.text(110, -90, "X5  FUN2.00", textStyle).setOrigin(0.5).setVisible(false);
        let text2 = this.scene.add.text(110, 0, "X5  FUN2.00", textStyle).setOrigin(0.5).setVisible(false);
        let text3 = this.scene.add.text(110, 90, "X5  FUN2.00", textStyle).setOrigin(0.5).setVisible(false);

        let scatterText = this.scene.add.text(110, -90, "3,4 or 5 Scatter\n symbolstrigger 10,\n12 or 15 free\ngames respectively", scatterTextStyle).setOrigin(0.5).setVisible(false);

        this.symbolDescriptionContainer.add(overlay);
        this.symbolDescriptionContainer.add(bg);//0
        this.symbolDescriptionContainer.add(scatter);//1
        this.symbolDescriptionContainer.add(comboAnim);//2
        this.symbolDescriptionContainer.add(character_1);//3
        this.symbolDescriptionContainer.add(character_2);//4 
        this.symbolDescriptionContainer.add(character_3);//5 
        this.symbolDescriptionContainer.add(character_4);//6

        this.symbolDescriptionContainer.add(text1);//7
        this.symbolDescriptionContainer.add(text2);//8
        this.symbolDescriptionContainer.add(text3);//9 

        this.symbolDescriptionContainer.add(scatterText);

        this.MakePopUpInvisible();
    }
    OnBgPress() { }
    OnBgRelease() {
        this.symbolDescriptionContainer.list[0].removeInteractive();
        this.MakePopUpInvisible();
    }
    MakePopUpVisible(_xPos, _yPos, _respectiveSymbol) {
        // console.log('_respectiveSymbol : ', _respectiveSymbol.texture.key.includes('Blured'))

        setTimeout(() => {
            this.symbolDescriptionContainer.list[0].setInteractive();
        }, 200);
        this.FlipPopup(_xPos, _yPos, _respectiveSymbol);
        this.ShowSelectiveAnimationOnly(_respectiveSymbol.texture.key);
        this.SetTextForIndividualSymbols(_respectiveSymbol.texture.key);


        // if (_respectiveSymbol.texture.key.includes('symbol_')) {
        this.symbolDescriptionContainer.visible = true;
        // this.MakePopUpInvisible();
        // }


        // this.symbolDescriptionContainer.visible = true;
    }
    MakePopUpInvisible() {
        this.symbolDescriptionContainer.visible = false;
    }
    FlipPopup(_xPos, _yPos, _respectiveSymbol) {
        if (Constant.isMobile) {
            if (Constant.isPortrait) {
                if (_xPos <= Constant.game.config.width / 2) {
                    this.symbolDescriptionContainer.setPosition((_xPos + (_respectiveSymbol.width / 2)), _yPos);
                } else {
                    this.symbolDescriptionContainer.setPosition((_xPos - (_respectiveSymbol.width / 2)), _yPos);
                }
            }
            else {
                if (_xPos <= Constant.game.config.width / 2) {
                    this.symbolDescriptionContainer.setPosition((_xPos + (_respectiveSymbol.width / 3.4)), _yPos);
                } else {
                    this.symbolDescriptionContainer.setPosition((_xPos - (_respectiveSymbol.width / 3.4)), _yPos);
                }
            }
        }
        else {
            if (_xPos <= Constant.game.config.width / 2) {
                this.symbolDescriptionContainer.setPosition((_xPos + (_respectiveSymbol.width / 2)), _yPos);
            } else {
                this.symbolDescriptionContainer.setPosition((_xPos - (_respectiveSymbol.width / 2)), _yPos);
            }
        }

        if (_xPos <= Constant.game.config.width / 2) {
            // this.symbolDescriptionContainer.setPosition((_xPos + (_respectiveSymbol.width / 2)), _yPos);
            this.symbolDescriptionContainer.list[2].setPosition(-155, -115)
            this.symbolDescriptionContainer.list[3].setPosition(-155, -115)
            this.symbolDescriptionContainer.list[4].setPosition(-170, -105)//-------------------
            this.symbolDescriptionContainer.list[5].setPosition(-90, 0)
            this.symbolDescriptionContainer.list[6].setPosition(-90, 0)
            this.symbolDescriptionContainer.list[7].setPosition(-270, -210)


            //for texts

            this.symbolDescriptionContainer.list[8].setPosition(110, -90)
            this.symbolDescriptionContainer.list[9].setPosition(110, 0)
            this.symbolDescriptionContainer.list[10].setPosition(110, 90)

            this.symbolDescriptionContainer.list[11].setPosition(110, 0)
        }
        else {
            // this.symbolDescriptionContainer.setPosition((_xPos - (_respectiveSymbol.width / 2)), _yPos);
            this.symbolDescriptionContainer.list[2].setPosition(0, -115)
            this.symbolDescriptionContainer.list[3].setPosition(0, -115)
            this.symbolDescriptionContainer.list[4].setPosition(20, -105)//-----------------------------
            this.symbolDescriptionContainer.list[5].setPosition(90, 0)
            this.symbolDescriptionContainer.list[6].setPosition(90, 0)
            this.symbolDescriptionContainer.list[7].setPosition(-70, -210)


            //for texts

            this.symbolDescriptionContainer.list[8].setPosition(-90, -90)
            this.symbolDescriptionContainer.list[9].setPosition(-90, 0)
            this.symbolDescriptionContainer.list[10].setPosition(-90, 90)

            this.symbolDescriptionContainer.list[11].setPosition(-90, 0)
        }
    }
    SetTextForIndividualSymbols(_name) {
        this.TextToggle(_name);
        // console.log('name : ', _name);
        if (_name == "symbol_scatter") {
            this.symbolDescriptionContainer.list[11].setText("3,4 or 5\nScatter\n symbolstrigger 10,\n12 or 15 free\ngames\nrespectively");
        }
        else if (_name == "symbol_character_1") {
            this.symbolDescriptionContainer.list[8].setText("X5  FUN2.00");
            this.symbolDescriptionContainer.list[9].setText("X4  FUN1.00");
            this.symbolDescriptionContainer.list[10].setText("X3  FUN0.40");
        }
        else if (_name == "symbol_character_2") {
            this.symbolDescriptionContainer.list[8].setText("X5  FUN1.50");
            this.symbolDescriptionContainer.list[9].setText("X4  FUN0.80");
            this.symbolDescriptionContainer.list[10].setText("X3  FUN0.50");
        }
        else if (_name == "symbol_character_3") {
            this.symbolDescriptionContainer.list[8].setText("X5  FUN1.00");
            this.symbolDescriptionContainer.list[9].setText("X4  FUN0.60");
            this.symbolDescriptionContainer.list[10].setText("X3  FUN0.40");
        }
        else if (_name == "symbol_character_4") {
            this.symbolDescriptionContainer.list[8].setText("X5  FUN1.60");
            this.symbolDescriptionContainer.list[9].setText("X4  FUN0.50");
            this.symbolDescriptionContainer.list[10].setText("X3  FUN0.30");
        }
        else if (_name == "symbol_9") {
            this.symbolDescriptionContainer.list[8].setText("X5  FUN0.60");
            this.symbolDescriptionContainer.list[9].setText("X4  FUN0.40");
            this.symbolDescriptionContainer.list[10].setText("X3  FUN0.20");
        }
        else if (_name == "symbol_10") {
            this.symbolDescriptionContainer.list[8].setText("X5  FUN0.60");
            this.symbolDescriptionContainer.list[9].setText("X4  FUN0.40");
            this.symbolDescriptionContainer.list[10].setText("X3  FUN0.20");
        }
        else if (_name == "symbol_a") {
            this.symbolDescriptionContainer.list[8].setText("X5  FUN0.60");
            this.symbolDescriptionContainer.list[9].setText("X4  FUN0.40");
            this.symbolDescriptionContainer.list[10].setText("X3  FUN0.20");
        }
        else if (_name == "symbol_j") {
            this.symbolDescriptionContainer.list[8].setText("X5  FUN0.60");
            this.symbolDescriptionContainer.list[9].setText("X4  FUN0.40");
            this.symbolDescriptionContainer.list[10].setText("X3  FUN0.20");
        }
        else if (_name == "symbol_k") {
            this.symbolDescriptionContainer.list[8].setText("X5  FUN0.60");
            this.symbolDescriptionContainer.list[9].setText("X4  FUN0.40");
            this.symbolDescriptionContainer.list[10].setText("X3  FUN0.20");
        }
        else if (_name == "symbol_q") {
            this.symbolDescriptionContainer.list[8].setText("X5  FUN0.60");
            this.symbolDescriptionContainer.list[9].setText("X4  FUN0.40");
            this.symbolDescriptionContainer.list[10].setText("X3  FUN0.20");
        }
    }
    TextToggle(_name) {
        if (_name == "symbol_scatter") {
            this.symbolDescriptionContainer.list[11].visible = true;
            this.symbolDescriptionContainer.list[8].visible = false;
            this.symbolDescriptionContainer.list[9].visible = false;
            this.symbolDescriptionContainer.list[10].visible = false;
        }
        else {
            this.symbolDescriptionContainer.list[11].visible = false;
            this.symbolDescriptionContainer.list[8].visible = true;
            this.symbolDescriptionContainer.list[9].visible = true;
            this.symbolDescriptionContainer.list[10].visible = true;
        }
    }
    ShowSelectiveAnimationOnly(_name) {
        if (_name == "symbol_scatter") {

            this.symbolDescriptionContainer.list[3].visible = false;
            this.symbolDescriptionContainer.list[4].visible = false;
            this.symbolDescriptionContainer.list[5].visible = false;
            this.symbolDescriptionContainer.list[6].visible = false;
            this.symbolDescriptionContainer.list[7].visible = false;



            this.symbolDescriptionContainer.list[2].setVisible(true);
            this.symbolDescriptionContainer.list[2].play("Scatter_Animation");
        }
        else if (_name == "symbol_character_1") {
            this.symbolDescriptionContainer.list[7].visible = false;
            this.symbolDescriptionContainer.list[2].visible = false;
            this.symbolDescriptionContainer.list[3].visible = false;
            this.symbolDescriptionContainer.list[5].visible = false;
            this.symbolDescriptionContainer.list[6].visible = false;


            this.symbolDescriptionContainer.list[4].setVisible(true);
            this.symbolDescriptionContainer.list[4].play("Barbas_Animation_Scaled");
        }
        else if (_name == "symbol_character_2") {
            this.symbolDescriptionContainer.list[7].visible = false;
            this.symbolDescriptionContainer.list[2].visible = false;
            this.symbolDescriptionContainer.list[3].visible = false;
            this.symbolDescriptionContainer.list[4].visible = false;
            this.symbolDescriptionContainer.list[6].visible = false;

            this.symbolDescriptionContainer.list[5].setVisible(true);
            this.symbolDescriptionContainer.list[5].play("Peliroja_Animation_Scaled");
        }
        else if (_name == "symbol_character_3") {

            this.symbolDescriptionContainer.list[7].visible = false;
            this.symbolDescriptionContainer.list[2].visible = false;
            this.symbolDescriptionContainer.list[3].visible = false;
            this.symbolDescriptionContainer.list[4].visible = false;
            this.symbolDescriptionContainer.list[5].visible = false;



            this.symbolDescriptionContainer.list[6].setVisible(true);
            this.symbolDescriptionContainer.list[6].play("Roughboy_Animation_Scaled");
        }
        else if (_name == "symbol_character_4") {
            this.symbolDescriptionContainer.list[6].visible = false;
            this.symbolDescriptionContainer.list[2].visible = false;
            this.symbolDescriptionContainer.list[3].visible = false;
            this.symbolDescriptionContainer.list[4].visible = false;
            this.symbolDescriptionContainer.list[5].visible = false;


            this.symbolDescriptionContainer.list[7].setVisible(true);
            this.symbolDescriptionContainer.list[7].play("Morena_Animation_Scaled");
        }
        else if (_name == "symbol_9") {
            this.symbolDescriptionContainer.list[7].visible = false;
            this.symbolDescriptionContainer.list[6].visible = false;
            this.symbolDescriptionContainer.list[3].visible = false;
            this.symbolDescriptionContainer.list[4].visible = false;
            this.symbolDescriptionContainer.list[5].visible = false;



            this.symbolDescriptionContainer.list[3].setVisible(true);
            this.symbolDescriptionContainer.list[3].play("Symbol_9_Animation");
        }
        else if (_name == "symbol_10") {

            this.symbolDescriptionContainer.list[7].visible = false;
            this.symbolDescriptionContainer.list[6].visible = false;
            this.symbolDescriptionContainer.list[3].visible = false;
            this.symbolDescriptionContainer.list[4].visible = false;
            this.symbolDescriptionContainer.list[5].visible = false;



            this.symbolDescriptionContainer.list[3].setVisible(true);
            this.symbolDescriptionContainer.list[3].play("Symbol_10_Animation");
        }
        else if (_name == "symbol_a") {

            this.symbolDescriptionContainer.list[7].visible = false;
            this.symbolDescriptionContainer.list[6].visible = false;
            this.symbolDescriptionContainer.list[3].visible = false;
            this.symbolDescriptionContainer.list[4].visible = false;
            this.symbolDescriptionContainer.list[5].visible = false;



            this.symbolDescriptionContainer.list[3].setVisible(true);
            this.symbolDescriptionContainer.list[3].play("Symbol_A_Animation");
        }
        else if (_name == "symbol_j") {

            this.symbolDescriptionContainer.list[7].visible = false;
            this.symbolDescriptionContainer.list[6].visible = false;
            this.symbolDescriptionContainer.list[3].visible = false;
            this.symbolDescriptionContainer.list[4].visible = false;
            this.symbolDescriptionContainer.list[5].visible = false;



            this.symbolDescriptionContainer.list[3].setVisible(true);
            this.symbolDescriptionContainer.list[3].play("Symbol_J_Animation");
        }
        else if (_name == "symbol_k") {

            this.symbolDescriptionContainer.list[7].visible = false;
            this.symbolDescriptionContainer.list[6].visible = false;
            this.symbolDescriptionContainer.list[3].visible = false;
            this.symbolDescriptionContainer.list[4].visible = false;
            this.symbolDescriptionContainer.list[5].visible = false;


            this.symbolDescriptionContainer.list[3].setVisible(true);
            this.symbolDescriptionContainer.list[3].play("Symbol_K_Animation");
        }
        else if (_name == "symbol_q") {

            this.symbolDescriptionContainer.list[7].visible = false;
            this.symbolDescriptionContainer.list[6].visible = false;
            this.symbolDescriptionContainer.list[3].visible = false;
            this.symbolDescriptionContainer.list[4].visible = false;
            this.symbolDescriptionContainer.list[5].visible = false;



            this.symbolDescriptionContainer.list[3].setVisible(true);
            this.symbolDescriptionContainer.list[3].play("Symbol_Q_Animation");
        }
    }
}
export default SymbolDescription;