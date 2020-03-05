import time

#This python is called by callpython.c, which is called when the algorithm detects another truck.
#This program is responsible for writing to a txt file, which is read by ROS (trucktalker.py) to publish message to the node for the truck to act.

def signalForTruck(): 		#0 in switch
	print "Saw a truck"
	text_file = open("/home/daniel/txtros/rosros.txt", "w")
	text_file.write("1")
	text_file.close()
	time.sleep(1)

#This code can be modified for more objects that can make our truck do different things. To do this, just ad a new switch in the main function.	
	
#def signalForStopSign(): 	#1 in switch
#	print "Saw a stopsign"
 
def main(argument):
    switcher = {
        0: signalForTruck,
        #1: signalForStopSign,
    }
    func = switcher.get(argument, lambda: "Invalid switch input in ROS_signaler")
    func()
