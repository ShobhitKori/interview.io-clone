const express = require("express");
const signupControllerCandidate = require("../controllers/signupCandidate");
const signupControllerCompany = require("../controllers/signupCompany")

const router = express.Router();

router.post("/", signupControllerCompany.createUser);
router.post("/candidate", signupControllerCandidate.createUser);

module.exports = router;