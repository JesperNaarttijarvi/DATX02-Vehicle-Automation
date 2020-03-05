; Auto-generated. Do not edit!


(cl:in-package custom_msgs-srv)


;//! \htmlinclude RequestPath-request.msg.html

(cl:defclass <RequestPath-request> (roslisp-msg-protocol:ros-message)
  ((state
    :reader state
    :initarg :state
    :type custom_msgs-msg:TruckState
    :initform (cl:make-instance 'custom_msgs-msg:TruckState))
   (goals
    :reader goals
    :initarg :goals
    :type custom_msgs-msg:Path
    :initform (cl:make-instance 'custom_msgs-msg:Path)))
)

(cl:defclass RequestPath-request (<RequestPath-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <RequestPath-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'RequestPath-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name custom_msgs-srv:<RequestPath-request> is deprecated: use custom_msgs-srv:RequestPath-request instead.")))

(cl:ensure-generic-function 'state-val :lambda-list '(m))
(cl:defmethod state-val ((m <RequestPath-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader custom_msgs-srv:state-val is deprecated.  Use custom_msgs-srv:state instead.")
  (state m))

(cl:ensure-generic-function 'goals-val :lambda-list '(m))
(cl:defmethod goals-val ((m <RequestPath-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader custom_msgs-srv:goals-val is deprecated.  Use custom_msgs-srv:goals instead.")
  (goals m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <RequestPath-request>) ostream)
  "Serializes a message object of type '<RequestPath-request>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'state) ostream)
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'goals) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <RequestPath-request>) istream)
  "Deserializes a message object of type '<RequestPath-request>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'state) istream)
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'goals) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<RequestPath-request>)))
  "Returns string type for a service object of type '<RequestPath-request>"
  "custom_msgs/RequestPathRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'RequestPath-request)))
  "Returns string type for a service object of type 'RequestPath-request"
  "custom_msgs/RequestPathRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<RequestPath-request>)))
  "Returns md5sum for a message object of type '<RequestPath-request>"
  "22f3c9ad76f7baef9b992077c4b2173c")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'RequestPath-request)))
  "Returns md5sum for a message object of type 'RequestPath-request"
  "22f3c9ad76f7baef9b992077c4b2173c")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<RequestPath-request>)))
  "Returns full string definition for message of type '<RequestPath-request>"
  (cl:format cl:nil "TruckState state~%Path goals~%~%================================================================================~%MSG: custom_msgs/TruckState~%Position p~%float32 theta1~%float32 theta2~%~%================================================================================~%MSG: custom_msgs/Position~%int32 x~%int32 y~%~%================================================================================~%MSG: custom_msgs/Path~%Position[] path~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'RequestPath-request)))
  "Returns full string definition for message of type 'RequestPath-request"
  (cl:format cl:nil "TruckState state~%Path goals~%~%================================================================================~%MSG: custom_msgs/TruckState~%Position p~%float32 theta1~%float32 theta2~%~%================================================================================~%MSG: custom_msgs/Position~%int32 x~%int32 y~%~%================================================================================~%MSG: custom_msgs/Path~%Position[] path~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <RequestPath-request>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'state))
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'goals))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <RequestPath-request>))
  "Converts a ROS message object to a list"
  (cl:list 'RequestPath-request
    (cl:cons ':state (state msg))
    (cl:cons ':goals (goals msg))
))
;//! \htmlinclude RequestPath-response.msg.html

(cl:defclass <RequestPath-response> (roslisp-msg-protocol:ros-message)
  ((success
    :reader success
    :initarg :success
    :type cl:boolean
    :initform cl:nil)
   (message
    :reader message
    :initarg :message
    :type cl:string
    :initform ""))
)

(cl:defclass RequestPath-response (<RequestPath-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <RequestPath-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'RequestPath-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name custom_msgs-srv:<RequestPath-response> is deprecated: use custom_msgs-srv:RequestPath-response instead.")))

(cl:ensure-generic-function 'success-val :lambda-list '(m))
(cl:defmethod success-val ((m <RequestPath-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader custom_msgs-srv:success-val is deprecated.  Use custom_msgs-srv:success instead.")
  (success m))

(cl:ensure-generic-function 'message-val :lambda-list '(m))
(cl:defmethod message-val ((m <RequestPath-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader custom_msgs-srv:message-val is deprecated.  Use custom_msgs-srv:message instead.")
  (message m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <RequestPath-response>) ostream)
  "Serializes a message object of type '<RequestPath-response>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'success) 1 0)) ostream)
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'message))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'message))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <RequestPath-response>) istream)
  "Deserializes a message object of type '<RequestPath-response>"
    (cl:setf (cl:slot-value msg 'success) (cl:not (cl:zerop (cl:read-byte istream))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'message) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'message) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<RequestPath-response>)))
  "Returns string type for a service object of type '<RequestPath-response>"
  "custom_msgs/RequestPathResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'RequestPath-response)))
  "Returns string type for a service object of type 'RequestPath-response"
  "custom_msgs/RequestPathResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<RequestPath-response>)))
  "Returns md5sum for a message object of type '<RequestPath-response>"
  "22f3c9ad76f7baef9b992077c4b2173c")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'RequestPath-response)))
  "Returns md5sum for a message object of type 'RequestPath-response"
  "22f3c9ad76f7baef9b992077c4b2173c")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<RequestPath-response>)))
  "Returns full string definition for message of type '<RequestPath-response>"
  (cl:format cl:nil "bool success~%string message~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'RequestPath-response)))
  "Returns full string definition for message of type 'RequestPath-response"
  (cl:format cl:nil "bool success~%string message~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <RequestPath-response>))
  (cl:+ 0
     1
     4 (cl:length (cl:slot-value msg 'message))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <RequestPath-response>))
  "Converts a ROS message object to a list"
  (cl:list 'RequestPath-response
    (cl:cons ':success (success msg))
    (cl:cons ':message (message msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'RequestPath)))
  'RequestPath-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'RequestPath)))
  'RequestPath-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'RequestPath)))
  "Returns string type for a service object of type '<RequestPath>"
  "custom_msgs/RequestPath")