const mongoose = require('../db');
const passwordComplexity = require('joi-password-complexity');


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  role: { type: String, enum: ["candidate", "business"], default: "business"}
});


module.exports = mongoose.model("User", userSchema);
