import os
#(0,[(5, -20, 1.57, 0),(-30, 5, 0, 0)],(1,'straight','go'))

x0 = 10
y0 = -50
s0 = 10
a0 = 0

x1 = -50
y1 = 5
s1 = 10
a1 = 0

xi = 0 
yi = 0

timeInterval = 0.05
time = 0

os.remove("debug.txt") 
f = open("debug.txt", "a")


for x in range(400) :
     
     y0 = y0 + s0 * timeInterval
     x1 = x1 + s1 * timeInterval
     
     if s0 > 0 and y0 > -40 : 
          s0 = s0 + a0 * timeInterval
     elif y0 > -20 :
          s0 = 0
      
     
     s1 = s1 + a1 * timeInterval   

    



     car0 = (x0, y0, 1.57, -s0)
     car1 = (x1, y1, 0, -s1)
     
     output = "("+ str(time) + ",[" + str(car0)  + ","+ str(car1) +"],(0,'',''))\n"
     f.write(output)
     time = time + timeInterval


print("write success")
f.close()