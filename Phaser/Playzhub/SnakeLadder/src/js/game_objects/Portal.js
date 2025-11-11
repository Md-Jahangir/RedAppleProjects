import gsap from "gsap";
import { Constant } from "../Constant";

class Portal {
    constructor(scene, portalBlock) {
        this.scene = scene;
        this.portalContainer = null;
        this.x = portalBlock.x;
        this.y = portalBlock.y;
        this.scaleFactor = null;

        this.createPortal();
        this.hidePortal();
    }

    createPortal() {
        this.portalContainer = this.scene.add.container().setDepth(2);
        for (let i = 1; i < 5; i++) {
            let portal = this.scene.add.image(this.x, this.y, 'portal_' + i).setScale(0);
            this.portalContainer.add(portal);
        }
        this.x = null;
        this.y = null;
        // this.portalContainer.setScale(0.01);
        // this.scaleFactor = 0.01;
    }

    hidePortal() {
        this.portalContainer.setVisible(false);
    }

    showPortal() {
        this.portalContainer.setVisible(true);
        this.scaleUpPortal();

        this.animatePortal();
    }

    scaleUpPortal() {
        this.portalContainer.list.forEach(element => {
            // const direction = index % 2 === 0 ? -360 : 360;
            gsap.to(element, {
                scale: 1,
                duration: 0.4,
            });
        });
    }

    animatePortal() {
        this.portalContainer.list.forEach((element, index) => {
            const direction = index % 2 === 0 ? -360 : 360;
            gsap.to(element, {
                rotation: `+=${direction}`,
                duration: 55,
                ease: "none",
                repeat: -1
            });
        });
    }

    minimizePortal() {
        gsap.to(this.portalContainer.list, {
            scale: 0,
            duration: 0.5,
            ease: "none",
            onComplete: () => {
                this.portalContainer.list.forEach(element => {
                    gsap.killTweensOf(element);
                });
                this.hidePortal();
            }
        });
    }

    resizePortal(_newWidth, _newHeight, _newScale) {
        this.portalContainer.setScale(_newScale);
        this.portalContainer.setPosition(_newWidth / 2,
            _newHeight / 2);
    }
}

export default Portal;