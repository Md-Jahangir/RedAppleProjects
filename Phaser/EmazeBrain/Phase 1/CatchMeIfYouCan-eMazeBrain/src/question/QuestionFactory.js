import Facade from "@/Facade";
import Question from "./Question";

export default class QuestionFactory {

  constructor(data) {
    this.init()
  }

  init(data) {
  }

  getQuestion() {
    return new Question()
  }

}