const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const sequelize = require("./utilities/database");
const userRouter = require("./controller/user");
const projectRouter = require("./controller/project");
const donationRouter = require("./controller/donation");
const ImportData = require("./utilities/importData");

const app = express();
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/avatar", express.static(path.join(__dirname, "avatar")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "5mb" }));

const whitelist = ["http://localhost:3000", "http://localhost:3001"];
const corsOptions = {
  origin: whitelist,
  methods: ["POST", "GET", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/user", userRouter);
app.use("/project", projectRouter);
app.use("/donation", donationRouter);

sequelize
  .sync()
  .then(() => {
    //ImportData();
  })
  .catch((reason) => {
    console.log(reason);
  });

app.listen(5000, () => {
  console.log("listen on 5000");
});
