alert(FIPS_StateName[0].join());

// Real code below
function search_f()
{
	var s = ($("#search").val()).toLowerCase();
	
	var t = $("input[type='radio']:checked").val();
	var matches = new Array();
	m = 0;
	if (t == 0) // By county
	{
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
				// at elast 1 results
				$("#output").html("The following counties match your search:<br/>");
				i = 0;
				// WHAT IF fin_m[i][0] == length of word - 2?
				while (fin_m[i][0] > fin_m[0][0]/2.0)
				{
					$("#output").append(FIPS_CountyName[fin_m[i][1]] + ", " + fin_m[i][0] + "<br>");
					i++
				}
			}
		}
	}
	else // By State
	{

	}
}

function sortNumber(a,b)
{
	return b - a;
}
