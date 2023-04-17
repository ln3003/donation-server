const User = require("../models/user");
const generatePassword = require("password-generator");
const sequelize = require("../utilities/database");
const { QueryTypes } = require("sequelize");
const express = require("express");
const sendEmail = require("../utilities/sendinblue");
const bcrypt = require("bcrypt");
const status = require("http-status");
const { validationResult } = require("express-validator");
const {
  createUserValidation,
  editUserValidation,
} = require("../utilities/validation");
const base64ToImage = require("../utilities/base64ToImage");

const router = express.Router();

router.get("/get-all-user", (req, res, next) => {
  sequelize
    .query(
      "SELECT users.id, users.name, users.avatar, users.address, users.phone, users.email, users.role, SUM(donations.amount) AS donated FROM users LEFT JOIN donations ON users.id = donations.user_id WHERE users.deleted = 0 GROUP BY users.id",
      { type: QueryTypes.SELECT }
    )
    .then((users) => {
      res.send(users);
    })
    .catch((reason) => {
      res.status(status.INTERNAL_SERVER_ERROR).send();
    });
});

router.post("/search-user", (req, res, next) => {
  sequelize
    .query(
      `SELECT users.id, users.name, users.avatar, users.address, users.phone, users.email, SUM(donations.amount) AS donated FROM users LEFT JOIN donations ON users.id = donations.user_id WHERE users.deleted = 0 AND (users.name LIKE :key OR users.email LIKE :key OR users.phone LIKE :key) GROUP BY users.id`,
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
    .catch((reason) => {
      res.status(status.INTERNAL_SERVER_ERROR).send();
    });
});

router.delete("/delete-user/:id", (req, res, next) => {
  User.findByPk(Number(req.params.id))
    .then((user) => {
      if (user.role === "admin") {
        res
          .status(status.BAD_REQUEST)
          .send({ message: "You cannot delete admin" });
      } else {
        user
          .update({ deleted: true })
          .then(() => {
            res.status(status.OK).send();
          })
          .catch(() => {
            res.status(status.INTERNAL_SERVER_ERROR).send();
          });
      }
    })
    .catch((error) => {
      res.status(status.INTERNAL_SERVER_ERROR).send();
    });
});

router.post("/delete-selected-user", (req, res, next) => {
  req.body.selectedValues.forEach((item) => {
    User.findByPk(Number(item))
      .then((user) => {
        if (user.role === "admin") {
          res
            .status(status.BAD_REQUEST)
            .send({ message: "You cannot delete admin" });
        } else {
          user
            .update({ deleted: true })
            .then(() => {
              res.status(status.OK).send();
            })
            .catch(() => {
              res.status(status.INTERNAL_SERVER_ERROR).send();
            });
        }
      })
      .catch((error) => {
        res.status(status.INTERNAL_SERVER_ERROR).send();
      });
  });
});

router.patch("/reset-password", (req, res, next) => {
  User.findByPk(req.body.id)
    .then((user) => {
      const newPassword = generatePassword();
      sendEmail(user.name, user.email, newPassword);
      bcrypt.hash(newPassword, 10, function (err, hash) {
        user.update({ password: hash });
      });
      res.status(status.OK).send();
    })
    .catch((error) => {
      res.status(status.INTERNAL_SERVER_ERROR).send();
    });
});

router.post("/create-user", createUserValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  base64ToImage(req.body.avatar, req.body.name, "avatar", (imageLink) => {
    req.body.avatar = imageLink;
  });
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) {
      res.status(status.INTERNAL_SERVER_ERROR).send();
    }
    req.body.password = hash;
    User.create(req.body)
      .then(() => {
        res.status(status.OK).send();
      })
      .catch(() => {
        res.status(status.INTERNAL_SERVER_ERROR).send();
      });
  });
});

router.patch("/update-user", editUserValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  base64ToImage(req.body.avatar, req.body.name, "avatar", (imageLink) => {
    req.body.avatar = imageLink;
  });
  User.findByPk(req.body.id)
    .then((user) => {
      if (user.role === "user") {
        user
          .update({
            name: req.body.name,
            avatar: req.body.avatar,
            address: req.body.address,
            phone: req.body.phone,
            role: req.body.role,
          })
          .then(() => {
            res.status(status.OK).send();
          })
          .catch(() => {
            res.status(status.INTERNAL_SERVER_ERROR).send();
          });
      } else {
        user
          .update({
            name: req.body.name,
            avatar: req.body.avatar,
            address: req.body.address,
            phone: req.body.phone,
          })
          .then(() => {
            res.status(status.OK).send();
          })
          .catch(() => {
            res.status(status.INTERNAL_SERVER_ERROR).send();
          });
      }
    })
    .catch(() => {
      res.status(status.INTERNAL_SERVER_ERROR).send();
    });
});

module.exports = router;
