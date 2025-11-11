var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'game', {
    init: function () {
        console.log("Enter into the Init Fucntion");
        //Load the plugin
        this.game.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling);
        this.game.kineticScrolling.configure({
          kineticMovement: true,
          timeConstantScroll: 325, //really mimic iOS
          horizontalScroll: false,
          verticalScroll: true,
          horizontalWheel: true,
          verticalWheel: false,
          deltaWheel: 40
      });
        //If you want change the default configuration before start the plugin
    },
    create: function () {
      console.log("Enter into the create function");
      //Starts the plugin
      this.game.kineticScrolling.start();
  
      this.game.add.text(game.world.width*0.01, game.world.height*0.01, "Vertical scroll", { font: "16px Arial", fill: "#ffffff" });
  
      //If you want change the default configuration after start the plugin
      var initY = 50;
      this.rectangles = [];
      for (var i = 0; i < 25; i++) {
          this.rectangles.push(this.createRectangle(this.game.world.centerX - 100,initY, 250, 200));
          this.index = this.game.add.text(this.game.world.centerX,initY + 125, i + 1,
                      { font: 'bold 150px Arial', align: "center" });
          this.index.anchor.set(0.5);
          initY += 250;
      }
      // this.SetMessageText("Shantanu Da");
      this.SetMessageText("Runa Di");
      //Changing the world width
      this.game.world.setBounds(0, 0,302*this.rectangles.length,250*26);//9*this.game.height);
    },
    SetMessageText(message) {
      var initY = 50;
      this.rectangles.push(this.createRectangle(this.game.world.centerX + 100,initY, 250, 200));
      this.index = this.game.add.text(this.game.world.centerX,initY + 125,message,
                  { font: 'bold 150px Arial', align: "center" });
      this.index.anchor.set(0.5);
      initY += 300;
    },
    createRectangle: function (x, y, w, h) {
      var sprite = this.game.add.graphics(x, y);
      sprite.beginFill(Phaser.Color.getRandomColor(100, 255), 1);
      sprite.bounds = new PIXI.Rectangle(0, 0, w, h);
      sprite.drawRect(0, 0, w, h);
      return sprite;
    }
  });
  