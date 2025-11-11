import { Signals} from "@/Imports";
import Config from "../config/Config"
import "pixi-assetslist-loader"
import * as PIXI from "pixi.js"
import * as WebFont from "webfontloader";

export default class ApplicationLoader {

  loadPreloadingAssets() {
    PIXI.Loader.shared.add("./assets/json/preloaderAssets.json");
    PIXI.Loader.shared.onComplete.once(this.onLoadPreloadingAssetsComplete)
    PIXI.Loader.shared.load()
  }

  loadMainGameAssets() {
    PIXI.Loader.shared.add("./assets/json/AssetsConfig.json");
    PIXI.Loader.shared.onComplete.once(this.onLoadMainGameAssetsComplete)
    PIXI.Loader.shared.onProgress.add((e) => {
      Signals.loadingProgress.dispatch(e.progress * 4/5)
    })
    PIXI.Loader.shared.load()
  }

//private
  onLoadPreloadingAssetsComplete = () => {
    this.loadPreloadFonts()
  }

//private
  onLoadMainGameAssetsComplete = () => {
    const entries = Object.entries(PIXI.Loader.shared.resources)
    this.textures = []
    for (let i = 0; i < entries.length; i ++) {
      let res = entries[i][1]
      if (res.texture) {
        this.textures.push(res.texture)
      }
    }

    //Config.app.renderer.plugins.prepare.upload(entries[35][1].texture, () => {})
    this.prepare(this.textures, 0)
  }
  //private
  loadPreloadFonts() {
    this.fonts = ['Euphorigenic']
    WebFont.load({
      custom: {
        families: this.fonts,
        urls: ['./assets/font/fonts/preloaderfonts.css']
      },
      active: (event) => {
        setTimeout(() => {
          Signals.preloaderAssetsLoadingComplete.dispatch()
        }, 150); //1500
      }
    });
  }

   //private
  loadFonts() {
    this.fonts = ['Gobold', 'Happy-School', 'Balqis']
    let process = 88;

    Signals.loadingProgress.dispatch(process)

    WebFont.load({
      custom: {
        families: this.fonts,
        urls: ['./assets/font/fonts/fonts.css']
      },
      active: (event) => {
        Signals.loadingProgress.dispatch(100)
        setTimeout(() => {
          //Signals.preloaderAssetsLoadingComplete.dispatch()
          Signals.mainGameAssetsLoadingComplete.dispatch()
        }, 150); //1500
      },
      fontloading: (familyName, fvd) => {
        process +=3;
        Signals.loadingProgress.dispatch(process )
      }
    });
  }

//private
  prepare = (textures, index) => {
    Config.app.renderer.plugins.prepare.upload(textures[index], () => {
      if(index + 1 <= this.textures.length - 1) {
        this.prepare (textures, index + 1)
      } else {
        //Signals.mainGameAssetsLoadingComplete.dispatch()
        this.loadFonts()
      }
    });
  }

}
