var Character = function(){
    this.tempSprite = "";
    this.knife = "";
    this.charactergroup = "";
    this.health = "";
    this.CreateCharacter = function(posX,posY,character){
        this.charactergroup = game.add.group();
        this.tempSprite = game.add.sprite(posX,posY,character);
        this.knife = game.make.sprite(posX-45,posY-233,'knife');
        this.tempSprite.anchor.set(0.5,0.5);
        this.tempSprite.scale.set(0.5,0.5);
        this.health = 1;
        this.knife.anchor.set(0.5,0.5);
        this.knife.scale.set(0.5,0.5);
        this.charactergroup.add(this.tempSprite);
        this.charactergroup.add(this.knife);
        this.charactergroup.position.set(0,0);
        return this.charactergroup;
    }
    this.ReturnHealth = function(){
        return this.health;
    }
}