const Donation = require("../models/donation");
const sequelize = require("../utilities/database");
const { QueryTypes } = require("sequelize");
const express = require("express");
const status = require("http-status");
const {
  createToken,
  checkAdmin,
  checkUser,
} = require("../utilities/authenticate");

const router = express.Router();

router.get("/get-all-donation", checkAdmin, (req, res, next) => {
  sequelize
    .query(
      "SELECT users.name, users.avatar,donations.id, donations.amount, donations.payment_method, donations.donate_date, projects.name AS project_name FROM donations JOIN users ON users.id = donations.user_id JOIN projects ON projects.id = donations.project_id",
      { type: QueryTypes.SELECT }
    )
    .then((donations) => {
      res.status(status.OK).send(donations);
    })
    .catch(() => {
      res.status(status.INTERNAL_SERVER_ERROR).send();
    });
});

router.delete("/delete-donation/:id", checkAdmin, (req, res, next) => {
  Donation.findByPk(Number(req.params.id))
    .then((donation) => {
      donation
        .update({ deleted: true })
        .then(() => {
          res.status(status.OK).send();
        })
        .catch(() => {
          res.status(status.INTERNAL_SERVER_ERROR).send();
        });
    })
    .catch(() => {
      res.status(status.INTERNAL_SERVER_ERROR).send();
    });
});

router.post("/delete-selected-donation", checkAdmin, (req, res, next) => {
  req.body.selectedValues.forEach((item) => {
    Donation.findByPk(Number(item))
      .then((donation) => {
        donation
          .update({ deleted: true })
          .then(() => {
            res.status(status.OK).send();
          })
          .catch(() => {
            res.status(status.INTERNAL_SERVER_ERROR).send();
          });
      })
      .catch(() => {
        res.status(status.INTERNAL_SERVER_ERROR).send();
      });
  });
});

router.post("/search-donation", checkAdmin, (req, res, next) => {
  sequelize
    .query(
      `SELECT users.name, users.avatar,donations.id, donations.amount, donations.payment_method, donations.donate_date, projects.name AS project_name FROM donations JOIN users ON users.id = donations.user_id JOIN projects ON projects.id = donations.project_id WHERE users.name LIKE :key OR projects.name LIKE :key`,
      {
        replacements: {
          key: "%" + req.body.key + "%",
        },
        type: QueryTypes.SELECT,
      }
    )
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status(status.INTERNAL_SERVER_ERROR).send();
    });
});

module.exports = router;
