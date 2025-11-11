import signals from 'signals'
import * as PIXI from "pixi.js";
import LocalizedPIXIText from "./LocalizedPIXIText";

export default class TextFactory {

  constructor (styles, strings, initLocale) {
    this.styles = styles.styles
    this.strings = strings
    let a = this.styles[0]
    this.localeTextArray = []
    this.currLocale = initLocale
    this.actionSignal = new signals.Signal()
  }

  getStyle(identifier) {
    return new PIXI.TextStyle(this.styles[identifier])

  }

  getTextWithStyle = (identifier) => {
    let sn = this.strings[identifier][this.currLocale]['styleName']
    let s = new PIXI.TextStyle(this.styles[sn])
    let text = this.getLocalizedText(identifier)
    let pt = new LocalizedPIXIText(text, s, identifier)

    this.localeTextArray.push(pt)
    return pt
  }

  getContainerTextWithStyle = (identifier) => {
    // for iPhone issue(when used strokeThickness and dropShadow)
    let sn = this.strings[identifier][this.currLocale]['styleName']
    let s = new PIXI.TextStyle(this.styles[sn])
    s.dropShadow = false;
    let text = this.getLocalizedText(identifier)
    let pt = new LocalizedPIXIText(text, s, identifier)
    this.localeTextArray.push(pt)

    s = new PIXI.TextStyle(this.styles[sn+'Under'])
    let pt2 = new LocalizedPIXIText(text, s, identifier)
    this.localeTextArray.push(pt2)

    let container = new PIXI.Container()
    pt.anchor.set(0.5)
    pt2.anchor.set(0.5)
    container.addChild(pt2);
    container.addChild(pt);

    return container
  }

  getStringByIdentifier (identifier, value = null) {
    let text = ''
    if (this.strings[identifier]) {
      if (this.strings[identifier][this.currLocale]) {
        text = this.strings[identifier][this.currLocale].text
      } else {
        text = 'LOCALE NOT FOUND'
      }
    }
    if(value) {
      let str = /<value>/gi
      let newStr = text.replace(str, value)
      return newStr
    }
    return text
  }

  getLocalizedText(identifier) {
    return this.strings[identifier][this.currLocale].text
  }

  isExisted(identifier) {
    return this.strings[identifier]
  }

  changeLocaleAndRefresh (locale) {
    this.currLocale = locale
    for (let i = 0; i < this.localeTextArray.length; i++) {
      this.localeTextArray[i].text = this.getStringByIdentifier(this.localeTextArray[i].identifier)
    }
    this.actionSignal.dispatch({ action: 'changeLocale', data: this.currLocale })
  }
}
