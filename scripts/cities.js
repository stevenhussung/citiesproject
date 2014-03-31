var matches = new Array(); //To be populated with a list of matches
var s; // Search criteria
var sort_type; // sort type
var scroll_pos; // scroll position

function display_county(i)
{
	// i is the index in FIPS_CountyName
	// j will be the index in DataSet
	// DataSet has 53 more elements than FIPS_CountyName does
	scroll_pos = $("html").scrollTop();
	sort_type = $("#sort_by").val();
	var j = i; //(guess here)i
	var j2 = j+53;
	var jtmp;
	while (DataSet[j][0] != FIPS_CountyName[i][0])
	{
		jtmp = Math.floor((j+j2)/2);
		if (DataSet[jtmp][0] > FIPS_CountyName[i][0])
		{
			j2 = jtmp;
		}
		else
		{
			j = jtmp;
		}
	}
	var F = FIPS_CountyName[i];
	var D = DataSet[j];
	$("#content").html("<h3>"+F[1]+" "+F[3]+", "+F[2]+"</h3><br><table id='county_data'></table> <div onclick='return_search()'>Return to Search</div>");
	for (k = 1; k < D.length; k++)
	{	
		$("#county_data").append("<tr><td>"+DataDict[k+1][1]+"</td><td>"+D[k]+"</td></tr>");
	}
	$("html").scrollTop(0);
}

function return_search()
{
	$("#content").html("Cities of Macon lets users cities similar to each other using U.S. Census Data. Our end goal is to design and implement a smooth user experiment in searching, displaying, and analyzing results. (PATRICK WRITE THIS!)<div id='search_div'><center><input type='text' name='search' id='search' value='Search by County' onfocus='if(this.value==this.defaultValue){this.value=\"\"}'><button onclick='search_county()'>Search</button>	or <select name='state' id='state'><option value = 'default'>Select a State</option><option value = '01'>Alabama</option><option value = '02'>Alaska</option><option value = '04'>Arizona</option><option value = '05'>Arkansas</option><option value = '06'>California</option><option value = '08'>Colorado</option><option value = '09'>Connecticut</option><option value = '10'>Delaware</option><option value = '11'>District Of Columbia</option><option value = '12'>Florida</option><option value = '13'>Georgia</option><option value = '15'>Hawaii</option><option value = '16'>Idaho</option><option value = '17'>Illinois</option><option value = '18'>Indiana</option><option value = '19'>Iowa</option><option value = '20'>Kansas</option><option value = '21'>Kentucky</option><option value = '22'>Louisiana</option><option value = '23'>Maine</option><option value = '24'>Maryland</option><option value = '25'>Massachusetts</option><option value = '26'>Michigan</option><option value = '27'>Minnesota</option><option value = '28'>Mississippi</option><option value = '29'>Missouri</option><option value = '30'>Montana</option><option value = '31'>Nebraska</option><option value = '32'>Nevada</option><option value = '33'>New Hampshire</option><option value = '34'>New Jersey</option><option value = '35'>New Mexico</option><option value = '36'>New York</option><option value = '37'>North Carolina</option><option value = '38'>North Dakota</option><option value = '39'>Ohio</option><option value = '40'>Oklahoma</option><option value = '41'>Oregon</option><option value = '42'>Pennsylvania</option><option value = '44'>Rhode Island</option><option value = '45'>South Carolina</option><option value = '46'>South Dakota</option><option value = '47'>Tennessee</option><option value = '48'>Texas</option><option value = '49'>Utah</option><option value = '50'>Vermont</option><option value = '51'>Virginia</option><option value = '53'>Washington</option><option value = '54'>West Virginia</option><option value = '55'>Wisconsin</option><option value = '56'>Wyoming</option></select><div id='output'></div>");
	$("#output").html("Sort by <select name='sort_by' id='sort_by' onchange='sort_by_change(this.options[this.selectedIndex].value)'><option value='0'>Relevance</option><option value='1'>State</option><option value='2'>A-Z</option></select><br/>");
	$("#output").append("<table cellspace='0' cellpadding='0'></table>");
	$("#search").val(s);
	print_matches()
	$("html").scrollTop(scroll_pos);
	$("#sort_by").val(sort_type);
	
}

			
function search_county()
{
	s = ($("#search").val()).toLowerCase();

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
		$("#output table #" + id_n).append("<div class='list_elem' onmouseover='this.style.background = red' onclick='display_county("+matches[i][5]+")'><div class='state_abbr'>"+matches[i][3]+"</div>"+matches[i][2]+" "+matches[i][4]+"</div>");
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
