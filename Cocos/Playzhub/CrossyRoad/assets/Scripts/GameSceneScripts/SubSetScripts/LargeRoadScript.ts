
import { _decorator, Component, instantiate, Prefab, Vec3 } from 'cc';
import { Constant } from '../../Constant';
import { CarScript } from '../CarScript';
const { ccclass, property } = _decorator;

//Based on mode Speed detect
enum SpeedLevel {
    SLOW = 'slow',
    MEDIUM = 'medium',
    FAST = 'fast',
}

// Speed set pattern add
const SpeedPatterns = {
    [SpeedLevel.SLOW]: {
        minSpeed: 5,
        maxSpeed: 6,
    },
    [SpeedLevel.MEDIUM]: {
        minSpeed: 8,
        maxSpeed: 9,
    },
    [SpeedLevel.FAST]: {
        minSpeed: 10,
        maxSpeed: 11,
    },
};

@ccclass('LargeRoadScript')
export class LargeRoadScript extends Component {
    @property([Prefab]) cars: Prefab[] = [];
    @property(Prefab) coinPrefab: Prefab = null!;

    private pattern: SpeedLevel;
    private readonly maxRightLaneCars = Math.floor(Math.random() * 4) + 2;
    private readonly maxLeftLaneCars = Math.floor(Math.random() * 4) + 2;

    private leftSpeed: number = 20;
    private rightSpeed: number = 20;

    protected start(): void {
        //Select pattern for maintain car on road based on mode
        switch (Constant.mode) {
            case 'easy':
                this.pattern = SpeedLevel.SLOW;
                break;
            case 'medium':
                this.pattern = SpeedLevel.MEDIUM;
                break;
            case 'hard':
                this.pattern = SpeedLevel.FAST;
                break;
            default:
                this.pattern = SpeedLevel.MEDIUM;
        }
        const config = SpeedPatterns[this.pattern];
        this.leftSpeed = config.minSpeed + Math.random() * (config.maxSpeed - config.minSpeed);
        this.rightSpeed = config.minSpeed + Math.random() * (config.maxSpeed - config.minSpeed);
        this.SpawnCoin();
        this.CarSpawn();
    }

    //#region Spawn Coin on Road
    SpawnCoin(): void {
        if (Math.random() >= 0.75 || !this.coinPrefab) return;
        const minX = -50;
        const maxX = -10;
        const possibleX: number[] = [];
        for (let x = minX; x <= maxX; x += 5) {
            possibleX.push(x);
        }
        const randomX = possibleX[Math.floor(Math.random() * possibleX.length)];
        const randomZ = Math.random() < 0.5 ? -2.5 : 2.5;
        const coin = instantiate(this.coinPrefab);
        coin.setParent(this.node);
        coin.setPosition(randomX, 0, randomZ);
    }
    //#endregion

    //#region car spawn on road Functionality
    CarSpawn(): void {
        this.spawnCarsInLeftLane();
        this.spawnCarsInRightLane();
    }
    //#endregion

    //#region Spawn car in LeftLane Func
    spawnCarsInLeftLane(): void {
        const xPositions = this.GenerateSpawnPositions(40, -40, this.maxLeftLaneCars, 10, 25).reverse();
        for (let x of xPositions) {
            this.spawnCarAt(new Vec3(x, -0.9, -2.5), false);
        }
    }
    //#endregion

    //#region  Spawn car in RightLane Func
    spawnCarsInRightLane(): void {
        const xPositions = this.GenerateSpawnPositions(-80, 0, this.maxRightLaneCars, 10, 25).reverse();
        for (let x of xPositions) {
            this.spawnCarAt(new Vec3(x, -0.9, 2.5), true);
        }
    }
    //#endregion

    //#region Generate spawn pos
    private GenerateSpawnPositions(startX: number, endX: number, count: number, minOffset: number, maxOffset: number = minOffset + 5): number[] {
        const totalRange = Math.abs(endX - startX);
        const minRequired = (count - 1) * minOffset;

        if (minRequired > totalRange) {
            console.warn(`Not enough space to place ${count} cars with min offset ${minOffset}`);
            return [];
        }

        const tryGenerate = (): number[] => {
            const extraSpace = totalRange - minRequired;
            const gaps: number[] = [];
            let used = 0;

            for (let i = 0; i < count - 1; i++) {
                const remaining = count - 1 - i;
                const maxExtra = extraSpace - used;
                const extra = remaining > 0 ? Math.floor(Math.random() * (maxExtra + 1)) : 0;
                const totalGap = minOffset + extra;
                gaps.push(totalGap);
                used += extra;
            }

            return gaps;
        };

        const isValid = (gaps: number[]) => gaps.every(gap => gap >= minOffset);

        // 🔁 Try 5 times
        let finalGaps: number[] = [];
        const MAX_ATTEMPTS = 5;
        for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
            const attemptGaps = tryGenerate();
            if (isValid(attemptGaps)) {
                finalGaps = attemptGaps;
                break;
            }
        }

        // ❌ Fallback: evenly spaced gaps within allowed range
        if (finalGaps.length === 0) {
            const fixedGap = Math.min(maxOffset, Math.floor(totalRange / (count - 1)));
            finalGaps = Array(count - 1).fill(fixedGap);
            console.warn(`Fallback to fixed spacing: ${fixedGap}`);
        }

        // 🔢 Calculate positions
        const positions: number[] = [startX];
        for (let gap of finalGaps) {
            const last = positions[positions.length - 1];
            const next = startX > endX ? last - gap : last + gap;
            positions.push(next);
        }

        return positions;
    }
    //#endregion 

    //#region  SpawnCar pos and Lane Control
    spawnCarAt(position: Vec3, isRightLane: boolean): void {
        if (this.cars.length === 0) return;

        const prefabIndex = Math.floor(Math.random() * this.cars.length);
        const car = instantiate(this.cars[prefabIndex]);

        car.setPosition(position);
        car.setParent(this.node);

        const carScript = car.getComponent(CarScript);
        if (carScript) {
            const speed = isRightLane ? this.rightSpeed : this.leftSpeed;
            carScript.SetSpeed(speed);
            carScript.SetStartPos(position);
            carScript.MoveCar(isRightLane);
        }
    }
    //#endregion
}
