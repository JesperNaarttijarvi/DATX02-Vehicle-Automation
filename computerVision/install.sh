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
#wget https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/cuda-repo-ubuntu1804_10.0.130-1_amd64.deb
#sudo apt-key adv --fetch-keys https://developer.download.nvidia.com/compute/cuda/repos/ubuntu1804/x86_64/7fa2af80.pub && sudo apt update
#sudo dpkg -i cuda-repo-ubuntu1804_10.0.130-1_amd64.deb

sudo apt update
sudo apt install -y cuda

# Install CuDNN 7 and NCCL 2
#wget https://developer.download.nvidia.com/compute/machine-learning/repos/ubuntu1804/x86_64/nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb
#sudo dpkg -i nvidia-machine-learning-repo-ubuntu1804_1.0.0-1_amd64.deb

sudo apt update
sudo apt install -y libcudnn7 libcudnn7-dev libnccl2 libc-ares-dev

sudo apt autoremove
sudo apt upgrade

# Link libraries to standard locations
sudo mkdir -p /usr/local/cuda-10.0/nccl/lib
sudo ln -s /usr/lib/x86_64-linux-gnu/libnccl.so.2 /usr/local/cuda/nccl/lib/
sudo ln -s /usr/lib/x86_64-linux-gnu/libcudnn.so.7 /usr/local/cuda-10.0/lib64/

sudo apt -y install ffmpeg
sudo apt -y install cmake
sudo apt -y install python3-opencv

sudo apt -y install build-essential cmake git pkg-config libgtk-3-dev \
    libavcodec-dev libavformat-dev libswscale-dev libv4l-dev \
    libxvidcore-dev libx264-dev libjpeg-dev libpng-dev libtiff-dev \
    gfortran openexr libatlas-base-dev python3-dev python3-numpy \
    libtbb2 libtbb-dev libdc1394-22-dev

mkdir ~/opencv_build && cd ~/opencv_build
git clone https://github.com/opencv/opencv.git
git clone https://github.com/opencv/opencv_contrib.git

cd ~/opencv_build/opencv
mkdir build && cd build

cmake -D CMAKE_BUILD_TYPE=RELEASE \
    -D CMAKE_INSTALL_PREFIX=/usr/local \
    -D INSTALL_C_EXAMPLES=ON \
    -D INSTALL_PYTHON_EXAMPLES=ON \
    -D OPENCV_GENERATE_PKGCONFIG=ON \
    -D OPENCV_EXTRA_MODULES_PATH=~/opencv_build/opencv_contrib/modules \
    -D BUILD_EXAMPLES=ON ..

make

sudo make install



echo 'OpenCV version: ' + python3 -c "import cv2; print(cv2.__version__)"
echo 'If everything worked fine, reboot now.'
