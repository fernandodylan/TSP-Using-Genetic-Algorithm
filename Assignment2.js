var bestDistance = Infinity;
var bestCromosome;

var city_list = [];
var popSize = 20;
var population = [];
var fitness = [];


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
    //console.log(distance);
	return distance;
  }
  //Returns the coordintes of the Location along with the name
  getCoordinates(city){
    return [city.name, city.x, city.y];
  }

}

//Initialize the population of chromosomes 
function initPopulation(){
  for(i = 0; i < popSize; i++){
	population[i] = city_list.slice();
	shuffle(population[i]);
  }
}

//Gets an array of equal length to population, with value between 0 and 1 for each permutation of city_list
function getFitness() {
	//Goes through each randomized array of cities
	for (var i = 0; i < popSize; i++) {
		var totalDistance = 0;
		//Goes through each city and calculates distance to next city, adds it to totaldistance
		for (var j = 0; j < population[i].length-1; j++) {
			totalDistance += population[i][j].getDistance(population[i][j+1]);
		}
		//If the total distance for that order of cities is better than the best, save it
		if (totalDistance < bestDistance) {
			bestDistance = totalDistance;
			bestCromosome = population[i];
		}
		//Sets the raw fitness in it's own array. The raw fitness is calculated as a simple inverse of the total distance. 
		fitness[i] = 1/totalDistance;
	}
	
	//Gets the sum of all fitnesses, then divides each fitness by the total fitness
	//Gives us a easy way to tell best fitnesses, as each value now represents a percentage
	//Larger percentage = better fitness = better chance of surviving
	var totalFitness = 0; 
	for (var i = 0; i < fitness.length; i++) {
		totalFitness += fitness[i];
	}
	for (var i = 0; i < fitness.length; i++) {
		fitness[i] = fitness[i]/totalFitness;
	}
}

//Function to create new generation of the population
function newGeneration() {
	var newPop = [];
	for(i = 0; i < popSize; i++){
		//Selects two random chromosomes from the current population, based on the fitness.
		var chromA = selection(population, fitness);
		var chromB = selection(population, fitness);
		//Uses crossover function to combine traits of both selected chromosomes
		var newChrom = crossover(chromA, chromB);
		//Mutates the newly created chromosome using mutate function
		mutate(newChrom);
		//Adds new chromosome to the new population
		newPop[i] = newChrom;
	}
	population = newPop;
}

//Function to select a chromosome from the population based on fitness
function selection(pop, fit) {
	
}

//Function to create new chromosome based on two provided chromosomes
function crossover(chromA, chromB) {
	
}


//Mutates the 'chromosome' by randomly swaping two cities
function mutate(chrom) {
	var a = Math.floor(Math.random() * chrom.length)
	var b = Math.floor(Math.random() * chrom.length)
	var temp = pop[i][a]
	chrom[a] = pop[i][b]
	chrom[b] = temp
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


city_list[0] = new City("a",12,4);
city_list[1] = new City("b", -10, -20);
city_list[2] = new City("c", 30, 145);
city_list[3] = new City("d",132,35);
city_list[4] = new City("e", -32, -434);
city_list[5] = new City("f", 56, 82);
city_list[6] = new City("g",44,453);
city_list[7] = new City("h", -160, -333);
city_list[8] = new City("i", 340, 733);
city_list[9] = new City("j",122,4);

initPopulation()
getFitness();