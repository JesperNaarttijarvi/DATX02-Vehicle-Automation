#!/usr/bin/env python
import sys 
import rospy
from gazebo_msgs.srv import DeleteModel, SpawnModel
from geometry_msgs.msg import *


#rosrun xacro xacro.py mybot.xacro > mybot.urdf 

#from beginner_tutorials.srv import *

class simInterface : 
    def __init__(self):
         self.numRobots = 0

    def spawn_bot(self,name,point = Point(0,0,0),quaternion = Quaternion(0,0,0,0)) :
        rospy.wait_for_service("/gazebo/spawn_urdf_model")

        namespace = "/robot" + str(self.numRobots)
        self.numRobots += 1
        
        try:
            spawner = rospy.ServiceProxy("/gazebo/spawn_urdf_model", SpawnModel)
            spawner(str(name), open("/home/adam/Documents/gitHub/DATX02-Vehicle-Automation/Riskestimator/mybot_ws/src/mybot_description/urdf/mybot.urdf",'r').read(), namespace, Pose(position= point,orientation=quaternion),"world")
        except rospy.ServiceException as e:
            print("Service call failed: ",e)

    def parse(self,line) : 
        words  = line.split(" ")
        print("1")
        if  words[0] == "spawn"  :    
            print("spawning bot")
            point = Point(float(words[2]),float(words[3]),float(words[4]))
            if len(words) == 5 :
                self.spawn_bot(words[1],point)
            elif len(words) == 9 : 
                quaternion = Quaternion(float(words[5]),float(words[6]),float(words[7]),float(words[8]))
                self.spawn_bot(words[1],point,quaternion)
            
        

if __name__ == "__main__":
    sI  = simInterface()
    if len(sys.argv) == 2: 
        f = open(sys.argv[1], "r")
        for line in f:
            sI.parse(line)        
    while(1) : 
        line = str(raw_input(">"))
        sI.parse(line)


