import { _decorator, Component, instantiate, Node, ParticleSystem2D, Prefab, Vec3, tween } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Particles')
export class Particles extends Component {
    @property(Node) selectionParticle: Node;

    @property(Prefab) blastingParticlePrefab: Prefab;
    blastingParticleArray: Node[] = [];

    @property(Node) staticCloud: Node = null;
    @property(Node) dynamicCloud: Node = null;

    start() {
        for (let i: number = 0; i < 1; i++) {
            let blastParticle: Node = instantiate(this.blastingParticlePrefab);
            blastParticle.setParent(this.node);
            blastParticle.active = false;
            this.blastingParticleArray.push(blastParticle);
        }
        this.CloudAnimation(this.staticCloud, 10, 20, 20);
        this.CloudAnimation(this.dynamicCloud, 10, 50, 50);
    }

    //#region -PlaySelectedParticles
    PlaySelectedParticles(): void {
        this.selectionParticle.active = true;
    }
    //#endregion

    //#region -StopSelectedParticles
    StopSelectedParticles(): void {
        this.selectionParticle.active = false;
    }
    //#endregion

    //#region -GetBlastParticle
    GetBlastParticle(): Node {
        let newNode: Node;
        this.blastingParticleArray.forEach((_node, _index) => {
            if (!_node.active) {
                newNode = _node;
            }
        });
        if (newNode == undefined) {
            newNode = instantiate(this.blastingParticlePrefab)
            newNode.setParent(this.node)
            newNode.active = false;
            this.blastingParticleArray.push(newNode);
        };
        return newNode;
    }
    //#endregion

    //#region -BlastParticlePlay
    BlastParticlePlay(_position: Vec3): void {
        let newBlastParticle: Node = this.GetBlastParticle();
        newBlastParticle.setPosition(_position);
        newBlastParticle.active = true;

        setTimeout(() => {
            newBlastParticle.active = false;
        }, 1000)
    }
    //#endregion

    //#region -CloudAnimation
    CloudAnimation(_targetNode: Node, _duration: number, _forwardDistance: number, _backwardDistance: number): void {
        const startNodePosition: Vec3 = _targetNode.getPosition();
        tween(_targetNode)
            .to(_duration, { position: new Vec3(startNodePosition.x + _forwardDistance, startNodePosition.y - _forwardDistance, startNodePosition.z) })
            .to(_duration, { position: new Vec3(startNodePosition.x - _backwardDistance, startNodePosition.y + _backwardDistance, startNodePosition.z) })
            .union()
            .repeatForever()
            .start();
    }
    //#endregion
}


