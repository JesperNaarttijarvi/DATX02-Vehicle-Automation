# Install script for directory: /home/kem/Desktop/ChalmersKandidat/Kandidat19/catkin_ws_clean/src/truck_map

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "/home/kem/Desktop/ChalmersKandidat/Kandidat19/catkin_ws_clean/install")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Install shared libraries without execute permission?
if(NOT DEFINED CMAKE_INSTALL_SO_NO_EXE)
  set(CMAKE_INSTALL_SO_NO_EXE "1")
endif()

if(NOT CMAKE_INSTALL_COMPONENT OR "${CMAKE_INSTALL_COMPONENT}" STREQUAL "Unspecified")
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/truck_map/cmake" TYPE FILE FILES "/home/kem/Desktop/ChalmersKandidat/Kandidat19/catkin_ws_clean/build/truck_map/catkin_generated/installspace/truck_map-msg-paths.cmake")
endif()

if(NOT CMAKE_INSTALL_COMPONENT OR "${CMAKE_INSTALL_COMPONENT}" STREQUAL "Unspecified")
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/pkgconfig" TYPE FILE FILES "/home/kem/Desktop/ChalmersKandidat/Kandidat19/catkin_ws_clean/build/truck_map/catkin_generated/installspace/truck_map.pc")
endif()

if(NOT CMAKE_INSTALL_COMPONENT OR "${CMAKE_INSTALL_COMPONENT}" STREQUAL "Unspecified")
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/truck_map/cmake" TYPE FILE FILES "/home/kem/Desktop/ChalmersKandidat/Kandidat19/catkin_ws_clean/build/truck_map/catkin_generated/installspace/truck_map-msg-extras.cmake")
endif()

if(NOT CMAKE_INSTALL_COMPONENT OR "${CMAKE_INSTALL_COMPONENT}" STREQUAL "Unspecified")
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/truck_map/cmake" TYPE FILE FILES
    "/home/kem/Desktop/ChalmersKandidat/Kandidat19/catkin_ws_clean/build/truck_map/catkin_generated/installspace/truck_mapConfig.cmake"
    "/home/kem/Desktop/ChalmersKandidat/Kandidat19/catkin_ws_clean/build/truck_map/catkin_generated/installspace/truck_mapConfig-version.cmake"
    )
endif()

if(NOT CMAKE_INSTALL_COMPONENT OR "${CMAKE_INSTALL_COMPONENT}" STREQUAL "Unspecified")
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/share/truck_map" TYPE FILE FILES "/home/kem/Desktop/ChalmersKandidat/Kandidat19/catkin_ws_clean/src/truck_map/package.xml")
endif()

