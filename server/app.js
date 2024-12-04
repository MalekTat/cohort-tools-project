const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// const cohorts = require("./cohorts.json");
// const students = require("./students.json");
const PORT = 5005;
const Cohort = require("./models/Cohort.model.js");
const Student = require("./models/Student.model.js");

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
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.post("/api/cohorts", (req, res) => {
  Cohort.create({
    cohortSlug: req.body.cohortSlug,
    cohortName: req.body.cohortName,
    program: req.body.program,
    format: req.body.format,
    campus: req.body.campus,
    startDate: req.body.startDate,
    inProgress: req.body.inProgress,
    programManager: req.body.programManager,
    leadTeacher: req.body.leadTeacher,
    totalHours: req.params.totalHours,
  })
    .then((newCohort) => {
      console.log("add new cohort", newCohort);
      res.status(200).json(newCohort);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

app.get("/api/cohorts", (req, res) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts", cohorts);
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      console.log("error during retrieving cohorts", error);
      res.status(500);
    });
});

app.get("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findById(req.params.cohortId)
    .then((oneCohort) => {
      console.log("Retrived one cohort", oneCohort);
      res.status(200).json(oneCohort);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

app.put("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((oneCohort) => {
      console.log("update one cohort", oneCohort);
      res.status(200).json(oneCohort);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

app.delete("/api/cohorts/:cohortId", (req, res) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then((oneCohort) => {
      console.log("deleting one Cohort", oneCohort);
      res.status(200).json(oneCohort);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

// Returns all the students in JSON format
app.get("/api/students", (req, res) => {
  Student.find({})
    .then((students) => {
      console.log("Retrieved students", students);
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

//Returns all the students of a specified cohort in JSON format

app.get("/api/students/cohort/:cohortId", (req, res) => {
  const { cohortId } = req.params;
  Student.find({ cohort: cohortId })
    .then((students) => {
      console.log("Retrieved students for this cohort", students);
      res.json(students);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

//Returns the specified student by id
app.get("/api/students/:studentId", (req, res) => {
  Student.findById(req.params.studentId)
    .then((oneStudent) => {
      console.log("One student found", oneStudent);
      res.json(oneStudent);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "failed to find the student" });
    });
});

//Creates a new student with their respective cohort id
app.post("/api/students", (req, res) => {
  Student.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    linkedinUrl: req.body.linkedinUrl,
    languages: req.body.languages,
    program: req.body.program,
    background: req.body.background,
    image: req.body.image,
    projects: req.body.projects,
    cohort: req.body.cohort, ///// EST CE QU'IL NE FAUDRAIT PAS METTRE L'ID
  })
    .then((newStudent) => {
      console.log("add new student", newStudent);
      res.status(200).json(newStudent);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

//Updates the specified student by id
app.put("/api/students/:studentId", (req, res) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((oneStudent) => {
      console.log("Student updated", oneStudent);
      res.status(200).json(oneStudent);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "failed to update the student" });
    });
});

//Deletes the specified cohort by id
app.delete("/api/students/:studentId", (req, res) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then((oneStudent) => {
      console.log(" student deleted", oneStudent);
      res.status(204).json(oneStudent);
    })
    .catch((err) => {
      console.log("Oups", err);
      res.status(500).json({ error: "Failed to retrieve the student" });
    });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
