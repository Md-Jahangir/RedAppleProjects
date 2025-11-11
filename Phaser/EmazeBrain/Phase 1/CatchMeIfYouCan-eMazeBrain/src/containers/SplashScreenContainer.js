import BaseContainer from "@base/container/BaseContainer";
import * as PIXI from "pixi.js";
import TweenMax from "gsap"
import { Signals} from "@/Imports";
import Facade from "../Facade";
import ScaleManager from "@/stage/ScaleManager";
import SpineAnimation from "@base/spineAnimation/SpineAnimation";

export default class SplashScreenContainer extends BaseContainer {

  constructor (data) {
    super(data)
    this.init()
  }

  init() {
    setTimeout(this.addMainGraphics.bind(this), 0)
    window.dispatchEvent(new Event('resize'))
  }

  addMainGraphics() {
    this.splashContainer = new PIXI.Container()
    this.splashContainer.visible = false
    this.addChild(this.splashContainer)

    let backBase = (Facade.model.color_scheme == "cold") ? "backBaseCold" : "backBaseWarm"
    this.background = new PIXI.Sprite(PIXI.Texture.from(backBase))
    this.background.anchor.set(0.5)
    this.background.alpha = 0
    this.splashContainer.addChild(this.background)

    // const delta = 38;
    // this.splashBackSpine = new SpineAnimation('mainBackground')
    // this.splashBackSpine.start(['MainGameBackground'], [true])
    // this.splashBackSpine.visible = false
    // this.splashContainer.addChild(this.splashBackSpine)
    // this.splashBackSpine.position.set(0, -delta)
    this.splashContainerCenter = new PIXI.Container()
    this.splashContainer.addChild(this.splashContainerCenter)
    this.splashContainerCenter.position.set(ScaleManager.center.x, ScaleManager.center.y)

    this.addSlides()
    this.showSlide(0)

    // this.splashAnimation = new SpineAnimation('splashAnimation')
    // this.splashContainerCenter.addChild(this.splashAnimation)
    // this.splashAnimation.start ([ 'splash_scren' ], [ true])
    // this.splashAnimation.position.set(-540, -770)

    this.ContinueButton = new PIXI.AnimatedSprite([
      PIXI.Texture.from('splashScreen/PlayButtonNormal'),
      PIXI.Texture.from('splashScreen/PlayButtonOver'),
      PIXI.Texture.from('splashScreen/PlayButtonDown')]
    )
    this.ContinueButton.anchor.set(0.5)
    this.splashContainerCenter.addChild(this.ContinueButton)
    this.ContinueButton.on('pointerover', () => {
      this.ContinueButton.gotoAndStop(1)
    })

    this.ContinueButton.on('pointerout', () => {
      this.ContinueButton.gotoAndStop(0)
    })

    this.ContinueButton.position.set(0, 470)

    Signals.loadingProgress.add(this.onPreloaderProgress, this)
    this.onOrientationChanged(Facade.orientation)

    this.showContinue()
    // setTimeout(()=>{
    //   this.continueBtnClick()
    // }, 3000)

    Signals.initUI.add(this.continueBtnClick, this)
  }

  addSlides() {
    this.currentSlideInd = 0
    this.slides = []
    this.slidesContainer = new PIXI.Container()
    this.slidesContainer.position.set(0, 0)
    this.splashContainerCenter.addChild(this.slidesContainer)

    // const splashSlideBack = new PIXI.Sprite(PIXI.Texture.from("splashScreen/DecorativeBorderPopup"))
    // splashSlideBack.anchor.set(0.5)
    // splashSlideBack.position.set(-8, 46)
    // this.slidesContainer.addChild(splashSlideBack)

    // const dotsBack = new PIXI.Sprite(PIXI.Texture.from("splashScreen/BulletPointsContainer"))
    // dotsBack.anchor.set(0.5)
    // dotsBack.position.set(0, 360)
    // this.slidesContainer.addChild(dotsBack)

    for(let i = 0; i < 2; ++i){
      this.slides[i] = new PIXI.Container()
      this.slides[i].visible = false
      this.slidesContainer.addChild(this.slides[i])

      // this.slides[i].dot = new PIXI.AnimatedSprite([PIXI.Texture.from("splashScreen/Bullet"), PIXI.Texture.from("splashScreen/Active")])
      // this.slides[i].dot.position.set(-150 + 88 * i, 328)
      // this.slides[i].dot.interactive = true
      // this.slides[i].dot.on('pointerdown', (e)=>{
      //   e.stopPropagation()
      //   this.showSlide(i)
      // }, this)
      // this.slidesContainer.addChild(this.slides[i].dot)
    }

    // this.slides[0].dot.gotoAndStop(1)


    this.slides[0].image = new PIXI.Sprite(PIXI.Texture.from("splashScreen/splash_slide_2"))
    this.slides[0].image.anchor.set(0.5)
    this.slides[0].addChild(this.slides[0].image)
    this.slides[0].text1 = Facade.textFactory.getContainerTextWithStyle('splashSlide1')
    //this.slides[0].text1.anchor.set(0.5)
    this.slides[0].text1.position.set(0, -80)
    this.slides[0].addChild(this.slides[0].text1)

    this.slides[1].image = new PIXI.Sprite(PIXI.Texture.from("splashScreen/splash_slide_1"))
    this.slides[1].image.anchor.set(0.5)
    this.slides[1].addChild(this.slides[1].image)
    this.slides[1].text1 = new Facade.textFactory.getContainerTextWithStyle('splashSlide2')
  //  this.slides[1].text1.anchor.set(0.5)
    this.slides[1].text1.position.set(0, -80)
    this.slides[1].addChild(this.slides[1].text1)



    this.arrowLeft = new PIXI.AnimatedSprite([PIXI.Texture.from("splashScreen/ArrowLeft"), PIXI.Texture.from("splashScreen/ArrowLeftOver")])
    this.arrowLeft.interactive = true
    this.arrowLeft.on('pointerdown', (e) => {
      e.stopPropagation()
      this.showSlide(this.currentSlideIndex - 1)
    }, this)
    this.slidesContainer.addChild(this.arrowLeft)

    this.arrowLeft.on('pointerover', (e) => {
      this.arrowLeft.gotoAndStop(1)
    })

    this.arrowLeft.on('pointerout', (e) => {
      this.arrowLeft.gotoAndStop(0)
    })

    this.arrowRight = new PIXI.AnimatedSprite([PIXI.Texture.from("splashScreen/ArrowRight"), PIXI.Texture.from("splashScreen/ArrowRightOver")])
    this.arrowRight.interactive = true
    this.arrowRight.on('pointerdown', (e) => {
      e.stopPropagation()
      this.showSlide(this.currentSlideIndex + 1)
    }, this)
    this.arrowRight.on('pointerover', (e) => {
      this.arrowRight.gotoAndStop(1)
    })

    this.arrowRight.on('pointerout', (e) => {
      this.arrowRight.gotoAndStop(0)
    })
    this.slidesContainer.addChild(this.arrowRight)
  }

  onPreloaderProgress = (progress) =>{
    this.progress = progress
  }

  showContinue() {
    this.showContinueSplash()
  }

  showContinueSplash() {
    // this.splashBackSpine.visible = true
    this.splashContainer.visible = true
    // this.splashAnimation.start ([ 'splash_scren' ], [ true])

    TweenMax.to (this.ContinueButton, 0.5, {
      alpha: 1, onComplete: () => {
        this.ContinueButton.interactive = true
        this.ContinueButton.on('pointerup', this.continueBtnClick, this)
      }})
  }

  continueBtnClick(e) {
    e && e.stopPropagation()
    this.off('pointerup', this.continueBtnClick, this)
    Signals.continueBtnClick.dispatch()
    this.interactive = false
    this.destroy()
  }

  showSlide(slideInd){
    this.currentSlideIndex = (slideInd + this.slides.length) % this.slides.length
    for(let i = 0; i < this.slides.length; ++i){
      // this.slides[i].dot.gotoAndStop(0)
      this.slides[i].visible = (i === this.currentSlideIndex)
    }
    // this.slides[this.currentSlideIndex].dot.gotoAndStop(1)
  }

  onOrientationChanged(orientationSymbol) {
    switch (orientationSymbol) {
      case 'Hd':
      case 'Hm':
        this.arrowLeft.scale.set(1.1)
        this.arrowRight.scale.set(1.1)
        this.arrowLeft.position.set(-650, 0)
        this.arrowRight.position.set(547, 0)
        break

      case 'Vm':
        this.arrowLeft.scale.set(1.1)
        this.arrowRight.scale.set(1.1)
        this.arrowLeft.position.set(-500, 0)
        this.arrowRight.position.set(410, 0)
        break
    }
    this.background.position.set(ScaleManager.center.x, ScaleManager.center.y)
  }

}