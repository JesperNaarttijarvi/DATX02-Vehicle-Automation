#!/usr/bin/env python

import time
import rospy
from std_msgs.msg import String

#Read from the file, if the YOLO algorithm has written 1 in the file, it means
#the algorithm has seen a truck, hence a message should be published to the node.

def truck_pub():
    pub = rospy.Publisher('truck_talker', String, queue_size=10)
    rospy.init_node('truck_pub', anonymous=True)
    rate = rospy.Rate(10) # 10hz
    while not rospy.is_shutdown():
	#Edit the path to a correct file in image.c aswell for the program to work.
	with open("/home/daniel/txtros/rosros.txt", 'r+') as f:
		char = f.read(1)
		if char == "1":
			truck_str = "TruckSeen"
        		rospy.loginfo(truck_str)
        		pub.publish(truck_str)
			f.truncate(0)
        		rate.sleep()
			time.sleep(1)

if __name__ == '__main__':
    try:
        truck_pub()
    except rospy.ROSInterruptException:
        pass
