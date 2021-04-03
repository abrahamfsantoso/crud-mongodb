require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const express = require("express");
const app = express();

const transaksiRoutes = require("./routes/transaksiRoutes");
const pelangganRoutes = require("./routes/pelangganRoutes");
const barangRoutes = require("./routes/barangRoutes");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/transaksi", transaksiRoutes);
app.use("/pelanggan", pelangganRoutes);
app.use("/barang", barangRoutes);


const PORT = 3000 || process.env.PORT;

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
