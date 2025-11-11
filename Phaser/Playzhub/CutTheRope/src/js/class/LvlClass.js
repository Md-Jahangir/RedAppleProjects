import { Constant } from "../Constant";
// import { SoundManager } from "../SoundManager";
import Button from "./Button";
// import { Server } from "../Services/Server";

let gameOptions = {
    colors: ["0x87CEEB"],
    // colors: ["0x87CEEB", "0xFFFFFF", "0xFFFFFF"],
    columns: 5,
    rows: 4,
    thumbWidth: 150,
    thumbHeight: 150,
    spacing: 20,
    localStorageName: "levelselect"
}

export default class LvlClass {
    constructor(scene) {
        this.scene = scene;
        this.lvlContainer = null;
        this.resizeCounter = 0;
        this.stars = null;
        this.create();
    }
    create() {
        this.scrollingMap = this.scene.add.tileSprite(0, 0, gameOptions.colors.length * (1080), (Constant.clientHeight), "transp");
        this.lvlContainer = this.scene.add.container(Constant.clientWidth / 2, Constant.clientHeight / 2).setVisible(false);
        this.lvlChapter = this.scene.add.image(0, -500, 'lvl_chapter');
        this.resizeCounter = 0;
        // this.stars = [];
        this.itemGroup = this.scene.add.group();
        this.canMove = true;
        // this.stars[0] = 0;
        // for (var l = 1; l < gameOptions.columns * gameOptions.rows * gameOptions.colors.length; l++) {
        //     this.stars[l] = -1;
        // }
        // this.savedData = localStorage.getItem(gameOptions.localStorageName) == null ? this.stars.toString() : localStorage.getItem(gameOptions.localStorageName);
        // // console.log('this.savedData', this.savedData);

        // this.stars = this.savedData.split(",");
        // console.log("lvlclass Star Data", Constant.starsData);

        this.stars = Constant.starsData;
        this.starCount = this.CountStarsFromLocalStorage(this.stars);
        this.starCountText = this.scene.add.text(0, 550, this.starCount + " / " + (gameOptions.columns * gameOptions.rows * 3), {
            fontFamily: "Poppins-Bold", fontSize: 70
        }).setOrigin(0.5);
        this.pageText = this.scene.add.text(0, -750, "Swipe to select level page (1 / " + gameOptions.colors.length + ")", {
            fontFamily: "Poppins-Bold", fontSize: 50
        })
        this.pageText.setOrigin(0.5).setVisible(false);
        this.scrollingMap.setInteractive().setVisible(false);
        this.scene.input.setDraggable(this.scrollingMap);
        this.scrollingMap.setOrigin(0, 0);
        this.currentPage = 0;
        this.pageSelectors = [];
        let leftMargin = -350;
        let topMargin = -200;
        let widthGap = 0;
        for (let k = 0; k < gameOptions.colors.length; k++) {
            for (let i = 0; i < gameOptions.columns; i++) {
                for (let j = 0; j < gameOptions.rows; j++) {
                    const levelNumber = k * (gameOptions.rows * gameOptions.columns) + j * gameOptions.columns + i;
                    if (levelNumber >= 50) {
                        continue;
                    }
                    let thumbBase = this.scene.add.image(k * 1080 + leftMargin + i * (gameOptions.thumbWidth + gameOptions.spacing), topMargin + j * (gameOptions.thumbHeight + gameOptions.spacing), "lvl_box");
                    let thumb = this.scene.add.image((k * 1080 + leftMargin + i * (gameOptions.thumbWidth + gameOptions.spacing)) + 20, (topMargin + j * (gameOptions.thumbHeight + gameOptions.spacing)) + 10, "levelthumb").setScale(2);
                    thumb.levelNumber = levelNumber;
                    thumb.setFrame(parseInt(this.stars[thumb.levelNumber]) + 1);
                    // console.log('star', parseInt(this.stars[thumb.levelNumber]) + 1, 'levelnumber', thumb.levelNumber);

                    if (parseInt(this.stars[thumb.levelNumber]) === -1) {
                        thumbBase.setTexture('lvl_box_locked');
                    }
                    this.itemGroup.add(thumbBase);
                    this.itemGroup.add(thumb);
                    let levelText = this.scene.add.text(thumb.x - 30, thumb.y - 20, thumb.levelNumber + 1, {
                        fontFamily: "Poppins-Bold", fontSize: 40
                    });
                    levelText.setOrigin(0.5);
                    this.itemGroup.add(levelText);
                    this.lvlContainer.add([thumbBase, thumb, levelText]);
                }
            }
            this.pageSelectors[k] = this.scene.add.sprite((0) + widthGap, 920, "levelpages").setVisible(false);
            widthGap += 40;
            this.lvlContainer.add(this.pageSelectors[k]);
            this.pageSelectors[k].setInteractive();
            this.pageSelectors[k].on("pointerdown", function () {
                if (this.scene.canMove) {
                    var difference = this.pageIndex - this.scene.currentPage;
                    this.scene.changePage(difference);
                    this.scene.canMove = false;
                }
            });
            this.pageSelectors[k].pageIndex = k;
            this.pageSelectors[k].tint = gameOptions.colors[k];
            if (k == this.currentPage) {
                this.pageSelectors[k].scaleY = 1;
            }
            else {
                this.pageSelectors[k].scaleY = 0.5;
            }
        }
        this.scene.input.on("dragstart", function (pointer, gameObject) {
            gameObject.startPosition = gameObject.x;
            gameObject.currentPosition = gameObject.x;
        });
        this.scene.input.on("drag", function (pointer, gameObject, dragX, dragY) {
            if (dragX <= 10 && dragX >= -gameObject.width + 1080 - 10) {
                gameObject.x = dragX;
                var delta = gameObject.x - gameObject.currentPosition;
                gameObject.currentPosition = dragX;
                this.itemGroup.children.iterate(function (item) {
                    item.x += delta;
                });
            }
        }, this);
        this.scene.input.on("dragend", function (pointer, gameObject) {
            this.canMove = false;
            var delta = gameObject.startPosition - gameObject.x;
            if (delta == 0) {
                this.canMove = true;
                this.itemGroup.children.iterate(function (item) {
                    if (item.texture.key == "levelthumb") {
                        var boundingBox = item.getBounds();
                        if (Phaser.Geom.Rectangle.Contains(boundingBox, (pointer.x - ((window.innerWidth / 2) - (Constant.clientWidth / 2))), pointer.y) && item.frame.name > 0) {
                            this.scene.cameras.main.fadeOut(500);
                            this.scene.input.off("dragend");
                            setTimeout(() => {
                                const data = {
                                    level: item.levelNumber,
                                    stars: this.stars,
                                    gameOption: Constant.gameOptions
                                }
                                console.log('ChangeScene');
                                // this.scene.ChangeScene(data);
                                this.scene.game.events.emit("change_scene", data);
                            }, 500);
                        }
                    }
                }, this);
            }
            if (delta > 1080 / 8) {
                this.changePage(1);
            }
            else {
                if (delta < -1080 / 8) {
                    this.changePage(-1);
                }
                else {
                    this.changePage(0);
                }
            }
        }, this);
        this.lvlContainer.add([this.pageText, this.starCountText, this.lvlChapter]);
        this.backButton = new Button(this.scene, "backBut", 1);
        this.backButton.button.setVisible(false);
        this.backButton.setClickcallback(this.backButtonFunc, this, null,);
    }
    backButtonFunc() {
        this.scene.cameras.main.fadeOut(500);
        this.backButton.TouchDisable();
        this.VisibleControl(false);
        setTimeout(() => {
            this.scene.lvlBut.TouchEnable();
            this.scene.lvlBut.button.setVisible(true);
        }, 500);
    }
    changePage(page) {
        this.currentPage += page;
        for (var k = 0; k < gameOptions.colors.length; k++) {
            if (k == this.currentPage) {
                this.pageSelectors[k].scaleY = 1;
            }
            else {
                this.pageSelectors[k].scaleY = 0.5;
            }
        }
        this.pageText.text = "Swipe to select level page (" + (this.currentPage + 1).toString() + " / " + gameOptions.colors.length + ")";
        var currentPosition = this.scrollingMap.x;
        this.scene.tweens.add({
            targets: this.scrollingMap,
            x: this.currentPage * -1080,
            duration: 300,
            ease: "Cubic.easeOut",
            callbackScope: this,
            onUpdate: function (tween, target) {
                var delta = target.x - currentPosition;
                currentPosition = target.x;
                this.itemGroup.children.iterate(function (item) {
                    item.x += delta;
                });
            },
            onComplete: function () {
                this.canMove = true;
            }
        });
    }
    VisibleControl(isTrue) {
        if (isTrue) {
            this.TransitionControl(isTrue);
        }
        else {
            setTimeout(() => {
                this.scene.bg.setTexture('preload_bg');
                this.TransitionControl(isTrue);
            }, 500);
        }
    }
    TransitionControl(isTrue) {
        this.scene.cameras.main.fadeIn(500);
        this.scene.logo.setVisible(!isTrue);
        this.lvlContainer.setVisible(isTrue);
        this.scrollingMap.setVisible(isTrue);
        this.backButton.button.setVisible(isTrue);
    }
    CountStarsFromLocalStorage(_arr) {
        _arr = _arr.map(Number).filter(value => value !== -1);
        return _arr.reduce((sum, value) => sum + value, 0);
    }
    Resize(newWidth, newHeight, newScale) {
        this.lvlContainer.setScale(newScale);
        this.lvlContainer.setPosition(newWidth / 2, newHeight / 2);
        this.backButton.SetScale(newScale);
        this.backButton.button.setPosition(50 * newScale, 50 * newScale);
        if (this.resizeCounter > 0) {
            this.scrollingMap.setScale(gameOptions.colors.length * (1080 / this.scrollingMap.width), newHeight / this.scrollingMap.height);
        }
        this.resizeCounter++;
    }
}