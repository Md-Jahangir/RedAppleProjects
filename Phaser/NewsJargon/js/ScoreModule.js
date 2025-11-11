
class ScoreModule {
    constructor(scene){
        this.scene = scene ;
        game.events.on('updateScore', this.AddScoreToModule,this);
    }
    create(){

    }
    AddScoreToModule(){
        
    }
}
export default ScoreModule ;

