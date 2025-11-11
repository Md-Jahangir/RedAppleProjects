class ElementThumb{
    constructor(scene){
        this.scene = scene;
        this.createbox();
    }

    createbox(){
        this.picked = this.scene.add.container().setScrollFactor(0,0,true);
        let shape = this.scene.add.rectangle(0, 0, 60, 60, 0x000000, 0.8);
        this.picked.add(shape);
        this.picked.setPosition(
            Math.round(this.scene.cameras.main.width * 0.5),
            Math.round(this.scene.cameras.main.height * 0.9)
        );
        this.picked.setScale(1.5);
        this.picked.setVisible(false);
    }

    show(id = null,dropFrame = null){
        if(this.picked){
            if(id){
                let image = this.scene.add.sprite(0,0,id);
                this.picked.add(image);
                this.picked.setVisible(true);
                if(dropFrame){
                    image.setFrame(dropFrame);
                }
            }
        }
    }

    hide(){
        this.picked.remove(this.picked[1],true);
        this.picked.setVisible(false);
    }

}

export default ElementThumb;