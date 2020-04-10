#!/usr/bin/env python
import sys 
import rospy
from gazebo_msgs.srv import DeleteModel, SpawnModel
from geometry_msgs.msg import *


#rosrun xacro xacro.py mybot.xacro > mybot.urdf 

#from beginner_tutorials.srv import *



def spawn_bot(name,x = 0,y = 0,z = 1) :
    rospy.wait_for_service("/gazebo/spawn_urdf_model")

    try:
        spawner = rospy.ServiceProxy("/gazebo/spawn_urdf_model", SpawnModel)
        spawner(str(name), open("/home/adam/Documents/gitHub/DATX02-Vehicle-Automation/Riskestimator/mybot_ws/src/mybot_description/urdf/mybot.urdf",'r').read(), "/rover", Pose(position= Point(int(x),int(y),int(z)),orientation=Quaternion(0,0,0,0)),"world")
    except rospy.ServiceException as e:
        print("Service call failed: ",e)

if __name__ == "__main__":
    while(1) : 
        inputs = str(raw_input(">"))
        iargs  = inputs.split(" ")
        
        if  iargs[0] == "spawn" and len(iargs) == 5 :    
            spawn_bot(iargs[1],iargs[2],iargs[3],iargs[4])


