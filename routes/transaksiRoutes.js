const express = require('express');
const router = express.Router();
const transaksiController = require('../controllers/transaksiController');
const transaksiValidator = require('../middlewares/validators/transaksiValidator');


router.get("/", transaksiController.getAll)
// Create data
router.post("/", transaksiValidator.create, transaksiController.create);

// Get One Data
router.get("/:id", transaksiController.getOne);

// Update Data
router.put("/:id", transaksiValidator.update, transaksiController.update);

// Delete One Data
router.delete("/:id", transaksiController.delete);

module.exports = router;