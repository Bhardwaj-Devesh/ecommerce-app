const mongoose = require("mongoose");
const colors = require("colors");
const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDb connected ${conn.connection.host}`.blue);
  } catch (error) {
    console.log(`Error in MOngoDb ${error}`.red);
  }
};

module.exports = connectDatabase;
