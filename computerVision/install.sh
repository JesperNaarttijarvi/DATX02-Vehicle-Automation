# WARNING: These steps seem to not work anymore!

#!/bin/bash

# If you got existing CUDA, uncomment to purge
# sudo apt --purge remove "cublas*" "cuda*"
# sudo apt --purge remove "nvidia*"

# Create dir to prevent weird error
mkdir -p /usr/share/man/man1


# Check for updates and upgrades
sudo apt-get -y update
sudo apt-get -y upgrade

# get all basic drivers
sudo ubuntu-drivers autoinstall

# get the lastest nvidia installer
sudo apt install -y nvidia-driver-430

# Install CUDA Toolkit 10
wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/cuda-repo-ubuntu1804_10.0.130-1_amd64.deb
sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/7fa2af80.pub && sudo apt update
sudo dpkg -i cuda-repo-ubuntu1804_10.0.130-1_amd64.deb

sudo apt update
sudo apt install -y cuda

# Install CuDNN 7 and NCCL 2
wget https://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1804/x86_64/nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb
sudo dpkg -i nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb

sudo apt update
sudo apt install -y libcudnn7 libcudnn7-dev libnccl2 libc-ares-dev

sudo apt autoremove
sudo apt upgrade

# Link libraries to standard locations
sudo mkdir -p /usr/local/cuda-10.0/nccl/lib
sudo ln -s /usr/lib/x86_64-linux-gnu/libnccl.so.2 /usr/local/cuda/nccl/lib/
sudo ln -s /usr/lib/x86_64-linux-gnu/libcudnn.so.7 /usr/local/cuda-10.0/lib64/

# Install needed prerequisites for darknet
sudo apt -y install ffmpeg
sudo apt -y install cmake
sudo apt -y install python3-opencv

# Prerequisites for openCV
sudo apt -y install build-essential cmake git pkg-config libgtk-3-dev \
    libavcodec-dev libavformat-dev libswscale-dev libv4l-dev \
    libxvidcore-dev libx264-dev libjpeg-dev libpng-dev libtiff-dev \
    gfortran openexr libatlas-base-dev python3-dev python3-numpy \
    libtbb2 libtbb-dev libdc1394-22-dev

# Make a dir in home location for opencv. Clone latest repon (current 4.2.0)
mkdir ~/opencv_build && cd ~/opencv_build
git clone https://github.com/opencv/opencv.git
git clone https://github.com/opencv/opencv_contrib.git

# Makes a seperete dir for the build
cd ~/opencv_build/opencv
mkdir build && cd build

# Installs all the prerequisites for make
cmake -D CMAKE_BUILD_TYPE=RELEASE \
    -D CMAKE_INSTALL_PREFIX=/usr/local \
    -D INSTALL_C_EXAMPLES=ON \
    -D INSTALL_PYTHON_EXAMPLES=ON \
    -D OPENCV_GENERATE_PKGCONFIG=ON \
    -D OPENCV_EXTRA_MODULES_PATH=~/opencv_build/opencv_contrib/modules \
    -D BUILD_EXAMPLES=ON ..

echo 'Make openCV'
make

echo 'Starting installing openCV'
sudo make install

echo 'openCV 4.2.0 was installed. Downloading the last dependencies and updating symlink'

# Installing a lib for symlink and more openCV support
sudo apt-get install libopencv-dev

echo 'Adding cuda to symlink'
# Adding cuda to symlink
echo '# Cuda link' >> ~/.bashrc
echo 'export PATH=/usr/local/cuda-10.2/bin${PATH:+:${PATH}}$' >> ~/.bashrc
echo 'export LD_LIBRARY_PATH=/usr/local/cuda-10.2/lib64${LD_LIBRARY_PATH:+:${LD_LIBRARY_PATH}}' >> ~/.bashrc
source  ~/.bashrc

echo 'Installing python3'

sudo apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev wget

wget https://www.python.org/ftp/python/3.7.4/Python-3.7.4.tgz

tar -xf Python-3.7.4.tgz

cd Python-3.7.4
./configure --enable-optimizations

make
sudo make altinstall


echo 'Adding Python3 to symlink'
echo '# Python3 link' >> ~/.bashrc
alias python='python3'
source  ~/.bashrc

echo 'If everything worked fine, reboot now.'

