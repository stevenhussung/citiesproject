var matches = new Array(); //To be populated with a list of matches

function search_county()
{
	var s = ($("#search").val()).toLowerCase();

	// Check if search criteria has been entered.
	if (s == "search by county")
	{
		return 0;
	}

	// Remove the common endings from search criteria because of unwanted matching
	var search_length = s.length;
	var endings = new Array("county","city and borough","borough","parish","census area","municipality");
	for (var i = 0; i < endings.length; i++)
	{
		var end_length = endings[i].length;
		var search_end = s.slice(search_length - end_length, search_length)
		if (search_end == endings[i])
		{
			s = s.slice(0,search_length - end_length - 1)
		}
	}

	matches = [];
	var m = 0;
	if(s.length<3)
	{
		// Case when search criteria is short
		alert("LONGER SEARCH PL0XRS");
	}
	else
	{
		// Matching by 3 letter segments
		var spell_cases = s.length - 2;
		var max_m = 0;
		var mat = 0;
		for (var i = 0; i < FIPS_CountyName.length; i++)
		{
			mat = 0;
			s_n = FIPS_CountyName[i][1].toLowerCase();
			for (var j = 0; j < spell_cases; j++)
			{
				s_m = s.slice(j,j+3);
				if (s_n.indexOf(s_m) != -1)
				{
					mat++;
				}
			}
			if (mat > 0)
			{
				matches[m] = [mat,FIPS_CountyName[i][0],FIPS_CountyName[i][1],FIPS_CountyName[i][2],FIPS_CountyName[i][3],i]
				m++;
				if (mat > max_m)
				{
					max_m = mat;
				}
			}
		}
		// Remove "least" relevant searches
		for (var i = 0; i < matches.length; i++)
		{
			if (matches[i][0] < max_m/2)
			{
				matches.splice(i,1);
				i--;
			}
		}

		if (matches.length == 0)
		{
			// No search results
			$("#output").html("No search results found. Please refine your search.");
		}
		else
		{
			$("#output").html("Sort by <select name='sort_by' id='sort_by' onchange='sort_by_change(this.options[this.selectedIndex].value)'><option value='0'>Relevance</option><option value='1'>State</option><option value='2'>A-Z</option></select><br/>");
			$("#output").append("<table cellspace='0' cellpadding='0'></table>");
			sort_by_change('0');
			print_matches()
		}
	}
}

function print_matches()
{
	$("#output table").html("<tr><td id='list1'></td><td id='list2'></td><td id='list3'></td></tr>");
	for (var i = 0; i < matches.length; i++)
	{
		var j = i%3 + 1;
		var id_n = "list" + j.toString();
		$("#output table #" + id_n).append("<div class='list_elem'><div class='state_abbr'>"+matches[i][3]+"</div>"+matches[i][2]+" "+matches[i][4]+"</div>");
	}
}

function sort_by_change(sort_index)
{
	switch (sort_index)
	{
		case '0':
			// Relevance
			matches.sort(sort_rel);
			break;
		case '1':
			// State
			matches.sort(sort_state);
			break;
		case '2':
			// A-Z
			matches.sort(sort_az);
			break;
	}
	print_matches();
}

function sort_rel(a,b)
{
	if ((b[0] - a[0]) == 0)
	{
		return a[2].localeCompare(b[2]);
	}
	else 
	{
		return b[0] - a[0];
	}
}

function sort_state(a,b)
{
	if ((a[3].localeCompare(b[3]))==0)
	{
		return b[0]-a[0];
	}
	else
	{
		return a[3].localeCompare(b[3]);
	}
}

function sort_az(a,b)
{
	return a[2].localeCompare(b[2]);
}
