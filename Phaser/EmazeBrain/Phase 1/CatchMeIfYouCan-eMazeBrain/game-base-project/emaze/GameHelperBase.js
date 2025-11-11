export default class GameHelperBase {

  constructor(data) {
    this.init(data)
  }

  init(data) {
      this.data = data
      this.totalScore = 0
  }

  addToScore(level){
    this.totalScore += level*99
  }

}
