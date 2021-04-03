const validator = require("validator");
const { ObjectId } = require("mongodb");
const connection = require("../../models");
// const { pemasok } = require("../../../Day 24/models");
// const penjualan = connection.db("penjualan_development");
// const transaksi = penjualan.collection("transaksi");

exports.create = async (req, res, next) => {
  try {
    // get barang amd pelanggan
    const penjualan = connection.db("penjualan_development");
    const pemasok = penjualan.collection("pemasok");
    // const barang = penjualan.collection("barang");

    // console.log(req.body.id_barang);
    // let findData = await Promise.all([
    //   penjualan.collection("pemasok").findOne({
    //     _id: new ObjectId(req.body.id_pemasok),
    //   }),
    // ]);

    let findPemasok = await pemasok.findOne({
      _id: new ObjectId(req.body.pemasok),
    });

    //create errors variable
    let errors = [];

    //if pemasok not found
    if (!findPemasok) {
      errors.push("ga ada pemasok");
    }

    if (!validator.isNumeric(req.body.harga)) {
      errors.push("jumlah must be a number");
    }
    // let pemasokLength = req.body.pemasok; 
    // if(pemasokLength.length>24 || pemasokLength.length<24 ){
    //   errors.push("id harus 24 karakter hex ");
    // }


    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "internal server errrrrrrrrrror",
      error: e,
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    const penjualan = connection.db("penjualan_development");
    const pemasok = penjualan.collection("pemasok");
    const barang = penjualan.collection("barang");
    // Get barang and pelanggan
    let findData = await Promise.all([
      penjualan.collection("pemasok").findOne({
        _id: new ObjectId(req.body.pemasok),
      }),
      barang.findOne({
        _id: new ObjectId(req.params.id),
      }),
    ]);

    // Create errors variable
    let errors = [];

    // If barang not found
    if (!findData[0]) {
      errors.push("pemasok Not Found");
    }

    // If pelanggan not found
    if (!findData[1]) {
      errors.push("barang Not Found");
    }

    if (!validator.isNumeric(req.body.harga)) {
      errors.push("Jumlah must be a number");
    }

    // If errors length > 0, it will make errors message
    if (errors.length > 0) {
      // Because bad request
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    // It means that will be go to the next middleware
    next();
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      message: "Internal Server Error",
      error: e,
    });
  }
};
