import { Constant } from "./Constant.js";
class PowerUpFood {
    constructor(scene) {
        this.scene = scene;
        this.powerUpFoodY = -(Math.floor(Constant.game.config.height / 6.4));
    }
    CreatePowerUpFood() {
        let randomX = this.GetRandomNumver(Math.floor(Constant.game.config.width / 3), Math.floor(Constant.game.config.height / 2.74))
        this.powerUpFood = this.scene.physics.add.image(randomX, this.powerUpFoodY, "Bust_Power").setOrigin(0.5, 0).setScale(Constant.scaleFactorX, Constant.scaleFactorY);
        this.powerUpFood.body.allowGravity = false;
        this.powerUpFood.body.immovable = true;
        this.powerUpFood.setSize(Math.floor(Constant.game.config.width / 10.8), Math.floor(Constant.game.config.height / 19.2));
    }
    ResetSpecialFood(specialFood) {
        specialFood.enable = true;
        specialFood.active = true;
        specialFood.setVisible(true);
        specialFood.body.enable = true;
        this.scene.moveSpecialFoodBool = false;
    }
    MovePowerUpFood() {
        if (this.scene.moveSpecialFoodBool) {
            this.powerUpFood.y += this.scene.upOffest;
            if (this.powerUpFood.y > Constant.game.config.height) {
                let randomX = this.GetRandomNumver(Math.floor(Constant.game.config.width / 3), Math.floor(Constant.game.config.height / 2.74))
                this.powerUpFood.setPosition(randomX, this.powerUpFoodY);
                this.ResetSpecialFood(this.powerUpFood);
            }
        }
    }
    GetRandomNumver(_min, _max) {
        return Math.floor(Math.random() * (_max - _min) + _min);
    }
}
export default PowerUpFood;