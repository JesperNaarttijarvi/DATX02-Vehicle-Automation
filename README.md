### List of simInterface commands:
**spawn**
  - spawn x y z yaw yaw yaw yaw turn speed prioLane(True/False)
    - spawns a new car
    
**new** 
  - new scenario.txt (Ex. scenarios/safe1_1.txt)
    - loads a new scenario
    
**start** 
  - start
    - starts the driving software
    
**stop** 
  - stop
    - stops the driving software
    
**reset** 
  - reset
    - resets the scenario
    
**play** 
  - play
    - starts gazebo simulation
    
**pause** 
  - pause
    - pauses gazebo simulation
    
**sleep** 
  - sleep seconds (Ex. sleep 10)
    - puts the program to sleep for x seconds so it can complete without being interrupted. Used by the run command.
    
**run** 
  - run seconds (Ex. run 10)
    - starts the driving software, simulation and risk estimator. Run this when you want to collect data.
    
