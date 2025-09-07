// const multer = require("multer");
// const path = require("path");

// // Configure storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Folder where files will be stored
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// // Configure multer
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     const fileTypes = /jpg|jpeg|png|gif/;
//     const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimeType = fileTypes.test(file.mimetype);

//     if (extName && mimeType) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only image files are allowed!"));
//     }
//   },
// });

// module.exports = upload;
