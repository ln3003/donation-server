const Project = require("../models/project");
const sequelize = require("../utilities/database");
const base64ToImage = require("../utilities/base64ToImage");
const { QueryTypes } = require("sequelize");
const status = require("http-status");
const express = require("express");
const { validationResult } = require("express-validator");
const {
  createProjectValidation,
  searchProjectValidation,
  editProjectValidation,
} = require("../utilities/validation");

const router = express.Router();

router.get("/get-all-project", (req, res, next) => {
  sequelize
    .query(
      "SELECT projects.*, SUM(donations.amount) AS donation_received FROM projects LEFT JOIN donations ON projects.id = donations.project_id WHERE projects.deleted = 0 GROUP BY projects.id ORDER BY projects.createdAt desc",
      { type: QueryTypes.SELECT }
    )
    .then((projects) => {
      res.send(projects);
    })
    .catch((reason) => {
      res.status(status.INTERNAL_SERVER_ERROR).send();
    });
});

router.post("/search-project", searchProjectValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  sequelize
    .query(
      `SELECT projects.*, SUM(donations.amount) AS donation_received FROM projects LEFT JOIN donations ON projects.id = donations.project_id WHERE projects.name LIKE :name AND projects.goal >= CONVERT(:goal,DECIMAL) AND projects.status LIKE :status AND projects.start_date >= :start_date AND projects.deleted = 0 GROUP BY projects.id ORDER BY projects.createdAt desc`,
      {
        replacements: {
          name: "%" + req.body.name + "%",
          goal: req.body.goal,
          status: req.body.status,
          start_date: req.body.start_date,
        },
        type: QueryTypes.SELECT,
      }
    )
    .then((projects) => {
      res.send(projects);
    })
    .catch((reason) => {
      res.status(status.INTERNAL_SERVER_ERROR).send();
    });
});

router.post("/create-project", createProjectValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  req.body.owner_id = 1;
  base64ToImage(req.body.image, req.body.name, "images", (imageLink) => {
    req.body.image = imageLink;
  });
  Project.create(req.body);
  res.status(status.OK).send();
});

router.delete("/delete-project/:id", (req, res, next) => {
  Project.findByPk(Number(req.params.id))
    .then((project) => {
      project.update({ deleted: true });
    })
    .catch((error) => {
      res.status(status.INTERNAL_SERVER_ERROR).send();
    });
  res.status(status.OK).send();
});

router.post("/delete-selected-project", (req, res, next) => {
  req.body.selectedValues.forEach((item) => {
    Project.findByPk(Number(item))
      .then((project) => {
        project.update({ deleted: true });
      })
      .catch((error) => {
        res.status(status.INTERNAL_SERVER_ERROR).send();
      });
  });
  res.status(status.OK).send();
});

router.patch("/update-project", editProjectValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  base64ToImage(req.body.image, req.body.name, "images", (imageLink) => {
    req.body.image = imageLink;
  });
  Project.findByPk(req.body.id)
    .then((project) => {
      project.update({
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        goal: req.body.goal,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        status: req.body.status,
      });
    })
    .catch((error) => {
      res.status(status.INTERNAL_SERVER_ERROR).send();
    });
  res.status(status.OK).send();
});

module.exports = router;
