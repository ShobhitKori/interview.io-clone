const mongoose = require("../db")

const CandidateReportSchema = new mongoose.Schema({
  browserStorage: String,
  functionallyCorrect: String,
  performant: String,
  pseudoCode: String,
  cornerCases: String,
  dataStructures: String,
  htmlCssBasic: String,
  htmlCssResponsive: String,
  js: String,
  finalSuggestion: String,
  feedback: String,
  business: {
    name: String,
    email: String,
  },
  candidate: {
    name: String,
    email: String,
  },
  interviewer: {
    name: String,
    email: String,
  }
})

module.exports = mongoose.model("CandidateReport", CandidateReportSchema)