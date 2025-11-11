
import { _decorator, Component, instantiate, Node, Prefab, Vec3 } from 'cc';
// import { RepeatingSetScript } from '../RepeatingSetScript';
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

@ccclass('SmallRoadScript')
export class SmallRoadScript extends Component {
    @property([Prefab]) cars: Prefab[] = [];
    @property(Prefab) powerPrefab: Prefab = null!;

    private readonly maxRightLaneCars = Math.floor(Math.random() * 3) + 3;
    private readonly maxLeftLaneCars = Math.floor(Math.random() * 3) + 3;

    private speed: number = 20;
    // private oneTimeCarSpawn: boolean = false;
    private pattern: SpeedLevel;

    protected start(): void {
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
        this.speed = config.minSpeed + Math.random() * (config.maxSpeed - config.minSpeed);
        this.SpawnPowerUps();
        this.CarSpawn();
    }

    //#region PowerUp Spawn control
    SpawnPowerUps(): void {
        if (Math.random() >= 0.9 || !this.powerPrefab) return;

        const minX = -50;
        const maxX = -10;
        const possibleX: number[] = [];
        for (let x = minX; x <= maxX; x += 5) {
            possibleX.push(x);
        }

        const randomX = possibleX[Math.floor(Math.random() * possibleX.length)];
        const power = instantiate(this.powerPrefab);
        power.setParent(this.node);
        power.setPosition(randomX, 0, 0);
    }
    //#endregion

    //#region  CarSpawn Functionality
    CarSpawn(): void {
        // if (this.node.parent.getComponent(RepeatingSetScript).CheckRender()) {
        //     this.oneTimeCarSpawn = true;
        // }
        const randomLane = Math.floor(Math.random() * 2);
        if (randomLane === 0) {
            this.spawnCarsInLeftLane();
        } else {
            this.spawnCarsInRightLane();
        }
    }
    //#endregion

    //#region  Spawn Car Lane Control
    spawnCarsInLeftLane(): void {
        const xPositions = this.GenerateSpawnPositions(40, -40, this.maxLeftLaneCars, 10, 25).reverse();
        for (let x of xPositions) {
            this.spawnCarAt(new Vec3(x, -0.9, -0.25), false);
        }
    }
    spawnCarsInRightLane(): void {
        const xPositions = this.GenerateSpawnPositions(-80, 0, this.maxRightLaneCars, 10, 25).reverse();
        for (let x of xPositions) {
            this.spawnCarAt(new Vec3(x, -0.9, -0.25), true);
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
            carScript.SetSpeed(this.speed);
            carScript.SetStartPos(position);
            carScript.MoveCar(isRightLane);
        }
    }
    //#endregion
}
