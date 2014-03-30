// Example Call -- with arrays written into the function call
//
// compareCities(0, data, 0, 1, [0,1], [0.5, 0.5], 2)
//
// 0 - RSS of all criteria
// data - the data *shrug*
// 0,1 - Compare US to Alabama. US is the pivot city
// [0,1] - use first two criteria
// [0.5, 0.5] - weight equally (not used in mode 0)
// 2 - meet at least two criteria (not used in mode 0)

function compareCities(searchType, data, cityInd1, cityInd2, criteria, weights, numToSatisfy)
{
	// alpha is the similarity of the two cities
	var alpha
	var temp
	var i

	switch(searchType){
	case 0: // Root Sum Squared Relative Error
		alpha = 0.0
		for(int i = 0; i < criteria.length; i++)
		{
			temp
			alpha += temp*temp
		}

	switch(searchType){
	case 0: // Root Sum Squared Relative Error
		
		break;

	default:
		break;
	}
	return 
}
