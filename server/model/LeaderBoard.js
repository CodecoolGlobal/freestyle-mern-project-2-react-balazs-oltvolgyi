const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const leaderBoardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
});

const LeaderBoardSchema = model("LeaderBoard", leaderBoardSchema);
module.exports = LeaderBoardSchema;
