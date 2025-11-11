import { Container, Sprite } from 'pixi.js';
import { Constant } from '../Constant.js';
import gsap from 'gsap';

export default class MatchmakingReel extends Container {
    static instance = null;

    constructor() {
        if (MatchmakingReel.instance) {
            return MatchmakingReel.instance;
        }

        super();
        MatchmakingReel.instance = this;

        this.reelSpeed = 20;
        this.spinDuration = 2000; // 2 seconds
        this.reelSprites = [];
        this.allTextures = Object.keys(Constant.pfpAtlas.textures);
        this.isSpinning = false;

        this.config = {
            visibleCount: 5,
            spacing: 100
        };

        this.init();
    }

    static getInstance() {
        if (!MatchmakingReel.instance) {
            MatchmakingReel.instance = new MatchmakingReel();
        }
        return MatchmakingReel.instance;
    }

    init() {
        this.createReel();
    }

    createReel() {
        const { visibleCount, spacing } = this.config;

        // Clear existing sprites if any
        this.reelSprites.forEach(sprite => sprite.destroy());
        this.reelSprites = [];
        this.removeChildren();

        for (let i = 0; i < visibleCount + 2; i++) {
            const randomFrame = this.allTextures[
                Math.floor(Math.random() * this.allTextures.length)
            ];

            const sprite = Sprite.from(Constant.pfpAtlas.textures[randomFrame]);
            sprite.anchor.set(0.5);
            sprite.x = 0;
            sprite.y = (i - 1) * spacing;
            sprite.scale.set(0.7);
            sprite.alpha = 0.4;

            this.addChild(sprite);
            this.reelSprites.push(sprite);
        }

        // Highlight center sprite
        const centerIndex = Math.floor(visibleCount / 2);
        this.reelSprites[centerIndex].scale.set(1);
        this.reelSprites[centerIndex].alpha = 1;
    }

    async spin(targetFrame) {
        if (this.isSpinning) return;

        this.isSpinning = true;
        const { spacing } = this.config;

        return new Promise((resolve) => {
            const startTime = Date.now();
            let animationFrameId;

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / this.spinDuration, 1);

                // Easing: fast start, slow end (cubic ease-out)
                const easedProgress = 1 - Math.pow(1 - progress, 3);
                const currentSpeed = this.reelSpeed * (1 - easedProgress * 0.9);

                // Move all sprites down
                this.reelSprites.forEach((sprite, index) => {
                    sprite.y += currentSpeed;

                    // Loop sprite to top when it goes too far down
                    if (sprite.y > spacing * 3.5) {
                        sprite.y = sprite.y - spacing * this.reelSprites.length;

                        // Change texture
                        if (progress > 0.7 && targetFrame) {
                            // Near the end, set target texture
                            sprite.texture = Constant.pfpAtlas.textures[targetFrame];
                        } else {
                            // Random texture during spin
                            const randomFrame = this.allTextures[
                                Math.floor(Math.random() * this.allTextures.length)
                            ];
                            sprite.texture = Constant.pfpAtlas.textures[randomFrame];
                        }
                    }

                    // Scale and alpha based on distance from center
                    const centerY = spacing * 2;
                    const distanceFromCenter = Math.abs(sprite.y - centerY);
                    const maxDistance = spacing * 2;

                    const scale = Math.max(0.5, 1 - (distanceFromCenter / maxDistance) * 0.5);
                    const alpha = Math.max(0.3, 1 - (distanceFromCenter / maxDistance) * 0.7);

                    sprite.scale.set(scale);
                    sprite.alpha = alpha;
                });

                if (progress < 1) {
                    animationFrameId = requestAnimationFrame(animate);
                } else {
                    // Snap to final position
                    this.snapToPosition(targetFrame);
                    this.isSpinning = false;
                    resolve(targetFrame);
                }
            };

            animationFrameId = requestAnimationFrame(animate);
        });
    }

    snapToPosition(targetFrame) {
        const { spacing } = this.config;
        const centerY = spacing * 2;

        // Find closest sprite to center
        let closestSprite = this.reelSprites[0];
        let minDistance = Math.abs(closestSprite.y - centerY);

        this.reelSprites.forEach(sprite => {
            const distance = Math.abs(sprite.y - centerY);
            if (distance < minDistance) {
                minDistance = distance;
                closestSprite = sprite;
            }
        });

        // Snap to exact center with animation
        gsap.to(closestSprite, {
            y: centerY,
            scale: 1,
            alpha: 1,
            duration: 0.2,
            ease: "power2.out"
        });

        // Ensure it has the target texture
        if (targetFrame) {
            closestSprite.texture = Constant.pfpAtlas.textures[targetFrame];
        }
    }

    reset() {
        this.createReel();
        this.isSpinning = false;
    }

    destroy(options) {
        this.reelSprites.forEach(sprite => sprite.destroy());
        this.reelSprites = [];
        MatchmakingReel.instance = null;
        super.destroy(options);
    }
}
