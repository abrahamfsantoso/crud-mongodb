const { MongoClient } = require("mongodb");
// Connection URI
const uri = process.env.MONGO_URI;
// Create a new MongoClient
const connection = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

try {
  connection.connect()
} catch (error) {
  console.log(error)
}

module.exports = connection;
