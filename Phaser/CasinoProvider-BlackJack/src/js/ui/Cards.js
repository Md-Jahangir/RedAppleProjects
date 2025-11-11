import { Constant } from "../Constant";
import { SoundManager } from "../SoundManager";
class Cards {
    constructor(scene) {
        this.scene = scene;

        this.cardContainer = null;
        this.cardPointsArea = null;
        this.playerCardArray = [];
        this.dealerCardArray = [];
        this.counter = null;
        this.tweenCards = null;
        this.create();
    }
    create() {
        this.CreatePlayerCardContainer();
        this.CreateDealerCardContainer();
        this.CreateCloseDeckContainer();
        this.CreateOpenAndCloseDeck();
        this.CardPointsArea();
    }
    CreatePlayerCardContainer() {
        this.playerCardContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.playerCardContainer.setVisible(false);
    }
    CreateDealerCardContainer() {
        this.dealerCardContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.dealerCardContainer.setVisible(false);
    }
    CreateCloseDeckContainer() {
        this.closeDeckContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
    }

    CreateOpenAndCloseDeck() {
        this.openCloseDeckContainer = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        this.openDeckBase = this.scene.add.image(700, -210, 'open_deck').setScale(1).setOrigin(0.5);
        this.closeDeckBase = this.scene.add.image(-700, -215, 'close_deck').setScale(1).setOrigin(0.5);
        this.openCloseDeckContainer.add([this.openDeckBase, this.closeDeckBase]);
    }

    CardPointsArea() {
        this.cardBaseArea = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);

        let dealerCardBase = this.scene.add.image(-50, -300, 'card_base').setScale(0.8).setOrigin(0.5);
        dealerCardBase.setData({ key: 'dealer' });
        let playerCardBase = this.scene.add.image(-50, 0, 'card_base').setScale(0.8).setOrigin(0.5);
        playerCardBase.setData({ key: 'player' });
        this.cardBaseArea.add([dealerCardBase, playerCardBase]);
        this.cardBaseArea.setVisible(false);


        let fontStyle = { fontFamily: 'LuckiestGuy-Regular', fontSize: '60px', fill: '#fff', fontStyle: "normal", align: 'center' };
        this.cardPointsArea = this.scene.add.container(Constant.game.config.width / 2, Constant.game.config.height / 2).setScale(Constant.scaleFactor, Constant.scaleFactor);
        let cardPoint1 = this.scene.add.image(300, -300, 'cardvalue_base').setScale(1).setOrigin(0.5);
        cardPoint1.setData({ key: 'dealer' });
        let text1 = this.scene.add.text(cardPoint1.x + 15, cardPoint1.y - 25, '', fontStyle).setOrigin(0.5);
        let cardPoint2 = this.scene.add.image(300, -10, 'cardvalue_base').setScale(1).setOrigin(0.5);
        cardPoint2.setData({ key: 'player' });
        let text2 = this.scene.add.text(cardPoint2.x + 15, cardPoint2.y - 25, '', fontStyle).setOrigin(0.5);
        this.cardPointsArea.add([cardPoint1, text1, cardPoint2, text2]);
        this.cardPointsArea.setVisible(false);

    }
    ShowCardsAndPoints() {
        // this.cardContainer.setVisible(true);
        this.cardBaseArea.setVisible(false);
        this.cardPointsArea.setVisible(true);
    }
    SetHandValueText(handValue, _cardInitiator) {
        let cardInitiator = _cardInitiator;
        if (cardInitiator != 'playerCard') {
            this.cardPointsArea.list[1].setText(handValue);
        } else {
            this.cardPointsArea.list[3].setText(handValue);
        }
    }
    CreateCards(_cardObject, _cardInitiator, _timeOut) {
        if (_cardInitiator == 'playerCard') {
            let card = this.scene.add.sprite(650, -210, 'card_spritesheet', 52).setScale(0.7);
            card.setData({ cardNumber: _cardObject.card });
            card.setAngle(-65);
            this.playerCardContainer.add([card]);
            this.playerCardContainer.setVisible(true);
            this.playerCardContainer.setDepth(1);
            setTimeout(() => {
                this.TweenCardsOfDealerAndPlayer(card, _cardObject, _cardInitiator)
            }, _timeOut);
        }
        else {
            let card = this.scene.add.sprite(650, -210, 'card_spritesheet', 52).setScale(0.7);
            card.setData({ cardNumber: _cardObject.card });
            card.setAngle(-65);
            this.dealerCardContainer.add([card]);
            this.dealerCardContainer.setVisible(true);
            this.dealerCardContainer.setDepth(1);
            setTimeout(() => {
                this.TweenCardsOfDealerAndPlayer(card, _cardObject, _cardInitiator)
            }, _timeOut);
        }
    }
    TweenCardsOfDealerAndPlayer(card, _cardObject, _cardInitiator) {
        if (_cardInitiator != 'playerCard') {
            this.dealerCardArray.push(card);
        } else {
            this.playerCardArray.push(card);
        }
        this.TweenCard(card, _cardObject.card, _cardInitiator);
    }
    TweenCard(_element, _card, _cardInitiator, _timeOut) {
        this.counter += 3;
        let cardIndex = null;
        let xPos = [], yPos;
        if (_cardInitiator == 'playerCard') {
            cardIndex = this.playerCardArray.length;
            if (this.cardBaseArea.list[1] != undefined) {
                yPos = this.cardBaseArea.list[1].y;
                if (this.playerCardArray.length == 1) {
                    xPos.push(this.cardBaseArea.list[1].x);
                } else if (this.playerCardArray.length == 2) {
                    xPos.push(this.cardBaseArea.list[1].x, this.cardBaseArea.list[1].x + 100);
                }
                else if (this.playerCardArray.length == 3) {
                    xPos.push(this.cardBaseArea.list[1].x - 50, this.cardBaseArea.list[1].x + 50, this.cardBaseArea.list[1].x + 150);
                }
                else if (this.playerCardArray.length == 4) {
                    xPos.push(this.cardBaseArea.list[1].x - 80, this.cardBaseArea.list[1].x, this.cardBaseArea.list[1].x + 80, this.cardBaseArea.list[1].x + 160);
                }
                else if (this.playerCardArray.length == 5) {
                    xPos.push(this.cardBaseArea.list[1].x - 145, this.cardBaseArea.list[1].x - 60, this.cardBaseArea.list[1].x + 15, this.cardBaseArea.list[1].x + 90, this.cardBaseArea.list[1].x + 175);
                }
                else if (this.playerCardArray.length == 6) {
                    xPos.push(this.cardBaseArea.list[1].x - 165, this.cardBaseArea.list[1].x - 80, this.cardBaseArea.list[1].x, this.cardBaseArea.list[1].x + 80, this.cardBaseArea.list[1].x + 165, this.cardBaseArea.list[1].x + 245);
                }
                else if (this.playerCardArray.length == 7) {
                    xPos.push(this.cardBaseArea.list[1].x - 245, this.cardBaseArea.list[1].x - 165, this.cardBaseArea.list[1].x - 80, this.cardBaseArea.list[1].x, this.cardBaseArea.list[1].x + 80, this.cardBaseArea.list[1].x + 165, this.cardBaseArea.list[1].x + 245);
                }
            }
        } else {
            cardIndex = this.dealerCardArray.length;
            if (this.cardBaseArea.list[0] != undefined) {
                yPos = this.cardBaseArea.list[0].y;
                if (this.dealerCardArray.length == 1) {
                    xPos.push(this.cardBaseArea.list[0].x);
                } else if (this.dealerCardArray.length == 2) {
                    xPos.push(this.cardBaseArea.list[0].x, this.cardBaseArea.list[0].x + 100);
                }
                else if (this.dealerCardArray.length == 3) {
                    xPos.push(this.cardBaseArea.list[0].x - 50, this.cardBaseArea.list[0].x + 50, this.cardBaseArea.list[0].x + 150);
                }
                else if (this.dealerCardArray.length == 4) {
                    xPos.push(this.cardBaseArea.list[0].x - 80, this.cardBaseArea.list[1].x - 0, this.cardBaseArea.list[0].x + 80, this.cardBaseArea.list[0].x + 160);
                }
                else if (this.dealerCardArray.length == 5) {
                    xPos.push(this.cardBaseArea.list[0].x - 145, this.cardBaseArea.list[0].x - 60, this.cardBaseArea.list[0].x + 15, this.cardBaseArea.list[0].x + 90, this.cardBaseArea.list[0].x + 175);
                }
                else if (this.playerCardArray.length == 6) {
                    xPos.push(this.cardBaseArea.list[0].x - 165, this.cardBaseArea.list[0].x - 80, this.cardBaseArea.list[0].x, this.cardBaseArea.list[0].x + 80, this.cardBaseArea.list[0].x + 165, this.cardBaseArea.list[0].x + 245);
                }
                else if (this.playerCardArray.length == 7) {
                    xPos.push(this.cardBaseArea.list[0].x - 245, this.cardBaseArea.list[0].x - 165, this.cardBaseArea.list[0].x - 80, this.cardBaseArea.list[0].x, this.cardBaseArea.list[0].x + 80, this.cardBaseArea.list[0].x + 165, this.cardBaseArea.list[0].x + 245);
                }
            }
        }


        SoundManager.PlayCardSound(this.scene);
        this.tweenCards = null;
        this.tweenCards = this.scene.tweens.add({
            targets: _element,
            ease: 'Quad.easeInOut',
            yoyo: false,
            repeat: 0,
            duration: 200,
            scaleX: { value: 0, duration: 200, ease: 'Linear' },
            scaleY: 0.7,
            x: xPos[cardIndex - 1],
            y: yPos,
            angle: 0,
            onComplete: () => {
                this.scene.tweens.add({
                    targets: _element,
                    ease: 'Quad.easeInOut',
                    yoyo: false,
                    repeat: 0,
                    duration: 250,
                    flipX: true,
                    scaleX: { value: 0.9, duration: 200, ease: 'Linear' },
                    scaleY: 0.9,
                    x: xPos[cardIndex - 1],
                    y: yPos,
                    angle: 0,
                    onComplete: () => {
                        this.SetCardFrames(_element, _card, _cardInitiator, cardIndex);
                    }
                })
            }

        }, this)
        if (_cardInitiator == 'playerCard') {
            for (let i = 0; i < cardIndex - 1; i++) {
                this.playerCardContainer.list[i].x = xPos[i];
            }
        } else {
            for (let i = 0; i < cardIndex - 1; i++) {
                this.dealerCardContainer.list[i].x = xPos[i];
            }
        }

    }
    SetCardFrames(_element, _card, _cardInitiator, _cardIndex) {
        let element = _element;
        let card = _card;
        let cardInitiator = _cardInitiator;
        let cardIndex = _cardIndex;

        if (cardInitiator != 'playerCard') {
            if (cardIndex != 2) {
                element.setFrame(card);
            } else {
            }
        } else {
            element.setFrame(card);
        }
    }
    SetBackCardFrameOfDealer(_element, _card, _cardInitiator) {
        try {
            this.dealerCardArray[1].setFrame(this.dealerCardContainer.list[1].data.list.cardNumber);

        } catch (error) {
            console.log(' error found in frames', error);


        }

    }
    TweenDealerCard() {

    }
    DestroyCards(signalType) {
        for (let i = this.dealerCardArray.length - 1; i >= 0; i--) {
            this.dealerCardContainer.list[i].setFrame(52);
            let tween = this.scene.tweens.add({
                targets: this.dealerCardArray[i],
                ease: 'Quad.easeInOut',
                yoyo: false,
                repeat: 0,
                duration: 300,
                scaleX: 0.7,
                scaleY: 0.7,
                x: this.closeDeckBase.x + 55,
                y: this.closeDeckBase.y + 75,
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
            let tween = this.scene.tweens.add({
                targets: this.playerCardArray[i],
                ease: 'linear',
                yoyo: false,
                repeat: 0,
                duration: 300,
                x: this.closeDeckBase.x + 75,
                y: this.closeDeckBase.y + 75,
                onComplete: () => {
                    this.CreateStackForCloseDeck(i);
                    this.playerCardContainer.remove(this.playerCardArray[i]);
                    if (i == 0) {
                        this.playerCardArray = [];
                        if (signalType == 'rebet_signal') {
                            Constant.game.events.emit('evtRoundEnd');
                        }

                    }
                }
            })
        }
    }
    CreateStackForCloseDeck(index) {
        let card = this.scene.add.image(this.closeDeckBase.x + 55, this.closeDeckBase.y + 60, 'close_deck_card');
        this.closeDeckContainer.add(card);
    }
}
export default Cards;