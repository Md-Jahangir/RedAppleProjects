import { GameArchitechture } from "./GameArchitechture.js";
import { LoadAssets } from "./LoadAssets.js";
import { DataBaseManager } from "./DataBaseManeger.js";
class Database {
    constructor() {
        this.bgType;
        //----GeneralData----------------------------//
        this.factor;
        this.bg_image_location;
        this.main_image_location;
        this.color_scheme
        this.answer_location;
        this.answer_location_spread;
        this.answer_location_spread_value;
        this.movement_direction;
        this.rotation;
        this.rotation_time;
        this.level_down;
        this.level_up;
        this.movement_time;
        this.movement_type;
        this.responseUrl;
        //----Specific Data------------//
        this.high_score;
        this.lastHighestScore;
        this.success_rate;
        this.level;
        this.time_to_play;
        this.number_of_questions;
        this.brain_help;
        this.game_instruction;
        this.time_per_question;
        this.number_of_object;
        this.number_of_distractor;
        this.title;
    };
    ParseAndStore(_json) {
        let jsonData = _json; //JSON.stringify(_json);
        console.log("json data", jsonData);
        this.lastHighestScore = jsonData.lastHighestScore;
        //==========Storing JSON DATA ================//
        this.average_answer_time = jsonData.specific.average_answer_time;


        if (this.average_answer_time == null || this.average_answer_time == undefined) {
            this.average_answer_time = 5000;
        }


        //updated bg image cdn location and main image cdn location
        this.bg_image_location = jsonData.updated_bg_images_cdn_location;
        this.main_image_location = jsonData.updated_main_images_cdn_location;


        this.GeneralDataStore(jsonData.general);
        this.SpecificDataStore(jsonData.specific);
    };
    GeneralDataStore(_data) //=======>  Storing General data  <==============//
    {
        this.factor = _data.factor;
        // this.bg_image_location = _data.bg_images_cdn_location;
        // console.log('bg_image_location', this.bg_image_location)
        // this.main_image_location = _data.main_images_cdn_location;
        // console.log('this.main', this.main_image_location)
        // console.log('this.bg', this.bg_image_location)
        this.color_scheme = _data.color_scheme;
        this.answer_location = _data.answers_location;
        this.answer_location_spread = _data.answers_location_spread;
        this.answer_location_spread_value = _data.answers_location_spread_value;
        this.movement_direction = _data.movement_direction;
        this.rotation = _data.rotation;
        this.rotation_time = _data.rotation_time;
        this.level_down = _data.level_down;
        this.level_up = _data.level_up;
        this.movement_time = _data.movement_time;
        this.movement_type = _data.movement_type;
        this.auto_correct = _data.auto_correct;
        this.responseUrl = _data.response_url;
    };
    SpecificDataStore(_data) //====> Storing Special data <=================//
    {
        this.high_score = _data.high_score;
        this.success_rate = _data.success_rate;
        this.level = _data.level;
        this.time_to_play = _data.time_to_play;
        this.number_of_questions = _data.number_of_questions;
        this.brain_help = _data.brain_help;
        this.game_instruction = _data.game_instructions;
        this.time_per_question = _data.time_per_question;
        this.number_of_object = _data.number_of_object;
        this.number_of_distractor = _data.number_of_distractors;
        this.title = _data.title;
    };
    GetGeneralData(_param) //=======>  Retrive General data  <==============//
    {
        switch (_param) {
            case "factor":
                return this.factor;
            case "bg_image_location":
                return this.bg_image_location;
            case "main_image_location":
                return this.main_image_location;
            case "color_scheme":
                return this.color_scheme;
            case "answer_location":
                return this.answer_location;
            case "answer_location_spread":
                return this.answer_location_spread;
            case "answer_location_spread_value":
                return this.answer_location_spread_value;
            case "movement_direction":
                return this.movement_direction;
            case "rotation":
                return this.rotation;
            case "rotation_time":
                return this.rotation_time;
            case "level_down":
                return this.level_down;
            case "level_up":
                return this.level_up;
            case "movement_time":
                return this.movement_time;
            case "movement_type":
                return this.movement_type;
            case "auto_correct":
                return this.auto_correct;
        }
    };
    GetSpecificData(_param) //====> Retrive Special data <=================//
    {
        switch (_param) {
            case "high_score":
                return this.high_score;
            case "success_rate":
                return this.success_rate;
            case "level":
                return this.level;
            case "time_to_play":
                return this.time_to_play;
            case "number_of_questions":
                return this.number_of_questions;
            case "brain_help":
                return this.brain_help;
            case "game_instruction":
                return this.game_instruction;
            case "time_per_question":
                console.log('timePerQuestion : ', this.time_per_question);
                return this.time_per_question;
            case "number_of_object":
                return this.number_of_object;
            case "number_of_distractor":
                return this.number_of_distractor;
        }
    };
    StoreImageData(_this, _db) //===> Storing Image JSON data <====================//
    {
        let location, i, j;
        //========================
        let wholeJSon = JSON.parse(localStorage.getItem("TheShadowerImageJson")); //_this.cache.json.get('imageJson');
        let gameJSon = JSON.parse(localStorage.getItem("TheShadowerJsonData")); //_this.cache.json.get('jsonData');
        let base_url = wholeJSon.base_url;
        let bgImageLocatins;
        let normalImageLocations = [];
        let random = (Math.random());
        let colorScheme;
        bgImageLocatins = wholeJSon.bg_images;
        normalImageLocations = wholeJSon.main_images;
        _db.bg_image_location = [...bgImageLocatins];
        _db.main_image_location = [...normalImageLocations];
        GameArchitechture.GameArchitechtureInitiallize();
        LoadAssets.LoadDataFromUrl(LoadAssets, _this);
    };
};
let GameDatabase = new Database();

export { GameDatabase as Database };