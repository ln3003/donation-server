const User = require("../models/user");
const generatePassword = require("password-generator");
const sequelize = require("../utilities/database");
const { QueryTypes } = require("sequelize");
const express = require("express");
const {sendEmail} = require("../utilities/sendinblue");
const bcrypt = require("bcrypt");
const status = require("http-status");
const { validationResult } = require("express-validator");
const {
  createUserValidation,
  editUserValidation,
  loginValidation,
  registerValidation,
  userUpdatePasswordValidation,
  forgetPasswordValidation,
} = require("../utilities/validation");
const base64ToImage = require("../utilities/base64ToImage");
const {
  createToken,
  checkAdmin,
  checkUser,
} = require("../utilities/authenticate");

const router = express.Router();

router.get("/get-all-user", checkAdmin, (req, res, next) => {
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

router.post("/search-user", checkAdmin, (req, res, next) => {
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

router.delete("/delete-user/:id", checkAdmin, (req, res, next) => {
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

router.post("/delete-selected-user", checkAdmin, (req, res, next) => {
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

router.patch("/reset-password", checkAdmin, (req, res, next) => {
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

router.post(
  "/create-user",
  checkAdmin,
  createUserValidation,
  (req, res, next) => {
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
  }
);

router.patch(
  "/update-user",
  checkAdmin,
  editUserValidation,
  (req, res, next) => {
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
  }
);

router.post("/login", loginValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  (async () => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user === null) {
      const error = errors.array();
      error.push({
        msg: "email not found",
        param: "email",
      });
      res.status(status.UNAUTHORIZED).send({ errors: error });
    } else {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result) {
          res.status(status.OK).send(createToken(user.email));
        } else {
          const error = errors.array();
          error.push({
            msg: "Wrong password",
            param: "password",
          });
          res.status(status.UNAUTHORIZED).send({ errors: error });
        }
      });
    }
  })();
});

router.get("/checkAuthenticate", checkUser, (req, res, next) => {
  (async () => {
    const user = await User.findOne({ where: { email: req.user.email } });
    if (user === null) {
      res.status(status.UNAUTHORIZED).send();
    } else {
      res.status(status.OK).send({
        name: user.name,
        role: user.role,
        token: createToken(user.email),
      });
    }
  })();
});

router.post("/register", registerValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  base64ToImage(req.body.avatar, req.body.name, "avatar", (imageLink) => {
    req.body.avatar = imageLink;
  });
  const newPassword = generatePassword();
  bcrypt.hash(newPassword, 10, function (err, hash) {
    if (err) {
      res.status(status.INTERNAL_SERVER_ERROR).send();
    }
    req.body.password = hash;
    sendEmail(req.body.name, req.body.email, newPassword);
    User.create(req.body)
      .then(() => {
        res.status(status.OK).send();
      })
      .catch(() => {
        res.status(status.INTERNAL_SERVER_ERROR).send();
      });
  });
});

router.patch(
  "/user-update-password",
  checkUser,
  userUpdatePasswordValidation,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (req.body.confirmPassword !== req.body.newPassword) {
      const error = errors.array();
      error.push({
        msg: "Confirm password must match the new password",
        param: "confirmPassword",
      });
      res.status(status.UNAUTHORIZED).send({ errors: error });
    } else {
      (async () => {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (user !== null) {
          bcrypt.compare(
            req.body.currentPassword,
            user.password,
            (err, result) => {
              if (err) {
                res.status(status.INTERNAL_SERVER_ERROR).send();
              }
              if (result) {
                base64ToImage(
                  req.body.avatar,
                  req.body.name,
                  "avatar",
                  (imageLink) => {
                    req.body.avatar = imageLink;
                  }
                );
                bcrypt.hash(req.body.newPassword, 10, function (err, hash) {
                  user
                    .update({
                      name: req.body.name,
                      avatar: req.body.avatar,
                      address: req.body.address,
                      phone: req.body.phone,
                      password: hash,
                    })
                    .then(() => {
                      res.status(status.OK).send();
                    })
                    .catch((error) => {
                      console.log(error);
                      res.status(status.INTERNAL_SERVER_ERROR).send();
                    });
                });
              } else {
                const error = errors.array();
                error.push({
                  msg: "Current password is incorrect",
                  param: "currentPassword",
                });
                res.status(status.UNAUTHORIZED).send({ errors: error });
              }
            }
          );
        }
      })();
    }
  }
);

router.get("/get-one-user", checkUser, (req, res, next) => {
  const { address, avatar, email, name, phone, role } = req.user;
  res.status(status.OK).send({ address, avatar, email, name, phone, role });
});

router.post("/forget-password", forgetPasswordValidation, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  (async () => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user === null) {
      const error = errors.array();
      error.push({
        msg: "Email not found",
        param: "email",
      });
      res.status(status.UNAUTHORIZED).send({ errors: error });
    } else {
      const newPassword = generatePassword();
      sendEmail(user.name, user.email, newPassword);
      bcrypt.hash(newPassword, 10, function (err, hash) {
        user.update({ password: hash });
      });
      res.status(status.OK).send();
    }
  })();
});

router.get("/logout", checkUser, (req, res, next) => {
  (async () => {
    const user = await User.findOne({ where: { email: req.user.email } });
    if (user === null) {
      console.log(1);
      res.status(status.UNAUTHORIZED).send();
    } else {
      console.log(req.user.jwt_payload_tokenRandomWord);
      user
        .update({ tokenRandomWord: req.user.jwt_payload_tokenRandomWord })
        .then(() => {
          res.status(status.OK).send();
        })
        .catch(() => {
          res.status(status.INTERNAL_SERVER_ERROR).send();
        });
    }
  })();
});

module.exports = router;
