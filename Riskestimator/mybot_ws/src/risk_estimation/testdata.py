x0 = 5500
y0 = 3800
s0 = -1000
a0 = 80

x1 = 1200
y1 = 9000
s1 = -800

xi = 1200 
yi = 3800

timeInterval = 0.1
time = 0

for x in range(100) :
     x0 = x0 + (s0 * timeInterval)

     if s0 < -50 : 
          s0 = s0 + a0 * timeInterval
     else :
          s0 = 0

     y1 = y1 + s1 * timeInterval

     car0 = (x0, y0, 1.57, -s0)
     car1 = (x1, y1, 0, -s1)
     output = "("+ str(time) + ",[" + str(car0)  + ","+ str(car0) +"],(1,'straight','go'))"
     time = time + timeInterval
     print(output) 
     