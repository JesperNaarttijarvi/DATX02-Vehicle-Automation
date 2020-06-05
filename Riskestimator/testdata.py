x0 = 5500
y0 = 3800
s0 = -1000
a0 = 10

x1 = 1200
y1 = 9000
s1 = -800

xi = 1200 
yi = 3800

timeInterval = 0.5

for x in range(100) :
    x0 = x0 + s0 * timeInterval
    s0 = s0 + a0

    y1 = y1 + s1 * timeInterval

    car0 = (x0, y0, 1.57, -s0)
    car1 = (x1, y1, 0, -s1)
    output = "("+ timeInterval + ",[" + str(car0)  + ","+ str(car0) +"],(1,'straight','go'))"
    print(output) 