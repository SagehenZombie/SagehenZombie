function Player(id,name,avatar,x,y){
    this.id = id;
    this.name = name;
    this.avatar = avatar;
    this.lastX = x;
    this.lastY = y;
    this.x = x;
    this.y = y;
    this.dir = 0;
    this.state = 0;
    this.switch = false;
    this.maxTime = 1;
}
Player.prototype.speed = function(delta){
    if(this.avatar=='human'){
        return 0.14 * delta;
    }
    else{
        return 0.098 * delta;
    }
}

Player.prototype.updateLocation = function(x,y){
    this.x = x;
    this.y = y;
}

Player.prototype.move=function(delta, dir, state){
    if (state == 1) {
        this.lastX = this.x;
        this.lastY = this.y;
        this.time += delta;
        if (this.time >= this.maxTime) {
            this.time = 0;
            if (this.switch) {
                this.switch = false;
            } else {
                this.switch = true;
            }
        }
        if(dir==0) {
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
    this.dir = dir;
    this.state = state;
}

Player.prototype.draw=function(interpolationPercentage) {
    var figure = sagehen_front;
    if (this.dir == 0) {
        if (this.state == 1) {
            if (this.switch) {
                figure = sagehen_left_walk_1;
            } else {
                figure = sagehen_left;
            }
        } else {
            figure = sagehen_left;
        }
    } else if (this.dir == 3) {
        if (this.state == 1) {
            if (this.switch) {
                figure = sagehen_back_walk_1;
            } else {
                figure = sagehen_back_walk_2;
            }
        } else {
            figure = sagehen_back;
        }
    } else if (this.dir == 2) {
        if (this.state == 1) {
            if (this.switch) {
                figure = sagehen_right_walk_1;
            } else {
                figure = sagehen_right;
            }
        } else {
            figure = sagehen_right;
        }
    } else {
        if (this.state == 1) {
            if (this.switch) {
                figure = sagehen_front_walk_1;
            } else {
                figure = sagehen_front_walk_2;
            }
        } else {
            figure = sagehen_front;
        }
    }
    context.drawImage(figure,this.x,this.y,32,32);
    context.fillText(this.name,this.x,this.y);
}

Player.prototype.die=function(){
    if(this.avatar=='human'){
        this.avatar='zombie';
    }
}
Player.prototype.closeTo=function(anotherPlayer){
    var delta_x = this.x-anotherPlayer.x;
    var delta_y = this.y-anotherPlayer.y;
    var distance = Math.sqrt(delta_x^2+delta_y^2);
    return distance<16;
}
