function Player(id,name,avatar,x,y){
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.x = x;
    this.y = y;
    this.dir = 0;
    this.state = 0;
    this.sagehen_front = document.getElementById("sagehen_front");
}
Player.prototype.speed = function(delta){
    if(this.avatar=='human'){
        return 0.5 * delta;
    }
    else{
        return 0.35 * delta;
    }
}

Player.prototype.updateLocation = function(x,y){
    this.x = x;
    this.y = y;
}

Player.prototype.move=function(delta, dir, state){
    if (state == 1) {
        if(dir==0){
            this.x = this.x - this.speed(delta);
        }
        else if(dir==2){
            this.x = this.x + this.speed(delta);
        }
        else if(dir==1){
            this.y = this.y + this.speed(delta);
        }
        else{
            this.y = this.y - this.speed(delta);
        }
        socket.emit('move',{player:player});
    }
}

Player.prototype.draw=function() {
    console.log(this.x + "," + this.y);
    context.drawImage(sagehen_front,this.x,this.y,32,32);
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
