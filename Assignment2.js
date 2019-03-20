var problemDomain = 1;

var bestDistance = Infinity;
var bestCromosome;

var city_list = [];
var popSize = 20;
var population = [];
var fitness = [];


class City{
	//Set the object with a name and x,y coordinates 
	constructor(name,x,y) {
		this.x = x;
		this.y = y;
		this.name = name;
	}

	//Calculates the distance between the object Location and another location on a cartesian plane
	getDistance(city) {
		switch(problemDomain) {
			case 1:
				var xDistance = Math.abs(this.x - city.x);
				var yDistance = Math.abs(this.y - city.y);
				var distance = Math.sqrt((Math.pow(xDistance, 2) + Math.pow(yDistance, 2)));
				return distance;
				break;
			case 2:
				//Select distance from table in assignement 2 outline
				break;
		}
	}
  
	//Returns the coordintes of the Location along with the name
	getCoordinates(city) {
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
	var r = Math.random();
	var v = 0;
	var index = 0;
	//While the value counter, 'v', is less than the random value 'r'
	while (v < r) {
		//Adds the fitness value (number between 0 and 1, sum of all fitness = 1) to value counter
		v += fit[index];
		index++;
	}
	//While loop exits when the total fitness values checked > the random number generated
	//The fitness value that pushed v > r is the selected chromosome
	index--;
	return pop[index].slice();
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

switch(problemDomain) {
	case 1:
		city_list[0] = new City("a", 60, 200);
		city_list[1] = new City("b", 180, 200);
		city_list[2] = new City("c", 80, 180);
		city_list[3] = new City("d", 140, 180);
		city_list[4] = new City("e", 20, 160);
		city_list[5] = new City("f", 100, 160);
		city_list[6] = new City("g", 200, 160);
		city_list[7] = new City("h", 140, 140);
		city_list[8] = new City("i", 40, 120);
		city_list[9] = new City("j", 100, 120);
		city_list[10] = new City("k", 180, 100);
		city_list[11] = new City("l", 60, 80);
		city_list[12] = new City("m", 120, 80);
		city_list[13] = new City("n", 180, 60);
		city_list[14] = new City("o", 20, 40);
		city_list[15] = new City("p", 100, 40);
		city_list[16] = new City("q", 200, 40);
		city_list[17] = new City("r", 20, 20);
		city_list[18] = new City("s", 60, 20);
		city_list[19] = new City("t", 160, 20);
		break;
	case 2:
		city_list[0] = new City("Brighton", -1, -1);
		city_list[1] = new City("Bristol", -1, -1);
		city_list[2] = new City("Cambridge", -1, -1);
		city_list[3] = new City("Glasgow", -1, -1);
		city_list[4] = new City("Livepool", -1, -1);
		city_list[5] = new City("London", -1, -1);
		city_list[6] = new City("Manchester", -1, -1);
		city_list[7] = new City("Oxford", -1, -1);
}

initPopulation()
getFitness()