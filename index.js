const express = require("express");
const cors = require("cors");
require("dotenv").config()
const { connection } = require("./db");
const { UserRouter } = require("./route/user.route");
const { EmployeeRouter } = require("./route/employee.router")
const { auth } = require("./middleware/auth");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome To Employee Application");
});
app.use("/api", UserRouter)
app.use("/api", auth, EmployeeRouter)

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to Database");
  } catch (error) {
    console.log(error, "unable to connect to Database");
  }
  console.log("server is runnning at port 1599")
});

