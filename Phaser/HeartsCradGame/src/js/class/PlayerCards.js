export default class PlayerCards {
    constructor(scene, refX, refY, gameData) {
        this.scene = scene;
        this.userCards = [];
        this.passingCardsArray = [];
        this.isThreeCardPass = null;
        this.refX = refX;
        this.refY = refY;
        this.gameData = gameData
        this.create();
    }
    create() {
    }
    SortCardsArray() {
        this.userCards.sort((a, b) => a.getData("card_value") - b.getData("card_value"));
    }
    CardSetInteractive() {
        this.userCards.forEach(element => {
            element.SetInteractive();
        });
    }
    CardRemoveInteractive() {
        this.userCards.forEach(element => {
            element.removeAllListeners();
        });
    }
    CardSetFrame() {
        this.userCards.forEach(element => {
            element.SetFrame(element.data.list.card_value);
        });
    }
    AdjustCard(offsetX, offsetY, stGap, avgGap, waveSpace, angle, index) {
        let xPos;
        let yPos;
        const startHeight = waveSpace;
        const numCards = this.userCards.length;
        let widthGap = stGap * numCards;
        let heightGap;
        for (let i = 0; i < numCards; i++) {
            const element = this.userCards[i];
            widthGap += avgGap;
            if (numCards === 1) {
                heightGap = startHeight;
            } else if (numCards === 2) {
                heightGap = startHeight;
            } else {
                const midPoint = (numCards - 1) / 2;
                const normalizedIndex = i - midPoint;
                const waveFactor = Math.abs(normalizedIndex) / midPoint;
                heightGap = startHeight * (1 - waveFactor);
            }
            if (index === 1 || index === 3) {
                xPos = this.refX + heightGap + offsetX;
                yPos = this.refY + widthGap + offsetY;
            }
            else {
                xPos = this.refX + widthGap + offsetX;
                yPos = this.refY + heightGap + offsetY;
            }
            let cardTween = this.scene.scene.tweens.add({
                targets: element,
                x: xPos,
                y: yPos,
                scale: 0.7,
                duration: 500,
                angle: angle,
                ease: "Linear",
                onComplete: () => {
                    cardTween.remove();
                }
            });
        }
    }
    OnOverOut() {
        this.userCards.forEach(element => {
            element.on("pointerover", () => {
                element.SetScale(1 / 1.2);
            });
            element.on("pointerout", () => {
                element.SetScale(1 / 1.42);
            });
        });
    }
    OnUp() {
        this.userCards.forEach(element => {

            element.on("pointerup", () => {

                element.data.list.isSelect = !element.data.list.isSelect;
                if (element.data.list.isSelect) {
                    element.y -= 20;
                    this.PassingCardAdd(element);
                }
                else {
                    element.y += 20;
                    this.PassingCardRemove(element);
                }
                if (this.passingCardsArray.length > 2) {
                    this.scene.scene.uiControl.PassButtonVisible(true);
                }
                else {
                    this.scene.scene.uiControl.PassButtonVisible(false);
                }
            });
        });
    }
    PassingCardAdd(_card) {
        if (this.passingCardsArray.length >= 3) {

            this.passingCardsArray[0].y += 20;
            let removecard = this.passingCardsArray.shift();
            removecard.data.list.isSelect = false;
            // console.log(removecard.data.list.isSelect);
            this.userCards.push(removecard);
            this.SortCardsArray();
            this.AddpassCard(_card);
        }
        else {
            this.AddpassCard(_card);
        }
    }
    AddpassCard(_card) {
        let index = this.userCards.findIndex(card => card.data.list.card_id === _card.data.list.card_id);
        this.passingCardsArray.push(this.userCards[index]);
        this.userCards.splice(index, 1);
        // console.log(this.passingCardsArray, this.userCards);
    }
    PassingCardRemove(_card) {
        let index = this.passingCardsArray.findIndex(passcards => passcards.data.list.card_id === _card.data.list.card_id);
        this.userCards.push(this.passingCardsArray[index]);
        this.passingCardsArray.splice(index, 1);
        this.SortCardsArray();
        // console.log(this.passingCardsArray);
    }
    TempOponentCardSelectforPass() {
        for (let index = 1; index < 4; index++) {
            let popCard = this.userCards.pop();
            this.passingCardsArray.push(popCard);
            this.isThreeCardPass = true;
            this.scene.scene.AllPlayerThreeCardPass();
        }
        // console.log(this.passingCardsArray, this.usercardsTextures);
    }
    DragControl() {
        let count = 0;
        this.scene.scene.input.on("drag", (pointer, gameObject, dragX, dragY) => {
            count++;
            if (dragY >= 100 && count == 1) {
                let index = this.userCards.findIndex(card => card.data.list.card_id === gameObject.data.list.card_id);
                gameObject.RemoveInteractive();
                this.userCards.splice(index, 1);
                this.scene.scene.tableInstance.tableCards.push(gameObject);
                let cardTween = this.scene.scene.tweens.add({
                    targets: gameObject,
                    // scale: 0.1,
                    props: {
                        x: {
                            value: this.gameData.cardonTableposition[0].x,
                        },
                        y: {
                            value: this.gameData.cardonTableposition[0].y,
                        },
                        scale: { value: 0.5 }
                    },
                    duration: 500,
                    angle: 0,
                    ease: "Linear",
                    onComplete: () => {
                        count = 0;
                        cardTween.remove();
                        this.scene.scene.tableInstance.tableCardsCount++;
                        this.scene.scene.events.emit('nextmove', 1, -270);
                        // this.scene.scene.botManager.CardShowOnTable(1);
                    }
                });
                this.AdjustCard(this.gameData.playerAdjustPos[0].offsetX, this.gameData.playerAdjustPos[0].offsetY, this.gameData.playerAdjustPos[0].stGap, this.gameData.playerAdjustPos[0].avgGap, this.gameData.playerAdjustPos[0].waveSpace, this.gameData.playerAdjustPos[0].angle, 0)
            }
        });
    }

}