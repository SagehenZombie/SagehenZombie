var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    state = 0,
    dir = 0

canvas.width = 1400;
canvas.height = 800;
paper.setup(canvas);

var rectangle = new Polygon([0,0,1400,0,1400,800,0,800]);
rectangle.draw(paper,'#eadfbc');
background = new Background([], [], []);
roadArray = reverseSecondCoordinate([40, 0,
    40, 160,
    0, 160,
    0, 200,
    40, 200,
    40, 620,
    0, 620,
    0, 660,
    40, 660,
    40, 800,
    80, 800,
    80, 660,
    840, 660,
    840, 800,
    880, 800,
    880, 660,
    1400, 660,
    1400, 620,
    360, 620,
    360, 430,
    280, 430,
    280, 470,
    320, 470,
    320, 620,
    80, 620,
    80, 0]);
var roads = new Polygon(roadArray);
background.addRoad(new Road(roads));
sccPolygon = [410,250,
    460, 250,
    460, 248,
    480, 248,
    480, 220,
    550, 220,
    550, 248,
    576, 248,
    576, 264,
    590, 264,
    590, 220,
    725, 220,
    725, 320,
    715, 320,
    715, 332,
    730, 332,
    730, 348,
    765, 348,
    765, 400,
    730, 400,
    730, 416,
    590, 416,
    590, 400,
    568, 400,
    568, 350,
    580, 350,
    580, 306,
    466, 306,
    466, 350,
    475, 350,
    475, 400,
    450, 400,
    450, 416,
    408, 416,
    408, 400,
    382, 400,
    382, 350,
    390, 350,
    390, 286,
    410, 286];
var scc = new Polygon(sccPolygon);
background.addBuidling(new Building(scc));

$(document).keydown(function (e) {
    state = 1;
    switch (event.keyCode) {
        case 37:
            dir = 0;
            break;
        case 38:
            dir = 3;
            break;
        case 39:
            dir = 2;
            break;
        case 40:
            dir = 1;
            break;
    }
})

/**
 * @param {Number} delta
 *   The amount of time since the last update, in seconds.
 */
function update(delta) {
    player.move(delta, dir, state);
    for (x in players) {
        if (player.closeTo(players[x]) && (player.avatar == "zombie")) {
            if (player.id != players[x].id) {
                players[x].die();
                socket.emit('infect',{victim:players[x]});
            }
        }
    }
    state = 0;
}
/**
 * @param {Number} interpolationPercentage
 *   How much to interpolate between frames.
 */
function draw(interpolationPercentage) {
    context.clearRect(0, 0, 1400, 800);
    background.draw(paper);
    paper.view.draw();
    player.draw(interpolationPercentage);
    for (x in players) {
        players[x].draw(interpolationPercentage);
    }

}
/**
 * @param {Number} fps
 *   The smoothed frames per second.
 * @param {Boolean} panic
 *   Whether the main loop panicked because the simulation fell too far behind
 *   real time.
 */
function end(fps, panic) {

}

MainLoop.setUpdate(update).setDraw(draw).setEnd(end).start();

