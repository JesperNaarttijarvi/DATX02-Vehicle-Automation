# Risk Detection
Contains an installation script for Ubuntu. Also contains all the installations needed for the Risk Detection system as well as a guide on how to run a simulation and read the collected data.


## Guides
- [Report about the Risk Estimator](https://hal.inria.fr/hal-00875356/document)
- [ROS tutorials](http://wiki.ros.org/ROS/Tutorials)
- [Gazebo tutorials](http://gazebosim.org/tutorials)
- [Python 2.7 documentation](https://www.python.org/doc/)

## How to install everything you need to make it work in a fresh computer

### Install Ubuntu 16.04
- [UBUNTU 16.04 ISO](http://releases.ubuntu.com/16.04.6/ubuntu-16.04.6-desktop-amd64.iso)
- [WINDOWS: HOW TO BURN ISO TO USB](https://ubuntu.com/tutorials/tutorial-create-a-usb-stick-on-windows#1-overview)
- [OSX: HOW TO BURN ISO TO USB](https://ubuntu.com/tutorials/tutorial-create-a-usb-stick-on-macos?_ga=2.223117851.1046437142.1583252540-1896361471.1583252540#1-overview)
- [UBUNTU: HOW TO BURN ISO TO USB](https://ubuntu.com/tutorials/tutorial-create-a-usb-stick-on-ubuntu?_ga=2.223117851.1046437142.1583252540-1896361471.1583252540#1-overview)

### Install Ros and Gazebo
[Ros Kinetic desktop-full](http://wiki.ros.org/kinetic/Installation/Ubuntu)

### Install Python 2.7
[Python 2.7](https://www.python.org/downloads/release/python-2718/)

### Clone the git repository
git clone https://github.com/JesperNaarttijarvi/DATX02-Vehicle-Automation

### Run the intall.sh shell script 
*Riskestimator/mybot_ws/Install.sh*

## Run a test scenario
- Move to workspace:  
	- *cd Riskestimator/mybot_ws*

- Start gazebo with the test environment:
	- *./run_Gazebo.sh*

- Then, start the simulation interface:
	- *python  simInterface.py*

- When the interface has started, to spawn a test vehicle:
	- *spawn 9 0.74 0.1 0 0 0 0 right 10 True*

- Read the list of interface commands. 
	- The interface can read a series of commands in text files. 
- To read a text file with commands use either:
	- Type the command in the interface: 
	- *new path/file.txt*
	- Start the siminterface with the file as a program variable: 
	- *python  simInterface.py  path/file.txt*

- Setup a premade scenario write
	- *new scenarios/safe1_1.txt*

- Run the testcase for 20 seconds  with
	- *run 20*

- After the test the measurements from the risk estimator can be found in:
	- Mybot_ws/sim_data/ 
	- The time is the left column and the other columns are the risk data from the vehicles. 


### List of simInterface commands:
**spawn**
  - spawn x y z yaw yaw yaw yaw turn speed prioLane(True/False) (Ex. spawn 9 0.74 0.1 0 0 0 0 right 10 True)
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
    
**kill**  - not in use

**killall** - not in use

