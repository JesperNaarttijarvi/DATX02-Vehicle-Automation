;; Auto-generated. Do not edit!


(when (boundp 'custom_msgs::TruckState)
  (if (not (find-package "CUSTOM_MSGS"))
    (make-package "CUSTOM_MSGS"))
  (shadow 'TruckState (find-package "CUSTOM_MSGS")))
(unless (find-package "CUSTOM_MSGS::TRUCKSTATE")
  (make-package "CUSTOM_MSGS::TRUCKSTATE"))

(in-package "ROS")
;;//! \htmlinclude TruckState.msg.html


(defclass custom_msgs::TruckState
  :super ros::object
  :slots (_p _theta1 _theta2 ))

(defmethod custom_msgs::TruckState
  (:init
   (&key
    ((:p __p) (instance custom_msgs::Position :init))
    ((:theta1 __theta1) 0.0)
    ((:theta2 __theta2) 0.0)
    )
   (send-super :init)
   (setq _p __p)
   (setq _theta1 (float __theta1))
   (setq _theta2 (float __theta2))
   self)
  (:p
   (&rest __p)
   (if (keywordp (car __p))
       (send* _p __p)
     (progn
       (if __p (setq _p (car __p)))
       _p)))
  (:theta1
   (&optional __theta1)
   (if __theta1 (setq _theta1 __theta1)) _theta1)
  (:theta2
   (&optional __theta2)
   (if __theta2 (setq _theta2 __theta2)) _theta2)
  (:serialization-length
   ()
   (+
    ;; custom_msgs/Position _p
    (send _p :serialization-length)
    ;; float32 _theta1
    4
    ;; float32 _theta2
    4
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; custom_msgs/Position _p
       (send _p :serialize s)
     ;; float32 _theta1
       (sys::poke _theta1 (send s :buffer) (send s :count) :float) (incf (stream-count s) 4)
     ;; float32 _theta2
       (sys::poke _theta2 (send s :buffer) (send s :count) :float) (incf (stream-count s) 4)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; custom_msgs/Position _p
     (send _p :deserialize buf ptr-) (incf ptr- (send _p :serialization-length))
   ;; float32 _theta1
     (setq _theta1 (sys::peek buf ptr- :float)) (incf ptr- 4)
   ;; float32 _theta2
     (setq _theta2 (sys::peek buf ptr- :float)) (incf ptr- 4)
   ;;
   self)
  )

(setf (get custom_msgs::TruckState :md5sum-) "b44a11adf408b3c6943c97950abcf47c")
(setf (get custom_msgs::TruckState :datatype-) "custom_msgs/TruckState")
(setf (get custom_msgs::TruckState :definition-)
      "Position p
float32 theta1
float32 theta2

================================================================================
MSG: custom_msgs/Position
int32 x
int32 y

")



(provide :custom_msgs/TruckState "b44a11adf408b3c6943c97950abcf47c")


