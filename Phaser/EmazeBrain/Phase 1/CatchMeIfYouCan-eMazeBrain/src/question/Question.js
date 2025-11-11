import Facade from "@/Facade";
import QuestionBase from "@base/emaze/question/QuestionBase";
import QuestionHelper from "./QuestionHelper";

export default class Question extends QuestionBase {

  constructor(data) {
    super()
  }

  init() {
    let level = Facade.model.currentLevel
    this.sameOptionsInARow = 0
    this.possible_answers = 8
    this.helper = new QuestionHelper(this)
    this.answers1 = this.getAnswers()
    this.answers2 = this.getAnswers(this.answers1)

    let extra_images = Math.min( 3, parseInt(level/3) )
    this.answers3 = (extra_images>0) ? this.getAnswers(this.answers1.concat(this.answers2), extra_images) : []
  }

  getAnswers( doNotAnswers=[], total_images=1 ){
    let level = Facade.model.currentLevel
    let max_images = 4
    // let total_images = 1 //Math.min(max_images, 1 + parseInt(level/6))
    let answer
    let answers = []
    for(let i=0; i<total_images; ++i){
      do{
        answer = this.getRandPossibleAnswer()
      }while(this.isAnswerInList(answer, doNotAnswers) || this.isAnswerInList(answer, answers))
      answers.push(answer)
    }
    return answers
  }

  getRandPossibleAnswer() { // answers for "correct" lists
    //TODO: handle "do not" sign here
    let level = Facade.model.currentLevel
    let val = Math.round(Math.random()*(this.possible_answers-1))
    let donot = (level>1 && Math.random()>0.5) ? true : false
    let answer = { val: val, donot: donot }
    return answer
  }

  nextPossibleOption(answers) { // answer in main queue
    let level = Facade.model.currentLevel
    // let val = Math.round(Math.random()*(this.possible_answers-1))
    // let option = {val: val}
    let arr = this.answers1.concat(this.answers2)
    arr = arr.concat(this.answers3)
    let option = answers[Math.round(Math.random()*(answers.length-1))] // arr[Math.round(Math.random()*(arr.length-1))]
    let isRandChance = Math.max(0, 0.75 - 0.15*parseInt(level/6))
    isRandChance = 0.5 //Math.max(0, isRandChance - 0.15*this.sameOptionsInARow)
    if(Math.random()<isRandChance){
      while(this.isAnswerInList(option, answers)){
        option = arr[Math.round(Math.random()*(arr.length-1))]
      }
    }
    if(option.val == Facade.currentOption?.val) ++this.sameOptionsInARow
    else this.sameOptionsInARow = 0
    return option
  }
  nextPossibleOption1(){
    return this.nextPossibleOption(this.answers1)
  }
  nextPossibleOption2(){
    return this.nextPossibleOption(this.answers2)
  }

  isAnswerInList(answer, answersList) {
    for(let i=0; i<answersList.length; ++i){
      if(answer.val === answersList[i].val){
        return true
      }
    }
    return false
  }

  isCorrectAnswer(answer){
    return this.helper.isCorrectAnswer(answer)
  }

  getRotation() {
    return this.helper.getRotation()
  }
  getSpeedX() {
    return this.helper.getSpeedX()
  }
  getSpeedY() {
    return this.helper.getSpeedY()
  }

}
