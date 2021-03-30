const mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate-v2");

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

ReadingSchema.plugin(mongoosePaginate);
mongoose.model("readings", ReadingSchema);
