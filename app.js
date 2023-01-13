const express = require("express");
const fileUpload = require("express-fileupload");

const path = require("path");

const fileExtLimiter = require("./middlewares/fileExtLimiter");
const fileSizeLimiter = require("./middlewares/fileSizeLimiter");
const filesPayloadExists = require("./middlewares/filesPayloadExists");

const PORT = process.env.PORT || 3500;

const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post(
  "/upload/:id",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  (req, res) => {
    const files = req.files;
    const id = req.params.id;

    Object.keys(files).forEach((key) => {
      const filePath = path.join(__dirname, "files", id, files[key].name);
      files[key].mv(filePath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });
    });

    return res.json({
      status: "success",
      message: Object.keys(files).toString(),
    });
  }
);

app.listen(PORT, () => console.log(`Server running port on ${PORT}`));
