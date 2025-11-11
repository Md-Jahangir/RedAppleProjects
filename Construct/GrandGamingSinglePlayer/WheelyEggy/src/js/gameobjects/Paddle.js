import { Constant } from "../Constant";

export default class Paddle {
    constructor(scene, car) {
        this.scene = scene;
        this.car = car;
        this.isMovable = true;
        this.LeftPaddle();
        this.RightPaddle();
        this.ButtonsControl();
        this.Events();
    }
    LeftPaddle() {
        this.leftPaddle = this.scene.add.image(0, 0, "paddle_idle_left")
            .setScrollFactor(0)
            .setInteractive()
            .on("pointerdown", () => {
                this.LeftPaddleOnDown();
            })
            .on("pointerup", () => {
                this.LeftPaddleOnUp();
            })
            .on("pointerout", () => {
                this.LeftPaddleOnUp();
            })
    }
    RightPaddle() {
        this.rightPaddle = this.scene.add.image(0, 0, "paddle_idle_right")
            .setScrollFactor(0)
            .setInteractive()
            .on("pointerdown", () => {
                this.RightPaddleOnDown();
            })
            .on("pointerup", () => {
                this.RightPaddleOnUp();
            })
            .on("pointerout", () => {
                this.RightPaddleOnUp();
            })
    }
    ButtonsControl() {
        this.KeyA = this.scene.input.keyboard.addKey("A");
        this.KeyD = this.scene.input.keyboard.addKey("D");
        this.KeyA.on('down', () => {
            if (!Constant.isPaused && !Constant.isGameOver) this.LeftPaddleOnDown();
        })
            .on("up", () => {
                if (!Constant.isPaused && !Constant.isGameOver) this.LeftPaddleOnUp();
            })
        this.KeyD.on("down", () => {
            if (!Constant.isPaused && !Constant.isGameOver) this.RightPaddleOnDown();
        })
            .on("up", () => {
                if (!Constant.isPaused && !Constant.isGameOver) this.RightPaddleOnUp();
            })
    }
    HidePaddles() {
        this.leftPaddle.setVisible(false);
        this.rightPaddle.setVisible(false);
        this.car.paddle.left = false;
        this.car.paddle.right = false;
    }
    RightPaddleOnDown() {
        this.car.paddle.right = true;
        this.rightPaddle.setTexture("paddle_pressed_right");

    }
    RightPaddleOnUp() {
        this.car.paddle.right = false;
        this.rightPaddle.setTexture("paddle_idle_right");
    }
    LeftPaddleOnDown() {
        this.car.paddle.left = true;
        this.leftPaddle.setTexture("paddle_pressed_left");
    }
    LeftPaddleOnUp() {
        this.car.paddle.left = false;
        this.leftPaddle.setTexture("paddle_idle_left");
    }
    Events() {
        this.scene.events.once("EggDestroy", () => {
            this.HidePaddles();

        });
    }
    Resize(newWidth, newHeight, newScale) {
        this.leftPaddle.setScale(newScale)
            .setPosition(500 * newScale, newHeight - 100 * newScale);
        this.rightPaddle.setScale(newScale)
            .setPosition(newWidth - 500 * newScale, newHeight - 100 * newScale);
    }
}