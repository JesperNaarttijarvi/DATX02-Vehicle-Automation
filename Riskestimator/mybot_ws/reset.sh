sudo killall python
#python src/mybot_description/scripts/autodrive.py &
#disown
gnome-terminal -e "src/mybot_description/scripts/autodrive.py" &
sleep 0.2
xdotool windowminimize $(xdotool getactivewindow)

#-x 11.28 -y 0.74 -z 0.1
rostopic pub -1 /gazebo/set_model_state gazebo_msgs/ModelState "model_name: 'mybot1'
pose:
  position:
    x: 11.28
    y: 0.74
    z: 0.1
  orientation:
    x: 0.0
    y: 0.0
    z: 0.0
    w: 0.0
twist:
  linear:
    x: 0.0
    y: 0.0
    z: 0.0
  angular:
    x: 0.0
    y: 0.0
    z: 0.0
reference_frame: ''"

#-x 0.85 -y -9.48 -z 0.1
rostopic pub -1 /gazebo/set_model_state gazebo_msgs/ModelState "model_name: 'mybot2'
pose:
  position:
    x: 0.85
    y: -9.48
    z: 0.1
  orientation:
    x: 0.0
    y: 0.0
    z: 1
    w: -1
twist:
  linear:
    x: 0.0
    y: 0.0
    z: 0.0
  angular:
    x: 0.0
    y: 0.0
    z: 0.0
reference_frame: ''"

python src/mybot_description/scripts/risk_estimator.py