const fs = require("fs");
const path = require("path");

const base64ToImage = (base64String, name, folder, getImageLink) => {
  const base64EncodedImage = base64String.split(",");
  const data = base64EncodedImage[0].split(";")[0].split(":")[1].split("/");
  if (data[0] === "image") {
    const imageBuffer = Buffer.from(base64EncodedImage[1], "base64");
    const newName = name.replace(/ /g, "-");
    const milliseconds = Date.now();
    fs.writeFileSync(
      path.join(__dirname, `../${folder}/`) +
        newName +
        milliseconds +
        "." +
        data[1],
      imageBuffer,
      "utf8"
    );
    getImageLink(
      `http://localhost:5000/${folder}/` + newName + milliseconds + "." + data[1]
    );
  }
};

module.exports = base64ToImage;
