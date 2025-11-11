import { _decorator, Component, director, Node, tween, Vec3 } from 'cc';
import { TrainTrackScript } from './SubSetScripts/TrainTrackScript';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('TrainScript')
export class TrainScript extends Component {
    targetPos: Vec3 = new Vec3(-100, 0, 0);
    protected onEnable(): void {
        director.on('TutorialTrainSpawn', this.TutorialTrainSpawn, this);
    }
    MoveTrain(_targetpos: Vec3) {
        this.targetPos = _targetpos;

        // first time pos set
        tween(this.node).to(1.2, { position: this.targetPos }, {
            easing: 'linear',
            onComplete: () => {
                this.targetPos.x = (this.targetPos.x === -100) ? 60 : -100;
            }
        }).start();
        if (!GameManager.instance.isTutorial) {
            this.schedule(this.TweenTrain, 8);
        }
    }

    TweenTrain() {
        this.node.parent.getComponent(TrainTrackScript).SignalBlink();
        setTimeout(() => {
            tween(this.node)
                .to(1.2, { position: this.targetPos }, {
                    easing: 'linear',
                    onComplete: () => {
                        // Clone and flip the direction
                        const nextPos = this.targetPos.clone();
                        nextPos.x = (this.targetPos.x === -100) ? 60 : -100;
                        this.targetPos = nextPos; // update safely
                    }
                })
                .start();
        }, 2000);
    }

    TutorialTrainSpawn() {
        this.TweenTrain();
        director.off('TutorialTrainSpawn', this.TutorialTrainSpawn, this);
    }



}



