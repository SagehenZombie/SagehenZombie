var ready = false;
window.onload=function(){

    $('#sel').change(function(){
        if($(this).val()=='human'){
            $('#demo_img').attr('src','/images/sagehen_front.png');
        }
        else{
            $('#demo_img').attr('src','/images/zombie_front.png');
        }
    })

    var socket = io.connect('http://localhost:3000');

    socket.on('welcome',function(data){
        $('#state').text('Successfully connected to the server!');
        var players = data.players;
        for(i in players){
            $('#players ul').append('<li><h5>' + players[i].name + ' playing as ' + players[i].avatar + '</h5></li>');
        }
    });

    $('#ready_button').click(function(){
        if(!ready){
            ready = true;
            $(this).text('Waiting');
            $('#state').text('Waiting for more players');
            var name = $('#nm').val();
            var avatar = $('#sel').val();
            socket.emit('connected',{name:name,avatar:avatar});
            $('#players ul').append('<li><h5>' + name + ' playing as ' + avatar + '</h5></li>');}
    });


    socket.on('countdown',function(){
        seconds = 10;
        $('#state').text('Countdown: '+seconds);
        setInterval(function(){
            seconds--;
            $('#state').text('Countdown: '+seconds);
        },1000)
    });

    socket.on('newPlayer',function(data){
        newPlayer = data.player;
        $('#players ul').append('<li><h5>' + newPlayer.name + ' playing as ' + newPlayer.avatar + '</h5></li>');
    });

    var id;
    socket.on('id',function(data){
        id = data.id;
    });

    socket.on('game start',function(){
        if(!ready){
            $('#ready_button').trigger('click');
        }
        window.location= '/play?id='+id;
    });
}

