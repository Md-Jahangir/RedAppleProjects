

import { _decorator, BoxCollider, Component, instantiate, Prefab, Vec3 } from 'cc';
import { RepeatingSetScript } from '../RepeatingSetScript';
import { Constant } from '../../Constant';
import { LogScript } from '../LogScript';
const { ccclass, property } = _decorator;

enum SpeedLevel {
    SLOW,
    MEDIUM,
    FAST,
}

const LogSpeedPatterns = {
    [SpeedLevel.SLOW]: {
        minSpeed: 20,
        maxSpeed: 22,
        spawnIntervalMin: 3.5,
        spawnIntervalMax: 4,
    },
    [SpeedLevel.MEDIUM]: {
        minSpeed: 23,
        maxSpeed: 26,
        spawnIntervalMin: 3,
        spawnIntervalMax: 3.2,
    },
    [SpeedLevel.FAST]: {
        minSpeed: 27,
        maxSpeed: 30,
        spawnIntervalMin: 2.5,
        spawnIntervalMax: 3,
    },
};

@ccclass('LargeWaterScript')
export class LargeWaterScript extends Component {
    @property([Prefab]) log: Prefab[] = [];

    private rightLaneSpawned = 0;
    private leftLaneSpawned = 0;

    private readonly maxRightLaneLog = 6;
    private readonly maxLeftLaneLog = 6;

    private oneTimeLogSpawn = false;
    public collider: BoxCollider;
    private pattern: SpeedLevel;

    private rightLaneSpeed = 0;
    private leftLaneSpeed = 0;

    private readonly allPatterns = [SpeedLevel.SLOW, SpeedLevel.MEDIUM, SpeedLevel.FAST];

    private readonly enemyNames = new Set(['1cat', '2cow', '3dog', '4pig', '5rabbit']);

    private patternConfig: {
        minSpeed: number,
        maxSpeed: number,
        spawnIntervalMin: number,
        spawnIntervalMax: number
    };

    start() {
        // Pick a random pattern
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
                this.pattern = SpeedLevel.SLOW; // fallback
        }
        this.patternConfig = LogSpeedPatterns[this.pattern];

        // Set fixed speed ONCE for both lanes
        this.rightLaneSpeed = this.patternConfig.minSpeed +
            Math.random() * (this.patternConfig.maxSpeed - this.patternConfig.minSpeed);

        this.leftLaneSpeed = this.patternConfig.minSpeed +
            Math.random() * (this.patternConfig.maxSpeed - this.patternConfig.minSpeed);
    }

    LogSpawn() {
        if (this.node.parent.getComponent(RepeatingSetScript).CheckRender()) {
            if (this.oneTimeLogSpawn) return;
            this.oneTimeLogSpawn = true;
            this.scheduleRightLaneSpawn();
            this.scheduleLeftLaneSpawn();
        }
    }

    scheduleRightLaneSpawn() {
        const interval = (this.patternConfig.spawnIntervalMin + Math.random() *
            (this.patternConfig.spawnIntervalMax - this.patternConfig.spawnIntervalMin))
            / Constant.speedRatio;

        this.scheduleOnce(() => {
            if (this.rightLaneSpawned < this.maxRightLaneLog) {
                this.spawnLogAt(new Vec3(40, 0, 2.5));
                this.rightLaneSpawned++;
                this.scheduleRightLaneSpawn();
            }
        }, interval);
    }

    scheduleLeftLaneSpawn() {
        const interval = (this.patternConfig.spawnIntervalMin + Math.random() *
            (this.patternConfig.spawnIntervalMax - this.patternConfig.spawnIntervalMin))
            / Constant.speedRatio;

        this.scheduleOnce(() => {
            if (this.leftLaneSpawned < this.maxLeftLaneLog) {
                this.spawnLogAt(new Vec3(-80, 0, -2.5));
                this.leftLaneSpawned++;
                this.scheduleLeftLaneSpawn();
            }
        }, interval);
    }

    spawnLogAt(position: Vec3) {
        const logIndex = Math.random() < 0.5 ? 0 : 1;
        const movableLog = instantiate(this.log[logIndex]);
        // const movableLog = instantiate(this.log[1]);


        movableLog.setPosition(position);
        movableLog.setParent(this.node);

        const logScript = movableLog.getComponent(LogScript);
        if (logScript) {
            const isRightLane = position.x === 40;
            const speed = isRightLane ? this.rightLaneSpeed : this.leftLaneSpeed;
            logScript.SetSpeed(speed);
            logScript.MoveLog(isRightLane);
        }
    }

    protected lateUpdate(dt: number): void {
        if (!this.oneTimeLogSpawn) {
            this.LogSpawn();
        }
    }
}

