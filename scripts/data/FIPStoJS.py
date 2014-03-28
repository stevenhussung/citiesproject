f = open("FIPS_CountyName.txt")
lines = f.readlines()

#Strip new lines
lines = [i[:-1] for i in lines]

lines = [[i[:5], i[6:]] for i in lines]

states   = filter( lambda x: (int(x[0]) % 1000) == 0, lines)
counties = filter( lambda x: (int(x[0]) % 1000) != 0, lines)
counties = [[i[0]] + i[1].split(", ") for i in counties]

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
