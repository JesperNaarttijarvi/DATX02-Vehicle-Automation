#!/usr/bin/env python
# license removed for brevity
import sys
import os
import rospy
import time
from std_msgs.msg import String
from gazebo_msgs.msg import ModelStates
from geometry_msgs.msg import Twist
from squaternion import quat2euler

#home/bachelor20-group39/Documents/DATX02-Vehicle-Automation/Riskestimator/mybot_ws/src/risk_estimation
#sys.path.append("../../risk_estimation")
sys.path.append(str(sys.path[0]).split("mybot_description")[0])
#/home/simon/Documents/School/DATX02-Vehicle-Automation/Riskestimator/mybot_ws/src")
from risk_estimation.config import *
from risk_estimation.driver import *
import time
import random
import math
import numpy as np

class RESystem :

        
    def __init__(self,simulationLength):
            self.speed1 = 1
            self.speed2 = 1
            self.plot = True

            xy_deviation = SIM_CONFIG["xy_deviation"]
            theta_deviation = SIM_CONFIG["theta_deviation"]
            speed_deviation = SIM_CONFIG["speed_deviation"]

            self.deviations = xy_deviation, theta_deviation, speed_deviation
            self.plotafter = 0

            self.total_nr_particles = SIM_CONFIG["total_nr_particles"]

            #random.seed()
            #np.random.seed()
            
            self.car0_old_pos = (None,None)
            self.car1_old_pos = (None,None)

            self.pub = None 
            self.sub = None

            self.riskEstimator = None

            self.simLenght = simulationLength
            self.estimator_time = 0
            self.timeDelta = 0.1
            self.iter = 0

            self.RisksSaved = 3
            self.earlierRisks0 = [0] * self.RisksSaved
            self.earlierRisks1 = [0] * self.RisksSaved  
            self.g_scale = -5

    def updateRisk(self, msg):
        if self.iter <= self.timeDelta*1000 : 
            self.iter += 1
            return 
        else : 
            self.iter = 0 
        self.estimator_time += self.timeDelta    
        
        #!!!Check if system time in fractions!!!
        start_time = time.time()

        bot0 = self.create_car(msg.pose[2],self.car0_old_pos)
        bot1 = self.create_car(msg.pose[3],self.car1_old_pos)
            
        self.car0_old_pos = (bot0[0],bot0[1])
        self.car1_old_pos = (bot1[0],bot1[1])
        
        id, Ic, Is = 0, '', ''

        self.riskEstimator.setKnownIc(id, Ic)
        self.riskEstimator.setKnownIs(id, Is)
        self.riskEstimator.update_state(self.estimator_time, [bot0,bot1])

        self.earlierRisks0.pop(0)
        self.earlierRisks1.pop(0)

        self.earlierRisks0.append(self.riskEstimator.get_risk()[0])
        self.earlierRisks1.append(self.riskEstimator.get_risk()[1])

        #print("risk: " + str(sum(self.earlierRisks1)/self.RisksSaved))

        if sum(self.earlierRisks0)/self.RisksSaved > 0.6 : 
            print("____________WARNING 000000000_____________")
        if sum(self.earlierRisks1)/self.RisksSaved > 0.6 : 
            print("____________WARNING 111111111_____________")

        #print(self.riskEstimator.isManeuverOk(1,"straight"))
        
        self.pub.publish(str(sum(self.earlierRisks0)/self.RisksSaved))
        
        self.timeDelta = time.time() - start_time
        print("estimator time: " + str(self.estimator_time))
        print("sim: " + str(self.simLenght))
        if(self.estimator_time > self.simLenght) : 
            print("_________quit___________")
            rospy.signal_shutdown("finished risk estimator")    

    
    def createModel(self, msg) : 
        self.car0_old_pos = (msg.pose[2].position.x * self.g_scale,msg.pose[2].position.y * self.g_scale)
        self.car1_old_pos = (msg.pose[3].position.x * self.g_scale,msg.pose[3].position.y * self.g_scale)
        
        bot0 = self.create_car(msg.pose[2],self.car0_old_pos)
        bot1 = self.create_car(msg.pose[3],self.car1_old_pos)

        num_car = 2
        id, Ic, Is = 0, '', ''

        pppf = self.total_nr_particles / (num_car**2)
        self.riskEstimator = RiskEstimator(pppf,[bot0,bot1], self.estimator_time, self.deviations, self.plot, self.plotafter)
        self.riskEstimator.setKnownIc(id, Ic)
        self.riskEstimator.setKnownIs(id, Is)
    
    def create_car(self, pose, old_pos) : 
        bot_x = self.g_scale * pose.position.x
        bot_y =  self.g_scale * pose.position.y
        bot_euler = quat2euler(*(pose.orientation.w,pose.orientation.x,pose.orientation.y,pose.orientation.z), degrees=False)
        bot_speed = math.sqrt(math.pow(bot_x-old_pos[0],2)+math.pow(bot_y-old_pos[1],2))/self.timeDelta
        return (bot_x, bot_y,bot_euler[2], bot_speed)
        

    def msg_handler(self, msg) :
        if self.riskEstimator == None :
            self.createModel(msg)
        else : 
            self.updateRisk(msg)

    def listener(self):
        #pub =  rospy.Publisher('/robot1/key_vel', Twist, queue_size=10)
        #pub2 =  rospy.Publisher('/robot2/key_vel', Twist, queue_size=10)
        self.pub =  rospy.Publisher('/risk', String, queue_size=10)
        self.sub = rospy.Subscriber("/gazebo/model_states",ModelStates,self.msg_handler)
        #pub = rospy.Publisher('chatter', String, queue_size=10)
        #rospy.init_node('autodrive')
        rospy.init_node('listener', anonymous=True)
        while not rospy.core.is_shutdown():
             rospy.rostime.wallsleep(0.5)

if __name__ == '__main__':
    
    reSys = None
    if len(sys.argv) == 2: 
        print("args")
        reSys = RESystem(int(sys.argv[1]))
    else : 
        reSys = RESystem(10)
    try:
        reSys.listener()
    except rospy.ROSInterruptException:
        pass
