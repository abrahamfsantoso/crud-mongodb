const multer = require("multer"); //multipar form-data
const path = require("path"); // to detect path of directory
const crypto = require("crypto"); // to encrypt something

const uploadDir = "/images/"; // make images upload to /images/
const storage = multer.diskStorage({
  destination: "./public" + uploadDir, // make images upload to /public/images/
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      // If an error
      if (err) return cb(err);

      // encrypt filename and save it into the /public/img/ directory
      cb(null, raw.toString("hex") + path.extname(file.originalname));
    });
  },
});

// Function to check file is image or not
// More detail you can check multer documentation
function fileFilter(req, file, cb) {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif" ||
    file.mimetype == "image/bmp"
  ) {
    // If file type is image it will pass
    cb(null, true);
  } else {
    // If file type is not image it will make error
    cb(new Error("File must be an image!"), false);
  }
}

// Function to start upload image
const upload = multer({
  fileFilter: fileFilter, // filter file first
  storage: storage, // If filter no error, go to storage function
}).single("photo");

// Function to start uploading
module.exports.imageUpload = (req, res, next) => {
  upload(req, res, (err) => {
    // If an error when uploading
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(400).json({
        message: "File must be an image!",
      });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(400).json({
        message: "File must be an image!",
      });
    }

    // If everythings is well fine, it will go to next middleware
    if (req.file) req.body.photo = req.file.filename;

    next();
  });
};
