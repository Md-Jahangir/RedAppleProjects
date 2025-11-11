class AlignGrid {
    constructor(config) {
        if (!config.scene) {
            console.log("missing scene!");
            return;
        }
        // if (!config.rows) {
        //     config.rows = 3;
        // }
        // if (!config.cols) {
        //     config.cols = 3;
        // }
        if (!config.width) {
            config.width = 10800;
        }
        if (!config.height) {
            config.height = 1920;
        }
        console.log(game.config.width);
        this.h = config.height;
        this.w = config.width;
        this.rows = config.rows;
        this.cols = config.cols;
        this.scene = config.scene;
        // console.log(game.config.rows);
        this.cw = this.w / this.cols;
        //ch cell height is the scene height divided the number of rows
        this.ch = this.h / this.rows;

        console.log(this.scene);

    }
    show(a = 100) {
        this.cw = this.w / this.cols;
        //ch cell height is the scene height divided the number of rows
        this.ch = this.h / this.rows;
        this.graphics = this.scene.add.graphics();
        this.graphics.lineStyle(4, 0xff0000, a);
        //
        //
        //this.graphics.beginPath();
        for (let i = 0; i < this.w; i += this.cw) {
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.h);
        }
        for (let i = 0; i < this.h; i += this.ch) {
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.w, i);
        }
        this.graphics.strokePath();
    }
    placeAt(xx, yy, obj) {
        //calculate the center of the cell
        //by adding half of the height and width
        //to the x and y of the coordinates
        let x2 = this.cw * xx + this.cw / 2;
        let y2 = this.ch * yy + this.ch / 2;
        obj.x = x2;
        obj.y = y2;
    }
    showNumbers(a = 1) {
        this.show(a);
        let n = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                let numText = this.scene.add.text(0, 0, n, {
                    color: 'red',
                    fontSize: 40,
                });
                numText.setOrigin(0.5, 0.5);
                this.placeAt(j, i, numText);
                n++;
            }
        }
    }
    placeAtIndex(index, obj) {
        let yy = Math.floor(index / this.cols);
        let xx = index - (yy * this.cols);
        this.placeAt(xx, yy, obj);
    }

}
export default AlignGrid;