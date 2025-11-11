class Strikethrough extends Phaser.GameObjects.Text {
    constructor(scene, x, y, text, txtObj, abc) {
        super(scene, x, y, text, txtObj, abc)

        // console.log("hefhefi", txtObj);
        this.txtObj = txtObj;
        this.obj = abc;

        this.create()
        // this.scene.add.existing(this)
    }

    // create() {
    //     const width = +this.text;
    //     let rect = this.scene.add.rectangle(this.x, this.y, width, 6, 0x394666).setOrigin(0.7, 0.5).setDepth(10);
    //     if (this.obj.number >= 0 && this.obj.number < 10) {
    //         rect.setOrigin(-0.25, -3.5);
    //     }
    //     // else if (this.obj.number >= 5 && this.obj.number < 10) {
    //     //     rect.setOrigin(-0.5, -1.2);
    //     // }
    //     // else if (this.obj.number >= 6 && this.obj.number < 9) {
    //     //     rect.setOrigin(0.5, 16);
    //     // }
    //     // else if (this.obj.number == 9) {
    //     //     rect.setOrigin(0.5, 24);
    //     // }
    //     // his.txtObj.originX, this.txtObj.originY
    //     this.scene.lScrollContainer.add(rect);
    //     // console.log("xyz----------", this.obj.number);
    // }
    create() {
        const width = +this.text;
        let rect = this.scene.add.rectangle(this.x, this.y, width, 6, 0x394666).setOrigin(0.7, 0.5).setDepth(10);
        if (this.obj.number >= 0 && this.obj.number < 10) {
            rect.setOrigin(-0.23, -4);
        }
        // else if (this.obj.number >= 3 && this.obj.number < 6) {
        //     rect.setOrigin(0.5, 7);
        // }
        // else if (this.obj.number >= 6 && this.obj.number < 9) {
        //     rect.setOrigin(0.5, 16);
        // }
        // else if (this.obj.number == 9) {
        //     rect.setOrigin(0.5, 24);
        // }
        // his.txtObj.originX, this.txtObj.originY
        this.scene.lScrollContainer.add(rect);
        // console.log("xyz----------", this.obj.number);
    }
}
// .setOrigin(0.5, 0.3)
export default Strikethrough;