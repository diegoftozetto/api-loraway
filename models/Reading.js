const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReadingSchema = new Schema({
  deviceId: {
    type: Number,
    require: true
  },
  messageId: {
    type: Number,
    require: true
  },
  timestamp: {
    type: Number,
    required: true
  },
  attributes: {
    type: Object,
    require: false
  }
}, { timestamps: true });

mongoose.model("readings", ReadingSchema);
