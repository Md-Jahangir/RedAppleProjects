import { Constant } from "../Constant";
class Text {
    constructor(scene, x, y, text, style) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.text = text;
        this.style = style;
        this.CreateImages(text,style)
    }
    CreateImages(text,style) {
        this.gameText = this.scene.add.text(this.x, this.y, text, style  ).setOrigin(0.5);
    }
    
}
export default Text; 