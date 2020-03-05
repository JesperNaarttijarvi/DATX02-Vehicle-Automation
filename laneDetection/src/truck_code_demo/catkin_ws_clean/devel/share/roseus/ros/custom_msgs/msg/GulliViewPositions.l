;; Auto-generated. Do not edit!


(when (boundp 'custom_msgs::GulliViewPositions)
  (if (not (find-package "CUSTOM_MSGS"))
    (make-package "CUSTOM_MSGS"))
  (shadow 'GulliViewPositions (find-package "CUSTOM_MSGS")))
(unless (find-package "CUSTOM_MSGS::GULLIVIEWPOSITIONS")
  (make-package "CUSTOM_MSGS::GULLIVIEWPOSITIONS"))

(in-package "ROS")
;;//! \htmlinclude GulliViewPositions.msg.html


(defclass custom_msgs::GulliViewPositions
  :super ros::object
  :slots (_p1 _tagid1 _p2 _tagid2 _cameraid ))

(defmethod custom_msgs::GulliViewPositions
  (:init
   (&key
    ((:p1 __p1) (instance custom_msgs::Position :init))
    ((:tagid1 __tagid1) 0)
    ((:p2 __p2) (instance custom_msgs::Position :init))
    ((:tagid2 __tagid2) 0)
    ((:cameraid __cameraid) 0)
    )
   (send-super :init)
   (setq _p1 __p1)
   (setq _tagid1 (round __tagid1))
   (setq _p2 __p2)
   (setq _tagid2 (round __tagid2))
   (setq _cameraid (round __cameraid))
   self)
  (:p1
   (&rest __p1)
   (if (keywordp (car __p1))
       (send* _p1 __p1)
     (progn
       (if __p1 (setq _p1 (car __p1)))
       _p1)))
  (:tagid1
   (&optional __tagid1)
   (if __tagid1 (setq _tagid1 __tagid1)) _tagid1)
  (:p2
   (&rest __p2)
   (if (keywordp (car __p2))
       (send* _p2 __p2)
     (progn
       (if __p2 (setq _p2 (car __p2)))
       _p2)))
  (:tagid2
   (&optional __tagid2)
   (if __tagid2 (setq _tagid2 __tagid2)) _tagid2)
  (:cameraid
   (&optional __cameraid)
   (if __cameraid (setq _cameraid __cameraid)) _cameraid)
  (:serialization-length
   ()
   (+
    ;; custom_msgs/Position _p1
    (send _p1 :serialization-length)
    ;; int32 _tagid1
    4
    ;; custom_msgs/Position _p2
    (send _p2 :serialization-length)
    ;; int32 _tagid2
    4
    ;; int32 _cameraid
    4
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; custom_msgs/Position _p1
       (send _p1 :serialize s)
     ;; int32 _tagid1
       (write-long _tagid1 s)
     ;; custom_msgs/Position _p2
       (send _p2 :serialize s)
     ;; int32 _tagid2
       (write-long _tagid2 s)
     ;; int32 _cameraid
       (write-long _cameraid s)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; custom_msgs/Position _p1
     (send _p1 :deserialize buf ptr-) (incf ptr- (send _p1 :serialization-length))
   ;; int32 _tagid1
     (setq _tagid1 (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; custom_msgs/Position _p2
     (send _p2 :deserialize buf ptr-) (incf ptr- (send _p2 :serialization-length))
   ;; int32 _tagid2
     (setq _tagid2 (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _cameraid
     (setq _cameraid (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;;
   self)
  )

(setf (get custom_msgs::GulliViewPositions :md5sum-) "183dd0693b2375fdac3c57ae3e24b202")
(setf (get custom_msgs::GulliViewPositions :datatype-) "custom_msgs/GulliViewPositions")
(setf (get custom_msgs::GulliViewPositions :definition-)
      "Position p1
int32 tagid1
Position p2
int32 tagid2
int32 cameraid


================================================================================
MSG: custom_msgs/Position
int32 x
int32 y

")



(provide :custom_msgs/GulliViewPositions "183dd0693b2375fdac3c57ae3e24b202")


