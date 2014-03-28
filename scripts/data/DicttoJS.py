f = open("DataDict.txt")
lines = f.readlines()

#Format into data
data = [i.strip() for i in lines]

#From original... ancient code 
#	  _A_
#  # (O.o)
#  |__/*\
#  | /   \
#
# AnCiEnT WiZaRd!

data = [[i[:10].strip()] + [i[10:115].strip()] + i[115:].strip().split() for i in data]

#3,4,5, and 6 are numeric entrees
data = [data[0]] + [i[:3] + map(float,i[3:7]) + i[7:] for i in data[1:]]

f = open("DataDict.js", "w")
f.write("var DataDict = ")
f.write(str(data))
f.close()
