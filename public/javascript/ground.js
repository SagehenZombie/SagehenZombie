function Polygon() {
    this.arrayOfPoints = [];
}

Polygon.prototype.add = function(x,y) {
    this.arrayOfPoints.push(new paper.Point(x,y));
}

Polygon.prototype.draw = function(paper) {
    var path = new paper.Path();
    path.fillColor = 'black';
    path.strokeColor = 'black';
    for (i = 0; i < this.arrayOfPoints.length; i++) {
        path.add(this.arrayOfPoints[i]);
    }
    path.closed = true;
}

function arrayToPolygon(array) {
    var polygon = new Polygon();
    for (i = 0; i < array.length - 1; i++) {
        polygon.add(array[i],array[i+1]);
    }
    return polygon;
}