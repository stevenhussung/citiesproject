f = open("DataDict.txt")
lines = f.readlines()

#Format into data
data = [i.strip().split() for i in lines]

#From original... ancient code 
#	  _A_
#  # (O.o)
#  |__/*\
#  | /   \
#
# AnCiEnT WiZ0rd!

print(data[0])
data[1] = [data[1][0]] + [" ".join(data[1][1:])]
for i in range(2,len(data)):
	data[i] = [data[i][0]] + [" ".join(data[i][1:-6])] + data[i][-6:]

#data = [[i[:10].strip()] + [i[10:115].strip()] + i[115:].strip().split() for i in data]

#3,4,5, and 6 are numeric entrees
data = data[0:2] + [i[:3] + map(float,i[3:7]) + i[7:] for i in data[2:]]

f = open("DataDict.js", "w")
f.write("var DataDict = ")
f.write(str(data))
f.close()
