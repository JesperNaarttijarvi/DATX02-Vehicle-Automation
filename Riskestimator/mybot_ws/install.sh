#!/bin/bash
python -m pip install squaternion
python -m pip install scipy
 
catkin_make
source devel/setup.bash

#cp -r ../roadSystem ~/.gazebo/models
cp -r ../tCrossing ~/.gazebo/models
cp -r ../4WayCrossing ~/.gazebo/models
