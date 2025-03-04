const authServiceBusiness = require("../services/loginCompany");
const authServiceCandidate = require("../services/loginCandidate");

async function loginBusiness(req, res) {
  try {
    const { email, password } = req.body;
    const token = await authServiceBusiness.loginCompany(email, password);
    res.json({ token: token })
  } catch (error) {
    console.log("Login error: ", error.message);
    res.status(401).json({ message: "Invalid Credentials" });
  }
}
async function loginCandidate(req, res) {
  try {
    const { email, password } = req.body;
    const token = await authServiceCandidate.loginCandidate(email, password);
    res.json({ token: token })
  } catch (error) {
    console.log("Login error: ", error.message);
    res.status(401).json({ message: "Invalid Credentials" });
  }
}

module.exports = { loginBusiness, loginCandidate }