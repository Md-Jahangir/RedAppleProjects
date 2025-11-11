import gsap from "gsap";
import { AudioManager } from "../media/AudioManager";

class Snake {
    constructor(scene, snakeData) {
        this.scene = scene;
        this.topPosArr = [];
        this.bottomPosArr = [];
        this.patterns = null;
        this.maxComboNum = null;
        this.maxTarget = null;
        this.minTarget = null;
        this.safeTarget = null;
        this.snkNum = null;
        this.objMinNum = null;
        this.j = 0;
        this.flag = false;

        this.lastFirstPosArr = [];
        this.rndF = null;
        this.rndS = null;
        this.pawn = null;

        this.GetSnakeData(snakeData);
    }

    GetSnakeData(data) {
        this.topPosArr = data.head;
        this.bottomPosArr = data.tail;
        this.maxComboNum = data.combos;
        this.patterns = data.pattern;
        this.maxTarget = data.maxTarget;
        this.minTarget = data.minTarget;
        this.safeTarget = data.safeTarget;
        this.snkNum = Phaser.Math.Between(data.num[0], data.num[1]);
        this.objMinNum = data.num[0];

        for (let i = 0; i < this.snkNum; i++) {
            this.lastFirstPosArr.push(null);
        }

        this.GetSnakeHead();
    }

    GetSnakeHead() {
        if (this.j >= this.snkNum) {
            this.ResetSnakePhase();
            this.scene.InstantiateLadder();
            return;
        }

        if (!this.flag) this.UpdateForwardPattern();
        if (this.flag && !this.SelectPatternFromKeys()) return;

        this.rndS = this.GetSubsequentOther();
        this.GetSnakePos();
    }

    ResetSnakePhase() {
        this.flag = null;
        this.j = null;
        this.rndF = null;
        this.rndS = null;
    }

    UpdateForwardPattern() {
        if (this.rndF === null) {
            this.rndF = this.j + 2;
        } else {
            this.rndF += (this.rndF % 2 !== 0)
                ? 2
                : (this.objNum <= 3 ? 3 : 1);
        }

        if (this.rndF > this.maxComboNum) this.flag = true;
    }

    SelectPatternFromKeys() {
        const keys = Object.keys(this.patterns).map(Number).filter(Number.isFinite);
        if (!keys.length) return false;
        this.rndF = keys[(Math.random() * keys.length) | 0];
        return true;
    }

    GetSubsequentOther() {
        const pattern = this.patterns[this.rndF];
        return pattern.length >= 2
            ? pattern[Phaser.Math.Between(0, 1)]
            : pattern[0];

    }

    GetSnakePos() {
        const firstArr = this.topPosArr[this.rndF];
        const secondArr = this.bottomPosArr[this.rndS];

        if (!firstArr?.length || !secondArr?.length) {
            this.FailAndRetry();
            return;
        }

        const shuffledFirst = this.GetShuffledArray(firstArr);
        const shuffledSecond = this.GetShuffledArray(secondArr);

        const lastPos = this.lastFirstPosArr[this.rndF];
        const rawTarget = this.snkNum > this.objMinNum ? this.safeTarget : this.maxTarget;
        const targetDiff = Phaser.Math.Clamp(Math.round(rawTarget), this.minTarget, this.safeTarget);
        const target1 = lastPos - targetDiff;
        const target2 = lastPos + targetDiff;

        let firstPos = shuffledFirst[0];
        if (lastPos !== null && lastPos !== undefined) {
            firstPos = shuffledFirst.reduce((best, num) => {
                const dist = Math.min(Math.abs(num - target1), Math.abs(num - target2));
                return !best || dist < best.dist ? { num, dist } : best;
            }, null)?.num;
        }

        if (firstPos === undefined) {
            this.FailAndRetry();
            return;
        }

        const secondPos = shuffledSecond[0];
        if (secondPos === undefined) {
            this.FailAndRetry();
            return;
        }

        this.firstPos = firstPos;
        this.secondPos = secondPos;
        this.RemoveUsedPos();
    }

    FailAndRetry() {
        this.j++;
        this.snkNum--;
        this.GetSnakeHead();
    }

    GetShuffledArray(arr) {
        return arr.slice().sort(() => 0.5 - Math.random());
    }

    RemoveUsedPos() {
        const { firstPos, secondPos } = this;

        // Remove firstPos from both top and bottom arrays
        this.removeValueFromNestedArrays(this.topPosArr, firstPos);
        this.removeValueFromNestedArrays(this.bottomPosArr, firstPos);

        // Remove secondPos from both arrays as well
        this.removeValueFromNestedArrays(this.topPosArr, secondPos);
        this.removeValueFromNestedArrays(this.bottomPosArr, secondPos);

        // Also remove adjacent values
        this.removeAdjacentFromNestedArrays(this.topPosArr, firstPos);
        this.removeAdjacentFromNestedArrays(this.bottomPosArr, secondPos);

        this.AddSnake();
    }

    removeValueFromNestedArrays(obj, val) {
        for (const key in obj) {
            const arr = obj[key];
            const i = arr.indexOf(val);
            if (i !== -1) {
                arr.splice(i, 1);
            }
        }
    }

    removeAdjacentFromNestedArrays(obj, val) {
        const neighbors = [val - 1, val + 1];
        for (const key in obj) {
            const arr = obj[key];
            neighbors.forEach(n => {
                const i = arr.indexOf(n);
                if (i !== -1) arr.splice(i, 1);
            });
        }
    }

    AddSnake() {
        const headTile = this.scene.gameContainer.getByName(this.firstPos);
        const tailTile = this.scene.gameContainer.getByName(this.secondPos);

        this.lastFirstPosArr[this.rndF] = this.firstPos;

        headTile.hasSnakeHead = true;
        headTile.setData({ tail: this.secondPos });

        tailTile.hasSnakeTail = true;

        this.CreateSnake(headTile, tailTile);
        this.scene.snakeContainer.add(this.snake);
        this.MakeNextSnake();
    }

    CreateSnake(head, tail) {
        const dx = head.x - tail.x;
        const dy = head.y - tail.y;
        const angleDeg = Phaser.Math.RadToDeg(Math.atan2(dy, dx));
        const angle = (angleDeg + 90 + 360) % 360;

        this.snake = this.scene.add.spine(0, 0, 'snake_data', 'snake_atlas')
            .setOrigin(0)
            .setAngle(angle);

        head.snakeObj = this.snake;

        const scaleY = Math.sqrt(dx * dx + dy * dy) / this.snake.height;
        const scaleFactorY = 3.3;
        const scaleX = Phaser.Math.Clamp(0.6 + (1 / (scaleY * scaleFactorY)), 0.9, 1);
        const dir = tail.x < head.x ? -1 : 1;

        this.snake.setScale(dir * scaleX, scaleY);

        const offsetX = dir === 1 ? 32 : -28;
        const offsetY = dir === 1 ? 28 : 15;

        this.snake.setPosition(head.x + offsetX, head.y + offsetY);
    }

    MakeNextSnake() {
        this.j++;
        this.firstPos = null;
        this.secondPos = null;
        delete this.patterns[String(this.rndF)];
        this.GetSnakeHead();
    }

    PlaySnakeAnimation() {
        this.getHeadTile?.snakeObj?.animationState.setAnimation(0, 'pawn_kil', false);
        this.OnSnakeAnimationComplete();
    }

    OnSnakeAnimationComplete() {
        this.getHeadTile?.snakeObj?.animationState.addListener({
            complete: (entry) => {
                this.BringPlayerBackAnimation();
            }
        });
    }

    SnakeEatsPawn(_block, _pawn) {
        AudioManager.PlaySnakeBiteAudio();
        // this.playerPawn.setVisible(false);
        const block = _block;
        this.pawn = _pawn;
        this.getHeadTile = block;
        let getSnakeTail = block.data.list.tail;
        this.getBlock = this.scene.gameContainer.getByName(getSnakeTail);
        // console.log("get snake tail", this.getBlock);

        this.scene.playerPawn.currBlockNum = getSnakeTail;
        this.SquishPlayerAnimation();

        // this.playerPawn.setVisible(true);
    }

    SquishPlayerAnimation() {
        this.squishPawnAnim = gsap.to(this.pawn, {
            scaleX: 0,
            scaleY: 0,
            duration: 0.4,
            ease: "expo.in",
            onComplete: () => {
                // console.log("play snake animation");

                this.PlaySnakeAnimation();
            }
        });
    }

    BringPlayerBackAnimation() {
        this.playerAppearAnim = null;
        this.scene.playerPawn.setPosition(this.getBlock.x, this.getBlock.y - 10);
        this.playerAppearAnim = gsap.to(this.pawn, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.4,
            ease: "expo.in",
            onComplete: () => {
                this.squishPawnAnim = null;
                this.getBlock = null;
                this.pawn = null;
                setTimeout(() => {
                    this.scene.CheckAndCallTurn();
                }, 50);
            }
        });
    }
}

export default Snake;
