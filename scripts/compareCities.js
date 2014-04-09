// NOTE 
// Other programs should call compareToAllCities. compareCities is used internally.
//
//
// Example Call -- with arrays written into the function call
//
// compareCities(0, DataSet, 0, 1, [0,1], [0.5, 0.5], 2)
//
// 0 - RSS of all criteria
// 0,1 - Compare US to Alabama. US is the pivot city
// [1,2] - use first two criteria after FIPS
// [0.5, 0.5] - weight equally (not used in mode 0)
// 2 - meet at least two criteria (not used in mode 0)

function compareCities(searchType, cityInd1, cityInd2, criteria, weights, numToSatisfy)
{
	// alpha is the similarity of the two cities
	var alpha;
	var pivotTemp;
	var otherTemp;
	var temp;
	var i;

	switch(searchType){
		case 0: // Root Sum Squared Relative Error
			alpha = 0.0;
			for(i = 0; i < criteria.length; i++)
			{
				pivotTemp = DataSet[cityInd1][criteria[i]];
				otherTemp = DataSet[cityInd2][criteria[i]];
				temp = (pivotTemp - otherTemp)/pivotTemp;
				alpha += temp*temp;
			}
			return Math.sqrt(alpha);
			break;
		default:
			break;
	}

	return alpha;
}

//This function is called similarly, but will compare pivotInd to ALL other counties. This function will return numToReturn counties indices in a sorted list. It will not return the city itself.

//weights and numToSatisfy are used for more sophisticated sorting algorithms, which we have yet to implement.
function compareToAllCities(searchType, pivotInd, criteria, weights, numToSatisfy, numToReturn)
{
	// alpha is the similarity of the two cities
	var results = new Array();
	var alpha;
	//var pivotTemp;
	//var otherTemp;
	var temp;
	var i;

	for(i = 0; i < DataSet.length; i++) {
		results[results.length] = [compareCities(searchType, pivotInd, i, criteria, weights, numToSatisfy), i];
	}

	//Remove self
	results = results.splice(pivotInd, 1);

	//Sort Results
	results.sort();
	
	//Concatenate Results
	results = results.slice(0, numToReturn);
	
	return results;
}
