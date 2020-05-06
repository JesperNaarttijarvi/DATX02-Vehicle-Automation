#!/usr/bin/env python
# license removed for brevity
import sys
import os
import rospy
import time
import csv
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

        
    def __init__(self,simulationLength,numBots,scenario):

        self.plot = False
        self.riskAtTime = []
        self.collisionTime = None
        self.numBots = numBots
        self.scenario = scenario

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


        self.timestamp = time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime())

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
            self.bots[i] = (self.create_car(msg.pose[i+2],self.cars[i]["oldPos"]))
            self.cars[i]["oldPos"] = (msg.pose[i+2].position.x * self.g_scale,msg.pose[i+2].position.y * self.g_scale)
        
        id, Ic, Is = 1, 'straight', 'go'

        self.riskEstimator.setKnownIc(id, Ic)
        self.riskEstimator.setKnownIs(id, Is)
        self.riskEstimator.update_state(self.estimator_time, self.bots)

        '''
        for i in range(self.numBots):
            self.earlierRisks[i].pop(0)
            self.earlierRisks[i].append(self.riskEstimator.get_risk()[i])
            if sum(self.earlierRisks[i])/self.RisksSaved > 0.6 : 
                pass
        '''

        #Save when risk was acknowledged, only do so for the 'turning' car
        if self.riskEstimator.get_risk()[0] > 0.7:
            self.riskAtTime.append(round(self.estimator_time, 2))

        for i in range (self.numBots-1):
            if (abs(msg.pose[i+2].position.x * self.g_scale - msg.pose[i+3].position.x * self.g_scale) < 2.7 and
                abs(msg.pose[i+2].position.y * self.g_scale - msg.pose[i+3].position.y * self.g_scale) < 2.7 and
                self.collisionTime == None):
                    self.collisionTime = self.estimator_time
                    line = []
                    line.append(self.timestamp)
                    line.append(self.scenario)
                    if(self.riskAtTime != []):
                        line.append("Risk perceived: " + str(self.riskAtTime[0]))
                        line.append("Collision: " + str(self.collisionTime))
                        line.append("Time delta: " + str(self.collisionTime-self.riskAtTime[0]))
                    else:
                        line.append("Risk missed")
                        line.append("Collision: " + str(self.collisionTime))
                    with open('sim_data/collisions.csv', 'a') as file:
                        writer = csv.writer(file)
                        writer.writerow(line)


        #remove this comment use adaptive time
        #self.timeDelta = time.time() - start_time

        self.append_CSV(self.bots, self.riskEstimator.get_risk())
        
        if(self.estimator_time > self.simLenght) :
            if "notsafe" not in self.scenario:
                line = []
                line.append(self.timestamp)
                line.append(self.scenario)
                if(self.riskAtTime != []):
                    line.append("Risk wrongly perceived at: " + str(self.riskAtTime))
                else:
                    line.append("No risk detected")
                with open('sim_data/nonCollisions.csv', 'a') as file:
                    writer = csv.writer(file)
                    writer.writerow(line)
            print("_________quit___________")
            rospy.signal_shutdown("finished risk estimator")    

    def append_CSV(self,listOfbots,botRisks) :
        decimals = 2

        line = [str(round(self.estimator_time,decimals))]
        for x in range(len(listOfbots )) :
            line.append("   ")
            line.append(round(listOfbots[x][0],decimals))
            line.append(round(listOfbots[x][1],decimals))
            line.append(round(listOfbots[x][2],decimals))
            line.append(round(listOfbots[x][3],decimals))
            line.append(round(botRisks[x],decimals))

        with open('sim_data/' + str(self.timestamp) + '.csv', 'a') as file:
            writer = csv.writer(file)
            
            writer.writerow(line)
    

    def createModel(self, msg) : 
        for i in range(self.numBots):
            self.cars.update({i : {"oldPos" : (msg.pose[i+2].position.x * self.g_scale,msg.pose[i+2].position.y * self.g_scale)}})
            self.bots.append(self.create_car(msg.pose[i+2],self.cars[i]["oldPos"]))
            #One riskSaver for each car
            self.earlierRisks.append([0] * self.RisksSaved)

        num_car = self.numBots
        id, Ic, Is = 0, '', ''

        pppf = self.total_nr_particles / (num_car**2)
        self.riskEstimator = RiskEstimator(pppf, self.bots, self.estimator_time, self.deviations, self.plot, self.timestamp, self.plotafter)
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
        #self.pub =  rospy.Publisher('/risk', String, queue_size=10)
        self.sub = rospy.Subscriber("/gazebo/model_states",ModelStates,self.msg_handler)
        #pub = rospy.Publisher('chatter', String, queue_size=10)
        #rospy.init_node('autodrive')
        rospy.init_node('listener', anonymous=True)
        while not rospy.core.is_shutdown():
             rospy.rostime.wallsleep(0.5)

if __name__ == '__main__':
    
    reSys = None
    if len(sys.argv) == 4: 
        print("args")
        reSys = RESystem(int(sys.argv[1]), int(sys.argv[2]), str(sys.argv[3]))
    else : 
        reSys = RESystem(10, 2, None)
    try:
        reSys.listener()
    except rospy.ROSInterruptException:
        pass
