var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    state = 0,
    dir = 0

canvas.width = 1400;
canvas.height = 800;
paper.setup(canvas);

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
        if (player.closeTo(players[x])) {
            // Send event
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

