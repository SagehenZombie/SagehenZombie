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
    socket = io.connect('http://localhost:3000');
    var players = null;
    socket.on('welcome',function(data){
        players = data.players;
    });
    for(i in players){
        if(players[i].id = id){
            player = players[i];
        }
    }

    socket.on('gameover',function(){
        socket.emit('result',{players:players});
    });

    socket.on('winner',function(data){
        winner = data.winner;
        window.location = '/?winner='+winner;
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
    });

}
