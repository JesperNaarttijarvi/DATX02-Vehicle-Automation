;; Auto-generated. Do not edit!


(when (boundp 'custom_msgs::Intersection_Action)
  (if (not (find-package "CUSTOM_MSGS"))
    (make-package "CUSTOM_MSGS"))
  (shadow 'Intersection_Action (find-package "CUSTOM_MSGS")))
(unless (find-package "CUSTOM_MSGS::INTERSECTION_ACTION")
  (make-package "CUSTOM_MSGS::INTERSECTION_ACTION"))

(in-package "ROS")
;;//! \htmlinclude Intersection_Action.msg.html


(defclass custom_msgs::Intersection_Action
  :super ros::object
  :slots (_Intersection_1 _Intersection_2 _Intersection_3 _Roundabout ))

(defmethod custom_msgs::Intersection_Action
  (:init
   (&key
    ((:Intersection_1 __Intersection_1) "")
    ((:Intersection_2 __Intersection_2) "")
    ((:Intersection_3 __Intersection_3) "")
    ((:Roundabout __Roundabout) "")
    )
   (send-super :init)
   (setq _Intersection_1 (string __Intersection_1))
   (setq _Intersection_2 (string __Intersection_2))
   (setq _Intersection_3 (string __Intersection_3))
   (setq _Roundabout (string __Roundabout))
   self)
  (:Intersection_1
   (&optional __Intersection_1)
   (if __Intersection_1 (setq _Intersection_1 __Intersection_1)) _Intersection_1)
  (:Intersection_2
   (&optional __Intersection_2)
   (if __Intersection_2 (setq _Intersection_2 __Intersection_2)) _Intersection_2)
  (:Intersection_3
   (&optional __Intersection_3)
   (if __Intersection_3 (setq _Intersection_3 __Intersection_3)) _Intersection_3)
  (:Roundabout
   (&optional __Roundabout)
   (if __Roundabout (setq _Roundabout __Roundabout)) _Roundabout)
  (:serialization-length
   ()
   (+
    ;; string _Intersection_1
    4 (length _Intersection_1)
    ;; string _Intersection_2
    4 (length _Intersection_2)
    ;; string _Intersection_3
    4 (length _Intersection_3)
    ;; string _Roundabout
    4 (length _Roundabout)
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; string _Intersection_1
       (write-long (length _Intersection_1) s) (princ _Intersection_1 s)
     ;; string _Intersection_2
       (write-long (length _Intersection_2) s) (princ _Intersection_2 s)
     ;; string _Intersection_3
       (write-long (length _Intersection_3) s) (princ _Intersection_3 s)
     ;; string _Roundabout
       (write-long (length _Roundabout) s) (princ _Roundabout s)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; string _Intersection_1
     (let (n) (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4) (setq _Intersection_1 (subseq buf ptr- (+ ptr- n))) (incf ptr- n))
   ;; string _Intersection_2
     (let (n) (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4) (setq _Intersection_2 (subseq buf ptr- (+ ptr- n))) (incf ptr- n))
   ;; string _Intersection_3
     (let (n) (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4) (setq _Intersection_3 (subseq buf ptr- (+ ptr- n))) (incf ptr- n))
   ;; string _Roundabout
     (let (n) (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4) (setq _Roundabout (subseq buf ptr- (+ ptr- n))) (incf ptr- n))
   ;;
   self)
  )

(setf (get custom_msgs::Intersection_Action :md5sum-) "a626a67bdca8b2c0c5130ea57d7f1299")
(setf (get custom_msgs::Intersection_Action :datatype-) "custom_msgs/Intersection_Action")
(setf (get custom_msgs::Intersection_Action :definition-)
      "string Intersection_1
string Intersection_2
string Intersection_3
string Roundabout
")



(provide :custom_msgs/Intersection_Action "a626a67bdca8b2c0c5130ea57d7f1299")


