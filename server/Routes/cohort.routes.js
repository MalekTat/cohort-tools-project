const router = require("express").Router();
const Cohort = require("../models/Cohort.model");

router.post("/", (req, res, next) => {
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
      next(err);
    });
});

router.get("/", (req, res, next) => {
  Cohort.find({})
    .then((cohorts) => {
      console.log("Retrieved cohorts", cohorts);
      res.status(200).json(cohorts);
    })
    .catch((error) => {
      next(err);
    });
});

router.get("/:cohortId", (req, res, next) => {
  Cohort.findById(req.params.cohortId)
    .then((oneCohort) => {
      console.log("Retrived one cohort", oneCohort);
      res.status(200).json(oneCohort);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/:cohortId", (req, res, next) => {
  Cohort.findByIdAndUpdate(req.params.cohortId, req.body, { new: true })
    .then((oneCohort) => {
      console.log("update one cohort", oneCohort);
      res.status(200).json(oneCohort);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/:cohortId", (req, res, next) => {
  Cohort.findByIdAndDelete(req.params.cohortId)
    .then((oneCohort) => {
      console.log("deleting one Cohort", oneCohort);
      res.status(200).json(oneCohort);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
