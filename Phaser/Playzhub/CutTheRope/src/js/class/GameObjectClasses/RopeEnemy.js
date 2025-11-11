import { Constant } from "../../Constant";
import MatterImage from "../../gameObjectsClass/MatterImage";
import { Utils } from "../Utils";

export default class RopeEnemy {
    constructor(scene, _bodyArray, _startBody) {
        this.scene = scene;
        this.bodyArray = _bodyArray;
        this.isEnemyMove = null;
        this.joint = null;
        this.index = null;
        this.speed = null;
        this.startBody = _startBody
        this.Create();
    }
    Create() {
        this.isEnemyMove = false;
        let newScale = Utils.getScale(1080, 1920, Constant.clientWidth, Constant.clientHeight);
        this.speed = 0.5;
        this.index = 0;
        this.enemy = new MatterImage(this.scene.scene, this.startBody.x, this.startBody.y, 'spider', null, { isSensor: true, isStatic: false });
        this.enemy.setMass(0.001).setScale(0.5 * newScale).setIgnoreGravity(true).setDepth(2);
        console.log(this.enemy, 'enemy');

        this.joint = this.scene.scene.matter.add.constraint(this.enemy, this.startBody, 0, 1.4, /*{ pointA: { x: 0, y: 65 } }*/);

        this.isEnemyMove = true;
        this.fireInterval = setInterval(() => {
            this.scene.scene.matter.world.removeConstraint(this.joint);
            this.fireTimeout =
                setTimeout(() => {
                    if (this.isEnemyMove) {
                        this.joint = this.scene.scene.matter.add.constraint(this.enemy, this.bodyArray[this.index], 0, 1.4, /*{ pointA: { x: 0, y: 65 } }*/);
                    }
                }, 800);
            this.index++;
            if (this.index === this.bodyArray.length - 1) {
                clearInterval(this.fireInterval);
            }
        }, 1000);
        Constant.game.events.once('evtGameRestart', this.RestartGame, this);
    }
    EnemyMove(_index) {
        let dx = this.bodyArray[_index].position.x - this.enemy.x;
        let dy = this.bodyArray[_index].position.y - this.enemy.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        this.speed = Math.max(0.1, distance * 0.5);
        if (distance > 0.01) {
            let moveX = (dx / distance) * this.speed;
            let moveY = (dy / distance) * this.speed;
            this.enemy.x += moveX;
            this.enemy.y += moveY;
        } else {
            this.enemy.x = this.bodyArray[_index].position.x;
            this.enemy.y = this.bodyArray[_index].position.y;
        }
        if (this.index === this.bodyArray.length - 1) {
            this.isEnemyMove = false;
            Constant.game.events.emit('evtGameOver');
        }
    }
    StopEnemy() {
        this.scene.scene.matter.world.removeConstraint(this.joint);
        this.enemy.Destroy();
        this.isEnemyMove = false;
        clearInterval(this.fireInterval);
        clearTimeout(this.fireTimeout);
    }
    RestartGame() {
        clearInterval(this.fireInterval);
        clearTimeout(this.fireTimeout);
    }
    Resize(_newWidth, _newHeight, _newScale) {
        this.enemy.setScale(_newScale / 2);
        if (this.index !== null) {
            this.enemy.setPosition(this.bodyArray[this.index].position.x, this.bodyArray[this.index].position.y);
        }
    }
    Onupdate() {
        if (this.isEnemyMove) {
            this.EnemyMove(this.index);
        }
    }
}