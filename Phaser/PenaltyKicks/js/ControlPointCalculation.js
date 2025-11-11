import { Constant } from "./Constant.js";
class ControlPointCalculation {
    constructor(scene) {
        this.scene = scene;
        this.actualEndX = 0;
        this.actualEndY = 0;
    }
    CreateDynamicCurveArc(_startPointX, _startPointY, _endPointX, _endPointY, _swipeSpeed) {
        let angle = Math.atan2(this.scene.ball.endY - _startPointY, _endPointX - _startPointX);
        let c1X = 0, c1Y = 0, speedEndPointMultiplier, speedControllPointMultiplier;

        if (_endPointX > 0 && _endPointX <= Math.round(Constant.game.config.width / 5.485)) {     //0,350
            c1X = Math.round(_endPointX + Math.round(Constant.game.config.width / 3.84));       // offset value for control points1X 500
            c1Y = Math.round(_endPointY + Math.round(Constant.game.config.height / 5.4));        // offset value for control points1Y 200
            speedEndPointMultiplier = _swipeSpeed * 120;
            speedControllPointMultiplier = _swipeSpeed * 125;

            _endPointX = _endPointX + speedEndPointMultiplier * Math.cos(angle);
            _endPointY = _endPointY + speedEndPointMultiplier * Math.sin(angle);
            this.actualEndX = Math.round(_endPointX);
            this.actualEndY = Math.round(_endPointY);

            c1X = c1X + speedControllPointMultiplier * Math.cos(angle)// * Math.PI / 2;
            c1Y = c1Y + speedControllPointMultiplier * Math.sin(angle)// * Math.PI / 2;

            this.scene.controlPoint1.x = c1X;
            this.scene.controlPoint1.y = c1Y;

            this.scene.controlPoint2.x = c1X - Math.round(Constant.game.config.width / 6.4);                     // offset value for controll point2X 300
            this.scene.controlPoint2.y = c1Y - Math.round(Constant.game.config.height / 5.4);                     // offset value for controll point2Y 200
            this.DrawGraphicsCurve(_endPointX, _endPointY)
        }
        else if (_endPointX > Math.round(Constant.game.config.width / 5.485) && _endPointX <= Math.round(Constant.game.config.width / 3.49)) {    //350 to 550    
            c1X = Math.round(_endPointX + Math.round(Constant.game.config.width / 6.4));               // offset val for control points1 X 300
            c1Y = Math.round(_endPointY + Math.round(Constant.game.config.height / 10.8));             // offset val for control points1 Y 100
            speedEndPointMultiplier = _swipeSpeed * 120;
            speedControllPointMultiplier = _swipeSpeed * 125;

            _endPointX = _endPointX + speedEndPointMultiplier * Math.cos(angle);
            _endPointY = _endPointY + speedEndPointMultiplier * Math.sin(angle);
            this.actualEndX = Math.round(_endPointX);
            this.actualEndY = Math.round(_endPointY);

            c1X = c1X + speedControllPointMultiplier * Math.cos(angle)// * Math.PI / 2;
            c1Y = c1Y + speedControllPointMultiplier * Math.sin(angle)// * Math.PI / 2;

            this.scene.controlPoint1.x = c1X;
            this.scene.controlPoint1.y = c1Y;

            this.scene.controlPoint2.x = c1X - Math.round(Constant.game.config.width / 19.2);                             // controll point 2X 100
            this.scene.controlPoint2.y = c1Y - Math.round(Constant.game.config.height / 10.8);                            // controll point 2Y 100
            this.DrawGraphicsCurve(_endPointX, _endPointY)
        }
        else if (_endPointX > Math.round(Constant.game.config.width / 3.49) && _endPointX <= Math.round(Constant.game.config.width / 2.56)) {  //550 to 750
            c1X = Math.round(_endPointX + Math.round(Constant.game.config.width / 9.6));                              // controll point 2X 200
            c1Y = Math.round(_endPointY + Math.round(Constant.game.config.height / 10.8));                              // controll point 2Y 100
            speedEndPointMultiplier = _swipeSpeed * 120;
            speedControllPointMultiplier = _swipeSpeed * 125;

            _endPointX = _endPointX + speedEndPointMultiplier * Math.cos(angle);
            _endPointY = _endPointY + speedEndPointMultiplier * Math.sin(angle);
            this.actualEndX = Math.round(_endPointX);
            this.actualEndY = Math.round(_endPointY);

            c1X = c1X + speedControllPointMultiplier * Math.cos(angle)// * Math.PI / 2;
            c1Y = c1Y + speedControllPointMultiplier * Math.sin(angle)// * Math.PI / 2;

            this.scene.controlPoint1.x = c1X;
            this.scene.controlPoint1.y = c1Y;

            this.scene.controlPoint2.x = c1X - Math.round(Constant.game.config.width / 19.2);              //ctrlX - 100
            this.scene.controlPoint2.y = c1Y - Math.round(Constant.game.config.height / 10.8);            //cntrlY - 100
            this.DrawGraphicsCurve(_endPointX, _endPointY)
        }
        else if (_endPointX > Math.round(Constant.game.config.width / 2.56) && _endPointX <= Math.round(Constant.game.config.width / 1.669)) {        //750, 1150  
            c1X = Math.round(_endPointX);
            c1Y = Math.round(_endPointY);
            speedEndPointMultiplier = _swipeSpeed * 120;
            speedControllPointMultiplier = _swipeSpeed * 125;

            _endPointX = _endPointX + speedEndPointMultiplier * Math.cos(angle);
            _endPointY = _endPointY + speedEndPointMultiplier * Math.sin(angle);
            this.actualEndX = Math.round(_endPointX);
            this.actualEndY = Math.round(_endPointY);

            c1X = c1X + speedControllPointMultiplier * Math.cos(angle);
            c1Y = c1Y + speedControllPointMultiplier * Math.sin(angle);

            this.scene.controlPoint1.x = c1X;
            this.scene.controlPoint1.y = c1Y;

            this.scene.controlPoint2.x = c1X;
            this.scene.controlPoint2.y = c1Y;
            this.DrawGraphicsCurve(_endPointX, _endPointY)
        }
        else if (_endPointX > _endPointX <= Math.round(Constant.game.config.width / 1.669) && _endPointX <= Math.round(Constant.game.config.width / 1.422)) {    //1150 to 1350  
            c1X = Math.round(_endPointX - Math.round(Constant.game.config.width / 19.2));                         //ctrlX - 100
            c1Y = Math.round(_endPointY - Math.round(Constant.game.config.height / 10.8));                        //cntrlY - 100
            speedEndPointMultiplier = _swipeSpeed * 120;
            speedControllPointMultiplier = _swipeSpeed * 125;

            _endPointX = _endPointX + speedEndPointMultiplier * Math.cos(angle);
            _endPointY = _endPointY + speedEndPointMultiplier * Math.sin(angle);
            this.actualEndX = Math.round(_endPointX);
            this.actualEndY = Math.round(_endPointY);

            c1X = c1X + speedControllPointMultiplier * Math.cos(angle)// * Math.PI / 2;
            c1Y = c1Y + speedControllPointMultiplier * Math.sin(angle)// * Math.PI / 2;

            this.scene.controlPoint1.x = c1X;
            this.scene.controlPoint1.y = c1Y;

            this.scene.controlPoint2.x = c1X + Math.round(Constant.game.config.width / 19.2);                                            //ctrlX - 100
            this.scene.controlPoint2.y = c1Y + Math.round(Constant.game.config.height / 10.8);                                           //cntrlY - 100
            this.DrawGraphicsCurve(_endPointX, _endPointY)
        }
        else if (_endPointX > Math.round(Constant.game.config.width / 1.422) && _endPointX <= Math.round(Constant.game.config.width / 1.2387)) {          //1350 to 1550   

            c1X = Math.round(_endPointX - Math.round(Constant.game.config.width / 9.6));                //ctrl1 X - 200
            c1Y = Math.round(_endPointY - Math.round(Constant.game.config.height / 10.8));              //ctrl1 Y - 100
            speedEndPointMultiplier = _swipeSpeed * 120;
            speedControllPointMultiplier = _swipeSpeed * 125;

            _endPointX = _endPointX + speedEndPointMultiplier * Math.cos(angle);
            _endPointY = _endPointY + speedEndPointMultiplier * Math.sin(angle);
            this.actualEndX = Math.round(_endPointX);
            this.actualEndY = Math.round(_endPointY);

            c1X = c1X + speedControllPointMultiplier * Math.cos(angle)// * Math.PI / 2;
            c1Y = c1Y + speedControllPointMultiplier * Math.sin(angle)// * Math.PI / 2;

            this.scene.controlPoint1.x = c1X;
            this.scene.controlPoint1.y = c1Y;
            // this.scene.controlPoint1.x = 1350;
            // this.scene.controlPoint1.y = 159;

            this.scene.controlPoint2.x = c1X + Math.round(Constant.game.config.width / 19.2);                             //ctrl X2 - 100 
            this.scene.controlPoint2.y = c1Y + Math.round(Constant.game.config.height / 10.8);
            // this.scene.controlPoint2.x = 1401;                             //ctrl X2 - 100 
            // this.scene.controlPoint2.y = 199;  
            this.DrawGraphicsCurve(_endPointX, _endPointY)
        }
        else if (_endPointX > Math.round(Constant.game.config.width / 1.2387)) {   //   > 1550
            c1X = Math.round(_endPointX - Math.round(Constant.game.config.width / 9.6));               //ctrl X - 200
            c1Y = Math.round(_endPointY - Math.round(Constant.game.config.height / 10.8));             //ctrl1 Y - 100
            speedEndPointMultiplier = _swipeSpeed * 120;
            speedControllPointMultiplier = _swipeSpeed * 125;

            _endPointX = _endPointX + speedEndPointMultiplier * Math.cos(angle);
            _endPointY = _endPointY + speedEndPointMultiplier * Math.sin(angle);
            this.actualEndX = Math.round(_endPointX);
            this.actualEndY = Math.round(_endPointY);

            c1X = c1X + speedControllPointMultiplier * Math.cos(angle)// * Math.PI / 2;
            c1Y = c1Y + speedControllPointMultiplier * Math.sin(angle)// * Math.PI / 2;

            this.scene.controlPoint1.x = c1X;
            this.scene.controlPoint1.y = c1Y;

            this.scene.controlPoint2.x = c1X + Math.round(Constant.game.config.width / 19.2);                                         //ctrl X2 - 100  
            this.scene.controlPoint2.y = c1Y + Math.round(Constant.game.config.height / 10.8);                                        //ctrl Y2 - 100 
            this.DrawGraphicsCurve(_endPointX, _endPointY)
        }
    }
    DrawGraphicsCurve(_endPointX, _endPointY) {
        this.scene.graphics.clear();
        this.scene.endPoint.x = _endPointX;
        this.scene.endPoint.y = _endPointY;
        this.scene.curve.draw(this.scene.graphics);
        // this.scene.graphics.lineStyle(5, 0x0000ff, 5);
        this.scene.curve.draw(this.scene.graphics);
    }
}
export default ControlPointCalculation;