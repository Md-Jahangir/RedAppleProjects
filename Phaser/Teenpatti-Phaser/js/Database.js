var Database = {
    //Save Data
    SaveData: function(key,value){
        localStorage.setItem(key,value);
    },
    //Load Data
    LoadData: function(key){
        if(localStorage.getItem(key) != null){
            return localStorage.getItem(key);
        }
        else{
            console.log("The Data you want to fetch is null");
        }
    },
    SetDefaultValue: function(){
        Database.user_image = '1';
    }
};