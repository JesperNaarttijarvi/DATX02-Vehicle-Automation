; Auto-generated. Do not edit!


(cl:in-package custom_msgs-msg)


;//! \htmlinclude V2I.msg.html

(cl:defclass <V2I> (roslisp-msg-protocol:ros-message)
  ((intersection
    :reader intersection
    :initarg :intersection
    :type cl:string
    :initform "")
   (initial_direction
    :reader initial_direction
    :initarg :initial_direction
    :type cl:string
    :initform "")
   (action
    :reader action
    :initarg :action
    :type custom_msgs-msg:Intersection_Action
    :initform (cl:make-instance 'custom_msgs-msg:Intersection_Action)))
)

(cl:defclass V2I (<V2I>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <V2I>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'V2I)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name custom_msgs-msg:<V2I> is deprecated: use custom_msgs-msg:V2I instead.")))

(cl:ensure-generic-function 'intersection-val :lambda-list '(m))
(cl:defmethod intersection-val ((m <V2I>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader custom_msgs-msg:intersection-val is deprecated.  Use custom_msgs-msg:intersection instead.")
  (intersection m))

(cl:ensure-generic-function 'initial_direction-val :lambda-list '(m))
(cl:defmethod initial_direction-val ((m <V2I>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader custom_msgs-msg:initial_direction-val is deprecated.  Use custom_msgs-msg:initial_direction instead.")
  (initial_direction m))

(cl:ensure-generic-function 'action-val :lambda-list '(m))
(cl:defmethod action-val ((m <V2I>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader custom_msgs-msg:action-val is deprecated.  Use custom_msgs-msg:action instead.")
  (action m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <V2I>) ostream)
  "Serializes a message object of type '<V2I>"
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'intersection))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'intersection))
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'initial_direction))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'initial_direction))
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'action) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <V2I>) istream)
  "Deserializes a message object of type '<V2I>"
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'intersection) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'intersection) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'initial_direction) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'initial_direction) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'action) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<V2I>)))
  "Returns string type for a message object of type '<V2I>"
  "custom_msgs/V2I")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'V2I)))
  "Returns string type for a message object of type 'V2I"
  "custom_msgs/V2I")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<V2I>)))
  "Returns md5sum for a message object of type '<V2I>"
  "dc3e455ff79d1a6a9b04e7b88a16da30")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'V2I)))
  "Returns md5sum for a message object of type 'V2I"
  "dc3e455ff79d1a6a9b04e7b88a16da30")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<V2I>)))
  "Returns full string definition for message of type '<V2I>"
  (cl:format cl:nil "string intersection~%string initial_direction~%Intersection_Action action~%~%================================================================================~%MSG: custom_msgs/Intersection_Action~%string Intersection_1~%string Intersection_2~%string Intersection_3~%string Roundabout~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'V2I)))
  "Returns full string definition for message of type 'V2I"
  (cl:format cl:nil "string intersection~%string initial_direction~%Intersection_Action action~%~%================================================================================~%MSG: custom_msgs/Intersection_Action~%string Intersection_1~%string Intersection_2~%string Intersection_3~%string Roundabout~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <V2I>))
  (cl:+ 0
     4 (cl:length (cl:slot-value msg 'intersection))
     4 (cl:length (cl:slot-value msg 'initial_direction))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'action))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <V2I>))
  "Converts a ROS message object to a list"
  (cl:list 'V2I
    (cl:cons ':intersection (intersection msg))
    (cl:cons ':initial_direction (initial_direction msg))
    (cl:cons ':action (action msg))
))
