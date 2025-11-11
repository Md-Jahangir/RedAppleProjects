import GameStatesEnum from "../states/GameStatesEnum";
import { Signals} from "@/Imports";
import Facade from '@/Facade'
import { GameStateMachine } from "../Imports";
import Utils from "@base/utils/Utils";
import Config from "@/config/Config";
import FormatData from "@/application/FormatData";

export default class Model {
  constructor () {
    Facade.model = this
    this.start()
  }

  start() {
    this.fps = 60
    this.answersContainerSize = [1640, 700]

    this.maxLevel = 25
    this.currentLevel = 0
    this.previousLevel = this.currentLevel
    this.totalCorrect = 0
    this.totalinCorrect = 0
    this.correctAnswersToIncreaseLevel = 2
    this.incorrectAnswersToDecreaseLevel = 2

    this.correctInRow = 0
    this.incorrectInRow = 0
    this.totalcorrectInRow = 0
    this.maxcorrectInRow = 0

    //movement
    this.speedX = 0
    this.speedY = 0

    this.questionsCompleted = 0

    this.stateMachine = new GameStateMachine(this, GameStatesEnum)
    this.stateMachine.setState(GameStatesEnum.INIT)
    this.numbersFixed = 2
  }

  applyConfig(config) {
    this.factor = config.general.factor
    this.color_scheme = config.general.color_scheme
    this.answers_location = config.general.answers_location
    this.answers_location_spread = config.general.answers_location_spread
    this.answers_location_spread_value = config.general.answers_location_spread_value
    this.movement_direction = config.general.movement_direction
    this.rotation = config.general.rotation
    // this.rotation_speed = config.general.rotation_speed
    this.rotation_time = config.general.rotation_time
    this.minRotationTime = 4
    this.level_down = config.general.level_down
    this.level_up = config.general.level_up
    this.movement_time = config.general.movement_time
    this.minMovementTime = 3
    this.movement_type = config.general.movement_type
    this.intevalMovesSkip = 10
    this.GID = config.general.GID

    this.high_score = config.specific.high_score
    this.success_rate = config.specific.success_rate
    this.level = config.specific.level
    this.time_to_play = config.specific.time_to_play
    this.number_of_questions = config.specific.number_of_questions
    this.brain_help = config.specific.brain_help
    this.game_instructions = config.specific.game_instructions
    this.time_per_question = config.specific.time_per_question
    this.number_of_object = config.specific.number_of_object
    this.number_of_distractors = config.specific.number_of_distractors

    //HANDLING
    if(config.general.level_down) this.incorrectAnswersToDecreaseLevel = config.general.level_down
    if(config.general.level_up) this.correctAnswersToIncreaseLevel = config.general.level_up

    // this.maxRotationSpeed = config.specific.max_rotation_speed // 5
    // this.rotationLevelStep = config.specific.rotation_level_step // 0.5

    // this.speedLevelStep = config.specific.speed_level_step // 0.5
    this.maxSpeedX = this.answersContainerSize[0] / this.minMovementTime / this.fps // config.specific.max_speedX // 15
    this.maxSpeedY = this.answersContainerSize[0] / this.minMovementTime / this.fps // config.specific.max_speedY // 15
    
    if(config.general.movement_time) {
      this.movement_speed = this.answersContainerSize[0] / config.general.movement_time / this.fps
      switch(config.general.movement_direction){
        case "RTL":
          this.speedX = -this.movement_speed
          break;
        case "LTR":
          this.speedX = this.movement_speed
          break;
        case "TTB":
          this.speedY = this.movement_speed
          break;
        case "BTT":
          this.speedY = -this.movement_speed
          break;
        case "RTLD":
          this.speedX = -this.movement_speed
          this.speedY = this.movement_speed
          break;
        case "LTRD":
          this.speedX = this.movement_speed
          this.speedY = this.movement_speed
          break;
      }
    }

    if(config.specific.level){
      this.previousLevel = this.currentLevel = config.specific.level - 1
    }

    this.answersConf = [
      { texture: "game/Downtheygo_Bear" },
      { texture: "game/Downtheygo_Buck" },
      { texture: "game/Downtheygo_cat" },
      { texture: "game/Downtheygo_elephant" },
      { texture: "game/Downtheygo_lion" },
      { texture: "game/Downtheygo_panda" },
      { texture: "game/Downtheygo_pug" },
      { texture: "game/Downtheygo_rabbit" },
      { texture: "game/Downtheygo_tiger" },
      { texture: "game/Downtheygo_white_Bear" }
    ]

    if(this.color_scheme == "cold"){
      this.answersConf = [
        { texture: "game/seahorses_cold/sea_horse_# (4)" },
        { texture: "game/seahorses_cold/sea_horse_# (5)" },
        { texture: "game/seahorses_cold/sea_horse_# (6)" },
        { texture: "game/seahorses_cold/sea_horse_# (7)" },
        { texture: "game/seahorses_cold/sea_horse_# (8)" },
        { texture: "game/seahorses_cold/sea_horse_# (9)" },
        { texture: "game/seahorses_cold/sea_horse_# (10)" },
        { texture: "game/seahorses_cold/sea_horse_# (11)" },
        { texture: "game/seahorses_cold/sea_horse_# (12)" },
        { texture: "game/seahorses_cold/sea_horse_# (13)" },
        { texture: "game/seahorses_cold/sea_horse_# (14)" },
        { texture: "game/seahorses_cold/sea_horse_# (15)" },
        { texture: "game/seahorses_cold/sea_horse_# (16)" },
        { texture: "game/seahorses_cold/sea_horse_# (17)" },
        { texture: "game/seahorses_cold/sea_horse_# (18)" },
        { texture: "game/seahorses_cold/sea_horse_# (19)" },
        { texture: "game/seahorses_cold/sea_horse_# (21)" },
        { texture: "game/seahorses_cold/sea_horse_# (22)" },
        { texture: "game/seahorses_cold/sea_horse_# (23)" },
        { texture: "game/seahorses_cold/sea_horse_# (24)" },
      ]
    }
  }

  set initRawData (data) {
    Signals.modelInitStored.dispatch()
  }

}