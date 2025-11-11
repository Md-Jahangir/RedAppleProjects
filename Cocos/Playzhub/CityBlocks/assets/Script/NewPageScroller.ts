import { _decorator, Button, Component, Node, PageView } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('NewPageScroller')
export class NewPageScroller extends Component {
    @property(Node) pageView: Node = null;
    @property(Node) nextButton: Node = null;
    @property(Node) previousButton: Node = null;
    @property(Node) playButton: Node = null;

    page: PageView = null;
    currentPage: number = 0;

    protected onEnable(): void {
        this.page = this.pageView.getComponent(PageView);

    }

    start() {

    }

    OnClickNextButton(): void {
        this.page.scrollToPage(this.currentPage)

    }

    OnClickPreviousButton(): void {
        this.page.scrollToLeft();
    }

    CheckButtonInteractive(): void {
        if (this.currentPage == 0) {
            this.previousButton.getComponent(Button).interactable = false;
            this.nextButton.getComponent(Button).interactable = true;
            this.nextButton.active = true;
            this.playButton.active = false;
        }
        else if (this.currentPage == 6) {
            this.previousButton.getComponent(Button).interactable = true;
            // this.nextButton.getComponent(Button).interactable = false;
            this.nextButton.active = false;
            this.playButton.active = true;
        } else {
            this.previousButton.getComponent(Button).interactable = true;
            this.nextButton.getComponent(Button).interactable = true;
            this.nextButton.active = true;
            this.playButton.active = false;
        }
    }

    OnScroll(event): void {

    }
}


