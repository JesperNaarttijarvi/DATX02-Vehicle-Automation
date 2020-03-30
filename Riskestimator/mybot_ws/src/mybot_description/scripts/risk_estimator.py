#!/usr/bin/env python
# license removed for brevity
import rospy
import os
from std_msgs.msg import String
from gazebo_msgs.msg import ModelStates
from geometry_msgs.msg import Twist
import sys
sys.path.append("/home/simon/Documents/School/DATX02-Vehicle-Automation/Riskestimator/mybot_ws/src")
from risk_estimation.config import *
from risk_estimation.driver import *
import time
import random
import math
import numpy as np

class RESystem :


    def __init__(self):
            self.speed1 = 1
            self.speed2 = 1
            self.plot = True

            xy_deviation = SIM_CONFIG["xy_deviation"]
            theta_deviation = SIM_CONFIG["theta_deviation"]
            speed_deviation = SIM_CONFIG["speed_deviation"]

            self.deviations = xy_deviation, theta_deviation, speed_deviation

            self.total_nr_particles = SIM_CONFIG["total_nr_particles"]

            #random.seed()
            #np.random.seed()
            self.plotafter = 0

            self.car0_old_pos = (None,None)
            self.car1_old_pos = (None,None)
            self.estimator_time = 0
            self.frequency = 0.1

            self.riskEstimator = None

            self.iter = 0
    
            
    def newModel(self, msg):
        rospy.loginfo(msg.pose[3].position.x)
        if msg.pose[2].position.x < 3 : 
            rospy.loginfo("speed is 0")
            self.speed1 = 0

    #from: https://stackoverflow.com/questions/53033620/how-to-convert-euler-angles-to-quaternions-and-get-the-same-euler-angles-back-fr
    def quaternion_to_euler(self,x, y, z, w):
        t0 = +2.0 * (w * x + y * z)
        t1 = +1.0 - 2.0 * (x * x + y * y)
        X = math.atan2(t0, t1)

        t2 = +2.0 * (w * y - z * x)
        t2 = +1.0 if t2 > +1.0 else t2
        t2 = -1.0 if t2 < -1.0 else t2
        Y = math.asin(t2)

        t3 = +2.0 * (w * z + x * y)
        t4 = +1.0 - 2.0 * (y * y + z * z)
        Z = math.atan2(t3, t4)

        return (X, Y, Z)


    def updateRisk(self, msg):

        if self.iter <= 100 : 
            self.iter += 1
            return 
        else : 
            self.iter = 0 

        bot0_x = -10 * msg.pose[2].position.x
        bot0_y =  -10 * msg.pose[2].position.y
        bot0_quaternion = msg.pose[2].orientation
        bot0_euler = self.quaternion_to_euler(bot0_quaternion.x,bot0_quaternion.y,bot0_quaternion.z,bot0_quaternion.w)

        bot1_x = -10 * msg.pose[3].position.x
        bot1_y =  -10 *  msg.pose[3].position.y
        bot1_quaternion = msg.pose[3].orientation
        bot1_euler = self.quaternion_to_euler(bot1_quaternion.x,bot1_quaternion.y,bot1_quaternion.z,bot1_quaternion.w)
        
        Z = bot1_euler[2]


        if self.car0_old_pos == (None,None) : 
            self.car0_old_pos = (bot0_x,bot0_y)
            self.car1_old_pos = (bot1_x,bot1_y)
        
        bot0_speed = math.sqrt(math.pow(bot0_x-self.car0_old_pos[0],2)+math.pow(bot0_y-self.car0_old_pos[1],2))/self.frequency
        bot1_speed = math.sqrt(math.pow(bot1_x-self.car1_old_pos[0],2)+math.pow(bot1_y-self.car1_old_pos[1],2))/self.frequency
        
        self.car0_old_pos = (bot0_x,bot0_y)
        self.car1_old_pos = (bot1_x,bot1_y)

        bot0 = (bot0_x, bot0_y,bot0_euler[2], bot0_speed)
        bot1 = (bot1_x, bot1_y,bot1_euler[2], bot1_speed)
        num_car = 2
        id, Ic, Is = 0, '', ''

        if self.estimator_time == 0 :
            pppf = self.total_nr_particles / (num_car**2)
            self.riskEstimator = RiskEstimator(pppf,[bot0,bot1], self.estimator_time, self.deviations, self.plot, self.plotafter)
            self.riskEstimator.setKnownIc(0, Ic)
            self.riskEstimator.setKnownIs(0, Is)
        else : 
            print self.estimator_time # timestamp
            self.riskEstimator.setKnownIc(id, Ic)
            self.riskEstimator.setKnownIs(id, Is)
            self.riskEstimator.update_state(self.estimator_time, [bot0,bot1])
        
        self.estimator_time += self.frequency
        

    def listener(self):
        #pub =  rospy.Publisher('/robot1/key_vel', Twist, queue_size=10)
        #pub2 =  rospy.Publisher('/robot2/key_vel', Twist, queue_size=10)
        sub = rospy.Subscriber("/gazebo/model_states",ModelStates,self.updateRisk)
        #pub = rospy.Publisher('chatter', String, queue_size=10)
        #rospy.init_node('autodrive')
        rospy.init_node('listener', anonymous=True)
        rospy.spin()


if __name__ == '__main__':
    try:
        reSys = RESystem()
        reSys.listener()
    except rospy.ROSInterruptException:
        pass
