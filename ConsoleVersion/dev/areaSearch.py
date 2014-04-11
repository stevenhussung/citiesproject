def areaSearch(sourceNum, criteria, data):

    #Count non -1 values in criteria. (This is the number of specified criteria
    numberToMeet = 0
    for i in range(len(criteria)):
        if criteria[i]:
            numberToMeet += 1
    
    #Create list of match distances
    distanceToCity = [0.0 for i in xrange(len(data))]
    
    sourceData = data[sourceNum]

    #Test each criteria
    for i in range(len(criteria)):
        if criteria[i]:

            iData = float(sourceData[i])
            for j in range(len(data)):
                jData = float(data[j][i])
                distanceToCity[j] += (1.0 - jData/iData) ** 2.0
        
    for i in range(len(distanceToCity)):
        distanceToCity[i] = (distanceToCity[i]) ** (1.0/2.0)

    #Create final list of area numbers
    distanceToCity = list(enumerate(distanceToCity))
    distanceToCity.sort(key = lambda x : x[1])

    return distanceToCity[:50]
