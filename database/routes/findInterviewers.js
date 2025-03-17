const express = require('express');
const router = express.Router();
const User = require("../models/user"); // Assuming your User model is in "../models/user"

// Route to fetch users with role "interviewer"
router.get('/', async (req, res) => {
  try {
    const interviewers = await User.find({ role: "interviewer" });

    if (!interviewers || interviewers.length === 0) {
      return res.status(404).json({ message: "No interviewers found." });
    }

    // Optionally, you might want to filter out sensitive data (like passwords)
    const sanitizedInterviewers = interviewers.map(interviewer => ({
      _id: interviewer._id,
      name: interviewer.name,
      email: interviewer.email,
      // ... other relevant fields
    }));

    res.status(200).json(sanitizedInterviewers);
  } catch (error) {
    console.error("Error fetching interviewers:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;