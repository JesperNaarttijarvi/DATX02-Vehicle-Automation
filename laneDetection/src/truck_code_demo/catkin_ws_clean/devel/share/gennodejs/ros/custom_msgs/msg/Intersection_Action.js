// Auto-generated. Do not edit!

// (in-package custom_msgs.msg)


"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array;
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength;

//-----------------------------------------------------------

class Intersection_Action {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.Intersection_1 = null;
      this.Intersection_2 = null;
      this.Intersection_3 = null;
      this.Roundabout = null;
    }
    else {
      if (initObj.hasOwnProperty('Intersection_1')) {
        this.Intersection_1 = initObj.Intersection_1
      }
      else {
        this.Intersection_1 = '';
      }
      if (initObj.hasOwnProperty('Intersection_2')) {
        this.Intersection_2 = initObj.Intersection_2
      }
      else {
        this.Intersection_2 = '';
      }
      if (initObj.hasOwnProperty('Intersection_3')) {
        this.Intersection_3 = initObj.Intersection_3
      }
      else {
        this.Intersection_3 = '';
      }
      if (initObj.hasOwnProperty('Roundabout')) {
        this.Roundabout = initObj.Roundabout
      }
      else {
        this.Roundabout = '';
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type Intersection_Action
    // Serialize message field [Intersection_1]
    bufferOffset = _serializer.string(obj.Intersection_1, buffer, bufferOffset);
    // Serialize message field [Intersection_2]
    bufferOffset = _serializer.string(obj.Intersection_2, buffer, bufferOffset);
    // Serialize message field [Intersection_3]
    bufferOffset = _serializer.string(obj.Intersection_3, buffer, bufferOffset);
    // Serialize message field [Roundabout]
    bufferOffset = _serializer.string(obj.Roundabout, buffer, bufferOffset);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type Intersection_Action
    let len;
    let data = new Intersection_Action(null);
    // Deserialize message field [Intersection_1]
    data.Intersection_1 = _deserializer.string(buffer, bufferOffset);
    // Deserialize message field [Intersection_2]
    data.Intersection_2 = _deserializer.string(buffer, bufferOffset);
    // Deserialize message field [Intersection_3]
    data.Intersection_3 = _deserializer.string(buffer, bufferOffset);
    // Deserialize message field [Roundabout]
    data.Roundabout = _deserializer.string(buffer, bufferOffset);
    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += object.Intersection_1.length;
    length += object.Intersection_2.length;
    length += object.Intersection_3.length;
    length += object.Roundabout.length;
    return length + 16;
  }

  static datatype() {
    // Returns string type for a message object
    return 'custom_msgs/Intersection_Action';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'a626a67bdca8b2c0c5130ea57d7f1299';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
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
    const resolved = new Intersection_Action(null);
    if (msg.Intersection_1 !== undefined) {
      resolved.Intersection_1 = msg.Intersection_1;
    }
    else {
      resolved.Intersection_1 = ''
    }

    if (msg.Intersection_2 !== undefined) {
      resolved.Intersection_2 = msg.Intersection_2;
    }
    else {
      resolved.Intersection_2 = ''
    }

    if (msg.Intersection_3 !== undefined) {
      resolved.Intersection_3 = msg.Intersection_3;
    }
    else {
      resolved.Intersection_3 = ''
    }

    if (msg.Roundabout !== undefined) {
      resolved.Roundabout = msg.Roundabout;
    }
    else {
      resolved.Roundabout = ''
    }

    return resolved;
    }
};

module.exports = Intersection_Action;
