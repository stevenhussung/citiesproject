function search_f()
{
	var s = ($("#search").val()).toLowerCase();
	a = s.length;
	if ((s.slice(a-7,a)).localeCompare(" county") == 0)
	{
		s = s.slice(0,a-7)
	}
	else if ((s.slice(a-17,a)).localeCompare(" city and borough") == 0)
	{
		s = s.slice(0,a-17);
	}
	else if ((s.slice(a-8,a)).localeCompare(" borough") == 0)
	{
		s = s.slice(0,a-8);
	}
	else if ((s.slice(a-7,a)).localeCompare(" parish") == 0)
	{
		s = s.slice(0,a-7);
	}
	else if ((s.slice(a-12,a)).localeCompare(" census area") == 0)
	{
		s = s.slice(0,a-12);
	}
	else if ((s.slice(a-13,a)).localeCompare(" municipality") == 0)
	{
		s = s.slice(0,a-13);
	}
	var t = $("input[type='radio']:checked").val();
	var matches = new Array();
	m = 0;
	if(s.length<3)
	{
		// Case when search criteria is short
		alert("LONGER SEARCH PL0XRS");
	}
	else
	{
		// Matching by 3 letter segments
		spell_cases = s.length - 2;
		for (s_case = 0; s_case < spell_cases; s_case++)
		{
			for (i = 0; i < FIPS_CountyName.length; i++)
			{
				s_case_end = s_case + 3;
				s_n = FIPS_CountyName[i][1].toLowerCase();
				s_m = s.slice(s_case, s_case_end);
				if (s_n.match(s_m))
				{
					matches[m] = i;
					m++
				}
			}
		}	
		matches.sort(sortNumber);
		var fin_m = new Array();
		fin_m[0] = [0,0];
		
		for (i = 0; i < FIPS_CountyName.length; i++)
		{
			temp = 0;
			for (r = 0; r < matches.length; r ++)
			{
				if (i == matches[r])
				{
					temp ++;
				}
			}
			if (temp != 0)
			{
				fin_m.push([temp,i]);
			}
		}
		(fin_m.sort()).reverse();
		if (fin_m[0][0] == 0)
		{
			// No search results
			$("#output").html("No search results found. Please refine your search.");
		}
		else
		{
			$("#output").html("<table cellspacing='20px' cellpadding='0'><tr><td id='list1'></td><td id='list2'></td><td id='list3'></td></tr></table>");
			// at elast 1 results
			i = 0;
			// WHAT IF fin_m[i][0] == length of word - 2?
			while (fin_m[i][0] > fin_m[0][0]/2.0 && i < 24)
			{
				j = i % 3 + 1;
				n = "list" + j.toString();
				b = FIPS_CountyName[fin_m[i][1]][1];
				$("#output table #" + n).append("<div class='list_elem'><div class='state_abbr'>"+FIPS_CountyName[fin_m[i][1]][2]+"</div>"+b+"</div>");
				i++
			}
		}
	}
}

function sortNumber(a,b)
{
	return b - a;
}
