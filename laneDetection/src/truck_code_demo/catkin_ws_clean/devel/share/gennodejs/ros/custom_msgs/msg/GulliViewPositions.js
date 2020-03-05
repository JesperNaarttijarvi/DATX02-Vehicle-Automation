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

class GulliViewPositions {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.p1 = null;
      this.tagid1 = null;
      this.p2 = null;
      this.tagid2 = null;
      this.cameraid = null;
    }
    else {
      if (initObj.hasOwnProperty('p1')) {
        this.p1 = initObj.p1
      }
      else {
        this.p1 = new Position();
      }
      if (initObj.hasOwnProperty('tagid1')) {
        this.tagid1 = initObj.tagid1
      }
      else {
        this.tagid1 = 0;
      }
      if (initObj.hasOwnProperty('p2')) {
        this.p2 = initObj.p2
      }
      else {
        this.p2 = new Position();
      }
      if (initObj.hasOwnProperty('tagid2')) {
        this.tagid2 = initObj.tagid2
      }
      else {
        this.tagid2 = 0;
      }
      if (initObj.hasOwnProperty('cameraid')) {
        this.cameraid = initObj.cameraid
      }
      else {
        this.cameraid = 0;
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type GulliViewPositions
    // Serialize message field [p1]
    bufferOffset = Position.serialize(obj.p1, buffer, bufferOffset);
    // Serialize message field [tagid1]
    bufferOffset = _serializer.int32(obj.tagid1, buffer, bufferOffset);
    // Serialize message field [p2]
    bufferOffset = Position.serialize(obj.p2, buffer, bufferOffset);
    // Serialize message field [tagid2]
    bufferOffset = _serializer.int32(obj.tagid2, buffer, bufferOffset);
    // Serialize message field [cameraid]
    bufferOffset = _serializer.int32(obj.cameraid, buffer, bufferOffset);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type GulliViewPositions
    let len;
    let data = new GulliViewPositions(null);
    // Deserialize message field [p1]
    data.p1 = Position.deserialize(buffer, bufferOffset);
    // Deserialize message field [tagid1]
    data.tagid1 = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [p2]
    data.p2 = Position.deserialize(buffer, bufferOffset);
    // Deserialize message field [tagid2]
    data.tagid2 = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [cameraid]
    data.cameraid = _deserializer.int32(buffer, bufferOffset);
    return data;
  }

  static getMessageSize(object) {
    return 28;
  }

  static datatype() {
    // Returns string type for a message object
    return 'custom_msgs/GulliViewPositions';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '183dd0693b2375fdac3c57ae3e24b202';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    Position p1
    int32 tagid1
    Position p2
    int32 tagid2
    int32 cameraid
    
    
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
    const resolved = new GulliViewPositions(null);
    if (msg.p1 !== undefined) {
      resolved.p1 = Position.Resolve(msg.p1)
    }
    else {
      resolved.p1 = new Position()
    }

    if (msg.tagid1 !== undefined) {
      resolved.tagid1 = msg.tagid1;
    }
    else {
      resolved.tagid1 = 0
    }

    if (msg.p2 !== undefined) {
      resolved.p2 = Position.Resolve(msg.p2)
    }
    else {
      resolved.p2 = new Position()
    }

    if (msg.tagid2 !== undefined) {
      resolved.tagid2 = msg.tagid2;
    }
    else {
      resolved.tagid2 = 0
    }

    if (msg.cameraid !== undefined) {
      resolved.cameraid = msg.cameraid;
    }
    else {
      resolved.cameraid = 0
    }

    return resolved;
    }
};

module.exports = GulliViewPositions;
