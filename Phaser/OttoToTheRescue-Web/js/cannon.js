//FOR CANNON MOVEMENT
var Cannon = {
    CannonMovement :  function(){
    //CALCULATE DISTANCE
    cannonDeltaX = game.input.x - cannonBody.x;
    cannonDeltaY = game.input.y - cannonBody.y;
  
    //CALCULATE ANGLE AND APPLY TO THE CANNON BODY
    cannonAngle = (180/Math.PI)*(Math.atan2(cannonDeltaY,cannonDeltaX)) + 90;
  
    if(cannonAngle > -angleRange && cannonAngle < angleRange){
      cannonBody.angle = cannonAngle;
    }
  },
  
  GeneratePathMarkers : function(){
      pathMarkers = [];
      var i;
      for(i=0; i<pathMarkerCount; i++){
        pathMarkers[i] = game.add.sprite(0,0,'projectile_marker');
        pathMarkers[i].alpha = (pathMarkerCount-i)/pathMarkerCount;
        pathMarkers[i].anchor.set(0.5,0.5);
        pathMarkers[i].scale.set(0.8,0.8);
      }
  },
  
  GenerateProjectile :  function(){
    // GENERATE THE PROJECTILE
    projectile = game.add.sprite(
                                  2*screenWidth,
                                  2*screenWidth,
                                  'stone'
                                  );
    
  
    // projectile.animations.add('projectiles');
  
    game.physics.p2.enable([projectile],false);
  
    projectile.body.static = true;
    projectile.body.collideWorldBounds = true;
  
    projectile.body.clearShapes();
    projectile.body.addCircle(32);
    projectile.scale.set(0.5,0.5);  
  },
  
  LaunchProjectile :  function(){
    // console.log("Launch Projectile");
  
    // if(projectileTypeACount + projectileTypeBCount > 0){
    //   PlayCannonSFX();
      this.ResetCannon();
      // HideTouchArea();
  
      var deg2rad = (Math.PI/180);
      var angleInRad = -deg2rad*(90-cannonBody.angle);
      
      var cosAngle = Math.cos(angleInRad);
      var sinAngle = Math.sin(angleInRad);
  
      var offsetX = cannonLength * cosAngle;
      var offsetY = cannonLength * sinAngle;
      
      // projectile.x = cannonLength * (Mathf.sin)
      projectile.body.x = offsetX + cannonPositionX;
      projectile.body.y = offsetY + cannonPositionY;
  
      projectile.body.static = false;
  
      projectile.body.velocity.x = projectileSpeed*cosAngle;
      projectile.body.velocity.y = projectileSpeed*sinAngle;
  
      isProjectileLaunched = true;
    // }
  
    // // SEE WHICH IS THE CURRENTLY SELECTED ITEM
    // if(currentSelectedOption == projectileOptionA){
    //   --projectileTypeACount;
  
    //   // CHECK IF ITEM IS DEPLETED
    //   if(projectileTypeACount == 0){
    //     // SWITCH TO THE OTHER TYPE
    //     if(projectileTypeBCount>0){
    //       currentSelectedOption = projectileOptionB;
  
    //       currentSelectedOption = projectileOptionB;
    //       projectile.frame = projectileTypeBIndex;
    //       projectileInCannon.frame = projectileTypeBIndex;
    //     }
  
    //     // LOCK THIS ITEM
    //     projectileOptionA.inputEnabled = false;
    //   }
  
    // }else if(currentSelectedOption == projectileOptionB){
    //   --projectileTypeBCount;
  
    //   // CHECK IF ITEM IS DEPLETED
    //   if(projectileTypeBCount == 0){
    //     // SWITCH TO THE OTHER TYPE
    //     if(projectileTypeACount>0){
    //       currentSelectedOption = projectileOptionA;
  
    //       currentSelectedOption = projectileOptionA;
    //       projectile.frame = projectileTypeAIndex;
    //       projectileInCannon.frame = projectileTypeAIndex;
    //     }
        
    //     // LOCK THIS ITEM
    //     projectileOptionB.inputEnabled = false;
    //   }
    // }
    this.UpdateDisplays();
  },
  UpdateDisplays: function(){
    game.world.bringToTop(projectile);
    game.world.bringToTop(topBarGroup);
    game.world.bringToTop(timerOverlay);
    
  },
  HideProjectile :  function(){
    isProjectileLaunched = false;
  
    projectile.body.static = true;
    projectile.body.velocity.x = 0;
    projectile.body.velocity.y = 0;
    projectile.body.x = screenWidth*2;
    projectile.body.y = screenHeight*2;
  
    // ShowTouchArea();
  },
  
  HidePathMarker : function(){
    var i;
    for(i=0; i<pathMarkers.length; i++){
      pathMarkers[i].visible = false;
    }
  },
  
  ShowPathMarker : function(){
    var i;
    for(i=0; i<pathMarkers.length; i++){
      pathMarkers[i].visible = true;
      game.world.bringToTop(pathMarkers[i]);
    }
    game.world.bringToTop(topBarGroup);
    game.world.bringToTop(timerOverlay);
  },
  
  PathMarkerAnimation : function(){
    markerTimer += 0.1;
    if(markerTimer>=1){
      markerTimer = 0;
    }
  
    var deg2rad = (Math.PI/180);
    var angleInRad = -deg2rad*(90-cannonBody.angle);
    
    var cosAngle = Math.cos(angleInRad);
    var sinAngle = Math.sin(angleInRad);
  
    var offsetX = cannonLength * cosAngle;
    var offsetY = cannonLength * sinAngle;
  
    var i;
    for(i=0; i<pathMarkers.length; i++){
      pathMarkers[i].x = offsetX + cannonPositionX + cosAngle*pathMarkerGap*(i+markerTimer);
      
      if(pathMarkers[i].x > screenWidth){
        pathMarkers[i].x = 2*screenWidth - pathMarkers[i].x;
      }else if(pathMarkers[i].x < 0){
        pathMarkers[i].x *= -1;
      }
  
      pathMarkers[i].y = offsetY + cannonPositionY + sinAngle*pathMarkerGap*(i+markerTimer);          
    }
  },
  
  ResetCannon : function(){
      cannonResetTimer = setInterval(this.ResetCanonMovement,10);
  },
  
  ResetCanonMovement : function(){
      cannonBody.angle *= 0.9;
      if(Math.abs(cannonBody.angle) < 0.01){
          cannonBody.angle = 0;
  
          clearInterval(cannonResetTimer);
      }
  }
}