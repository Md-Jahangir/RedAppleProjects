class Constant {
    /**
     * Create class instance and fill params from URL or fill it with default values if URL not contain needed data.
     * @constructs
     */
    constructor() {
        this.game = null;
        this.scaleFactor = null;
        this.isMobile = null;
        this.currentAspectRatio = null;
        this.originalAspectRatio = null;
        this.currentRatio = null;
        this.timeToEnd = null;

        this.gameOptions = {
            rotationSpeed: 4,
            maxRotationSpeed: 10,
            rotationVariation: 2,
            changeTime: 2500,
            minAngle: 12,
            throwSpeed: 150,
        }
    };
};
let constant = new Constant();
export { constant as Constant };