const express = require("express")
const router = express.Router()
const CandidateReportModel = require("../models/CandidateReportModel");

router.post('/', async (req, res) => {
  try {
    const reportData = req.body;
    const newReport = new CandidateReportModel(reportData)
    const savedReport = await newReport.save()
    res.status(201).json(savedReport);
  } catch (error) {
    console.error("Error creating report entry", error)
    res.status(500).json({ message: "Failed to create report", error: error.message })
  }
})

router.post('/company', async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ message: "Email is required in req body." })
    }

    const reportData = await CandidateReportModel.find({ "business.email": email });
    if (!reportData || reportData.length === 0) {
      return res.status(404).json({ message: "No company data found for the given email." });
    }

    res.status(200).json(reportData);
  } catch (error) {
    console.error("Error fetching company data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
})

router.get('/', async (req, res) => {
  try {
  
    const reportData = await CandidateReportModel.find();
  

    res.status(200).json(reportData);
  } catch (error) {
    console.error("Error fetching company data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
})

module.exports = router