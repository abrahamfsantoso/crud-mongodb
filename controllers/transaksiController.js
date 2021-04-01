const client = require("../models");

class TransaksiController {
  async getAll(req, res) {
    try {
      const dbConnection = client.db("penjualan");
      const transaksi = dbConnection.collection("transaksi");

      let data = await transaksi.find({}).toArray();

      if (data.length === 0) {
        return res.status(404).json({
          message: "Transaksi Not Found",
        });
      }
      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
  // Get One Data
  async getOne(req, res) {
    try {
      // Find one data
      let data = await transaksi.findOne({
        _id: new ObjectId(req.params.id),
      });

      // If success
      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (e) {
      // If failed
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  // Create data
  async create(req, res) {
    try {
      // Insert data transaksi
      let data = await transaksi.insertOne({
        barang: req.body.barang,
        pelanggan: req.body.pelanggan,
        jumlah: req.body.jumlah,
        total: req.body.total,
      });

      // If success
      return res.status(200).json({
        message: "Success",
        data: data.ops[0],
      });
    } catch (e) {
      console.log(e);
      // If failed
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  // Update data
  async update(req, res) {
    try {
      // Update data transaksi
      await transaksi.updateOne(
        {
          _id: new ObjectId(req.params.id),
        },
        {
          $set: {
            barang: req.body.barang,
            pelanggan: req.body.pelanggan,
            jumlah: req.body.jumlah,
            total: req.body.total,
          },
        }
      );

      // Find data that updated
      let data = await transaksi.findOne({
        _id: new ObjectId(req.params.id),
      });

      // If success
      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (e) {
      // If failed
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  // Delete Data
  async delete(req, res) {
    try {
      // delete data depends on req.params.id
      let data = await transaksi.deleteOne({
        _id: new ObjectId(req.params.id),
      });

      // If success
      return res.status(200).json({
        message: "Success to delete transaksi",
      });
    } catch (e) {
      // If failed
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new TransaksiController();
