const express = require("express");
const signupControllerCandidate = require("../controllers/signupCandidate");
const signupControllerCompany = require("../controllers/signupCompany")
const signupControllerInterviewer = require("../controllers/signupInterviewer")

const router = express.Router();

router.post("/", signupControllerCompany.createUser);
router.post("/candidate", signupControllerCandidate.createUser);
router.post("/interviewer", signupControllerInterviewer.createUser);

module.exports = router;