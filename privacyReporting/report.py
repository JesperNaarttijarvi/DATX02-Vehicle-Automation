def generateReport(data):
    l = cleanData(data)
    
    for i in l:
        print(l[i])
    
def cleanData(data):
    l = data.split(" ")
    i = 0
    while i < len(l):
        if l[i] == "pos" or l[i].isnumeric:
            l.remove(i)
            i += 1
    return l
