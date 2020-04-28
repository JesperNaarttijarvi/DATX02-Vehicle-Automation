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
from gazebo_msgs.srv import GetModelState

class RESystem :

        
    def __init__(self,simulationLength,numBots):

        self.plot = True

        self.numBots = numBots

        print(self.numBots)

        xy_deviation = SIM_CONFIG["xy_deviation"]
        theta_deviation = SIM_CONFIG["theta_deviation"]
        speed_deviation = SIM_CONFIG["speed_deviation"]

        self.deviations = xy_deviation, theta_deviation, speed_deviation
        self.plotafter = 0

        self.total_nr_particles = SIM_CONFIG["total_nr_particles"]

        self.cars = {
            0 : {
                "oldPos" : (None, None)
            },
            1 : {
                "oldPos" : (None, None)
            }
        }

        self.bots = []


        self.pub = None 
        self.sub = None

        self.riskEstimator = None

        self.simLenght = simulationLength
        self.estimator_time = 0
        self.timeDelta = 0.1
        self.iter = 0

        self.earlierRisks = []

        self.RisksSaved = 3
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

        for i in range(self.numBots):
            self.cars[i]["oldPos"] = (msg.pose[i+2].position.x * self.g_scale,msg.pose[i+2].position.y * self.g_scale)
            self.bots[i] = (self.create_car(msg.pose[i+2],self.cars[i]["oldPos"]))
        
        id, Ic, Is = 0, '', ''

        self.riskEstimator.setKnownIc(id, Ic)
        self.riskEstimator.setKnownIs(id, Is)
        self.riskEstimator.update_state(self.estimator_time, self.bots)

        for i in range(self.numBots):
            self.earlierRisks[i].pop(0)
            self.earlierRisks[i].append(self.riskEstimator.get_risk()[i])
            if sum(self.earlierRisks[i])/self.RisksSaved > 0.6 : 
                print("____________WARNING " + str(i) +"_____________")
        
        #Fix so each risk is published correctly
        self.pub.publish(str(sum(self.earlierRisks[0])/self.RisksSaved))
        
        self.timeDelta = time.time() - start_time
        print("estimator time: " + str(self.estimator_time))
        print("sim: " + str(self.simLenght))
        if(self.estimator_time > self.simLenght) : 
            print("_________quit___________")
            rospy.signal_shutdown("finished risk estimator")    

    
    def createModel(self, msg) : 
        for i in range(self.numBots):
            self.cars.update({i : {"oldPos" : (msg.pose[i+2].position.x * self.g_scale,msg.pose[i+2].position.y * self.g_scale)}})
            self.bots.append(self.create_car(msg.pose[i+2],self.cars[i]["oldPos"]))
            #One riskSaver for each car
            self.earlierRisks.append([0] * self.RisksSaved)

        num_car = self.numBots
        id, Ic, Is = 0, '', ''

        pppf = self.total_nr_particles / (num_car**2)
        self.riskEstimator = RiskEstimator(pppf, self.bots, self.estimator_time, self.deviations, self.plot, self.plotafter)
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
    if len(sys.argv) == 3: 
        print("args")
        reSys = RESystem(int(sys.argv[1]), int(sys.argv[2]))
    else : 
        reSys = RESystem(10, 2)
    try:
        reSys.listener()
    except rospy.ROSInterruptException:
        pass
