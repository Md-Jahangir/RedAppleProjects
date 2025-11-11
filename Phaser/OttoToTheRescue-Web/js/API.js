var access_token;
var registration = "registration";
var updateGameScore = "update_game_score";
var rank;
var total_player;
var API = {
    GetUrl: function(apiUrl){
        return "https://www.redappletech.info/tirechange/api/" + apiUrl;
    },
    Login: function(){
      //   console.log("The Login Url..........."+API.GetUrl(registration));
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // console.log("The Login Url...........",xhttp);
             if (this.readyState == 4 && this.status == 200) {
               // alert(this.responseText);
                console.log("ResponseText.......If"+this.responseText);
                var login_response = JSON.parse(this.responseText);
                access_token = login_response.result.access_token;
                console.log("The access_token..............",login_response.result.access_token);
             }
             else{
               //  console.log("ResponseText.......Else"+this.responseText);
             }
        };
        xhttp.open("POST", "http://www.redappletech.info/tirechange/api/registration", true);
        xhttp.setRequestHeader("Content-type","application/json");
        xhttp.send("Your JSON Data Here");
    },
    UpdateGameScore: function(){
        console.log("The Login Url..........."+API.GetUrl(updateGameScore)+"Access Token.........."+access_token);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                console.log("ResponseText......."+this.responseText);
                var update_game_score = JSON.parse(this.responseText);
                rank = update_game_score.result.rank;
                total_player = update_game_score.result.total_player;
                numberOfPlayerTxt.setText("Du er nummer "+ rank +" av"+ total_player +" spillere");
             }
             else{

             }
        };
        xhttp.open("POST", "http://www.redappletech.info/tirechange/api/update_game_score", true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("access_token="+access_token+"&timmer="+time.timeLabel.text);
    }
}
