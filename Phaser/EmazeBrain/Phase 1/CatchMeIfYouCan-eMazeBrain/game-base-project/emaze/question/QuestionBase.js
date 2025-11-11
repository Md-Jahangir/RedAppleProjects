import QuestionHelperBase from "./QuestionHelperBase";

export default class QuestionBase {

  constructor(data) {
    this.init()
  }

  init() {
      this.helper = new QuestionHelperBase(this)
  }

}
