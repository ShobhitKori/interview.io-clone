const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateToken } = require("../utils/jwtUtils");

async function loginCompany(email, password) {
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new Error("User not found!");
    }
    if (existingUser.role == "candidate") {
      throw new Error("User registered for different role.. Try login as Candidate or Interviewer");
    }
    const isPassValid = await bcrypt.compare(password, existingUser.password);
    if (!isPassValid) {
      throw new Error("Incorrect Password");
    }
    const token = generateToken(existingUser);
    return token;
  } catch (err) {
    console.log("Login error:", err.message);
    throw new Error("Invalid credentials");
  }
}

module.exports = { loginCompany }