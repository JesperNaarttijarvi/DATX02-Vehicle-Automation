;; Auto-generated. Do not edit!


(when (boundp 'custom_msgs::RequestPath)
  (if (not (find-package "CUSTOM_MSGS"))
    (make-package "CUSTOM_MSGS"))
  (shadow 'RequestPath (find-package "CUSTOM_MSGS")))
(unless (find-package "CUSTOM_MSGS::REQUESTPATH")
  (make-package "CUSTOM_MSGS::REQUESTPATH"))
(unless (find-package "CUSTOM_MSGS::REQUESTPATHREQUEST")
  (make-package "CUSTOM_MSGS::REQUESTPATHREQUEST"))
(unless (find-package "CUSTOM_MSGS::REQUESTPATHRESPONSE")
  (make-package "CUSTOM_MSGS::REQUESTPATHRESPONSE"))

(in-package "ROS")





(defclass custom_msgs::RequestPathRequest
  :super ros::object
  :slots (_state _goals ))

(defmethod custom_msgs::RequestPathRequest
  (:init
   (&key
    ((:state __state) (instance custom_msgs::TruckState :init))
    ((:goals __goals) (instance custom_msgs::Path :init))
    )
   (send-super :init)
   (setq _state __state)
   (setq _goals __goals)
   self)
  (:state
   (&rest __state)
   (if (keywordp (car __state))
       (send* _state __state)
     (progn
       (if __state (setq _state (car __state)))
       _state)))
  (:goals
   (&rest __goals)
   (if (keywordp (car __goals))
       (send* _goals __goals)
     (progn
       (if __goals (setq _goals (car __goals)))
       _goals)))
  (:serialization-length
   ()
   (+
    ;; custom_msgs/TruckState _state
    (send _state :serialization-length)
    ;; custom_msgs/Path _goals
    (send _goals :serialization-length)
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; custom_msgs/TruckState _state
       (send _state :serialize s)
     ;; custom_msgs/Path _goals
       (send _goals :serialize s)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; custom_msgs/TruckState _state
     (send _state :deserialize buf ptr-) (incf ptr- (send _state :serialization-length))
   ;; custom_msgs/Path _goals
     (send _goals :deserialize buf ptr-) (incf ptr- (send _goals :serialization-length))
   ;;
   self)
  )

(defclass custom_msgs::RequestPathResponse
  :super ros::object
  :slots (_success _message ))

(defmethod custom_msgs::RequestPathResponse
  (:init
   (&key
    ((:success __success) nil)
    ((:message __message) "")
    )
   (send-super :init)
   (setq _success __success)
   (setq _message (string __message))
   self)
  (:success
   (&optional __success)
   (if __success (setq _success __success)) _success)
  (:message
   (&optional __message)
   (if __message (setq _message __message)) _message)
  (:serialization-length
   ()
   (+
    ;; bool _success
    1
    ;; string _message
    4 (length _message)
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; bool _success
       (if _success (write-byte -1 s) (write-byte 0 s))
     ;; string _message
       (write-long (length _message) s) (princ _message s)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; bool _success
     (setq _success (not (= 0 (sys::peek buf ptr- :char)))) (incf ptr- 1)
   ;; string _message
     (let (n) (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4) (setq _message (subseq buf ptr- (+ ptr- n))) (incf ptr- n))
   ;;
   self)
  )

(defclass custom_msgs::RequestPath
  :super ros::object
  :slots ())

(setf (get custom_msgs::RequestPath :md5sum-) "22f3c9ad76f7baef9b992077c4b2173c")
(setf (get custom_msgs::RequestPath :datatype-) "custom_msgs/RequestPath")
(setf (get custom_msgs::RequestPath :request) custom_msgs::RequestPathRequest)
(setf (get custom_msgs::RequestPath :response) custom_msgs::RequestPathResponse)

(defmethod custom_msgs::RequestPathRequest
  (:response () (instance custom_msgs::RequestPathResponse :init)))

(setf (get custom_msgs::RequestPathRequest :md5sum-) "22f3c9ad76f7baef9b992077c4b2173c")
(setf (get custom_msgs::RequestPathRequest :datatype-) "custom_msgs/RequestPathRequest")
(setf (get custom_msgs::RequestPathRequest :definition-)
      "TruckState state
Path goals

================================================================================
MSG: custom_msgs/TruckState
Position p
float32 theta1
float32 theta2

================================================================================
MSG: custom_msgs/Position
int32 x
int32 y

================================================================================
MSG: custom_msgs/Path
Position[] path
---
bool success
string message

")

(setf (get custom_msgs::RequestPathResponse :md5sum-) "22f3c9ad76f7baef9b992077c4b2173c")
(setf (get custom_msgs::RequestPathResponse :datatype-) "custom_msgs/RequestPathResponse")
(setf (get custom_msgs::RequestPathResponse :definition-)
      "TruckState state
Path goals

================================================================================
MSG: custom_msgs/TruckState
Position p
float32 theta1
float32 theta2

================================================================================
MSG: custom_msgs/Position
int32 x
int32 y

================================================================================
MSG: custom_msgs/Path
Position[] path
---
bool success
string message

")



(provide :custom_msgs/RequestPath "22f3c9ad76f7baef9b992077c4b2173c")


