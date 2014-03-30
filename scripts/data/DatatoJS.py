f = open("DataSet.txt")
lines = f.readlines()

#Format into data
data = [i.strip().split(",") for i in lines]
data = [data[0]] + [i[:3] + map(float,i[3:7]) + i[7:] for i in data[1:]]

f = open("DataSet.js", "w")
f.write("var DataSet = ")
#Edit here!
f.write(str(data))
f.close()
