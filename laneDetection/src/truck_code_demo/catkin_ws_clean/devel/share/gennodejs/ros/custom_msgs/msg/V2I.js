// Auto-generated. Do not edit!

// (in-package custom_msgs.msg)


"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array;
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength;
let Intersection_Action = require('./Intersection_Action.js');

//-----------------------------------------------------------

class V2I {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.intersection = null;
      this.initial_direction = null;
      this.action = null;
    }
    else {
      if (initObj.hasOwnProperty('intersection')) {
        this.intersection = initObj.intersection
      }
      else {
        this.intersection = '';
      }
      if (initObj.hasOwnProperty('initial_direction')) {
        this.initial_direction = initObj.initial_direction
      }
      else {
        this.initial_direction = '';
      }
      if (initObj.hasOwnProperty('action')) {
        this.action = initObj.action
      }
      else {
        this.action = new Intersection_Action();
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type V2I
    // Serialize message field [intersection]
    bufferOffset = _serializer.string(obj.intersection, buffer, bufferOffset);
    // Serialize message field [initial_direction]
    bufferOffset = _serializer.string(obj.initial_direction, buffer, bufferOffset);
    // Serialize message field [action]
    bufferOffset = Intersection_Action.serialize(obj.action, buffer, bufferOffset);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type V2I
    let len;
    let data = new V2I(null);
    // Deserialize message field [intersection]
    data.intersection = _deserializer.string(buffer, bufferOffset);
    // Deserialize message field [initial_direction]
    data.initial_direction = _deserializer.string(buffer, bufferOffset);
    // Deserialize message field [action]
    data.action = Intersection_Action.deserialize(buffer, bufferOffset);
    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += object.intersection.length;
    length += object.initial_direction.length;
    length += Intersection_Action.getMessageSize(object.action);
    return length + 8;
  }

  static datatype() {
    // Returns string type for a message object
    return 'custom_msgs/V2I';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'dc3e455ff79d1a6a9b04e7b88a16da30';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string intersection
    string initial_direction
    Intersection_Action action
    
    ================================================================================
    MSG: custom_msgs/Intersection_Action
    string Intersection_1
    string Intersection_2
    string Intersection_3
    string Roundabout
    `;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new V2I(null);
    if (msg.intersection !== undefined) {
      resolved.intersection = msg.intersection;
    }
    else {
      resolved.intersection = ''
    }

    if (msg.initial_direction !== undefined) {
      resolved.initial_direction = msg.initial_direction;
    }
    else {
      resolved.initial_direction = ''
    }

    if (msg.action !== undefined) {
      resolved.action = Intersection_Action.Resolve(msg.action)
    }
    else {
      resolved.action = new Intersection_Action()
    }

    return resolved;
    }
};

module.exports = V2I;
