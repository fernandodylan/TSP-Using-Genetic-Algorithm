class City{
  //Set the object with a name and x,y coordinates 
  constructor(name,x,y){
    this.x = x;
    this.y = y;
    this.name = name;
  }

  //Calculates the distance between the object Location and another location on a cartesian plane
  getDistance(city){
    var xDistance = Math.abs(this.x - city.x);
    var yDistance = Math.abs(this.y - city.y);
    var distance = Math.sqrt((Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
    console.log(distance);

  }
  //Returns the coordintes of the Location along with the name
  getCoordinates(city){
    return [city.name, city.x, city.y];
  }

}

class Fitness{
  constructor(route){
    this.route = route;
    this.distance = 0;
    this.fitness = 0.0;
  }

  getrouteDistance(){
    
  }
}

var Mexico = new City("Mexico",12,4);
var Canada = new City("Canada", -10, -20);
var USA = new City("USA", 30, 145);
Canada.getDistance(Mexico);
USA.getDistance(Canada);
console.log(Canada.getCoordinates(Canada));
