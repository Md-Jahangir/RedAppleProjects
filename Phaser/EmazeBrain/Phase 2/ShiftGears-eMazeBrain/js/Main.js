import BootScene from './BootScene.js';
import PreloadScene from './PreloadScene.js';
import GameScene from './GameScene.js';  

// Load our scenes
var bootScene = new BootScene();
var preloadScene = new PreloadScene();
var gameScene = new GameScene();

window.onload = function() {
    isMobile = /iPhone|iPhoneX|iPod|iPad|BlackBerry|kindle|playbook|Windows Phone|Android/i.test(navigator.userAgent);
     isIPad = /iPod|iPad/i.test(navigator.userAgent);
    if (isMobile) 
    {
        var config = {
            type: Phaser.AUT0,
            backgroundColor: 0x000000,
            parent: 'findusifyoucan',          
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics             : {
                default         : 'arcade',
                arcade          : {
                // gravity        : {y   : 200},
                // debug          : true,
                }
            },
            dom: {
                createContainer: true
            },
            width: window.innerWidth ,
            height:window.innerHeight
        };
    } 
    else 
    {
        var config = {
            type: Phaser.AUT0,
            backgroundColor: 0x00FFA4 ,
            parent: 'findusifyoucan',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics             : {
                default         : 'arcade',
                arcade          : {
                // gravity        : {y   : 200},
                // debug          : true,
                }
            },
            dom: {
                createContainer: true
            },
            width: 1920,
            height: 1080         
        };
    }
    game = new Phaser.Game(config);
    if(isIPad)
    {
        scaleFactorX =  (config.width/ 1920);
        scaleFactorY =  (config.height/ 1024);
    }
    else    
    {
        scaleFactorX =  (config.width/ 1920);
        scaleFactorY =  (config.width/ 1920);
    }    
    window.focus();
    // load scenes
    game.scene.add('BootScene', bootScene);
    game.scene.add('PreloadScene', preloadScene);
    game.scene.add("GameScene", gameScene);

    // start title 
    if(window.innerHeight > window.innerWidth)
    {
        // alert("Please use Landscape!");
        console.log("portrait");
    }
    else
    {
        game.scene.start('BootScene');
        console.log("landscape");
    }
    window.addEventListener("orientationchange", function() 
    {
        if( window.orientation == 0 || window.orientation == 180) // WHEN IN PORTRAIT MODE//
        {} 
        else
        {
            if(!gameStarted)
            {
                window.location.reload();
            }
        }
    }, false);
   
}