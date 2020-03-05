#!/usr/bin/env python

import rospy
from std_msgs.msg import String

#Subscribe tester for trucktalker.

def callback(data):
    rospy.loginfo(rospy.get_caller_id() + ' CONFIRMED: %s', data.data)

def truck_list():

    rospy.init_node('truck_list', anonymous=True)

    rospy.Subscriber('truck_talker', String, callback)

    rospy.spin()

if __name__ == '__main__':
    truck_list()
