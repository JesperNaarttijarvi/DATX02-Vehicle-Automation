
(cl:in-package :asdf)

(defsystem "custom_msgs-msg"
  :depends-on (:roslisp-msg-protocol :roslisp-utils )
  :components ((:file "_package")
    (:file "GulliViewPositions" :depends-on ("_package_GulliViewPositions"))
    (:file "_package_GulliViewPositions" :depends-on ("_package"))
    (:file "Intersection_Action" :depends-on ("_package_Intersection_Action"))
    (:file "_package_Intersection_Action" :depends-on ("_package"))
    (:file "Path" :depends-on ("_package_Path"))
    (:file "_package_Path" :depends-on ("_package"))
    (:file "Position" :depends-on ("_package_Position"))
    (:file "_package_Position" :depends-on ("_package"))
    (:file "TruckState" :depends-on ("_package_TruckState"))
    (:file "_package_TruckState" :depends-on ("_package"))
    (:file "V2I" :depends-on ("_package_V2I"))
    (:file "_package_V2I" :depends-on ("_package"))
  ))