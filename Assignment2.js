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

//Class to create a fitness function for our population
class Fitness{
  constructor(route){
    this.route = route;
    this.distance = 0;
    this.fitness = 0.0;
  }

  getrouteDistance(){
    
  }
}

//Array Shuffling Function
function shuffle (array) {
  var i = 0
    , j = 0
    , temp = null

  for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}

//Initialize the population of chromosomes 
function initPopulation(){
  
  var population = new Array();
  for(i = 0; i < 20; i++){
    population.push(shuffle(city_list));
    
  }
  return population
}




var city_list = new Array();
city_list[0] = new City("Mexico",12,4);
city_list[1] = new City("Canada", -10, -20);
city_list[2] = new City("USA", 30, 145);

console.log(initPopulation());
