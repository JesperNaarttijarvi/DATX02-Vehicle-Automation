# Computer vision

## How to install everything you need to make it work in a fresh computer with a nvidia card.
Takes about 3-4 hours total. A good internetconnection is recommended.
### Install a fresh version of Ubuntu 18.04

1. [UBUNTU 18.04 ISO](http://releases.ubuntu.com/18.04.4/ubuntu-18.04.4-desktop-amd64.iso?_ga=2.123161739.1046437142.1583252540-1896361471.1583252540)
2. [WINDOWS: HOW TO BURN ISO TO USB](https://ubuntu.com/tutorials/tutorial-create-a-usb-stick-on-windows#1-overview)
2. [OSX: HOW TO BURN ISO TO USB](https://ubuntu.com/tutorials/tutorial-create-a-usb-stick-on-macos?_ga=2.223117851.1046437142.1583252540-1896361471.1583252540#1-overview)
2. [UBUNTU: HOW TO BURN ISO TO USB](https://ubuntu.com/tutorials/tutorial-create-a-usb-stick-on-ubuntu?_ga=2.223117851.1046437142.1583252540-1896361471.1583252540#1-overview)
3. ```Choose minimal install AND not desktop install in ubuntu boot```

### When Ubuntu is installed
Install git and clone this repo. This repo also contains Darknet with tiny-weight and a short MP4 video. You will need to manually download yolov3 weights [WITH THIS LINK](https://pjreddie.com/media/files/yolov3.weights).

The repo contains a install script that will install nvidia 430, cuda 10.0, cudnn 7.2, ffmpeg, cmake and openCV.
When its installing CUDA (after nvidia, about 5mins in) you will need to be present and press Y.
Once you get to openCV you can go and do other stuff. It takes FOREVER to install (Like 45-90 minutes).

1. ```sudo apt install git```
2. ```git clone https://github.com/JesperNaarttijarvi/DATX02-Vehicle-Automation```
3. ```cd ./DATX02-Vehicle-Automation/computerVision```
4. ```sudo sh install.sh```
5. If no errors, continue
6. ```sudo reboot```
