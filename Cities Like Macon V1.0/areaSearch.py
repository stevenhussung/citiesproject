def areaSearch(sourceNum, criteria, data):

    #Count non -1 values in criteria. (This is the number of specified criteria
    numberToMeet = 0
    for i in range(len(criteria)):
        if criteria[i] != -1:
            numberToMeet += 1
    
    #Create integer list of possible matches
    #The integer describes how many criteria were met
    areaIsViable = [0 for i in xrange(len(data))]
    
    sourceData = data[sourceNum]
    
    #Test each criteria
    for i in range(len(criteria)):
        if criteria[i] == -1:
            continue

        else:
            #print "sourceData[i]", sourceData[i]
            minVal = float(sourceData[i]) * (1 - criteria[i])
            maxVal = float(sourceData[i]) * (1 + criteria[i])
            #print "minVal",minVal
            #print "maxVal",maxVal
            
            for j in range(len(data)):
                thisData = float(data[j][i])
                #print "thisData",thisData
                if minVal < thisData and thisData < maxVal :
                    areaIsViable[j] += 1
        
    #Create final list of area numbers
    finalList = []
    for i in range(len(data)):
        if areaIsViable[i] >= numberToMeet:
            finalList += [i]
    
    return finalList
