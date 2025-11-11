import { _decorator, Component, director, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StarAnimation')
export class StarAnimation extends Component {

    coinIcon: Vec3 = new Vec3(460, 650, 0);
    isPlay: Boolean = false;
    isReadyToPool: Boolean = false;

    Play(): void {
        this.coinIcon = director.getScene().getChildByName("UICanvas").getChildByName("star").getPosition();
        this.isPlay = true;
    }
    Stop(): void {
        this.isPlay = false;
    }
    protected update(dt: number): void {
        if (this.isPlay) {
            let posi = this.node.getPosition().lerp(this.coinIcon, 4 * dt);
            this.node.setPosition(posi);
        }
    }
    MoveTowards(start, target, maxDistanceDelta) {
        let direction = target.subtract(start);
        let distance = direction.length();

        if (distance <= maxDistanceDelta || distance === 0) {
            return target;
        }
        return start.add(direction.normalize().multiplyScalar(maxDistanceDelta));
    }
}


