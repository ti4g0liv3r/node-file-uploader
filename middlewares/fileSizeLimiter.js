//THIS MIDDLEWARE IS USED TO CHECK IF FILE SIZE IS OVER 5MB

const MB = 5; //5MB
const FILE_SIZE_LIMITE = MB * 1024 * 1024;

const fileSizeLimiter = (req, res, next) => {
  const files = req.files;

  const filesOverLimit = [];
  //Which file are over the limite?

  Object.keys(files).forEach((key) => {
    if (files[key].size > FILE_SIZE_LIMITE) {
      filesOverLimit.push(files[key].name);
    }

    if (filesOverLimit.length) {
      return res
        .status(413)
        .json({ status: "error", message: "File size is over than 5MB" });
    }
  });

  next();
};

module.exports = fileSizeLimiter;
