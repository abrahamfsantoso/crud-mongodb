const express = require('express');
const router = express.Router();
const { imageUpload } = require("../middlewares/uploads/imageUpload");

const pelangganController = require('../controllers/pelangganController');
const pelangganValidator = require('../middlewares/validators/pelangganValidator');


router.get("/", pelangganController.getAll)
// Create data
router.post("/", imageUpload, pelangganValidator.create, pelangganController.create);

// Get One Data
router.get("/:id", pelangganValidator.getOne, pelangganController.getOne);

// Update Data
router.put("/:id", imageUpload, pelangganValidator.update, pelangganController.update);

// Delete One Data
router.delete("/:id", pelangganController.delete);

module.exports = router;