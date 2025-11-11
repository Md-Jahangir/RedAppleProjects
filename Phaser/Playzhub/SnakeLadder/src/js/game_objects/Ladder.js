import gsap from "gsap";
import { AudioManager } from "../media/AudioManager";

class Ladder {
    constructor(scene, ladderData) {
        this.scene = scene;
        this.initLadderData(ladderData);
    }

    initLadderData(data) {
        Object.assign(this, {
            bottomPosArr: data.bottom,
            topPosArr: data.top,
            maxComboNum: data.combos,
            patterns: data.pattern,
            maxTarget: data.maxTarget,
            minTarget: data.minTarget,
            safeTarget: data.safeTarget,
            objMinNum: data.num[0],
            ldrNum: Phaser.Math.Between(...data.num),
            lastFirstPosArr: [],
            lastSecPosArr: [],
            shuffledFirstArr: [],
            shuffledSecondArr: [],
            ldrPosArr: [],
            ladderArray: [],
            firstPos: null,
            secondPos: null,
            rndF: null,
            rndS: null,
            j: 0,
            flag: false,
            ldrFnCallCount: 0
        });

        for (let i = 0; i < this.ldrNum; i++) {
            this.lastFirstPosArr.push(null);
            this.lastSecPosArr.push(null);
        }

        this.generateLadder();
    }

    generateLadder() {
        if (this.j >= this.ldrNum) {
            this.resetLadderPhase();
            // this.scene.InstantiateGems();
            return
        };

        this.rndF = this.getNextPatternIndex();
        if (this.rndF == null) return;

        this.rndS = this.getSubsequentPattern(this.rndF);
        this.generateLadderPositions();
    }

    resetLadderPhase() {
        this.bottomPosArr = null;
        this.topPosArr = null;
        this.patterns = null;
        this.lastFirstPosArr = null;
        this.lastSecPosArr = null;
        this.shuffledFirstArr = null;
        this.shuffledSecondArr = null;
        this.ldrPosArr = null;
        this.firstPos = null;
        this.secondPos = null;
        this.rndF = null;
        this.rndS = null;
        this.j = null;
        this.flag = null;
        this.ldrFnCallCount = null;
        this.pawn = null;
    }


    getNextPatternIndex() {
        if (!this.flag) {
            this.rndF = this.rndF === null ? this.j + 1 : this.rndF + (this.rndF % 2 === 0 ? 1 : 2);
            this.flag = this.rndF > this.maxComboNum;
        }

        if (this.flag) {
            const keys = Object.keys(this.patterns).map(Number).filter(n => !isNaN(n));
            return keys.length ? keys[Math.floor(Math.random() * keys.length)] : null;
        }

        return this.rndF;
    }

    getSubsequentPattern(index) {
        const range = this.patterns[index];
        return range.length > 1 ? Phaser.Math.Between(...range) : range[0];
    }

    generateLadderPositions() {
        if (!this.firstPos) this.selectLadderEnd('bottom');
        if (!this.secondPos) this.selectLadderEnd('top');
    }

    selectLadderEnd(type) {
        const isBottom = type === 'bottom';
        const posArr = isBottom ? this.bottomPosArr : this.topPosArr;
        const idx = isBottom ? this.rndF : this.rndS;
        const shuffled = posArr[idx].sort(() => 0.5 - Math.random());
        const checkFn = isBottom ? this.validateBottomTile.bind(this) : this.validateTopTile.bind(this);

        for (const pos of shuffled) {
            if (checkFn(pos)) {
                if (isBottom) this.firstPos = pos;
                else this.secondPos = pos;
                this.removePosition(posArr, idx, pos);
                this.ldrPosArr.push(pos);
                break;
            }
        }

        if (this.ldrPosArr.length === 2) this.addLadder();
    }

    validateBottomTile(pos) {
        const tile = this.scene.gameContainer.getByName(pos);
        if (tile.hasSnakeHead || tile.hasSnakeTail) return false;

        if (this.lastFirstPosArr[this.rndF] === null && this.lastSecPosArr[this.rndS] === null) return true;

        const targets = this.getValidTargets();
        const closest = this.getClosestPosition(pos, targets);
        if (!closest) {
            this.j++;
            this.ldrNum--;
            this.generateLadder();
            return false;
        }

        this.firstPos = closest;
        return true;
    }

    validateTopTile(pos) {
        const tile = this.scene.gameContainer.getByName(pos);
        return !(tile.hasSnakeHead || tile.hasSnakeTail);
    }

    getValidTargets() {
        const diff = Phaser.Math.Clamp(this.maxTarget, this.minTarget, this.safeTarget);
        return [
            this.lastFirstPosArr[this.rndF] - diff,
            this.lastFirstPosArr[this.rndF] + diff,
            this.lastSecPosArr[this.rndS] - diff,
            this.lastSecPosArr[this.rndS] + diff
        ];
    }

    getClosestPosition(current, targets) {
        const arr = this.bottomPosArr[this.rndF];
        return arr.reduce((closest, pos) => {
            const dist = Math.min(...targets.map(t => Math.abs(pos - t)));
            return !closest || dist < closest.dist ? { num: pos, dist } : closest;
        }, null)?.num;
    }

    removePosition(arr, key, pos) {
        const index = arr[key].indexOf(pos);
        if (index !== -1) arr[key].splice(index, 1);
    }

    addLadder() {
        this.ldrFnCallCount++;
        if (this.ldrFnCallCount !== 1) return;

        this.bottomTile = this.scene.gameContainer.getByName(this.firstPos);
        this.topTile = this.scene.gameContainer.getByName(this.secondPos);

        Object.assign(this.bottomTile, {
            hasLadderBottom: true
        });
        this.bottomTile.setData({ top: this.secondPos });
        this.topTile.hasLadderTop = true;

        // Remove adjacent values
        this.removeAdjacentValues(this.bottomPosArr[this.rndF], this.firstPos);
        this.removeAdjacentValues(this.topPosArr[this.rndS], this.secondPos);

        // Remove firstPos and secondPos completely from all position arrays
        this.removeFromAllPositionObjects(this.firstPos);
        this.removeFromAllPositionObjects(this.secondPos);

        this.createLadder();
        this.scene.ladderContainer.add(this.ladderArray);
    }

    removeFromAllPositionObjects(pos) {
        for (const obj of [this.bottomPosArr, this.topPosArr]) {
            for (const key in obj) {
                const arr = obj[key];
                let index;
                while ((index = arr.indexOf(pos)) !== -1) {
                    arr.splice(index, 1);
                }
            }
        }
    }

    removeAdjacentValues(arr, value) {
        [value - 1, value + 1].forEach(v => {
            const i = arr.indexOf(v);
            if (i !== -1) arr.splice(i, 1);
        });
    }

    createLadder() {
        const dx = this.topTile.x - this.bottomTile.x;
        const dy = this.topTile.y - this.bottomTile.y;
        const dist = Math.hypot(dx, dy);
        const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

        const segmentHeight = 54;
        const count = Math.ceil(dist / segmentHeight);
        const step = 1 / count;

        for (let i = 0; i <= count; i++) {
            const t = i * step;
            const x = Phaser.Math.Linear(this.bottomTile.x, this.topTile.x, t);
            const y = Phaser.Math.Linear(this.bottomTile.y, this.topTile.y, t);

            const ladder = this.scene.add.image(x, y, 'ldr')
                .setOrigin(0.5)
                .setAngle(angleDeg);

            this.ladderArray.push(ladder);
            if (i === count) this.prepareNextLadder();
        }
    }

    prepareNextLadder() {
        this.j++;
        this.ldrFnCallCount = 0;
        this.ldrPosArr = [];
        this.firstPos = null;
        this.secondPos = null;

        delete this.patterns[String(this.rndF)];
        this.generateLadder();
    }

    PromotePawn(_block, _pawn) {
        const block = _block;
        let ladderTop = block.data.list.top;
        this.getBlock = this.scene.gameContainer.getByName(ladderTop);
        this.pawn = _pawn;
        this.scene.playerPawn.currBlockNum = ladderTop;

        this.promotePawn = gsap.to(this.pawn, {
            duration: 0.2,
            x: this.getBlock.x,
            y: this.getBlock.y, // Move to calculated position
            ease: 'linear', // Smooth easing
            onComplete: () => {
                AudioManager.PlayLadderUpAudio();
                this.scene.playerPawn.setPosition(this.getBlock.x, this.getBlock.y - 10);
                ladderTop = null;
                this.pawn = null;
                // if (this.scene.getBlock.hasGem)
                // this.scene.gems.CollectGems();
                this.scene.CheckAndCallTurn();
            }
        });
    }
}

export default Ladder;
