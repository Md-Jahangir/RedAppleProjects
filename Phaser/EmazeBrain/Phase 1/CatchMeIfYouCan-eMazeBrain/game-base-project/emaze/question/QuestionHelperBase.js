export default class QuestionHelperBase {

  constructor(question) {
    this.init(question)
  }

  init(question) {
      this.question = question
  }

  isCorrectAnswer(answer){
    return answer.val === this.question.correctAnswer.val
  }

}
