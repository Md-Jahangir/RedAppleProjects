
class Card {
    constructor(scene) {
        this.scene = scene;
        this.cardType = null;
        this.cardNumber = null;
        this.cardContainer = null;
    };

    Create() {
        this.cardContainer = this.scene.add.container(0, 0);
    }

    CreateCardForDistribution() {
        for (let i = 0; i < 12; i++) {
            let card = this.add.image(0, 0, "user_card_back");
            this.cardAnimArray.push(card);
        }
    };
    ResizeCardForDistribution(newWidth, newHeight, newScale) {
        for (let i = 0; i < this.cardAnimArray.length; i++) {
            this.cardAnimArray[i].setScale(newScale);
            this.cardAnimArray[i].setPosition(newWidth / 2, newHeight / 2 - this.cardAnimArray[0].height * newScale);
        }
    };

    resize(newWidth, newHeight, newScale) {

    };

}

export default Card;