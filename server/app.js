const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// const cohorts = require("./cohorts.json");
// const students = require("./students.json");
const PORT = 5005;
const Cohort = require("./models/Cohort.model.js");
const Student = require("./models/Student.model.js");
const {
  errorHandler,
  notFoundHandler,
} = require("./error-handling/error-handling.js");
// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173"] }));

//MONGOOSE - Set up
mongoose
  .connect("mongodb://localhost:27017/cohort-tool-api")
  .then((x) => console.log(`Connected to DB : ${x.connections[0].name} `))
  .catch((err) => console.error("Error connection to DB", err));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...

// const indexRoutes = require("./Routes/index.routes");
// app.use("/api", indexRoutes);

const cohortRoutes = require("./Routes/cohort.routes.js");
app.use("/api/cohorts", cohortRoutes);

const studentRoutes = require("./Routes/student.routes.js");
app.use("/api/students", studentRoutes);

const authRoutes = require("./Routes/auth.routes.js");
app.use("/auth", authRoutes);

const userRoutes = require("./Routes/user.routes.js");
app.use("/api/users", userRoutes);

app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

//Error handler
app.use(errorHandler);
app.use(notFoundHandler);

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
