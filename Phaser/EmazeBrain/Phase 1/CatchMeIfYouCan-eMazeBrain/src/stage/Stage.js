import * as PIXI from "pixi.js"
import ScaleManager from "./ScaleManager";
import Config from "../config/Config";
// import { TweenMax } from "gsap";


export default class Stage {
  constructor () {
    const canvas = document.getElementById('gameCanvas')

      this.app = new PIXI.Application({
        view: canvas,
        legacy: true,
        antialias: true,
        preserveDrawingBuffer: true,
        sharedLoader: true,
        width: 2000,
        height: 2000
      })

      // TweenMax.ticker.sleep();
      // this.app.ticker.add(() => {
      //   TweenMax.ticker.tick();
      // });

      new ScaleManager(this.app)

      window.app = this.app
      Config.app = this.app

      return this.app.stage
  }

}