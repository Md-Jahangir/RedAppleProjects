import { Signals} from "@/Imports";
import Stage from "@/stage/Stage";
import Config from "@/config/Config";
import Facade from "@/Facade";
import MainContainer from "@/containers/MainContainer";
import ApplicationLoader from "./ApplicationLoader";
import GameManager from "@/managers/GameManager";
import Model from "../model/Model";
import TextFactory from "@base/text/TextFactory";
import * as PIXI from "pixi.js";
import Platform from "@base/utils/Platform";
import BackendManager from "@/managers/comunication/BackendManager";
import SplashScreenContainer from "@/containers/SplashScreenContainer";
import { LocalizedStrings } from "../assets/final/json/LocalizedStrings.json";
import { PixiTextStyles } from "../assets/final/json/PixiTextStyles.json";
// import ErrorLayoutJet from "@/UI/layouts/ErrorLayoutJet";
// import UIConfig from "@baseUI/config/UIConfig";
// import {UIApplication} from "@/Imports";
import PreloaderContainer from "@/containers/PreloaderContainer";
import  { Utils } from '@base/utils/Utils';

export default class Application {
    constructor () {
        this.count = 0
        // Signals.loadAssets.add(this.onLoadAssets, this)

        Signals.preloaderAssetsLoadingComplete.add(this.onPreloaderAssetsLoadingComplete, this)
        // Signals.mainGameAssetsLoadingComplete.add(this.onMainGameAssetsLoadingComplete, this)
        Signals.modelInitStored.add(this.onModelInitStored, this)
        Signals.continueBtnClick.add(this.onContinueBtnClick, this)
        
        this.backendManager = new BackendManager()
        this.gameManager = new GameManager ()
        this.model = new Model ()
        Signals.allDataReceived.add(this.onMainGameAssetsLoadingComplete, this)
        Signals.mainGameAssetsLoadingComplete.add(this.backendManager.CheckAuthentication, this)
        // this.uiApplication = new UIApplication()
        Facade.infoDIV = document.getElementById('info')
        Facade.infoDIV.style.pointerEvents = 'none'
    }

    onLoadAssets() {
        this.appLoader = new ApplicationLoader()
        this.appLoader.loadPreloadingAssets()
    }

    onPreloaderAssetsLoadingComplete = () => {
        const styles =  PIXI.Loader.shared.resources['PixiTextStyles'].data
        const strings =  PIXI.Loader.shared.resources['LocalizedStrings'].data
        Facade.textFactory = new TextFactory(styles, strings, Config.locale)

        const locale = 'en'
        Facade.locale = locale
        Facade.textFactory.changeLocaleAndRefresh(Facade.locale)

        if (!PIXI.utils.isWebGLSupported()) {
            console.log('isWebGLSupported = FALSE')
            setTimeout(() => this.webGlIsNotSupported(), 2000)
        } else {
            this.stage = new Stage()
            this.splashScreenContainer = new SplashScreenContainer()
            this.splashScreenContainer.visible = false
            this.stage.addChild(this.splashScreenContainer)

            this.preloaderContainer = new PreloaderContainer()
            this.stage.addChild(this.preloaderContainer)

            // this.errorLayout = new ErrorLayoutJet('errorLayout', 'errorLayout', Config.pattern.errorLayout)
            // this.errorLayout.position.set(650, 800)
            // this.errorLayout.start()
            // this.stage.addChild(this.errorLayout)


            // `if(Platform.isIOs()) {
            //   this.fullscreenController = new FullscreenIOSController()
            // }`

            if(!Platform.isMobile()) {
                document.body.style.overflow = "hidden"
            }

            this.appLoader.loadMainGameAssets()
        }
    }

    onMainGameAssetsLoadingComplete = () => {
        Facade.gameConfig = PIXI.Loader.shared.resources['GameConfig'].data
        Facade.gameConfig = PIXI.Loader.shared.resources['GameConfig'].data
        if(window.GameConfigPOST != "null"){//} && !window.GameConfigPOST.includes("json_encode")){
            Facade.gameConfig = window.GameConfigPOST;//JSON.parse(window.GameConfigPOST)
        }
        Facade.model.applyConfig(Facade.gameConfig)
        this.stage.removeChild(this.preloaderContainer)
        this.splashScreenContainer.visible = true
        this.mainContainer = new MainContainer()
        this.mainContainer.visible = false
        this.splashScreenContainer.showContinue()
        this.stage.addChild(this.mainContainer)
        Signals.initUI.dispatch()
        document.dispatchEvent(new CustomEvent("show", {}))
        // Signals.balanceUpdate.dispatch(Facade.model.balance)
    }

    onModelInitStored() {
        this.onLoadAssets()
        // this.stage.addChild(this.errorLayout)

        // this.stage.addChild(this.mainContainer)
        // Signals.initUI.dispatch()
        // document.dispatchEvent(new CustomEvent("show", {}))
    }

    onContinueBtnClick = () => {
        this.mainContainer.visible = true
        if(this.splashScreenContainer) {
            this.splashScreenContainer.destroy()
            this.stage.removeChild(this.splashScreenContainer)
            this.splashScreenContainer = null
        }
    }

    onURLParametersParsed(data) {

    }

    webGlIsNotSupported() {
        const title = new Facade.textFactory.getTextWithStyle('hardwareAccelerationSupportTitle')
        const message = new Facade.textFactory.getTextWithStyle('hardwareAccelerationSupport')

        const event = new CustomEvent('showPopup', {
            detail: {
                visible: true,
                innerhtml: `
            <div style="background-color: rgba(100, 100, 100, 1);
        padding: 20px;
        width: 300px;
        margin: auto;
        text-align: center;
        height: 300px;
        color: white;
        border-radius: 20px;
        font-size: 12px">
    <h1 style="text-align: center; color: #FFFFFF">${title.text}</h1>
    <span style="font-size: 20px; text-align: center; color: #FFFFFF">${message.text}</span>
    <br>
    <br>
    <br>
    <br>

    </div>
            `
            }
        })

        document.dispatchEvent(event)
    }
}