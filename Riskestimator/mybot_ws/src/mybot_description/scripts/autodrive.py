#!/usr/bin/env python
# license removed for brevity
import rospy
from std_msgs.msg import String
from gazebo_msgs.msg import ModelStates
from geometry_msgs.msg import Twist

class Autodrive : 
    def __init__(self):
            self.speed1 = 1
            self.speed2 = 1
            
    def newModel(self, msg):
        rospy.loginfo(msg.pose[3].position.x)
        if msg.pose[2].position.x < 3 : 
            rospy.loginfo("speed is 0")
            self.speed1 = 0
      
        

    def talker(self):
        pub =  rospy.Publisher('/robot1/key_vel', Twist, queue_size=10)
        pub2 =  rospy.Publisher('/robot2/key_vel', Twist, queue_size=10)
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

            vel_msg.linear.x = self.speed1
            pub.publish(vel_msg)

            vel_msg.linear.x = self.speed2
            pub2.publish(vel_msg)
            
            rate.sleep()

if __name__ == '__main__':
    try:
        auto = Autodrive()
        auto.talker()
    except rospy.ROSInterruptException:
        pass
