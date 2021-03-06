#!/usr/bin/env python
# license removed for brevity
import rospy
from std_msgs.msg import String
from gazebo_msgs.msg import ModelStates
from geometry_msgs.msg import Twist
from squaternion import quat2euler

class Autodrive : 
    def __init__(self):
            self.exitSimulation = False
            self.aquireDistNonPrio = 4 # should be atleast 4
            self.aquireDistPrio = 8 # should be atleast 4
            self.stoppingTurn = None
            self.initiatedTurn = "false"
            self.firstIter = True
            self.publishers = []
            #carId starts from 2
            self.cars = {
                2 : {
                "speed" : 4,
                "angle" : 0,
                "twist" : 0, #The cars starting angle, will be set at first iteration
                "turn" : "right",
                "criticalSectionAquired" : False,
                "maneuverComplete" : False,
                "priorityLane" : False,
                "enteredCrossing" : False
                },
                3 : {
                "speed" : 4,
                "angle" : 0,
                "twist" : 0, #The cars starting angle, will be set at first iteration
                "turn" : "right",
                "criticalSectionAquired" : False,
                "maneuverComplete" : False,
                "priorityLane" : False,
                "enteredCrossing" : False
                }
            }

    def stopSimulation(self):
        self.exitSimulation = True

    def startSimulation(self):
        self.exitSimulation = False

    def reset(self):
        for car in self.cars:
            self.cars[car]["maneuverComplete"] = False
            self.cars[car]["enteredCrossing"] = False
            self.cars[car]["criticalSectionAquired"] = False
        self.firstIter = True

    def newCar(self, name, carId, turn, speed, prioLane):
        # create publisher for car
        if len(self.publishers) < carId-1:
            self.publishers.append(rospy.Publisher('/' + name + '/key_vel', Twist, queue_size=10))
        # convert string to bool
        prioLane = True if "True" in prioLane else False

        #add car to dicttionary cars
        self.cars.update({carId : 
                            {"speed" : speed, 
                            "angle" : 0, 
                            "twist" : 0, 
                            "turn" : turn, 
                            "criticalSectionAquired" : False, 
                            "maneuverComplete" : False, 
                            "priorityLane" : prioLane, 
                            "enteredCrossing" : False}
                        })


    def criticalSectionAvailable(self):
        for car in self.cars:
                 if self.cars[car]["criticalSectionAquired"] == True:
                    return False
        return True
    
    def getCriticalSection(self, msg, carId):
        # Cars x and y position
        carPosX = msg.pose[carId].position.x
        carPosY = msg.pose[carId].position.y

        # Aquire critical section while driving priority lane
        if self.cars[carId]["priorityLane"]:
            if  carPosX < self.aquireDistPrio and carPosX > -self.aquireDistPrio and \
                carPosY < self.aquireDistPrio and carPosY > -self.aquireDistPrio:
                self.cars[carId]["criticalSectionAquired"] = True

        # Aquire critical section while driving non priority lane
        elif self.criticalSectionAvailable():
            if  carPosX < self.aquireDistNonPrio and carPosX > -self.aquireDistNonPrio and \
                carPosY < self.aquireDistNonPrio and carPosY > -self.aquireDistNonPrio:
                self.cars[carId]["criticalSectionAquired"] = True
    
    def turnLeft(self, msg, carId):
         # Cars x and y position
        carPosX = msg.pose[carId].position.x
        carPosY = msg.pose[carId].position.y

        if self.cars[carId]["maneuverComplete"]:
            self.cars[carId]["criticalSectionAquired"] = False
            self.cars[carId]["speed"] = 4
            return
        else:
            self.getCriticalSection(msg, carId)

                
        # get angle in radians
        pose = msg.pose[carId]
        bot_euler = quat2euler(*(pose.orientation.w,pose.orientation.x,pose.orientation.y,pose.orientation.z), degrees=False)
        rotation = abs(bot_euler[2])

        if abs(carPosX) < 7.5 and abs(carPosY) < 7.5 and self.cars[carId]["speed"] > 2:
            self.cars[carId]["speed"] = 2

        if abs(carPosX) < 7 and abs(carPosY) < 7:
            if abs(carPosY) < 1.5 and abs(carPosX) > 3 and self.cars[carId]["speed"] > abs(carPosX/7):
                self.cars[carId]["speed"] = abs(carPosX/7)
            elif abs(carPosX) < 1.5 and abs(carPosY) > 3 and self.cars[carId]["speed"] > abs(carPosY/7):
                self.cars[carId]["speed"] = abs(carPosY/7)

        # start turning, if turn is initiated it should be completed
        if abs(carPosX) < 3 and abs(carPosY) < 3:
            if self.cars[carId]["priorityLane"] or self.cars[carId]["criticalSectionAquired"]:
                if abs(carPosX) < 1.8 and abs(carPosY) < 1.8:
                    self.cars[carId]["speed"] = 0.4  #0.48
                    self.cars[carId]["angle"] = -0.42 #-0.18
                else:
                    self.cars[carId]["speed"] = 0.45
                    self.cars[carId]["angle"] = 0
            else:
                self.cars[carId]["speed"] = 0


        # stop turning
        if abs(rotation-self.cars[carId]["twist"]) > 1.4:
            self.cars[carId]["angle"] = 0
            if carPosX > 3 or carPosX < -3 or carPosY > 3 or carPosY < -3:
                self.cars[carId]["maneuverComplete"] = True


    def turnRight(self, msg, carId):
         # Cars x and y position
        carPosX = msg.pose[carId].position.x
        carPosY = msg.pose[carId].position.y

        if self.cars[carId]["maneuverComplete"]:
            self.cars[carId]["criticalSectionAquired"] = False
            self.cars[carId]["speed"] = 4
            return
        else:
            self.getCriticalSection(msg, carId)

        # get angle in radians
        pose = msg.pose[carId]
        bot_euler = quat2euler(*(pose.orientation.w,pose.orientation.x,pose.orientation.y,pose.orientation.z), degrees=False)
        rotation = abs(bot_euler[2])

        if abs(carPosX) < 7.5 and abs(carPosY) < 7.5 and self.cars[carId]["speed"] > 2:
            self.cars[carId]["speed"] = 2

        if abs(carPosX) < 7 and abs(carPosY) < 7:
            if abs(carPosY) < 1.5 and abs(carPosX) > 3.5 and self.cars[carId]["speed"] > abs(carPosX/7):
                self.cars[carId]["speed"] = abs(carPosX/7)
            elif abs(carPosX) < 1.5 and abs(carPosY) > 3.5 and self.cars[carId]["speed"] > abs(carPosY/7):
                self.cars[carId]["speed"] = abs(carPosY/7)

        
        # start turning, if turn is initiated it should be completed
        if abs(carPosX) < 3.5 and abs(carPosY) < 3.5:
            if self.cars[carId]["priorityLane"] or self.cars[carId]["criticalSectionAquired"]:
                if abs(carPosX) < 2.6 and abs(carPosY) < 2.6:
                    self.cars[carId]["speed"] = 0.4  #0.48
                    self.cars[carId]["angle"] = 0.65 #-0.18
                else:
                    self.cars[carId]["speed"] = 0.4
                    self.cars[carId]["angle"] = 0
            else:
                self.cars[carId]["speed"] = 0


        # stop turning
        if abs(rotation-self.cars[carId]["twist"]) > 1.4:
            self.cars[carId]["angle"] = 0
            if carPosX > 4 or carPosX < -4 or carPosY > 4 or carPosY < -4:
                self.cars[carId]["maneuverComplete"] = True

        # stop turning
        if abs(rotation-self.cars[carId]["twist"]) > 1.4:
            self.cars[carId]["angle"] = 0
            if carPosX > 3.5 or carPosX < -3.5 or carPosY > 3.5 or carPosY < -3.5:
                self.cars[carId]["maneuverComplete"] = True


    def goStraight(self, msg, carId):
        # Cars x and y position
        carPosX = msg.pose[carId].position.x
        carPosY = msg.pose[carId].position.y

        enteredCrossing = None
        # Needed to see if car has been in intersection yet

        if carPosX < 1 and carPosX > -1 and carPosY < 1 and carPosY > -1:
            self.cars[carId]["enteredCrossing"] = True

        if self.cars[carId]["maneuverComplete"]:
            self.cars[carId]["criticalSectionAquired"] = False
            self.cars[carId]["speed"] = 4
            return
        else:
            self.getCriticalSection(msg, carId)


        if abs(carPosX) < 7.5 and abs(carPosY) < 7.5 and self.cars[carId]["speed"] > 2 and not self.cars[carId]["priorityLane"]:
            self.cars[carId]["speed"] = 2

        if abs(carPosX) < 7 and abs(carPosY) < 7 and not self.cars[carId]["priorityLane"]:
            if abs(carPosY) < 1.5 and abs(carPosX) > 3 and self.cars[carId]["speed"] > abs(carPosX/7):
                self.cars[carId]["speed"] = abs(carPosX/7)
            elif abs(carPosX) < 1.5 and abs(carPosY) > 3 and self.cars[carId]["speed"] > abs(carPosY/7):
                self.cars[carId]["speed"] = abs(carPosY/7)

        if carPosX < 3 and carPosX > -3 and carPosY < 3 and carPosY > -3:
            if self.cars[carId]["priorityLane"] or self.cars[carId]["criticalSectionAquired"]:
                if not self.cars[carId]["priorityLane"]:
                    self.cars[carId]["speed"] = 1
            else:
                self.cars[carId]["speed"] = 0       

        if (carPosX > 3 or carPosX < -3 or carPosY > 3 or carPosY < -3) and self.cars[carId]["enteredCrossing"]:
            self.cars[carId]["maneuverComplete"] = True
        


    def newModel(self, msg):
        if self.firstIter:
            for car in self.cars:
                # set start angle in radians
                pose = msg.pose[car]
                bot_euler = quat2euler(*(pose.orientation.w,pose.orientation.x,pose.orientation.y,pose.orientation.z), degrees=False)
                self.cars[car]["twist"] = abs(bot_euler[2])
                self.firstIter = False
        
        for car in self.cars:
            if self.cars[car]["turn"] == "left":
                self.turnLeft(msg, car)
            elif self.cars[car]["turn"] == "right":
                self.turnRight(msg, car)
            else:
                self.goStraight(msg, car)

        
    def talker(self):
        sub = rospy.Subscriber("/gazebo/model_states",ModelStates,self.newModel)
        #pub = rospy.Publisher('chatter', String, queue_size=10)
        #rospy.init_node('autodrive')
        rate = rospy.Rate(10) # 10hz
        vel_msg = Twist()

        while not rospy.is_shutdown():
            #hello_str = "hello world %s" % rospy.get_time()        
            vel_msg.linear.y = 0
            vel_msg.linear.z = 0
            vel_msg.angular.x = 0
            vel_msg.angular.y = 0
            vel_msg.angular.z = 0
 

            for i in range(len(self.publishers)):
                vel_msg.linear.x = self.cars[i+2]["speed"]
                vel_msg.angular.z = self.cars[i+2]["angle"]
                self.publishers[i].publish(vel_msg)
            
            if self.exitSimulation:
                for i in range(len(self.publishers)):
                    vel_msg.linear.x = 0
                    vel_msg.angular.z = 0
                    self.publishers[i].publish(vel_msg)
                    sub.unregister()
                break
            rate.sleep()

'''
if __name__ == '__main__':
    try:
        auto = Autodrive()
        auto.talker()
    except rospy.ROSInterruptException:
        pass
    '''
