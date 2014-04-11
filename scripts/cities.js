var matches = new Array(); //To be populated with a list of matches
var s; // Search criteria
var sort_type; // sort type
var scroll_pos; // scroll position
var p_id;
var f_id;
var color_id = ["#EE9999", "#FFE599", "#9FC5E8", "#B4A7D6", "#B6D7A8"];

var cat_list_ids = [
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 51],
[17, 23, 24, 25, 26, 27, 28, 29, 49],
[33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48],
[30, 31, 32]];
var default_list_ids = [1, 28, 37, 30, 50]; // pop, house, bus, inc, land
var list_name_ids = ["pop", "house", "bus", "inc", "land"];

function find_similar(pivot_id, fips_id, x)
{
	p_id = pivot_id;
	f_id = fips_id;
	y = []
	for (q = 0; q < 5; q++)
	{
		if (x[q] != 0)
			y[q] = x[q];
	}
	C = compareToAllCities(0,pivot_id,y,0,0,5);
	$("#content").html("<h3>Counties similar to "+FIPS_CountyName[fips_id][1]+" "+FIPS_CountyName[fips_id][3]+"</h3><table id='test' cellspacing='5px'><tr id='label_row'></tr><tr id='graph_row'></tr></table><table id='legend'></table><div onclick='display_county("+fips_id+")' class='county_buttons'>Return to County</div>");
	for (i = 0; i< x.length; i++)
	{
		t_name = "elem"+i;
		if (x[i] != 0)
		{
			t_max = 0;
			for (j = 0; j < C.length; j++)
			{
				if (Math.abs(DataSet[C[j][1]][x[i]]) > t_max)
					t_max = Math.abs(DataSet[C[j][1]][x[i]]);
			}
			$("#label_row").append("<td class='axislabel'>"+DataDictTrans[x[i]][1]+"<br><select id='ddown"+i+"' onchange='changeddown("+i+",$(this).val())'></select></td>");
			$("#graph_row").append("<td id='"+t_name+"' rel='"+x[i]+"'><div class='graph'></div></td>");
			for (j = 0; j < C.length; j++)
			{
				$("#"+t_name+" .graph").append("<div><span class='bar' style='height:"+Math.abs(DataSet[C[j][1]][x[i]])/t_max*100+"%;background: "+color_id[j]+"'><span class='text'>"+DataDictTrans[x[i]][2]+add_comma(DataSet[C[j][1]][x[i]].toString())+DataDictTrans[x[i]][3]+"</span></span></div>");
			}
		}
		else {
			if (x[i-1]==0)
			{
				$("#label_row").append("<td class='axislabel'></td>");
				$("#graph_row").append("<td id='"+t_name+"' rel='"+x[i]+"'><div class='graph'></div></td>");
			}
			else
			{
				$("#label_row").append("<td class='axislabel'><br><select id='ddown"+i+"' onchange='changeddown("+i+",$(this).val())'></select></td>");
				$("#graph_row").append("<td id='"+t_name+"' rel='"+x[i]+"'><div class='graph'></div></td>");
			}
		}
		var h = C[i][1]; //(guess here)i
		var h2 = h-100;
		var htmp;
		while (DataSet[C[i][1]][0] != FIPS_CountyName[h][0])
		{
			htmp = Math.floor((h+h2)/2);
			if (DataSet[C[i][1]][0] <= FIPS_CountyName[htmp][0])
			{
				h = htmp;
			}
			else
			{
				h2 = htmp;
			}
		}
		$("#legend").append("<tr><td style='background: " + color_id[i] + "' class='col_code'>" + (i+1) + "</td><td class='county_name' onclick='display_county(" + h + ")'>"+FIPS_CountyName[h][1] + " " + FIPS_CountyName[h][3] + ", " + FIPS_CountyName[h][2] + "</td></tr>");
	}
	$(".axislabel select").append("<option value='0'>Change to...</option>");
	for (l = 1; l < 52; l++)
	{
		$(".axislabel select").append("<option value='"+l+"'>"+DataDictTrans[l][1]+"</option>");
	}
	$(".axislabel select").append("<option value='52'>Clear</option>");
	return 0;
}

function changeddown(a,b)
{
	if (a==0 && b==52)
	{
		alert("Cannot Clear All.");
		return 0;
	}
	if (b == 0)
	{
		return 0;
	}
	z = [];
	for (r = 0; r < 5; r++)
	{
		z[r] = parseInt	($("#elem"+r).attr('rel'));
	}
	if (b!=52)
	{
		z[a] = b
	}
	else
	{
		for (r = a; r < 5; r++)
		{
			z[r] = 0;
		}
	}
	find_similar(p_id, f_id, z);
}


function add_comma(a)
{
	if (a.indexOf(".") == -1 )
	{
		if (a.length > 3)
		{
			add = 0;
			var b = a.substr(a.length-3, 3);
			a = a.slice(0, a.length-3);
			add++;
			d_max = Math.floor((a.length - add) / 3);
			for (d = 0; d < d_max; d++)
			{
				b = a.substr(a.length-3, 3) + "," + b;
				a = a.slice(0, a.length-3);
				add++
			}
			b = a + "," + b;
			return b.toString();
		}
	}
	return a;
}

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
	//var D = DataSet[j];
	$("#content").html("<h3>"+F[1]+" "+F[3]+", "+F[2]+"</h3><table id='county_data'></table><div class='county_buttons' id='compare' onclick='find_similar(" + j + "," + i + ",["+default_list_ids.join()+"])'>Find Similar Cities</div><div onclick='return_search()' class='county_buttons'>Return to Search</div>");
	$("#county_data").append("<table class='dat_tab' id='pop' align='center' cellspacing='0' cellpadding='0'><tr><th>Population<div onclick='expand_list(0,"+j+")'><i>Expand</i></div></th></tr><tr><td id='pop_list'></td></tr></table");
	$("#county_data").append("<table class='dat_tab' id='house' align='center' cellspacing='0' cellpadding='0'><tr><th>Housing<div><i>Expand</i></div></th></tr><tr><td id='house_list'></td></tr></table");
	$("#county_data").append("<table class='dat_tab' id='bus' align='center' cellspacing='0' cellpadding='0'><tr><th>Business<div><i>Expand</i></div></th></tr><tr><td id='bus_list'></td></tr></table");
	$("#county_data").append("<table class='dat_tab' id='inc' align='center' cellspacing='0' cellpadding='0'><tr><th>Income<div><i>Expand</i></div></th></tr><tr><td id='inc_list'></td></tr></table");
	$("#county_data").append("<table class='dat_tab' id='land' align='center' cellspacing='0' cellpadding='0'><tr><th>Land</th></tr><tr><td id='land_list'></td></tr></table");
	for (k = 0; k < 5; k++)
	{
		collapse_list(k,j);
	}
	$("html").scrollTop(0);
	return 0;
}

function collapse_list(i,j)
{
	$("#"+list_name_ids[i]+" th div").html("<i>Expand</i>").attr("onclick","expand_list("+i+","+j+")");
	tmp = add_comma(DataSet[j][default_list_ids[i]].toString());
	$("#"+list_name_ids[i] + "_list").html("<table cellspacing='0'><tr><td class='dat_left'>"+DataDictTrans[default_list_ids[i]][1]+"</td><td class='dat_right'>"+DataDictTrans[default_list_ids[i]][2]+tmp+DataDictTrans[default_list_ids[i]][3]+"</td></tr></table>");
	return 0;
}

function expand_list(i,j)
{
	$("#"+list_name_ids[i]+" th div").html("<i>Collapse</i>").attr("onclick","collapse_list("+i+","+j+")");
	$("#"+list_name_ids[i] + "_list").html("<table cellspacing='0'></table>");
	for (k = 0; k < cat_list_ids[i].length; k++)
	{
		$("#"+list_name_ids[i]+"_list table").append("<tr><td class='dat_left'>"+DataDictTrans[cat_list_ids[i][k]][1]+"</td><td class='dat_right'>"+DataDictTrans[cat_list_ids[i][k]][2] + add_comma(DataSet[j][cat_list_ids[i][k]].toString())+DataDictTrans[cat_list_ids[i][k]][3]+"</td></tr>");
	}
	return 0;
}

function return_search()
{
	$("#content").html("Cities of Macon lets users cities similar to each other using U.S. Census Data. Our end goal is to design and implement a smooth user experiment in searching, displaying, and analyzing results.<div id='search_div'><center><input type='text' name='search' id='search' value='Search by County' onkeydown='if(event.keyCode==13) search_county()' onfocus='if(this.value==this.defaultValue){this.value=\"\"}'><button onclick='search_county()'>Search</button><div id='output'></div>");
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
		alert("Please enter a longer search term.");
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
		$("#output table #" + id_n).append("<div class='list_elem' onclick='display_county("+matches[i][5]+")'><div class='state_abbr'>"+matches[i][3]+"</div>"+matches[i][2]+" "+matches[i][4]+"</div>");
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
