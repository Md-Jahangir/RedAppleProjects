import { Constant } from "../Constant";
import { SoundManager } from "../SoundManager";
class Cards {
    constructor(scene) {
        this.scene = scene;
        this.playerCardContainer = null;
        this.dealerCardContainer = null;
        this.closeDeckContainer = null;
        this.cardContainer = null;
        this.cardPointsArea = null;
        this.playerCardArray = [];
        this.dealerCardArray = [];
        this.counter = null;
        this.create();
    }
    create() {
        this.CreatePlayerCardContainer();
        this.CreateDealerCardContainer();
        this.CreateCloseDeckContainer();
        this.CardPointsArea();
    }
    CreatePlayerCardContainer() {
        this.playerCardContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor);
        this.playerCardContainer.setVisible(false);
    }
    CreateDealerCardContainer() {
        this.dealerCardContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor);
        this.dealerCardContainer.setVisible(false);
    }
    CreateCloseDeckContainer() {
        this.closeDeckContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
    }

    CardPointsArea() {
        this.cardBaseArea = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let openDeckBase = this.scene.add.image(700, -235, 'open_deck').setScale(1).setOrigin(0.5);
        let closeDeckBase = this.scene.add.image(-700, -225, 'close_deck').setScale(1).setOrigin(0.5);
        let bankerCardBase = this.scene.add.image(350, 0, 'card_base').setScale(1).setOrigin(0.5).setVisible(false);
        bankerCardBase.setData({ key: 'banker' });
        let playerCardBase = this.scene.add.image(-500, 0, 'card_base').setScale(1).setOrigin(0.5).setVisible(false);
        playerCardBase.setData({ key: 'player' });
        this.cardBaseArea.add([bankerCardBase, playerCardBase, openDeckBase, closeDeckBase]);
        // this.cardBaseArea.setVisible(true);


        let fontStyle = { fontFamily: 'Roboto-Black', fontSize: '60px', fill: '#fff', fontStyle: "normal", align: 'center' };
        this.cardPointsArea = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let cardPoint1 = this.scene.add.image(300, -150, 'cardvalue_base').setScale(1).setOrigin(0.5);
        cardPoint1.setData({ key: 'banker' });
        let text1 = this.scene.add.text(cardPoint1.x, cardPoint1.y, '', fontStyle).setOrigin(0.5);
        let cardPoint2 = this.scene.add.image(-295, -150, 'cardvalue_base').setScale(1).setOrigin(0.5);
        cardPoint2.setData({ key: 'player' });
        let text2 = this.scene.add.text(cardPoint2.x, cardPoint2.y, '', fontStyle).setOrigin(0.5);
        this.cardPointsArea.add([cardPoint1, text1, cardPoint2, text2]);
        this.cardPointsArea.setVisible(false);

    }
    ShowCardsAndPoints() {
        this.cardBaseArea.setVisible(true);
        this.cardPointsArea.setVisible(true);
    }
    HideCardsAndPoints() {
        this.cardPointsArea.setVisible(false);
    }
    SetHandValueText(handValue, _cardInitiator) {
        let cardInitiator = _cardInitiator;
        if (cardInitiator != 'player') {
            this.cardPointsArea.list[1].setText(handValue);
        } else {
            this.cardPointsArea.list[3].setText(handValue);
        }
    }
    CreateCards(_card, _cardInitiator) {
        if (_cardInitiator == 'player') {
            let card = this.scene.add.sprite(650, -185, 'card_spritesheet', 52);
            card.setData({ cardNumber: _card });
            card.setAngle(-65);
            this.playerCardContainer.add([card]);
            this.playerCardContainer.setDepth(1);
            this.playerCardContainer.setVisible(true);
            this.TweenCardsOfDealerAndPlayer(card, _card, _cardInitiator)
        }
        else {
            let card = this.scene.add.sprite(650, -185, 'card_spritesheet', 52).setDepth(1)
            card.setData({ cardNumber: _card });
            card.setAngle(-65);
            this.dealerCardContainer.add([card]);
            this.dealerCardContainer.setDepth(1);
            this.dealerCardContainer.setVisible(true);
            this.TweenCardsOfDealerAndPlayer(card, _card, _cardInitiator)
        }
    }
    TweenCardsOfDealerAndPlayer(card, _card, _cardInitiator) {
        if (_cardInitiator != 'player') {
            this.dealerCardArray.push(card);
        } else {
            this.playerCardArray.push(card);
        }
        this.TweenCard(card, _card, _cardInitiator);
    }
    TweenCard(_element, _card, _cardInitiator) {
        let cardIndex = null;
        let xPos = [], yPos;
        if (_cardInitiator == 'player') {
            cardIndex = this.playerCardArray.length;
            yPos = this.cardBaseArea.list[1].y;
            if (this.playerCardArray.length == 1) {
                xPos.push(this.cardBaseArea.list[1].x - 30);
            } else if (this.playerCardArray.length == 2) {
                xPos.push(this.cardBaseArea.list[1].x - 30, this.cardBaseArea.list[1].x + 40);
            }
            else if (this.playerCardArray.length == 3) {
                xPos.push(this.cardBaseArea.list[1].x - 95, this.cardBaseArea.list[1].x - 20, this.cardBaseArea.list[1].x + 110);
            }
        } else {
            cardIndex = this.dealerCardArray.length;

            yPos = this.cardBaseArea.list[0].y;
            if (this.dealerCardArray.length == 1) {
                xPos.push(this.cardBaseArea.list[0].x + 30);
            } else if (this.dealerCardArray.length == 2) {
                xPos.push(this.cardBaseArea.list[0].x, this.cardBaseArea.list[0].x + 100);
            }
            else if (this.dealerCardArray.length == 3) {
                xPos.push(this.cardBaseArea.list[0].x - 50, this.cardBaseArea.list[0].x + 0, this.cardBaseArea.list[0].x + 180);
            }
        }
        SoundManager.PlayCardSound();
        let tween = null;
        let flipTween = null;
       
        tween = this.scene.tweens.add({
            targets: _element,
            ease: 'Sine.easeInOut', // You can change the ease function to get different effects
            yoyo: false,
            repeat: 0,
            duration: 150, // Adjust the duration as needed for your desired speed
            delay: 150,
            angle: 0, // Rotate the card 360 degrees during the tween
            x: xPos[cardIndex - 1],
            y: yPos,
            onComplete: () => {
                this.SetCardFrames(_element, _card, _cardInitiator, cardIndex);
            }
        }, this)
    }

    SetCardFrames(_element, _card, _cardInitiator, _cardIndex) {
        let element = _element;
        let card = _card;
        let cardInitiator = _cardInitiator;
        let cardIndex = _cardIndex;

        if (cardInitiator != 'player') {
            element.setFrame(card);
        } else {
            element.setFrame(card);
        }
    }
    SetHandValue(_cardPoints, _cardInitiator) {
        if (_cardInitiator == 'player') {
            this.cardPointsArea.list[3].setText(_cardPoints);
        } else {
            this.cardPointsArea.list[1].setText(_cardPoints);
        }
    }
    SetBackCardFrameOfDealer(_element, _card, _cardInitiator) {

        this.dealerCardArray[1].setFrame(this.dealerCardContainer.list[1].data.list.cardNumber);

    }
    TweenDealerCard() {

    }
    MoveCardsToCloseDeck() {
        for (let i = this.dealerCardArray.length - 1; i >= 0; i--) {
            this.dealerCardContainer.list[i].setFrame(52);
            this.dealerCardContainer.list[i].setRotation(45)
            let tween = this.scene.tweens.add({
                targets: this.dealerCardArray[i],
                ease: 'Quad.easeInOut',
                yoyo: false,
                repeat: 0,
                duration: 150,
                x: this.cardBaseArea.list[3].x + 75,
                y: this.cardBaseArea.list[3].y + 75,
                onComplete: () => {
                    this.CreateStackForCloseDeck(i);
                    this.dealerCardContainer.remove(this.dealerCardArray[i]);
                    if (i == 0) {
                        this.dealerCardArray = [];

                    }
                }
            })
        }
        for (let i = this.playerCardArray.length - 1; i >= 0; i--) {
            this.playerCardContainer.list[i].setFrame(52);
            this.playerCardContainer.list[i].setRotation(45)
            let tween = this.scene.tweens.add({
                targets: this.playerCardArray[i],
                ease: 'Quad.easeInOut',
                yoyo: false,
                repeat: 0,
                duration: 150,
                x: this.cardBaseArea.list[3].x + 75,
                y: this.cardBaseArea.list[3].y + 75,
                onComplete: () => {
                    this.CreateStackForCloseDeck(i);
                    this.playerCardContainer.remove(this.playerCardArray[i]);
                    if (i == 0) {
                        this.playerCardArray = [];
                        // Constant.game.events.emit('evtRoundEnd');
                    }
                }
            })
        }
    }
    CreateStackForCloseDeck(index) {
        let card = this.scene.add.image(this.cardBaseArea.list[3].x + 55, this.cardBaseArea.list[3].y + 60, 'close_deck_card');
        this.closeDeckContainer.add(card);
    }
}
export default Cards;