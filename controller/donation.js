const Donation = require("../models/donation");
const User = require("../models/user");
const { sendEmailConfirm } = require("../utilities/sendinblue");
const Project = require("../models/project");
const sequelize = require("../utilities/database");
const { QueryTypes } = require("sequelize");
const paypal = require("../utilities/paypal");
const express = require("express");
const status = require("http-status");
const {
  createToken,
  checkAdmin,
  checkUser,
} = require("../utilities/authenticate");
const {
  addDonationValidation,
  addDonationAnonymousValidation,
} = require("../utilities/validation");
const { validationResult } = require("express-validator");

const router = express.Router();

router.get("/get-all-donation", checkAdmin, (req, res, next) => {
  sequelize
    .query(
      "SELECT users.name, users.avatar,donations.id, donations.amount, donations.payment_method, donations.donate_date, donations.status, projects.name AS project_name FROM donations JOIN users ON users.id = donations.user_id JOIN projects ON projects.id = donations.project_id WHERE donations.deleted = 0",
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

router.post(
  "/create-donation",
  checkUser,
  addDonationValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    (async () => {
      const user = await User.findOne({ where: { email: req.body.userEmail } });
      const project = await Project.findByPk(Number(req.body.projectId));
      if (user === null) {
        const error = errors.array();
        error.push({
          msg: "email not found",
          param: "userEmail",
        });
        res.status(status.BAD_REQUEST).send({ errors: error });
      }
      if (project === null) {
        const error = errors.array();
        error.push({
          msg: "project not found",
          param: "projectId",
        });
        res.status(status.BAD_REQUEST).send({ errors: error });
      }
      if (user !== null && project !== null) {
        Donation.create({
          user_id: user.id,
          project_id: project.id,
          amount: Number(req.body.amount),
          payment_method: req.body.paymentMethod,
          status: req.body.status,
          donate_date: Date.now(),
        })
          .then(() => {
            res.status(status.OK).send();
          })
          .catch(() => {
            res.status(status.INTERNAL_SERVER_ERROR).send();
          });
      }
    })();
  }
);

router.post(
  "/create-donation-anonymous",
  addDonationAnonymousValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    (async () => {
      const project = await Project.findByPk(Number(req.body.project_id));
      if (project === null) {
        const error = errors.array();
        error.push({
          msg: "project not found",
          param: "project_id",
        });
        res.status(status.BAD_REQUEST).send({ errors: error });
      } else {
        Donation.create({
          user_id: 23,
          project_id: project.id,
          amount: Number(req.body.amount),
          payment_method: req.body.payment_method,
          donate_date: Date.now(),
        })
          .then(() => {
            res.status(status.OK).send();
          })
          .catch(() => {
            res.status(status.INTERNAL_SERVER_ERROR).send();
          });
      }
    })();
  }
);

router.post(
  "/user-create-donation",
  checkUser,
  addDonationAnonymousValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    (async () => {
      const user = await User.findOne({ where: { email: req.user.email } });
      const project = await Project.findByPk(Number(req.body.project_id));
      if (user === null) {
        res.status(status.INTERNAL_SERVER_ERROR).send();
      }
      if (project === null) {
        const error = errors.array();
        error.push({
          msg: "project not found",
          param: "projectId",
        });
        res.status(status.BAD_REQUEST).send({ errors: error });
      }
      if (user !== null && project !== null) {
        Donation.create({
          user_id: user.id,
          project_id: project.id,
          amount: Number(req.body.amount),
          payment_method: req.body.payment_method,
          donate_date: Date.now(),
        })
          .then(() => {
            res.status(status.OK).send();
          })
          .catch(() => {
            res.status(status.INTERNAL_SERVER_ERROR).send();
          });
        sendEmailConfirm(
          user.name,
          user.email,
          req.body.amount,
          req.body.payment_method
        );
      }
    })();
  }
);

router.patch(
  "/update-donation",
  checkAdmin,
  addDonationAnonymousValidation,
  (req, res, next) => {
    (async () => {
      const donation = await Donation.findByPk(Number(req.body.id));
      if (donation === null) {
        res.status(status.INTERNAL_SERVER_ERROR).send();
      } else {
        donation
          .update({
            amount: req.body.amount,
            payment_method: req.body.paymentMethod,
            status: req.body.status,
          })
          .then(() => {
            res.status(status.OK).send();
          })
          .catch(() => {
            res.status(status.INTERNAL_SERVER_ERROR).send();
          });
      }
    })();
  }
);

router.post(
  "/paypal",
  checkUser,
  addDonationAnonymousValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    (async () => {
      const user = await User.findOne({ where: { email: req.user.email } });
      const project = await Project.findByPk(Number(req.body.project_id));
      if (user === null) {
        res.status(status.INTERNAL_SERVER_ERROR).send();
      }
      if (project === null) {
        const error = errors.array();
        error.push({
          msg: "project not found",
          param: "projectId",
        });
        res.status(status.BAD_REQUEST).send({ errors: error });
      }
      if (user !== null && project !== null) {
        Donation.create({
          user_id: user.id,
          project_id: project.id,
          amount: Number(req.body.amount),
          payment_method: req.body.payment_method,
          donate_date: Date.now(),
        })
          .then(() => {
            const create_payment_json = {
              intent: "sale",
              payer: {
                payment_method: "paypal",
              },
              redirect_urls: {
                return_url: `http://localhost:3000/detail-cause/${project.id}`,
                cancel_url: `http://localhost:3000/detail-cause/${project.id}`,
              },
              transactions: [
                {
                  item_list: {
                    items: [
                      {
                        name: project.name,
                        sku: project.id,
                        price: req.body.amount,
                        currency: "USD",
                        quantity: 1,
                      },
                    ],
                  },
                  amount: {
                    currency: "USD",
                    total: req.body.amount,
                  },
                  description: `Make a donation to ${project.name}`,
                },
              ],
            };

            paypal.payment.create(create_payment_json, (error, payment) => {
              if (error) {
                throw error;
              } else {
                for (let i = 0; i < payment.links.length; i++) {
                  if (payment.links[i].rel === "approval_url") {
                    res.status(status.OK).send(payment.links[i].href);
                  }
                }
              }
            });
          })
          .catch(() => {
            res.status(status.INTERNAL_SERVER_ERROR).send();
          });
        sendEmailConfirm(
          user.name,
          user.email,
          req.body.amount,
          req.body.payment_method
        );
      }
    })();
  }
);

module.exports = router;
