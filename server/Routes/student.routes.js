const router = require("express").Router();
const Student = require("../models/Student.model");

//Creates a new student with their respective cohort id
router.post("/", (req, res, next) => {
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
      next(err);
    });
});

// Returns all the students in JSON format
router.get("/", (req, res, next) => {
  Student.find({})
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students", students);
      res.json(students);
    })

    .catch((err) => {
      console.log(err);
      next(err);
    });
});

//Returns all the students of a specified cohort in JSON format

router.get("/cohort/:cohortId", (req, res, next) => {
  const { cohortId } = req.params;
  Student.find({ cohort: cohortId })
    .populate("cohort")
    .then((students) => {
      console.log("Retrieved students for this cohort", students);
      res.json(students);
    })
    .catch((err) => {
      next(err);
    });
});

//Returns the specified student by id
router.get("/:studentId", (req, res, next) => {
  Student.findById(req.params.studentId)
    .populate("cohort")
    .then((oneStudent) => {
      console.log("One student found", oneStudent);
      res.json(oneStudent);
    })
    .catch((err) => {
      next(err);
    });
});

//Updates the specified student by id
router.put("/:studentId", (req, res, next) => {
  Student.findByIdAndUpdate(req.params.studentId, req.body, { new: true })
    .then((oneStudent) => {
      console.log("Student updated", oneStudent);
      res.status(200).json(oneStudent);
    })
    .catch((err) => {
      next(err);
    });
});

//Deletes the specified cohort by id
router.delete("/:studentId", (req, res, next) => {
  Student.findByIdAndDelete(req.params.studentId)
    .then((oneStudent) => {
      console.log(" student deleted", oneStudent);
      res.status(204).json(oneStudent);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
