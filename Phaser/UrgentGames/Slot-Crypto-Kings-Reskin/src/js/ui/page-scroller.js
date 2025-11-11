import Button from "./button";

class PageScroller {
    constructor(scene, config) {
        this.scene = scene;
        this.config = config;

        this.width = this.config.content.width;
        this.height = this.config.content.height;
        this.pagesCount = this.config.pages.count;

        this.prevPageButton = null;
        this.nextPageButton = null;
        this.contentContainer = null;
        this.pagesBarContainer = null;
        this.activePageItem = null;
        this.maskBitmap = null;

        this.currentScale = 1;
        this.currentPageIndex = 0;

        this.isScrolling = false;
    };

    create(x, y) {
        this.maskBitmap = this.scene.make.graphics();
        this.maskBitmap.fillStyle(0xffffff);
        this.maskBitmap.fillRect(x, y, this.width, this.height);

        let mask = this.maskBitmap.createGeometryMask();

        this.contentContainer = this.scene.add.container(x, y);
        this.contentContainer.setMask(mask);
        this.prevPageButton = new Button(
            this.scene,
            "prev-page",
            this.contentContainer.x - this.config.scrollButtons.offsetX,
            this.contentContainer.y + this.height / 2 + this.config.scrollButtons.offsetY
        );
        this.prevPageButton.disabled.visible = false;
        this.prevPageButton.hover.visible = false;
        this.prevPageButton.normal.visible = false;
        this.nextPageButton = new Button(
            this.scene,
            "next-page",
            this.contentContainer.x + this.width + this.config.scrollButtons.offsetX,
            this.contentContainer.y + this.height / 2 + this.config.scrollButtons.offsetY
        );
        this.nextPageButton.disabled.visible = false;
        this.nextPageButton.hover.visible = false;
        this.nextPageButton.normal.visible = false;
        return this;
    };

    createPagesBar() {
        this.pagesBarContainer = this.scene.add.container();
        let cfg = this.config.pages;
        let commonWidth = 0;
        for (let i = 0; i < this.pagesCount; i++) {
            let item = this.scene.add.image(commonWidth, 0, "page-inactive");
            item.x += item.displayWidth / 2;
            commonWidth += cfg.stepX + item.displayWidth;
            this.pagesBarContainer.add(item);
        };
        let bounds = this.pagesBarContainer.getBounds();
        this.pagesBarContainer.setPosition(
            this.contentContainer.x + (this.width - bounds.width) / 2,
            this.contentContainer.y + this.height + cfg.offsetY
        );

        this.activePageItem = this.scene.add.image(0, 0, "page-active");
        this.pagesBarContainer.add(this.activePageItem);

        this.placeActivePage(0, true);
    };

    placeActivePage(pageNumber, isForce = false) {
        let pageItem = this.pagesBarContainer.getAt(pageNumber);

        if (isForce) {
            this.activePageItem.setPosition(pageItem.x, pageItem.y);
        } else {
            this.scene.tweens.add({
                targets: [this.activePageItem],
                alpha: 0,
                duration: 150,
                onComplete: () => {
                    this.activePageItem.setPosition(pageItem.x, pageItem.y);
                    this.scene.tweens.add({
                        targets: [this.activePageItem],
                        alpha: 1,
                        duration: 150
                    });
                }
            });
        }
    };

    onNextPage() {};

    onPrevPage() {};

    addItem(newItem) {
        this.contentContainer.add(newItem);
    };

    setScale(newScale) {
        this.currentScale = newScale;
        this.contentContainer.setScale(newScale);
        this.prevPageButton.setScale(newScale);
        this.nextPageButton.setScale(newScale);
    };

    setPosition(newX, newY) {
        this.contentContainer.setPosition(newX, newY);
    };

    destroy() {
        this.contentContainer.destroy();
        this.prevPageButton.destroy();
        this.nextPageButton.destroy();
    };
}

export default PageScroller;