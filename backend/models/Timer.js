const mongoose = require("mongoose");

const timerSchema = new mongoose.Schema({
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
  },
  total_time: {
    type: Number, // In seconds
  },
});

const Timer = mongoose.model("Timer", timerSchema);

module.exports = Timer;
