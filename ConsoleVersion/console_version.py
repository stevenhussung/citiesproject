#                               ~                                #
#                                                                #
#                         PROJECT TITLE                          #
#                                                                #
#   Linking cities across the United States through statistics   #
#                                                                #
#                        Steven R Hussung                        #
#                                                                #
#                               ~                                #

#TO DO:
# Add in blanket increase and decrease in tolerance percentages. Just multiply all of the tolerances by 10% or something. So 15 -> 16.5 -> 18.1 -> 20.0 ... or 20 -> 18 -> 17.2 Perhaps use a larger percentage

from areaSearch import areaSearch 
def extractName(dataDict, i):
    return dataDict[i][10:115].strip()

#Read the data from "DataSet.txt"
print "Reading data"
dataset = open("data/DataSet.txt")
dataSetLines = dataset.read().split("\n")
dataset.close()

print "Processing data"
#The first line lists the contents of each following line in abbreviated form.
#I will strip this first line
attributes = dataSetLines[0].split(",")
del dataSetLines[0]

#Create the raw data set
rawData = [dataSetLines[i].split(",") for i in range(len(dataSetLines))]
del rawData[-1]

#Create a dictionary to convert area codes into area names
print "Creating county code translator"
areasFile = open("data/FIPS_CountyName.txt")
areasString = areasFile.read().strip()
areasFile.close()

areasLines = areasString.split("\n")
areas = [tuple(areasLines[i].split(" ",1)) for i in range(len(areasLines))]
codeToArea = dict(areas)

#Create a new array using the actual area names
data = [[codeToArea[rawData[i][0]]] + rawData[i][1:] for i in range(len(rawData))]

del rawData
del codeToArea

#Read general attribute information in
print  "Reading general attribute information"
dictFile = open("data/DataDict.txt")
dataDict = dictFile.read().strip().split("\n")
dictFile.close()
dictHeader = dataDict[0]
del dataDict[0]
print "Data processing finished."

#Now that we have the data in place, we can search
#   sourceNum is the number of the source area in the data array
#   criteria is a list with the same length as attributes describing which attributes matter and which don't. 
#      Example: criteria = [-1, -1, 0.1, -1, 0.2, 0.1]
#      This means the first, second, and fourth entries DO NOT matter. They will be ignored
#   numberToMeet is the number of criteria which must be met. If not given, it will be set to the number of non -1 values in criteria, so the matching areas must meet all desired criteria.


#Sample criteria
areaNum = 409 #This is Bibb County's code
data[areaNum]
criteria = [-1]*52
criteria[1] = 0.2
#criteria[9] = 0.2
criteria[32] = 0.1
nameMatches = []

#Begin control loop
entry = "a"
while entry!= "q":
    print "--------------------"
    print "Commands:"
    print "s/S search using given criteria"
    print "d/D display current criteria"
    print "a/A add or edit criterion"
    print "f/F show full list of criteria"
    print "w/W wipe (reset) criteria"
    print "r/R change area used as \"pivot\""
    print "g/G show census data for pivot city"
    print "q/Q quit program"
    print "m/M quickly multiply all tolerance values by 1.1 or 0.9. "
    entry = raw_input().strip().lower()
    print "--------------------"
    
    if entry == "s":
        #Search for matches
        print "Searching database for matches"
        areasLikeSample = areaSearch(areaNum, criteria, data)
        nameMatches = [data[areasLikeSample[i]][0] for i in range(len(areasLikeSample))]
        
        #Display matches
        for i in range(len(nameMatches)):
            print data[areasLikeSample[i]][0]
        
    elif entry == "d":
        print "Display current criteria"
        print ""
        print "Current Area:", data[areaNum][0]
        print ""
        print "Criterion Number:\tTolerance:\tName:"
        for i in range(len(criteria)):
            if criteria[i] == -1:
                continue
            else:
                print str(i) + "\t\t\t" + str(criteria[i]*100) + "%\t\t" + extractName(dataDict,i)
        print ""

    elif entry == "a":
        print "Add, edit, or delete criterion"
        print "enter number of criterion"
        number = int(raw_input().strip())
        print extractName(dataDict,number)
        print "enter desired tolerance. Enter \"20\" if you would like a tolerance of 20% or 0.2"
        print "if you would like to eliminate the criterion, enter -1"
        tolerance = float(raw_input().strip())/100.0
        criteria[number] = tolerance
        if criteria[number]*100 == -1:
            criteria[number] = -1

    elif entry == "f":
        print "Display full list of criteria:"
        for i in range(len(dataDict)):
            print i,extractName(dataDict,i)

    elif entry == "w":
        print "Reset criteria"
        criteria = [-1]*52

    elif entry == "r":
        entry = "c".lower()
        while entry == "c":

            print "Search for new pivot area"
            print ""
            print "Notes:"
            print "The program can use a portion of a name. "
            print "It will not correct misspellings."
            print "It is not case sensitive."
            print ""
            print "Enter a portion of the name of the area you would like to find."
            searchString = raw_input().strip()

            #Search database for matching areas
            matchList = []
            for i in range(len(data)):
                if data[i][0].lower().find(searchString) >= 0:
                    matchList = matchList + [[i,data[i][0]]]
            
            if len(matchList) > 0:
                for i in range(len(matchList)):
                    print i+1, "\t", matchList[i][1]

                #Ask user if they would like to repeat the search or enter an area code
                print "Please choose one of these areas by number"
                userNum = int(raw_input().strip())

                if userNum < 1 or len(matchList) < userNum:
                    print "Your number was outside the correct bounds."
                    print "Automatically setting pivot to", matchList[0][0]
                    userNum = 1

                #Change pivot area 
                areaNum = matchList[userNum - 1][0]
                print "New pivot area:", data[areaNum][0]

                #Time to exit
                entry = "d"

            else:
                print "Your search returned no results."
                print "c/C continue searching"
                print "d/D done searching"
                entry = raw_input().strip().lower()

        #Reset entry to original value
        entry = "r"
             
    elif entry == "g":
        print "Information for",data[areaNum][0]
        print "  Criteria Name".ljust(95) + data[areaNum][0].ljust(30) + "United States"
        print "-"*140
        for i in range(1,len(dataDict)):

             #Determine whether or not to add percent signs
             if dataDict[i].find("PCT") != -1:
                symbol = "%"
             else:
                symbol = ""
             USValue = dataDict[i].split()[-4]
             print "  " + extractName(dataDict, i).ljust(105) + str(data[areaNum][i] + symbol).ljust(19) + " " + USValue + symbol
             print "-"*140

    elif entry == "m":
        print "Increase or decrease tolerances: type i or j respectively."
        entry = raw_input().strip().lower()
        for i in xrange(len(criteria)):
            if criteria[i] != -1:
                criteria[i] *= 1 + (0.1 if entry == "i" else -0.1)
                #criteria[i] = 0.01 * round(100 * criteria[i]) Rounding causes errors -- don't. 

    elif entry == "q":
        print "Thank you for using this program. I hope you have found it useful."
        print ""
        print " - - - - - - - - - - - -"
        print " -  Steven R. Hussung  -"
        print " -   Developed 2013    -"
        print " - - - - - - - - - - - -"
        print ""
    else:
        print "Unknown command"
