const passport = require("passport");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const status = require("http-status");
const User = require("../models/user");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "Fq5hRMUcGaGE5EZrkQ3Eu5zik6cWHxrF",
};

passport.use(
  new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    (async () => {
      const user = await User.findOne({ where: { email: jwt_payload.email } });
      if (user === null) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    })();
  })
);

const createToken = (userEmail) => {
  const token = jwt.sign({ email: userEmail }, jwtOptions.secretOrKey, {
    expiresIn: "1h",
  });
  return token;
};

const checkAdmin = [
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (req.user.role === "admin") {
      next();
    } else {
      res.status(status.UNAUTHORIZED).send();
    }
  },
];

const checkUser = [
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (req.user.role === "admin" || req.user.role === "user") {
      next();
    } else {
      res.status(status.UNAUTHORIZED).send();
    }
  },
];

module.exports = { createToken, checkAdmin, checkUser };
