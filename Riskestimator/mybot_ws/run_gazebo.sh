#!/bin/bash
catkin_make
source devel/setup.bash

#cp -r ../roadSystem ~/.gazebo/models
cp -r ../tCrossing ~/.gazebo/models

sudo killall rosmaster
sudo killall gzserver
sudo killall gzclient

#gnome-terminal --window-with-profile=group39 -x sh -c "source ~/Documents/youtube_car/mybot_ws/devel/setup.bash; rosrun key_teleop key_teleop.py"

roslaunch mybot_gazebo mybot_world.launch
