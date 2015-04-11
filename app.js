var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var UUID = require('node-uuid');
var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();
var io = require('socket.io')(app);
// view engine setup
app.set('views', path.join(__dirname, 'views/'));
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main',helpers: {
  section: function(name, options){
    if(!this._sections) this._sections = {};
    this._sections[name] = options.fn(this);
    return null;
  }
}});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var players = [];

io.on('connection',function(client){

  client.emit('player list',{players:players});

  client.on('connected',function(info){
    //create the player
    var player = {name:info.name,avatar:info.avatar,id:UUID()};
    client.player = player;
    //add the player to the list of players
    players.push(player);
    //send the new player info to other players
    client.broadcast.emit('newPlayer',{player:player});
    console.log('\t socket.io:: player ' + client.player.id + ' connected');
  });

  client.on('move',function(location)){
    player.x = location.x;
    player.y = location.y;
    client.boardcast.emit('move',{player:player});
  }

  client.on('infect',function(victim){

  })

  client.on('disconnect', function () {
    index = players.indexOf(client.player);
    players.splice(index,1);
    client.broadcast.emit('gonePlayer',{player:player});
    console.log('\t socket.io:: client disconnected ' + client.userid );

  });
})

module.exports = app;
