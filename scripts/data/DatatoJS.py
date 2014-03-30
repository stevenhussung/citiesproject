f = open("DataSet.txt")
lines = f.readlines()

#Format into data
data = [i.strip().split(",") for i in lines]
data = [data[0]] + [map(float,i) for i in data[1:]]

f = open("DataSet.js", "w")
f.write("var DataSet = ")
#Edit here!
f.write(str(data))
f.close()
