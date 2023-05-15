const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Email = require("mongoose-type-email"); // ezzel gond van..Tettem Stringre a mailt, nem tudom jó-e
 

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: Email,//String
  },
  address: {
    type: String,
  },
  shoeSize: {
    type: Number,
    required: true,
    min: 18,
  },
  points: Number,
});

const UserSchema = model("Users", userSchema);
module.exports = UserSchema;