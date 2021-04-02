const client = require("../models");
const { ObjectId } = require("mongodb");

class PelangganController {
  async getAll(req, res) {
    try {
      const dbConnection = client.db("penjualan");
      const pelanggan = dbConnection.collection("pelanggan");

      let data = await pelanggan.find({}).toArray();

      if (data.length === 0) {
        return res.status(404).json({
          message: "Pelanggan Not Found",
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
      const dbConnection = client.db("penjualan");
      const pelanggan = dbConnection.collection("pelanggan");
      // Find one data
      let data = await pelanggan.findOne({
        _id: new ObjectId(req.params.id),
      });

      // If success
      return res.status(200).json({
        message: "Success",
        data,
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

  // Create data
  async create(req, res) {
    try {
      const dbConnection = client.db("penjualan");
      const pelanggan = dbConnection.collection("pelanggan");
      // Insert data transaksi
      let data = await pelanggan.insertOne({
        nama: req.body.nama,
        photo: req.body.photo && req.body.photo,
        email: req.body.email,
        mobile_phone: req.body.mobile_phone,
        createdAt: new Date(),
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
      const dbConnection = client.db("penjualan");
      const pelanggan = dbConnection.collection("pelanggan");
      // Update data transaksi
      await pelanggan.updateOne(
        {
          _id: new ObjectId(req.params.id),
        },
        {
          $set: {
            nama: req.body.nama,
            photo: req.body.photo && req.body.photo,
            email: req.body.email,
            mobile_phone: req.body.mobile_phone,
            updatedAt: new Date(),
          },
        }
      );

      // Find data that updated
      let data = await pelanggan.findOne({
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
      const dbConnection = client.db("penjualan");
      const pelanggan = dbConnection.collection("pelanggan");
      // delete data depends on req.params.id
      let data = await pelanggan.deleteOne({
        _id: new ObjectId(req.params.id),
      });

      // If success
      return res.status(200).json({
        message: `Successfully deleted pelanggan ${req.params.id}`,
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

module.exports = new PelangganController();
