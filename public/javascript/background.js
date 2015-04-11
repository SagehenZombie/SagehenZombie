function Background(buidings,lawns,roads){
    this.buildings = buildings;
    this.roads = roads;
    this.lawns = lawns;
    this.speed_index = 1;
}

Background.prototype.add_buidling = function(building){
    this.buildings.push(building);
}

Background.prototype.add_road = function(road){
    this.roads.push(road);
}

Background.prototype.add_lawn = function(lawn){
    this.lawns.push(lawn);
}




