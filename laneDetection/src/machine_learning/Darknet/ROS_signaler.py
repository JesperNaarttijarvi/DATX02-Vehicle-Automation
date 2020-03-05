import time

def signalForTruck(): 		#0 in switch
	print "Saw a truck"
	text_file = open("/home/daniel/txtros/rosros.txt", "w")
	text_file.write("1")
	text_file.close()
	time.sleep(1)

def signalForStopSign(): 	#1 in switch
	print "Saw a stopsign"
 
def main(argument):
    switcher = {
        0: signalForTruck,
        1: signalForStopSign,
    }
    func = switcher.get(argument, lambda: "Invalid switch input in ROS_signaler")
    func()
