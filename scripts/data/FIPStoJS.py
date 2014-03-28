f = open("FIPS_CountyName.txt")
lines = f.readlines()

#Strip new lines
lines = [i[:-1] for i in lines]

lines = [[i[:5], i[6:]] for i in lines]

states   = filter( lambda x: (int(x[0]) % 1000) == 0, lines)
counties = filter( lambda x: (int(x[0]) % 1000) != 0, lines)
counties = [[i[0]] + i[1].split(", ") for i in counties]

for i in range(len(counties)):
	if counties[i][1][-7:] == " County":
		counties[i][1] = counties[i][1][:-7]
		counties[i].append("County")
	elif counties[i][1][-17:] == " City and Borough":
		counties[i][1] = counties[i][1][:-17]
		counties[i].append("City and Borough")
	elif counties[i][1][-8:] == " Borough":
		counties[i][1] = counties[i][1][:-8]
		counties[i].append("Borough")
	elif counties[i][1][-7:] == " Parish":
		counties[i][1] = counties[i][1][:-7]
		counties[i].append("Parish")	
	elif counties[i][1][-12:] == " Census Area":
		counties[i][1] = counties[i][1][:-12]
		counties[i].append("Census Area")
	elif counties[i][1][-13:] == " Municipality":
		counties[i][1] = counties[i][1][:-13]
		counties[i].append("Municipality")
	elif counties[i][1][-5:].lower() == " city":
		counties[i][1] = counties[i][1][:-5]
		counties[i].append("City")
	else:
		# ONLY DC
		counties[i].append("")

print states
print counties[:50]

f = open("FIPS_StateName.js", "w")
f.write("var FIPS_StateName = ")
f.write(str(states))
f.close()

f = open("FIPS_CountyName.js", "w")
f.write("var FIPS_CountyName = ")
f.write(str(counties))
f.close()
