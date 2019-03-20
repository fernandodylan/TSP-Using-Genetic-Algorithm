var problemDomain = 2;

var bestDistance = Infinity;
var bestChromosome;

var city_list = [];
var popSize = 20;
var population = [];
var fitness = [];

//2d key-value array containing all distances for problem domain 2.
var pD2Distances = { Brighton:  { Brighton: 0, Bristol: 172, Cambridge: 145, Glasgow: 607, Liverpool: 329, London: 72, Manchester: 312, Oxford: 120},
					 Bristol:   { Brighton: 172, Bristol: 0, Cambridge: 192, Glasgow: 494, Liverpool: 209, London: 158, Manchester: 216, Oxford: 92},
					 Cambridge: { Brighton: 145, Bristol: 192, Cambridge: 0, Glasgow: 490, Liverpool: 237, London: 75, Manchester: 205, Oxford: 100},
					 Glasgow:   { Brighton: 607, Bristol: 494, Cambridge: 490, Glasgow: 0, Liverpool: 286, London: 545, Manchester: 296, Oxford: 489},
					 Liverpool: { Brighton: 329, Bristol: 209, Cambridge: 237, Glasgow: 286, Liverpool: 0, London: 421, Manchester: 49, Oxford: 208},
					 London:    { Brighton: 72, Bristol: 158, Cambridge: 75, Glasgow: 545, Liverpool: 421, London: 0, Manchester: 249, Oxford: 75},
					 Manchester:{ Brighton: 312, Bristol: 216, Cambridge: 205, Glasgow: 296, Liverpool: 49, London: 249, Manchester: 0, Oxford: 194},
					 Oxford:    { Brighton: 120, Bristol: 92, Cambridge: 100, Glasgow: 489, Liverpool: 208, London: 75, Manchester: 194, Oxford: 0} };


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
				return pD2Distances[this.name][city.getName()];
				break;
		}
	}
  
	//Returns the name of this city
	getName() {
		return this.name;
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
			bestChromosome = population[i];
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

function crossover(chromA, chromB) {
	var s = Math.floor(Math.random()*(chromA.length));
	var e = Math.floor(Math.random()*(chromA.length - s - 1))+s+1;
	var newChrom = chromA.slice(s, e);
	for (var i = 0; i < chromB.length; i++) {
		var city = chromB[i];
		if (!newChrom.includes(city)) {
			newChrom.push(city);
		}
	}
	return newChrom;
}

//Mutates the 'chromosome' by randomly swaping two cities
function mutate(chrom) {
	var a = Math.floor(Math.random() * chrom.length)
	var b = Math.floor(Math.random() * chrom.length)
	var temp = chrom[a]
	chrom[a] = chrom[b]
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
		city_list[4] = new City("Liverpool", -1, -1);
		city_list[5] = new City("London", -1, -1);
		city_list[6] = new City("Manchester", -1, -1);
		city_list[7] = new City("Oxford", -1, -1);
}

initPopulation()
for (var i = 0; i < 50; i++) {
	getFitness()
	newGeneration()
}
console.log(bestDistance)
console.log(bestChromosome)