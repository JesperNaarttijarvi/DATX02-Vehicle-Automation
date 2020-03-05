// Auto-generated. Do not edit!

// (in-package custom_msgs.msg)


"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array;
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength;
let Position = require('./Position.js');

//-----------------------------------------------------------

class TruckState {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.p = null;
      this.theta1 = null;
      this.theta2 = null;
    }
    else {
      if (initObj.hasOwnProperty('p')) {
        this.p = initObj.p
      }
      else {
        this.p = new Position();
      }
      if (initObj.hasOwnProperty('theta1')) {
        this.theta1 = initObj.theta1
      }
      else {
        this.theta1 = 0.0;
      }
      if (initObj.hasOwnProperty('theta2')) {
        this.theta2 = initObj.theta2
      }
      else {
        this.theta2 = 0.0;
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type TruckState
    // Serialize message field [p]
    bufferOffset = Position.serialize(obj.p, buffer, bufferOffset);
    // Serialize message field [theta1]
    bufferOffset = _serializer.float32(obj.theta1, buffer, bufferOffset);
    // Serialize message field [theta2]
    bufferOffset = _serializer.float32(obj.theta2, buffer, bufferOffset);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type TruckState
    let len;
    let data = new TruckState(null);
    // Deserialize message field [p]
    data.p = Position.deserialize(buffer, bufferOffset);
    // Deserialize message field [theta1]
    data.theta1 = _deserializer.float32(buffer, bufferOffset);
    // Deserialize message field [theta2]
    data.theta2 = _deserializer.float32(buffer, bufferOffset);
    return data;
  }

  static getMessageSize(object) {
    return 16;
  }

  static datatype() {
    // Returns string type for a message object
    return 'custom_msgs/TruckState';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'b44a11adf408b3c6943c97950abcf47c';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    Position p
    float32 theta1
    float32 theta2
    
    ================================================================================
    MSG: custom_msgs/Position
    int32 x
    int32 y
    
    `;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new TruckState(null);
    if (msg.p !== undefined) {
      resolved.p = Position.Resolve(msg.p)
    }
    else {
      resolved.p = new Position()
    }

    if (msg.theta1 !== undefined) {
      resolved.theta1 = msg.theta1;
    }
    else {
      resolved.theta1 = 0.0
    }

    if (msg.theta2 !== undefined) {
      resolved.theta2 = msg.theta2;
    }
    else {
      resolved.theta2 = 0.0
    }

    return resolved;
    }
};

module.exports = TruckState;
