import BaseContainer from "@base/container/BaseContainer";
import BackgroundContainer from "./BackgroundContainer";
import { Signals } from "@/Imports";
import Facade from "@/Facade";
import QuestionContainer from "./QuestionContainer";
import QuestionFactory from "./../question/QuestionFactory";
import GameHelper from "../helpers/GameHelper";


export default class MainContainer extends BaseContainer {

  constructor() {
    super()
    Facade.mainContainer = this
    this.init()
    // this.interactive = false
  }

  init() {
    //Creation back layer
    this.background = new BackgroundContainer()
    this.addChild(this.background)

    Facade.questionFactory = new QuestionFactory()
    Facade.gameHelper = new GameHelper(Facade.model)

    this.questionContainer = new QuestionContainer()
    this.addChild(this.questionContainer)

    window.dispatchEvent(new Event('resize'))
    this.onOrientationChanged(Facade.orientation)

    Signals.graphicsCreated.dispatch()
  }

  onOrientationChanged(orientationSymbol) {
    switch (orientationSymbol) {
      case 'Hd':
      case 'Hm':
        break

      case 'Vm':
        break
    }
  }

}
