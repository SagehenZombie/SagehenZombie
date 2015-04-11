function Polygon(array) {
    this.array = array;
    this.arrayOfPoints = arrayToTuples(array);
}
function arrayToTuples(array) {
    points = [];
    for (i = 0; i < array.length - 1; i++) {
        if (i % 2 == 0) {
            points.push(new paper.Point(array[i], array[i+1]));
        }
    }
    return points;
}
Polygon.prototype.draw = function(paper,color) {
    path = new paper.Path();
    path.fillColor = color;
    for (i = 0; i < this.arrayOfPoints.length; i++) {
        path.add(this.arrayOfPoints[i]);
    }
}

// Hack to reverse y-coordinate direction
function reverseSecondCoordinate(arrayToReverse) {
    for (i = 0; i < arrayToReverse.length; i++) {
        if (i % 2 == 1) {
            arrayToReverse[i] = 800 - arrayToReverse[i];
        }
    }
    return arrayToReverse;
}