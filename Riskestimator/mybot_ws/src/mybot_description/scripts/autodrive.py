#!/usr/bin/env python
# license removed for brevity
import rospy
from std_msgs.msg import String
from gazebo_msgs.msg import ModelStates
from geometry_msgs.msg import Twist
from squaternion import quat2euler

class Autodrive : 
    def __init__(self):
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

    def newCar(self, name, carId, turn, speed, prioLane):
        # create publisher for car
        self.publishers.append(rospy.Publisher('/' + name + '/key_vel', Twist, queue_size=10))
        # convert string to bool
        prioLane = True if "True" in prioLane else False

        #add car to dicttionary cars
        self.cars[carId]["speed"] = speed
        self.cars[carId]["angle"] = 0
        self.cars[carId]["twist"] = 0
        self.cars[carId]["turn"] = turn
        self.cars[carId]["criticalSectionAquired"] = False
        self.cars[carId]["maneuverComplete"] = False
        self.cars[carId]["priorityLane"] = prioLane
        self.cars[carId]["enteredCrossing"] = False

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
                print(str(carId) + " critical section aquired non prio")
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

        # start turning, if turn is initiated it should be completed
        if carPosX < 3.85 and carPosX > -3.85 and carPosY < 3.85 and carPosY > -3.85:
            if self.cars[carId]["priorityLane"] or self.cars[carId]["criticalSectionAquired"]:
                self.cars[carId]["speed"] = 0.48
                self.cars[carId]["angle"] = -0.18
            else:
                self.cars[carId]["speed"] = 0
                # Initiate turn, i.e turn the car a little towards the way it will turn
                if abs(rotation-self.cars[carId]["twist"]) < 0.4:
                    self.cars[carId]["angle"] = -0.1
                else:
                    self.cars[carId]["angle"] = 0  


        # stop turning
        if abs(rotation-self.cars[carId]["twist"]) > 1.4:
            self.cars[carId]["angle"] = 0
            if carPosX > 4 or carPosX < -4 or carPosY > 4 or carPosY < -4:
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

        # start turning, if turn is initiated it should be completed
        if carPosX < 3.85 and carPosX > -3.85 and carPosY < 3.85 and carPosY > -3.85:
            if self.cars[carId]["priorityLane"] or self.cars[carId]["criticalSectionAquired"]:
                self.cars[carId]["speed"] = 0.4 #0.4
                self.cars[carId]["angle"] = 0.3 #0.3
            else:  
                self.cars[carId]["speed"] = 0
                # Initiate turn, i.e turn the car a little towards the way it will turn
                if abs(rotation-self.cars[carId]["twist"]) < 0.5:
                    self.cars[carId]["angle"] = 0.1
                else:
                    self.cars[carId]["angle"] = 0
        
        # stop turning
        if abs(rotation-self.cars[carId]["twist"]) > 1.4:
            self.cars[carId]["angle"] = 0
            if carPosX > 4 or carPosX < -4 or carPosY > 4 or carPosY < -4:
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

        if carPosX < 4 and carPosX > -4 and carPosY < 4 and carPosY > -4:
            if self.cars[carId]["priorityLane"] or self.cars[carId]["criticalSectionAquired"]:
                self.cars[carId]["speed"] = 4
            else:
                self.cars[carId]["speed"] = 0       

        if (carPosX > 4 or carPosX < -4 or carPosY > 4 or carPosY < -4) and self.cars[carId]["enteredCrossing"]:
            print("maneuverComplete")
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
        rospy.init_node('talker', anonymous=True)
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
            
            rate.sleep()

'''
if __name__ == '__main__':
    try:
        auto = Autodrive()
        auto.talker()
    except rospy.ROSInterruptException:
        pass
    '''
