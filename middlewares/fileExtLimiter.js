const path = require("path");

//THIS MIDDLEWARE IS USED TO CHECK FILE'S EXTENSION

const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    const files = req.files;

    const fileExtensions = [];

    Object.keys(files).forEach((key) => {
      fileExtensions.push(path.extname(files[key].name));
    });

    const allowed = fileExtensions.every((ext) =>
      allowedExtArray.includes(ext)
    );

    if (!allowed) {
      return res
        .status(422)
        .json({ status: "error", message: "Extension is not allowed" });
    }

    next();
  };
};

module.exports = fileExtLimiter;
