const express = require("express"); //import express
// const validator = require("validator"); // Import validator

//import controller
const barangController = require("../controllers/barangController");
//make router
const router = express.Router();
const barangValidator = require("../middlewares/validators/barangValidator");


// Get All Data
router.get("/", barangController.getAll);

// Create data
router.post("/", barangValidator.create, barangController.create);
// router.post("/", barangController.create);

// Get One Data
router.get("/:id", barangController.getOne);

// Update Data
router.put("/:id", barangValidator.update, barangController.update);

// Delete One Data
router.delete("/:id", barangController.delete);


module.exports = router;
