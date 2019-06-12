const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UsersSchema = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = Users = mongoose.model("Users", UsersSchema);
