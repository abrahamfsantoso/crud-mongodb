const validator = require("validator");
const { ObjectId } = require("mongodb");
const connection = require("../../models");


module.exports.create = async (req, res, next) => {
  
  try {
    let errors = [];

    if (validator.isNumeric(req.body.nama)) {
      errors.push("Nama has to be alpha only");
    }

    if (!validator.isEmail(req.body.email)) {
      errors.push("Please input valid email");
    }
    if (!validator.isMobilePhone(req.body.mobile_phone)) {
      errors.push("Please input valid phone number");
    }

    // If errors length > 0, it will make errors message
    if (errors.length > 0) {
      // Because bad request
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  } 
}

module.exports.update = async (req, res, next) => {
  const penjualan = connection.db("penjualan"); // Connect to penjualan database
  const pelanggan = penjualan.collection("pelanggan"); // Connect to table/collection transaksi
  try {
    // Get barang and pelanggan
    let findPelanggan = await pelanggan.findOne({
        _id: new ObjectId(req.params.id),
      });
  
    // Create errors variable
    let errors = [];

    // If pelanggan not found
    if (!findPelanggan) {
      errors.push("Pelanggan Not Found");
    }

    // If errors length > 0, it will make errors message
    if (errors.length > 0) {
      // Because bad request
      return res.status(400).json({
        message: errors.join(", "),
      });
    }
    next();
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};

module.exports.getOne = async (req, res, next) => {
  const penjualan = connection.db("penjualan"); // Connect to penjualan database
  const pelanggan = penjualan.collection("pelanggan"); // Connect to table/collection transaksi
  const errors = []
  
  try {

    const findData = await pelanggan.findOne({
      _id: ObjectId(req.params.id)
    })

    if(findData == null){
      errors.push(`Pelanggan ${req.params.id} Not Found`);
    }

    if (errors.length > 0) {
      // Because bad request
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next()
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
}
