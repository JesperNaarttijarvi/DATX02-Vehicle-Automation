
(cl:in-package :asdf)

(defsystem "custom_msgs-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :custom_msgs-msg
)
  :components ((:file "_package")
    (:file "RequestPath" :depends-on ("_package_RequestPath"))
    (:file "_package_RequestPath" :depends-on ("_package"))
  ))