OBJS = DataDict.js DataSet.js FIPS_CountyName.js FIPS_StateName.js


all : $(OBJS)

DataDict.js : DicttoJS.py DataDict.txt
	python DicttoJS.py

DataSet.js : DatatoJS.py DataSet.txt
	python DatatoJS.py

FIPS_CountyName.js : FIPStoJS.py FIPS_CountyName.txt
	python FIPStoJS.py

clean :
	rm DataDict.js
	rm DataSet.js
	rm FIPS_CountyName.js
