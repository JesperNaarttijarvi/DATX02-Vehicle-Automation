#-x 10.87 -y 0 -z 0.1 -Y 0
rostopic pub -1 /gazebo/set_model_state gazebo_msgs/ModelState "model_name: 'mybot1'
pose:
  position:
    x: 10.87
    y: 0.0
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

#-x 0.43 -y -10.48 -z 0.1 -Y -1.5707
rostopic pub -1 /gazebo/set_model_state gazebo_msgs/ModelState "model_name: 'mybot2'
pose:
  position:
    x: 0.43
    y: -10.48
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
