#!/usr/bin/env python
import sys, os
import rospy
import time
from gazebo_msgs.srv import DeleteModel, SpawnModel, DeleteModelRequest, GetModelState, SetModelState
from gazebo_msgs.msg import ModelState
from std_srvs.srv import Empty
from geometry_msgs.msg import *
from sets import Set
cwd = os.getcwd()
sys.path.append(cwd + "/src/mybot_description/scripts/")
from autodrive import Autodrive
#from src.mybot_description.scripts.autodrive import Autodrive



#rosrun xacro xacro.py mybot.xacro > mybot.urdf 

#from beginner_tutorials.srv import *

class simInterface : 
    def __init__(self,scenario = None): 
        self.robotNames = Set()
        self.reload_bots()
        self.current_scenario = scenario
        self.aDrive = Autodrive()

    def reload_bots(self) : 
        model_coordinates = rospy.ServiceProxy('/gazebo/get_model_state', GetModelState)
        exists = None
        while exists != False :  
            model_coordinates = rospy.ServiceProxy('/gazebo/get_model_state', GetModelState)
            reload_name = "robot" + str(len(self.robotNames))
            message = model_coordinates(reload_name,"")
            exists = message.success
            if exists == True : 
                self.robotNames.add(reload_name)

    def spawn_bot(self,point = Point(0,0,0),quaternion = Quaternion(0,0,0,0), turn = "straight", speed=4, prioLane = False) :        
        
        name = "robot" + str(len(self.robotNames))
        namespace = "robot" + str(len(self.robotNames))

        self.robotNames.add(name)

        model_coordinates = rospy.ServiceProxy('/gazebo/get_model_state', GetModelState)
            
        if model_coordinates(name,"").success == False :     
            rospy.wait_for_service("/gazebo/spawn_urdf_model")
            try:
                spawner = rospy.ServiceProxy("/gazebo/spawn_urdf_model", SpawnModel)
                spawner(str(name), open("/home/simon/Documents/School/DATX02-Vehicle-Automation/Riskestimator/mybot_ws/src/mybot_description/urdf/mybot.urdf",'r').read(), namespace, Pose(position= point,orientation=quaternion),"world")
                self.aDrive.newCar(namespace, len(self.robotNames)+1, turn, speed, prioLane)
            except rospy.ServiceException as e:
                print("Service call failed: ",e)
        else :             
            self.move_bot(name,point,quaternion)
        
        
    def move_bot(self,name,point = Point(0,0,0),quaternion = Quaternion(0,0,0,0)) : 
        rospy.wait_for_service("/gazebo/set_model_state")
        try : 
            placer = rospy.ServiceProxy("/gazebo/set_model_state", SetModelState)
            placer(ModelState(name,Pose(position= point,orientation=quaternion),Twist(Vector3(0,0,0),Vector3(0,0,0)),"world"))

        except rospy.ServiceException as e:
            print("Service call failed: ",e)

    def reset(self) : 
        if  self.current_scenario != None : 
            self.newscenario(self.current_scenario)

        
    def newscenario(self,path) : 
        f = None
        try :  
            f = open(path, "r")
            self.current_scenario = path
        except:
            print("path error")
            return

        num_old = len(self.robotNames)
        self.robotNames.clear()
        for line in f:
            sI.parse(line)            

        num_new = len(self.robotNames)
        for x in range(num_new,num_old) : 
            self.move_bot("robot"+str(x),Point(1000,1000,1000))
    
        play = rospy.ServiceProxy("/gazebo/unpause_physics", Empty)
        play()
        time.sleep(0.05)    
        pause = rospy.ServiceProxy("/gazebo/pause_physics", Empty)
        pause()
    


    def parse(self,line) : 
        words  = line.split(" ")

        if  words[0] == "spawn"  :    
            point = Point(float(words[1]),float(words[2]),float(words[3]))
            if len(words) == 4 :
                self.spawn_bot(point)
            elif len(words) == 8 : 
                quaternion = Quaternion(float(words[4]),float(words[5]),float(words[6]),float(words[7]))
                self.spawn_bot(point,quaternion)
            elif len(words) == 11 : 
                quaternion = Quaternion(float(words[4]),float(words[5]),float(words[6]),float(words[7]))
                self.spawn_bot(point,quaternion, str(words[8]), float(words[9]), bool(words[10]))
        elif words[0] == "reset" or words[0] == "r" : 
            self.reset()
        elif words[0] == "killall" : 
            self.killall()
        elif words[0] == "kill" : 
            self.kill(words[1])
        elif words[0] == "quit" or words[0] == "q" : 
            quit()
        elif words[0] == "list" : 
            print(self.robotNames)
        elif words[0] == "new" : 
            self.newscenario(words[1])
        elif words[0] == "start":
            try:
                self.aDrive.talker()
            except rospy.ROSInterruptException:
                pass



if __name__ == "__main__":
    sI  = None
    print("Spawn car by by writing: spawn x y z x_orientation y_orientation z_orientation turnDirection speed prioLane(True/False)")
    if len(sys.argv) == 2: 
        sI = simInterface(sys.argv[1])
        sI.parse("new " + sys.argv[1])
    else : 
        sI = simInterface()
    while(1) : 
        line = str(raw_input(">"))
        sI.parse(line)


