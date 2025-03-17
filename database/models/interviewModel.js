const mongoose = require("../db")

const InterviewSchema = new mongoose.Schema({
  role: String,
  round: String,
  business: {
    name: String,
    email: String,
  },
  candidate: {
    name: String,
    email: String,
    phone: String,
    timeZone: String,
  },
  interviewer: {
    name: String,
    email: String,
  },
  evaluationCriteria: {
    browserStorage: Boolean,
    functionallyCorrect: Boolean,
    performant: Boolean,
    pseudoCode: Boolean,
    cornerCases: Boolean,
    dataStructures: Boolean,
    htmlCssBasic: Boolean,
    htmlCssResponsive: Boolean,
    js: Boolean,
  },
  interviewSchedule: {
    date: String,
    time: String,
    duration: String, 
  },
})

module.exports = mongoose.model("InterviewModel", InterviewSchema)