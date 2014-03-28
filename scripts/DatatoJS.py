f = open("DataSet.txt")
lines = f.readlines()

#Format into data
data = [i.strip().split(",") for i in lines]

#Now load data headers

#...comingsoon.

f = open("DataSet.js", "w")
f.write("var DataSet = ")
#Edit here!
f.write(str(data))
f.close()
