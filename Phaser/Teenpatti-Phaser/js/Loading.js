var Loading = {
    CreateLoadingPopUpImage: function(){
        console.log("The Create Loading Pop Up.................");
        loadingPopupOverlay = game.add.sprite(640, 360, 'blackOnePixel');
        loadingPopupOverlay.anchor.setTo(0.5, 0.5);
        loadingPopupOverlay.scale.setTo(1280, 720);
        loadingPopupOverlay.alpha = 0.5;
        loadingPopupOverlay.inputEnabled = true;

        loadingWheel = game.add.sprite(640,360, 'loadingWheel');
        loadingWheel.anchor.setTo(0.5,0.5);
        loadingWheel.scale.setTo(0.5,0.5);

        loadingGroup = game.add.group();
        loadingGroup.add(loadingPopupOverlay);
        loadingGroup.add(loadingWheel);
        //loadingGroup.visible = false;
    },
    RotateLoadingPopUp: function(){
        if(showLoadingPopUp){
            loadingWheel.angle += 3;
        }
    },
    ShowLoadingPopUp: function(){
        console.log("The Show Loading Pop Up.................");
        this.CreateLoadingPopUpImage();
        showLoadingPopUp = true;
        loadingGroup.visible = true;
    },
    // ShowLoadingPopUp: function(message){
    //     console.log("The Show Loading Pop Up.................");
    //     this.CreateLoadingPopUpImage();
    //     showLoadingPopUp = true;
    //     loadingGroup.visible = true;
    //     var text = game.add.text(640.0, 465.0, message, {"font":"bold 25px Arial","fill":"#ffffff","align":"center"});
    //     text.anchor.setTo(0.5,0.5);
    // },
    HideLoadingPopUp: function(){
        console.log("The HIde Loading Pop Up.................");
        showLoadingPopUp = false;
        loadingGroup.visible = false;
    } 
}