var players = [];
var player = new Player(1,"Kent","human",10,400);
window.onload=function(){

    function getUrlParameter(sParam)
    {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++)
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam)
            {
                return sParameterName[1];
            }
        }
    }

    var id = getUrlParameter('id');
    socket = io.connect('http://localhost:3003');
    socket.on('welcome',function(data){
        for(i in data.players){
            var object = data.players[i];
            if(object.avatar=='zombie'){
                var xc=800; var yc=400;
            }
            else{
                var xc=500; var yc=300;
            }
            players.push(new Player(object.id,object.name,object.avatar,xc,yc));
        }
        for(i in players){
            if(players[i].id == id){
                player = players[i];
            }
        }
    });

    $('#dc').click(function(){
        socket.emit('disconnect');
    });


    socket.on('infect',function(data){
        var ID  = data.victim.id;
        for(i in players){
            if(players[i].id==ID){
                players[i].die();
            }
        }
        var all_zombies = true;
        for(i in players){
            if(players[i].avatar=='human'){
                var all_zombies = false;
                break;
            }
        }
        if(all_zombies){
            socket.emit('gameover');
        }
    });


    socket.on('move',function(data){
        var id = data.player.id;
        var folk;
        for(i in players){
            if(id==players[i].id){
                folk = players[i];
                break;
            }
        }
        folk.updateLocation(data.player.x,data.player.y);
        folk.dir = data.player.dir;
    });

    socket.on('restart',function(){
        window.location='/?winner=zombie';
    })

}
