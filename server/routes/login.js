const express = require("express");
const cors = require("cors");
const { loginBusiness, loginCandidate } = require("../controllers/login");

const router = express.Router();

router.use(cors());

router.post("/candidate", loginCandidate);
router.post("/", loginBusiness);

module.exports = router;
