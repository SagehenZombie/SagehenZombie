function Polygon() {
    this.arrayOfPoints = [];
}

Polygon.prototype.add = function(x,y) {
    this.arrayOfPoints.push(new paper.Point(x,y));
}

Polygon.prototype.draw = function(paper,color) {
    path = new paper.Path();
    path.fillColor = color;
    for (i = 0; i < this.arrayOfPoints.length; i++) {
        path.add(this.arrayOfPoints[i]);
    }
}

function arrayToPolygon(array) {
    polygon = new Polygon();
    for (i = 0; i < array.length - 1; i++) {
        if (i % 2 == 0) {
            polygon.add(array[i], array[i+1]);
        }
    }
    return polygon;
}

function reverseSecondCoordinate(arrayToReverse) {
    for (i = 0; i < arrayToReverse.length; i++) {
        if (i % 2 == 1) {
            arrayToReverse[i] = 800 - arrayToReverse[i];
        }
    }
    return arrayToReverse;
}