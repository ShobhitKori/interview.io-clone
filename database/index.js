const express = require('express');
const cors = require("cors");
const signupRoute = require("./routes/signup")
const loginRoute = require("./routes/login")
const findInterviewers = require("./routes/findInterviewers")
const interviews = require('./routes/interviewData')
const report = require('./routes/CandidateReportRoute')
const bodyparser = require("body-parser");
const { find } = require('./models/user');


const app = express();
const PORT = process.env.PORT||5000;

app.use(bodyparser.json());
app.use(cors());

app.use("/signup", signupRoute);
app.use("/login", loginRoute)
app.use("/interviewers", findInterviewers);
app.use("/interviews", interviews);
app.use("/report", report);

app.listen(PORT, () => {
  console.log(`Listining on port http://localhost:${PORT}...`)
}); 