let baseURL = "http://13.232.173.115:3001";
let scoreURL = "/update-score";
let response = "";
class Score {
    constructor(scene) {
        this.scene = scene;
    }
    GetUrl(apiUrl) {
        return baseURL + apiUrl;
    }
    PostScore(_score){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                response = JSON.parse(this.responseText);
            } else {}
        };
        xhttp.open("POST", this.GetUrl(scoreURL), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("score=" + _score);
    }
}
export default Score;