; Auto-generated. Do not edit!


(cl:in-package custom_msgs-msg)


;//! \htmlinclude GulliViewPositions.msg.html

(cl:defclass <GulliViewPositions> (roslisp-msg-protocol:ros-message)
  ((p1
    :reader p1
    :initarg :p1
    :type custom_msgs-msg:Position
    :initform (cl:make-instance 'custom_msgs-msg:Position))
   (tagid1
    :reader tagid1
    :initarg :tagid1
    :type cl:integer
    :initform 0)
   (p2
    :reader p2
    :initarg :p2
    :type custom_msgs-msg:Position
    :initform (cl:make-instance 'custom_msgs-msg:Position))
   (tagid2
    :reader tagid2
    :initarg :tagid2
    :type cl:integer
    :initform 0)
   (cameraid
    :reader cameraid
    :initarg :cameraid
    :type cl:integer
    :initform 0))
)

(cl:defclass GulliViewPositions (<GulliViewPositions>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <GulliViewPositions>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'GulliViewPositions)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name custom_msgs-msg:<GulliViewPositions> is deprecated: use custom_msgs-msg:GulliViewPositions instead.")))

(cl:ensure-generic-function 'p1-val :lambda-list '(m))
(cl:defmethod p1-val ((m <GulliViewPositions>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader custom_msgs-msg:p1-val is deprecated.  Use custom_msgs-msg:p1 instead.")
  (p1 m))

(cl:ensure-generic-function 'tagid1-val :lambda-list '(m))
(cl:defmethod tagid1-val ((m <GulliViewPositions>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader custom_msgs-msg:tagid1-val is deprecated.  Use custom_msgs-msg:tagid1 instead.")
  (tagid1 m))

(cl:ensure-generic-function 'p2-val :lambda-list '(m))
(cl:defmethod p2-val ((m <GulliViewPositions>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader custom_msgs-msg:p2-val is deprecated.  Use custom_msgs-msg:p2 instead.")
  (p2 m))

(cl:ensure-generic-function 'tagid2-val :lambda-list '(m))
(cl:defmethod tagid2-val ((m <GulliViewPositions>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader custom_msgs-msg:tagid2-val is deprecated.  Use custom_msgs-msg:tagid2 instead.")
  (tagid2 m))

(cl:ensure-generic-function 'cameraid-val :lambda-list '(m))
(cl:defmethod cameraid-val ((m <GulliViewPositions>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader custom_msgs-msg:cameraid-val is deprecated.  Use custom_msgs-msg:cameraid instead.")
  (cameraid m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <GulliViewPositions>) ostream)
  "Serializes a message object of type '<GulliViewPositions>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'p1) ostream)
  (cl:let* ((signed (cl:slot-value msg 'tagid1)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'p2) ostream)
  (cl:let* ((signed (cl:slot-value msg 'tagid2)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
  (cl:let* ((signed (cl:slot-value msg 'cameraid)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <GulliViewPositions>) istream)
  "Deserializes a message object of type '<GulliViewPositions>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'p1) istream)
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'tagid1) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'p2) istream)
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'tagid2) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'cameraid) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<GulliViewPositions>)))
  "Returns string type for a message object of type '<GulliViewPositions>"
  "custom_msgs/GulliViewPositions")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'GulliViewPositions)))
  "Returns string type for a message object of type 'GulliViewPositions"
  "custom_msgs/GulliViewPositions")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<GulliViewPositions>)))
  "Returns md5sum for a message object of type '<GulliViewPositions>"
  "183dd0693b2375fdac3c57ae3e24b202")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'GulliViewPositions)))
  "Returns md5sum for a message object of type 'GulliViewPositions"
  "183dd0693b2375fdac3c57ae3e24b202")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<GulliViewPositions>)))
  "Returns full string definition for message of type '<GulliViewPositions>"
  (cl:format cl:nil "Position p1~%int32 tagid1~%Position p2~%int32 tagid2~%int32 cameraid~%~%~%================================================================================~%MSG: custom_msgs/Position~%int32 x~%int32 y~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'GulliViewPositions)))
  "Returns full string definition for message of type 'GulliViewPositions"
  (cl:format cl:nil "Position p1~%int32 tagid1~%Position p2~%int32 tagid2~%int32 cameraid~%~%~%================================================================================~%MSG: custom_msgs/Position~%int32 x~%int32 y~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <GulliViewPositions>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'p1))
     4
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'p2))
     4
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <GulliViewPositions>))
  "Converts a ROS message object to a list"
  (cl:list 'GulliViewPositions
    (cl:cons ':p1 (p1 msg))
    (cl:cons ':tagid1 (tagid1 msg))
    (cl:cons ':p2 (p2 msg))
    (cl:cons ':tagid2 (tagid2 msg))
    (cl:cons ':cameraid (cameraid msg))
))
