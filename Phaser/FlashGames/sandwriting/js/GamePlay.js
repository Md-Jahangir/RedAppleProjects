var gameplayWhiteBackground;
var skyBackground;
var bottomBackground;

var nameTextFieldBg;
var nameTextFieldInput;
var nameText;
var writeButton;
var eraseButton;

var writeButtonText;
var eraseButtonText;
var moon;
var water;
var boat;
var boat2;
var dolphin;
var dolphin2;

var textObject;
var printingText;

var falseWater;


var GamePlay = function() {};
GamePlay.prototype = {
    init: function() {
        Utils.ScaleManager();
        console.log("The Gameplay screen........................");
    },
    preload: function() {
        gamePage = "GameplayScreen";
    },
    render: function() {},
    create: function() {
        // SoundManager.PlayGameSound(); 
        gameplayWhiteBackground = Utils.SpriteSettingsControl(gameplayWhiteBackground, 320, 180, 'whitePixel', "true", "true", 0.5, 0.5, 10000, 10000, "false");

        skyBackground = Utils.SpriteSettingsControl(skyBackground, 640, 150, 'whitePixel', "true", "true", 0.5, 0.5, 809, 170, "false");
        skyBackground.tint = "0x0099ff";

        moon = Utils.SpriteSettingsControl(bottomBackground, 790, 187, 'moon', "true", "true", 0.5, 0.5, 0.8, 1, "false");

        falseWater = Utils.SpriteSettingsControl(falseWater, 640, 239, 'falseWater', "true", "true", 0.5, 0.5, 1.59, 1, "false");

        water = Utils.SpriteSettingsControl(water, 625, 140, 'water', "true", "true", 0.5, 0, 1.78, 0.82, "false");
        water.animations.add('waterAnimation');
        water.animations.play('waterAnimation', 8, true);

        bottomBackground = Utils.SpriteSettingsControl(bottomBackground, 641, 385, 'bottomBackground', "true", "true", 0.5, 0, 1, 1.1, "false");

        printingText = game.add.text(565, 500, "", { font: '75px Arial', fill: '#990000', fontWeight: 'bold italic', align: 'center', });
        printingText.anchor.set(0, 0);
        printingText.setShadow(-4, 4, 'rgba(0,0,0,0.8)', 0);
        printingText.visible = false;

        var nameTextstyle = { font: '28px Arial', fill: '#000000', fontWeight: 'normal', align: 'center', wordWrap: false, wordWrapWidth: 800 };
        nameText = game.add.text(360, 105, "Enter your name :", nameTextstyle);
        nameText.anchor.setTo(0.5);
        nameTextFieldInput = game.add.inputField(250, 155, {
            font: '32px Arial',
            fill: '#000000',
            textAlign: 'center',
            fillAlpha: 1,
            fillColor: '#000000',
            fontWeight: 'normal',
            width: 390,
            padding: 8,
            height: 35,
            backgroundColor: '#0099ff',
            borderWidth: 1.5,
            borderColor: '#ff0000',
            borderRadius: 4,
            zoom: false,
            cursorColor: '#000000',
            max: 15
        });
        nameTextFieldInput.input.useHandCursor = false;

        writeButton = Utils.ButtonSettingsControl(writeButton, 790, 105, 'button_base', this.WriteBttnDown, this.WriteBttnOver, this.WriteBttnOut, this.WriteBttnUp, "true", "true", 0.5, 0.5, 1.2, 1.2, this);
        writeButtonText = game.add.text(752, 92, "WRITE", { font: '24px Arial', fill: '#990000', fontWeight: 'bold', align: 'center', });
        writeButton.input.useHandCursor = true;

        eraseButton = Utils.ButtonSettingsControl(eraseButton, 955, 105, 'button_base', this.EraseBttnDown, this.EraseBttnOver, this.EraseBttnOut, this.EraseBttnUp, "true", "true", 0.5, 0.5, 1.2, 1.2, this);
        eraseButtonText = game.add.text(915, 92, "ERASE", { font: '24px Arial', fill: '#990000', fontWeight: 'bold', align: 'center', });
        eraseButton.inputEnabled = false;

        boat = Utils.SpriteSettingsControl(boat, 290, 350, 'boat', "true", "true", 0.5, 0.5, -0.45, 0.45, "false");
        boat.animations.add('boatAnimation');
        boat.animations.play('boatAnimation', 10, true);

        boat2 = Utils.SpriteSettingsControl(boat2, 1005, 290, 'boat', "true", "true", 0.5, 0.5, 0.3, 0.3, "false");
        boat2.animations.add('boat2Animation');
        boat2.animations.play('boat2Animation', 10, true);
        boat2.visible = false;

        dolphin = Utils.SpriteSettingsControl(dolphin, 350, 210, 'dolphin', "true", "true", 0.5, 0.5, -0.8, 0.8, "false");
        dolphin.animations.add('dolphinAnimation');
        dolphin.visible = false;

        dolphin2 = Utils.SpriteSettingsControl(dolphin2, 900, 200, 'dolphin', "true", "true", 0.5, 0.5, 0.8, 0.8, "false");
        dolphin2.animations.add('dolphin2Animation');
        dolphin2.visible = false;

        this.BoatTween();
        this.DolphinTween();
    },

    update: function() {},

    WaterTween: function() {
        game.world.bringToTop(water);
        game.world.bringToTop(boat);
        game.world.bringToTop(boat2);
        var waterTween = game.add.tween(water.scale).to({ y: 1 }, 1500, "Linear", true);
        waterTween.onComplete.add(function() {
            printingText.setText("");
            eraseButton.inputEnabled = false;
            writeButton.inputEnabled = true;
            writeButton.input.useHandCursor = true;
            eraseButton.tint = "0xffffff";
            writeButton.tint = "0xffffff";
            var twn = game.add.tween(water.scale).to({ y: 0.82 }, 1200, "Linear", true, 250);
            twn.onComplete.add(function() {
                game.world.bringToTop(bottomBackground);
            });
        });
    },

    BoatTween: function() {
        var ref = this;
        boat.x = 290;
        boat.visible = true;
        game.world.bringToTop(boat);
        var boat1Tween = game.add.tween(boat).to({ x: 990 }, 16000, "Linear", true, 100);
        boat1Tween.onComplete.add(function() {
            boat.visible = false;
            setTimeout(() => {
                boat2.visible = true;
                game.world.bringToTop(boat2);
                boat2.x = 1005;
                boat2.y = 290;
                boat2.scale.setTo(0.3);
                var boat2Tween = game.add.tween(boat2).to({ x: 250, y: 240 }, 16000, "Linear", true);
                var boat2Scale = game.add.tween(boat2.scale).to({ x: 0.13, y: 0.13 }, 13000, "Linear", true);
                boat2Tween.onComplete.add(function() {
                    boat2.visible = false;
                    setTimeout(() => {
                        ref.BoatTween();
                    }, 1000);
                });
            }, 700);
        });
    },

    PlayDolphin2Amimation: function() {
        dolphin2.visible = true;
        game.world.bringToTop(dolphin2);
        var anim = dolphin2.animations.play('dolphin2Animation', 10, false);
        anim.onComplete.add(function() {
            dolphin2.visible = false;
        });
    },
    PlayDolphinAmimation: function() {
        dolphin.visible = true;
        game.world.bringToTop(dolphin);
        var anim = dolphin.animations.play('dolphinAnimation', 11, false);
        anim.onComplete.add(function() {
            dolphin.visible = false;
        });
    },

    DolphinTween: function() {
        var ref = this;
        dolphin.x = 350;
        var dolphinAnimTime = game.time.events.loop(4000, this.PlayDolphinAmimation, this);
        var dolphinTween = game.add.tween(dolphin).to({ x: 900 }, 10000, "Linear", true, );
        dolphinTween.onComplete.add(function() {
            dolphin.visible = false;
            game.time.events.remove(dolphinAnimTime);
        });

        setTimeout(() => {
            dolphin2.x = 900;
            var dolphin2AnimTime = game.time.events.loop(4000, this.PlayDolphin2Amimation, this);
            var dolphin2Tween = game.add.tween(dolphin2).to({ x: 350 }, 10000, "Linear", true, );
            dolphin2Tween.onComplete.add(function() {
                dolphin2.visible = false;
                game.time.events.remove(dolphin2AnimTime);
                setTimeout(() => {
                    ref.DolphinTween();
                }, 1000);
            });
        }, 12000);
    },

    WriteBttnDown: function() {
        console.log("WriteBttnDown");
        var xPos;
        if (nameTextFieldInput.value.length == 2) {
            xPos = 640 - 45;
        } else {
            xPos = 595 - ((nameTextFieldInput.value.length - 2) * 18);
        }
        printingText.x = xPos;
        if (nameTextFieldInput.value != "") {
            game.world.bringToTop(printingText);
            printingText.visible = true;
            this.displayLetterByLetterText(printingText, nameTextFieldInput.value, function() {});
        }
    },
    WriteBttnUp: function() {
        console.log("WriteBttnUp");
        if (nameTextFieldInput.value != "") {
            nameTextFieldInput.value = "";
            eraseButton.inputEnabled = true;
            eraseButton.input.useHandCursor = true;
            writeButton.inputEnabled = false;
            writeButton.tint = "0xffffff";
        }
    },
    WriteBttnOver: function() {
        writeButton.tint = "0x66ffff";
    },
    WriteBttnOut: function() {
        writeButton.tint = "0xffffff";
    },
    EraseBttnDown: function() {
        this.WaterTween();
    },
    EraseBttnUp: function() {},
    EraseBttnOver: function() {
        eraseButton.tint = "0x66ffff";
    },
    EraseBttnOut: function() {
        eraseButton.tint = "0xffffff";
    },

    displayNextLetter: function() {
        this.textObject.text = this.message.substr(0, this.counter);
        this.counter += 1;
    },
    displayLetterByLetterText: function(textObject, message, onCompleteCallback) {
        var timerEvent = game.time.events.repeat(250, message.length, this.displayNextLetter, { textObject: textObject, message: message, counter: 1 });
        timerEvent.timer.onComplete.addOnce(onCompleteCallback, this);
    },

}