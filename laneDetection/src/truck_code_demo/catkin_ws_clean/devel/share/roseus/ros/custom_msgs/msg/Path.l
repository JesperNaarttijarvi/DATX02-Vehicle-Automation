;; Auto-generated. Do not edit!


(when (boundp 'custom_msgs::Path)
  (if (not (find-package "CUSTOM_MSGS"))
    (make-package "CUSTOM_MSGS"))
  (shadow 'Path (find-package "CUSTOM_MSGS")))
(unless (find-package "CUSTOM_MSGS::PATH")
  (make-package "CUSTOM_MSGS::PATH"))

(in-package "ROS")
;;//! \htmlinclude Path.msg.html


(defclass custom_msgs::Path
  :super ros::object
  :slots (_path ))

(defmethod custom_msgs::Path
  (:init
   (&key
    ((:path __path) (let (r) (dotimes (i 0) (push (instance custom_msgs::Position :init) r)) r))
    )
   (send-super :init)
   (setq _path __path)
   self)
  (:path
   (&rest __path)
   (if (keywordp (car __path))
       (send* _path __path)
     (progn
       (if __path (setq _path (car __path)))
       _path)))
  (:serialization-length
   ()
   (+
    ;; custom_msgs/Position[] _path
    (apply #'+ (send-all _path :serialization-length)) 4
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; custom_msgs/Position[] _path
     (write-long (length _path) s)
     (dolist (elem _path)
       (send elem :serialize s)
       )
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; custom_msgs/Position[] _path
   (let (n)
     (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4)
     (setq _path (let (r) (dotimes (i n) (push (instance custom_msgs::Position :init) r)) r))
     (dolist (elem- _path)
     (send elem- :deserialize buf ptr-) (incf ptr- (send elem- :serialization-length))
     ))
   ;;
   self)
  )

(setf (get custom_msgs::Path :md5sum-) "67855529a0e617b9d739d09c3f57b883")
(setf (get custom_msgs::Path :datatype-) "custom_msgs/Path")
(setf (get custom_msgs::Path :definition-)
      "Position[] path

================================================================================
MSG: custom_msgs/Position
int32 x
int32 y

")



(provide :custom_msgs/Path "67855529a0e617b9d739d09c3f57b883")


