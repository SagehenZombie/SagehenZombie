function Background(buildings,lawns,roads){
    this.buildings = buildings;
    this.lawns = lawns;
    this.roads = roads;
    this.speed_index = 1;
}
Background.prototype.addBuidling = function(building){
    this.buildings.push(building);
}
Background.prototype.addRoad = function(road){
    this.roads.push(road);
}
Background.prototype.addLawn = function(lawn){
    this.lawns.push(lawn);
}
Background.prototype.draw = function(paper) {
    for (building in this.buildings) {
        this.buildings[building].draw(paper);
    }
    for (road in this.roads) {
        this.roads[road].draw(paper);
    }
    for (lawn in this.lawns) {
        this.lawns[lawn].draw(paper);
    }
}

function Road(polygon){
    this.polygon = polygon;
    this.speed_index = 2;
}
Road.prototype.draw = function(paper) {
    this.polygon.draw(paper, '#ffffff');
}

function Building(polygon){
    this.polygon = polygon;
    this.inhabitans = [];
}
Building.prototype.draw = function(paper) {
    this.polygon.draw(paper, '#f5f4ed');
}
Building.prototype.accept=function(player){
    this.inhabitants.push(player);
}

function Lawn(polygon){
    this.polygon = polygon;
    this.speed_index = 0.5;
}
Lawn.prototype.draw = function(paper) {
    this.polygon.draw(paper, '#c2e5aa');
}




