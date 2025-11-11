import BaseContainer from "@base/container/BaseContainer";
import * as PIXI from "pixi.js";
import ScaleManager from "@/stage/ScaleManager";
import Facade from "@/Facade";
import { Signals } from "../Imports";

export default class QuestionContainer extends BaseContainer {

  constructor(data) {
    super(data)
    this.init()
  }

  init(data) {
    this.roundsFinished = 0
    this.actual_time_per_question = []
    this.addGameField()
    this.questionHolderContainer = new PIXI.Container()
    this.addChild(this.questionHolderContainer)

    this.addTitle()
    this.addLikes()
    this.addSandWatch()

    Signals.continueBtnClick.addOnce(this.processRoundOnStart, this)
    this.addLevelEndPopup()
    this.addTicker()
    this.interactive = true

    this.onOrientationChanged(Facade.orientation)
  }

  addQuestionContainers() {
    this.positionConfig = {
      "LTR": {
        "mainOptionsContainer1":{x:0, y:0}, "mainOptionsContainer2":{x:0, y:200}, "answerImagesContainer1":{x:850, y:-210}, "answerImagesContainer2":{x:850, y:420}
      },
      "RTL": {
        "mainOptionsContainer1":{x:0, y:0}, "mainOptionsContainer2":{x:0, y:200}, "answerImagesContainer1":{x:-850, y:-210}, "answerImagesContainer2":{x:-850, y:420}
      },
      "TTB": {
        "mainOptionsContainer1":{x:-200, y:100}, "mainOptionsContainer2":{x:200, y:100}, "answerImagesContainer1":{x:-850, y:430}, "answerImagesContainer2":{x:850, y:430}
      },
      "BTT": {
        "mainOptionsContainer1":{x:-200, y:100}, "mainOptionsContainer2":{x:200, y:100}, "answerImagesContainer1":{x:-850, y:-200}, "answerImagesContainer2":{x:850, y:-200}
      }
    }
    this.currentPos = this.positionConfig[Facade.model.movement_direction]
    this.mainOptionsContainer1 = new PIXI.Container()
    this.mainOptionsContainer1.position.set(this.currentPos.mainOptionsContainer1.x, this.currentPos.mainOptionsContainer1.y)
    this.questionHolderContainer.addChild(this.mainOptionsContainer1)
    this.mainOptionsContainer2 = new PIXI.Container()
    this.mainOptionsContainer2.position.set(this.currentPos.mainOptionsContainer2.x, this.currentPos.mainOptionsContainer2.y)
    this.questionHolderContainer.addChild(this.mainOptionsContainer2)
    this.answerImagesContainer1 = new PIXI.Container()
    this.answerImagesContainer1.position.set(this.currentPos.answerImagesContainer1.x, this.currentPos.answerImagesContainer1.y)
    this.questionHolderContainer.addChild(this.answerImagesContainer1)
    this.answerImagesContainer2 = new PIXI.Container()
    this.answerImagesContainer2.position.set(this.currentPos.answerImagesContainer2.x, this.currentPos.answerImagesContainer2.y)
    this.questionHolderContainer.addChild(this.answerImagesContainer2)
    
  }

  addTicker() {
    this.lastUpdate = Date.now()
    this.ticker = new PIXI.Ticker()
    this.ticker.autoStart  = true
    this.ticker.add(deltaTime => {
      if(this.isStarted) {
        this.update(deltaTime, (Date.now()-this.lastUpdate) / (1000/Facade.model.fps) )
        this.lastUpdate = Date.now()
      }
    })
    // setInterval(()=>{
    //   this.update()
    // }, 1000/Facade.model.fps)
  }

  addTitle() {
    this.titleContainer = new PIXI.Container()
    this.titleBack = new PIXI.Sprite(PIXI.Texture.from("game/Downtheygo_title"))
    this.titleBack.anchor.set(0.5)
    this.titleContainer.addChild(this.titleBack)
    this.titleText = new Facade.textFactory.getTextWithStyle('gameTitle')
    this.titleText.anchor.set(0.5)
    this.titleContainer.position.set(0, -400)
    this.titleContainer.addChild(this.titleText)
    this.addChild(this.titleContainer)
  }

  addLikes() {
    this.likesContainer = new PIXI.Container()
    this.addChild(this.likesContainer)
    this.like = new PIXI.Sprite(PIXI.Texture.from("game/Downtheygo_like"))
    this.like.anchor.set(0.5)
    this.like.position.set(-850, -400)
    this.likesContainer.addChild(this.like)
    this.likeCount = new Facade.textFactory.getTextWithStyle('like')
    this.likeCount.position.set(140,0)
    this.like.addChild(this.likeCount)

    this.like2 = new PIXI.Sprite(PIXI.Texture.from("game/Downtheygo_dislike"))
    // this.like2.scale.set(1,-1)
    this.like2.anchor.set(0.5)
    this.like2.position.set(850, -400)
    this.likesContainer.addChild(this.like2)
    this.like2Count = new Facade.textFactory.getTextWithStyle('like')
    this.like2Count.position.set(-140,0)
    this.like2.addChild(this.like2Count)

    this.updateLikes()
  }

  addSandWatch() {
    this.sandWatch = new PIXI.Sprite(PIXI.Texture.from("game/Downtheygo_watch"))
    this.sandWatch.anchor.set(0.5)
    this.sandWatch.position.set(-550, -420)
    this.likesContainer.addChild(this.sandWatch)

    this.questionTimeTxt = new Facade.textFactory.getTextWithStyle('questionTime')
    this.questionTimeTxt.position.set(0,20)
    this.questionTimeTxt.anchor.set(0.5)
    this.sandWatch.addChild(this.questionTimeTxt)
  }

  updateLikes() {
    this.likeCount.text = Facade.model.totalCorrect
    this.like2Count.text = Facade.model.totalinCorrect
    this.likeCount.anchor.set(0.5)
    this.like2Count.anchor.set(0.5)
  }

  addGameField() {
    let backBase = (Facade.model.color_scheme == "cold") ? "backBaseCold" : "backBaseWarm"
    this.gameField = new PIXI.Sprite(PIXI.Texture.from(backBase))
    this.gameField.anchor.set(0.5)
    this.gameField.scale.set(0.92)
    // this.gameField.position.set(0, -120)

    // BLUR BACKGROUND
    // var blurFilter = new PIXI.filters.BlurFilter();
    // this.gameField.filters = [blurFilter]
    // blurFilter.blur = 0

    this.addChild(this.gameField)

    this.misClicks = 0
    this.gameField.on('pointerdown', (e) => {
      this.misClick()
    }, this)
    this.gameField.interactive = true
  }

  misClick(){
    ++this.misClicks
  }

  addLevelEndPopup() {
    this.popupContainer = new PIXI.Container()
    this.popupContainer.visible = false
    this.addChild(this.popupContainer)
    // this.popupBack = new PIXI.Sprite(PIXI.Texture.from("game/questionBack"))
    this.popupBack = this.drawMask(-600, -250, 1200, 500, 0Xffd700)
    this.popupBack.alpha = 0
    this.popupContainer.addChild(this.popupBack)

    this.popupTimeIsUp = new PIXI.Sprite(PIXI.Texture.from("timeIsUp"))
    this.popupTimeIsUp.anchor.set(0.5)
    this.popupTimeIsUp.visible = false
    this.popupContainer.addChild(this.popupTimeIsUp)
    
    this.popuplevelUp = new PIXI.Sprite(PIXI.Texture.from("levelUp"))
    this.popuplevelUp.anchor.set(0.5)
    this.popuplevelUp.visible = false
    this.popupContainer.addChild(this.popuplevelUp)
    
    this.popupText = new Facade.textFactory.getTextWithStyle('popup')
    this.popupText.text = ""
    this.popupContainer.addChild(this.popupText)

    this.popupContainer.on('pointerdown', (e) => {
      this.onPopupClick()
    }, this)
    this.popupContainer.interactive = true
  }

  onPopupClick(){
    this.popuplevelUp.visible = false
    this.popupTimeIsUp.visible = false
    this.popupContainer.visible = false
    this.nextRound()
  }

  showPopup(log, popupBackAlpha = 0, popupDelay = 0, interactive = true) {
    this.popupBack.alpha = popupBackAlpha
    this.popupText.text = log
    this.popupText.anchor.set(0.5)
    this.popupContainer.visible = true
    if(popupDelay){
      this.popupContainer.interactive = false
      setTimeout(()=>{
        this.onPopupClick()
      }, popupDelay)
    }else {
      this.popupContainer.interactive = interactive
    }
  }

  addQuestion() {
    this.optionsOffsetX = 0
    this.optionsOffsetY = 0
    this.isStarted = true
    this.answerSize = [160, 160]
    this.answersContainerSize = Facade.model.answersContainerSize
    this.aw = this.answersContainerSize[0]
    this.ah = this.answersContainerSize[1]
    this.topY = -this.ah/2
    this.bottomY = this.ah/2
    this.rightX = this.aw/2
    this.leftX = -this.aw/2

    Facade.model.previousLevel = Facade.model.currentLevel
    Facade.question = Facade.questionFactory.getQuestion()
    this.addQuestionContainers()

    this.options1 = []
    this.optionsSprites1 = []
    this.options2 = []
    this.optionsSprites2 = []
    let total_options = 2
    for(let i=0; i<total_options; ++i){
      this.addNextOption1()
      this.addNextOption2()
    }
    this.updateOptionsPositions()
    // let time = 1
    // TweenMax.to(this.mainOptionsContainer1, time, {y: -500, ease: "Linear", repeat:-1, onComplete: ()=>{}, onRepeat: ()=>{
    //   console.log("onRepeat")
    // }})
    // TweenMax.to(this.mainOptionsContainer2, time, {y: -500, ease: "Linear", onComplete: ()=>{}})
    this.answersSpeedX = Facade.question.getSpeedX()
    this.answersSpeedY = Facade.question.getSpeedY()
  }
  addNextOption1(){
    this.addNextOption(this.options1, this.optionsSprites1, Facade.question.answers1)
    this.optionsSprites1[0].on("pointerdown", this.onOptions1PointerDown, this)
    this.optionsSprites1[0].interactive = true
  }
  addNextOption2(){
    this.addNextOption(this.options2, this.optionsSprites2, Facade.question.answers2)
    this.optionsSprites2[0].on("pointerdown", this.onOptions2PointerDown, this)
    this.optionsSprites2[0].interactive = true
  }
  addNextOption(options, optionsSprites, answers){
    let option = Facade.question.nextPossibleOption(answers)
    let optionsSprite = new PIXI.Sprite(PIXI.Texture.from(Facade.model.answersConf[option.val].texture))
    optionsSprite.anchor.set(0.5)
    optionsSprite.scale.set(0.9)
    optionsSprite.angle = Facade.question.getRotation()
    optionsSprite.option = option

    options.unshift(option)
    optionsSprites.unshift(optionsSprite)
  }

  onOptions1PointerDown(e, target){
    this.onOptionsPointerDown(e, target, this.options1, this.optionsSprites1, this.mainOptionsContainer1, Facade.question.answers1)
  }
  onOptions2PointerDown(e, target){
    this.onOptionsPointerDown(e, target, this.options2, this.optionsSprites2, this.mainOptionsContainer2, Facade.question.answers2)
  }
  onOptionsPointerDown(e, target, options, optionsSprites, mainOptionsContainer, answers){
    let optionInd = optionsSprites.indexOf(e.target)
    if( (options[optionInd].val == answers[0].val && !answers[0].donot)
      || (options[optionInd].val != answers[0].val && answers[0].donot) ){
      this.processCorrectAnswer()
    }else{
      this.processIncorrectAnswer()
    }
    this.updateLikes()
    e.target.parent.removeChild(e.target)
    // mainOptionsContainer.removeChildren()
    options.splice(optionInd, 1);
    optionsSprites.splice(optionInd, 1);
    // this.updateOptionsPositions()
  }

  updateOptionsPositions(){
    this.updateOptionsPositionsHelp(this.optionsSprites1, this.mainOptionsContainer1)
    this.updateOptionsPositionsHelp(this.optionsSprites2, this.mainOptionsContainer2)
  }
  updateOptionsPositionsHelp(optionsSprites, mainOptionsContainer){
    for(let i=0; i<optionsSprites.length; ++i){
      this.updateOptionPositionHelp(i, optionsSprites, mainOptionsContainer)
      // switch(Facade.model.movement_direction){
      //   case "TTB":
      //     optionsSprites[i].position.set(0, -400+i*100)
      //     break;
      //   case "BTT":
      //     optionsSprites[i].position.set(0, 430-i*100)
      //     break;
      //   case "LTR":
      //     optionsSprites[i].position.set(-1000+i*100, 0)
      //     break;
      //   case "RTL":
      //     optionsSprites[i].position.set(1000-i*100, 0)
      //     break;
      // }
      
      mainOptionsContainer.addChild(optionsSprites[i])
    }
  }
  updateOptionPositionHelp(i, optionsSprites, mainOptionsContainer, forceX = false, forceY = false){
    switch(Facade.model.movement_direction){
      case "TTB":
        optionsSprites[i].position.set(0, this.topY+i*this.answerSize[1])
        break;
      case "BTT":
        optionsSprites[i].position.set(0, this.bottomY-i*this.answerSize[1])
        break;
      case "LTR":
        optionsSprites[i].position.set(this.leftX+i*this.answerSize[0], 0)
        break;
      case "RTL":
        optionsSprites[i].position.set(this.rightX-i*this.answerSize[0], 0)
        break;
    }
    if(forceX !== false) optionsSprites[i].position.x = forceX
    if(forceY !== false) optionsSprites[i].position.y = forceY
  }

  addAnswers() {
    let question = Facade.question
    let answersConf = Facade.model.answersConf
    for(let i=0; i<question.answers1.length; ++i){
      let answer = new PIXI.Sprite(PIXI.Texture.from(answersConf[question.answers1[i].val].texture))
      answer.anchor.set(0.5)
      switch(Facade.model.movement_direction){
        case "TTB":
          answer.position.set(0, -this.answerSize[1]*i)
          break;
        case "BTT":
          answer.position.set(0, this.answerSize[1]*i)
          break;
        case "LTR":
          answer.position.set(-this.answerSize[0]*i, 0)
          break;
        case "RTL":
          answer.position.set(this.answerSize[0]*i, 0)
          break;
      }
      if(question.answers1[i].donot){
        answer.donot = new PIXI.Sprite(PIXI.Texture.from("game/donot"))
        answer.donot.anchor.set(0.5)
        answer.addChild(answer.donot)
      }
      this.answerImagesContainer1.addChild(answer)
    }
    for(let i=0; i<question.answers2.length; ++i){
      let answer = new PIXI.Sprite(PIXI.Texture.from(answersConf[question.answers2[i].val].texture))
      answer.anchor.set(0.5)
      switch(Facade.model.movement_direction){
        case "TTB":
          answer.position.set(0, -this.answerSize[1]*i)
          break;
        case "BTT":
          answer.position.set(0, this.answerSize[1]*i)
          break;
        case "LTR":
          answer.position.set(-this.answerSize[0]*i, 0)
          break;
        case "RTL":
          answer.position.set(this.answerSize[0]*i, 0)
          break;
      }
      if(question.answers2[i].donot){
        answer.donot = new PIXI.Sprite(PIXI.Texture.from("game/donot"))
        answer.donot.anchor.set(0.5)
        answer.addChild(answer.donot)
      }
      this.answerImagesContainer2.addChild(answer)
    }
  }

  onAnswerClick(answer) {
  }

  processCorrectAnswer() {
    Signals.correctAnswer.dispatch()
    Facade.gameHelper.addToScore(Facade.model.currentLevel+1)
    ++Facade.model.questionsCompleted
    ++Facade.model.totalCorrect
    ++Facade.model.totalcorrectInRow
    Facade.model.maxcorrectInRow = Math.max(Facade.model.maxcorrectInRow, Facade.model.totalcorrectInRow)
    Facade.model.incorrectInRow = 0
    if(++Facade.model.correctInRow >= Facade.model.correctAnswersToIncreaseLevel) {
      this.processLevelUp()
    }
  }
  processLevelUp(){
    this.answersSpeedX = Facade.question.getSpeedX()
    this.answersSpeedY = Facade.question.getSpeedY()
    Signals.levelUp.dispatch()
    Facade.model.correctInRow = 0
    Facade.model.currentLevel = Math.min(Facade.model.currentLevel+1, Facade.model.maxLevel)
  }
  processIncorrectAnswer() {
    Signals.incorrectAnswer.dispatch()
    Facade.model.maxcorrectInRow = Math.max(Facade.model.maxcorrectInRow, Facade.model.totalcorrectInRow)
    Facade.model.totalcorrectInRow = 0
    Facade.model.correctInRow = 0
    ++Facade.model.questionsCompleted
    ++Facade.model.totalinCorrect
      if(++Facade.model.incorrectInRow >= Facade.model.incorrectAnswersToDecreaseLevel) {
        this.processLevelDown()
      }
  }
  processLevelDown(){
    this.answersSpeedX = Facade.question.getSpeedX()
    this.answersSpeedY = Facade.question.getSpeedY()
    Signals.levelDown.dispatch()
    Facade.model.incorrectInRow = 0
    Facade.model.currentLevel = Math.max(Facade.model.currentLevel-1, 0)
  }

  nextRound() {
    this.reset()
    this.processRound()
  }

  processRoundOnStart() {
    this.startTime = Date.now()
    this.startQuestionInterval()

    this.processRound()
  }

  processRound() {
    this.addQuestion()
    this.addAnswers()
    this.startRoundInterval()
    // this.startQuestionInterval()
  }

  startQuestionInterval() {
    this.questionStartTime = Date.now()
    clearInterval(this.questionInterval)
    if(Facade.model.time_to_play>0){
        this.timeLeft = Facade.model.time_to_play
        this.updateQuestionTime()
        this.questionInterval = setInterval(()=>{
            this.questionTimeUpdate()
        }, 1000)
    }else{
      this.questionTimeTxt.visible = false
    }
  }

  startRoundInterval() {
    if(this.roundsFinished >= 2) return
    let timeLeft = 1000 * Facade.model.time_to_play / 3
    setTimeout(()=>{
      this.roundFinishedInterval()
    }, timeLeft)
  }
  roundFinishedInterval(){
    ++this.roundsFinished
    this.nextRound()
  }

  questionTimeUpdate() {
    --this.timeLeft
    this.updateQuestionTime()
    if(this.timeLeft <= 0){
      clearInterval(this.questionInterval)
      this.updateLikes()
      this.timeIsUp()
    }
  }

  updateQuestionTime() {
    this.questionTimeTxt.text = parseInt(this.timeLeft/60)+":"+("0" + this.timeLeft%60).slice(-2)
  }

  disableAnswers() {
    for(let i=0; i<this.optionsSprites1.length; ++i){
      this.optionsSprites1[i].interactive = false
    }
    for(let i=0; i<this.optionsSprites2.length; ++i){
      this.optionsSprites2[i].interactive = false
    }
    // this.optionSprite.interactive = false
  }

  gameFinish() {
    Signals.gameFinish.dispatch()
    this.isStarted = false
    this.disableAnswers()
    this.popuplevelUp.visible = false
    this.popupTimeIsUp.visible = false
    this.questionInterval && clearInterval(this.questionInterval)
    this.timeIsUpTimeout && clearTimeout(this.timeIsUpTimeout)

    let timePlayedInMS = Date.now() - this.startTime
    let timePlayed = new Date(timePlayedInMS).toISOString().slice(11,19)
    let log = "RESULTS:"
    // let log = "TOTAL: "+Facade.model.questionsCompleted+"\nCORRECT: "+Facade.model.totalCorrect+"\ntimePlayed: "+timePlayed+"\nINFO: "+Facade.model.brain_help
    // this.showPopup(log, 0.8, 0, false)

    let level = Facade.model.previousLevel + 1
    let correct_answers = Facade.model.totalCorrect
    let incorrect_answers = Facade.model.questionsCompleted - Facade.model.totalCorrect
    let accuracy = (Facade.model.questionsCompleted / (Facade.model.questionsCompleted+this.misClicks)).toFixed(2)  // number of clicks (if >1),0/1-If the user missed the target up to 50% of the target size from the target
    let total_time = timePlayed
    let average_answer_time = ( (timePlayedInMS/1000) / Facade.model.questionsCompleted ).toFixed(1)
    let datetime = new Date(Date.now()).toISOString()
    let combo = Facade.model.maxcorrectInRow
    // let score = level*correct_answers*99
    let score = Facade.gameHelper.totalScore
    let actual_time_per_question = this.actual_time_per_question
    let GID = Facade.model.GID
    log += "\nGID: "+GID
    log += "\nlevel: "+level
    log += "\ncorrect_answers: "+correct_answers
    log += "\nincorrect_answers: "+incorrect_answers
    log += "\naccuracy: "+accuracy
    log += "\ntotal_time: "+total_time
    log += "\naverage_answer_time: "+average_answer_time
    log += "\ndatetime: "+datetime
    log += "\ncombo: "+combo
    log += "\nscore: "+score
    log += "\nactual_time_per_question: "+actual_time_per_question
    this.showPopup(log, 0.8, 0, false)

    let infoAPI = {
      game_id: 7,
      level: level,
      correct_answers: correct_answers,
      incorrect_answers: incorrect_answers,
      accuracy: accuracy,
      total_time: total_time,
      average_answer_time: average_answer_time,
      datetime: datetime,
      combo: combo,
      score: score,
      actual_time_per_question: actual_time_per_question,
      GID: GID
    }
    Signals.sendAPI.dispatch(infoAPI)
  }

  timeIsUp() {
    this.gameFinish()
  }

  reset() {
    Facade.currentOption = null
    this.optionsSprites1 = []
    this.optionsSprites2 = []
    this.options1 = []
    this.options2 = []
    this.optionsOffsetY = 0
    this.optionsOffsetX = 0
    this.questionHolderContainer.removeChildren()
  }

  update(deltaTime, timeScale = 1) {
    if(this.isStarted) {
      this.optionsOffsetY += this.answersSpeedY * timeScale
      this.optionsOffsetX += this.answersSpeedX * timeScale
      this.updateOptions(deltaTime, timeScale, Facade.question.answers1, this.options1, this.optionsSprites1, this.mainOptionsContainer1)
      this.updateOptions(deltaTime, timeScale, Facade.question.answers2, this.options2, this.optionsSprites2, this.mainOptionsContainer2)
      if(this.optionsOffsetY<-this.answerSize[1]){
        this.optionsOffsetY = 0
        this.addNextOption1()
        this.updateOptionPositionHelp(0, this.optionsSprites1, this.mainOptionsContainer1)
        this.mainOptionsContainer1.addChild(this.optionsSprites1[0])

        this.addNextOption2()
        this.updateOptionPositionHelp(0, this.optionsSprites2, this.mainOptionsContainer2)
        this.mainOptionsContainer2.addChild(this.optionsSprites2[0])
      }
      if(this.optionsOffsetY>this.answerSize[1]){
        this.optionsOffsetY = 0
        this.addNextOption1()
        this.updateOptionPositionHelp(0, this.optionsSprites1, this.mainOptionsContainer1, 0, this.topY)
        this.mainOptionsContainer1.addChild(this.optionsSprites1[0])

        this.addNextOption2()
        this.updateOptionPositionHelp(0, this.optionsSprites2, this.mainOptionsContainer2, 0, this.topY)
        this.mainOptionsContainer2.addChild(this.optionsSprites2[0])
      }
      if(this.optionsOffsetX<-this.answerSize[0]){
        this.optionsOffsetX = 0
        this.addNextOption1()
        this.updateOptionPositionHelp(0, this.optionsSprites1, this.mainOptionsContainer1, this.rightX, 0)
        this.mainOptionsContainer1.addChild(this.optionsSprites1[0])

        this.addNextOption2()
        this.updateOptionPositionHelp(0, this.optionsSprites2, this.mainOptionsContainer2, this.rightX, 0)
        this.mainOptionsContainer2.addChild(this.optionsSprites2[0])
      }
      if(this.optionsOffsetX>this.answerSize[0]){
        this.optionsOffsetX = 0
        this.addNextOption1()
        this.updateOptionPositionHelp(0, this.optionsSprites1, this.mainOptionsContainer1, this.leftX, 0)
        this.mainOptionsContainer1.addChild(this.optionsSprites1[0])

        this.addNextOption2()
        this.updateOptionPositionHelp(0, this.optionsSprites2, this.mainOptionsContainer2, this.leftX, 0)
        this.mainOptionsContainer2.addChild(this.optionsSprites2[0])
      }
    }
  }
  updateOptions(deltaTime, timeScale, answers, options, optionsSprites, mainOptionsContainer){
    for(let i=0; i<optionsSprites.length; ++i){
      if(Facade.model.movement_type == "intervals"){
        if(++optionsSprites[i].intervalMovesCnt >= Facade.model.intevalMovesSkip){
          optionsSprites[i].intervalMovesCnt = 0
          optionsSprites[i].x += this.answersSpeedX * Facade.model.intevalMovesSkip * timeScale
          optionsSprites[i].y += this.answersSpeedY * Facade.model.intevalMovesSkip * timeScale
        }
      }else{
        optionsSprites[i].x += this.answersSpeedX * timeScale
        optionsSprites[i].y += this.answersSpeedY * timeScale
      }
      if(optionsSprites[i].y<this.topY){
        let optionInd = i
        if( (options[optionInd].val == answers[0].val && !answers[0].donot)
          || (options[optionInd].val != answers[0].val && answers[0].donot) ){
          this.processIncorrectAnswer()
        }
        this.updateLikes()
        optionsSprites[i].parent.removeChild(optionsSprites[i])
        options.splice(optionInd, 1);
        optionsSprites.splice(optionInd, 1);
      }else if(optionsSprites[i].y>this.bottomY){
        let optionInd = i
        if( (options[optionInd].val == answers[0].val && !answers[0].donot)
          || (options[optionInd].val != answers[0].val && answers[0].donot) ){
          this.processIncorrectAnswer()
        }
        this.updateLikes()
        optionsSprites[i].parent.removeChild(optionsSprites[i])
        options.splice(optionInd, 1);
        optionsSprites.splice(optionInd, 1);
      }else if(optionsSprites[i].x<this.leftX){
        let optionInd = i
        if( (options[optionInd].val == answers[0].val && !answers[0].donot)
          || (options[optionInd].val != answers[0].val && answers[0].donot) ){
          this.processIncorrectAnswer()
        }
        this.updateLikes()
        optionsSprites[i].parent.removeChild(optionsSprites[i])
        options.splice(optionInd, 1);
        optionsSprites.splice(optionInd, 1);
      }else if(optionsSprites[i].x>this.rightX){
        let optionInd = i
        if( (options[optionInd].val == answers[0].val && !answers[0].donot)
          || (options[optionInd].val != answers[0].val && answers[0].donot) ){
          this.processIncorrectAnswer()
        }
        this.updateLikes()
        optionsSprites[i].parent.removeChild(optionsSprites[i])
        options.splice(optionInd, 1);
        optionsSprites.splice(optionInd, 1);
      }
      
      // if(this.optionsSprites1[i].x>this.aw/2) this.optionsSprites1[i].x = -this.aw/2
      // if(this.optionsSprites1[i].y>this.ah/2) this.optionsSprites1[i].y = -this.ah/2
      // if(this.optionsSprites1[i].x<-this.aw/2) this.optionsSprites1[i].x = this.aw/2
      // if(this.optionsSprites1[i].y<-this.ah/2) this.optionsSprites1[i].y = this.ah/2

      // this.optionsSprites1[i].angle -= this.optionsSprites1[i].rotationSpeed
    }
    
    // if(this.optionsOffsetY<-this.answerSize[1]){
    //   this.optionsOffsetY = 0
    //   this.addNextOption1()
    //   this.updateOptionPositionHelp(0, optionsSprites, mainOptionsContainer)
    //   mainOptionsContainer.addChild(optionsSprites[0])
    // }
  }

  drawMask(x, y, w, h, colour=0x0FF000) {
    let mask = new PIXI.Graphics()
    mask.beginFill(colour)
    mask.drawRect(x, y, w, h)
    mask.endFill()
    return mask
  }

  onOrientationChanged(orientationSymbol) {
    switch (orientationSymbol) {
      case 'Hd':
      case 'Hm':
        break

      case 'Vm':
        break
    }
    this.position.set(ScaleManager.center.x, ScaleManager.center.y)
  }

}
