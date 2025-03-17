const authServiceBusiness = require("../services/loginCompany");
const authServiceCandidate = require("../services/loginCandidate");
const authServiceInterviewer = require("../services/loginInterviewer");

async function loginBusiness(req, res) {
  try {
    const { email, password } = req.body;
    const result = await authServiceBusiness.loginCompany(email, password);
    res.json(result)
  } catch (error) {
    console.log("Login error: ", error.message);
    res.status(401).json({ message: "Invalid Credentials" });
  }
}

async function loginCandidate(req, res) {
  try {
    const { email, password } = req.body;
    const result = await authServiceCandidate.loginCandidate(email, password);
    res.json(result)
  } catch (error) {
    console.log("Login error: ", error.message);
    res.status(401).json({ message: "Invalid Credentials" });
  }
}

async function loginInterviewer(req, res) {
  try {
    const { email, password } = req.body;
    const result = await authServiceInterviewer.loginInterviewer(email, password);
    res.json(result)
  } catch (error) {
    console.log("Login error: ", error.message);
    res.status(401).json({ message: "Invalid Credentials" });
  }
}

module.exports = { loginBusiness, loginCandidate, loginInterviewer }