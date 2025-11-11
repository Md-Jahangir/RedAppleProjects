import Facade from "@/Facade";
import QuestionHelperBase from "@base/emaze/question/QuestionHelperBase";

export default class QuestionHelper extends QuestionHelperBase {

  constructor(question) {
    super(question)
  }

  init(question) {
      this.question = question
  }

  isCorrectAnswer(answer){
    return answer.val === this.question.correctAnswer.val
  }

  getRotation() {
    let level = Facade.model.currentLevel
    let rotation = 0
    if(level>=15){
      rotation = Math.round(Math.random()*35)*10
    }
    return rotation
  }
  getSpeedX() {
    let level = Facade.model.currentLevel
    let movement_time = Math.max(Facade.model.movement_time - level*0.25, Facade.model.minMovementTime)
    let speedX = Facade.model.answersContainerSize[0] / movement_time / Facade.model.fps
    if(!Facade.model.speedX) speedX = 0
    // if(Facade.model.currentLevel<15) speedX = 0
    else if(Facade.model.speedX<0){
      speedX = -speedX
    }
    return speedX
  }
  getSpeedY() {
    let level = Facade.model.currentLevel
    let movement_time = Math.max(Facade.model.movement_time - level*0.25, Facade.model.minMovementTime)
    let speedY = Facade.model.answersContainerSize[0] / movement_time / Facade.model.fps
    if(!Facade.model.speedY) speedY = 0
    // if(Facade.model.currentLevel<15) speedY = 0
    else if(Facade.model.speedY<0){
      speedY = -speedY
    }
    return speedY
  }

}
