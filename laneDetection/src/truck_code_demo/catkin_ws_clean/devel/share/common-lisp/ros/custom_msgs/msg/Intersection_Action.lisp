; Auto-generated. Do not edit!


(cl:in-package custom_msgs-msg)


;//! \htmlinclude Intersection_Action.msg.html

(cl:defclass <Intersection_Action> (roslisp-msg-protocol:ros-message)
  ((Intersection_1
    :reader Intersection_1
    :initarg :Intersection_1
    :type cl:string
    :initform "")
   (Intersection_2
    :reader Intersection_2
    :initarg :Intersection_2
    :type cl:string
    :initform "")
   (Intersection_3
    :reader Intersection_3
    :initarg :Intersection_3
    :type cl:string
    :initform "")
   (Roundabout
    :reader Roundabout
    :initarg :Roundabout
    :type cl:string
    :initform ""))
)

(cl:defclass Intersection_Action (<Intersection_Action>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <Intersection_Action>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'Intersection_Action)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name custom_msgs-msg:<Intersection_Action> is deprecated: use custom_msgs-msg:Intersection_Action instead.")))

(cl:ensure-generic-function 'Intersection_1-val :lambda-list '(m))
(cl:defmethod Intersection_1-val ((m <Intersection_Action>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader custom_msgs-msg:Intersection_1-val is deprecated.  Use custom_msgs-msg:Intersection_1 instead.")
  (Intersection_1 m))

(cl:ensure-generic-function 'Intersection_2-val :lambda-list '(m))
(cl:defmethod Intersection_2-val ((m <Intersection_Action>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader custom_msgs-msg:Intersection_2-val is deprecated.  Use custom_msgs-msg:Intersection_2 instead.")
  (Intersection_2 m))

(cl:ensure-generic-function 'Intersection_3-val :lambda-list '(m))
(cl:defmethod Intersection_3-val ((m <Intersection_Action>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader custom_msgs-msg:Intersection_3-val is deprecated.  Use custom_msgs-msg:Intersection_3 instead.")
  (Intersection_3 m))

(cl:ensure-generic-function 'Roundabout-val :lambda-list '(m))
(cl:defmethod Roundabout-val ((m <Intersection_Action>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader custom_msgs-msg:Roundabout-val is deprecated.  Use custom_msgs-msg:Roundabout instead.")
  (Roundabout m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <Intersection_Action>) ostream)
  "Serializes a message object of type '<Intersection_Action>"
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'Intersection_1))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'Intersection_1))
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'Intersection_2))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'Intersection_2))
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'Intersection_3))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'Intersection_3))
  (cl:let ((__ros_str_len (cl:length (cl:slot-value msg 'Roundabout))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_str_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_str_len) ostream))
  (cl:map cl:nil #'(cl:lambda (c) (cl:write-byte (cl:char-code c) ostream)) (cl:slot-value msg 'Roundabout))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <Intersection_Action>) istream)
  "Deserializes a message object of type '<Intersection_Action>"
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'Intersection_1) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'Intersection_1) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'Intersection_2) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'Intersection_2) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'Intersection_3) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'Intersection_3) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
    (cl:let ((__ros_str_len 0))
      (cl:setf (cl:ldb (cl:byte 8 0) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) __ros_str_len) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'Roundabout) (cl:make-string __ros_str_len))
      (cl:dotimes (__ros_str_idx __ros_str_len msg)
        (cl:setf (cl:char (cl:slot-value msg 'Roundabout) __ros_str_idx) (cl:code-char (cl:read-byte istream)))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<Intersection_Action>)))
  "Returns string type for a message object of type '<Intersection_Action>"
  "custom_msgs/Intersection_Action")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'Intersection_Action)))
  "Returns string type for a message object of type 'Intersection_Action"
  "custom_msgs/Intersection_Action")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<Intersection_Action>)))
  "Returns md5sum for a message object of type '<Intersection_Action>"
  "a626a67bdca8b2c0c5130ea57d7f1299")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'Intersection_Action)))
  "Returns md5sum for a message object of type 'Intersection_Action"
  "a626a67bdca8b2c0c5130ea57d7f1299")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<Intersection_Action>)))
  "Returns full string definition for message of type '<Intersection_Action>"
  (cl:format cl:nil "string Intersection_1~%string Intersection_2~%string Intersection_3~%string Roundabout~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'Intersection_Action)))
  "Returns full string definition for message of type 'Intersection_Action"
  (cl:format cl:nil "string Intersection_1~%string Intersection_2~%string Intersection_3~%string Roundabout~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <Intersection_Action>))
  (cl:+ 0
     4 (cl:length (cl:slot-value msg 'Intersection_1))
     4 (cl:length (cl:slot-value msg 'Intersection_2))
     4 (cl:length (cl:slot-value msg 'Intersection_3))
     4 (cl:length (cl:slot-value msg 'Roundabout))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <Intersection_Action>))
  "Converts a ROS message object to a list"
  (cl:list 'Intersection_Action
    (cl:cons ':Intersection_1 (Intersection_1 msg))
    (cl:cons ':Intersection_2 (Intersection_2 msg))
    (cl:cons ':Intersection_3 (Intersection_3 msg))
    (cl:cons ':Roundabout (Roundabout msg))
))
