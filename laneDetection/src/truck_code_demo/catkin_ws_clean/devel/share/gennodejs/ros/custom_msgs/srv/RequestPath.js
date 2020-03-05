// Auto-generated. Do not edit!

// (in-package custom_msgs.srv)


"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array;
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength;
let TruckState = require('../msg/TruckState.js');
let Path = require('../msg/Path.js');

//-----------------------------------------------------------


//-----------------------------------------------------------

class RequestPathRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.state = null;
      this.goals = null;
    }
    else {
      if (initObj.hasOwnProperty('state')) {
        this.state = initObj.state
      }
      else {
        this.state = new TruckState();
      }
      if (initObj.hasOwnProperty('goals')) {
        this.goals = initObj.goals
      }
      else {
        this.goals = new Path();
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type RequestPathRequest
    // Serialize message field [state]
    bufferOffset = TruckState.serialize(obj.state, buffer, bufferOffset);
    // Serialize message field [goals]
    bufferOffset = Path.serialize(obj.goals, buffer, bufferOffset);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type RequestPathRequest
    let len;
    let data = new RequestPathRequest(null);
    // Deserialize message field [state]
    data.state = TruckState.deserialize(buffer, bufferOffset);
    // Deserialize message field [goals]
    data.goals = Path.deserialize(buffer, bufferOffset);
    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += Path.getMessageSize(object.goals);
    return length + 16;
  }

  static datatype() {
    // Returns string type for a service object
    return 'custom_msgs/RequestPathRequest';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'ba6139a6027479ef6115858ad4c9ae34';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    TruckState state
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
    
    `;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new RequestPathRequest(null);
    if (msg.state !== undefined) {
      resolved.state = TruckState.Resolve(msg.state)
    }
    else {
      resolved.state = new TruckState()
    }

    if (msg.goals !== undefined) {
      resolved.goals = Path.Resolve(msg.goals)
    }
    else {
      resolved.goals = new Path()
    }

    return resolved;
    }
};

class RequestPathResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.success = null;
      this.message = null;
    }
    else {
      if (initObj.hasOwnProperty('success')) {
        this.success = initObj.success
      }
      else {
        this.success = false;
      }
      if (initObj.hasOwnProperty('message')) {
        this.message = initObj.message
      }
      else {
        this.message = '';
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type RequestPathResponse
    // Serialize message field [success]
    bufferOffset = _serializer.bool(obj.success, buffer, bufferOffset);
    // Serialize message field [message]
    bufferOffset = _serializer.string(obj.message, buffer, bufferOffset);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type RequestPathResponse
    let len;
    let data = new RequestPathResponse(null);
    // Deserialize message field [success]
    data.success = _deserializer.bool(buffer, bufferOffset);
    // Deserialize message field [message]
    data.message = _deserializer.string(buffer, bufferOffset);
    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += object.message.length;
    return length + 5;
  }

  static datatype() {
    // Returns string type for a service object
    return 'custom_msgs/RequestPathResponse';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '937c9679a518e3a18d831e57125ea522';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    bool success
    string message
    
    
    `;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new RequestPathResponse(null);
    if (msg.success !== undefined) {
      resolved.success = msg.success;
    }
    else {
      resolved.success = false
    }

    if (msg.message !== undefined) {
      resolved.message = msg.message;
    }
    else {
      resolved.message = ''
    }

    return resolved;
    }
};

module.exports = {
  Request: RequestPathRequest,
  Response: RequestPathResponse,
  md5sum() { return '22f3c9ad76f7baef9b992077c4b2173c'; },
  datatype() { return 'custom_msgs/RequestPath'; }
};
