; Auto-generated. Do not edit!


(cl:in-package custom_msgs-msg)


;//! \htmlinclude TruckState.msg.html

(cl:defclass <TruckState> (roslisp-msg-protocol:ros-message)
  ((p
    :reader p
    :initarg :p
    :type custom_msgs-msg:Position
    :initform (cl:make-instance 'custom_msgs-msg:Position))
   (theta1
    :reader theta1
    :initarg :theta1
    :type cl:float
    :initform 0.0)
   (theta2
    :reader theta2
    :initarg :theta2
    :type cl:float
    :initform 0.0))
)

(cl:defclass TruckState (<TruckState>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <TruckState>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'TruckState)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name custom_msgs-msg:<TruckState> is deprecated: use custom_msgs-msg:TruckState instead.")))

(cl:ensure-generic-function 'p-val :lambda-list '(m))
(cl:defmethod p-val ((m <TruckState>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader custom_msgs-msg:p-val is deprecated.  Use custom_msgs-msg:p instead.")
  (p m))

(cl:ensure-generic-function 'theta1-val :lambda-list '(m))
(cl:defmethod theta1-val ((m <TruckState>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader custom_msgs-msg:theta1-val is deprecated.  Use custom_msgs-msg:theta1 instead.")
  (theta1 m))

(cl:ensure-generic-function 'theta2-val :lambda-list '(m))
(cl:defmethod theta2-val ((m <TruckState>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader custom_msgs-msg:theta2-val is deprecated.  Use custom_msgs-msg:theta2 instead.")
  (theta2 m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <TruckState>) ostream)
  "Serializes a message object of type '<TruckState>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'p) ostream)
  (cl:let ((bits (roslisp-utils:encode-single-float-bits (cl:slot-value msg 'theta1))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream))
  (cl:let ((bits (roslisp-utils:encode-single-float-bits (cl:slot-value msg 'theta2))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <TruckState>) istream)
  "Deserializes a message object of type '<TruckState>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'p) istream)
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'theta1) (roslisp-utils:decode-single-float-bits bits)))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'theta2) (roslisp-utils:decode-single-float-bits bits)))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<TruckState>)))
  "Returns string type for a message object of type '<TruckState>"
  "custom_msgs/TruckState")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'TruckState)))
  "Returns string type for a message object of type 'TruckState"
  "custom_msgs/TruckState")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<TruckState>)))
  "Returns md5sum for a message object of type '<TruckState>"
  "b44a11adf408b3c6943c97950abcf47c")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'TruckState)))
  "Returns md5sum for a message object of type 'TruckState"
  "b44a11adf408b3c6943c97950abcf47c")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<TruckState>)))
  "Returns full string definition for message of type '<TruckState>"
  (cl:format cl:nil "Position p~%float32 theta1~%float32 theta2~%~%================================================================================~%MSG: custom_msgs/Position~%int32 x~%int32 y~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'TruckState)))
  "Returns full string definition for message of type 'TruckState"
  (cl:format cl:nil "Position p~%float32 theta1~%float32 theta2~%~%================================================================================~%MSG: custom_msgs/Position~%int32 x~%int32 y~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <TruckState>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'p))
     4
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <TruckState>))
  "Converts a ROS message object to a list"
  (cl:list 'TruckState
    (cl:cons ':p (p msg))
    (cl:cons ':theta1 (theta1 msg))
    (cl:cons ':theta2 (theta2 msg))
))
