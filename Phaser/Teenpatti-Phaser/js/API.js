var API = {
    GetUrl: function(apiUrl){
        return BaseUrL + apiUrl;
    },
    Login: function(){
        console.log("The Login Url..........."+API.GetUrl(loginUrl) + "Database userid........."+user_id);
        Loading.ShowLoadingPopUp();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                console.log("ResponseText......."+this.responseText);
                var login_response = JSON.parse(this.responseText);
		if(login_response.status == '5'){
			console.log("My ResponseText...."+session_id+"..."+login_response.message);	
			
			//return;
		}
                Menu.prototype.ParseLoginData(login_response);
                Menu.prototype.CreateMenuPage();
             }
             else{
                //Menu.prototype.CreateMenuPage();
             }
        };
        xhttp.open("POST", API.GetUrl(loginUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("user_id="+user_id);
    },
    Logout: function(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                //  alert(this.responseText);
                 Debug.log("ResponseText......."+this.responseText);
                 console.log("ResponseText......."+this.responseText);
                 var myArr = JSON.parse(this.responseText);
                 console.log("The Array Length......"+myArr.status + "kdlfds" + myArr.result.url);
                 window.open(myArr.result.url, "_self");
                 return this.responseText;
             }
             else{
                // window.open(myArr.result.url, "_self");
             }
        };
        xhttp.open("POST", API.GetUrl(logoutUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access_token", session_id);
        xhttp.send("action="+"logout");
    },
    GetBalance: function(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                 alert(this.responseText);
                 Debug.log("ResponseText......."+this.responseText);
                 var myArr = JSON.parse(this.responseText);
                 Debug.log("The Array Length......"+myArr.code + "kdlfds" + myArr.result.data1);
                 return this.responseText;
             }
        };
        xhttp.open("POST", getBalanceUrl, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("action="+"get_balance"+"&user_id="+Database.user_id+"&session_id="+Database.session_id);
    },
    SetBalance: function(){
console.log("roni test is in here");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                 alert(this.responseText);
                 Debug.log("ResponseText......."+this.responseText);
                 var myArr = JSON.parse(this.responseText);
                 Debug.log("The Array Length......"+myArr.code + "kdlfds" + myArr.result.data1);
                 return this.responseText;
             }
        };
        xhttp.open("POST", setBalanceUrl, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("action="+"set_balance"+"&user_id="+Database.user_id+"&session_id="+Database.session_id+"&user_amount="+Database.user_amount+"&reason="+"12");
    },
    SetProfilePic: function(){
        Loading.ShowLoadingPopUp();
        console.log("Session id..........."+Database.session_id);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                 console.log("ResponseText......."+this.responseText);
                 var setProfilePicResponse = JSON.parse(this.responseText);
                 _profile_picture.loadTexture(setProfilePicResponse.result.avatar_id);
                 ChangePicturePopUp.PopUpCloseAnimation();
                 Loading.HideLoadingPopUp();
             }
             else{
                Loading.HideLoadingPopUp();
             }
        };
        xhttp.open("POST", API.GetUrl(setProfilePicUrl), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access_token", session_id);
        xhttp.send("avatar_id="+user_image);
    },
    GetProfileDetails: function(){
        Loading.ShowLoadingPopUp();
        console.log("Session id..........."+session_id + "Get Url........"+ API.GetUrl(getProfileDetails));
        var data = null;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                console.log("ResponseText......."+this.responseText);
                var login_response = JSON.parse(this.responseText);
                Database.SaveData("user_name",login_response.result.user_name);
                Database.SaveData("user_image",login_response.result.avatar_id);
                Database.SaveData("user_amount",login_response.result.wallet_money);
                user_name = Database.LoadData("user_name");
                user_amount = Database.LoadData("user_amount");
                user_image = Database.LoadData("user_image");
                Menu.prototype.CreateMenuPage();
             }
             else{
                console.log("ResponseText......."+this.responseText);
                //Menu.prototype.CreateMenuPage();
             }
        };
        xhttp.open("POST", API.GetUrl(getProfileDetails), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access_token", session_id);
        xhttp.send(data);
    },
    UpdateProfileName: function(user_name){
        Loading.ShowLoadingPopUp();
        console.log("Session id..........."+session_id);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                console.log("ResponseText......."+this.responseText);
                _user_name_text.setText(change_Name_value.value);
             }
        };
        xhttp.open("POST", API.GetUrl(updateProfileName), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access_token", session_id);
        xhttp.send("user_name="+user_name);
    },
    RetrieveChatList: function(){
       // Loading.ShowLoadingPopUp();
        Debug.log("Enter into the Chat List Api.........Session Id"+session_id + ".....Round Id........"+round_id);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                Debug.log("ResponseText......."+this.responseText);
                var _result = JSON.parse(this.responseText);
                Debug.log("Length........"+_result.result.chat.length);
                if(_result.result.chat.length >0){
                    for(var i = 0;i<_result.result.chat.length;i++){
                        ChatBox.OwnTemplateMsgBoxUpdateScroll(_result.result.chat[i].message,_result.result.chat[i].sender_id,_result.result.chat[i].avatar_id);
                    }
                }
             }
        };
        xhttp.open("POST", API.GetUrl(chatList), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access_token", session_id);
        xhttp.send("round_id="+round_id);
    },
    CreatePrivateTableData: function(amount,game_id){
        Debug.log("Enter into the Create Table Data........."+game_id);
        console.log("The Max Pot Limit........"+onlineServerEvent.GameMaxPotLimit(gameType));
        Loading.ShowLoadingPopUp();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                Debug.log("ResponseText......."+this.responseText);
                var _result = JSON.parse(this.responseText);
                room_code = _result.result.code;
                private_pot_limit = _result.result.max_pot_limit;
                Loading.HideLoadingPopUp();
                if(_result.message == "You have login another device!!"){
                    PopUp.GenerateCommonPopup("You have login another device!!!");
                    return;
                }
                if(_result.result.game_id == 1){
                    Client.AddUser();
                    StateTransition.TransitToClassic();
                }
                else if(_result.result.game_id == 2){
                    Client.AddUser();
                    StateTransition.TransitToMuflis();
                }
                else{
                    Client.AddUser();
                    StateTransition.TransitToJoker();
                }
             }
        };
        xhttp.open("POST", API.GetUrl(createPrivateTable), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access_token", session_id);
        xhttp.send("amount="+amount+"&game_id="+game_id+"&max_pot_limit="+onlineServerEvent.GameMaxPotLimit(gameType));
    },
    JoinPrivateTableData: function(){
        Debug.log("Enter into the Private Table Data.........");
        Loading.ShowLoadingPopUp();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                Debug.log("ResponseText......."+this.responseText);
                var _result = JSON.parse(this.responseText);
                game_id = _result.result.game_id;
                room_code = _result.result.code;
                private_pot_limit = _result.result.max_pot_limit;
                Loading.HideLoadingPopUp();
                if(_result.status == 0){
                    PopUp.GenerateCommonPopup("Invalid Room Code!!!");
                    return;
                }
                if(_result.result.game_id == 1){
                    Client.AddUser();
                    StateTransition.TransitToClassic();
                }
                else if(_result.result.game_id == 2){
                    Client.AddUser();
                    StateTransition.TransitToMuflis();
                }
                else{
                    Client.AddUser();
                    StateTransition.TransitToJoker();
                }
             }
        };
        xhttp.open("POST", API.GetUrl(joinPrivateTable), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access_token", session_id);
        xhttp.send("code="+enter_code_value.value);
    },
    GiftAPI: function(){
        Debug.log("The Gift API Call");
        Loading.ShowLoadingPopUp();
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                Debug.log("ResponseText......."+this.responseText);
                var _result = JSON.parse(this.responseText);
                Gift.ParseJson(_result);
                Loading.HideLoadingPopUp();
                if(_result.status == 0){
                    PopUp.GenerateCommonPopup("Invalid Room Code!!!");
                    return;
                }
             }
        };
        xhttp.open("POST", API.GetUrl(getGift), true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.setRequestHeader("access_token", session_id);
        xhttp.send(data);
    },
}
