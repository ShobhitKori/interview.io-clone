const express = require("express")
const router = express.Router()
const InterviewModel = require("../models/interviewModel");

router.post('/', async (req, res) => {
  try {
    const interviewData = req.body;
    const newInterview = new InterviewModel(interviewData)
    const savedInterview = await newInterview.save()
    res.status(201).json(savedInterview);
  } catch (error) {
    console.error("Erroe creating interview entry", error)
    res.status(500).json({ message: "Failed to create interview", error: error.message })
  }
})

router.post('/company', async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ message: "Email is required in req body." })
    }

    const companyData = await InterviewModel.find({ "business.email": email });
    if (!companyData || companyData.length === 0) {
      return res.status(404).json({ message: "No company data found for the given email." });
    }

    res.status(200).json(companyData);
  } catch (error) {
    console.error("Error fetching company data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
})

router.post('/candidate', async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ message: "Email is required in req body." })
    }

    const candidateData = await InterviewModel.find({ "candidate.email": email });
    if (!candidateData || candidateData.length === 0) {
      return res.status(404).json({ message: "No candidate data found for the given email." });
    }

    res.status(200).json(candidateData);
  } catch (error) {
    console.error("Error fetching canddidate data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
})

router.post('/interviewer', async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).json({ message: "Email is required in req body." })
    }

    const interviewerData = await InterviewModel.find({ "interviewer.email": email });
    if (!interviewerData || interviewerData.length === 0) {
      return res.status(404).json({ message: "No interviewer data found for the given email." });
    }

    res.status(200).json(interviewerData);
  } catch (error) {
    console.error("Error fetching interviewer data:", error);
    res.status(500).json({ message: "Internal server error." });
  }
})

module.exports = router