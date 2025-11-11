import Platform from "@base/utils/Platform";
import Signals from "@/signals/GameSignals";

export default class FullscreenIOSController {

  constructor() {
    this.gameContainer = document.getElementById('gameCanvas')
    this.uiContainer = document.getElementById('root')
    this.shift = 0
    this.isFullScreenOpened = false

    if ((Platform.isIOs() && Platform.browser == 'chrome')) {
      Signals.orientationChanged.add(this.onChangeOrientationNonFullScreen, this)
      this.disableScroll()
      this.setOverlay(false)
      document.body.style.overflow = "hidden"

      return
    }
    Signals.orientationChanged.add(this.onChangeOrientation, this)

    window.addEventListener("resize", this.f.bind(this), false);
    this.f();
  }

  f () {
    let cH = document.documentElement.clientHeight;
    let iH = window.innerHeight;

    if (!cH || !iH) {
      setTimeout(this.f(), 50);
    }

    this.gameContainer.style.bottom = 0 + 'px'

    if (window.innerHeight > window.innerWidth) {

      //started in portrait
      if (iH >= cH + 20) {
        this.shift = -5
        window.scrollTo(0, 0);
        this.setOverlay(false)
        this.disableScroll()
      } else {
        window.scrollTo(0, 0);
        this.setOverlay(true)
        this.enableScroll()
      }
    } else {
      //started in landscape
      if (iH + 20 >= cH) {
        this.shift = 0
        this.setOverlay(false)
        this.disableScroll()
        window.scrollTo(0, 0)
      } else {
        this.setOverlay(true)
        this.enableScroll()

        window.scrollTo(0, 0)
      }
    }
  }

  onChangeOrientation(orientation) {
    if (orientation == this.orientation) return
    this.orientation = orientation
    window.scrollTo(0, 0);
    this.setOverlay(true)
    this.enableScroll()
    this.resizeUI()
  }

  onChangeOrientationNonFullScreen(orientation) {
    if (orientation == this.orientation) return
    this.orientation = orientation
    window.scrollTo(0, 0);
    this.disableScroll()
  }


  setOverlay(status) {
    document.getElementsByClassName("fullscreen-background")[0].setAttribute("data-active", status);
    document.getElementsByClassName("fullscreen-instructions")[0].setAttribute("data-active", status);
    document.getElementsByClassName("fullscreen-overlay")[0].setAttribute("data-active", status);
  }

  preventDefault(e) {
    e.preventDefault()
  }

  disableScroll() {
    document.body.style.overflow = "hidden"
    this.gameContainer.style.pointerEvents = ''
    //this.uiContainer.style.pointerEvents = ''

    document.body.addEventListener('touchmove', this.preventDefault, {
      passive: false,
    })

    let iH = window.innerHeight
    let iW = window.innerWidth
    this.gameContainer.style.position = 'fixed'
    this.gameContainer.style.top = 0 + 'px'
    this.gameContainer.style.width = iW + 'px'
    this.gameContainer.style.height = iH + 'px'

    //this.uiContainer.style.touchAction = "none"

    this.resizeUI()
  }

  enableScroll() {
    document.body.style.overflow = "auto"
    this.gameContainer.style.pointerEvents = 'none'
    this.uiContainer.style.pointerEvents = 'none'
    document.body.removeEventListener('touchmove', this.preventDefault)
    //this.uiContainer.style.touchAction = ""
  }

  removeAll() {
    window.scrollTo(0, 0);
    this.setOverlay(false)
    this.disableScroll()
  }


  resizeUI() {
    let iH = window.innerHeight;
    let iW = window.innerWidth;
    this.uiContainer.style.position = 'fixed'
    this.uiContainer.style.top = this.shift + 'px'
    this.uiContainer.style.width = iW + 'px'
    this.uiContainer.style.height = iH + 'px'
  }

}