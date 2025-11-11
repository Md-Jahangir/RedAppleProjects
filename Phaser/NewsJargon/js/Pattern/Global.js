class Global {
    constructor() {
        this.jsonObject = "";
        this.jsonVideoObject = '';
        this.correctAnswerData = "";
        this.checkingAnswer = [];
        this.answerCountData = 0;
        this.wrongMessage = ["Come on, you can do it !", "Oh no !", "Try harder", "Better luck,next time !"];
        this.correctMessage = ["yes you have done it !", "Yippie !", "Yay, great going !", "Good !", "Great !", "Excellent !", "Super !"];
        this.fillThaBlanksQuestion = [];
        // console.log("Global");
    };

    GetCorrectAnswerMessage() {
        let min = 0;
        let max = this.correctMessage.length;
        let rnd = Math.floor(Math.random() * (max - min) + min);
        let msg = this.correctMessage[rnd];
        return msg;
    }
    GetWrongAnswerMessage() {
        let min = 0;
        let max = this.wrongMessage.length;
        let rnd = Math.floor(Math.random() * (max - min) + min);
        let msg = this.wrongMessage[rnd];
        return msg;
    }

    // Correct Answer Data Set & Get Method 
    GetCorrectAnswerData() {
        return this.correctAnswerData;
    }
    SetCorrectAnswerData(_newAnswerData) {
        this.correctAnswerData = _newAnswerData;
    }

    // Server Json Object Data Set & Get Method 
    GetJsonObjectData() {
        return this.jsonObject;
    }
    SetJsonObjectData(_jsonobj) {
        this.jsonObject = _jsonobj;
    }
    SetVideoJsonObjectData(_jsonobj){
        console.log('_jsonObj',_jsonobj);
        this.jsonVideoObject = _jsonobj;
    }
    GetVideoJsonObjectData(){
        return this.jsonVideoObject;
    }

    // Answer Counter Set & Get Method 
    GetAnswerCountdata() {
        return this.answerCountData;
    }
    SetAnswerCountData(_answerData) {
        this.answerCountData = _answerData;
    }

    //matching pair set & get method
    GetCorrectAnswer() {
        return this.checkingAnswer;
    }
    SetCorrectAnswer(_checkingAnswer) {
        this.checkingAnswer = _checkingAnswer;
    }

    SetFillTheBlanksQuestion(_data) {
        this.fillThaBlanksQuestion = _data
    }

    GetFillTheBlanksQuestion() {
        return this.fillThaBlanksQuestion;
    }
};



let global = new Global();
export { global as Global };