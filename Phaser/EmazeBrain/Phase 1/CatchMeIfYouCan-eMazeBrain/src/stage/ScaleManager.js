import Platform from "@base/utils/Platform";
import * as PIXI from "pixi.js";
import Config from "../config/Config";
import { Signals} from "@/Imports";
import Facade from "../Facade";
import FullscreenIOSController from "@/stage/FullscreenIOSController";

export default class ScaleManager {

  constructor (application) {
    this.app = application;
    this.init();
  }

  init() {
    ScaleManager.currentSizes = Config.sizes.desktop;
    this.calculateCurrentSize();
    this.addListeners();
  }

  addListeners() {
    Signals.requestFullScreen.add(this.onSetFullScreen, this)
    window.addEventListener('resize', this.onResize.bind(this), false)
  }

  calculateCurrentSize() {

    let orientation = '';
    const size = this.innerSize();
    let stageWidth = size.width;
    let stageHeight = size.height;

    if(stageWidth <= stageHeight && (Platform.isIPhone() || Platform.isAndroid())) {
      orientation = 'Vm'
      ScaleManager.currentSizes = Config.sizes.mobilePortrait
    } else {
      if(Platform.isIPhone() || Platform.isAndroid()) {
        orientation = 'Hm'
        ScaleManager.currentSizes = Config.sizes.mobileLandscape
      } else {
        orientation = 'Hd'
        ScaleManager.currentSizes = Config.sizes.desktop
      }
    }

    ScaleManager.center = {x:ScaleManager.currentSizes.total.width/2, y:ScaleManager.currentSizes.total.height/2}

    if(orientation != this.orientation) {
      this.orientation = orientation
      Facade.orientation = this.orientation
      Signals.orientationChanged.dispatch(this.orientation)
    }
  }


  onResize () {

    this.checkOrientation()

    const size = this.innerSize();
    let finalInnerWidth = size.width; //window.innerWidth
    let finalInnerHeight = size.height;

    this.app.view.style.width = finalInnerWidth + 'px'
    this.app.view.style.height = finalInnerHeight + 'px'

    const scaleRatio = Platform.isMobile() ? 2 : 1

    finalInnerWidth *= scaleRatio
    finalInnerHeight *= scaleRatio

    this.app.renderer.resize(finalInnerWidth, finalInnerHeight)

    const scale = Math.min(finalInnerWidth / this.safeZone.width, finalInnerHeight / this.safeZone.height)
    this.app.stage.scale.set(scale, scale)

    this.gameScale = scale

    this.app.stage.x = (finalInnerWidth - (this.safeZone.width * scale)) / 2 - (this.safeZone.left) * scale
    this.app.stage.y = (finalInnerHeight - (this.safeZone.height * scale)) / 2 - this.safeZone.top * scale

    this.reactUIUpdate();

    setTimeout(() => this.reactUIUpdate(), 100)

  }

  checkOrientation() {
    this.calculateCurrentSize()

    this.shiftX = (ScaleManager.currentSizes.total.width - ScaleManager.currentSizes.safe.width) / 2
    this.shiftY = (ScaleManager.currentSizes.total.height - ScaleManager.currentSizes.safe.height) / 2
    this.safeZone = new PIXI.Rectangle(this.shiftX, this.shiftY, ScaleManager.currentSizes.safe.width, ScaleManager.currentSizes.safe.height)
    this.gameRatio = ScaleManager.currentSizes.total.width / ScaleManager.currentSizes.total.height
  }

  reactUIUpdate() {
    const w = document.documentElement.clientWidth
    const h = document.documentElement.clientHeight
    const origw = ScaleManager.currentSizes.total.width
    const origh = ScaleManager.currentSizes.total.height

    const hScale = (h / origh)
    const wScale = (w / origw)
    const sc = wScale > hScale ? hScale : (wScale < hScale && wScale)
    const o = wScale > hScale ? "H" : "W"
    if (o == "W") {
      this.w = w
      this.h = w / this.gameRatio
    } else {
      this.h = h
      this.w = h * this.gameRatio
    }

    let isMobile = (Platform.isIPhone() || Platform.isAndroid()) ? true : false

    let orientation = 'H'
    if(isMobile) {
      this.w = window.innerWidth
      this.h = window.innerHeight
      orientation = this.orientation == 'Hm' ? 'H' : 'V'
    }
    let event = new CustomEvent("ui:resize", { detail: {width: window.innerWidth, height: this.h,  isMobile: isMobile, orientation: orientation, scale: this.gameScale}})
    document.dispatchEvent(event)
  }


  onSetFullScreen(value) {
    if(value) {
      this.onOpenFullscreen()
    } else {
      this.onCloseFullscreen()
    }
  }

  innerSize() {
    let stageWidth = document.documentElement.clientWidth; //window.innerWidth;
    let stageHeight =  document.documentElement.clientHeight;

    if (Platform.isIPhone() && Platform.isIOs()) {

      //  if ( window.matchMedia("(orientation: portrait)").matches ) {

      document.getElementsByTagName("html")[0].style.height = "100vh";
      document.getElementsByTagName("html")[0].style.minHeight = "100vh";
      setTimeout(function(){
        document.getElementsByTagName("html")[0].style.height = "100%";
        document.getElementsByTagName("html")[0].style.minHeight = "100%";
      }, 400);

      //  }
      //  console.log('################isIOSOrSafari###################', stageWidth, stageHeight)
    }
    return {width: stageWidth, height: stageHeight, ratio: stageWidth/stageHeight}
  }

  onOpenFullscreen() {
    document.documentElement.requestFullscreen()
/*
        const gameContainer = document.getElementById('container');
        if (gameContainer.fullscreenElement) {
          return;
        }
        if (gameContainer.requestFullscreen) {
          gameContainer.requestFullscreen();
        } else if (gameContainer.mozRequestFullScreen) { /* Firefox !* /
          gameContainer.mozRequestFullScreen()
        } else if (gameContainer.webkitRequestFullScreen) { /* Chrome, Safari and Opera * /
          gameContainer.webkitRequestFullScreen()
        } else if (gameContainer.msRequestFullscreen) { /* IE/Edge * /
          gameContainer.msRequestFullscreen()
        }
*/
}

  onCloseFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  }

}