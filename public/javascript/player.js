function Player(name,avatar,x,y,id){
    this.name = name;
    this.avatar = avatar;
    this.x = x;
    this.y = y;
    this.id = id;
}
Player.prototype.speed = function(){
    if(this.avatar=='human'){
        return 10;
    }
    else{
        return 7;
    }
}

Player.prototype.move=function(dir){
    if(dir==0){
        this.x = this.x - this.speed();
    }
    else if(dir==2){
        this.x = this.x + this.speed();
    }
    else if(dir==1){
        this.y = this.y + this.speed();
    }
    else{
        this.y = this.y - this.speed();
    }
}

Player.prototype.die=function(){
    if(this.avatar=='human'){
        this.avatar='zombie';
    }
}

Player.prototype.closeTo=function(anotherPlayer){
    var delta_x = this.x-anotherPlayer.x;
    var delta_y = this.y-anotherPlayer.y;
    var distance = sqrt(delta_x^2+delta_y^2);
    return distance<16;
}
