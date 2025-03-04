const express = require('express');
const cors = require("cors");
const signupRoute = require("./routes/signup")
const loginRoute = require("./routes/login")
const bodyparser = require("body-parser");

const app = express();
const PORT = process.env.PORT||5000;

app.use(bodyparser.json());
app.use(cors());

app.use("/signup", signupRoute);
app.use("/login", loginRoute)

app.listen(PORT, () => {
  console.log(`Listining on port http://localhost:${PORT}...`)
}); 