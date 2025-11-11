import * as PIXI from "pixi.js";
import { Signals} from "@/Imports";

export default class BaseContainer extends PIXI.Container {

  constructor() {
    super()
    Signals.orientationChanged.add(this.onOrientationChanged, this)
  }

  init() {
    throw error(`Method Init is not implemented!`)
  }

  onOrientationChanged(orientationSymbol) {

  }

}