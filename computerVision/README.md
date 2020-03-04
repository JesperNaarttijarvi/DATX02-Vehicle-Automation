# Computer vision
Contains a installation script for Ubuntu. Also contains all the basic files for Darknet. After you complete this README darknet with cuda and OPENCV will work. Have in mind that the entire folder darknet is gitignored, if you need to update weigts or other settings in it you'll need to manually enable uploads.

## How to install everything you need to make it work in a fresh computer with a nvidia card.
Takes about 3-5 hours. A good internet connection is recommended.

### Install Ubuntu 18.04
- [UBUNTU 18.04 ISO](http://releases.ubuntu.com/18.04.4/ubuntu-18.04.4-desktop-amd64.iso?_ga=2.123161739.1046437142.1583252540-1896361471.1583252540)
- [WINDOWS: HOW TO BURN ISO TO USB](https://ubuntu.com/tutorials/tutorial-create-a-usb-stick-on-windows#1-overview)
- [OSX: HOW TO BURN ISO TO USB](https://ubuntu.com/tutorials/tutorial-create-a-usb-stick-on-macos?_ga=2.223117851.1046437142.1583252540-1896361471.1583252540#1-overview)
- [UBUNTU: HOW TO BURN ISO TO USB](https://ubuntu.com/tutorials/tutorial-create-a-usb-stick-on-ubuntu?_ga=2.223117851.1046437142.1583252540-1896361471.1583252540#1-overview)
- ``Choose minimal install AND not desktop install in ubuntu boot``

### After Ubuntu is installed
Install git and clone this repo. This repo also contains Darknet with tiny-weight and a short MP4 video. You will need to manually download [yolov3 weights](https://pjreddie.com/media/files/yolov3.weights).

The repo contains a install script that will update&upgrade ubunutu and install all of these libraries + their dependencies: nvidia 430, cuda 10.0, cudnn 7.2, ffmpeg, cmake and openCV.
When its installing CUDA (after nvidia, about 5mins in) you will need to be present and press Y.
Once you get to openCV you can go and do other stuff. It takes FOREVER to install (Like 45-90 minutes).

1. ``sudo apt install git``
2. ``git clone https://github.com/JesperNaarttijarvi/DATX02-Vehicle-Automation``
3. ``cd ./DATX02-Vehicle-Automation/computerVision``
4. ``sudo sh install.sh``
5. ``sudo reboot``
6. ``nvidia-smi to see if nvidia and cuda was installed``

### After the installation script is completed
Now you can go into the darknet folder, change the makefile to your needs. By default cuda, openCV and cudnn is enabled.

1. ``cd DATX02-Vehicle-Automation/computerVision/darknet``
#### If you want to change the base settings
``nano Makefile``
#### Make the darknet. If you got 0 errors, everything worked! 
``make``
#### To try and detect an **image** with yolov3-tiny
``./darknet detector test cfg/coco.data cfg/yolov3-tiny.cfg yolov3-tiny.weights data/dog.jpg``
#### To try and detect an **video** with yolov3-tiny
``./darknet detector demo cfg/coco.data cfg/yolov3-tiny.cfg yolov3-tiny.weights data/santaMonicaShort.mp4``

### **Congrats, you're done!**


### Benchmarks
| Weight | Encoding Bitrate | Res Frames | Jetson TX2| Nvidia 2080ti | Nvidia 1060 | Nvidia 980ti |
|---|---|---|---|---|---|---|
|YOLOV3| h264  4329 kb/s | 1080p 30fps|1.5fps|22fps|x|x|
|YOLOV3| h264  8658 kb/s | 1080p 60fps|1.5fps|x|x|x|
|YOLOV3_tiny| h264  4329 kb/s | 1080p 30fps|8fps|26fps|x|x|
|YOLOV3_tiny| h264 8658 kb/s | 1080p 60fps|8fps|x|x|x|


#### Helping commands
To find resolution, frames and ecoding. Run `ffmpeg -i <filename>` <br/>
To increase/decrease speed. Run `ffmpeg -i input.mp4 -filter:v "setpts=0.5*PTS" output.mp4` where setpts=0.5 means 2x speed. For 4x speed, use 0.25 and so on. <br/>
To change the bitrate of a video. Run `ffmpeg -i input.mp4 -b 1000000 output.mp4` where -b 1000000 is the desired bitrate in bytes/sec <br/>
To compress a video. Run `ffmpeg -i input.mp4 -vcodec libx265 -crf 24 output.mp4` where libx265 is the compress algorithm and 
-crf 24 is how much it should compress it. <br/>
