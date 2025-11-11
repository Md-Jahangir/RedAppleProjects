import * as PIXI from "pixi.js";

export default class LocalizedPIXIText extends PIXI.Text {
  constructor (text, style, identifier = null) {
    super(text, style)
    this.identifier = identifier
  }
}
