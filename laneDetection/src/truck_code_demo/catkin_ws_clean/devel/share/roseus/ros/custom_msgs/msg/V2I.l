;; Auto-generated. Do not edit!


(when (boundp 'custom_msgs::V2I)
  (if (not (find-package "CUSTOM_MSGS"))
    (make-package "CUSTOM_MSGS"))
  (shadow 'V2I (find-package "CUSTOM_MSGS")))
(unless (find-package "CUSTOM_MSGS::V2I")
  (make-package "CUSTOM_MSGS::V2I"))

(in-package "ROS")
;;//! \htmlinclude V2I.msg.html


(defclass custom_msgs::V2I
  :super ros::object
  :slots (_intersection _initial_direction _action ))

(defmethod custom_msgs::V2I
  (:init
   (&key
    ((:intersection __intersection) "")
    ((:initial_direction __initial_direction) "")
    ((:action __action) (instance custom_msgs::Intersection_Action :init))
    )
   (send-super :init)
   (setq _intersection (string __intersection))
   (setq _initial_direction (string __initial_direction))
   (setq _action __action)
   self)
  (:intersection
   (&optional __intersection)
   (if __intersection (setq _intersection __intersection)) _intersection)
  (:initial_direction
   (&optional __initial_direction)
   (if __initial_direction (setq _initial_direction __initial_direction)) _initial_direction)
  (:action
   (&rest __action)
   (if (keywordp (car __action))
       (send* _action __action)
     (progn
       (if __action (setq _action (car __action)))
       _action)))
  (:serialization-length
   ()
   (+
    ;; string _intersection
    4 (length _intersection)
    ;; string _initial_direction
    4 (length _initial_direction)
    ;; custom_msgs/Intersection_Action _action
    (send _action :serialization-length)
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; string _intersection
       (write-long (length _intersection) s) (princ _intersection s)
     ;; string _initial_direction
       (write-long (length _initial_direction) s) (princ _initial_direction s)
     ;; custom_msgs/Intersection_Action _action
       (send _action :serialize s)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; string _intersection
     (let (n) (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4) (setq _intersection (subseq buf ptr- (+ ptr- n))) (incf ptr- n))
   ;; string _initial_direction
     (let (n) (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4) (setq _initial_direction (subseq buf ptr- (+ ptr- n))) (incf ptr- n))
   ;; custom_msgs/Intersection_Action _action
     (send _action :deserialize buf ptr-) (incf ptr- (send _action :serialization-length))
   ;;
   self)
  )

(setf (get custom_msgs::V2I :md5sum-) "dc3e455ff79d1a6a9b04e7b88a16da30")
(setf (get custom_msgs::V2I :datatype-) "custom_msgs/V2I")
(setf (get custom_msgs::V2I :definition-)
      "string intersection
string initial_direction
Intersection_Action action

================================================================================
MSG: custom_msgs/Intersection_Action
string Intersection_1
string Intersection_2
string Intersection_3
string Roundabout
")



(provide :custom_msgs/V2I "dc3e455ff79d1a6a9b04e7b88a16da30")


