def generateReport(data):
    l = cleanData(data)
    for item in l[:]:
        print(item)
    
def cleanData(data):
    l = data.split(" ")
    
    for item in l[:]:
        if item == "pos":
            l.remove(item)
    return l
